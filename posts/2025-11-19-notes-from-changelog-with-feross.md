#podcastNotes

# Podcast Notes: Feross Aboukhadijeh on The Changelog

I enjoyed listening to [Feross Aboukhadijeh](https://feross.org), founder and CEO of the security firm Socket, on the [Changelog podcast “npm under siege”](https://changelog.com/friends/111). The cat-and-mouse nature of security is a kind of infinite source of novel content, like a series of heist movies that never produces the same plot so you can never quite guess what happens next.

I like how succintly Feross points out the paradox of trying to keep your software safe by upgrading packages on npm:

> The faster you upgrade your packages, the safer you are from software vulnerabilities. But then the faster you upgrade the more vulnerable you are to supply chain attacks

He points out (and I learned) that [pnpm has a feature called `minimumReleaseAge`](https://pnpm.io/settings#minimumreleaseage) that lets you avoid installing anything super new. So you can, for example, specify: “Don’t install anything published in the last 24 hours.”

In other words: let’s slow down a bit. Maybe we don’t need immediacy in everything, including software updates. Maybe [a little friction is good](https://blog.jim-nielsen.com/2025/more-friction-please/).

And if security vulnerabilities are what it took to drive us to this realization, perhaps it’s a blessing in disguise.

(Until the long running cat-and-mouse game of security brings us a bad actor who decides to exercise a little patience and creates some kind of vulnerability whose only recourse requires immediate upgrades and disabling the `minimumRelaseAge` flag, lol.)

Later in the podcast Feross is asked whether, if he was the benevolent dictator of npm, he would do things the same. He says “yes”. Why? Because the trade-offs of “trust most people to do the right thing and make it easy for them” feels like the better decision over “lock it down and make it harder for everyone”. He’s a self proclaimed optimist:

> There’s so much good created when you just trust people and you hope for the best.

Obviously Feross has an entire business based on the vulnerabilities of npm, so his incentives are such that if he did change things, he might not exist ha. So read that how you will. 

But I like his optimistic perspective: try not to let a few bad actors ruin the experience for everyone. Maybe we can keep the levers where they are and try to clean up what remains.