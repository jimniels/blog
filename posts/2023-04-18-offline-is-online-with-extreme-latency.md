#localFirst

# Offline Is Just Online With Extreme Latency

I just finished watching [“Local-first Software” by Peter Van Hardenberg](https://www.youtube.com/watch?v=KrPsyr8Ig6M) and loved it!

He talks about changing the paradigm we’re currently in where a program runs in the cloud and we look at it when we’re online, to one where the program runs on the device in our hands and we send data to the cloud for “durability or accessibility”. In other words, leverage the cloud without being dependent on it. 

It almost sounds like a form of resilient design (i.e. progressive enhancement) if you think about it — the cloud as an optional, layered enhancement of your application. Now that’s a paradigm shift!

It’s kind of absurd when you think about it, almost like “Why can’t we do this easily yet?” Two computers in the same room can’t talk to each other directly. Instead they must talk through the AWS server farm in Virginia. Here’s Peter:

> You want to work with a co-worker on a piece of software? If you're in the same room, sitting at the same table, looking at screens side-by-side, any communication between those two computers is actually happening [by sending signals] across the ocean to some data center, to some other server and then coming back to you. One: that's crazy. But two, it's also very slow and expensive and it doesn't have to be that way.

Peter actually starts his talk by comparing the enterprise-level software and cloud services we build today to building a billions-of-dollars aircraft carrier. Somehow, because the tech behemoths are building aircraft carriers, the rest of us are all modeling everything we build as an aircraft carrier too.

> A lot of the time we're using the techniques to build aircraft carriers when what we really need is a bicycle: something simple, something personal, something that can take you where _you_ need to go and that responds to you alone (and is a heck of a lot easier to maintain and operate).

Unfortunately, some of the open technologies for building more local-first, p2p applications just aren’t there yet. Like Peter’s point on webRTC.

> In the case of webRTC, I've seen so many projects do this where they’re like, “It‘s peer-to-peer! You just connect to the signaling server and then the things talks!” That’s not really peer-to-peer cause you've got a server. If you've already got a server...my advice is: don't mess around with peer-to-peer stuff, just use that server.

I really loved the shift of perspective Peter provides around “offline” vs “online”. Don't think of them as two different things, because then you create software that splits experiences into two different modes: 1) “online” which gets all the support and attention, and 2) “offline” which gets little to no thought at all.

Instead, you can think of online/offline as part of the same continuum just different measurements of latency. There are gradations of latency when you’re “online”, and “offline” is merely at the slowest end of that spectrum. For example:

- Wifi: < 300ms latency
- 3G: 1s latency
- Offline: 30 seconds to days of latency (until you sync back online)

I love that! Again, it feels like an incredibly resilient way to approach building for the web — even an internet connection is an enhancement! Here’s a slide from Peter’s presentation:

<img src="https://cdn.jim-nielsen.com/blog/2023/offline-is-extreme-latency.png" width="1130" height="629" alt="Screenshot of a slide from “Local-first Software” by Peter Van Hardenberg showing a spectrum of latency speeds, with “offline” being the most extreme form of latency." />

This kind of idea would move you away from a product full of API calls to one based on data synchronization.

The generalized principle underlying in this idea, as Peter points out, is that when you shift the way you think about building things you open new doors to building _different_ things. So, even if you don’t like the idea of data synchronization over API transactions, it’s at least worth entertaining and imagining what’s possible in a paradigm that’s different than what you’re used to.

I love the notion of shifting the idea of two binaries, online/offline, to a spectrum of latency where “offline” is merely the most extreme form of latency. It makes you think differently. You even begin to realize that “offline” has its own gradations: latency of seconds, minutes, hours, days, weeks, or more! They’re not all the same and represent a more accurate, all-encompassing picture of the kinds of environments real-world users live in.