#readingNotes

# Reading Notes, December 2021

## Article: [“Sustaining Maintaining”](https://daverupert.com/2021/12/sustaining-maintaining/)

> There’s plenty of write-ups on GitHub about how to start a new open source project, or how to add tooling, but almost no information or best practices on how to maintain a project over years. I think there’s a big education gap and opportunity here. 

This is so true! True of web dev in general too. We’re bombarded with headlines that read “How to setup tool X” but almost zero headlines that read “How to setup, maintain, update, and continually re-evaluate tool X over time”.

## Article: [“Three Phases of Life for Design Systems”](https://daneden.me/blog/2021/three-phases-of-design-systems)

> You need to get comfortable with the notion that the design system is always eventually wrong. Listen to the needs of the teams you support, help them get to good results faster, and be prepared to be proven wrong.

This is why I find design systems so difficult. They’re always wrong. You’ve never nailed it. I suppose this is akin to all software, so it shouldn’t be surprising. But not being surprising doesn’t mean it’s less difficult to accept. It’s like product work: you’re constantly learning, refining, refactoring, releasing, etc.

> in the minds of your customers—and the teams within your organisation—the design system already exists. It’s whatever the product is made up of, regardless of whether there’s a team actually trying to make it more cohesive or consistent. Reflect this existing world, reducing redundancies and simplifying complexity, and you’ll have a design system in no time.

## Article: [“20 Things I’ve Learned in my 20 Years as a Software Engineer”](https://www.simplethread.com/20-things-ive-learned-in-my-20-years-as-a-software-engineer/)

Some good advice in here that resonated with my own experience. 

> If you really believe that software is subservient to the outcome, you’ll be ready to really find “the right tool for the job” which might not be software at all.

> There is no “right” architecture, you’ll never pay down all of your technical debt, you’ll never design the perfect interface, your tests will always be too slow. This isn’t an excuse to never make things better, but instead a way to give you perspective. Worry less about elegance and perfection; instead strive for continuous improvement and creating a livable system that your team enjoys working in and sustainably delivers value.

> People talk about innovation a whole lot, but what they are usually looking for is cheap wins and novelty. If you truly innovate, and change the way that people have to do things, expect mostly negative feedback.

## Article: [“A/A Testing: How I increased conversions 300% by doing absolutely nothing”](https://kadavy.net/blog/posts/aa-testing/)

I loved this piece.

> The belief seems to be that if they just keep testing, they will find the answer, and build the business of their dreams.
> 
> Most of them are wrong. Many of their businesses would be better off if they didn’t run any A/B tests at all.

The author ran an A/B test on identical emails and found “statistically significant” differences. An increase in opens by 10%! But wait:

> to a trained statistician, there is nothing remarkable about these “results.” Given the baseline conversion rate on opens, the sample size simply isn’t large enough to get a reliable result. What’s happening here is just the silly tricks our feeble human minds play on us when we try to measure things.

It’s very possible we are making wrong decisions based on false interpretations of information. Just look at these results from an A/A test:

> A 9% increase in opens!  
> A 20% increase in clicks!  
> A 51% lower unsubscribe rate!  
> Finally, an incredible 300% increase in clicks, all by simply doing absolutely nothing!  
> …to an experienced eye, it’s clear that none of these “tests” have a large enough sample size (when taking to account the baseline conversion rate) to be significant.

The fact is, in so many cases where data is tracked, interpreted, and used to drive decisions, statistics isn’t the core competency of those involved.

> To run a test that asks an important question, that uses a large enough sample size to come to a reliable conclusion, and that can do so amidst a minefield of different ways to be lead astray, takes a lot of resources.
> 
> You have to design the test, implement the technology, and come up with the various options. If you’re running a lean organization, there are few cases where this is worth the effort.

Running experiments and creating a vision are two different kinds of tasks. It’s possible you lessen your ability to make intuitive insights when you’re in the statistical weeds. Don’t  give up on your vision so easily based on “results”. 

> Our world needs…vision, and if [we’re] busy second-guessing and testing everything (and often making the incorrect decisions based upon these tests), that’s a sad thing

And the author quotes Eric Ries from _The Lean Startup_:

> Science came to stand for the victory of routine work over creative work, mechanization over humanity, and plans over agility.

## Article: [“136 facts every web dev should know before they burn out”](https://www.baldurbjarnason.com/2021/100-things-every-web-developer-should-know/)

Some good stuff in here. First “crumegeony” stuff:

> Everybody has small screens, and they all know how to scroll: only make UI widgets ‘sticky’ or ‘fixed’ if you have to. They know where your navigation bar is. You don’t have to push it in their face the whole time.

> web dev is a pop culture with no regard for history, dooming each successive generation to repeat the blunders of the old, in a cycle of garbage software, wrapped in ever-escalating useless animations, transitions, and framework rewrites.

Next: [naming things is important](https://blog.jim-nielsen.com/2014/innovation-talk-page/):

> Naming things is fantastic. Everything on the screen should have a name. It’s better for your work. It’s better for accessibility. It’s better for your design. Take a table view and name it ‘Inbox’, ‘Screener’, or ‘Paper Trail’, and they suddenly mean something. What you do with them has changed. A good name transforms design and action.

Last: I liked this metaphor for gardening.

> The term ‘project’ is a poor metaphor for the horticultural activity that is software development.  
> Some software is seasonal and has crops, but unless you want your business to end with the first harvest, you need to treat it like a living ecosystem.  
> Some software components are perennial and evergreen. Others are seasonal and need regular replanting. The project metaphor treats them both the same and increases the risk of code rot.


## Article: [“Write code that is easy to delete, not easy to extend.”](https://programmingisterrible.com/post/139222674273/how-to-write-disposable-code-in-large-systems)

It me:

> Becoming a professional software developer is accumulating a back-catalogue of regrets and mistakes. You learn nothing from success. It is not that you know what good code looks like, but the scars of bad code are fresh in your mind.

This little bit about working with components is great. It’s why we’ve gravitated to the component model on the web: not for the reuse of the components, but for the isolation of them. 

> Instead of breaking code into parts with common functionality, we break code apart by what it does not share with the rest. We isolate the most frustrating parts to write, maintain, or delete away from each other.
>
> We are not building modules around being able to re-use them, but being able to change them.

And later on the same idea:

> It is not so much you are building modules to re-use, but isolating components for change. Handling change is not just developing new features but getting rid of old ones too.

It’s not about writing good software, but writing software that can easily change over time. That is good software. As the author ends:

> Good code isn’t about getting it right the first time. Good code is just legacy code that doesn’t get in the way.

## Article: [“The Flight From Conversation”](https://www.nytimes.com/2012/04/22/opinion/sunday/the-flight-from-conversation.html)

This was written in 2012.

> we have sacrificed conversation for mere connection.

> We’ve become accustomed to a new way of being “alone together.” 

> Human relationships are rich; they’re messy and demanding. We have learned the habit of cleaning them up with technology. And the move from conversation to connection is part of this. But it’s a process in which we shortchange ourselves. Worse, it seems that over time we stop caring, we forget that there is a difference.

> We expect more from technology and less from one another

> We think constant connection will make us feel less lonely. The opposite is true. If we are unable to be alone, we are far more likely to be lonely.
