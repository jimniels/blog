#browsers #webPlatform

# Trusting Browsers

Jeremy [wrote a piece on trust](https://adactio.com/journal/19021), which I read before starting the dishes.

Then I started the dishes and couldn’t stop thinking about it. So I stopped to get these thoughts out of my brain.

So here we are. Let’s start with Jeremy’s piece.

> I’m kind of confused by this prevalent mindset of trusting third-party code more than built-in browser features.

He ends by asking: why this tendency avoid browser-native features but openly use third-party code (which, often, can merely be an abstraction of browser-native features)?

There are likely many influences at play here: the state of web dev education, the open-ended, low-level nature of (some) browser primitives, culture, even just human nature.

But when Jeremy asked the question of “why?”, the first thing that popped into my mind was a historically-shaped caused: browser compatibility.

We distrust the browser because we’ve been trained to. Years of fighting browser deficiencies where libraries filled the gaps. Browser enemy; library friend.

For example: jQuery did wonders to normalize working across browsers. Write code once, run it in any browser — confidently[^1]. In some ways, it was similar to Electron: write once, run on any platform. That's the promise of many frameworks.

Turns out, I wasn’t the only one who thought this lack of trust in the browser came from historical compatibility issues. Charles Harries had [similar thoughts](https://charlesharri.es/stream/libraries-over-browser-features).

> I think this perspective of trust has been hammered into developers…based almost exclusively on inequality of browser feature support…
> 
> Browser compatibility is one of the underlying promises that libraries…make to developers.

I think we’ll always have libraries and frameworks around because they are proving grounds for browser-native feature candidates. As I’ve written previously, [that’s how we’ve chosen to do innovation on the web.](https://blog.jim-nielsen.com/2019/yesterdays-questions-answered-in-todays-platform-apis/)

> It seems platform answers will always lag behind library answers. How could it be any other way? That’s the route we’ve chosen to go on the web…We decided it’s better to discover new platform APIs in userland and port them back into the platform. 

In this sense, third-party code and abstractions can be wonderful polyfills for the web platform. The idea being that the default posture should be: leverage as much of the web platform as possible, then where there are gaps to creating great user experiences, fill them in with exploratory library or framework features (features which, conceivably, could one day become native in browsers).

This trust in, and primary dependence on, the web platform could benefit developers a lot more than we might think. It can free you from learning transient idioms as frameworks come and go. [Learn web platform features](https://remix.run/blog/not-another-framework) and carry that knowledge with you between frameworks (whether client or server).

I’m optimistic that trust in browser-native features and APIs is being restored. Libraries, frameworks, and tools (like [Remix](https://remix.run) and [Deno](https://deno.land)) are converging on standardization across the client and server and they’re choosing browser APIs to do it. I ventured [a few predictions on this point](https://blog.jim-nielsen.com/2022/web-predictions-on-a-whim/).

> Rather than create [their] own conventions and APIs that deviate from web standards, [they are] converging towards the idea of a single web platform with a unified set of APIs, no matter the environment or runtime. For example, eschew the variety of different APIs for doing async HTTP requests and instead standardized around the fetch API everywhere.

Look no further than node 18 recently shipping the `fetch` API (Deno already had it). And Remix is pushing in a similar direction, standardizing (and recommending usage of) browser-native APIs like `fetch`, `Headers`, `Request`, and `Response`, [regardless of your deployment target](https://remix.run/docs/en/v1/other-api/fetch).

I like to think this kind of standardization (and recommended posture towards usage) means it won’t be long until browser-native features and APIs become the only logical starting point for any code on the web.

Maybe stating a general principle for web development could help? Something along the lines of: where available, default to browser-native features over third party code, abstractions, or idioms.[^2]

[^1]: jQuery’s actual tagline was: “write less, do more”.
[^2]: There’s nuance to everything, so I’d caveat that by saying: if you can articulate a good rationale for going against a general principle, go for it.