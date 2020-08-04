---
tags: thoughts css html
---

# The Resiliency of the Internet

A couple months back I read [“Your Internet is working. Thank these Cold War-era pioneers who designed it to handle almost anything”](https://www.washingtonpost.com/technology/2020/04/06/your-internet-is-working-thank-these-cold-war-era-pioneers-who-designed-it-handle-almost-anything/). I loved it! It talks about the unprecedented demand that has been put on the infrastructure of the internet as of late. Anyone who works in tech knows that unprecedented demand in network traffic usually equates to downtime. But the internet, _the network of networks_, is different.

The article starts by outlining what’s happening to the internet with COVID:

> the Internet overall is handling unprecedented surges of demand as it keeps a fractured world connected at a time of global catastrophe.
> 
> “This basic architecture is 50 years old, and everyone is online,” [said Vint Cerf] “And the thing is not collapsing.”

Why is it not collapsing? Or perhaps more poignantly: why is a technology _designed 50 years ago_ not collapsing? Says Cerf:

> Resiliency and redundancy are very much a part of the Internet design.

So the resiliency of the internet’s original design architecture is helping it handle “unprecedented” surges of demand during these times. How much demand are we talking about?

> Comcast, the nation’s largest source of residential Internet, serving more than 26 million homes, reports peak traffic was up by nearly one third in March, with some areas reaching as high as 60 percent above normal. 

Isn’t that amazing? In the web community, the last decade has been about “scale, scale, scale” from the perspectives of both people developers and ops. How do you handle scale? Load balancers? Static sites on a CDN? Cloud computing that can scale dynamically and distribute peaks in traffic? There’s been numerous articles, talks, even conferences, dedicate to the question of: how do you scale your traffic? 

One of the classic examples that gets used to talk about handling surges in traffic is Amazon. “Just think about all the traffic that goes to `amazon.com`” they say. “It’s tons right? Now think about how much that increases on the biggest shopping day of the year?” We could point to lots of internet giants and think about how they’re handling scale for their domains.

Now step back for a second and think about this question: have you heard any discussion about peak traffic outside the context of a single company’s infrastructure? Everyone's always talking about how to handle traffic surges and scale _for a single domain_, like “how does Amazon handle all that traffic the day after Thanksgiving?” But has anyone asked: can _the internet_ handle all the traffic the day after Thanksgiving? It’s not just Amazon that’s getting a surge of network traffic. It’s the entire internet. The talking point of failure has always been at the domain level, i.e. will `amazon.com` go down? Can we keep our company’s domain `blah.com` from going down? But rarely is the conversation: will `amazon.com`, `google.com`, `twitter.com` and all the others go down? 

> So far Internet industry officials report they’ve managed the shifting loads and surges. To a substantial extent, the network has managed them automatically because its underlying protocols adapt to shifting conditions, working around trouble spots to find more efficient routes for data transmissions and managing glitches in a way that doesn’t break connections entirely.
>
> Some credit goes to Comcast, Google and the other giant, well-resourced corporations essential to the Internet’s operation today. But perhaps even more goes to the seminal engineers and scientists like Cerf, who for decades worked to create a particular kind of global network — open, efficient, resilient and highly interoperable so anyone could join and nobody needed to be in charge.

Isn’t that extraordinary? The availability of _the entire internet_ is something we all take for granted. Sure failures will happen at local points like `twitter.com` but never will the entire internet become unavailable. What kind of vision made this kind of infrastructure possible?

> The vision of the [internt’s founders] was comparatively anarchic, relying on technological insights and a lot of faith in collaboration. The result was a network — or really, a network of networks — with no chief executive, no police, no taxman and no laws.
> 
> In their place were technical protocols, arrived at through a process for developing expert consensus, that offered anyone access to the digital world from any properly configured device...
> 
> This Netheads’ idea of a globe-spanning network that no single company or government controlled goes a long way toward explaining why an Indonesian shopkeeper with a phone made in China can log on to an American social network to chat — face to face and almost instantaneously — with her friend in Nigeria. That capability still exists, even as much of the world has banned or restricted international travel.
> 
> ...the lack of a central authority is key to why the Internet works as well as it does, especially at times of unforeseen demands.

A de-centralized network is key! And how is that done?

> [the internet embraces] a model in which all communications were broken into chunks, called packets, that continuously shuttled back and forth over shared lines, without pauses.
>
> The computers at either end of these connections reassembled the packets into whatever they started as — emails, photos, articles or video — but the network itself didn’t know or care what it was carrying. It just moved the packets around and let the recipient devices figure out what to do.
>
> That simplicity, almost an intentional brainlessness at the Internet’s most fundamental level, is a key to its adaptability. 

I love that line, “intentional brainlessness”. It upends our propensity towards complexity for large-scale projects. I believe the DNA of resiliency built into the network manifests itself in the building blocks of what’s transmitted over the network. The next time somebody calls HTML or CSS dumb, think about that line again:

> That simplicity, almost an intentional brainlessness...is a key to its adaptability. 

It’s not a bug. It’s a feature.
