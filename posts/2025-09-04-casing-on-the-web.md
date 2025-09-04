#html

# Trying to Make Sense of Casing Conventions on the Web

(I present to you my stream of consciousness on the topic of casing as it applies to the web platform.)

I’m reading about [the new `command` and `commandfor` attributes](https://developer.chrome.com/blog/command-and-commandfor) — which I’m super excited about, declarative behavior invocation in HTML? YES PLEASE!! — and one thing that strikes me is the casing in these APIs.

For example, the `command` attribute has a variety of values in HTML which correspond to APIs in JavaScript. The `show-popover` attribute value maps to `.showPopover()` in JavaScript. `hide-popover` maps to `.hidePopover()`, etc.

So what we have is:

- lowercase in attribute names
    - e.g. `commandfor="..."`
- kebab-case in attribute values
    - e.g. `show-popover`
- camelCase for JS counterparts
    - e.g. `showPopover()`

After thinking about this a little more, I remember that [HTML attributes names are case insensitive](https://www.w3.org/TR/2010/WD-html-markup-20101019/documents.html#case-insensitivity), so the browser will normalize them to lowercase during parsing. Given that, I suppose you could write `commandFor="..."` but it’s effectively the same.

Ok, lowercase attribute names in HTML makes sense. The related popover attributes follow the same convention:

- `popovertarget`
- `popovertargetaction`

And there are many other [attribute names in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes) that are lowercase, e.g.:

- `maxlength`
- `novalidate`
- `contenteditable`
- `autocomplete`
- `formenctype`

So that all makes sense.

But wait, there are _some_ attribute names with hyphens in them, like `aria-label="..."` and `data-value="..."`.

So why isn’t it `command-for="..."`?

Well, upon further reflection, I suppose those attributes were named that way for extensibility’s sake: they are essentially wildcard attributes that represent a family of attributes that are all under the same namespace: `aria-*` and `data-*`.

But wait, isn’t that an argument for doing `popover-target` and `popover-target-action`? Or `command` and `command-for`?

But wait (I keep saying that) there are kebab-case attribute names in HTML — like [http-equiv](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/http-equiv) on the `<meta>` tag, or [`accept-charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form#accept-charset) on the form tag — but those seem more like legacy exceptions.

It seems like the only answer here is: there is no rule. Naming is driven by convention and decisions are made on a case-by-case basis. But if I had to summarize, it would probably be that the default casing for new APIs tends to follow the rules I outlined at the start (and what’s reflected in the new `command` APIs):

- lowercase for HTML attributes names
- kebab-case for HTML attribute values
- camelCase for JS counterparts

Let’s not even get into [SVG attribute names](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute)

<img src="https://cdn.jim-nielsen.com/blog/2025/casing-svg-attributes.png" width="682" height="1059" alt="Screenshot of various SVG attribute names, all with mixed casing from lowercase to kebab-case to camelCase." />

We need one of those “bless this mess” signs that we can hang over the World Wide Web.

<img data-og-image src="https://cdn.jim-nielsen.com/blog/2025/casing-bless-this-mess.jpg" width="808" height="516" alt="Photograph of Tim Berners-Lee next to his NeXT computer with the first web page on it at CERN. Above the image is a superimposed sign that says “Bless this mess” in cursive type." />