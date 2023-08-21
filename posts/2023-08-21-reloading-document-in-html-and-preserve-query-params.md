# Reloading a Document (and Preserving Query String Parameters) Using Only HTML

**tl;dr**: an empty string for your link, e.g. `<a href="">Reload</a>`

The other day I was trying to write some HTML to give the user the ability to reload the document in its exact state by clicking on a link (same functionality as if they hit `CMD` + `R` on their keyboard, or clicked “reload” in the browser UI).

My first attempt was to use a relative reference to the document, e.g.

`<a href=".">Reload</a>`

But then I thought, “I don’t know if this will preserve the existing query parameters in the URL…” Turns out, it doesn’t.

“What about a `<form>`?” I thought.

`<form><button type='submit'>Refresh</button></form>`

Nope. Doesn’t work either.

So I started searching:

“how do you reload an html document using the `<a>` tag and preserve query parameters?”

That gave me a bunch of answers on how to do it _with JavaScript_, so I had to add “without JavaScript” to my query.

But I could not find an answer.

So I turned to ChatGPT, who told me it was not possible (and then recommended I use JavaScript)

<img src="https://cdn.jim-nielsen.com/blog/2023/a-link-chatgpt.png" width="836" height="237" alt="Screenshot of a conversation with ChatGPT which states, “Reloading the document wihout losing query string parameters using only HTML…is not directly achievable”." />

(Funny aside: this is a familiar feeling when searching for answers about how to do stuff on the web. You ask, “How do I do _x_ without using JavaScript?” And all the answers are: “Here’s how to do it with JavaScript”. Or, for anybody who grew up in the jQuery age, “How do I do _x_ without jQuery?” And all the answers were, “Here’s how to do it with jQuery.”)

But I digress.

At that point, it seemed pretty inconceivable to me that there was really no way to reload a document using only HTML that preserved the state of the URL.

So I turned to Mastodon and Twitter for help.

Fortunately, Ryan Florence (who knows a lot about routing on the web) had [the answer](https://twitter.com/ryanflorence/status/1693648034939469827?s=20): use an `href` with an empty string.

`<a href="">Reload</a>`

Sure enough, that worked. If you hover a link like that in the browser, you’ll see the little link preview show the exact same URL as your current document.

<img src="https://cdn.jim-nielsen.com/blog/2023/a-link-url-hint.png" width="709" height="157" alt="Screenshot of a browser URL preview showing the link of a current document." />

Cheers to anybody trying to do this without JavaScript!