# The Word “Value” in CSS

I loved [this post by Karl Dubost](https://www.otsukare.info/2022/10/25/css-values-definitions) which outlines how overloaded the word “value” can be in CSS.

When you say “value” in CSS, you might think you know what it means. But if you look closer — especially at [the spec](https://w3c.github.io/csswg-drafts/css-cascade-5/#value-stages) — you’ll find there are lots of different meanings for the word “value” in CSS, each one different than the next.

If you say `width: 100px`, it seems readily apparent what the “value” is for `width`. But if you write `width: auto` what would you say if someone asks you, “What’s the value?” Are they referring to what’s written in the CSS, i.e. `auto`? Or are they referring to what `auto` ends up being once the browser calculates it and renders it on screen? You can see how things can get murky really fast (and we haven’t even mentioned how values cascade yet).

To further illustrate this point, take a look at each of these rules ask yourself: what would I say if somebody asked me, “What’s the value here?”

- `font-size: 2em`
- `width: calc(100% - 14px)`
- `color: red`
- `background: var(--color-brand)`
- `font-weight: bolder`

You’d probably say, “Well that depends on what you mean by the word ‘value’!”

That’s kind of the whole point of the article: there are lots of qualified terms for the word “value” in the spec. These are the ones outlined by Karl:

- Actual value
- Used value
- Computed value
- Specified value
- Cascaded value
- Declared value
- Initial value
- Resolved value
- Relative value
- Absolute value

Phew! That’s a lot of values.