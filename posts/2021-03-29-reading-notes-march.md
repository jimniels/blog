#readingNotes

# Reading Notes, March 2021

## Podcast: [Bill Gates on Armchair Expert](https://armchairexpert.simplecast.com/episodes/bill-gates-Ggfi_pUk)

Dax, admitting his disposition to being a control freak, asks Bill how hard it was for him to learn to delegate and if it was one of Bill’s biggest challenges at Microsoft. Bill answers with an interesting and retrospective look at how he had to change his mental model, going from writing code to organization and orchestrating people (at about ~40:40):

> Yeah, scaling [was] a huge challenge. At first I wrote all the code. Then I hired all the people that wrote the code and I looked at the code. Then, eventually, there was code that I didn’t look at and people that I didn’t hire. And the average quality per person is [went down], but the ability to have big impact is [went up]. And so that idea that a large company is imperfect in many ways [is true] and yet it’s the way to get out to the entire world and bring in all these mix of skills. Most people don't make that transition and there are times when you go “oh my god, I just want to write the code myself.” The famous thing I used to say is, “I could've come in and written that myself over the weekend.” Well, eventually I couldn’t.

## Article: [“What I think, not what I thought”](https://world.hey.com/jason/what-i-think-not-what-i-thought-99cae1d0)

> when you make it up as you go, you get to do what you think, not what you thought. All plans are rooted in the past — they're never what you think right now, they're what you thought back then. And at best, they're merely guesses about the future. I know a whole lot more about today, today, than I did three months ago. Why not take advantage of that reality? 

I really like this—but that might be a biased take because it’s how I live my personal life. No life roadmap. Just some “big picture directional ideas”. To be honest, I’ll probably use Jason’s rationale here for how justifying how I live my life.

## Video: [“The Humane Representation of Thought”](https://vimeo.com/115154289) by Bret Victor

> What he's worrying about is the engineering problem of: how do we build working, reliable systems out of this distributed, computational material. What I’m worrying about...is the humanist problem of: what should we build, why are we building it, what will we do with it, and what is it going to do to us?

It’s so easy to get caught up in the engineering minutiae—How will we do this? Is it even possible? Those humanist  questions Bret outlines are great questions to ask yourself before you build anything.

## Article: [“Diagnose with Data. Treat with Design.”](https://www.linkedin.com/pulse/diagnose-data-treat-design-julie-zhuo/)

> Design and data are not at odds with one another. One helps you understand phenomena and gives you a foundation on which to build your assumptions. The other is the joyful process of creation to solve problems based on those assumptions.

Can’t believe I’m linking to something on LinkedIn, but here we are. Julie’s observations resonate with me. She continues:

> If design intuition tells you that some experience is bad (because it's hard to use, it's confusing, etc.), TRUST the intuition...
> 
> If design intuition tells you that A works better than B at a large scale, be wary...
> 
> data helps you become a better designer. But data by itself does not lead to wonderful things. You still have to design them.

## Article: [“Preemptive Pluralization is (Probably) Not Evil”](https://www.swyx.io/preemptive-pluralization)

> Before you write any code — ask if you could ever possibly want multiple kinds of the thing you are coding...
>
> It is a LOT easier to scale code from a cardinality of 2 to 3 than it is to refactor from a cardinality of 1 to 2...

I’ve seen this so many times, especially in places where I thought there would never be more than one. I like that swyx has a name for it. 

Even at my current job, we’re working on a multi-year problem that shifts from a fundamental assumption of the platform that there’s only ever one of a thing, when now we’re realizing to keep pace with the market we need multiple. 

It’s worth noting: you never see the cases where you don’t have to convert to more than one, so you feel the pain when you have to convert but the joy when you don’t have to.

## Article: [“Progressive enhancement and accessibility redux”](http://www.quirksmode.org/blog/archives/2021/03/progressive_enh_3.html)

Josh Fremer being quoted on QuirksBlog on the topic of: "what's the difference between accessibility and progressive enhancement?"

