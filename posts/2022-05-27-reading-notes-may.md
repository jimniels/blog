#readingNotes

# Reading Notes, May 2022

## Article: [“Apple App Store appears to be widely removing outdated apps”](https://www.theverge.com/2022/4/23/23038870/apple-app-store-widely-remove-outdated-apps-developers)

> We can watch really old movies today — movies that aren’t just years or decades old, but generations old. We can read works of literature that are centuries old. But we can’t play iPhone games that are three years old unless the developers constantly devote time and attention to making sure they keep up with latest SDKs every 2-3 years? Pixar doesn’t have re-render Toy Story every couple of years.

That’s the great thing about the web: if you own your content on your own website 1) you’re not subject to a giant corporation kicking you out (you’re only subject to your own forgetfulness or inability to rent your domain or pay your hosting bill) and 2) websites can have a much longer shelf life than something from a native OS SDK.

The first iPhone app isn’t available on a modern iPhone, but 
[the first website](http://info.cern.ch/hypertext/WWW/TheProject.html) is still accessible from a modern browser—even on an iPhone, 1st or latest generation. Think about that!

## Article: [“Getting comfortable with being uncomfortable”](https://alexanderell.is/posts/uncomfortable/)

> Have you felt that feeling? That moment of uncertainty, where you don’t know what the solution will look like. You’ve solved many other problems before this one (and so far they keep paying you), but now you have to reach into the creative ether again to come up with a way to solve this new one.

Yes. I’ve had that

> It can be uncomfortable… these moments of uncertainty, where everything is still an amorphous, blurry mist that has yet to come fully into focus.
> 
> Slowly, over time, the mist starts to clear up. Suddenly you can see how things are connected. After a chat with a coworker, a deep-dive into the code, or a walk around the block, something clicks, and some of the pieces start falling into place. The mist transforms into an outline, the outline into a conversation, the conversation into a diagram, the diagram into a few pull requests, the pull requests into follow up pull requests, and finally this vague problem has been translated from that amorphous blob into concrete lines of code.
> 
> This process is one of the most interesting parts of software development…I’ve gotten used to it and, dare I say, almost started to enjoy it. There’s still that moment of uncertainty, but I have my ways to get through it. I think it’s an important skill to build, this familiarity with the unknown and the uncertainty, and finding ways that are effective for you to get through it can be very empowering.

TBH, I still fear this sometimes. I’ve had moments of facing a big, 6 month design project where I think “will we actually be able to solve this? Will the business go under cause we don’t?” It always seems so big in the moment. But the journey of a thousand miles begins with one step. 

## Article: [“Make Beautifully Resilient Apps With Progressive Enhancement”](https://austingil.com/resilient-applications-progressive-enhancement/)

Progressive enhancement:

> provide at least a working experience to the most users possible, and jazz things up for users whose browsers and devices can support those enhancements…
> 
> To me, it’s easy enough to nod along, but in practice we fail all the time

This article does a deep dive on how to do (what I’ll call here) “vanilla” progressive enhancement.

Plug: what’s great about Remix is it gives you a lot of what’s in this article for free but with the modern ergonomics you’re used to in building apps. 

## Article: [“Platforms change but cool URIs don't.”](https://lethain.com/platforms-change-but-cool-uris-dont/)

> I’ve reluctantly come to believe that URIs and email are the durable interface and protocol that will live long past every given platform’s peak adoption...
> 
> If you plan to write across decades, you simply must own the interfaces to your content. You should absolutely delve into other platforms as they come and go–they often become extraordinary communities with great distribution–but they’ll never be a durable home.

Agree. This is why I have a hard time, as much as I want to, jumping on these modern email platforms that don’t support standard email protocols (something [I wrote about previously](https://blog.jim-nielsen.com/2022/exporting-and-parsing-emails/)).

## Article: [“Why This Computer Scientist Says All Cryptocurrency Should ‘Die in a Fire’”](https://www.currentaffairs.org/2022/05/why-this-computer-scientist-says-all-cryptocurrency-should-die-in-a-fire/)

No free lunch:

> What the miners are doing is literally wasting tons of electricity to prove that the record is intact, because anybody who would want to attack it has to waste that similar kind of electricity. 
>
> This creates a couple of real imbalances. Either they’re insecure or they’re inefficient, meaning that if you don’t waste a lot of energy, someone can rewrite history cheaply. If you don’t want people to rewrite history, you have to be wasting tons and tons of resources 24/7, 365

## Article: [“On Design Thinking”](https://medium.com/@fosta/on-design-thinking-8426ecf328b3)

> Design Thinking education willfully ignores these complexities, preferring to wrap Design into a digestible package, and in so doing establishing it as a simple, reproducible and processional endeavor. This approach dramatically simplifies the highly complex, nuanced, non-linear reality of Design to a grotesque degree.

Spicy! There’s more:

> Given the genesis of Design Thinking — emerging as it did from the bowels of international consulting firm IDEO — it’s perhaps no coincidence that these five tidy phases closely mirror the ‘phase billing’ techniques employed by Design consultancies. Each portion of a project proceeds conveniently along pre-agreed paths, with pre-agreed outcomes on pre-agreed schedules. Real Design work is complex, chaotic and messy, Design Thinking is linear, simplistic and procedural.

Maybe too good, too neat, to be true?

> The seamless stepping from one phase to the next, wrapping up neatly with a ‘thing to be made’ is disconcerting and reductive, and (as mentioned in my first critique) reflects a phase-billing attitude common in client services industries. Like ‘Agile’, or ‘Scrum’ or any other product development tool, Design Thinking offers some basic organizational logic to a process, but it implies a level of closure which isn’t present in reality. It’s a fallacy of rapidity, of repeatability, of clean outputs and finite solutions.

## Article: [“Net Promoter Score Considered Harmful (and What UX Professionals Can Do About It)”](https://articles.uie.com/net-promoter-score-considered-harmful-and-what-ux-professionals-can-do-about-it/)

Who doesn’t love a good, spicy take on something accepted as gospel by a wide swath of people?

I’m talking, of course, about Jared Spool’s take on the Net Promoter Score.

> People who believe in NPS believe in something that doesn’t actually do what they want. NPS scores are the equivalent of a daily horoscope. There’s no science here, just faith.
> 
> As UX professionals, we probably can’t convince believers that their astrology isn’t real. However, we can avoid the traps and use measures that will deliver more value to the organization.

You might be asking, “What the heck is Net Promotoer Score?” It was supposed to be a way to gauge customers’ feelings towards a business.

> In 2003, a marketing consultant named Fred Reichheld lit the business world on fire with the Harvard Business Review article “The One Number You Need To Grow”…He ended the article with “This number is the one number you need to grow. It’s that simple and that profound.”
>
> It turns out, it’s neither simple nor profound. 

(Like so many purported Next Big Things™️.)

Spool has so many hot jabs in here and I love it:

> [NPS has] all the common requirements of a “useful” business metric:
>
> - It’s easy to measure.
> - It produces a number you can track.
> - It feels legitimate.

While specifically about NPS, the article is a cautionary tale of leaning into any metric too much. A closer look at how the metric is calculated and you’ll see why someone might say, “Pay no attention to the metric man behind the curtain!”

The article is also a great look at measuring data and asking the right questions:

> The best research questions are about past behavior, not future behavior. Asking a study participant Will you try to live a healthy lifestyle? or Are you going to give up sugar? or Will you purchase this product? requires they predict their future behavior. We are more interested in what they’ve done than what they’ll do. We’re interested in actual behavior, not a prediction of behavior.

The sad reality of so many of our metrics is hidden behind the incentives!

> If your bonus is tied to an increase in the NPS ratings, offering a $100 incentive is a great way to raise your scores.

The lesson is: be wary of anything that purports to reduce something to a number.

## Article: [“The Surprising Truth About Pixels and Accessibility”](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/)

On using rems for media queries:

> Suppose a user sets their default text size to 32px, double the standard text size. This means that 50rem will now be equal to 1600px instead of 800px.
> 
> By sliding the breakpoint up like this, it means that the user will see the mobile layout until their window is at least 1600px wide. If they're on a laptop, it's very likely they'll see the mobile layout instead of the desktop layout.
> 
> At first, I thought this seemed like a bad thing. They're not actually a mobile user, so why would we show them the mobile layout??
> 
> I've come to realize, however, that we usually do want to use rems for media queries.

A great post from Josh—as always. 

> We're so used to thinking of media queries in terms of mobile/tablet/desktop, but I think it's more helpful to think in terms of available space.
> 
> A mobile user has less available space than a desktop user, and so we design layouts that are optimized for that amount of space. Similarly, when someone cranks up their default font size, they reduce the amount of available space, and so they should probably receive the same optimizations.

## Article: [“Accessibility from different perspectives”](https://hidde.blog/a11y-perspectives/)

A take that, in my limited experience, reflects most of the reality around accessibility.

> The system is, sadly, ableist and almost every website you look at has accessibility conformance and usability issues… it has often frustrated me and made me more cynical than I want to be. You write down the same issues over and over, knowing they are just a few lines of code. I always had to channel my inner developer again, and remember what it can be like. Yes, removing the line `outline: none` is trivial, and it's extremely ableist to keep it in, but what can a developer do if the QA and/or design departments flag it as a bug and they're the only one on the team who ‘gets’ this need. Let's not blame the developer, let's blame the ableist system we all operate in. 

## Podcast: [“The dimensions of product decision-making with Andy Budd”](https://the-optimal-path.simplecast.com/episodes/the-dimensions-of-product-decision-making-with-andy-budd/transcript)

> I want designers to be participants in the research as also every other executive. Again, if you have a standalone research team that is just going off independently doing research and presenting it back, the people who are consuming the research haven't really felt the pain points. It's very, very different to go to an interview or three or four interviews and see the same thing come up again and again, and that bringing some internal insight to the people, the product managers, the designers who are making that decision, than being completely arms length and reading a bunch of decks, which this item becomes just a bullet point item.

## Article: [“You should be reading academic computer science papers”](https://stackoverflow.blog/2022/04/07/you-should-be-reading-academic-computer-science-papers/)

> Zeeshan Lakhani, an engineering director at BlockFi, Darren Newton, an engineering team lead at Datadog, and David Ashby, a staff engineer at SageSure, all met while working at a company called Arc90. They found that none of them had formal training in computer science, but they all wanted to learn more. All three came from humanities and arts disciplines: Ashby has an English degree with a history minor, Newton went to art school twice, and Lakhani went to film school for undergrad before getting a master’s degree in music and audio engineering

I worked at Arc90 with these folks and this is what I loved about Arc90: the interdisciplinary education _outside of computer science and design_ was off the charts. People from all over the spectrum of education.