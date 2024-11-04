#typography #css

# Font Family and @supports

I’m working on a website where I want to use Apple’s “New York” typeface (the  serif counterpart to their “San Francisco” sans-serif).

Remembering my documented investigation into [leveraging system fonts on the web](https://blog.jim-nielsen.com/2020/system-fonts-on-the-web/), I knew I could use `font-family: ui-serif` — part of [CSS fonts level 4](https://www.w3.org/TR/css-fonts-4/#ui-serif-def) — to accomplish the task.

On macOS, I had it working in Safari but not in Chrome or Firefox. That was to be expected, as [support for level 4 generic font family names, like `ui-serif`,](https://caniuse.com/extended-system-fonts) is currently limited to Safari.

In my CSS, I was trying to query support for `ui-serif` with `@supports` but it wasn’t working as I expected. For illustration’s sake, this was my mental model:

```css
/* For browsers that DO NOT support `ui-serif`
   (i.e. Chrome and Firefox), do this: */
body {
  background-color: red;
}

/* For browsers that DO support `ui-serif`
   (i.e. Safari) do this: */
@supports (font-family: ui-serif) {
  body {
    background-color: green;
  }
}
```

Given the code above and the current support for the `ui-serif` generic family name, I expected Chrome and Firefox to have a red background and Safari to have a green one. Instead, they all had green backgrounds.

“How is that possible?” I thought. “Those browsers currently do not support `ui-serif`, yet the `@supports` syntax is triggering `true` for that syntax…”

I threw together [a Codepen example](https://codepen.io/jimniels/pen/bGMgzaq?editors=1100) and [asked on Twitter](https://twitter.com/jimniels/status/1570636356321411073).

I got some [useful](https://twitter.com/kn_wler/status/1570637629024243717) [responses](https://twitter.com/luckymurari/status/1570642013154086914) that helped refine my mental model for `@supports`. To explain, let me take a step back and look at `@supports` for one second.

`@supports` is incredibly useful when you need to test support for new CSS features. For example, you might want to use flex layout but still provide a fallback for older browsers with a float-based layout. In that scenario, you could do something like this:

```css
/* For older browsers, use float-based layout */
.container > * {
	display: block;
	float: left;
}

/* For newer browsers, use flex-based layout */
@supports (display: flex) {
  .container {
    display: flex;
  }
  .container > * {
    float: none;
  }
}
```

In this particular case – `@supports (display: <value>)` — the property `display` has a [specific set](https://developer.mozilla.org/en-US/docs/Web/CSS/display) of enumerated values that are considered valid by the browser. While the value `flex` might not be supported in every _browser_, it is supported in the _latest spec_. Whereas a value like `flexx` won’t work in any browser because it’s not valid in any spec (unless, of course, one day the W3C decides to create a new layout mechanism named `flexx`).

The point being: `display` is a property with a finite set of values — `block`, `flex`, `grid`, etc. — that are considered valid by a reading of the latest specification (and browsers can vary in their support for each of those enumerated values).

In contrast, the `font-family` property is a bit different and more open-ended. It has to consider _any value_ valid since it accepts font family names and a font’s name could be, well, anything.

```css
@supports (font-family: Georgia) {
  /* supported */
}

@supports (font-family: asdfjasdfkljasdofijasdf) {
  /* supported */
}

@supports (font-family: ui-serif) {
  /* supported */
}
```

The above are all considered valid syntax for the `font-family` property because any of those could be the name of a font! It’s not like CSS maintains a master, enumerated list of every single font in the entire world (can you imagine?). As [Bramus replied me on Twitter](https://twitter.com/bramus/status/1571052970955149313):

> at-supports returns true when it can _parse_ the given declaration — it answers “is this syntax OK?”
>
> For `font-family` it is true for `system-ui` because that is a valid `<generic-name>`. Same for any type of gibberish, as that could be valid `<family-name>`

For the property `font-family`, I imagine the browser parsing the value and determining whether it’s looking at a generic font family keyword (like `ui-serif` or `sans-serif`) or a specific font family’s name corresponding to a font usable on the client (like "Georgia" or "Noto Sans").

Ultimately, I was hoping for a way to query support for a generic font family keyword in CSS (like `ui-serif`) but I don’t think it’s doable. I’ll update this post if I find a solution.