# The Web Beyond Browsers

Web standards aren’t exclusively about facilitating cross-browser consistency. The standardization of web platform APIs beyond the browser is coming, and I’m here for it.

Here’s a few links that have been solidifying this idea in my head as of late.

First: last week, Ryan Dahl (creator of Node.js and now Deno) posted an article titled [“JavaScript Containers”](https://tinyclouds.org/javascript_containers).

> Technology is difficult to predict, but certainly the World Wide Web will be here in 10 years. Every passing day sees more and more human infrastructure tied together via web apps - the web is eating the world. If you believe the web will be here in 10 years, then certainly the standards that make up the web - HTTP, HTML, CSS, JavaScript - will be here.

This is why I think [my prediction for the web](https://blog.jim-nielsen.com/2022/web-predictions-on-a-whim/) remaining mostly the same (but enhanced!) is a solid one. More and more stuff is going to accrete on top of the existing, standardized [layers of technology](https://adactio.com/articles/16251) which makeup the web. HTTP, HTML, CSS, JavaScript, they’re going to be around for a long while. They’re embedded in everything we do. And JavaScript is one particular interesting space of development in this stack.

> The web is the fundamental medium of human information. JavaScript is unlike other programming languages in that it is deeply tied into this infrastructure.

So what developments are happening in JavaScript besides new and standardized APIs across browsers?

> There is a new higher level container emerging for server software: the JavaScript sandbox itself.
> 
> This container isn’t meant to address the same breadth of problems that Linux containers target. Its emergence is a result of its simplicity. It minimizes the boilerplate for web service business logic. It shares concepts with the browser and reduces the concepts that the programmer needs to know…
> 
> In this emerging server abstraction layer, JavaScript takes the place of Shell. It is quite a bit better suited to scripting than Bash or Zsh. Instead of invoking Linux executables, like shell does, the JavaScript sandbox can invoke Wasm

On top of all that, there’s the benefit of universality:

> Every web engineer already knows JavaScript browser APIs. Because the JS container abstraction is built on the same browser APIs, the total amount of experience the engineer needs is reduced. The universality of Javascript reduces complexity.

Yes! As Ryan says, “the future of scripting languages is browser JavaScript”. Standardizing on this future is now an all-important task ahead of us. 

> The fundamental mistake of Node.js was diverging from the browser as new APIs were standardized, inventing too much. In 2010, we didn’t have ES modules, but once it was standardized it should be been brought into Node. The same can be said for promises, async/await, fetch, streams, and more. Antiquated non-standard bits like CommonJS require, package.json, node_modules, NPM, the global process object will ultimately either be standardized and added to the browser or supplanted by web-aligned replacements.

I think the same way people like [Zeldman](https://en.wikipedia.org/wiki/Jeffrey_Zeldman) helped surface the need and importance of building for browsers with web standards, we’re seeing the same thing happen for browser-adjacent technologies, like servers. Bet on standards!

Which leads me to today’s announcement of the “Web-interoperable Runtimes Community Group (WinterCG)”. From [the Deno blog](https://deno.com/blog/announcing-wintercg):

> when using Deno, you aren't learning new platform specific APIs or functionalities, but rather you are investing in your knowledge of the largest, and most important platform in the world: the web.
>
> It's not all sunshine and rainbows, though. Many web platform APIs were designed with only the browser in mind, and not server side runtimes. This means that when server side runtimes implement these APIs, they sometimes have to diverge subtly from the browser implementations and specifications, so the API becomes useful on the server. A great example of this is `fetch`: the API surface itself works fine on servers, but only when CORS is skipped, users can manually handle redirects, and full duplex HTTP streams are supported.

Indeed, there are tricky divergences for APIs originally made for browsers which are now being ported to server environments. Personally, I learned about these deep-rooted nuances of `fetch` the hard way: through trial and errors while [trying to make a CORS proxy](https://blog.jim-nielsen.com/2020/a-cors-proxy-with-netlify/) on the server and running into [redirect status codes](https://blog.jim-nielsen.com/2021/fetch-and-3xx-redirect-status-codes/).

> These subtle differences in API behavior exist for all server side implementations of fetch, but are often not well documented, and not consistent across runtimes. To fix this, engineers from Deno, Cloudflare, and a couple of other companies came together to discuss how we could solve this problem. We want to make server side runtimes consistent and compatible with each other...
> 
> The goal of this new W3C community group is to promote runtimes supporting a comprehensive unified API surface that JavaScript developers can rely on regardless of the runtime they are using: be it browsers, servers, embedded applications, or edge runtimes.

I love the emphasis on surfacing these bumps in web platform APIs (depending on runtime) and working to smooth them over. I believe it helps everyone grow in their knowledge and expertise of the web over bespoke third-party abstractions.

(Shameless plug: Remix [adapters](https://remix.run/docs/en/v1/other-api/adapter) polyfill these divergences with [the goal to one day be no longer necessary](https://twitter.com/ryanflorence/status/1523653395038449665).)

The web is, indeed, eating the world. And it’s technologies are quickly becoming the foundation of everything we do (even [native apps in macOS are using web views](https://blog.jim-nielsen.com/2022/inspecting-web-views-in-macos/)) — esepecially JavaScript. The goal, it seems, is no longer isomorphic JavaScript that runs on the client and the server but rather (as [I heard on devMode.fm](https://blog.jim-nielsen.com/2022/notes-from-michael-jackson-devmode-fm/)) Megamorphic JavaScript: JS that runs in the browser, on the server, in an isolate, in a service worker, or in a container. In short: everywhere!