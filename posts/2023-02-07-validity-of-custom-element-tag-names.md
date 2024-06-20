# The Validity of Custom Element Tag Names

There I was, minding my own business, when I read [an opinion from David Bisset](https://twitter.com/dimensionmedia/status/1621156922924896256) that ended with `</$0.02>`.

“Ha, that’s cute,” I thought. “I’ve never seen that idiom expressed that way before.”

“I know that’s now valid HTML,” I thought. “But if you turned it into a web component, would it be?”

I knew you could do `<my-two-cents>` but what about the more terse `<my-$0.02>`? Or even `<my-2¢>`?

This whimsical thought led me down a rabbit hole which resulted in this blog post.

## Is `<my-$0.02>` a Valid Tag Name for a Web Component?

First, I formulated a search query: “What characters are allowed in tag names for custom elements?”

Here’s the ChatGPT answer:

> In HTML5, custom element tag names can contain letters (including A-Z and a-z), digits (0-9), hyphens (-), and dots (.). The tag name must start with a letter, and cannot contain any spaces.

Ok AI, thank you. But is that right? Time for some HI (human intelligence).

Using a search engine, I didn’t find much. There were a few sparse blog posts and StackOverflow answers with the standard web components naming rules I knew, like “custom element tag names must contain a hyphen”.

This lack of clarity inevitably landed me on [the spec for valid custom element names](https://html.spec.whatwg.org/#valid-custom-element-name) which says tag names must match this pattern:

`[a-z] (PCENChar)* '-' (PCENChar)*`

What is a `PCENChar`? Don’t you worry, the spec tells you.

```
"-" | "." | [0-9] | "_" | [a-z] | #xB7 | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x203F-#x2040] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
```

Oooof. What is that? That’s [Extended Backus-Naur Form (EBNF) notation from the XML spec](https://www.w3.org/TR/xml/#sec-notation).

> `#xN`: where `N` is a hexadecimal integer, the expression matches the character whose number (code point) in ISO/IEC 10646 is `N`.

Ok, I’m over my head now.

But I do see `PCENChar` allows periods and digits (like AI told me) so `<my-0.02>` would be valid. What about the dollar sign?

I could try to lookup what characters fall in the range of  those `#xN` code points. Or, I could just stop here, open a Codepen, and start trying out different tag names.

When it doubt, open Codepen. Here’s [my incredibly sophisticated example detailing the validity of HTML custom element tag names](https://codepen.io/jimniels/pen/QWBzMpw). It indicates that dollar and cents symbols are a no-go.

<img src="https://cdn.jim-nielsen.com/blog/2023/custom-element-symbols.png" width="300" height="236" alt="Screenshot from a Codepen which shows a green checkmark next to valid custom HTML element names and a red cross next to invalid ones. In this screenshot, `<my-$0.02>` and `<my-2¢>` both have red crosses indicating they are invalid." />


## What About Emojis?

In my research, I stumbled on [a WHATWG issue](https://github.com/whatwg/html/issues/3464) with this comment for tag names:

> You can already include Unicode in HTML tag names; it works fine. (Example: [http://software.hixie.ch/utilities/js/live-dom-viewer/?saved=5782](http://software.hixie.ch/utilities/js/live-dom-viewer/?saved=5782)). The only thing this algorithm does is valid a string passed to it via a JavaScript API.

The example is pretty funny in that it shows you can write something like `<mytag™>` and it’ll render as a tag in the DOM (I wish I was as forgiving of myself as the HTML parsers is for markup).

Which made me wonder: can you put the trademark or copyright symbol on a custom element? I don’t know what falls in the range of those `#xN` code points, but the spec does say this:

> a large variety of names is allowed, to give maximum flexibility for use cases like `<math-α>` or `<emotion-😍>`.

So emojis are allowed in custom elements?!? Yup, it looks like they are, which means `<my-$0.02>` may not work but `<my-💲0.02>` does! (Thanks to [Scott Jehl](https://mstdn.social/@scottjehl/112646802312714877) for providing the feedback necessary to get [my example Codepen working](https://codepen.io/jimniels/pen/QWBzMpw).)

<img src="https://cdn.jim-nielsen.com/blog/2023/custom-element-copyrights.png" width="349" height="382" alt="" />

I wonder if some day we’ll see someone try to legally trademark a custom element tag name for some convention they claim to have invented — say something like `<command-palette™>` — and then sue in court if anyone out there tries to use that same name for a web component lol.

## Conclusion

I briefly tried to find test cases for naming custom element tag names in the webkit source code, but [couldn’t really find anything](https://github.com/WebKit/WebKit/commit/714821f562a1cb8fb11ee87f0778eed479425a7b). They probably exist? I gave up trying (even though [I might’ve been close](https://github.com/WebKit/WebKit/tree/main/LayoutTests/fast/custom-elements)).

I was really hoping `<my-$0.02>` would be a valid web component. It almost seems like a tag that should wrap every comment on the internet and then be styled so as to indicate, “Reader beware: this is just one person’s opinion.”