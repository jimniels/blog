---
tags: readingNotes
---

# Reading Notes, August 2018

## Video: [Steve Jobs responds to an Insult](https://www.youtube.com/watch?v=FF-tKLISfPE)

Jobs responding to a question/insult about a particular technology. I think his response is a good reminder that before any technology, you need vision and principles for what you’re doing. Those will guide you more than any technology. In fact, focusing too much on just what’s going on with the tech can often blind you to the potential of what you’re trying to do.

> As we have tried to come up with a strategy and a vision for Apple, it started with “what incredible benefits can we give the customer, where can we take the customer?” not starting with “let’s sit down with the engineers and figure out what awesome technology we have and how we are going to market that?” And I think that’s the right path to take.

## Article: [“Weft”](https://ethanmarcotte.com/wrote/weft/) by Ethan Marcotte

> I think we often focus on designing or building an element, without researching the other elements it should connect to—without understanding the system it lives in.

Later:

> the visual languages we formalize—they’re artifacts that ultimately live in a broader organizational context. (And in a context that’s even broader than that.) A successful design project understands that context before settling on a solution

## Article: [“UTC is enough for everyone...right?”](https://zachholman.com/talk/utc-is-enough-for-everyone-right) by Zach Holman

This is just a fantastic deep dive into working with dates and time in programming.

## Tweet: [Debugging techniques with customized console.log](https://twitter.com/brian_d_vaughn/status/1025045172818563072) via @brian_d_vaughn

