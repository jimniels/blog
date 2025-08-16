#css #html

# Setting Element Ordering With HTML Rewriter Using CSS

After shipping my work [transforming HTML with Netlify’s edge functions](https://blog.jim-nielsen.com/2025/transform-html-with-edge-functions/) I realized I have a little bug: the order of the icons specified in the URL doesn’t match the order in which they are displayed on screen.

Why’s this happening?

I have a bunch of links in my HTML document, like this:

```html
<icon-list>
  <a href="/1/">…</a>
  <a href="/2/">…</a>
  <a href="/3/">…</a>
  <!-- 2000+ more -->
</icon-list>
```

I use [html-rewriter](https://github.com/worker-tools/html-rewriter) in my edge function to strip out the HTML for icons not specified in the URL. So for a request to:

`/lookup?id=1&id=2`

My HTML will be transformed like so:

```html
<icon-list>
  <!-- Parser keeps these two -->
  <a href="/1/">…</a>
  <a href="/2/">…</a>
  
  <!-- But removes this one -->
  <a href="/3/">…</a>
</icon-list>
```

Resulting in less HTML over the wire to the client.

But what about _the order_ of the IDs in the URL? What if the request is to:

`/lookup?id=2&id=1`

Instead of:

`/lookup?id=1&id=2`

In the source HTML document containing _all_ the icons, they’re marked up in reverse chronological order. But the request for this page may specify a different order for icons in the URL. So how do I rewrite the HTML to match the URL’s ordering?

The problem is that html-rewriter doesn’t give me a fully-parsed DOM to work with. I can’t do things like “move this node to the top” or “move this node to position `x`”.

With html-rewriter, you only “see” each element as it streams past. Once it passes by, your chance at modifying it is gone. (It seems that’s just the way these edge function tools are designed to work, keeps them lean and performant and I can’t shoot myself in the foot).

So how do I change the icon’s display order to match what’s in the URL if I can’t modify the order of the elements in the HTML?

CSS to the rescue!

Because my markup is just a bunch of `<a>` tags inside a custom element and I’m using CSS grid for layout, I can use the `order` property in CSS!

All the IDs are in the URL, and their position as parameters has meaning, so I assign their ordering to each element as it passes by html-rewriter. Here’s some pseudo code:

```js
// Get all the IDs in the URL
const ids = url.searchParams.getAll("id");

// Select all the icons in the HTML
rewriter.on("icon-list a", {
  element: (element) => {
    // Get the ID
    const id = element.getAttribute('id');
    
    // If it's in our list, set it's order
    // position from the URL
    if (ids.includes(id)) {
      const order = ids.indexOf(id);
      element.setAttribute(
        "style",
        `order: ${order}`
      );
    // Otherwise, remove it
    } else {
      element.remove();
    }
  },
});
```

Boom! I didn’t have to change the order in the source HTML document, but I can still get the displaying ordering to match what’s in the URL.

I love shifty little workarounds like this!