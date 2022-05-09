#podcastNotes #remix #progressiveEnhancement

# Podcast Notes: Michael Jackson on devMode.fm

I recently listened to [this podcast with Michael](https://devmode.fm/episodes/leverage-the-web-platform-with-remix-run) and a few things stood out I wanted write down.

First, here’s Michael talking about React:

> React is this very capable tool that you can build really, really terrible experiences with.

He points this out, in part, because the default behavior for a long time with React has been that all the code you write — and the tools you use alongside it — get sent over the wire as a dependency for users, often resulting in slow, janky experiences.

Michael then goes on to point out that Remix gives you the ability to “scale up or down” as much as you like. Don’t want any JS on the page at all? Remix supports it. If you scale Remix all the way down, you don’t need JavaScript at all. It’s just `<a>` links and `<form>` tags like 1999.

However, from that starting point of basic functionality, Remix gives you the ability “scale up” and enhance the user experience with as much JavaScript as you like.

_And you can do this on a page-by-page basis._ It’s not site-wide choice.

I found the host’s articulation of this point a bit funny:

> [Host] Whoa. Whoa. So we're talking about a framework  
> [Michael] Yeah  
> [Host] That uses React  
> [Michael] Yeah  
> [Host] And it can render a page that, when someone loads it, there’s no javascript on it?  
> [Michael] Yeah, absolutely.

Let that sink in.

You can build experiences that start with basic HTML. If that’s all you need, great. That’s valid and it works in Remix. Send that to your clients (and their action requests will still work via `<form>` elements). Everything else from there can be a layered enhancement if you choose it — no need to build two apps. 

Towards the end of the podcast, the host asks Michael a question along the lines of: why is the philosophy of Remix to honor existing web standards technologies? His answer:

> Our approach is influenced a lot by the perspective that we have. One of the reasons earlier why I was talking about how big react-router is, is because when you have a project that is used by millions of people all over the world you do gain some perspective. We have many, many people trying to build things with react-router in emerging markets—places where people just don’t have access to the best technology. You cannot build the best experience for those people using a lot of this SSG/JAMstack [MBs of JavaScript] approach. You _have_ to go with progressive enhancement. 

That resonates with me. Progressive enhancement is the technical approach to fulfilling the web’s ethos of universal accessibility. 