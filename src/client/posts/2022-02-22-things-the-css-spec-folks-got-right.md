---
tags: css
---

# Things the CSS Spec Folks Got Right

I read [this article](https://increment.com/frontend/ask-an-expert-why-is-css-the-way-it-is/) which examines why CSS is the way it is from the perspective of a technical director at the W3C.

It’s easy, in hindsight, to critique things CSS got wrong or should’ve prioritized differently. But I want to take a moment to marvel at the things they got right.

It’s incredibly difficult to build APIs that solve today’s problems while anticipating an unknown future. In some cases, I think the original CSS authors did precisely that.

This post is a shout out of appreciation for the things they got right.

## Font Weight

`font-weight` could’ve shipped with a few values that were  likely practical at the time:

- Light
- Regular
- Bold

But what about adding new weights — something between “Regular” and “Bold”? Make a new name I guess:

- Light
- Regular
- Medium
- Bold

Ok, but then later you need something between Medium and Bold. Now what? Another name:

- Light
- Regular
- Medium
- Semibold
- Bold

As you can imagine, this gets tricky fast. It’s common to see a family today whose spectrum of weight variations are named like this:

- Ultralight
- Thin
- Light
- Regular
- Medium
- Semibold
- Bold
- Ultrabold
- Heavy
- Black

And what about when you want even more variations?

Switching from named enumerations to numbers makes sense. For example, a set of digits 1-9.

But what about when you need something between a 4 (Regular) and a 5 (Medium)? 4.5?

“Ok, let’s go with a scale of 100-900 to represent `font-weight`” — which is precisely what [they originally came up with](https://www.w3.org/TR/CSS1/#font-weight).

Could the original spec writers have envisioned what we have today with variable fonts? I can’t say. Regardless, their foresight in enumerating `font-weight` values and anticipating a path for growth was spot on in hindsight.

## CSS Imports

Remember when import statements made it to JavaScript in ES6? They facilitated modular encapsulation and completely transformed how we write and deliver code on the web, marking the start of The Great JavaScript Gold Rush of the late 2010’s.

CSS was doing imports way before JS.

> CSS imports : 2002  
> JS imports: 2015  
> HTML imports: [insert date @davatron5000 passed away here]  
> — [@jimniels on Twitter](https://twitter.com/jimniels/status/1444029073131458562?s=20&t=CqRAirlrcSipEvXhQc8rCw)

Granted, there is a lot of advice out there recommending you avoid CSS imports due to render blocking. However, CSS imports can be loaded conditionally ([though there are caveats](https://blog.jim-nielsen.com/2021/conditional-style-loading-not-so-fast/)), allowing you to author and deliver code in a componentized, asynchronous fashion like you do with ES modules.

In hindsight it looks as though the CSS spec authors were total hipsters: doing imports before it was cool.

## Font Family

You thought there were a lot of different devices accessing the web when `font-family` first came out? Imagine how many more devices access the web now. The robustness of `font-family` was prescient indeed.

There’s a cacophony of voices which _could_ have a say in the typeface your website renders in, including operating system preferences, user agent preferences and website author preferences. All of this complexity boiling down to a single CSS property.

That one property, `font-family`, has travelled with us from “web-safe fonts” to custom fonts (with the help of `@font-face`) to system fonts to who knows what next. It continues to provide an incredibly powerful, robust ability to express [a cascading set of generic-to-specific typographic design choices](https://blog.jim-nielsen.com/2020/system-fonts-on-the-web/) across the wide, unknown, and growing expanse of devices which access the World Wide Web.

## What Else?

The above is not meant to be an exhaustive list. Undoubtedly I am missing other aspects of CSS which were visionary in their own right. If I made an egregious error in not mentioning something, blog about it and link me!

This is all a way of extending a big “thank you” to the CSS spec authors from years past who had the experience and foresight to lay down a solid foundation we’ve been building on ever since.

And a big thank you to those who continue to build on that foundation. Who doesn’t want to design an API that’ll endure for decades with minimal breaking change? That’s a legacy.

## Update 2022-02-25

[Shawn responded](https://twitter.com/swyx/status/1496993590136180747?s=20&t=e3XcjOPauJm8oOhWjNjHEA) with a few things he likes:

> box model gets a lot of shit but honestly it works well once you learn it
> 
> i think the 0,0,0,0 specificity/selector model is also timeless

He also noted that the shortness of the list almost feels like a burn, which it wasn’t meant to! As I replied, there’s a lot of stuff in CSS that’s alive and well which people use everyday such as properties (`color`, `background`, etc.), units (%, px, em, etc.), and colors (hex, rgb). All of these have been flexible enough to build upon with CSS 2, 3, 4, etc.

[A few other commentors](https://news.ycombinator.com/item?id=30460238) call out other aspects of CSS they really like, such as the selectors (me too!) and the cascade itself (me too, though admittedly that one is probably the most controversial).

Additionally, I got an email from a reader saying:

> Re: font-weight, thought you might be interested to know that Adobe released their first Multiple Master fonts in (I think) 1991. Presumably it was in the works for several years before that…
> 
> Anyway, the idea of variable-weight fonts was sort of in the air around that time and no doubt the folks involved in CSS were aware of that. So that puts their decision in some context.

I’d never heard of [multiple master fonts](https://en.wikipedia.org/wiki/Multiple_master_fonts) but there’s definitely some intriguing precedent there, including the ability to create continuous variation along the axes of weight, width, optical size, and style. I’m sure there were lots of influences and inspiration that went into `font-weight` (as there are with designing any API). What strikes me is that the original authors synthesized all those inputs, made a bet, and translated them to CSS. In hindsight, that was a good bet.

Oh, and lastly: I fixed an oversight on my part saying `<script type="module">` was render blocking, which it most definitely is not!