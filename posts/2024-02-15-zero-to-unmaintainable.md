# Zero to Unmaintainable in 1.2 Commands

Dave posted [“The time to unmaintainable is very low”](https://daverupert.com/2024/01/time-to-unmaintainable/) about how pervasive this idea of “get up and going quick” is:

> I can burp some npm commands into my terminal, burp some more to setup a deployment pipeline and blam! Website. The time to product demo is so low.

But there’s little to no mention of what comes after that. Buyer beware:

> it’s possible you’ve [generated] something way past your ability to maintain.

This resonates. And it got me thinking.

You know how the car industry loves the acceleration measurement of zero to sixty? Like, “This car will do 0 to 60 in 2.5 seconds!”

The front-end industry’s equivalent is how fast you can standup a project. Like, “Get this whole thing stood up and deployed in 2 commands!”

But as Dave points out, you can accelerate from nothing to unmaintainable very quickly and easily.

> I realize I’m complaining about moving too fast but that’s not my intent. Although, I could argue that while driving 200mph is fun and exciting, you’re one small fuckup away from a major fuckup. My point is that a key factor of sustainability is making sure maintainability stays on par with growth. At the risk of sounding like a Luddite – which I am – the ability to fancy copy-paste your way into an unmaintainable situation is higher than ever and that’s a trade-off we should think about.

There is such a focus on how quickly you can get going, but so little focus on how you maintain what you just created. Featured in the hero section of every tool is the single command to get started:

```
> npx create cool-thing@latest
```

But no mention of everything that comes after, like:

```
54 vulnerabilities (26 moderate, 23 high, 5 critical)
```

Have you tried updating major versions across different tools which are iterating at different paces in different directions with different goals?

It feels akin to credit. Credit is a great tool, and readily and easily available in so many places today. _But_ if you’re not careful, your ability to easily borrow and use credit will quickly outpace your ability to pay it back.

They say the two best days in a boat owner’s life are: 1) the day they buy a boat, and 2) the day they sell it.

Similarly, the two best days in a web developer’s life are: 1) the day they scaffold a new app with the latest and greatest, and 2) the day they rewrite it.