> I think of [progressive enhancement and accessibility] as the same process, but with different foci. Accessibility aims to optimize an experience across a spectrum of user capabilities. Progressive enhancement aims to optimize an experience across a spectrum of user _agent_ capabilities...
> 
> What is the application of color to a website if not a progressive enhancement targeting user agents that can discern colors? Whether the "agent" in this case is the electronic device in the user's hands or the cells in their eyes is kind of moot. The principles of both PE and accessibility require us to consider the user who is unable to receive color information.

What an interesting idea: user agents being human beings or electronic devices, doesn't matter, it's all about starting with the most basic functionality and enhancing from there.

That’s an interesting concept to think about, especially in light of his Josh's final point:

> a fun little thought experiment is to imagine a sci fi future in which users can plug computers directly into their brains, or swap their personalities into different bodies with different capabilities. This further blurs the line between what we traditionally call a "user agent" and a user's innate disabilities. "This web site is best viewed in a body with 20/20 vision and quick reflexes."

## Video: [Nadia Eghbal’s Talk for the Long Now Foundation](https://www.pscp.tv/longnow/1gqxvovrnWWKB)

> We have this myth that software is zero marginal cost, ignoring the complex human interdependencies that are required to maintain it.

I found this talk incredibly insightful. I need to get [her book](https://www.amazon.com/dp/0578675862/). She’s put a lot of thinking and research into the aspects of software that people often ignore: namely, every aspect of software that’s not building it. We always talk about creating software but never maintaining it:

> “Write code and forget about it” simply isn't a realistic vision of what's required to make and move these systems. Software is brittle, unreliable, subject to breakage at all times, and an endless exercise in failing over and over again.

## Article: [“Phil Libin: Find a new way to ski”](https://tonsky.me/blog/phil-libin/)

An interview with the founder of Evernote:

> What’s wrong with Silicon Valley
>
> The business model being indirect revenue. It rewards keeping your users in a heightened, emotional state so that they hang around your platform for as many hours as possible, so they can click on ads.
> 
> The easiest emotional state to generate algorithmically is tribal outrage. It’s a simple and primal emotion. We, as the tech industry, have built a model that we make money when we piss people off. And everyone’s pissed off now, we’ve made a lot of money and people are like, what went wrong? Well, everything went exactly as planned.

Reductive, perhaps, but it resonates. 

## Article: [“Material Design text fields are badly designed”](https://adamsilver.io/blog/material-design-text-fields-are-badly-designed/)

> I’ve watched hundreds of people interact with forms and seen many of them struggle. But not once was that down to the use of a conventional text field.

It’s almost like we should choose boring ~~technology~~ UI.

## Article: [“Give me a definition for the word dashboard”](https://ericwbailey.design/writing/give-me-a-definition-for-the-word-dashboard/)

Eric Bailey, speaking on some research work he was doing designing a dashboard:

> That dashboard would have been a month or so of work for me, but it would have been the participant's everyday experience for the foreseeable future. That's a huge responsibility.

As a designer, this is a good reminder of your impact on humans, irregardless of scale.

## Article: [“An alternative to competition”](https://world.hey.com/jason/an-alternative-to-competition-ff57f4bc)

I’m just really enjoying Jason’s blogging now that he’s got [Hey World](https://world.hey.com/jason/hey-world-b02a6f2e):

> I don't think about competing. Competition is for sports, it's not for business.
>
> HEY is simply an alternative...
>
> And all we have to do is get enough customers to make our business work. That's it. That's how we stay alive. Not by taking marketshare away from anyone, not by siphoning off users, not by spending gobs of cash to convince people to switch. We simply have our own economics to worry about, and if we get that right, we're golden.
>
> When you think of yourself as an alternative, rather than a competitor, you sidestep the grief, the comparison, the need to constantly measure up. Your costs are yours. Your business operates within its own set of requirements. Your reality is yours alone.
