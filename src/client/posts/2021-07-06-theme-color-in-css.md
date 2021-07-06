---
tags: css
---

# Theme Color in CSS

A couple things I’ve consumed have been converging in my brain leading to this post:

- [Apple’s WWDC video “Design for Safari 15”](https://developer.apple.com/videos/play/wwdc2021/10029/)
- [Jeremy’s notes on Safari 15](https://adactio.com/journal/18252)
- My own continued work in CSS with [system colors](https://blog.jim-nielsen.com/2021/css-system-colors/) and dark/light mode

Specifically, Safari has this new—and controversial to some—design that allows you to theme the navigation chrome of the app.

For [better](https://twitter.com/alexkaessner/status/1402211519518085121?s=21):

<img src="https://cdn.jim-nielsen.com/blog/2021/theme-color-example-good.jpg" width="700" height="473" alt="Screenshot of diagrams.app with a custom theme color in Safari 15." /> 

Or [worse](https://twitter.com/feross/status/1406851155842330625?s=21):

<img src="https://cdn.jim-nielsen.com/blog/2021/theme-color-example-not-so-good.gif" width="700" height="465" alt="Animation showing the chrome bar in Safari 15 changing color dynamically." /> 

In Apple’s video, they inform you how to achieve this effect using a `<meta>` tag:

```html
<meta name="theme-color" content="#ecd96f">
```

You can even do different colors for light and dark mode using media queries (in HTML):

```html
<meta name="theme-color" 
      content="#ecd96f" 
      media="(prefers-color-scheme: light)">
<meta name="theme-color" 
      content="#0b3e05" 
      media="(prefers-color-scheme: dark)">
```

When I first saw this in Apple’s video, I thought “hmmm that’s interesting…style declarations and and media queries _in HTML_? Why not CSS?”

It sort of made sense at first: the browser is going to want to know color info like this for the first paint. For the best effect, you’re going to want to stick this information in the first request that comes over the network—that is, in the HTML document.

But then I noticed [Jeremy callout the same thing](https://adactio.com/journal/18252):

> It’s a little bit weird that this stylistic information is handled by HTML rather than CSS

That’s not the only part where the mental model of putting stylistic rules in CSS gets broken.

In Apple’s video, Jen points out that—since we’re dealing with HTML here in the form of `<meta>` tags—browsers will use the _first_ `<meta>` element they find and ignore the rest. This means you have to specify your default _first_ in terms of sequence. Conversely, when declaring styles in CSS the _last_ rule takes precedence. How’s that for subtle confusion?

```html
<!-- This one will get used -->
<meta name="theme-color" content="#000000">
<!-- This one will get ignored -->
<meta name="theme-color" content="#ffffff">

<style>
body {
  /* this one will get ignored */
  background: #000000;
  /* this one will get used */
  background: #ffffff;
}
</style>
```

While Apple’s video does a good job of explaining this all, I’m willing to bet more than one person is going to get tripped up on the subtle differences here.

## Doing Theme Color in CSS?

What if these style controls were defined in CSS rather than HTML? This wouldn’t get around the problem of having the information available in the first network request—though you could, conceivably, recommend developers put it in a `<style>` tag in the head of the document.

The purist in me wants to speculate on what a CSS API would look like. Granted I don’t understand any of the context and constraints browser vendors deal with on this problem—but if you use “CSS is where stylistic control is handled _first_” as the guiding principle, it’s fun to think about what that could look like.

### Keep the Same API, But Maninpulate HTML in CSS?

What if we could override the current `<meta>` info in CSS? For example, imagine if CSS let you declare values for HTML attributes:

```css
/* HTML equivalent:
   <meta name="theme-color" content="#ecd96f" > */

meta[name="theme-color"] {
  attr-content: "#ecd96f"
}
@media (prefers-color-scheme: dark) {
  meta[name="theme-color"] {
    attr-content: "#f38daef"
  }
}
```

Ok that’s crazy talk. But still fun to imagine. What other solutions could exist?

### A Standard Property

What if `theme-color` were a property in CSS and you declared it on the root element in order to apply it:

```css
:root {
  theme-color: #ecd96f;
}
@media (prefers-color-scheme: dark) {
  :root {
    theme-color: #f38daef;
  }
}
```

The problem here is that `theme-color` doesn’t work like every other standard CSS property because it’s only relevant to a single selector (`:root`). For example, the `background` property can be applied to any selector, from `:root` to `div` to `.classname`. But, in the example above, a `theme-color` property would only ever be applicable to the `:root` element—so making it a property doesn’t make a ton of sense.

What other options could exist?

### A Custom Property, a.k.a. CSS Variables

What if theme color were a custom property in CSS? That could make a lot of sense, especially given that Safari is already going to choose a value for you by default. So you’re really just overriding their default. 

Similar to [system colors](https://blog.jim-nielsen.com/2021/css-system-colors/) in CSS, what if there were system variables that the browser would set in their own UA stylesheet as defaults, but then as web developers we could override them? Imagine, for example, that they all started with the `--system-` prefix:

```css
/* The browser would set its own values for
   `--system-theme-color` behind the scenes. Then we can 
   override that value on the root if we want. */
:root {
  --system-theme-color: #ecd96f;
}
@media (prefers-color-scheme: dark) {
  :root {
    --system-theme-color: #f38daef;
  }
}
```

That’s interesting. There are edge cases here, like what if someone set `--system-theme-color` on an element lower in the DOM and not on `:root`, what happens then? But I’m going to take the easy road and eschew the hard questions here, presuming that could be worked out. It’s still a somewhat compelling idea: the browser reserves the ability to set it’s own standardized custom properties which web authors could override if they wanted? 

Is this crazy talk?

The idea of putting this stylistic control in CSS rather than HTML is even more intriguing when you begin to look at the additional use cases outlined in Apple’s video.

At one point in the demo, the presenter shows how it’s very likely you’ll want to change the initial `<meta name="theme-color">` value to respond to changes in your UI.

Showing the example from the video, imagine you have your initial `<meta>` element with a certain color.

<img src="https://cdn.jim-nielsen.com/blog/2021/theme-color-dynamic-before.png" width="957" height="569" alt="Screenshot from “Design for Safari 15 - WWDC21” video where Safari’s application chrome is set to a blue color." /> 

But then you trigger a UI change that necessitates a color change to your initial theme color. For example: you enter a “theater” mode where everything goes black except the picture. You’d want the Safari application chrome to respond accordingly:

<img src="https://cdn.jim-nielsen.com/blog/2021/theme-color-dynamic-after.png" width="957" height="569" alt="Screenshot from “Design for Safari 15 - WWDC21” video where Safari’s application chrome is set to a black color dynamically via JavaScript." /> 

In the video, we’re told that you can control this style by using JavaScript. You’re required to reach into the DOM and change the `<meta>` yourself based on some event triggering (which you have to setup).

I can imagine this getting tedious because you’re not merely changing one `<meta>` value. You have to change the dark mode equivalent if you have one. And you have to change them both back to the original values when appropriate (like upon leaving “theater” mode). For example:

```js
// Pull the original values first delivered with the HTML
const themeColorOriginalLightMode = document
    .querySelector("meta[name='theme-color']")
    .getAttribute("content");
const themeColorOriginalDarkMode = document
    .querySelector("meta[name='theme-color'][media='(prefers-color-scheme: dark)']")
    .getAttribute("content");

// Setup functions that will respond to UI changes and
// change the `theme-color` back and forth accordingly
function respondToEnteringSlideshowMode() {
  document
    .querySelector("meta[name='theme-color']")
    .setAttribute("content", "#...")
  document
    .querySelector("meta[name='theme-color'][media='(prefers-color-scheme: dark)']")
    .setAttribute("content", "#...")
}
function setOriginalThemeColors() {
  document
    .querySelector("meta[name='theme-color']")
    .setAttribute("content", themeColorOriginalLightMode);
  document
    .querySelector("meta[name='theme-color'][media='(prefers-color-scheme: dark)']")
    .setAttribute("content", themeColorOriginalDarkMode)
}
```

This gets pretty hairy quick—especially if you have multiple places where you’re changing the original theme colors.

What really stands out to me about this is that **you’re  controlling styles via HTML and JavaScript but never via CSS**! 

If `theme-color` were something you could control with CSS, this would all feeler more idiomatic. For simplicity’s sake, imagine the custom property solution:

```css
/* Set the initial values for theme-color */
:root {
  --system-theme-color: #ecd96f;
}
@media (prefers-color-scheme: dark) {
  :root {
    --system-theme-color: #f38daef;
  }
}

/* When certain things change in the app, respond accordingly
   by changing the variable for theme color. For example:
   JS applies a class to the root element to denote state
   and we respond to that with styles for that state in CSS */
:root.slideshow--is-open {
  --system-theme-color: #123abc;
}
@media (prefers-color-scheme: dark) {
  :root.slideshow--is-open {
    --system-theme-color: #456def;
  }
}
```

Your theme color is likely going to match some other color in your UI—like body background—so now you’ve got that color defined in a single place and can merely use that variable where appropriate! Reuse FTW!

## Conclusion 

All the above is pure (and fun) speculation on my part. There are caveats, use cases, and context that I am undoubtedly missing.

However, the idea of ceding primary stylistic control to the technology that bears the word “Style” in it’s name (Cascading Style Sheets), rather than having to use HTML or JS, seems more [with the grain](https://frankchimero.com/blog/2015/the-webs-grain/) of the web.