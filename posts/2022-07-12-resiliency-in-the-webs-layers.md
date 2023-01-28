# The Resiliency in the Web’s Layers

I’ve been reading [_High Performance Browser Networking_](https://hpbn.co). In it, the author Ilya Grigorik talks about how “slow start” was built into the protocol to keep the network and its clients from overwhelming themselves. While a genius solution, it puts small short bursts — like general HTTP requests — at a disadvantage performance-wise. That’s why connection re-use is so vital to good performance. Here’s the excerpt from [congestion avoidance](https://hpbn.co/building-blocks-of-tcp/#congestion-avoidance):

> TCP is specifically designed to use packet loss as a feedback mechanism to help regulate its performance. In other words, it is not a question of _if_, but rather of _when_ the packet loss will occur. Slow-start initializes the connection with a conservative window and, for every roundtrip, doubles the amount of data in flight until it exceeds the receiver’s flow-control window, a system-configured congestion threshold (ssthresh) window, or until a packet is lost, at which point the congestion avoidance algorithm takes over.

I won’t pretend to fully understand that paragraph, or TCP, or “slow start”, but I understand enough to find that it interesting.

In fact, it makes me appreciate the beautiful design of TCP — which stands in contrast to so many other pieces of brittle technology — due to its resilient, even antifragile, nature. What’s antifragile? [Here’s Nassim Taleb](https://fs.blog/antifragile-a-definition/) in his book on the subject:

> there is no word for the exact opposite of fragile. Let us call it antifragile. Antifragility is beyond resilience or robustness. The resilient resists shocks and stays the same; the antifragile gets better.

An antifragile system doesn’t just stand up against stressors, it is strengthened by them — like the body’s immune system — whereas a fragile system is “weakened, even killed, when deprived of stressors”.

This is what I find so intriguing about the nature of TCP: it performs best when it fails to do the very thing it was designed to do — deliver packets. Back to Ilya:

> In fact, packet loss is necessary to get the best performance from TCP! A dropped packet acts as a feedback mechanism, which allows the receiver and sender to adjust their sending rates to avoid overwhelming the network, and to minimize latency

Failure is built into the system. Failure is reparative. Like an immune system that _needs_ challenges to thrive.

TCP is what the other layers of the web sit on top of. Its nature of resiliency, even antifragility, can seep into the other layers which sit on top of it — if we allow it.

> Further, some applications can tolerate packet loss without adverse effects: audio, video, and game state updates are common examples of application data that do not require either reliable or in-order delivery — incidentally, this is also why WebRTC uses UDP as its base transport.
>
> If a packet is lost, then the audio codec can simply insert a minor break in the audio and continue processing the incoming packets.

When built in layers on top of TCP, URLs, and HTML[^1], websites can withstand their equivalent of packet loss — the loss of  CSS or JavaScript — and still function.[^2] [Image borrowed from Jeremy Keith’s [“Layers of the Web”.](https://speaking.adactio.com/ZCJ61M)]

<img src="https://cdn.jim-nielsen.com/blog/2022/resiliency-6-layers.png" width="648" height="331" alt="A stack of six layers, from bottom to top: TCP/IP, HTTP, URLs, HTML, CSS, JS+, with the bottom layer being labeled as 'Antifragile' and the other 5 layers labeled as 'Resilient'." />

However, when you smash multiple layers into a single, interdependent layer you lose the resiliency naturally afforded by layering. One point of failure in a multi-stack layer can bring down the whole layer.

For example, when a website is architected and delivered as a giant bundle of JavaScript that contains all the logic for routing (URLs), markup generation (HTML), styling rules (CSS), and interactivity (JS), it’s easily prone to failure at the first sign of a “packet loss” or failure.

<img src="https://cdn.jim-nielsen.com/blog/2022/resiliency-3-layers.png" width="648" height="331" alt="A stack of three layers, from bottom to top: TCP/IP, HTTP, and then URLs, HTML, CSS, JS+ all in one layer. The bottom layer is labeled 'Antifragile', the next is 'Resilient' and the top layer is labeled 'Fragile'." />

This is all to say: the web can be built in layers, with each layer’s characteristic strengths being able to seep into the ones above it — if we let them.

[^1]: In a way, each of the layers on top of HTTP can have their own form of forgiveness and resiliency if we choose to support it. A couple examples: 1) URL missing a trailing slash? It can still resolve. 2) URL points to an old resource? It provides a redirect. 3) HTML node is missing a closing bracket? Parser will do its best to continue rendering the rest of the page. 4) HTML contains an unknown element? Parser will still render its contents and continue on. 5) CSS fails to load? HTML still renders and remains interactive. 6) JS fails to load or parse? HTML can remain interactive and functional.
[^2]: If built with progressive enhancement, the loss of resources _could_ make a website faster and more empowering — perhaps even antifragile — as in [the story of Chris Zacharias](https://blog.chriszacharias.com/page-weight-matters) who, although deliberate, made YouTube drastically smaller and found his performance metrics went down because more people who previously couldn’t use YouTube were now using it.