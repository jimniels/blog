---
tags: css
---

# Notes from Josh Comeau’s Article on Stacking Contexts

Josh Comeau’s [article “What the heck, z-index??”](https://www.joshwcomeau.com/css/stacking-contexts/) was illuminating and I’m taking notes.

> When it comes to CSS…elements are grouped into stacking contexts. When we give an element a z-index, that value is only compared _against other elements in the same context_. z-index values are not global.

This is a great reminder about something that might not be immediately intuitive about CSS but is intuitive in any design tool like Figma or Photoshop where you have layering: grouped elements have their own stacking contexts.

Think of a design tool GUI with a layers panel. A kind of implicit `z-index` is being applied to each layer that appears visually above another.

<img src="https://cdn.jim-nielsen.com/blog/2021/stacking-context-layer-panel.png" width="426" height="194" alt="Screenshot of the layers panel in Figma showing how a grouped set of layers visually below another would not appear above anything stacked above it, regardless of any z-index value." /> 

CSS is similar: an element with a `z-index` of `999999` doesn’t necessarily mean it will appear above another element with a `z-index` of  `5`. Stacking contexts are everything.

However, stacking contexts don’t solely trigger off `z-index` and `position` properties. There are more. Lots more. In fact, I didn’t know there were so many. Josh outlines them:

> - Setting opacity to a value less than 1
> - Setting position to fixed or sticky (No z-index needed for these values!)
> - Applying a mix-blend-mode other than normal
> - Adding a z-index to a child inside a display: flex or display: grid container
> - Using transform, filter, clip-path, or perspective
> - Using will-change with a value like opacity or transform
> - Explicitly creating a context with isolation: isolate (More on this soon!)
> 
> There are a few other ways as well. You can find [the full list on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context#the_stacking_context).

Josh goes on to point out how, in the world of components on the web, keeping things totally isolated is a good thing. But in that kind of a world, using `z-index` in tandem with `position` might present problems with positioning.

> Every element that uses z-index must also create a stacking context.
> 
> When we decide to give an element a z-index, our goal is typically to lift or lower that element above/below some other element in the parent stacking context. We aren't intending to produce a stacking context on that element!
> 
> When a stacking context is created, it “flattens” all of its descendants. Those children can still be rearranged internally, but we've essentially locked those children in.

That’s where the `isolation` [property](https://developer.mozilla.org/en-US/docs/Web/CSS/isolation) comes in handy—which is not something I was even familiar with, even after a decade plus of writing CSS!

At the end, Josh’s conclusion at about stacking contexts and `z-index` is interesting:

> More and more, I'm starting to believe that z-index is an escape hatch, similar to !important.

This article really helped refine my mental model for positioning in CSS. It’s worth a read.