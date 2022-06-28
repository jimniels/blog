# Notes From “In And Out Of Style”

I watched Jeremy’s talk at CSS Day 2022 titled [“In And Out Of Style”](https://www.youtube.com/watch?v=CdZZcbZG83o) and, as always, I had my notepad ready. Here are a few points that stood out to me.

---

It’s been said the goal of a good web framework is to one day not exist. Jeremy summarizes this in his statement about jQuery:

> Why do we not need jQuery anymore? Because of jQuery.

Today’s frameworks are the R&D department of the web. [Today’s questions are answered in today’s library APIs. Yesterday’s questions are answered in yesterday’s library APIs—and today’s platform APIs.](https://blog.jim-nielsen.com/2019/yesterdays-questions-answered-in-todays-platform-apis/)

A good framework is like a polyfill. A library abstraction might create a new, programmatic API. Because that API doesn’t yet exist in browsers, a polyfill can be created which allows you to write future code today. “Under the hood” the polyfill will use existing web platform APIs to create the desired outcome. This is a programmatic polyfill, but there’s more than that.

I think there are also conceptual polyfills. Many programmatic polyfills start out this way. Before we understand what the API needs to _be_, we have to come to understand what the code should _do_. This is a complex, nuanced process. Jeremy illustrates this well when he covers the history and evolution of CSS, showing how there were early ideas of accounting for user preference in CSS APIs (`h1.font.size = 24pt 100%`) which have evolved into some of the APIs we have today (`@media prefers-*`). I even think methodologies like BEM can be a kind of conceptual polyfill that points us to uncovering future ways of building on the web.[^1]

---

> Frameworks can point the way to a shared context in the future but they themselves are not the future...Use frameworks and libraries as scaffolding to help you build. They are not a foundation. Web standards in the browser are the foundation to build upon.

I like this framing and it’s what I find so exciting about some of the newer abstractions like Remix and Deno which seek to start with web platform APIs as their foundations for building. They start by asking: does this abstraction already exist, in some form or fashion, in the web platform?[^2] They look to fill the gaps of the platform and extend it, rather than reinvent anew its foundations.

---

I really like Jeremy’s final idea about “path dependence”: how our decisions now shape the future. To understand it, just look at how much your present is shaped by the arbitrary decisions of the past.

> Yes, the present moment is a result of decisions made in the past—many of those arbitrary decisions. But that also means the future will be hugely influenced by the decisions you make today, even if those decisions seems small and inconsequential. 

The decisions you make now are the future’s “path dependence”. You’re inventing the future one decision at a time.

[^1]: Watch Jeremy’s talk for more interesting history on CSS, or checkout [my notes](https://blog.jim-nielsen.com/2021/css-is-in-fact-awesome/) from [Hidde’s excellent talk about the origin of the cascade](https://talks.hiddedevries.nl/2gDDUr).
[^2]: As an example, [see my post](https://blog.jim-nielsen.com/2022/deno-is-webby-pt-2/) about how Deno looked to existing browser APIs like `prompt` for CLI APIs.