---
title: Reading Notes - October 2017
date: 2017-10-28
tags: readingNotes
---

## Video: [Effective Programs - 10 Years of Clojure Keynote by Rich Hickey](https://youtu.be/2V1FtfBDsLU)

Generally enjoy these talks by Rich Hickey, even though a lot of the time he’s talking about programming concepts beyond my understanding. What I do enjoy is his ability to describe problems in mainstream programming and ask “Wait, why are we doing this? We’re making things so hard for ourselves!” 

Here’s just one quote I enjoyed from his talk:

> When you look at programming languages, you really should look at: what are they for? There’s no inherent goodness to programming languages. Only suitability constraints. 


## Article: [I’ve seen the future, it’s full of HTML.](https://medium.com/@mikeal/ive-seen-the-future-it-s-full-of-html-2577246f2210)

My feelings precisely:

> Web development used to be a lot simpler. If I wanted to test a library or hack together a quick demo, I could just `<script src=”some-library”>`.
>
> I could reload the page instead of re-compiling a bundle. I could load a static page instead of running a development server.
>
> Our default workflow has been complicated by the needs of large web applications. These applications are important but they aren’t representative of everything we do on the web, and as we complicate these workflows we also complicate educating and on-boarding new web developers.

Some of the web components in the examples are pretty cool. I hope this future really is as near as the author says.

**Edit**: I dove into web components a bit after seeing this article. They’re pretty cool and it feels good to be “using the platform” of the web. However, I still really love the declarative nature of React vs. the imperative nature of web components. Maybe I’ll write more about this in the future. (Who am I kidding? That post probably isn’t going to happen.)

## Article: [The coming software apocalypse](https://www.theatlantic.com/technology/archive/2017/09/saving-the-world-from-code/540393/) via theatlantic.com

Good article making the rounds in technology circles about how unreliable code can be.

> Human intuition is poor at estimating the true probability of supposedly ‘extremely rare’ combinations of events in systems operating at a scale of millions of requests per second. That human fallibility means that some of the more subtle, dangerous bugs turn out to be errors in design; the code faithfully implements the intended design, but the design fails to correctly handle a particular ‘rare’ scenario.

Stupid computers. Always doing precisely what you tell them to instead of catching the gist of your commands. Do what I mean, not what I say!

## Article: [Q/A with Dan Abramov](https://hashnode.com/post/what-have-you-learned-after-working-at-facebook-for-almost-two-years-have-you-grown-as-a-developer-and-what-are-some-of-the-key-takeaways-cj7q3gkjx019xkhwujchsrtho) via hashnode.com

Question for Dan: “What have you learned after working at Facebook for almost two years?” 

He gave a response with a number of bullet points, but this one stood out to me:

> **Think about code in time.** Don't stop at thinking about the code as it is now. Think about how it evolves. How a pattern you introduce to the codebase might get copy and pasted all over the place. How the code you're spending time prettying up will be deleted anyway. How the hack you added will slow down the team in the long run. How the hack you added will speed up the team in the short term. These are tradeoffs, not rules. We operate on tradeoffs all the time and we must always use our heads. Both clean and dirty code can help or prevent you from reaching your goals.

## Article: Nicholas Carr’s [These are not the robots we were promised](https://mobile.nytimes.com/2017/09/09/opinion/sunday/household-robots-alexa-homepod.html) via nytimes.com

One of my favorite critics of modern technology, Nicholas Carr, is at it again. This time questioning the culture behind AI-powered home robots like the Echo:

> Whether real or fictional, robots hold a mirror up to society. If Rosie and her kin embodied a 20th-century yearning for domestic order and familial bliss, smart speakers symbolize our own, more self-absorbed time.
> 
> It seems apt that as we come to live more of our lives virtually, through social networks and other simulations, our robots should take the form of disembodied avatars dedicated to keeping us comfortable in our media cocoons. Even as they spy on us, the devices offer sanctuary from the unruliness of reality, with all its frictions and strains. They place us in a virtual world meticulously arranged to suit our bents and biases, a world that understands us and shapes itself to our desires. Amazon’s decision to draw on classical mythology in naming its smart speaker was a masterstroke. Every Narcissus deserves an Echo.


## Tweet: [@seldo](https://twitter.com/seldo/status/900214967286345728)

> The older I get, the more every problem in tech seems to be a matter of getting humans to work together effectively, and not tech itself.

## Article: [Getting the world to do the work for you](https://www.farnamstreetblog.com/2016/02/joseph-tussman/)

The author begins with this quote:

> What the pupil must learn, if he learns anything at all, is that the world will do most of the work for you, provided you cooperate with it by identifying how it really works and aligning with those realities. If we do not let the world teach us, it teaches us a lesson. — Joseph Tussman

Then adds this comment:

> Leverage amplifies an input to provide a greater output. There are leverage points in all systems. To know the leverage point is to know where to apply your effort. Focusing on the leverage point will yield non-linear results. 

I stumbled on this article when I was reading “[The Difference Between Amateurs and Professionals](https://www.farnamstreetblog.com/2017/08/amateurs-professionals/)” which stated the following:

> Amateurs believe that the world should work the way they want it to. Professionals realize that they have to work with the world as they find it. 


## Article: [Why Composition is Harder with Classes](https://medium.com/javascript-scene/why-composition-is-harder-with-classes-c3e627dcd0aa)

> Most modern devices have RAM measured in gigabytes and any type of closure scope or property lookup is measured in hundreds of thousands or millions of ops/second, so performance differences are rarely measurable in the context of an application, let alone impactful.

Then later:

> In the context of applications, we should avoid premature optimization, and focus our efforts only where they’ll make a large impact. For most applications, that means our network calls & payloads, animations, asset caching strategies, etc…
> Don’t micro-optimize for performance unless you’ve noticed a performance problem, profiled your application code, and pinpointed a real bottleneck.
> **Instead, you should optimize code for maintenance and flexibility.**

## Article: [Seamfullness](https://adactio.com/journal/12604) from Jeremy Keith

Always interesting insights from Jeremy:

> I’ve written about seams before. I really feel there’s value—and empowerment—in exposing the points of connection in a system. When designers attempt to airbrush those seams away, I worry that they are moving from “Don’t make me think” to “Don’t allow me to think”.

> In many ways, aiming for seamlessness in design feels like the easy way out. It’s a surface-level approach that literally glosses over any deeper problems. I think it might be driven my an underlying assumption that seams are, by definition, ugly. Certainly there are plenty of daily experiences where the seams are noticeable and frustrating. But I don’t think it needs to be this way. The real design challenge is to make those seams beautiful.