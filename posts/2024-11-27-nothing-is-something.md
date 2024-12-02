# Nothing Is Something

There’s [a post on htmx.org](https://htmx.org/essays/why-gumroad-didnt-choose-htmx/) about why htmx wasn’t the right fit for a particular project (which is dope, we need more websites that admit their thing might not be the right thing all the time).

The bit on AI being unfamiliar with their tool choice piqued my interest:

> It’s worth noting that AI tools are intimately familiar with Next.js and not so much with htmx, due to the lack of open-source training data. This is similar to the issue Rails faces. While not a dealbreaker, it did impact our development speed and the ease of finding solutions to problems. When we encountered issues, the wealth of resources available for React/Next.js made troubleshooting much faster.

That’s an interesting phenomenon: [a big part of tool choice is popularity](https://blog.jim-nielsen.com/2019/yesterdays-questions-answered-in-todays-platform-apis/) because it shapes your experience finding support. The more popular the tool, the more probable your question has already been answered.

“How to get started with Next.js” likely has tons of search results — and therefore, one can assume, a large set of training data to inform the LLM’s answer.

But that same question for an obscure tool yields far fewer search results (if any) — and therefore, one can assume, a sparse set of training data to inform the LLM’s answer.

The point I’m getting to is this: the experience of asking a question on a niche topic or tool is different with an LLM than it is with a search engine.

With a search engine, fewer quality results _means_ something. But an LLM is going to spit back a response regardless of the quality of training data. When the data is thin, a search engine will give you nothing. An LLM will give you an inaccurate _something_.

For example, an LLM may have no idea how to generate code for a novel syntax on top of JavaScript, but because it _looks_ a lot like JavaScript and borrows a lot of the same idioms, it’ll go ahead and generate _something_ for you — accuracy be damned.

This seems like a case where nothing is better than something because _nothing means something_.

LLMs — at least in my experience — haven’t really cued in on this. They’ll try their darnedest to give you _something_ when _nothing_ would be more instructive. (What’s that famous quote? “Better to remain silent and be thought a fool than to speak out and remove all doubt.” LLMs didn’t get the memo on that one.)

Rather than saying “I don’t know, there’s not enough on this subject to formulate a working answer” — which is what you could infer from an empty search results page — an LLM will give you something that looks right. Then you have to go shoot yourself in the foot to learn it’s not right, because you didn’t know enough to know it was wrong.