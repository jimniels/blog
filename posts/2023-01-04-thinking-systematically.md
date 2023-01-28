# Thinking Systematically

Jeremy writes about [logical properties](https://adactio.com/journal/18640):

> It’s like when you’re learning a new language. At some point your brain goes from _translating_ from your mother tongue into the other language, and instead starts _thinking_ in that other language. Likewise with CSS, at some point you want to stop translating “left” and “right” into “inline-start” and “inline-end” and instead start _thinking_ in terms of inline and block dimensions.

This got me ruminating on design systems work, but also system abstractions in general.

Thinking systematically, you begin to see abstractions in the one-offs which helps you translate the execution of a specific design to traits of a generalized one.

What am I talking about? Take color, for example.

You’re prototyping and you want to use purple, so you reach for a CSS keyword and call it a day with `color: purple`.

Later you decide there’s a particular hue of “purple” that’s considered “brand purple” so you copy/paste that value and ship it, resulting in CSS like `color: #8f00ff`.

But, wait: you need that purple in lots of other places, so you name it for reuse and leverage CSS custom properties: `var(--color-brand)`.

But wait again: that tells you what the thing _is_, not how you should _use_ it. So you [devise a purpose](https://blog.jim-nielsen.com/2022/good-design-pt-ii/) for the color within an ordered system by providing it a semantic name which circumscribes its use, role, and function apart from other colors, e.g. `var(--color-primary-accent)`.

You can see how there are [different tiers of values](https://blog.jim-nielsen.com/2022/the-word-value-in-css/), each having its own purpose and trade-offs:

- Approximate value: `purple`
- Literal value `#8f00ff`
- Named value `--color-brand`
- Semantic value `--color-primary-accent`

The idea of semantic values as vocabulary within a system is useful though not always immediately intuitive. It requires context at a broader level than any single, bespoke design. However, as you work in this model, eventually its language becomes second nature and you stop thinking of color as one-off choices, e.g. `#8f00ff`, and instead begin thinking of color as relational values disambiguated in purpose by semantic naming, e.g. `color-primary-accent`. 

From this new perspective, there’s no longer “purple” and “green” for use as you see fit, but `color-primary-accent` and `color-secondary-accent` for purposeful use within a rationale, ordered system.