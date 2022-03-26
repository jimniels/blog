#html

# Reflections on HTML

I was [tipped off by the venerable d_run](https://twitter.com/d_run/status/1390991826384048129) to an article by Danny Guo titled [“What I Learned by Relearning HTML”](https://www.dannyguo.com/blog/what-i-learned-by-relearning-html).

Which got me thinking.

Which got me writing.

Danny starts off explaining why he wanted to relearn HTML:
  
> I’ve worked on websites for several years, both professionally and for side projects. One day, I reflected on the fact that all of my web development education had come from actually making websites. In most cases, I’d have a specific problem, Google how to solve it, and learn something new in the process.
> 
> ...it’s easy to become overconfident with a skill just because you know enough to do a few useful things.
>
> So I decided to relearn HTML

This reminds me Christian Heilmann’s article [“HTML and CSS still isn’t about painting with code”](https://christianheilmann.com/2021/01/21/teaching-html-and-css/) where he talks about how many of us—myself included—learned HTML by painting stuff on screen. Only incidentally did we learn how the web works. First and foremost, however, we were looking for a certain outcome on screen. This is often how HTML is written, something [I’ve touched on previously](https://blog.jim-nielsen.com/2021/web-languages-as-compile-targets/):

> HTML often gets written as part of a transaction: write something, anything, and see a result. Use it to group words, hook into styles and interactions, or construct specific pieces of UI.

But HTML is not a UI framework for painting elements on screen. It’s a markup language to describe the meaning of text. Only secondarily does it get rendered to a screen, but not exclusively.

Traditionally we think of HTML being consumed by a graphical web browser (Chrome, Firefox, Safari, etc.). That is the predominant use case. But, by design, HTML is useful and consumable in a variety of other contexts:

- Rendered in a [text-based browser](https://en.wikipedia.org/wiki/Text-based_web_browser)
- Printed as a document on paper
- [Scraped by bots and turned into](https://themarkup.org/news/2020/12/03/why-web-scraping-is-vital-to-democracy) data elsewhere on the internet

In these scenarios, CSS may have a small part to play while JavaScript likely has none.

<img src="https://cdn.jim-nielsen.com/blog/2021/html-no-power-here.jpg" width="666" height="836" alt="A picture of the ‘you have no power here’ meme where JS is the one that has no power of HTML." /> 

Danny points to the example of headings in HTML. They can be used to make text bigger, but that’s thinking about HTML in terms of _how the text looks_ rather than _what the text means_. 

>  it’s important to use [headings] and make sure they’re in the correct order. It’s wrong to use them only to make text bigger because their real purpose is to define the structure of the content. They’re like a table of contents.

This all goes back to the idea that HTML’s purpose isn’t to paint a user interface. If it was, we could’ve named it UIML: user interface markup language. Danny gets at this:

> There is more to web development than making websites look the way we want. It’s important to make the content mean what we want as well.

HTML doesn’t have an intrinsic dependency on CSS and JS—unless we make it. It was designed to be able to stand on its own. I like the language in [Wikipedia’s entry for HTML](https://en.wikipedia.org/wiki/HTML) (emphasis mine):

> HTML…**can be assisted by** technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.

HTML has a design—an intended purpose.

That means guidance for using HTML is not meant to be a strict command—“Thou shalt not use a `<div>` where a `<button>` is meant”—but rather a communication of its intent and purpose. Using a `<div>` instead of a `<button>` in HTML is a violation of purpose. 

(Re)learning HTML is about understanding its purpose and intent. Once understood, you get to make a mindful choice whether to use it for its intended purpose or not.

