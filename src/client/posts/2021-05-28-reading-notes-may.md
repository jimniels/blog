---
tags: readingNotes
---

# Reading Notes, May 2021

## Article: [“Emoji under the hood”](https://tonsky.me/blog/emoji/)

A fascinating and enlightening dive into how emoji works:

> To sum up, these are seven ways emoji can be encoded:
> 1. A single codepoint `🧛 U+1F9DB`
> 2. Single codepoint + variation selector-16 `☹︎ U+2639 + U+FE0F = ☹️`
> 3. Skin tone modifier `🤵 U+1F935 + U+1F3FD = 🤵🏽`
> 4. Zero-width joiner sequence `👨 + ZWJ + 🏭 = 👨‍🏭`
> 5. Flags `🇦 + 🇱 = 🇦🇱`
> 6. Tag sequences `🏴 + gbsct + U+E007F = 🏴󠁧󠁢󠁳󠁣󠁴󠁿`
> 7. Keycap sequences `* + U+FE0F + U+20E3 = *️⃣`

## Article: [“Next Gen CSS: @container”](https://css-tricks.com/next-gen-css-container/)

Great article by Una introducing container queries. I haven’t played with them yet, but have always wondered where the intersection is between media and container queries.

For example: why, and in what scenarios, would you use @media over @container? From Una:

> One of the best features of container queries is the ability to separate micro layouts from macro layouts. You can style individual elements with container queries, creating nuanced micro layouts, and style entire page layouts with media queries, the macro layout. This creates a new level of control that enables even more responsive interfaces.

This idea of micro/macro layouts turned on a light bulb in my head. And her breakdown and visual examples in this post are great.

