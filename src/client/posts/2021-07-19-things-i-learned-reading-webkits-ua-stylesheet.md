---
tags: css
---

# Things I Learned Reading Webkit’s UA Stylesheet

I browsed through Webkit’s user agent stylesheet for no other reason than curiosity (you can find via [trac](https://trac.webkit.org/browser/trunk/Source/WebCore/css/html.css) or [GitHub](https://github.com/WebKit/WebKit/blob/13e79e2e2f09579997106164ae66ad5499fc0a27/Source/WebCore/css/html.css)). 

A number of interesting things stood out to me, so I started taking notes. I figured it’d make for a good blog post.

Here are my notes.

## @namespace

The very first thing I encounter, before any novel selectors, properties, or values, is this thing I’ve never seen or used in my life: `@namespace`. 

My first reaction: “what the hell is this?”

Honestly, I dug around and never got to a point I where I feel like I can confidently say what it is and why you would use it.

<img src="https://cdn.jim-nielsen.com/blog/2021/ua-styles-namespace.jpg" width="500" height="530" alt="Meme from Lord of the Rings where Boromir asks, “What is this new devilry?” and Gandalf says “It’s @namespace—a demon of the ancient web. It is beyond any of you. RUUUUUUUUN!”" /> 

The best example I could find for how/where you might use `@namespace` is from [an O’Reilly book](https://oreillymedia.github.io/Using_SVG/index.html) called _Using SVG with CSS3 and HTML5_. There’s a chapter about [XML Namespaces in CSS](https://oreillymedia.github.io/Using_SVG/extras/ch03-namespaces.html) describing how `@namespace` can help “when you want to distinguish between SVG and HTML elements with the same tag names”. As an example:

```css
@namespace "http://www.w3.org/1999/xhtml";
@namespace svg "http://www.w3.org/2000/svg";

/* These rules would apply to any `a` elements. */
a {
    text-decoration: underline;
    color: purple;
}
/* These rules would apply to SVG `a` elements,
   but not HTML links. */
svg|a {
    stroke: purple;
}
/* These rules apply to all SVG-namespaced elements,
   but not HTML elements. */
svg|* {
    mix-blend-mode: multiply;
}
```

That sort-of makes sense, but having never had this problem, I can’t fully appreciate how helpful `@namespace` can be.

Anyhow, if novel things in CSS interest you and you’ve never heard of `@namespace`, you might want to read more from people who actually know what they’re talking about. FWIW: these links, in addition to the O’Reilly one above, were the most helpful to me:

- [MDN article on @namespace](https://developer.mozilla.org/en-US/docs/Web/CSS/@namespace)
- [Sara Soueidan on Tympanus](https://tympanus.net/codrops/css_reference/namespace/)

## If Statements

```css
html {
  display: block;
#if defined(HAVE_OS_DARK_MODE_SUPPORT) && HAVE_OS_DARK_MODE_SUPPORT
  color: text;
#endif
}
```

Honestly, I’m not sure how these play out. It almost looks like they are executed/evaluated at runtime to apply conditional styling based on system-level configuration. Here’s another example:

```css
video {
  object-fit: contain;
#if defined(WTF_PLATFORM_IOS_FAMILY) && WTF_PLATFORM_IOS_FAMILY
  -webkit-tap-highlight-color: transparent;
#endif
}
```

It’s not anything us normal web developers can use in our stylesheets, but interesting to see how special styling considerations are taken into account based on the browser knowing about what OS it’s running on.

## CSS Keywords

I saw _a bunch_ of keywords. Some standard, others not. For example:

```css
.some-selector {
  color: text;
  border: 1px solid ThreeDFace;
  border: border: 1px solid -webkit-control-background;
  background-color: -apple-system-opaque-tertiary-fill;
}
```

`ThreeDFace` is an example of a [system color](https://blog.jim-nielsen.com/2021/css-system-colors/), which is part of [the specification](https://drafts.csswg.org/css-color/#css-system-colors).

Whereas other values like `text`, `-apple-`, and `-webkit-` are specific to the browser or browser maker.

Curious about what values exist? Here’s a sampling from the [1,500+ lines](https://github.com/WebKit/WebKit/blob/13e79e2e2f09579997106164ae66ad5499fc0a27/Source/WebCore/css/CSSValueKeywords.in#L232) in `CSSValueKeywords.in`:

```
-apple-system-blue
-apple-system-brown
-apple-system-gray
-apple-system-green
-apple-system-orange
-apple-system-pink
-apple-system-purple
-apple-system-red
-apple-system-yellow
-apple-system-app-highlight-background
-webkit-control-background
```

A bunch of the values appear to map to [Apple’s OS-level color variables](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/#system-colors), presumably allowing developers of Safari to imbue browser controls with system-level appearance configurations from the OS.

## Handling Legacy Quirks

`1__qem` was another one of those “what the hell is this thing?” Here’s an example pulled from the UA stylesheet:

```css
blockquote {
  -webkit-margin-before: 1__qem;
}
```

[Apparently](https://stackoverflow.com/questions/7448673/what-does-1-qem-mean) this unit of measurement is webkit magic for handling legacy functionality related to quirks mode (“qem” stands for “quirky em”).

I don’t think it will surprise you to learn that handling legacy browser quirks is a common theme in the UA stylesheet. There’s a number of places where browser-specific values are leveraged to treat legacy quirks. Here’s another example from the code:

```css
center {
  display: block;
  /* special centering to be able to emulate the html4/netscape behaviour */
  text-align: -webkit-center;
}
```


## Webkit “Extensions”

There are a whole bunch of non-standard properties, values, and pseudo elements specific to Webkit. Take a look at these examples pulled from the code:

```css
/* values */
center {
  text-align: -webkit-center;
}
/* properties */
hr {
  -webkit-margin-before: 0.5em;
}
/* pseudo elements */
body:-webkit-full-page-media {
  background-color: rgb(38, 38, 38);
}
```

Many of these are so custom to the webkit codebase, you won’t even find any results for them in Google:

<img src="https://cdn.jim-nielsen.com/blog/2021/ua-styles-google-search-results.png" width="688" height="356" alt="A Google search result showing 0 results for the keyword “-webkit-center”." /> 

MDN even has a giant reference of [CSS “extensions” for Webkit](https://developer.mozilla.org/en-US/docs/Web/CSS/WebKit_Extensions) but not everything in the UA stylesheet is documented on MDN.

If you really want to dive deeper, you can look at the [CSS value keywords file](https://github.com/WebKit/WebKit/blob/13e79e2e2f09579997106164ae66ad5499fc0a27/Source/WebCore/css/CSSValueKeywords.in#L341) and guess at what these non-standard values do when listed alongside their standardized siblings. For example, `-webkit-match-parent` appears to have something to do with aligning elements.

```
//
// CSS_PROP_TEXT_ALIGN:
// The order here must match the order of the TextAlignMode enum in RenderStyleConstants.h.
//
-webkit-auto
left
right
center
justify
-webkit-left
-webkit-right
-webkit-center
-webkit-match-parent
```

## Custom Form Element Graphics

You know those little icons you see in specific browsers which hint at browser-injected functionality? For example, this credentials autofill UI:

<img src="https://cdn.jim-nielsen.com/blog/2021/ua-stylesheet-credentials-icon-in-use.png" width="551" height="413" alt="A form field in Safari with webkit-specific UI elements denoting the field can be autofilled by the OS with credentials the user has saved." />

Note the little key icon with a dropdown? Webkit appears to implement UI details like that as webkit-specific pseudo elements. The key/dropdown graphic is implemented as an inline SVG in the UA stylesheet. Example:

```css
input::-webkit-credentials-auto-fill-button {
  -webkit-mask-image: url('data:image/svg+xml,<svg>...</svg>');
}
```

If you were to extract that `<svg>...</svg>` code from the inline data URL in the UA stylesheet and put it in the browser, you’d see the same graphic:

<img src="https://cdn.jim-nielsen.com/blog/2021/ua-stylesheet-credentials-icon.png" width="197" height="145" alt="An icon of a key with a dropdown caret." /> 

## System Font Keyword

`font: message-box` 

Once again: what the hell is this? [According to MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/font)

> The `font` property may be specified as either a single keyword, which will select a system font, or as a shorthand for various font-related properties.

I’m familiar with the shorthand:

```css
p { font: 12px/14px sans-serif }
```

But a single keyword?

```css
p { font: message-box }
```

Apparently there are system font keywords. Example from MDN:

> `caption`: The system font used for captioned controls (e.g., buttons, drop-downs, etc.).
> 
> `icon`: The system font used to label icons.
> 
> `menu`: The system font used in menus (e.g., dropdown menus and menu lists).

This lets you do some crazy stuff I didn’t know you could—nor can I think of why you would. Nonetheless, it exists. [Checkout the codepen](https://codepen.io/jimniels/pen/rNmWvZd)

<img src="https://cdn.jim-nielsen.com/blog/2021/ua-stylesheet-fonts.png" width="350" height="127" alt="Screenshot of various fonts displayed in HTML and styled with the system font keyword shorthand." /> 

Appears to be another one of those [system things](https://css-tricks.com/system-things/).

## Strangely Specific z-index Values

It’s pretty common that, when you want a high z-index, you do something like `z-index: 9999999`.

Interestingly, there are only three z-index values in Webkit’s UA stylesheet. All three of them are high, strangely-specific numbers:

- 2147483644
- 2147483645
- 2147483647

I figured this had to be something to do with programmers infusing some kind of joke or meaning into the number rather than just an arbitrarily high number.

I found a site called [numbermatics.com](https://numbermatics.com/) which lets you punch in a number and discover its unique traits. Here’s what I found:

- 2147483644 - [composite of four primes multiplied together](https://numbermatics.com/n/2147483644/)
- 2147483645 - [composite of three primes multiplied together](https://numbermatics.com/n/2147483645/)
- 2147483647 - is not only a [prime number](https://numbermatics.com/n/2147483647/) but is “the maximum positive value for a 32-bit signed binary integer in computing. It is therefore the maximum value for variables declared as integers…in many programming languages” ([Wikipedia](https://en.wikipedia.org/wiki/2,147,483,647))

I don’t think you can get a much higher z-index than that—UA stylesheet trumps all!

## Crazy Selectors

There are some crazy selectors in the UA stylesheet, like this for handling H1 tags nested five levels deep under any given combination of four different elements:

```css
:is(article, aside, nav, section)
  :is(article, aside, nav, section)
  :is(article, aside, nav, section)
  :is(article, aside, nav, section)
  :is(article, aside, nav, section)
  h1 {
  font-size: 0.67em;
}
```

The `:is` selector is pretty damn cool. Given the combinatorial nature of these groupings, writing something like this in CSS before `:is` would’ve been insane:

```css
article article article article article h1,
article article article article section h1,
article article article section article h1,
article article section article article h1,
article section article article article h1,
section article article article article h1,
article article article section section h1,
article article section section article h1,
article section section article article h1,
section section article article article h1,
/* keep going _forever_ */ {
  font-size: .67em;
}
```

## Conclusion

Reading the user agent stylesheet was intriguing. Maybe next I’ll compare and contrast those of [Chrome](https://chromium.googlesource.com/chromium/blink/+/refs/heads/main/Source/core/css/html.css) and [Firefox](https://searchfox.org/mozilla-central/source/layout/style/res/html.css) and see what I find!