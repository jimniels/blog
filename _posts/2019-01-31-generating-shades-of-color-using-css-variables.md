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
  --color-highlight-9: rgba(251, 0, 0, 0.9);
  --color-highlight-8: rgba(251, 0, 0, 0.8);
  --color-highlight-7: rgba(251, 0, 0, 0.7);
  --color-highlight-6: rgba(251, 0, 0, 0.6);
  --color-highlight-5: rgba(251, 0, 0, 0.5);
  /* etc. */
}
```

This doesn’t feel good. Ten variants for every single core color? That could result in upwards of fifty color “variables”. Doesn’t feel much like a variable, does it? And what if I wanted an in-between value I hadn’t defined, like `rgba(251,0,0,.85)`?

When I used to write Sass, dealing with this problem was made relatively easy through Sass’ `rgba()` function:

```scss
$color-highlight: #fb0000;

.selector {
  background-color: rgba($color-highlight, 0.5);
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
  background-color: rgba(var(--color-highlight), 0.5);
}
```

And it is. At least how I’ve outlined it above. And using `opacity` doesn’t work either, as it makes everything in the targeted element (and its children) transparent to a degree:

```css
:root {
  --color-highlight: #fb0000;
}

.selector {
  background-color: var(--color-highlight);
  opacity: 0.5;
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
  opacity: 0.5;
}
```

That worked, but only in a narrow, limited set of use cases. What I needed was something like Sass’s `rgba()` function, but with CSS variables.

Even if you defined the color variable as an rgb value, you still couldn’t intermix it with rgba, i.e.

```css
:root {
  --color-highlight: rgb(251, 0);
}

.selector {
  /* doesn't work */
  background-color: rgba(var(--color-highlight), 0.5);
}
```

As you’re about to see (or if you already know the solution here), I was _sooooo_ close to the solution I was looking for. I was never able to make that last mental leap to the correct syntax.

## How You Can

I don’t know if I was just being lazy, or faithless that what I wanted couldn’t be done, but I can’t believe it’s 2019 and only now am I discovering this little trick.

If you define your color values as a comma-separated list of rgb values, then you can do exactly what Sass’s `rgba()` function allows you to do:

```css
:root {
  --color-highlight: 251, 0, 0;
}

.selector {
  background-color: rgba(var(--color-highlight), 0.5);
}
```

It’s that simple. The worst part is, when I finally thought “ok, i’ll go search Google and see if this is possible”, this insight was [the first result](https://stackoverflow.com/a/41265350/1339693).

What’s really neat about this too is that, if you _are_ using Sass, you can leverage your color variables in Sass then pass them into your CSS output for usage there as well (FWIW, I wrote a little bit about [supporting CSS variables in Sass](https://blog.jim-nielsen.com/2018/supporting-css-variables-in-sass/)).

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
  background-color: rgba(var(--color-highlight), 0.5);
}
```

Pretty cool. Still can’t believe I didn’t figure this out until Jan 2019.

---

## Update Mar 27, 2019

