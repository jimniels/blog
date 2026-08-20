# A Sloppy Interface Is a Security Liability ￼

In his talk [“Why AI Is Breaking Software Security As We Know It”](https://www.youtube.com/watch?v=XnP3td72tng) ([my notes here](https://notes.jim-nielsen.com/n/2026-08-20-0947/)), Feross Aboukhadijeh talks about [the Axios npm incident](https://socket.dev/blog/attackers-hunting-high-impact-nodejs-maintainers) and how the maintainer got phished by succumbing to (amongst other things) a faux Microsoft Teams interface:

> this is the kind of thing that AI makes easy to do, because it can vibe code that whole fake Microsoft Teams interface pretty trivially

You’ve probably seen these: interfaces designed to look like some other product in order to provide a facade of authenticity and exploit someone.

What struck me in listening to Feross was this idea of how the quality of your interfaces can be a protection mechanism against attackers.

I don’t know if I’ve ever heard someone say that out loud — interface and interaction design as a security control — but I’m saying it.

Now, of course, not everyone will consciously notice the level of polish that world-class professionals imbue in digital interfaces. But some will.

Personally, I’ve always used the quality and care of digital  experiences as a heuristic for judging authenticity — and competency to be honest, e.g. “If this UI is so bad, what else will surely be bad?”

Granted, it was a much more dependable heuristic before AI came along. But even now, I can still suss out slop and carelessness which is a skill that continues to be a reliable, protective form of digital literacy (for me).

That’s all to say: a sloppy, careless approach to interface design  not only hurts your brand in terms of customer perception, but it can be an attack vector. The easier it is to sloppily reproduce what you sloppily ship, the easier it will be for your product or brand to be leveraged as a vehicle for exploiting your customers.

If everything you make was produced from a single prompt, then everyone else is one prompt away from imitating you. The easier something is to make, the more likely it’ll be in the genre of “easy to exploit”.

One way to protect yourself (it’s not the only one way, security is never a binary “you are / are not secure”) is to do that extra work to make your experiences go above and beyond what you can easily get out of an LLM.

The protection here is having an interface and experience that is hard to replicate with the same level of fidelity that discerning users will notice — things like micro-interactions, loading behavior, UI copy and voice, handling of edge-cases, etc. That’s the stuff that’s hard (and expensive) to fake because it’s hard (and expensive) to notice you need to fake it.

tl;dr — Fidelity to craft is not only valuable from a product standpoint, but it’s also valuable from security standpoint. If attackers are going after low-hanging fruit, your fruit will be harder to reach if it’s up high.