![screenshot of customized console.log calls](https://pbs.twimg.com/media/DjnGCcjVsAEk4R9.jpg:large)

> One of the most powerful web debugging techniques I'm aware of is adding colors to console.log. Makes it possible to spot high level patterns in an otherwise noisy stream of data.

A cool technique I didn’t know existed. There’s also [a gist](https://gist.github.com/bvaughn/810d50d6ade25b784728873daabb905e) on how to implement.

## Tweet: [How selective sampling works](https://twitter.com/CarlForrest/status/1026331321281470465) by 

A neat little .gif depicting the idea of downsampling in computer graphics but on a physical, real-world object.

<video controls src="https://video.twimg.com/ext_tw_video/1026331290394476545/pu/pl/FHBitGyZ8SPirV8K.m3u8"></video>

## Article: [Flexibility](https://adactio.com/journal/14250) by Jeremy Keith

Jeremy quoting from and commenting on the new book *Flexible Typesetting* from *A List Apart*. 

It appears the book nods to the materiality of creating things for the web. Specifically, typography on the web should honor and respect the nature of its medium, which tends towards design being a suggestion, not a mandate. Here’s a quote from the book:

> Of course typography is valuable. Typography may now be optional [on the web], but that doesn’t mean it’s worthless. Typographic choices contribute to a text’s meaning. But on the web, text itself (including its structural markup) matters most, and presentational instructions like typography take a back seat. Text loads first; typography comes later. Readers are free to ignore typographic suggestions, and often prefer to. Services like Instapaper, Pocket, and Safari’s Reader View are popular partly because readers like their text the way they like it

As the author states, “Readers [on the web] are typographers, too.”

## Article: [“The Bullshit Web”](https://pxlnv.com/blog/bullshit-web/)

First, the author gives us a preface from David Graeber detailing what he means by “bullshit”:

> Huge swathes of people...spend their entire working lives performing tasks they secretly believe do not really need to be performed. The moral and spiritual damage that comes from this situation is profound. It is a scar across our collective soul. Yet virtually no one talks about it...These are what I propose to call ‘bullshit jobs’.

Then gives [a good example](https://twitter.com/perlberg/status/1019968000458481664) of the kind of bullshit going on in the web: CNN claiming to have the highest number of “video starts” in their category. This is a stat that we all know doesn’t represent anything real but I’m sure goes over well in a marketing meeting:

> I don’t know exactly how many of those millions of video starts were stopped instantly by either the visitor frantically pressing every button in the player until it goes away or just closing the tab in desperation, but I suspect it’s approximately every single one of them.

Or what about those “please sign up for our newsletter” emails?

> [newsletter signup forms are everywhere.] Get a nominal coupon in exchange for being sent an email you won’t read every day until forever.

As a developer, you probably think “these things only exist because of marketers”. Then the author hits on a few things closer to home, which I think in certain cases are valid points:

> there are a bunch of elements that have become something of a standard with modern website design that, while not offensively intrusive, are often unnecessary. I appreciate great typography, but web fonts still load pretty slowly and cause the text to reflow midway through reading the first paragraph

The article is a good look at what the web is becoming and how some of the things we think are so great, if we step back for one second, we might realize aren’t so great after all.


## Article: [“Securing Web Sites Made Them Less Accessible”](https://meyerweb.com/eric/thoughts/2018/08/07/securing-sites-made-them-less-accessible/) by Eric Meyer

A reminder about how different internet access is around the world.

Eric was in rural Uganda teaching web development and trying to access the internet where his only option for connectivity was satellite internet:

> For geosynchronous-satellite internet access, the speed of light become a factor in ping times: just having the signals propagate through a mixture of vacuum and atmosphere chews up approximately half a second of travel time over roughly 89,000 miles (~152,000km)...
> That’s just the time for the signals to make two round trips to geosynchronous orbit and back. In reality, there are the times to route the packets on either end, and the re-transmission time at the satellite itself.
> But that’s not the real connection killer in most cases: packet loss is. After all, these packets are going to orbit and back. Lots of things along those long and lonely signal paths can cause the packets to get dropped. 50% packet loss is not uncommon; 80% is not unexpected.
> So, you’re losing half your packets (or more), and the packets that aren’t lost have latency times around two-thirds of a second (or more). Each.

The web and its foundational architecture of TCP/IP is actually pretty amazing when you stop and think about it in light of Eric’s story. But anyway, his point was that to combat the problems of satellite-only connectivity, people create caching servers but those become problematic when everything is HTTPS because HTTPS is meant to stop man-in-the-middle attacks and a caching server is essentially a man-in-the-middle. Eric’s point is that “Securing the web literally made it less accessible to many, many people around the world.” 

> I don’t really have a solution here. I think HTTPS is probably a net positive overall, and I don’t know what we could have done better. All I know is that I saw, first-hand, the negative externality that was pushed onto people far, far away from our data centers and our thoughts.

## Article: [“Exploring the potential of friction-free deployments”](https://www.netlify.com/blog/2018/08/02/exploring-the-potential-of-friction-free-deployments/)

I actually really love Netlify’s ethos about how deploys should be so mundane, routine, and predictable that you could deploy every minute if you wanted. So this project was a cool outworking of that vision:

> I decided to look at what could happen when continuous deployment is so mundane, so solved, so predictable, that I could deploy with confidence every day. Every hour. Every minute.

## Article: [“Five Key Benefits of ‘Going Serverless’”](https://www.netlify.com/blog/2018/08/06/five-key-benefits-of-going-serverless/)

What I love about JAM STACK

> Imagine wanting to setup a cron job to scrape stack overflow once a day for support questions about your open source project. It’s hard to justify paying 7 bucks a month for a server for something like this but in the serverless pay-per-execution landscape this would likely land under the free tier or a couple of cents a month.

I’ve been trying this on a few projects with Netlify and it works like a charm. Loving it.

## Article: [Bits](https://ethanmarcotte.com/wrote/bits/) by Ethan Marcotte

I totally agree with Ethan’s assessment here. People are always saying “the web is slow, here’s how to make it fast” and they solve the problem from a technology perspective. But the mainstream web isn’t primarily slow because of an ignorance in how to make it fast. It’s slow because at the core of the web’s essence (and this is something that I think just happened organically over time) people expect everything on it to be free. So money has to be made somewhere, and it gets made by the boatloads of tracking/analytics JavaScript and other bloated bandwidth that ends up on websites.

> ultimately, the web’s performance problem is a problem of profitability. If we’re going to talk about bloated pages, we should do so in context: in the context of a web where digital advertising revenue is cratering for publishers, but is positively flourishing for Facebook and Google. We should look at the underlying structural issues that incentivize a company to include heavy advertising scripts and pesky overlays, or examine the market challenges that force a publisher to adopt something like AMP.

Let’s stop kidding ourselves. This is the core issue. 

