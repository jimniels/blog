#ai

# The AI Security Shakedown

Matthias Ott [shared a link](https://mastodon.social/@matthiasott/115854306864049265) to a post from Anthropic titled [“Disrupting the first reported AI-orchestrated cyber espionage campaign”](https://www.anthropic.com/news/disrupting-AI-espionage), which I read because [I’m interested](https://blog.jim-nielsen.com/2025/ai-browsers-frontier-security/) in the messy intersection of AI and security.

I gotta say: I don’t know if I’ve ever read anything quite like this article.

At first, the article felt like a responsible disclosure — “Hey, we’re reaching an inflection point where AI models are being used effectively for security exploits. Look at this one.”

But then I read further and found statements like this:

> [In the attack] Claude didn’t always work perfectly. It occasionally hallucinated […] This remains an obstacle to fully autonomous cyberattacks.

Wait, so is that a feature or a bug? Is it a good thing that your tool hallucinated and proved a stumbling block? Or is this bug you hope to fix?

The more I read, the more difficult it became to discern whether this security incident was a helpful warning or a feature sell.

> With the correct setup, threat actors can now use agentic AI systems for extended periods to do the work of entire teams of experienced hackers: analyzing target systems, producing exploit code, and scanning vast datasets of stolen information more efficiently than any human operator. Less experienced and resourced groups can now potentially perform large-scale attacks of this nature.

Shoot, this sounds like a product pitch! Don’t have the experience or resources to keep up with your competitors who are cyberattacking? We’ve got a tool for you!

Wait, so if you’re creating something that can cause so much havoc, why are you still making it? Oh good, they address this exact question:

> This raises an important question: if AI models can be misused for cyberattacks at this scale, why continue to develop and release them? The answer is that the very abilities that allow Claude to be used in these attacks also make it crucial for cyber defense. 

Ok, so the article _is_ a product pitch:

- We’ve reached a tipping point in security.
- Look at this recent case where our AI was exploited to do malicious things with little human intervention.
- No doubt this same thing will happen again.
- You better go get our AI to protect yourself.

But that’s my words. Here’s theirs:

> A fundamental change has occurred in cybersecurity. We advise security teams to experiment with applying AI for defense in areas like Security Operations Center automation, threat detection, vulnerability assessment, and incident response. We also advise developers to continue to invest in safeguards across their AI platforms, to prevent adversarial misuse. The techniques described above will doubtless be used by many more attackers—which makes industry threat sharing, improved detection methods, and stronger safety controls all the more critical.

It appears AI is simultaneously the problem _and_ the solution.

It’s a great business to be in, if you think about it. You sell a tool for security exploits and you sell the self-same tool for protection against said exploits. Everybody wins!

I can’t help but read this post and think of a mafia shakedown. You know, where the mafia implies threats to get people to pay  for their protection — a service they created the need for in the first place. ”Nice system you got there, would be a shame if anyone hacked into it using AI. Better get some AI to protect yourself.”

I find it funny that the URL slug for the article is:

`/disrupting-AI-espionage`

That’s a missed opportunity. They could’ve named it:

`/causing-and-disrupting-AI-espionage`