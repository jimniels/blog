#css #engineering

# Sass Color Functions in CSS

tldr; define your colors with individual `hsl` values using CSS variables, then compose your color declarations using the individual `hsl` values while using `calc` where you want to do the Sass equivalent of `saturate`, `desaturate`, `lighten`, `darken`, or `adjust-hue`.

```css
:root {
  --color-primary-h: 30;
  --color-primary-s: 100%;
  --color-primary-l: 50%;
}

/* desaturate the primary color */
.element {
  background-color: hsl(
    var(--color-primary-h),
    calc(var(--color-primary-s) - 20%),
    var(--color-primary-l)
  );
}
```

Verbose, but cool! Read on for a more detailed explanation.

## Prior Art

I was recently reading Jeremy’s post [Sass and Clamp](https://adactio.com/journal/16887) where he talks about moving off Sass because most of the features he needs from Sass, like variables and mixins, are available in some form or fashion in modern CSS.

> **Mixins**. These can be very useful, but now there’s a lot that you can do just in CSS with `calc()`. The built-in `darken()` and `lighten()` mixins are handy though when it comes to colours.

I’ve gone through a similar journey myself of moving off Sass in order to have one less dependency between me and the browser. I’ve felt quite happy as of late with no Sass in any of my personal projects. That said, I have always missed the color functions in Sass. I always loved those. Heck, I built a tool called [SassMe](https://sassme.jim-nielsen.com/) which helps you visualize the output of Sass color functions in real time. All of this got me thinking: could you actually do an equivalent of something like Sass’ `saturate()` in CSS in 2020? Short answer: you can!

(Note: after reading Jeremy’s post mentioned above, I wrote this blog post. While proof-reading before hitting publish, Jeremy quickly followed up with a similar train of thought to what you’ll find here in his post [“Programming CSS to perform Sass colour functions”](https://adactio.com/journal/16960)—its worth also checking out.)

There’s been a lot of discussion and work in the area of color functions in CSS. Tyler illustrated the potential of some of this promising work on his site [ColorMe](https://colorme.io/) which is like SassMe but using color functions from a CSS working draft. It sounds like the particular approach he was illustrating has been [abandoned but there’s renewed effort](https://github.com/w3c/csswg-drafts/issues/3187#issuecomment-499126198) in other areas to bring color functions to CSS natively.

In her article, [A User’s Guide to CSS Variables](https://increment.com/frontend/a-users-guide-to-css-variables/), Lea Verou outlines how you can use CSS variables to generate different shades of color in your stylesheets.

> Out of the color syntaxes currently available to CSS, `hsl()` tends to work better for creating color variations (until we get `lch()`, which is far superior due to its wider range and perceptual uniformity). If we anticipate needing only lighter/darker and alpha variants, we can use a variable for both hue and saturation

She then gives the following example:

```css
:root {
    --base-color-hs: 335, 100%;
    --base-color: hsl(var(--base-color-hs), 50%);
    --base-color-light: hsl(var(--base-color-hs), 85%);
    --base-color-dark: hsl(var(--base-color-hs), 20%);
    --base-color-translucent: hsla(var(--base-color-hs), 50%, .5);
}
```

She then explains:

> We can use these variables throughout our CSS or create new variations on the fly. Yes, there’s still a little duplication—the base color lightness—but if we plan to create many alpha variations, we could create a variable with all three coordinates, or one with the lightness.

As you can see from the above, what I’m presenting here isn’t necessarily new. I think it’s just one more step beyond what Lea proposed above.

**Update June 9, 2020**: after publishing this post, I stumbled on a wonderfully-detailed article by [Una Kravets](https://una.im) (published months before this post) that outlines the same general ideas I present below but from a slightly-different yet very intriguing perspective around dynamic themeing. You should check it out: [“Calculating Color: Dynamic Color Theming with Pure CSS”](https://una.im/css-color-theming/)

## Some Background on HSL and Sass

HSL is pretty cool. It has [a few problems](https://css-tricks.com/the-best-color-functions-in-css/) and, as Lea alluded to, there are better things coming (`lch`); nonetheless, I think HSL is a great mental model for thinking about color and programmatic control of color. Chris [sums it up really well](https://css-tricks.com/the-best-color-functions-in-css/):

> Hue isn’t intuitive, but it’s not that weird. You take a trip around the color wheel from 0 to 360. Saturation is more obvious where 0% has all the color sucked out, like grayscale, and 100% is fully rich color at that hue. Lightness is “normal” at 50% and adds white or black as you go toward 100% and 0%, respectively. I’m sure that’s not the correct scientific or technical way of explaining it, but that’s the brain logic.

So HSL is great for manipulating color. I actually learned just how great when I was building [SassMe](https://sassme.jim-nielsen.com/). Want to know the secret to how it works? [Under the hood](https://github.com/jimniels/sassme/blob/master/src/scripts/utils/colorTransforms.js), it essentially takes a HEX color, converts it to HSL, maps one of the Sass color functions to the color value by adding/subtracting the appropriate `h`, `s`, or `l` values, then converts it back to a color for the browser (I built this before HSL existed as a viable option for declaring a color in the browser).

Sass has the following functions, each of which essentially takes a color, puts it in the HSL color space, then adds/subtracts the value as defined by the developer.

- `adjust-hue` which adds/subtracts from the `h` value
- `saturate` which adds to the `s` value
- `desaturate` which subtracts from the `s` value
- `lighten` which adds to the `l` value
- `darken` which subtracts from the `l` value

So if you looked at an implementation of these functions, conceptually you’d see something something like this:

```scss
.element {
  background-color: lighten(#0000ff, 5%);
}

/*
  What is being done in the above? It’s basically:
  Convert `#0000ff` to hsl equivalent — `hsl(240, 100%, 50%)`
  Adds 5% to the `l` value — `hsl(240, 100%, 55%)`
  Convert it back to hex color — #1a1aff
*/
```

Maybe you already see where this is going: those particular color functions are merely adding/subtracting values from `hsl` color values, and we have a way to add/subtract values in CSS with `calc()`!

## Doing Color Functions in CSS

So if you wanted to do the equivalent of Sass’ `hsl` color functions in CSS, how would you do it?

First, pick a color and define its component `hsl` parts as independent values using CSS variables. In a real code base you’re likely to have more than one color so you’d want to give your variables good names to tell them apart, like `--color-primary-h`, but for simplicity’s sake in my example I’m going to just call it `--h`. Once you have the component `hsl` color values defined, you can compose them together in an `hsl()` function in CSS.

```css
:root {
  --h: 100;
  --s: 50%;
  --l: 50%;
}

.hsl-element {  
  background-color: hsl(var(--h), var(--s), var(--l));
}
```

You could drop those in an `hsla()` too and be able to control the alpha channel on a case-by-case basis if you wanted.

```css
.hsla-element {  
  background-color: hsla(var(--h), var(--s), var(--l), .5);
}
```

“Ok,” you might say, ”that’s neat and all, but if I just want my base color, having to write out the nested variables inside an `hsl()` function every time can get tiring.” That’s true. So make an `--hsl` variable out of your base `h`, `s`, and `l` variables (which you could also mix with `hsla()`).

```css
:root {
  --h: 100;
  --s: 50%;
  --l: 50%;
  --hsl: var(--h), var(--s), var(--l);
}

.hsl-element {
  background-color: hsl(var(--hsl));
}

.hsla-element { 
  background-color: hsla(var(--hsl), .5);
}
```

You could take that a step further if you really wanted to and just cut out having to type `hsl` every time by defining the `hsl` function in a variable value. Here’s the entirety of these composable pieces:

```css
:root {
  --h: 100;
  --s: 50%;
  --l: 50%;
  --hsl: var(--h), var(--s), var(--l);
  --hslf: hsl(var(--hsl));
}

.hsl-element {
  background-color: hsl(var(--h), var(--s), var(--l));
}

.hsla-element { 
  background-color: hsla(var(--hsl), .5);
}

.hsl-function-element {
  background-color: var(--hslf);
}
```

Now you have all the ingredients you need to mix-n-match how you want to declare your colors. This enables you to start using `calc()` to modify HSL values for your color palette on the fly.

```css
:root {
  --h: 100;
  --s: 50%;
  --l: 50%;
  --hsl: var(--h), var(--s), var(--l);
  --hslf: hsl(var(--hsl));
}

.normal {
  background-color: var(--hslf);
}

.adjust-hue {
  background-color: hsl(
    calc(var(--h) + 100),
    var(--s),
    var(--l)
  );
}

.saturate {
  background-color: hsl(
    var(--h),
    calc(var(--s) + 20%),
    var(--l)
  );
}

.desaturate {
  background-color: hsl(
    var(--h),
    calc(var(--s) - 20%),
    var(--l)
  );
}

.lighten {
  background-color: hsl(
    var(--h),
    var(--s),
    calc(var(--l) + 20%)
  );
}

.darken{
  background-color: hsl(
    var(--h),
    var(--s),
    calc(var(--l) - 20%)
  );
}
```

You can check this all out in action on [my codepen](https://codepen.io/jimniels/pen/abvXbvp) and see all the different ways you can play with color in this fashion, from alpha channels:

<img src="https://cdn.jim-nielsen.com/blog/2020/sass-in-css-hsla.png" width="344" height="641" alt="Screenshot illustrating dynamic color manipulation with CSS variables in an hsla() color function." />

To Sass color functions, like `adjust-hue()`:

<img src="https://cdn.jim-nielsen.com/blog/2020/sass-in-css-adjust-hue.png" width="337" height="762" alt="Screenshot illustrating dynamic color manipulation with CSS variables in adjusting a color’s hue." />

`saturate()` and `desaturate()`

<img src="https://cdn.jim-nielsen.com/blog/2020/sass-in-css-saturate-desaturate.png" width="671" height="641" alt="Screenshot illustrating dynamic color manipulation with CSS variables in saturating or desaturating a color." />

`lighten()` and `darken()`

<img src="https://cdn.jim-nielsen.com/blog/2020/sass-in-css-lighten-darken.png" width="674" height="640" alt="Screenshot illustrating dynamic color manipulation with CSS variables in lightening or darkening a color." />

What’s really neat about this is that the browser seems to handle min/max on your color calculations for you. For example, if you have a color value like `hsl(50, 100%, 50%)` and you add `700%` to the `l` value resulting in a value like `hsl(50, 100%, 750%)`, that value gets interpreted by the browser at the `l`’s max value of `100%` (i.e. `hsl(50, 100%, 100%)`). This is true for the `h`, `s`, or `l` values. This helps you not break color appearances because, for example, you saturated the color too much. It also absolves you from having to leverage min/max in CSS and writing something like `min(calc(var(--h) + 100), 360)`.

## Caveats

Obviously the problem with this is naming. I’ve tricked you with using short names like `--h`, `--s`, and `--l`. More likely you’re going to have a palette of named colors and each one would have to have these variants. Think functional composition in CSS.

```css
:root {
  /* primary color */
  --color-primary-h: 50;
  --color-primary-s: 50%;
  --color-primary-l: 50%;
  --color-primary-hsl:
    var(--color-primary-h),
    var(--color-primary-s),
    var(--color-primary-l);
  --color-primary-hslf: hsl(var(--color-primary-hsl));
  
  /* accent color */
  --color-accent-h: 38;
  --color-accent-s: 75%;
  --color-accent-l: 35%;
  --color-accent-hsl:
    var(--color-accent-h),
    var(--color-accent-s),
    var(--color-accent-l);
  --color-accent-hslf: hsl(var(--color-accent-hsl));
  
  /* all my other colors here... */
}
```

That’s a lot of writing. Because of the declarative nature of CSS, you’re never going to get something as terse as what you could get in Sass. So sure, you’re typing more characters. But you know what you’re not doing? Wrangling build plugins and updating dependencies to get Sass to build. What you write gets shipped directly to the browser and works as-is, now and for eternity. It’s hard to say that about your Sass code.

