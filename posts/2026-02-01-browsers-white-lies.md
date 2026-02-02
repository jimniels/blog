#css

# The Browser’s Little White Lies

So I’m making a thing and I want it to be styled different if the link’s been visited.

Rather than build something myself in JavaScript, I figure I’ll just hook into the browser’s mechanism for tracking if a link’s been visited (a sensible approach, [if I do say so myself](https://blog.jim-nielsen.com/2025/browser-apis-as-sass/)). 

Why write JavaScript when a little CSS will do? So I craft this:

```css
.entry:has(a:visited) {
  opacity: .5;
  filter: grayscale(1);
}
```

But it doesn’t work.

`:has()` is relatively new, and I’ve been known to muff it, so it’s probably just a syntax issue.

I start researching.

Wouldn’t you know it? We can’t have nice things. `:visited` doesn’t always work like you’d expect because we (not me, mind you) exploited it.

[Here’s MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors/Privacy_and_:visited):

> You can style visited links, but there are limits to which styles you can use.

While `:has()` is not mentioned specifically, other tricks like sibling selectors are:

> When using a sibling selector, such as `:visited + span`, the adjacent element (`span` in this example) is styled as though the link were unvisited.

Why? You guessed it. Security and privacy reasons.

If it were not so, somebody could come along with a little JavaScript and uncover a user’s browsing history (imagine, for example, setting styles for visited and unvisited links, then using `window.getComputedStyle` and checking style computations).

MDN says browsers tell little white lies:

> To preserve users' privacy, browsers lie to web applications under certain circumstances

So, from what I can tell, when I write `.entry:has(a:visited)` the browser is telling the engine that handles styling that all `.entry` items have never been `:visited` (even if they have been).

So where does that leave me?

Now I will abandon CSS and go use JavaScript for something only JavaScript can do.

That’s a good reason for JS.