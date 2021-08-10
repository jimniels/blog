# I Want Confirm a Prompt That We Stay Alert

[Rich Harris wrote an incisive piece](https://dev.to/richharris/stay-alert-d) about the recent drama surrounding Chrome and its sudden breakage of certain JavaScript APIs (`confirm()`, `prompt()`, `alert()`) for cross origin iframes.

As I read his piece, I had all kinds of thoughts flood my mind. Since I have my own blog, I get to publish those thoughts. You can read them. Or don’t. But you should read [Rich’s piece](https://dev.to/richharris/stay-alert-d).

Either way, I present to you the commentary on Rich’s piece from the voices in my head.

---

> Failing to understand why these APIs are so valuable in an educational context is inevitable if you don't consider teachers part of your constituency when designing standards…
>
> It's easy to overindex on the things you can quantify, especially if you're Google. But not all things that count as uses of some feature show up in the data, when the data is predominantly public-facing production websites. Teaching is one such case. There are others.

This is precisely what I was trying to get at when [I asked](https://blog.jim-nielsen.com/2021/browsers-and-representation/): if the web is for everyone—as we all like to believe it is—how and where are everyone’s interests being represented? It’s a question that, as Rich states near the end of his piece, I’m increasingly convinced we need to figure out.

More from Rich on browsers and representation:

> the W3C's priority of constituencies explicitly states that the needs of users and authors (i.e. developers) should be treated as higher priority than those of implementors (i.e. browser vendors), yet the higher priority constituencies are at the mercy of the lower priority ones. 

Again, this resonates with what I was trying to articulate in [a previous post](https://blog.jim-nielsen.com/2021/browsers-and-representation/):

> It feels like the web we're making now is a web designed for commercial interests…
> 
> We do not elect our browser representatives who decide what a browser is and is not. I suppose by using Chrome you’re casting a vote, but ultimately browsers are made following the golden rule: he who has the gold makes the rules.

Ok, that’s enough on representation and constituents. Let’s revisit this 🔥:

> It's easy to overindex on the things you can quantify, especially if you're Google.

There’s more to the web—indeed life—than what can solely be measured. Data should be an informing point in decision making, not _the_ point. 

Many legitimate use cases exist for the likes of `alert()` but those fall under the radar of Chrome’s primary metric for deciding what should and shouldn’t stick around: pageviews, that wonderful metric that will be the death of us all. But “usage doesn't necessarily correlate with importance” and that is [well illustrated by Dan Abramov’s point](https://twitter.com/dan_abramov/status/1422943317512364037) which Rich links to:

> if account deletion flow is using confirm() and breaks because of a change to it, this doesn’t mean account deletion flow wasn’t important. It just means people don’t hit it on every session.

Now let’s move on to breakage. From Rich:

> We can't normalise the attitude that collateral damage is the price of progress, even if we accept the premise — which I don't — that removing APIs like alert represents progress. For all its flaws, the web is generally agreed to be a stable platform, where investments made today will stand the test of time. A world in which websites are treated as inherently transient objects, where APIs we commonly rely on today could be cast aside as unwanted baggage by tomorrow's spec wranglers, is a world in which the web has already lost.

I love this point. Collateral damage as the price of progress would be incredibly disastrous for the web. [Jeremy drove home this point perfectly](https://adactio.com/journal/18337) when he  painted the image of a dystopia where we have to consult the website `canistilluse.com` to build anything on the web.

Or worse, imagine a world where your website would have to declare browsers as a dependency:

```json
"dependencies": {
  "Chrome": "^91.0.0",
  "Firefox": "^32.0.0",
  "Safari": "^15.4.2-rc.0"
}
```

[shudders]

>  If alert is fair game for removal, then so is every API we add to the platform if the web's future stewards deem it harmful. Given that, you'd think we'd expand the platform's surface area with extreme caution; instead, we're adding APIs at breakneck speed, to the almost-guaranteed detriment of its future stability.

I know there’s been some [valid](https://daverupert.com/2021/07/safari-one-offs/) [complaints](https://adactio.com/journal/18335) as of late about Safari and its slowness in moving the Webkit engine forward.

However, for all its deficiencies, I can at least appreciate that _someone_ is moving more slowly and deliberately—if for no other reason than as a counterbalance. Browser APIs ~~will~~ can last nigh forever. Why not be a tad bit more judicious and communicative in shipping these APIs?

Lastly, Rich points this out but it’s also well articulated by [@mikesherov on Twitter](https://twitter.com/mikesherov/status/1423271360357351432?s=20):

> alert and friends are a set of APIs that "stop the world" by blocking the main thread in JS. Browsers hates this. It makes JS engines complicated, and really is some juicy tech debt to be cleaned up. Changing its behavior harder then removing it.

I find it interesting that what's breaking the web is our desire for more, more, more in JS land. `flatten()` brought the drama around breakage and now there’s `alert()`. We’re so incredibly anxious to optimize for what JS can do, blinding ourselves to the stability and resiliency of HTML and CSS. Calm down JS, you’re only one pillar of the web platform ya know?

I have a feeling this won’t be the last time we say: looks like JS innovation in browsers is back on its breakage bullshit.