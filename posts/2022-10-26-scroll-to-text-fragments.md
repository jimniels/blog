# Scroll to Text Fragments

Scroll to text fragments [just landed in Safari](https://webkit.org/blog/13399/webkit-features-in-safari-16-1/) which makes [support](https://caniuse.com/url-scroll-to-text-fragment) even more broad.

If you’re not already familiar with it, this feature allows you anchor link to _any_ text on the web.

For example, anchor linking to a specific element in the document today requires a fragment in the URL and a matching ID in the DOM, e.g.

`/my/path#my-heading`

Will scroll the user to an element with the `my-heading` ID, e.g.

`<h2 id="my-heading">My Heading</h2>`

That’s great when authors provide IDs, but in many cases they do not. Additionally, how do you anchor link to any arbitrary fragment of text like a sentence in the middle of a paragraph?

The [text fragments specification](https://wicg.github.io/scroll-to-text-fragment/) details how.

`/my/path#:~:text=My%20Heading`

Would scroll the user to the matching text “My Heading” _and_ highlight it — no IDs required.

`<h2>My Heading</h2>`

To make this easier for users, browsers like Chrome can supply a user action to help formulate these links, e.g. 1) highlight the text you want to link to, 2) right-click for a context menu, 3) choose “Copy Link to Highlight”, 4) share the URL.

<img src="https://cdn.jim-nielsen.com/blog/2022/fragment-text-example.png" width="999" height="2233" alt="Three screenshots of a webpage in Chrome showing how users can select any arbitrary text on the page, right-click for a context menu, choose “Copy Link to Highlight” and the browser will generate a URL for sharing which, when accesses, will visually highlight the selected text." />

I absolutely love this feature! It’s just oozing with web-iness.

There’s a whole lot more to this API. You can read [Thomas’ excellent article on dev.to for more details](https://web.dev/text-fragments/).

Being a lover of URLs, what I was most curious about was the anatomy of this new API in the URL.

`/foo#bar:~:text=baz`

- `foo` is the path
- `bar` is the fragment
- `:~:` is the fragment directive delimiter
- `text=baz` is the fragment directive

<img src="https://cdn.jim-nielsen.com/blog/2022/fragment-text-anatomy.png" width="500" height="300" alt="Visualization of the URL `/foo#bar:~:text=baz` where “foo” is highlighted as the path, “bar” as the fragment, “:~:” as the fragment directive delimeter, and “text=baz” as the fragment directive. " />

[The spec](https://wicg.github.io/scroll-to-text-fragment/) doesn’t say anything about why the string `:~:` is the delimiter, but it does say `text=baz` is only the first fragment directive, others may follow in the future.

> The fragment directive is meant to carry instructions, such as `text=`, for the UA rather than for the document…future directives could be added without introducing breaking changes to existing content. Potential examples could be: image-fragments, translation-hints

This got me wondering about the origin story of this API. After some fruitless searching, [I asked Thomas about it on Twitter](https://twitter.com/tomayac/status/1584824386850553857) and he pointed me to [the WICG scroll-to-text-fragment GitHub issue](https://github.com/WICG/scroll-to-text-fragment/issues/15#issuecomment-534299296). 

It’s interesting to read that thread and see how standards folks wrestled with introducing a new API for the URL that wouldn’t break all the crazy shiz we’ve done on the web over the years — like the SPA routing adventures of earlier years, anyone remember the Twitter hashbang `twitter.com/#!/user/id`?

Ultimately, [it looks like](https://github.com/WICG/scroll-to-text-fragment/issues/15#issuecomment-534299296) a Chromium engineer dug through “a sample of all URLs seen by Google crawlers over the last 5 years” with some delimiters in mind (e.g. `##` and `@@`) and decided that `:~:` struck the best balance of compatibility, as it wasn’t found in any existing URLs.

One other intriguing thing in that thread: there are a couple examples of other potential fragment directives (besides text). One was the idea of selecting any arbitrary node in the DOM via the URL, e.g.

`:~:select=div>:nth-child(2)>span.whatever`

I always love reading these threads and discovering wild ideas for the web I would’ve never considered.

Anyhow, that’s the backstory on scroll to text fragments I wanted to know. Figured I’d write it down and pass it on. Big thanks to all those people who worked on it!