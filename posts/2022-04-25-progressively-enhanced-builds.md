#progressiveEnhancement

# Progressively Enhanced Builds

With the advent of the Jamstack, so many of websites require a build step of some kind before a functioning website can be born.

Build steps are great. I use them all the time. But they do come at a cost.

One of those costs is fragility—builds are prone to breaking. It’s not uncommon to setup a project, return to it six weeks later, run `npm install && npm start`, and _something_ breaks. Then begins the troubleshooting. A project from 6 days ago, 6 weeks ago, or 6 years ago, each one of those could present its own set of build problems. Often, you end up with a non-functioning website you cannot edit, test, and update until your build is fixed.

We have a strategy for delivering robust, [resilient](https://resilientwebdesign.com) experiences to users in the browser: progressive enhancement. Start with the most basic functionality that lets people do what they need, then enhance from there. In this way, lots of things could go wrong — JavaScript doesn’t load, network calls fail, the user is on an old browser, etc. — but the website remains functional and accessible.

What if we applied a mindset of progressive enhancement to builds and not only user agents? What if build processes were thought of as enhancements and not dependencies? Can you have a progressively enhanced build?

## Conceptual Underpinnings

I’ve had a few thoughts swirling in my head around this idea.

First there’s [Baldur Bjarnason](https://www.baldurbjarnason.com/2021/100-things-every-web-developer-should-know/) who speaks on the value of tight feedback loops:

> Tight feedback loops are magic: build processes suck. They will always suck because they always loosen up the feedback loop. You can make builds quicker, but until they are virtually instantaneous, they will always suck…If you can make something without a build step, do so. If you can make something without compilation or building, do that. 

Then there’s [this proof-of-concept post from Maximilian Mackh](https://inoads.com/articles/2021-01-09-Next-Gen-Static-Blogging) (with some [intriguing hackernews comments](https://news.ycombinator.com/item?id=25701053)) which shows how to write a blog post and skip the build process using nifty tricks from HTML and CSS.

> My workflow consists of pressing CMD+S, switching to Safari and reloading the page. What you see now is what I get.

Then there’s [this post from Robin](https://www.robinrendle.com/notes/blogging-and-the-heat-death-of-the-universe/) who notes that entropy acts on all things, including websites and build processes until the last thing left standing is the markup.

> That complex build process? That’s a dependency…
> 
> the thing that lasts longest with our websites is probably the part that we spend the least time thinking about—the markup…
> 
> This is the second law of thermodynamics made clear on the web: the entropy of any isolated system always increases and, at some point or another, all that’s left of a website is the markup.

Then there’s [this post from Jeremy](https://adactio.com/journal/17537) which details how to think about your website’s features as an enhancements rather than dependencies.

> You certainly couldn’t use an experimental feature for anything mission critical…but you could use it as an enhancement.
>
> And that is a pretty great way to think about all web features, experimental or otherwise. Don’t assume the feature will be supported. Use feature detection (or @supports in the case of CSS). Try to use the feature as an enhancement rather than a dependency.

The key is to, as Jeremy says, “acknowledge and embrace unpredictability”. That seems like solid advice, whether you’re building on the client _or the server_.

> Instead of looking at the support table for something on caniuse.com and thinking, “I wish more browsers supported this feature so that I could use it!”, you can instead think “I’m going to use this feature today, but treat it as an experimental feature.”

In a similar vein, what if you could look at building a website in a different light? Rather than thinking, “how do I combine a bunch of disparate content, templates, and tooling into a functioning website?”, you might think “how do I start at a functioning website with content and then use templates and build tooling to enhance it?”

[Granted: this is not a silver bullet for building every website. Lots of websites can’t start here—but maybe some could?]

## Technical Ideas

What could this look like? Honestly, I don’t know. But I’ll take a moment to try and imagine _something_.

I want to be able to view, edit, _and if need be ship_ a website, even if the build process fails. In essence, if the build does fail I can still take all the source files, put them on a server, and the website remains functional (however crude).

I think this kind of approach begs for an HTML-first solution. Your content starts as something that works in the browser — in a less-than-ideal way, sure, but still functional — and the build process parses the base content, injecting additional “features” as enhancements (global header and footer, meta tags, links to CSS and JS, etc.). In this manner, your website starts as content at a URL. Everything else is an enhancement.

For example, think of a classic blog post as a markdown file.

```md
---
title: This is the title of my blog post
date: 2020-09-02
tags: 
  - readingNotes
  - somethingElse
---

# This is the title of my post

I just want to start writing here whatever it is i'm about.

This is just another example of how you might do something that is really light and minimal. [Here’s a link](./another-post.md)

![An image for my blog post](../images/my-image.jpg)
```

What if you rewrote that using HTML for the front-matter semantics? If you want to continue to author the content of the post in markdown, do it, but embed it in a web component (which would get “enhanced” and rendered to HTML somewhere further down the line).

What’s beautiful about markdown is that it’s a kind of progressively-enhanced syntax for writing: link and image URLs are still accessible even when unparsed.

```html
<!doctype html>
<title>This is the title of my blog post</title>
<meta name="date" content="2020-09-02">
<meta name="tags" content="readingNotes,somethingElse">
<wc-markdown style="white-space: pre-line">
# This is the title of my post

I just want to start writing here whatever it is i'm about.

This is just another example of how you might do something that is really light and minimal. [Here is a link](./another-post.html)

![An image for my blog post](../images/my-image.jpg)
</wc-markdown>
```

<img src="https://cdn.jim-nielsen.com/blog/2022/progressive-build-markdown.png" width="843" height="648" alt="" />

There are trade-offs here: authoring in markdown is a convenience for me, the author, and results in a more crude initial experience (if a build enhancement fails later).

Given that markdown supports HTML, you could trade the image syntax (`![]()`) for `<img>` tags or the link syntax (`[]()`) for `<a>` tags. That’ll improve the core experience a tiny bit in the browser, as links would be functionally clickable and images would display directly inline.

```html
<!doctype html>
<title>This is the title of my blog post</title>
<meta name="date" content="2020-09-02">
<meta name="tags" content="readingNotes,somethingElse">
<wc-markdown style="white-space: pre-line">
# This is the title of my post

I just want to start writing here whatever it is i'm about.

This is just another example of how you might do something that is really light and minimal. <a href="./another-post.html">Here is a link</a>

![An image for my blog post](../images/my-image.jpg)
</wc-markdown>
```

Or, as inspired by [this comment](https://news.ycombinator.com/item?id=25701842), you could author your content directly in as sparse a take on HTML as is possible.

```html
<!doctype html>
<title>This is the title of my blog post</title>
<meta name="date" content="2020-09-02">
<meta name="tags" content="readingNotes,somethingElse">
<h1>This is the title of my post</h1>
<p>
I just want to start writing here whatever it is i'm about.
<p>
This is just another example of how you might do something that is really light and minimal. <a href="./another-post.html">Here is a link</a>
<p>
<img src="./image.jpg" alt="An image for my blog post">
```

You can see how trading authoring conveniences begins to enhance the base browser experience.

<img src="https://cdn.jim-nielsen.com/blog/2022/progressive-build-html.png" width="843" height="648" alt="" />

These files could be opened in a browser, without a build process or server (i.e. at a URL of `file:///Users/Me/Path/To/my-post.html`) and the core content would be accessible. And if you markup all the page’s included resources (links, images, styles, scripts, etc.) as relative links, everything will work even without a server. (Granted you’d have to give some thought to structuring your files accordingly.)

```
.
├── index.html
├── styles.css
├── scripts.js
├── posts/
│   ├── 2020-02-05-my-post.html
│   ├── 2020-02-05-my-post-image.jpg
│   └── 2020-03-21-another-post.html
```

If you want the base experience you author to be even slightly better, you could write the stylesheet links and script includes in every single file (rather than append them to each document through a build process). Going back to the markdown example:

```html
<!doctype html>
<title>This is the title of my blog post</title>
<meta name="date" content="2020-09-02">
<meta name="tags" content="readingNotes,somethingElse">
<script type="./web-component-markdown.js"></script>
<wc-markdown>
# This is the title of my post

I just want to start writing here whatever it is i'm about.

This is just another example of how you might do something that is really light and minimal. [Here is a link](./another-post.html)

![An image for my blog post](../images/my-image.jpg)
</wc-markdown>
```

In this example, the trade-off is: overhead to include the `<script>` tag in every post, but the core experience in the browser is now more enhanced (if JavaScript runs) because the `<wc-markdown>` component will turn the markdown to HTML in the browser. An additional enhancement from here would be to have the build process (again, if it runs) render the markdown to HTML so the client doesn’t even need the web component!

The beauty is the build process works like progressive enhancement in the browser: the core experience is functional and accessible, then the build process enhances whatever you want to add by injecting those enhancements to the original, accessible HTML documents (things like style tags, script tags, or global header/footer HTML — I could imagine something like [cheerio](https://cheerio.js.org/) being useful here).

The build process is a progressive enhancement to the core content of your website. Whether it runs or not, your site remains accessible and deployable at any point in time.

I get it, this won’t work for every website. And things like permalinks get tricky. But I still think it’s an intriguing mindset to start from: don’t assume the presence of a build, treat it as an enhancement rather than a dependency.

I should prototype the idea. I could imagine doing this with a tool like Metalsmith:

- Put your source files in directory (which works and remains deployable if everything else fails).
- Metalsmith reads in all the files and produces a data structure of all the content
- Additional files and markup are generated from your site’s content, like index listings, “related posts” sections, etc., while other necessary elements like styles, scripts, or global header/footer markup are injected to each page.
- The new site is output as an “enhanced” version of the site _before your build started_. 

Are there any build tools advocating this kind of mindset? If you know of any, hit me up. 