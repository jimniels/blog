#css

# Letter Case on the Web

Let’s talk about doing uppercase in CSS vs. JS.

I’ve encountered the side effects of this choice many times, the latest being today which caused me to write this blog post as a way to work through my feelings on the matter.

Note: I’m going to set aside for a moment the concept of [small caps](https://en.wikipedia.org/wiki/Small_caps) in typography and whether it should or should not be applied in various scenarios where all caps are used—that’s a different discussion.

Let’s say you’re building a UI and you want a bit of text to be all caps. This commonly happens with headings (`<h1>`, `<h2>`, etc.). How do you go about doing it?

If you’re using CSS—directly on an element via the `style` attribute, a separate `.css` file, or [however one does CSS these days](https://blog.jim-nielsen.com/2019/thoughts-on-jeremy-keiths-split/)—you can accomplish this by using the rule: `text-transform: uppercase`. For example:

```html
<h1 style="text-transform: uppercase">My Post Title</h1>
```

Many websites today use a templating system, whether in JavaScript on the client or some other language on the server. This results in developers often shortcutting the separation of styles from content and using something like `.toUpperCase()` in JavaScript. Here’s an example for, say, a React component:

```jsx
function MyComponent({ postTitle }) {
  return (
    <h1>{postTitle.toUpperCase()}</h1>
    {/* some more content here */}
  );
}
```

On the surface, using CSS or JS here accomplish the same thing. You look at the UI and the letters are all capitalized. Boom, task complete. But I’m here to remind anyone who will listen that they these approaches are not equivalent.

Using CSS maintains a separation between _the content_ and _the content’s appearance_. Using `.toUpperCase()` alters both the content itself and its appearance.

Why does any of this matter? Here’s an example: if I see content on the web I want to copy and paste, selecting the text and copying it is going to copy the underlying _content_. If the letter casing is all caps in the content (the HTML), it’s going to paste the content in all caps. But if the letter casing is applied via style rules in CSS, selecting the text and copying it will copy what’s in the underlying HTML (not how it appears on screen—granted there’s some caveats here with the whole “Paste and Match Style” thing, but let’s bracket that out for now). Personally, I hate when I copy/paste text that is all caps _in the content_ because I always end up having to reformat it. 

So, the next time you hear someone say they want a bit of text to “be in all caps” you can respond by asking: do you want the text to _appear_ in all caps, or to you want the content itself to _be_ in all caps? There’s a difference.

Now, it is possible that you want the underlying content to be formatted in all caps (irregardless, even, of its appearance). That’s perfectly fine. It’s your content, do what you think is best. But this post is a gentle reminder to not conflate the style and presentation of the content on screen with the underlying content itself. `.toUpperCase()` and `text-transform: uppercase` are not the same. If your sole interaction with the content of a page is looking at it with your eyes, then you might think they are equivalent. But a website is more than what you _see_, it’s what you _use_.

## Update 2023-11-07

As [pointed out to me on Mastodon by @pepelsbey](https://mastodon.social/@pepelsbey/111370479919120211), the spec says:

> [text-transform] transforms text for styling purposes. It has no effect on the underlying content, and must not affect the content of a plain text copy & paste operation.

But, at the time of this writing, Firefox appears to be the only one that’s following the spec. [More details](https://pepelsbey.dev/articles/uppercase-copy-paste/).