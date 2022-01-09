---
tags: css
---

# Dynamic Color Manipulation with CSS Relative Colors 

I was reading Dave’s post [“Alpha Painlet”](https://daverupert.com/2021/10/alpha-paintlet/) when I first learned about CSS relative colors.

🤯

CSS relative colors enable the dynamic color manipulation I’ve always wanted in vanilla CSS since Sass’ color functions first came on the scene (`darken()`, `lighten()`, etc.).

Allow me to explain a bit more about why I’m so excited.

## Dynamic Colors in CSS via Transparency

I’ve written about [generating shades of color using CSS variables](https://blog.jim-nielsen.com/2019/generating-shades-of-color-using-css-variables/), which details how you can create dynamic colors using custom properties and _the alpha channel_ of a supporting color function. For example:

```css
:root {
  --color: 255 0 0;
}

.selector {
  background-color: rgb(var(--color) / 0.5);
}
```

However, there are limitations to this approach.

First, all your custom property color values must be defined in  a color space whose notation supports the alpha channel in its color function, like `rgb()`, `rgba()`, `hsl()`, and `hsla()`. For example: 

```css
:root {
  --color-rgb: 251 0 0;
  --color-hsl: 5 10% 50%;
}

.selector {
  background-color: rgb(var(--color-rgb) / 0.5);
  background-color: hsl(var(--color-hsl) / 0.5);
}
```

You can’t “coerce” a custom property’s color value from one type to another:

```css
:root {
  --color: #fb0000;
}

.selector {
  /* Coercing a HEX color to an RGB one doesn't work */
  background-color: rgb(var(--color) / 0.5);
}
```

Dynamic colors in CSS using HEX color values is impossible. While you can [specify the alpha channel for a HEX color](https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4), you can only do so declaratively (i.e. `#ff000080`). CSS has no notion of concatenating strings.

```css
:root {
  --color: #ff0000;
}

.selector {
  /* You can’t dynamically specify the alpha channel. */
  background-color: var(--color) + "80";
}
```

And if you’re using named colors in CSS, well, you’re flat out of luck trying to do anything dynamic.

```css
:root {
  --color: green;
}

.selector {
  /* how would you even??? */
  background-color: var(--color) + "opacity: .5";
}
```

However, with relative colors in CSS this all changes!

You can declare a custom property’s value using any [color type](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) you want (hex, rgb, hsl, lch, even a keyword like `green`) and convert it on the fly to any other color type you want.

```css
:root {
  --color: #fb0000;
}

.selector {
  /* can’t do this */
  background-color: rgb(var(--color) / 0.5);
  
  /* can do this */
  background-color: rgb(from var(--color) r g b / .5);
}
```

It even works with color keywords!

```css
:root {
  --color: red;
}

.selector {  
  background-color: rgb(from var(--color) r g b / .5);
}
```

The easiest way for me to describe what’s happening here is to borrow terminology from JavaScript. With relative colors in CSS, you can declaratively perform a kind of [type coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion) from one color type to another and then [destructure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) the values you want.

I don’t know if that blows your mind as much as it blew mine, but take a minute to let that soak in. Imagine the possibilities that begin to open up with this syntax.

## Dynamic Colors in CSS via calc()

Dynamically changing colors using the alpha channel has its drawbacks. Transparent colors blend into the colors upon which they sit (you’re not always blending into white). You can take a color and get a “slightly lighter” version by changing its opacity, but that color won’t be the same everywhere. It is dependent upon which color(s) it sits on top of.

<img src="https://cdn.jim-nielsen.com/blog/2021/relative-colors-opacity.png" width="708" height="406" alt="The color `#ff0000` with 50% opacity bleeding into two different background colors." /> 

Sometimes you need a “slightly lighter” color without transparency. One that is opaque.

Or sometimes you need a “slightly darker” color, in which case you can’t set the alpha channel to `1.2` hoping it’ll get slightly darker.

Previously, you could achieve this flexibility in CSS by becoming incredibly verbose in your custom property definitions and defining each channel individually.

```css
:root {
  /* Define individual channels of a color */
  --color-h: 0;
  --color-s: 100%;
  --color-l: 50%;
}

.selector {
  /* Dynamically change individual channels */
  color: hsl(
    var(--color-h),
    calc(var(--color-s) - 10%),
    var(--color-l)
  );
}
```

This could get really verbose really fast. And color values like hexadecimal colors are not supported.

With CSS relative colors, this is now dead simple in combination with `calc()`.

```css
:root {
  --color: #ff0000;
}
.selector {  
  color: hsl(from var(--color) h calc(s - 10%) l);
}
```

Wild! A few more examples, for completeness:

```css
:root {
  --color: #ff0000;
}

.selector {
  /* syntax: hsl(from var() h s l / alpha) */
  
  /* change the transparency */
  color: hsl(from var(--color) h s l / .5);
  
  /* change the hue */
  color: hsl(from var(--color) calc(h + 180deg) s l);
  
  /* change the saturation */
  color: hsl(from var(--color) h calc(s + 5%) l);
  
  /* change all of them */
  color: hsl(
    from var(--color)
    calc(h + 10deg)
    calc(s + 5%)
    calc(l - 10%)
    /
    calc(alpha - 15%)
  );
}
```

Amazing! Sass color functions, let me show you the door.

## Conclusion

Destructuring? Type coercion? Do those words belong in a post about CSS? [Is CSS a programming language?](https://css-tricks.com/is-css-a-programming-language/)

The only thing we need now is the ability to have [user defined custom functions in CSS](https://github.com/w3c/css-houdini-drafts/issues/1007)—then you could create your own reusable `lighten()` and `darken()` functions.

But I digress.

Support for this syntax shipped in [Safari Technology Preview 122](https://developer.apple.com/safari/technology-preview/release-notes/) (check out [some of the tests](https://trac.webkit.org/changeset/278261/webkit/) to see examples of the syntax). At the time of this writing, it’s still an experimental feature so you have to enable it via the menubar “Develop > Experimental Features”.

Related resources:

- Codepen: [Working example of this syntax](https://codepen.io/jimniels/pen/dyzQeqr)
- The spec: [CSS color module level 5 - relative colors](https://www.w3.org/TR/css-color-5/#relative-colors)
- dev.to: [Fabio Giolito on upcoming color features in CSS](https://dev.to/fabiogiolito/create-a-color-theme-with-these-upcoming-css-features-4o83)


