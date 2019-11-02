---
title: Applying Multiple Background Colors with CSS
tags: engineering
---

## The Problem

I’ve been [playing](https://blog.jim-nielsen.com/2019/conditional-syntax-highlighting-in-dark-mode-with-css-imports/) with [supporting](https://blog.jim-nielsen.com/2018/icon-galleries-dark-mode/) “dark mode” [a lot recently](https://blog.jim-nielsen.com/2018/dark-mode-on-the-web/). One of the foundational CSS features I leverage for building dark/light themes is custom properties (a.k.a. CSS variables). I essentially define a number of color variables I plan to use through my UI, then change their values based on whether the client is in “dark mode” or not.

In addition to primary and secondary colors, I often define a number of base neutral colors in `rgba`. Why `rgba`? I want to leverage the alpha channel so those neutral colors can blend in with other colors of the site.

![Graphic showing and explaining a UI element with rgba colors](https://cdn.jim-nielsen.com/blog/2019/multiple-backgrounds-css-colors-outline.png)

What this means is I start with a number of neutral colors for light mode:

```css
@media screen and (prefers-color-scheme: light) {
  :root {
    --color-background: rgba(255,255,255,1); /* white */
    --color-border-dark: rgba(0,0,0,1);      /* black */
    --color-border-medium: rgba(0,0,0,.7);   /* gray */
    --color-border-light: rgba(0,0,0,.3);    /* light gray */
  }
}
```

And then switching to dark mode is easy: I flip the color definitions to the other end of the spectrum.

```css
@media screen and (prefers-color-scheme: dark) {
  :root {
    --color-background: rgba(0,0,0,1);           /* black */
    --color-border-dark: rgba(255,255,255,1);    /* white */
    --color-border-medium: rgba(255,255,255,.7); /* gray */
    --color-border-light: rgba(255,255,255,.3);  /* light gray */
  }
}
```

This is rather simplistic for illustration purposes, but you get the idea. The problem is, I often need a solid version of those colors in my UI because I want an element to overlay—and block out—another element.

![Screenshot showing the problem where a UI element with a transparent color is trying to overlay—and block out—another UI element](https://cdn.jim-nielsen.com/blog/2019/multiple-backgrounds-css-on-white-problem.png)

When I write `background-color: var(--color-border-light)`, what I often want is that color *as if it was appearing on white (the background color)*. So the question becomes: could I tell CSS that? Display my specified color *as if it were blending into the natural background color*? Something like this:

```css
.element {
  /* Put the transparent color on top
     and have it blend into a solid color underneath */
  background-color: var(--color-border-light), var(--color-background);
}
```

## The Solution

Turns out that you can display multiple background colors in CSS and achieve the effect I described above, you just need to leverage gradients to do it. Essentially, you declare two different gradients in CSS—one solid one transparent—that blend into each other. 

![Screenshot a transparent and a solid UI element overlaying another UI element along with the corresponding CSS values to achieve the effect](https://cdn.jim-nielsen.com/blog/2019/multiple-backgrounds-css-on-white.png)

What’s neat about this is, given the “dark mode” colors we declared above, when you switch to dark mode this “just works”.

![Screenshot showing one UI elements overlaying other UI elements but in dark mode](https://cdn.jim-nielsen.com/blog/2019/multiple-backgrounds-css-on-black.png)

Here’s some example code:

```css
.element {
  background-image: 
    /* Transparent color on top */
    linear-gradient(
      var(--color-border-light),
      var(--color-border-light)
    ),
    /* Solid color underneath */
    linear-gradient(
      var(--color-background),
      var(--color-background)
    );
}
```

I’m sure there are other ways you could solve this issue—like by defining and using colors differently—but this worked great for my use case under the paradigm in which I had defined my colors. Maybe you’ll find it handy too.
