# Things You Can And Can’t Do

I heard [Ryan F. say](https://podcasts.apple.com/us/podcast/the-remix-podcast/id1600739725?i=1000545192927):

> You can make your server fast. You can’t make your users’ network fast.

And it got me thinking about what you can and can’t do — what you do and don’t have control over.

You can’t:

- Make your user’s network transfer _faster_
- Make your user’s device compute _faster_

But you can:

- Make your user’s network transfer _less_
- Make your user’s device compute _less_

A server can make a better user experience, in some cases, because it can [do compute and network tasks on behalf of the user](https://chriscoyier.net/2022/05/04/it-doesnt-much-matter-how-cdny-your-jamstack-site-is-if-everything-important-happens-from-a-single-origin-server-edge-functions-are-probably-part-of-the-solution/) — you do it so they don’t have to.

- Do compute (e.g. templating and business logic) on your server, then you don’t have to transfer the compute logic over the network and to your user’s device for execution. You can make your server’s compute faster, for example by beefing up its hardware and increasing its software optimizations.
- Do network calls on your server, leveraging the internet backbone connectivity that is available in the networking infrastructure of your cloud computing provider. Your server probably has a great internet connection. Your users? Who knows.

Again, you can’t make a user’s network faster. Nor can you make their device hardware faster. However you can make the experience on their network and hardware perceptually faster  through a smaller workload on their network and device aided by heavier lifting by your server.

In this way, you don’t always put the onus on the user’s device and network connection to [self serve](https://blog.jim-nielsen.com/2021/ikea-and-javascript/) to your website or platform.

As the famous saying goes: “Grant me the serenity to accept the things I cannot change”, like a user’s workload on their network and hardware, “the courage to change the things I can,” like my server’s workload on its network and hardware, “and wisdom to know the difference.”