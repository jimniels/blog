---
tags: engineering
---

# Dynamically Darken a Color in CSS

I’ve quite often found myself in a situation like the following:

I have a color defined in CSS as a variable and I need different shade or variation of that color. I don’t want to define `n` number of variations that I need. I would rather dynamically generate the color I need for each particular context (and I don’t want to use Sass). It’s possible, [I’ve written about it](https://blog.jim-nielsen.com/2019/generating-shades-of-color-using-css-variables/) previously. It looks something like this:

```css
:root {
  --color-highlight: 255, 0, 0;
}

.selector {
  background-color: rgba(var(--color-highlight), 0.5);
}
```

That works great for the majority of my use cases where I need a _lighter_ color of my base color. But what if I want a darker color of my base color? Well there are [color functions in Sass](https://sass-lang.com/documentation/functions/color) but, as I said, I don’t want to use Sass. There ~~is~~ was a promising color function spec for CSS, but that’s dead now (you can see how it could’ve worked on [ColorMe](https://colorme.io/)). 

So what’s one to do? Well that depends on your situation. But for my particular use case, let me show you a little trick that worked for me.

I wanted to have a darker color for my `<a>` links on hover. That’s it. I had a color variable for my links (both a light and dark mode value) and I wanted links to get slightly darker when you hover on them.

So how can you do that in CSS without defining a new color?

```css
:root {
  --color-highlight: 255, 0, 0;
}

a {
  color: rgb(var(--color-highlight));
}

a:hover {
  /* I need a slightly darker version of var(--color-highlight)
     Imagine, for example, if that last value – the opacity – could be increase
     i.e. something like this: */
  color: rgba(var(--color-highlight), 1.5)
}
```

[A genius little workaround](https://stackoverflow.com/a/25942447) I stumbled on is to use the `filter` rule. There are [a number of options](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) available for the filter rule that result in color changes, but what worked for me in this case was `brightness()`.

```css
:root {
  --color-highlight: 255, 0, 0;
}

a {
  color: rgb(var(--color-highlight));
}

a:hover {
  filter: brightness(0.6);
}
```

Granted that will change the entire appearance of the element, but for this particular use case, it worked perfect for me. I got a darker color on hover without having to add more color declarations, just what I wanted.

![gif showing link color change on hover](https://cdn.jim-nielsen.com/blog/2019/css-filter-on-hover.gif)

That’s it. That’s all I wanted to share.

## Update 2021-11-13

The ability to destructure the individual channels of any given color is coming in the form of [CSS relative colors](https://blog.jim-nielsen.com/2021/css-relative-colors/)! You can even leverage `calc()` to increase or decrease individual channels, like the `lightness` channel in `hsl()`. Example:

```css
:root {
  --color-highlight: hsl(12, 15%, 40%);
}

a {
  color: rgb(from var(--color-highlight) h s calc(l + 5%));
}
```