---
tags: readingNotes
---

# Reading Notes, January 2021

## Article: [“How I changed in 2020.”](https://www.carolynzhang.com/2020/personal)

> I’m doing good work. Or am I? “Good” is whatever wins votes. Am I focusing on the wrong things? Does design even matter? What would other designers think if they saw my work? They’d probably laugh at it. None of this looks like the design industry’s idea of “good” design. Would they even think of this as “design” at all? Mostly I help make decisions about product behavior, but it’s all so invisible. How could anyone evaluate it? How am I supposed to measure my own self-worth with it?

Carolyn’s writing is incredibly refreshing: 

> But if the work of this year has taught me anything, it’s that getting something, anything out the door in time can make all the difference. Progress over perfection. One foot in front of the other. So here I am, telling an incomplete, imperfect, unsatisfying story, and sharing it with the world before it’s capital-R Ready.

## Article: [“Should The Web Expose Hardware Capabilities?”](https://www.smashingmagazine.com/2021/01/web-expose-hardware-capabilities/)

An illuminating look at the security concerns of allowing third-party browsers in iOS. I always thought Apple's rule—“Apps that browse the web must use the appropriate WebKit framework and WebKit JavaScript.”—wasn’t so great. But there is an interesting security angle on this I’d never considered:

> If an app could receive device access permissions, and then included its own framework that could execute code from any web site out there, [the requirement for “what’s changed” notes] in the app store review guidelines would become meaningless. Unlike apps, web sites don’t have to describe their features and product changes with every revision.
> 
> This becomes an even bigger problem when browsers ship experimental features...which are not yet considered a standard...By allowing apps to ship any web framework, the app store would essentially allow the “app” to run any unaudited code, or change the product completely, circumventing the store’s review process.
> 
> ...when considering the current state of web standards, and how the dimension of trust and sandboxing around things like Bluetooth and USB is far from being solved, I don’t see how allowing apps to freely execute content from the web would be beneficial for users.

So interesting. There’s more:

> Without drawing a line of “what’s a browser”, which is what the Apple app store essentially does, every app could ship its own web engine, lure the user to browse to any website using its in-app browser, and add whatever tracking code it wants...I agree that perhaps the line in the sand of “Only WebKit” is too harsh. What would be an alternative definition of a browser that wouldn’t create a backdoor for tracking user browsing?

The details in this piece helped me better understand the technical merits that Apple and Mozilla have on to their more defensive approach to building web browsers.

## Article: [“How I Build JavaScript Apps In 2021”](https://timdaub.github.io/2021/01/16/web-principles/)

Lots in here that resonates with my own [feelings](https://blog.jim-nielsen.com/2020/react-without-build-tools/) on [similar](https://blog.jim-nielsen.com/2020/cheating-entropy-with-native-web-tech/) topics:

>  I still remember the debates with colleagues about using babel a few years ago. Within the front end development world, transpiling had just become a thing, so we ended up babelifying our builds to use ES6. Our argument back then was that one day, we would be able to push our application's directory structure on a web server and since all browsers would then support the augmented ES6 features, our app would just work! Without a build process. WOW! That must have been around 2015. When I look at the source code of these old applications now, our technical visions didn't end up becoming reality.

Looking back, I do find it interesting how babel was thought of (at least in some regards) as a polyfill: use it to write the latest and greatest and then, one day, simply remove it. [Narrator voice] but transpiling is a dangerous drug.

> I also try to avoid transpiling. It's not because I don't like ESNext features, but more because I want to minimize the risk of getting stuck with the transpiler.

## Article: [“Against essential and accidental complexity”](https://danluu.com/essential-complexity/)

> Long before computers were invented, elders have been telling the next generation that they've done everything that there is to be done and that the next generation won't be able to achieve more. Even without knowing any specifics about programming, we can look at how well these kinds of arguments have held up historically and have decent confidence that the elders are not, in fact, correct this time.
>
> ...Brooks' 1986 claim that we've basically captured all the productivity gains high-level languages can provide isn't too different from an assembly language programmer saying the same thing in 1955, thinking that assembly is as good as any language can be and that his claims about other categories are similar. The main thing these claims demonstrate are a lack of imagination. 

A good reminder, I would venture, that even core web technologies will be pushed in the future. You don’t have to accept everything that comes down the road of innovation, but being able _and willing_ to keep an open imagination is what’s important.

## Article: [“Understanding the True Cost of Client-Side A/B Testing”](https://timkadlec.com/remembers/2021-01-12-cost-of-client-side-ab-testing/)

> The full cost has to factor in both the price we’re paying for the service, as well as the impact it has on the business.

While specifically talking about A/B testing, this is a good reminder that nothing is free. Saying yes to one thing means saying no to many others. Cost is never solely composed of what does it cost for the thing I say yes to, but also what is the cost of saying no to all the other things?

## Article: [“Art Direction for Static Sites”](http://daverupert.com/2021/01/art-direction-for-static-sites/)

A neat behind the scenes look at how Dave does his own art directed blog posts. Personally, I think he strikes a great balance between customizability and maintainability, with an elegant yet simple approach to how much he can tune each individual page. 

Dave’s piece really makes me want to do art direction. However, I’ve done it in the past and I always felt like the custom styling got in the way of writing and publishing. And right now, I want to write—a lot.

That said, if I ever do venture the path of art direction anew, I might try one-off posts. Like this:

> If you want to go all out and create the weirdest page on the Internet, you don’t have to hijack the system. You can eject from your layout entirely by choosing not to specify a layout. That alone gets you most of the way there! A page can be a hand coded page that atrophies at its own pace away from the parent styles is a great way to limit your technical debt.

That speaks to me. Once I publish, I never have to touch it again unless I want to, not because my site changes (which, let’s be honest, it inevitably will, about a million more times).

## Article: [“The Prestige Trap”](https://wesdesilvestro.com/the-prestige-trap)

The insights here resonated with me and the way I viewed my own decision making coming out of college—and I didn’t go to an Ivy League school, but a state college. 

> For the majority of Ivy Leaguers, the most impressive thing they've accomplished is achieving admission to their university. When you're deemed successful because you went to Harvard rather than celebrated for what got you there in the first place, you learn to game the system and just focus on the credentials the next time around. 

And later:

> Sometimes, achieving excellence even runs orthogonal to the certainty of prestige. For example, I saw within my own studies that getting an 'A' in a class was very different than actually learning the material. With an intense course load and impending deadlines, many students find it easier to take shortcuts to get the 'A' rather than to really grapple with the material which could take time away from learning how to game the test. The same problem happens within the workforce, except instead of getting an 'A' in a class, it's optimizing to get promoted during your annual review.

And yet later:

> But what worries me most about the prestige trap are its effects on an individual level. While recruits may confuse a Stanford CS degree for evidence of world-class programming skills, the candidate won't. We know when we're optimizing for credentials vs. pursuing excellence for its own sake. There is something deeply fulfilling about the latter and rather unsatisfying about the former.

Lots of introspective insights here worth pondering.