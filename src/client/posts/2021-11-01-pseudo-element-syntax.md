---
tags: css
---

# Hairsplitting the Pseudo-Element Syntax

When the pseudo-elements `::before` and `::after` first appeared on the scene, they were a boon! So many HTML divs and spans being chucked into the DOM exclusively for stylistic effect could now die. 

At first, I learned pseudo-elements with the double-colon syntax (i.e. `::before`).

Later I started to see other folks write the more terse single-colon syntax (i.e. `:before`).

At first I thought that was wrong, but I soon realized browsers accepted that syntax just as much as the double-colon syntax. Which was “right”?

When I asked colleague more experienced than myself, I remember them saying, “they’re both valid”. So I just assumed it was a kind of syntactic sugar, both being acceptable.

Fast forward a few years, I remember reading an article stating that single-colon notation was some kind of backwards-compatibility artifact of the standardization process. Both were valid, but double-colon was “more right”.

I never knew for sure what the official stance was, so (perhaps out of laziness) I always wrote the more terse single-colon syntax in my CSS (`:before`).

However, the voice in the back of my head (which seeks to block me on everything by arguing for perfection and theoretical purity) was always voicing the concern, “are you sure about `:before`? Isn’t the double-colon syntax ‘more correct’? Maybe you should be writing that…”

Fast forward to a couple days ago, I stumbled on reading the spec for [CSS selectors level 4](https://drafts.csswg.org/selectors-4/#pseudo-element-syntax) and saw the section on pseudo-elements. “This is my chance! I'm gonna read the final word on this once and for all,” I thought.

Here’s what the spec says:

> The syntax of a pseudo-element is "::" (two U+003A COLON characters) followed by the name of the pseudo-element as an identifier. Pseudo-element names are ASCII case-insensitive. No white space is allowed between the two colons, or between the colons and the name.

Ok, that’s all pretty straightforward. The bit on pseudo-element names being case-insensitive is interesting. I’ve never written `h1::BEFORE` but now I know I can—if I enjoy watching the world burn.

But now we get to the part I was waiting for (emphasis mine):

> Because CSS Level 1 and CSS Level 2 conflated pseudo-elements and pseudo-classes by sharing a single-colon syntax for both, user agents must also accept the previous one-colon notation _for the Level 1 & 2 pseudo-elements (::before, ::after, ::first-line, and ::first-letter). This compatibility notation is not allowed any other pseudo-elements._ However, as this syntax is deprecated, authors should use the Level 3+ double-colon syntax for these pseudo-elements.

There’s my answer! The double-colon syntax (`::before`) is “more correct” than the single-colon syntax (`:before`) which is a “compatibility notation”. 

In addition to the single-colon syntax being labeled as “deprecated”, it’s also _supposed to_ be applicable exclusively to the Level 1 & 2 pseudo-elements:

- `:before`
- `:after`
- `:first-line`
- `:first-letter`

This means any future pseudo-elements introduced into the language will not have backwards-compatibility support for the single-colon notation.

For me personally, this means I’m going to change my habit of writing `:before` and `:after` to `::before` and `::after`. Not only does the spec recommend as much, but it should help me get in the habit of differentiating properly in my code between pseudo-elements and pseudo-classes. This is a noteworthy distinction since, as mentioned the spec notes all future pseudo-elements will not support the single-colon “compatibility notation”.

The theoretical purist in me is satisfied.