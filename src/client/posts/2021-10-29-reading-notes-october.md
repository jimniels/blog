---
tags: readingNotes
---

# Reading Notes, October 2021

## Article: [“The CSS prefers-color-scheme user query and order of preference”](https://sarasoueidan.com/blog/prefers-color-scheme-browser-vs-os/)

When the app you’re using opens an in-app browser window and A) the app has dark mode turned on, but B) the OS has dark mode turned off, what does the browser show? More specifically, what is the result of `(prefers-color-scheme)` in that scenario?

I hadn’t thought of user agent preferences cascading like this. Fascinating.

## Article: [“We’re Optimizing Ourselves to Death”](https://zandercutt.com/2019/02/18/were-optimizing-ourselves-to-death/)

Our automated lives are founded on the idea of automation freeing us up to do more pleasurable things, but the truth is it usually just frees us from a particular chunk of work to spend more time doing another chunk of work, all in order to keep up with those who are automating their lives. It’s the automation version of keeping up with the Joneses. 

> Attempts by companies like Google or Freshly to create services that save you time misfire, as millennials see them not as services that will give them more time to relax, but as services that will increase the amount of time they’re available to work.

An interesting visual metaphor:

> The escalators I take to work are filled with the same desperate faces and vacant eyes I feel staring through me on the subway, except instead of standing still, they’re bounding up it, subconsciously aware that below their feet is yet another opportunity to optimize on an existing convenience. This, if anything, is a symptom of our current moment: People ignoring the luxury of a moving staircase in favor of whatever sprinting up it can transport them to faster.

This feels especially true:

> in the modern era, the best way to spend your time is finding better ways to spend your time.

We are what’s being optimized:

> Optimization begets optimization and says we’re its beneficiaries, and in many ways, we are. But given our reliable ignorance of what our lives have conditioned us to do with free time (read: optimize and work harder), we’re better characterized as optimization’s subjects, along for the ride as our pace of life accelerates endlessly.

The ending:

> The acceleration of our collective pace of life is not a result of stupidity or irrationality; rather, it is a symptom of what is perfectly predicted by the prisoner’s dilemma at a global scale: Hyper-rational individuals making hyper-rational decisions on how to spend their time by launching into an inescapable arms race of productivity. Burnout is inevitable.

## Video: [Maciej Ceglowski: Notes from an Emergency](https://www.youtube.com/watch?v=rSrLjb3k1II)

Why harboring with “feudal” internet companies (like Lord Google) for aspects of your digital life can be bad:

> This is a dilemma of the feudal internet. We go to these protectors because they can offer us more security, but their business model is to make us more vulnerable by getting us to surrender more of the details of our lives to their servers and to put more faith in the algorithms that they train, and then which train us in return to behave in certain ways.

As always, Maciej is funny:

> I'm not convinced that a civilization that is struggling to cure male pattern baldness is capable of [solving the problem of death]. If we're going to worry about existential risks, I propose we address the two existential risks that already exist and we know for a fact are real, which are global nuclear war and climate change.
> 
> But these real and difficult problems are messy. Tech culture prefers to pick more difficult, abstract problems that haven't been sullied by any sort of contact with reality. They worry about how to give Mars an Earth-like climate rather than how to give Earth and Earth-like climate. They debate how to make a morally-benevolent, God-like artificial intelligence rather than figuring out how to make ethical guardrails around the real artificial intelligence that they're already deploying across the world.

## Article: [“Why don’t video games take sex seriously?”](https://daverupert.com/2021/10/video-game-sex/)

> We’ve prioritized violence in games, in part, because it’s easy...a violent game is more socially acceptable than an intimate game. You can sell, market, and stream the violent game. Much tooling exists for creating violence faster. But making compelling intimacy…not so much.

This is a thought provoking article. Why is modern web design, despite the feeling of being overly complicated, the way it is?

Is it because that’s what we’ve optimized for? The brightest minds, the tooling, the conferences, the open source frameworks, the blog posts, it’s all in support of the mainstream—however complex. Trying to do anything outside of the mainstream is hard because you have little to no support. The companies, the publications, the people, many have all optimized their resources, tooling, and attention for the mainstream conventions. 

## Article: [“Weighing up UX”](https://adactio.com/journal/18186)

> metrics are very useful for measuring design’s benefit to the business, they’re not really cut out for measuring user experience.

> what’s good for user experience is good for business. But it’s a short step from making that equivalency to flipping the equation: what’s good for the business must, by definition, be good user experience. That’s where things get dicey.

> there’s a danger to focusing purely on user experience. That focus can be used as a way of avoiding responsibility for the larger business goals. 

## Article: [“What do I need to read to be a great at CSS?”](https://www.baldurbjarnason.com/2021/what-do-i-need-to-read-to-be-a-css-dev/)

I think this is good advice:

> A rule of thumb is that the importance of a blog in your feed reader is inversely proportional to their posting cadence. Prioritise the blogs that post only once a month or every couple of weeks over those that post every day or multiple times a day. You don’t want to miss a new Ahmad Shadeed post but there’s no harm in skipping the CSS-Tricks firehose for a few days. Building up a large library of sporadically updated blogs is much more useful and much easier to keep up with than trying to keep up with a handful of aggregation sites every day.

I used to subscribe to many web-related publications, never fully keeping up with their firehouse of a publishing schedule. But they did expose me to individual writers who I’ve harbored in my RSS feed for years.

## Article: [“Alphabets of Emergence”](https://subconscious.substack.com/p/provoking-emergence-with-alphabets)

> A complex system that works is invariably found to have evolved from a simple system that worked. A complex system designed from scratch never works and cannot be patched up to make it work. You have to start over with a working simple system. – John Gall (Systemantics: How Systems Really Work and How They Fail)

The author’s mathematical notation of how the foundational technologies of the web fit together struck me as interesting:

> - URLs + HTTP + HTML = web
> - URLs + HTTP + RSS = Podcasts
> - URLs + HTTP + JSON = REST APIs
> - URLs + P2P + HTML = Web3

## Article: [“Some simple advice for Apple and app developers: It’s not about you”](https://www.macworld.com/article/354581/agilebits-1password-electron-customers-developers-apps.html)

An interesting take on the drama around 1Password switching to Electron:

> Too often, when a company stumbles, it’s not because it made a fundamentally bad decision. It’s because it made a decision that benefited itself rather than its customers and lacked the perspective to understand that customers don’t applaud when you lower your costs or the quality of your product.

> If you try to sell your customers a product designed to make your business more successful without benefiting them, they won’t thank you for it.

Ditto for web stuff I imagine. Don’t hold your breath for folks to applaud your “ground-up” rewrite/refactor from an old framework to a new one that merely mimics existing functionality.