I’ve seen this intersection of media and container queries [being called “the new responsive”](https://twitter.com/Mr_Jean/status/1395679182483562500?s=20).

## Article: [“The Future Web: Will Canvas Rendering Replace the DOM?”](https://medium.com/young-coder/the-future-web-will-canvas-rendering-replace-the-dom-847be872884c)

> Once upon a time the web was supposed to be system for sharing carefully structured information, full of sensible metadata and collaboration. Instead, we turned it into an semi-opaque app delivery model running in a browser sandbox.

And:

> we take it for granted that we can read the code we’re running, examine the markup we’re seeing, and review the CSS that styles it. But all these aspects of web development may be nothing more than a brief and transient anomaly in the history of software design.

Take for granted is right.

## Article: [“The Open-Source Software bubble that is and the blogging bubble that was”](https://www.baldurbjarnason.com/2021/the-oss-bubble-and-the-blogging-bubble/)

Lots of frank observations in this article.

First up, Google:

> FeedBurner and Google Reader were not victims of Google’s policies. They were the weapons Google used to ensure that the only player extracting value from blogging was Google.

Next, Microsoft:

> Microsoft is just carpet-bombing the web developer community with open source software and OSS infrastructure. Typescript, Visual Studio Code, GitHub, npm, and so much more exist primarily because Microsoft executives believe this will lead to more business for Azure and other Microsoft offerings

And now online educators:

> web dev education, training, and recruitment exist primarily to extract value from Facebook’s React or Google’s OSS projects. Very few of them invest in figuring out what sort of training will serve their students the best. The easiest thing to sell to both recruiters and students is the big framework on the block, so that’s what they sell and very little else

Then this introspective question near the end:

> Chrome and React are strategic levers for Google and Facebook. Electron, GitHub, Visual Studio Code, TypeScript, and npm are all potential strategic levers for Microsoft. V8, npm, React, Visual Studio Code, and Github: they are the foundation of modern web development.
>
> How confident are you that all of these projects will remain strategic for the life of the web? Losing any one of them would knock the entire software economy to the ground. Are we so sure that nothings going to change for these companies?

Oh, and this jab at technological diversity on the web:

> Diversification will mostly be a question of which flavour of V8 and what flavour of React-like front end framework you’re using. 

The conclusion:

> If we want software development to last, then we need to work on our attitudes towards open-source and reconsider our reliance on software that, at the moment, happens to be strategically relevant to big tech.

## Article: [“You are what you do, not what you say or write”](https://www.baldurbjarnason.com/2021/you-are-what-you-do/)

> The policies are openly hostile to the workforce. They amount to a declaration that the employees can’t be trusted to do their job without handholding.

It is ironic how Basecamp always preached _against_ micromanaging remote employees who you can’t see and control—as you might in a classic work environment—and to instead simply _trust_ people to be productive and effective.

But mostly I just really loved this line:

> We need to become better at distinguishing between those who speak from practice and those who are just performative social media influencers.

## Article: [“Why does every advert look the same? Blame Corporate Memphis”](https://www.wired.co.uk/article/corporate-memphis-design-tech)

A resonating critique of the “flat, geometric, figurative” illustration aesthetic named “Corporate Memphis” that has invaded much of the design world, depicting humans as “nondescript figures“ composed of solid colors:

> It’s an aesthetic that’s often referred to as ‘Corporate Memphis’, and it’s become the definitive style for big tech and small startups, relentlessly imitated and increasingly parodied. It involves the use of simple, well-bounded scenes of flat cartoon figures in action, often with a slight distortion in proportions (the most common of which being long, bendy arms) to signal that a company is fun and creative. Corporate Memphis is inoffensive and easy to pull off, and while its roots remain in tech marketing and user interface design, the trend has started to consume the visual world at large. It’s also drawing intense criticisms from those within the design world.

> Corporate Memphis has been particularly popular in the fintech and property sectors. For small companies looking to stand out, the quirky, digital-first style of Corporate Memphis is an easier solution than stock imagery. But it has contributed to a massive homogenisation and dulling down of the internet’s visual culture. Corporate Memphis “makes big tech companies look friendly, approachable, and concerned with human-level interaction and community – which is largely the opposite of what they really are,” says tech writer Claire L. Evans, who began collecting examples of the style on an are.na image board in 2018.

> Since he first recognised the style, Merrill says he’s identified two types of company that use it. Smaller companies engage in “pattern-matching” to look like established tech companies and court investment, says Merrill, while those at IPO-level use it because it’s “lazy and safe.”

## Article: [“trapped in the technologist factory”](https://ideolalia.com/essays/trapped-in-the-technologist-factory.html)

> We used HBase as our primary data store, because it was designed to scale, just like us. In the future, we would power a loosely federated Amazon, composed of independent online retailers, knit together by our software. If we built it, they would come.
> 
> But they didn’t. The only thing that kept us afloat was a bespoke product we had built for eBay, because our CEO knew an executive there. Later, after I left, that same executive moved to Staples and convinced them to acquire the startup outright. Nothing we had built was useful to Staples, it was just evidence of our ability to “innovate”. The resulting “skunk works” team has since been disbanded.

Hey look at that: business still very much works knowing people. Success, or rather the ability to bring in revenue, isn’t always about the ingenuity of the product but rather the personal connections of the owners. 

> I told myself...our business was data, not ads.
> 
> I was wrong, of course. The advertising side of the company was where all the growth was happening, and our product direction was whatever helped them close deals. 

And:

> Our product and pricing model both required unjustifiable levels of trust from our prospective customers, but none of us saw that as our problem to solve. We were downstream of the business model; our job was simply to wait and prepare for its eventual success.

And one last jab at the technologist mindset:

> we’re conflating novelty with technological advancement

## Article: [“Which type of novelty-seeking web developer are you?”](https://www.baldurbjarnason.com/2021/which-kind-of-web-developer-are-you/)

First, a good critique:

> This is the first kind of novelty-seeking web developer. The type that sees history only as a litany of mistakes and that new things must be good because they are new. Why would anybody make a new thing unless it was an improvement on the status quo? Ergo, it must be an improvement on the status quo.

But then this commentary on the architecture of the web stood out to me:

> By default, if you don’t go against the grain of the web, each HTTP endpoint is encapsulated from each other. From the requester’s perspective the logic of each endpoint could be served by an app or script that’s completely isolated from the others. Fetching from that endpoint gets you an HTML file whose state is encapsulated within itself, fetches its visual information from a CSS endpoint and interactivity from a JS resource. Navigating to a new endpoint resets state, styles, and interactivity.
> 
> Moreover, all of this can happen really fast if you aren’t going overboard with your CSS and JS.

It reminds me of the moment when I first learned about the details of authentication on the web. I was at a conference and the presenter said, referring to the underlying HTTP protocols, “the web is stateless”. Having just learned react, this was strange to me. But in listening more, I realized how wonderfully powerful this idea of statelessness can be. 

> The web’s built-in encapsulation would limit it to trivial toy-like projects if we didn’t have a way to build larger interconnected projects. But, instead of the complex shared state that defines most native apps and SPAs, the web represents state as resources that are connected to and transferred via links.

## Article: [“The Destructors, or, Yet Another Rant About That Basecamp Post”](https://jaredsinclair.com/2021/05/03/basecramp.html)

Work, work, work:

> Neoliberalism, the prevailing ideology of our times, continues to eat the world. Under neoliberalism, “the market” and an illusory “freedom of choice” are the organizing principles governing human bodies. Employment/employer have seized the scepter that was once held by religion/church. “What do you do?” is the de rigeur ice-breaker question of our times. Whether we like it or not, the tides of Western culture, at least in the US, have plunged us into a worldview (usually unspoken and unexamined) that makes work the center of one’s life. It’s not a surprise that most workplaces are flowing along with that tide. It is in the nature of tides that few can resist them. At a large enough company, you can practically live your entire life on the company campus: eat, exercise, shower, get child care, sleep, play, relax, do yoga, get medical attention. There was a time when this kind of lifestyle was viewed as dystopic. It’s a relatively recent invention (the last century or so) that we expect the average person not only to work, but to have a vocation. For most of the previous millenia, it was viewed as a kind of doom or failure to be employed by an employer (serfdom). Attitudes have shifted over the past century, coinciding with the loss of influence from historically powerful religious and secular institutions. That power vacuum was filled by work. Work as the center of one’s life. Work as an identity. Work as the only place that people gather with folks outside their immediate circle of family and friends.