[Tyler](https://tylergaw.com/) ([@thegaw](https://twitter.com/tylergaw)) pinged me on twitter and dropped this little note:

> I'm using your trick for using css custom prop for color + rgba. 👍 working great, thanks! I'm finding myself setting a hex and rgb variables...That way I don't always have to use `rgba`, if I only need the hex value. Can just use `var()`

He dropped this code example to illustrate:

```css
--color-white: #fff;
--color-white-rgb: 255, 255, 255;
--color-text: #2f0664;
--color-text-rgb: 47, 6, 100;
```

This is a great tip! Since creating this post and using the approach I outlined, I found it tedious to constantly be declaring the color model syntax in addition to the color model values. For example:

```css
/* Given a variable of rgb values */
:root {
  --my-color-rgb: 255, 255, 255;
}
/* That gives me flexibility in working with the alpha channel */
.selector {
  color: rgba(var(--my-color), 0.25);
}
/* But to get the solid version of that color, I have to write this: */
.selector {
  color: rgba(var(--my-color), 1);
}
/* Or this */
.selector {
  color: rgb(var(--my-color));
}
```

As you can see, I declare a solid color for my variable, but I have to wrap it in the `rgb` or `rgba` syntax to use it—opacity or no opacity. Kind of a bummer. So Tyler’s suggestion is spot on with real-world use.

I think the reason I probably avoided this approach mentally is because I did’t like mixing HEX and RGB color value declarations. I’m not a machine and can’t do the translation of RGB to HEX in my brain. Imagine coming into a codebase anew and seeing:

```css
--color-text: #2f0664;
--color-text-rgb: 47, 6, 100;
```

How would you know that those are actually the same color, just expressed in the syntax of different color models? It’s probably safe to assume they are the same colors, but the ambiguity is there. Obviously you could just add a comment. Or you could also use `rgb` instead of `hex`.

```css
--color-text: rgb(47, 6, 100);
--color-text-rgb: 47, 6, 100;
```

I think that makes it a little more obvious what’s going on. With that said, I started writing my colors on the web in HEX, so I’m much more fluent understanding what a color is by seeing it in HEX vs. RGB, so I may still end up rolling with Tyler’s suggestion.

---

## Update Jun 18, 2019

I got an email from [Ryan Wheale](https://github.com/DesignByOnyx) who pointed out an interesting aspect of custom variables that I had never actually used before: [custom property fallback values](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#Custom_property_fallback_values)

> I just came across your blog post about rgb color variables and it was extremely helpful...However, I was concerned about how to handle fallback values which can be passed to CSS variable lookups like this:
>
> ```
> var(--some-color, #ffeecc);
> var(--some-color, --backup-color-1, --backup-color-2, #ffeecc);
> ```
>
> The browser falls back to the next until it is satisfied. It's kind of a head scratcher as to how you would provide a fallback value which has commas in it for use in rgb(a) values. Well the cool thing is you can do this:
>
> ```
> --some-color: var(--does-not-exist, 0, 255, 0);
> background-color: var(--some-color);
> ```
>
> And you get a green background. It seems a little counterintuitive because the browser somehow knows to grab 3 fallback values as a single value.

Interesting! As mentioned, I didn’t even know you could have these kinds of fallbacks. To be honest, I’m still not sure what the circumstances would be that would necessitate using them. I haven’t found myself in a position where I thought “I wish I had a fallback for this custom property...”. It’s worth nothing, however, that the MDN docs says fallbacks can be useful “when working with Custom Elements and Shadow DOM.”

Anyhow, Ryan’s comment on the syntax here intrigued me as well. When you type:

```css
.selector {
  background-color: var(--value-that-doesnt-exist, 0, 0, 255);
}
```

How does the browser know to take a comma delimited value like `0, 0, 255` as the entire fallback value? Shouldn’t you have to group those values together somehow, like in quotes? i.e. `var(--doesnt-exist, "0, 0, 255")`?

The MDN docs elucidate the issue (emphasis mine):

> The first argument to the function is the name of the custom property to be substituted. The second argument to the function, if provided, is a fallback value, which is used as the substitution value when the referenced custom property is invalid. **The function only accepts two parameters, assigning everything following the first comma as the second parameter.**

Ah! So when it hits that first comma, it just takes everything from there to the end as the fallback value. That actually makes a lot of sense because CSS variables should be able to contain commas. They should be able to contain just about anything.

Wait, so how would you specify a fallback for a fallback? Like if I wanted to say “first try the variable `--blue`, then try the variable `--red` and if neither of those work, use the value `0,255,0`.”

The answer is: you nest `var()` statements. Example:

```css
/*
  Let's say you were looking for custom properties whose values were a comma 
  delimited set of numbers representing an rgb value, i.e.
    --red: 255, 0, 0;
    --blue: 0, 0, 255;
  You fallback from one to the next by nesting `var()` statements.
*/

.selector {
  /* incorrect */
  color: rgb(var(--red, --blue, 0, 0, 255));

  /* correct */
  color: rgb(var(--red, var(--blue, 0, 0, 255)));
}
```

Why is this? Remember, the browser takes _everything after the first comma_ as the fallback value. So if you want another variable, then after the first comma you have to put another `var()` statement. So for this statement:

```css
color: rgb(var(--red, --blue, 0, 0, 255));
```

The browser first looks for `--red`. If it can't find that, it looks for everything after the first `,` which in this case is `--blue, 0, 0, 255` and that is not a valid value in CSS. For the other statement:

```css
color: rgb(var(--red, var(--blue, 0, 0, 255)));
```

The browser first looks for `--red`. If it can’t find that, it looks for everything after the first `,` which in this case is `var(--blue, 0, 0, 255)` and that is a valid value in CSS.

![Image depicting fallback pattern for CSS custom property values]({{site.imageurl}}/2019/css-variable-fallback.png)
