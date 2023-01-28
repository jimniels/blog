# Reading Notes, August 2022

## Article: [“Democrats Want to Outlaw Apple from Thinking Differently”](https://daringfireball.net/linked/2022/09/03/democrats-apple-charging)

Gruber quoting Louis Anslow:

> Creativity loves constraints, but it doesn’t love rules.

A good thing to remember when working on a design system. 

## Article: [“The World's Most Satisfying Checkbox”](https://www.andy.works/words/the-most-satisfying-checkbox)

> In Product Design, we sprinkle a touch of “delight” on key moments—colorful illustrations in our onboarding, confetti for major milestone reached. In reality, it’s the mundane, everyday interactions that need our attention most.

## Article: [“I Don’t Believe in Sprints”](https://robinrendle.com/notes/i-don%E2%80%99t-believe-in-sprints/)

> it’s easy to see how everyone else mistakes the bureaucracy around the work for the work itself.

I believe in a cadence for teams to share and demonstrate progress with each other, gather feedback, and progressively iterate. But today’s standard “sprint”? I’ll sign the “I don’t believe in sprints” creed.

> That’s what a backlog is; a list of useless tasks that makes people feel better. The next most important thing, the thing right around the corner, is all that matters…Discard everything else. Focus!

For better or worse, this is how I run a lot of my life. If it’s not important enough to rise to the level of my ability to remember it, it’s not important.  


## Article: [“Measure What You Impact, Not What You Influence”](https://csswizardry.com/2022/08/measure-what-you-impact-not-what-you-influence/)

> Site-speed is nondeterministic. I can reload the exact same page under the exact same network conditions over and over, and I can guarantee I will not get the exact same, say, DOMContentLoaded each time.

Show me a reproducible measurement that results in reproducible data and therefore reproducible conclusions and I’ll hold my tongue on “data”.

> Trying to proxy the impact of reducing our CSS from our LCP time leaves us open to a lot of variance and nondeterminism. When we refreshed, perhaps we hit an outlying, huge first-byte time? What if another file on the critical path had dropped out of cache and needed fetching from the network? What if we incurred a DNS lookup this time that we hadn’t the previous time? Working in this manner requires that all things remain equal, and that just isn’t something we can guarantee. We can take reasonable measures (always refresh from a cold cache; throttle to a constant network speed), but we can’t account for everything.
>
> This is why we need to measure what we impact, not what we influence.

Numbers aren’t often what they seem.

> Inadvertently capturing too much data—noise—can obscure our view of the progress we’re actually making, and even though we might end up at the desired outcome, it’s always better to be more forensic in assessing the impact of our work.

## Article: [“Be good-argument-driven, not data-driven”](http://twitchard.github.io/posts/2022-08-26-metrics-schmetrics.html)

> There’s nothing wrong with a fondness for data. The trouble begins when you begin to favor bad arguments that involve data over good arguments that don’t, or insist that metrics be introduced in realms where data can’t realistically be the foundation of a good argument.

My favorite topic: “data”.

> The data scientists in a software organization usually are deployed on a narrow, selected set of problems where statistics translates very directly to increased revenue, and there’s not enough of them around to really make sure that the “data-driven” decisions being made by everyday software teams are being done on a robust statistical basis. If your culture is that every project, every team should be metrics driven, you’d better be hiring a boatload of data scientists.

And then this dagger. I believe it. 

> The champions of data are always careful to list all the caveats of measurement, but the implicit assertion is that metrics are useful in the common case; it is the exceptional case where measurement is inappropriate. I claim that the exact opposite is true. The common case is that you can’t measure what you want to measure, you can only measure a proxy and in order to meaningfully interpret even that, you either need to run an experiment that you probably don’t have the resources to run, or do statistics that you probably don’t have the expertise to do.

It’s a tricky situation. There’s an entire industry whose marketing and education budgets are dedicated to convincing people of the value of data and how their tool will help you measure, get numbers, and prove certainty amongst your peers/boss.

> An overemphasis on data can harm your culture through two different channels. One is the suspension of disbelief. Metrics are important, says your organization, so you just proceed to introduce metrics in areas where they don’t belong and everybody just ignores the fact that they are meaningless. Two is the streetlight effect. Metrics are important, says the organization, so you encourage your engineers to focus disproportionately on improvements that are easy to measure through metrics - i.e. you focus too much on engagement, growth hacks, small, superficial changes that can be A/B tested, vs. sophisticated, more nuanced improvements whose impact is more meaningful but harder or impossible to measure.

Conclusion:

> A weak argument founded on poorly-interpreted data is not better than a well-reasoned argument founded on observation and theory.

## Article: [“Tossing a key”](https://world.hey.com/jason/tossing-a-key-87b91f17)

> You don't even think about it and it works out. You try, it doesn't. You try harder, it really doesn't.

In many ways, this feels like the story of my life. If I try, I fail. If I go in not caring, I find success.

> Trying too hard narrows the desirable outcomes.
> 
> Expectations are the enemy here — they limit the number of great landing spots, and make the idealized one impossibly hard. Relax your expectations, and hundreds of positive possibilities open up.

## Article: [“The Internet is for End Users”](https://datatracker.ietf.org/doc/html/rfc8890#section-4)

Got to reading this document from the Internet Architecture Board (IAB) and it’s a good one.

The intro is stellar:
   
> Many who participate in the IETF are most comfortable making what we believe to be purely technical decisions; our process favors technical merit through our well-known mantra of "rough consensus and running code."
>
> Nevertheless, the running code that results from our process (when things work well) inevitably has an impact beyond technical considerations, because the underlying decisions afford some uses while discouraging others.  While we believe we are making only technical decisions, in reality, we are defining (in some degree) what is possible on the Internet itself.
>
> This impact has become significant. As the Internet increasingly mediates essential functions in societies, it has unavoidably become profoundly political; it has helped people overthrow governments, revolutionize social orders, swing elections, control populations, collect data about individuals, and reveal secrets. It has created wealth for some individuals and companies while destroying that of others.
>
> All of this raises the question: For whom do we go through the pain of gathering rough consensus and writing running code?
   
That’s some great self-awareness there.

> Merely advancing the measurable success of [a thing] is not an adequate goal; doing so ignores how technology is so often used as a lever to assert power over users, rather than empower them.

Succinct.

> the Internet will succeed or fail based upon the actions of its end users, because they are the driving force behind its growth to date.  Not prioritizing them jeopardizes the network effect that the Internet relies upon to provide so much value.

A good argument for browser diversity, I think:

> User agents act as intermediaries between a service and the end user; rather than downloading an executable program from a service that has arbitrary access into the users' system, the user agent only allows limited access to display content and run code in a sandboxed environment.  End users are diverse and the ability of a few user agents to represent individual interests properly is imperfect, but this arrangement is an improvement over the alternative -- the need to trust a website completely with all information on your system to browse it.

Take away:

> We should pay particular attention to the kinds of architectures we create and whether they encourage or discourage an Internet that works for end users.

