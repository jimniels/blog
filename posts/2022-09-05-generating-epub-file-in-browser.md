# Generating an EPUB File in the Browser

I’ve been meaning to blog about a few aspects of how I built my tool [Readlists](https://blog.jim-nielsen.com/2021/reintroducing-readlists/) and I finally have the time to do it. So here we go.

Readlists is a purely client-side app, i.e. JavaScript required. That’s something I might change in the future as I dabble in how to host and maintain a website with a server, but for now purely client-side is the way it works (because that’s the way I knew how to build it).

In case you’re not familiar with it, Readlists allows you to create a custom collection of articles from the web and bind them together as an ebook. For those who remember cassettes, I like to say: it’s like a mixtape, but for web articles.

Articles are extracted from the web using the [mercury parser](https://github.com/postlight/mercury-parser) into a JSON format I can work with. From there, a collection of these JSON articles can be exported to various formats, including a `.epub` file for reading in something like iBooks.

I originally planned on having the “Export to EPUB” functionality be a serverless function (hosted on Netlify) because I assumed generating an EPUB from HTML would be work that I could only do on the server. I tried using [epub-gen](https://github.com/cyrilis/epub-gen), which is built to work with Node, but quickly found a problem: generating an ebook sometimes took longer than 10 seconds, which (at the time) was the limit for executing a lambda function.

With the self-imposed constraint of this being a purely client-side app with no storage or auth, this became a problem. Netlify’s [background functions](https://docs.netlify.com/functions/background-functions/) could work, but then I’d need some form of storage to pass the result to (and then notify the user). And spinning up a server was off the table too.

So the question became: can I offload the work of generating an EPUB to each individual client, i.e. can I generate an EPUB in the browser?

The answer, as you might’ve guessed since I’m writing this blog post, is yes.

## Reverse Engineering epub-gen

Given that I had no idea how to make an EPUB, I started by reading the source code of a solution that I already knew worked: the [epub-gen library](https://github.com/cyrilis/epub-gen). Its source code is written in coffeescript, which I’m not really familiar with, but I didn’t need to understand the nitty gritty details. I merely needed the high-level understanding of how to make an EPUB and I could figure out how to translate the idea to working JavaScript.

I made a couple EPUB files with epub-gen and then started working backwards, synthesizing what I found in the tool’s output with what I was reading in the source code. As questions arose, I went to Google looking for answers. This resulted in a few invaluable resources which I left open as browser tabs to continually reference as I tried to get the whole thing working, including:

- [A gist from cyrilis](https://gist.github.com/cyrilis/8d48eef37fbc108869ac32eb3ef97bca), maker of epub-gen, which is a kind of brain dump of notes around generating EPUBs from having made epub-gen. 
- [The EPUB3 spec](http://idpf.org/epub/30/spec/epub30-overview.html), which honestly didn’t make a lot of sense until I really got into the details and then it was very valuable.
- [“Anatomy of an EPUB 3 file”](https://www.edrlab.org/open-standards/anatomy-of-an-epub-3-file/) which helped explain the output I was looking at from other tools.

After soaking in all these details, I was able to pin down all the files and metadata I’d need to create a basic EPUB. It all seemed relatively feasible, as it was essentially just creating a bunch of template literal functions that would return EPUB 3 XML for things like table of contents, chapters, book metadata, etc.

The tricky part became: how do I take all these individual strings of XML and package them up into a book? In my discovery work I found that EPUB files are just ZIP files with XML and images inside. So the question became: can you create a ZIP file in the browser?

## ZIP Files in the Browser

Turns out, you can create a ZIP file in the browser thanks to [JSZip](https://stuk.github.io/jszip/). You create individual files by path and then collate them into a ZIP file. For an EPUB, this was the skeleton I would need for each EPUB:

```
mimetype
META-INF/
  container.xml
OEBPS/
  content.opf
  toc.xhtml
  000.xhtml // chapter 1
  001.xhtml // chapter 2
  002.xhtml // chapter 3
  ...
  images/
    0000-1111-2222-[...].png // each file needs a unique name
    000a-1111-2222-[...].png
```

Given all this research work, I knew I could come up with all the ingredients to bake an EPUB cake in the browser. Given a collection of articles from the web in JSON format from the mercury parser, the recipe for when a user clicked the button “Export to Epub” looked like this:

- Use JSZip to generate all necessary metadata files
- Take the collection of mercury articles, and for each article:
	- Fetch every image from the original article, create a unique name for it, then create a file for it with JSZip
	- Convert the article’s HTML into an EPUB 3 XHTML document and create a chapter for it with JSZip
- Bundle everything into a ZIP file and use [FileSaver.js](https://github.com/eligrey/FileSaver.js/) to save it to the client

You can see [the working code for creating an EPUB in the browser](https://github.com/jimniels/readlists/blob/c0de5aad12387e58b9f41988b2a7500392d71527/src/js/epub/index.js) in my Readlists repo. It’s messy, but it works (most of the time).

## Final Reflections

There were more hiccups in this process than described here. [I vented about some of them on Twitter](https://twitter.com/jimniels/status/1326934599063261187) which actually turned out to be useful as [I got feedback](https://twitter.com/philipforget/status/1326942324589465600) from some of the peeps who created [the OG Readlists](https://www.theverge.com/2012/5/22/3035904/readlists-readability-create-share-ebook) on how they did it.

In the end, I was quite surprised at being able to do all of this in the browser. Modern browsers are pretty damn capable. Granted, older browser will fail miserably at all of this — hence the value of the server/client model. I think that’ll be v2 of Readlists someday, to bring in a lean client and do most of this on the server.

Also I feel like maybe the web should steal Apple’s old marketing campaign “There’s an App for that” and re-purpose it to “There’s a JS lib for that.”