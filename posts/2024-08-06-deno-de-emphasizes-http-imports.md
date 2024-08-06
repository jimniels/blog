#deno

# Deno De-emphasizes HTTP Imports

I’ve been [a long-time fan of Deno](https://blog.jim-nielsen.com/tags#deno) and their ethos of following the web platform. But I’m not sure how I feel about [their latest admission](https://deno.com/blog/http-imports) which makes their dependency story _more_ like npm and _less_ like the web.

> Designing Deno’s module system around HTTP imports was ambitious. It aimed to replace npm with a distributed system over HTTP, aligning with how ES Modules work in browsers. This eliminated the need for package.json files and node_modules folders, simplifying project structures. Deno scripts could scale down to single-file programs without a project directory or configuration.

Deno’s HTTP imports were one of my favorite features! But alas, it seem the dream is dead. Or rather, there were trade-offs.

One trade-off to HTTP imports was decentralization[^1], which by definition entails a lack of centralized control. But, when you can’t control the end-user experience of your product, your brand suffers even when it’s not your fault.

It seems this began happening to Deno where folks pointed their module dependencies at a variety of hosts and any poor performance from a third-party was a perceived poor performance on the part of Deno. 

> while Deno ensures high availability for its deno.land/x registry, it can’t control other hosts, making overall availability dependent on the least reliable host in your dependency graph.

So Deno ends up being perceived as problematic by end users, but the reality is it’s working precisely the way it was designed to, which cedes control of module availability and reliability to third-parties.

Decentralization is a great philosophical idea, but if you can’t control brand, image, and experience — especially as a startup on venture money[^2] — that’s not good for business. (Decentralization is a terrible way to centralize making money.)

To fix this, Deno made a new registry (JSR) and now their story for modules de-emphasizes module imports via URLs: 

> JSR for sharing modules instead of random file servers.

While I can understand this decision from a certain product perspective, I don’t understand it from the “align yourself with the web platform” ethos Deno originated from.

If you want to be like the web, serving files from random file servers is about as close as you can get[^3].

I like Deno’s original philosophy and, at least for now, you can still import from URLs. [But there are caveats](https://dbushell.com/2024/08/05/the-deno-package-paradox/), as David Bushell thoroughly points out.

Maybe it’s a good product decision? I don’t know. My feelings are [inline with Baldur](https://www.baldurbjarnason.com/2024/links-28/) on this:

> Focusing on node compatibility might look on paper like a good strategy for adoption, but it both sabotages your own ecosystem and condemns you to forever follow, not lead, node

I don’t doubt it’s what people want. npm-style package names are familiar (devs love familiar), and even more they’re terse (devs love typing less). I don’t know if there are two things developers love more than that.

[^1]: It’s a tough tradeoff to make: 1) give people the power and autonomy to make their own choices, and suffer the heat when they blame you for their poor choices. Or, 2) take on the role of benevolent dictator who claims to know what’s best and will control all decision making.
[^2]: “Become the next npm” seems like a great way to raise money because it centralizes a lot of control. Just think about how much control (and vulnerability) exists in npm. Surely you could raise some money on that premise?
[^3]: I suppose there’s an argument in there like, “Nobody serves from random file servers anymore, it’s all AWS under the hood.” In other words: “AWS for serving websites instead of random file servers” may be the way the web works generally — but the web is still a big place. 