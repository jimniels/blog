---
title: Generating Shades of Color Using CSS Variables
date: 2019-01-31
tags: engineering
---

Quite often I’ve found myself using [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) (a.k.a. CSS variables) for working with color values (especially when [doing dark themes](https://blog.jim-nielsen.com/2018/icon-galleries-dark-mode/)). This is usually the type of CSS I’ve written:

```css
:root {
  /* sometimes I use HEX colors */
  --color-text: #333;
  --color-highlight: #fb0000;

  /* sometimes I use RGB colors */
  --color-text: rgb(50, 50, 50);
  --color-highlight: rgb(251, 0, 0);
}

/* then use them like: */
.selector {
  color: var(--color-highlight);
}
```

My goal in working with colors on the web has been to define a limited, core color palette and then use lighter or darker shade variations of those core colors throughout my stylesheet. Problem is, those core colors are opaque and solid. So (turns out, erroneously) I always thought I’d have to create a large number of shade variants to have on hand when I need them, i.e.

```css
:root {
  --color-highlight: rgb(251, 0, 0);
  --color-highlight-9: rgba(251, 0, 0, .9);
  --color-highlight-8: rgba(251, 0, 0, .8);
  --color-highlight-7: rgba(251, 0, 0, .7);
  --color-highlight-6: rgba(251, 0, 0, .6);
  --color-highlight-5: rgba(251, 0, 0, .5);
  /* etc. */
}
```

This doesn’t feel good. Ten variants for every single core color? That could result in upwards of fifty color “variables”. Doesn’t feel much like a variable, does it? And what if I wanted an in-between value I hadn’t defined, like `rgba(251,0,0,.85)`?

When I used to write Sass, dealing with this problem was made relatively easy through Sass’ `rgba()` function:

```scss
$color-highlight: #fb0000;

.selector {
  background-color: rgba($color-highlight, .5);
}
```

As you can see, I could hand a HEX value to the `rgba()` function and Sass would convert it to a set of `rgb` values, then spit it out in `rgba()` syntax with my specified opacity:

```css
.selector {
  color: rgba(251, 0, 0, 0.5);
}
```

This was incredibly useful because I could generate any shade of a core color I needed, depending on my contextual use case. The only problem is, I have to be using Sass. CSS can’t do that...or so I thought.

## How You Can’t

In my mind it seemed impossible to do something like: 

```css
:root {
  --color-highlight: #fb0000;
}

.selector {
  background-color: rgba(var(--color-highlight), .5);
}
```

And it is. At least how I’ve outlined it above. And using `opacity` doesn’t work either, as it makes everything in the targeted element (and its children) transparent to a degree:

```css
:root {
  --color-highlight: #fb0000;
}

.selector {
  background-color: var(--color-highlight);
  opacity: .5;
}
```

One dirty workaround I used to leverage was to employ pseudo elements. Then I could, for example, position the pseudo element in the background of the main element, paint its background the color I want, then turn down the opacity (without affecting the main element or its children):

```css
:root {
  --color-highlight: #fb0000;
}

.selector {
  position: relative;
}
.selector::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: var(--color-highlight);
  opacity: .5;
}
```

That worked, but only in a narrow, limited set of use cases. What I needed was something like Sass’s `rgba()` function, but with CSS variables.

Even if you defined the color variable as an rgb value, you still couldn’t intermix it with rgba, i.e.

```css
:root {
  --color-highlight: rgb(251,0.0);
}

.selector {
  /* doesn't work */
  background-color: rgba(var(--color-highlight), .5);
}
```

As you’re about to see (or if you already know the solution here), I was *sooooo* close to the solution I was looking for. I was never able to make that last mental leap to the correct syntax.

## How You Can

I don’t know if I was just being lazy, or faithless that what I wanted couldn’t be done, but I can’t believe it’s 2019 and only now am I discovering this little trick.

If you define your color values as a comma-separated list of rgb values, then you can do exactly what Sass’s `rgba()` function allows you to do:

```css
:root {
  --color-highlight: 251, 0, 0;
}

.selector {
  background-color: rgba(var(--color-highlight), .5);
}
```

It’s that simple. The worst part is, when I finally thought “ok, i’ll go search Google and see if this is possible”, this insight was [the first result](https://stackoverflow.com/a/41265350/1339693).

What’s really neat about this too is that, if you *are* using Sass, you can leverage your color variables in Sass then pass them into your CSS output for usage there as well (FWIW, I wrote a little bit about [supporting CSS variables in Sass](https://blog.jim-nielsen.com/2018/supporting-css-variables-in-sass/)). 

In one particular use case of mine, this came in handy because at [Insight](https://www.icg360.com) we’re authoring a component library with a CSS framework but the source styles are actually written in Sass. Using this technique, we can define our theme color values in Sass, compile the styles to a CSS file, and empower consumers of our component library to leverage the same color variables we were using in Sass but via CSS. For example, in Sass:

```scss
// Color values
$color-highlight: #fb0000;
$color-secondary: #4caf50;

// Convert a hex value to comma-delimited rgb values
// In: #000
// Out: 0,0,0
@function derive-rgb-values-from-hex($hex) {
  @return red($hex), green($hex), blue($hex);
}

:root {
  // Brand colors as RGB values
  // This allows consumers to leverage opacity when working with colors, i.e.
  //   --my-var-name: 255, 161, 20;
  // Can be used like:
  //   background-color: rgba(var(--my-var-name), .5)
  --color-highlight: #{derive-rgb-values-from-hex($color-highlight)};
  --color-secondary: #{derive-rgb-values-from-hex($color-highlight)};
}
```

Consumers of our component library include our CSS in their app and then voilà! They can have some or all of our Sass color variables available for use as they see fit in their own CSS files:

```css
.selector {
  background-color: rgba(var(--color-highlight), .5);
}
```

Pretty cool. Still can’t believe I didn’t figure this out until Jan 2019.