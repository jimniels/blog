# Making a Website in 2026

Pete Millspaugh has [a great post over on the Val Town blog](https://blog.val.town/how-to-make-a-website-in-2026) where he documents his attempt at ~~making~~ generating the same website across a variety of AI tools.

I love the post. Here are a couple of thoughts that come to mind.

## The Space Is Ripe for Referral Fees

Pete decided to make a website for his conference talk, and he added a comments section to make it a less static / more dynamic demo.

This is interesting because LLMs are really good at [generating one-off HTML pages](https://blog.jim-nielsen.com/2026/use-llm-to-add-color-metadata/) you open at `file://`, but as soon as you start to introduce technological dependencies — like a database, or an analytics tool, or a service for sending email, or payment processing, etc. — the question becomes: How does the LLM choose which service to rely on?

It’s one thing to have the LLM choose React over Angular or Vue over Svelte. But how (and why) does it choose something like an auth provider? Does it build you a site with Auth0 or WorkOS or Clerk? How would a non-technical user even know how to weigh the trade-offs of making such a decision?

Pete said he was deliberately vague about these details, which is why I find his experience so intriguing. For example, here’s what he found after generating a site in Lovable:

> My Lovable app is fullstack React, I learn, clicking around to find the code. It seems a bit heavy for a single-page site what with dozens of files […] The comments database seems to be using Supabase, which required no intervention on my part to set up. There’s a whole lot more—analytics, e-commerce and AI integrations, etc.

I’d be really curious to know what that “a whole lot more” was. Which tools/services did it choose to depend on?

How many people creating these sites understand that, even for a website that’s mostly static content, they’re being given an output that ships a JavaScript application framework, router, hydration runtime, analytics, component bundles, etc.? You asked for a sailboat, but you got [an aircraft carrier](https://blog.jim-nielsen.com/2023/offline-is-online-with-extreme-latency/#:~:text=because%20the%20tech%20behemoths%20are%20building%20aircraft%20carriers%2C%20the%20rest%20of%20us%20are%20all%20modeling%20everything%20we%20build%20as%20an%20aircraft%20carrier%20too.). Do you know? Or more importantly, do you _care_?

But it’s more than just a choice of languages and frameworks. It’s also a choice of third-party services. Why Supabase? Why not Firebase? Or Neon? Speaking of Neon, here’s Pete’s experience with Vercel’s v0:

> I copy-paste my prompt into the chatbox. After 11 seconds, v0 asks if I’d like to install Neon, because my comment wall needs a real database. Sure, why not. (Does that mean I need a separate Neon account? Vercel creates one for me, and later I’ll find a welcome email from Neon in my inbox.)

Frankly, this all feels like a space absolutely ripe for those kinds of business referral transactions you find in other industries.

Take real estate, for example. For lots of folks, when you buy a home you need an agent. (Not _that_ kind of agent; a real estate agent.) Your real estate agent is there to help you answer all those common questions that come along with buying a home:

- You: “How do I finance this?” Agent: “I know a mortgage company…”
- You: “How do I know the house is in good shape?” Agent: “I know an inspection company…”
- You: “We found X during the inspection, who can address it?” Agent: “I know a company that does {roofing | electrical | plumbing | etc.}…”
- You: “How do I close on this deal?” Agent: “I know a title company…”

While you’re free to make all these decisions yourself, your agent is also there to help you pick. Presumably they’ll choose a company that reflects well on them, but there’s also undoubtedly good money to be made in referrals. After all, who else is dealing with people with these kinds of needs all day long?

The “make a website with AI” space has a parallel here which makes you wonder about the incentives behind the LLM’s decision-making. Why Supabase over Firebase? Because the LLM reasoned about it? Because, statistically speaking, it was the next most probable word? Because Supabase paid Lovable (and hopefully disclosed such preferential integrations)? If LLMs are already unpredictable and non-deterministic, nothing will make their actions more predictable and deterministic than some financial incentives.

Who is the customer here? The person generating the website? Or the company willing to pay for its services to be embedded in generated code? (That’s a lucrative business waiting to happen…)

## Get Ya Some Imperial Credits

As a customer, the credit systems behind these LLM systems are annoying as hell. Here’s Pete:

> I’m using up “credits” as the machine works—0.70 so far, now 2.30, now 3.10, oh boy—and I have no clue what that means. There are no units. I’d prefer dollars. Are credits just dollars? As it turns out, no.

With another tool:

> I do two more rounds of click “Continue generation” and wait until my website is ready: 5 minutes 36 seconds for 0.070 credits, and 1 minute 29 seconds for 0.024 credits.

It’s probably just me, but c’mon, who do these “credit” systems really benefit?

When my prompt is running, don’t show me usage like this:

Credits: 0.05 -> 0.0672 -> 0.0871

Just show me the cost:

Cost: $0.02 -> $0.21 -> $0.31

Don’t make me do the conversion of credits -> dollars on the fly. Computers are good at math.

[soap-box]

I know it might hurt your bottom line if I’m not thinking about how much ~~money~~ credits I’m spending, but c’mon, can we stop with the financial abstraction on top of financial abstraction?

I hate how so many hosting companies are doing this “credits” for compute primitives thing. It’s pitched as if spending credits is easier, because you can apply them across services, e.g. buy image transformations or serverless function compute, all with credits!

Yeah well guess what other financial abstraction I can apply to all those different services? Dollars and cents.

[/soap-box]

## Conclusion

Pete’s conclusion:

> I am both optimistic and pessimistic about this moment for making websites. I’m optimistic because end-user programming, the idea that everyone should be able to customize their own software, seems more possible than ever. I’m pessimistic because a slopsite, an AI-generated website with little to no human thinking involved, is often worse than no website at all.

That resonates — and feels generalizable. You fill in the blank:

**An AI-generated ___ with little to no human thinking involved, is often worse than no ___ at all.**

My conclusion?

~~Making~~ Generating a website may be easier than ever. Understanding what you’ve generated, who you now depend on, and why? Not so much.