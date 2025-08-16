# The Web as URLs, Not Documents

[Dan Abramov on his blog](https://overreacted.io/impossible-components/) (emphasis mine):

> The division between the frontend and the backend is physical. We can’t escape from the fact that we’re writing client/server applications. Some logic is naturally more suited to either side. But one side should not dominate the other. And **we shouldn’t have to change the approach whenever we need to move the boundary**.
> 
> What we need are the tools that let us compose across the stack.

What are these tools that allow us to easily change the computation of an application happening between two computers? I think Dan is arguing that RSC is one of these tools.

I tend to think of Remix (v1) as one of these tools. Let me try and articulate why by looking at the difference between how we thought of websites in a “JAMstack” architecture vs. how tools (like Remix) are changing that perspective.

**JAMstack**: a website is a collection of static documents which are created by a static site generator and put on a CDN. If you want dynamism, you “opt-out” of a static document for some host-specific solution whose architecture is starkly different from the rest of your site.

**Remix**: a website is a collection of URLs that follow a request/response cycle handled by a server. Dynamism is “built-in” to the architecture and handled on a URL-by-URL basis. You choose how dynamic you want any particular response to be: from a static document on a CDN for everyone, to a custom response on a request-by-request basis for each user.

As your needs grow beyond the basic “static files on disk”, a JAMstack architecture often ends up looking like a microservices architecture where you have disparate pieces that work together to create the final whole: your static site generator here, your lambda functions there, your redirect engine over yonder, each with its own requirements and lifecycles once deployed.

Remix, in contrast, looks more like a monolith: your origin server handles the request/response lifecycle of all URLs at the time and in the manner of your choosing.

Instead of a build tool that generates static documents along with a number of distinct “escape hatches” to handle varying dynamic needs, your entire stack is “just a server” (that can be hosted anywhere you host a server) and you decide how and when to respond to each request — beforehand (at build), or just in time (upon request). No architectural escape hatches necessary. 

You no longer have to choose upfront whether your site as a whole is “static” or “dynamic”, but rather how much dynamism (if any) is present on a URL-by-URL basis. It’s a sliding scale — a continuum of dynamism — from “completely static, the same for everyone” to “no one line of markup is the same from one request to another”, all of it modeled under the same architecture.

And, crucially, that URL-by-URL decision can change as needs change. As [Dan Abramov noted in a tweet](https://x.com/dan_abramov2/status/1748004562378592503?s=20):

> [your] build doesn’t *have to* be modeled as server. but modeling it as a server (which runs once early) lets you later move stuff around.

Instead of opting into a single architecture up front with escape hatches for every need that breaks the mold, you’re opting in to the request/response cycle of the web’s natural grain, and deciding how to respond on a case-by-case basis.

The web is not a collection of static documents. It’s a collection of URLs — of requests and responses — and tools that align themselves to this grain make composing sites with granular levels of dynamism _so_ much easier.
