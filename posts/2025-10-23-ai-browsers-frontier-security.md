# AI Browsers: Living on the Frontier of Security

OpenAI released their new [“browser”](https://notes.jim-nielsen.com/#2025-10-22T1238) and [Simon Willison has the deets on its security](https://simonwillison.net/2025/Oct/22/openai-ciso-on-atlas/), going point-by-point through the statement from OpenAI’s Chief Information Security Officer. His post is great if you want to dive on the details. Here’s my high-level takeaway:

Everything OpenAI _says_ they are doing to mitigate the security concerns of an LLM paired with a browser sounds reasonable in theory. However, as their CISO says, “prompt injection remains a frontier, unsolved security problem”. So unless you want to be part of what is essentially a global experiment on the frontier of security on the internet, you might want to wait before you consider any of their promises “meaningful mitigation”.

(Aside: Let’s put people on the “frontier” of security for their daily tasks, that seems totally fine right? Meanwhile, Tom MacWright has rationally argued that [putting an AI chatbot between users and the internet is an obvious disaster we’ll all recognize as such one day](https://macwright.com/2025/05/29/putting-an-untrusted-chat-layer-is-a-disaster).)

What really strikes me after reading Simon’s article is the intersection of these two topics which have garnered a lot of attention as of late:

1. npm supply chain attacks
2. AI browsers

This intersection seems _primed_ for exploitation, especially if you consider combining different techniques we’ve seen as of late like [weaponizing LLM agents](https://snyk.io/blog/weaponizing-ai-coding-agents-for-malware-in-the-nx-malicious-package/) and [shipping malicious code that only runs in end-users’ browsers](https://blog.jim-nielsen.com/2025/npm-risks/).

Imagine, for a second, something like the following:

You’re an attacker and you stick malicious instructions — not code, mind you, just plain-text English language prose — in your otherwise helpful lib and let people install it.

No malicious code is run on the installing computer.

Bundlers then combine third-party dependencies with first-party code in order to spit it out application code which gets shipped to end users.

At this point, there is still zero malicious code that has executed on anyone’s computer.

Then, end users w/AI browsers end up consuming these plain-text instructions that are part of your application bundle and boom, you’ve been exploited.

At no point was any “malicious code” written by a bad actor “executed” by the browser engine itself. Rather, it’s the bolted on AI agent running alongside the browser engine that ingests these instructions and does something it obviously shouldn’t.

In other words: it doesn’t have to be code to be an exploit. Plain-text human language is now a weaponizable exploit, which means the surface for attacks just got way bigger.

But probably don’t listen to me. I’m not a security expert. However, every day that voice in the back of my head to pivot to security gets louder and louder, as it’s seemingly [the only part of computer science that gets worse every year](https://notes.jim-nielsen.com/#2025-05-24T1337).