---
title: Modifying a Single Color in CSS Color
---

I’ve quite often found myself in a situation like the following:

I have a color defined in CSS as a variable and often need different shade or variation of that color. I don’t want to define n number of variations that I need. I would rather dynamically generate the color I need for each particular context. And that’s possible, [I’ve written about it](https://blog.jim-nielsen.com/2019/generating-shades-of-color-using-css-variables/) previously. It looks something like this:

```css
:root {
  --color-highlight: 255, 0, 0;
}

.selector {
  background-color: rgba(var(--color-highlight), 0.5);
}
```

That works great for the majority of my use cases where I need a _lighter_ color of my base color. But what if I want a darker color of my base color? Well there are [color functions in Sass](https://sass-lang.com/documentation/functions/color) but Sass is overkill for most of my use cases. There ~~is~~ was the color function spec for CSS, but that’s dead now (you can see how it could’ve worked on [ColorMe](https://colorme.io/)). 

So what’s one to do? 

Well the answer is “it depends”. But for my particular use case, let me show you a little trick that worked for me.

I just wanted to have a darker color for my `<a>` links on hover. That’s all. I had a color variable for my links (that could be defined for both light and dark mode) and I wanted links to get slightly darker when you hover on them. An effect like this:


So how can you do that in CSS without defining a new color?

```css
:root {
  --color-link: 255, 0, 0;
}

a {
  color: rgb(var(--color-highlight));
}
a:hover {
  color: /* a slightly darker version of var(--color-highlight) */
}
```

[A genius little workaround](https://stackoverflow.com/a/25942447) I stumbled on is to use the `filter` rule. There are [a number of options](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) of available relating to color, but what worked for me was `brightness`.

```css
:root {
  --color-link: 255, 0, 0;
}

a {
  color: rgb(var(--color-highlight));
}

a:hover {
  color: brightness(0.6);
}
```

Granted that will change the entire appearance of the element, but for this particular use case, it worked perfect for me. I got a darker color on hover without having to add more color declarations, just what I wanted.

![gif showing link color change on hover]({{site.imageurl}}/2019/css-filter-on-hover.gif)

That’s it.


