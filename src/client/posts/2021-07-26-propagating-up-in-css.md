---
tags: css
---

# Propagating Up in CSS

Chris describes this problem perfectly in [a CSS Tricks article from 2013](https://css-tricks.com/just-one-of-those-weird-things-about-css-background-on-body/): you set the `<body>` background color and the whole page is colored, but then later it isn’t.

<img src="https://cdn.jim-nielsen.com/blog/2021/cascade-up-body-background.png" width="935" height="511" alt="Screenshot of a webpage where the entire page is red vs. one where only a part of the webpage is red." /> 

What exactly is happening here? The `body` element, by default, doesn’t fill the browser window. It’s as tall as its content, like a `<div>` or any other element.

> In the absence of a background on the html element, the body background will cover the page. If there is a background on the html element, the body background behaves just like any other element.

A fix? Set the background color on the `html` element not the `body`.

But this is actually a strange anomaly of CSS if you think about it: styles appear to flow upwards rather than downwards?

In a way, it kind of makes sense. Nothing you put in `<head>` is ever visible on the page, so it seems rather intuitive for a web developer to think `<body>` = canvas of the page.

```html
<html>
  <head><!-- Nothing in here is visible --></head>
  <body><!-- Everything in here is visible --></body>
</html>
```

I recently learned this interesting tidbit of information from Šime Vidas’ excellent [Web Platform News](https://www.patreon.com/posts/51903480):

> The CSS Working Group has [decided](https://github.com/w3c/csswg-drafts/issues/6079#issuecomment-816307011) that no future CSS properties should propagate from `<body>` to the viewport. In CSS, there are [a handful of properties](https://twitter.com/frivoal/status/1171765332995801088) that propagate upwards from `<body>` to `<html>` and the viewport, including direction, writing-mode, background (see the [spec](https://drafts.csswg.org/css-backgrounds/#body-background)), and overflow. This type of behavior is now [deprecated](https://twitter.com/TerribleMia/status/1380310383588646916) and can be considered legacy.

Something being deprecated in CSS? That’s [rare](https://twitter.com/TerribleMia/status/1380310383588646916). I do like the more broad assertion though that this type of behavior (things propagating upwards in CSS) is now considered legacy. Now the intuitive sense that everything flows down in CSS won’t be violated by a one-off exception—at least not this one.