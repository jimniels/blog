# Loading, Parsing, and Executing JavaScript in 2022

I recently came across this fun website: [“Everyone has JavaScript, right?”](https://kryogenix.org/code/browser/everyonehasjs.html)

From the moment a user requests your website, it depicts all the things that stand in the way of JavaScript loading. [Spoiler: there’s a lot of things.]

What’s interesting is: it’s not comprehensive. It essentially ends with, “None of the above happened? Your JS probably loaded.” But _loading_ JavaScript over the network is just one categorical grouping of things that can go wrong with JavaScript. After loading, JavaScript can still fail when parsing or executing. (Plus bugs! All those event listeners? Those may or may not fail once the JS loads, parses, and runs. They can lie in wait to fail at onClick, which can result in your page doing nothing.)

As [Igor Minar argues](https://igor.dev/posts/experiences-web-frameworks-future-me/), _parsing and executing_ JavaScript might be becoming a bigger problem than _loading_ JavaScript.

> With networks becoming faster, client-side code execution is becoming the new bottleneck. This is especially true for low-end and mid-range mobile devices.
>
> Imagine a future where your server is only 9ms away from your average client, while your client-side device takes hundreds of milliseconds to parse, evaluate, and execute your ever-increasing Gen 2-based Web application. Rather than trying to squeeze more performance from your client, you'd start thinking about how to offload more of the logic to the server-side. That future is coming. And it's coming faster than most of us expect.

This future—one where you leverage a distributed network of computers to not only deliver, but also _compute and assemble_ assets unique to your individual users—is not far away. I wrote about this recently in [my first post on the Remix blog](https://remix.run/blog/remix-and-the-edge). CDNs are becoming more than just a network for delivering static content. They’re becoming dynamic servers themselves — the next logical step in the evolution of CDNs and “the edge”.  

Cloudflare, for example, has innovative solutions like [KV](https://developers.cloudflare.com/workers/learning/how-kv-works/) and [D1](https://blog.cloudflare.com/introducing-d1/) for replicating data to CDN edge nodes. Data, compute, and requests/responses can all happen geographically close to your end users. As [Chris said](https://chriscoyier.net/2022/05/04/it-doesnt-much-matter-how-cdny-your-jamstack-site-is-if-everything-important-happens-from-a-single-origin-server-edge-functions-are-probably-part-of-the-solution/) you know what's better than serving stuff from the edge? Actually doing stuff on the edge. If you don’t want to replicate data across the edge, at least have the edge fetch data on behalf of your users. 

> Why does that matter? It matters because rather than your dinky little computer making an HTTPRequest for the content on your dinky little internet connection in bumbleweeds Australia, you’re making superservers on the world’s fattest internet pipes do it for you. Then you’re injecting the content into HTML before it even arrives at the browser for the first time, so there is no janky-ass Cumulative-Layout-Shitting garbage that happens.

It’s an intriguing idea: you can’t make users’ computers or networks faster, but you can make them do less work by leveraging the computing and networking infrastructure of big cloud providers on their behalf. As [the Remix docs](https://remix.run/docs/en/v1/pages/philosophy#serverclient-model) say:

> You can make your server fast, but you can't control the user's network…The only thing you can do is decrease the amount of stuff you send over the network. Less JavaScript, less JSON, less CSS. This is easiest when you have a server that you can move the logic to, and a framework that favors progressive enhancement [like Remix].

We already have `@prefers-reduced-data`, maybe we need a `@prefers-reduced-compute` or even a `@prefers-no-javascript` media query ha!

Joking aside, I don’t think it’s crazy to consider lots of data fetching and on-device compute as part of a progressively-enhanced experience. In other words: for less capable devices, offload the CPU cycles and network calls to other, more capable computers.