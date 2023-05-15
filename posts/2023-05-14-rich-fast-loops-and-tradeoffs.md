# The Power of Fast Iterative Loops

I was hyperlinked to [this comment where Rich Harris stopped by Hacker News](https://news.ycombinator.com/item?id=35892250) to clarify his position on the (controversial?) steps Svelte is taking to move off Typescript in favor of types-via-JSDoc comments.

First off, I love how Rich prefaces his comments by basically saying, “However you think you’ll use what I’m about to write as fodder to justify whatever your position, I’m afraid I’m going to disappoint you.” Lol, gotta love Rich.

Now, allow me to use his words to prove a point. Just kidding — sort of. Here’s Rich:

> [switching from TS to JSDoc] will result in smaller packages…and you'll be able to e.g. debug the framework by cmd-clicking on functions you import from `svelte` and its subpackages (instead of taking you to an unhelpful type declaration, it will take you to the actual source, which you'll be able to edit right inside `node_modules` to see changes happen). I expect this to lower the bar to contributing to the framework quite substantially, since you'll no longer need to a) figure out how to link the repo, b) run our build process in watch mode, and c) understand the mapping between source and dist code in order to see changes.

I appreciate this acknowledgement that dependencies aren’t always a neatly wrapped package of goods you never need to peer into and muck up a little. I can’t count the times I’ve had to open up some package dependency in `node_modules` in order to tweak a line of code to pinpoint a bug. Rich adds:

> So this will ultimately benefit our users and contributors. But it will also benefit _us_, since we're often testing changes to the source code against sandbox projects, and this workflow is drastically nicer than dealing with build steps.

Having code you can inspect, poke at, tweak, and then _immediately run_ is a kind of super power. Fast, iterative feedback loops are incredibly empowering. This is what I was getting at when I wrote about [cheating entropy by writing vanilla HTML, CSS, and JS](https://blog.jim-nielsen.com/2020/cheating-entropy-with-native-web-tech/):

> Take a moment and think about this super power: if you write vanilla HTML, CSS, and JS, all you have to do is put that code in a web browser and it runs. Edit a file, refresh the page, you’ve got a feedback cycle. As soon as you introduce tooling, as soon as you introduce an abstraction not native to [the runtime]...[you add] a giant, blocking dependency for your project to work. And if you can’t get that dependency working, your project is dead in the water until you can—both now and in the future.

I was speaking about writing code as it will be run in the browser, but it seems relevant regardless of runtime. The more you can author code _as it will be run_ the easier (and faster) it will be to maintain that code over time and across contexts. Here’s me again:

> The more I author code as it will be run by the browser the easier it will be to maintain that code over time, despite its perceived inferior developer ergonomics (remember, developer experience encompasses both the present and the future, i.e. “how simple are the ergonomics to build this now and maintain it into the future?”) I don’t mind typing some extra characters now if it means I don’t have to learn/relearn, setup, configure, integrate, update, maintain, and inevitably troubleshoot a build tool or framework later.

I don’t think this sentiment is _anti_ build step. It’s _pro_ fast, iterative loops — and speed is important. I’m not just talking individual developer velocity, but your ability as a team or an organization to adapt and change to the world around you. The world is constantly changing and so is software to keep up. Your agility in adapting to that change is a strategic advantage, and you adapt quicker when there’s less between you and your goals: less cruft, less baggage, and less tooling — for even tooling has to adapt and change to the world around it, then propagate its changes _to you_ before you can adapt _to them_!

Ultimately it’s trade-offs all the way down. As [my previous boss once said about product design](https://tech.sagesure.com/blog/2021-11-30-design-systems-and-trade-offs/): there is no right or wrong, only trade-offs.