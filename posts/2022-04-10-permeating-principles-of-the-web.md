#webPlatform #deno #remix

# Examples of the Permeating Principles of the Web

Design principles are incredibly useful because [they help people reach agreement on priorities](https://adactio.com/journal/11620).

The web platform has its own set of [design principles](https://www.w3.org/TR/design-principles/#priority-of-constituencies). One of them is called the [priority of constituencies](https://www.w3.org/TR/design-principles/#priority-of-constituencies). It says: always put user needs first[^1].

> User needs come before the needs of web page authors, which come before the the needs of user agent implementors, which come before the the needs of specification writers, which come before theoretical purity. 

I think it’s interesting to see how the design principles of the web seep into technologies and tools we use everyday, but only as much as those tools are willing to align themselves with [the grain of the web](https://frankchimero.com/blog/2015/the-webs-grain/). Once you deviate from the grain of the web, the principles of the web — which fiercely fight for the end user — can begin to dilute.

Two examples come to mind: deno and remix.

## Deno

One of the difficult problems associated with node and npm stems from the empowerment of third-parties to run arbitrary code on your local machine with default access to the file system and network.

As a user of npm, merely installing dependencies gives third-parties [hooks](https://docs.npmjs.com/cli/v8/using-npm/scripts) into running _their code_ on _your computer_.

Quite frequently new [stories](https://www.bleepingcomputer.com/news/security/big-sabotage-famous-npm-package-deletes-files-to-protest-ukraine-war/) surface of some malicious actor taking advantage of this feature of node/npm — a feature which favors people who _author_ code over people who _use_ (i.e. execute) code.

In the face of the problems arising from this dynamic comes [deno](https://deno.land). One of the interesting things about deno is its posture towards being [webby](https://blog.jim-nielsen.com/2021/deno-is-webby/). It strives to align itself with the web platform and use existing browser APIs and functionality wherever possible.

Given that the web has design principles governing issues like security — principles which favor the needs of users _over_ authors — deno, in a sense, inherits these principles “for free” in its own design and functionality.

So, for example, when [the web platform strives to make any GET safe](https://www.w3.org/TR/design-principles/#safe-to-browse) for users, deno follows this lead by favoring the security of a code user over a code author.

This is why, at least in part, deno has explicit flags like `--allow-net`, `--allow-read`, and `--allow-write` when executing code: deno is _secure by default_ and explicit overrides are required for scripts to have access to sensitive mechanics like a user’s network or file system.

In short: to achieve some features, node/npm favors the needs of code authors over the security of code users. Deno flips that dynamic, favoring the security of code users over the needs of code authors[^2].

## Remix

Remix is a new framework I find compelling because it [aligns itself with web standards](https://remix.run/blog/seed-funding-for-remix#web-standards-modern-ux). It embraces, encourages, and employs the use of web technologies such as `fetch`, `<form>`, `URLSearchParams`, and `FormData`. Additionally, progressive enhancement is a first-class citizen of the framework. Building a form? Remix says: start with a `<form>`. It works sans JavaScript and embraces the browser UX as a solid, robust starting point. From there, any “modern” UX you can imagine can be layered on as an enhancement to that core experience.

Remix is all about `#useThePlatform`. But `#useThePlatform` is about more than choosing to align yourself with the _technologies_ of the web platform (HTML, CSS, JS, browser APIs, etc.). It’s also about choosing to align yourself with the _principles_ of the web platform, principles which underlay the power dynamics of software on the web: the end user’s experience _over_ the experience of others.

So, when a framework like Remix opts to align itself with the grain of the web, you’re not only getting consistent APIs — which has its own benefits in terms of [portability and transferrable knowledge](https://remix.run/blog/not-another-framework) — you’re also getting the benefits of the principles which undergird the design of those technologies. You’re getting the web’s principles. 

The more your technology aligns with the web platform, the more your own principles will. You too are opting for a priority of constituencies: users above all others.

[^1]: The folks at Cloud Four took this idea of “the priority of constituents” and mapped it to [actors in a design system](https://cloudfour.com/thinks/the-design-system-priority-of-constituencies/), which is an intriguing idea.
[^2]: There are, no doubt, [benefits to giving code authors levers like the postinstall script](https://blog.jim-nielsen.com/2018/installing-and-building-an-npm-package-from-github/). But there are also drawbacks. As a long-time friend, [Tim Meaney](https://twitter.com/timothymeaney), says: “There is no right, no wrong, there’s only trade-offs.”
