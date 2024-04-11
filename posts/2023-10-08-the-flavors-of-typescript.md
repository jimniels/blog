# There’s TypeScript and Then There’s TypeScript

Are you a TypeScript user?

Your initial reaction may be a resounding “Yes!”

Or perhaps be a booming “No!”

The answer seems simple, but (as with most things) it might be more nuanced than you think.

Here’s Anders Hejlsberg, TypeScript Co-Creator & Lead Architech, from [the TypeScript documentary](https://www.youtube.com/watch?v=U6s2pdxebSo):

> If you use VSCode and you write JavaScript, then you are a TypeScript user because the language service that powers anything that happens in there is the TypeScript compiler. There’s TypeScript the syntax and then there’s TypeScript the tool.

It’s easy to think of “TypeScript” as “the syntax”. Either you use TypeScript and write `.ts` files, or you shun TypeScript and exclusively write `.js` files.

But, to Anders’ point, if you write `.js` files in VSCode you’re “using TypeScript” because there’s more to TypeScript than just syntax: there’s TypeScript _the syntax_ and then there’s TypeScript _the tool_.

TypeScript the syntax is a superset of JavaScript. It has annotations, declarations, and more, all layered on top of JavaScript.

But you need a tool, e.g. a compiler, to erase those additions so that the code you write becomes standard JavaScript that can run in the browser (or some standards-based ECMAScript runtime).

There’s also TypeScript the tool. It is perfectly happy to work with regular ole’ JavaScript. It can analyze JavaScript and infer types. It can analyze JavaScript with comments in the form of JSDoc annotations to get types. It can get types from declaration `.d.ts` files. Or it can do all three at once from different files in the same repository — all to make that information useful to the VSCode user.

That’s sort-of the beauty of TypeScript: you can use the flavor that works for you.

If you’re keen on [writing code as it will be run](https://blog.jim-nielsen.com/2020/cheating-entropy-with-native-web-tech/), you can still “use TypeScript” without a compilation step (write JS in VSCode, for example).

Here’s Ryan Cavanaugh, TypeScript Engineering Lead, from the same documentary:

> When I hear about big projects like Svelte and Webpack only using JSDoc, some people look at that and say, “Oh they’re moving away from TypeScript.” But I say, “No they’re embracing TypeScript. They’re embracing this other flavor of TypeScript that we’ve made.”

What stood out to me from the documentary was how members of the TypeScript team note that, with things like [the type annotations proposal](https://github.com/tc39/proposal-type-annotations), the days of writing `.ts` files might actually be numbered.

Eventually, “using TypeScript” could merely become running a CLI over your `.js` files and making sure everything checks out. You wouldn’t _have to_ do that, you could skip that step entirely and run your code without any analysis, but you could also run it for safety’s sake — a kind of “compiler via comments”.

That's what the proposal could bring, which intrigues me because it shows how the TypeScript team is aiming to make the `.ts` to `.js` aspect of the tool follow the steps of Sass or jQuery: a tool making itself obsolete by disappearing into the web platform.