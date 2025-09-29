# Running Software on Software You’ve Never Run

I love a good look at modern practices around semantic versioning and dependency management ([Rick Hickey’s talk “Spec-ulation”](https://www.youtube.com/watch?v=oyLBGkS5ICk) is the canonical one I think of).

Niki recently wrote a good ‘un at tonsky.me called [“We shouldn’t have needed lockfiles”](https://tonsky.me/blog/lockfiles/).

What struck me was this point about how package manifests allow version ranges like `^1.2.3` which essentially declare support for future versions of software that haven’t yet been written:

> Instead of saying “libpupa `1.2.3` depends on liblupa `0.7.8`”, [version ranges] are saying “libpupa `1.2.3` depends on whatever the latest liblupa version is at the time of the build.”
> 
> Notice that this is determined not at the time of publishing, but at the time of the build! If the author of libpupa has published 1.2.3 a year ago and I’m pulling it now, I might be using a liblupa version that didn’t even exist at the time of publishing!

The funny thing is, we use version ranges only to go freeze them with lock files:

> version ranges end up not being used anyway. You lock your dependencies once in a lockfile and they stay there, unchanged

In other words: we avoid locking ourselves to specific versions in `package.json` by using version ranges, only to then go lock ourselves to specific versions in `package-lock.json` — lol!

I mean, that’s funny when you think about it.

But to go back to Niki’s earlier point: version ranges let us declare to ourselves that some code that exists today is compatible with some other future code that has yet to be written.

This idea allows us to create automated build systems that resolve to an artifact whose dependencies have never existed before in that given combination — let alone tested and executed together in that combination.

Now I get it, semantic versioning is an idea not a guarantee. But it’s also pretty wild when you think about it — when you encounter the reality of how semantic versioning plays out in the day-to-day world of building software.

I guess that’s a way of acknowledging out loud that we have normalized shipping production systems on top of the assumption that untested, unwritten combinations of software will behave well together — if not better, since patch updates fix bugs right?

And that’s not even getting into the security side of the equation. Future versions of packages have no guarantee to be as safe as previous ones, as we’ve seen with some of [the npm supply chain attacks](https://socket.dev/blog/npm-author-qix-compromised-in-major-supply-chain-attack) which rely on version ranges for their exploits. (Funny, isn’t it? Upgrading to the latest version of a package is can get you into trouble. And the solution? Upgrade to the latest version of a package.)

Anyhow, this all gets me thinking that version ranges and dependency management were the gateway drug to the non-determinism of LLMs.