---
title: Reading Notes, October 2019
tags: readingNotes
---

## Article: [“Using the Platform”](https://timkadlec.com/remembers/2019-10-21-using-the-platform/) by Tim Kadlec

One of the most fascinating things about the web is its “don’t break current implementations” ethos, which stands in direct contrast to just about every other piece of software ever made:

> This permanence to the web has always been one of the web’s characteristics that astounds me the most. It’s why you can load up sites today on a Newton, and they’ll just work. That’s in such sharp contrast to, well, everything I can think of. Devices aren’t built like that. Products in general, digital or otherwise, are rarely built like that. Native platforms aren’t built like that. That commitment to not breaking what has been created is simply incredible.

Later:

> as some frameworks are, just now, considering how they scale and grow to different geographies with different constraints and languages, the web platform has been building with that in mind for years.  

Conclusion:

> Use the platform until you can’t, then augment what’s missing. And when you augment, do so with care because the responsibility of ensuring the security, accessibility, and performance that the platform tries to give you by default now falls entirely on you.


## Article: [“A Like Can’t Go Anywhere, But a Compliment Can Go a Long Way”](https://www.frankchimero.com/blog/2019/like-compliment/) by Frank Chimero

An interesting look at the effects of UI design. What do you think culture would look like if we reversed these UIs? Praise required words while negativity was easily accessible via a single interaction? Who knows. Could be different. But also humans are humans and it could be the same. 

First, a look at Facebook’s UI:

> one negative reply literally takes up more visual space than tens of thousands of undifferentiated likes.

Then Twitter’s:

> The arrangement is even worse on Twitter. Liking stays attached to the original tweet and makes most positive interactions static. Negative reactions must be written as tweets, creating more material for the machine. These negative tweets can spread through retweets and further replies. This means negativity grows in number and presence, because most positivity on the service is silent and immobilized. 

Positivity is “silent and immobilized’. What an fascinating assessment—and the result of this?

> like can’t go anywhere, but a compliment can go a long way. Passive positivity isn’t enough; active positivity is needed to counterbalance whatever sort of collective conversations and attention we point at social media. Otherwise, we are left with the skewed, inaccurate, and dangerous nature of what’s been built: an environment where most positivity is small, vague, and immobile, and negativity is large, precise, and spreadable.

## Article: [“Overly defensive programming”](https://blog.vcarl.com/overly-defensive-programming/)

I’ve kind of been following the development of [optional chaining](https://github.com/tc39/proposal-optional-chaining) in JavaScript. It’s now stage 3, which had me re-evaluating my own thoughts on the syntax. [@housecor](https://twitter.com/housecor/status/1088419498846244864?lang=en) has been a visible opponent of the syntax and I found this piece via a thread on his twitter. It has some good points specifically relevant to optional chaining, but even more broadly relevant to writing JS applications.

> Trust in your data, and your code will be more predictable and your failure cases more obvious. Data errors are simpler to debug if an error is thrown close to the source of the bad data.
> 
> Unnecessary safety means that functions will continue to silently pass bad data until it gets to a function that isn’t overly safe. This causes errors to manifest in a strange behavior somewhere in the middle of your application, which can be hard to track...Debugging it means tracking the error back to find where the bad data was introduced.

And later:

> Being overly cautious with external data means that the next person to consume it doesn’t know if it’s trustworthy, either. Without digging into the source to see how trustworthy the data is, the safest choice is to treat it as unsafe. Thus the behavior of this code forces other developers to treat it as an unknown, infecting all new code that’s written.

## Article: [“Words as Material”](http://nicolefenton.com/words-as-material/)

An absolutely wonderful piece on writing.

> Matt Jones: “[Writers] are the fastest designers in the world. They’re amazing at boiling down incredibly abstract concepts into tiny packets of cognition, or language.”
> ...
> writing is part of every design. If you can clearly define what you’re making and articulate its value, the steps to bring it out into the world will go much faster.

This resonates about 1,000% with my experience.

> Writing can be a tool for talking to ourselves when we’re still figuring things out. A sort of mirror or feedback system. A way to understand and articulate design.

> When I sit down to write, I don’t usually know what I’m going to say. It’s only through the act of writing that it becomes clear that I need to say anything at all.

Quoting David foster Wallace who is talking about ordinary people of their craft being able to explain their craft

> maybe being able to communicate with people outside one’s area of expertise should be taught, and talked about, and considered as a requirement for genuine expertise.


## Video: [“The State of Agile Software in 2018”](https://www.youtube.com/watch?v=G_y2pNj0zZg)

I originally discovered this via a link on [Dave Rupert’s blog](http://daverupert.com/2019/03/the-state-of-agile-software-in-2018/)—along with his relatable commentary:

> Whenever I read the original Agile Manifesto and it’s accompanying Twelve Principles, my soul leaps! But in practice inside enterprise Agile frameworks, my soul is often left crushed...In my experience, there seems to be a strongly held belief that if you obey certain rituals: have certain meetings, say certain words, pray certain prayers, commit to improbable deadlines; your product will enter the Promise Land. It’s hard for me to rectify what I know about software development with this religion. I have resigned myself to being an apostate.

However, I didn’t get around to listening to the source video until recently. It’s fantastic. The speaker is Martin Fowler, one of the original signers of the Agile Manifesto. The fact that he basically calls apostasy on what most of us likely participate in as the de-facto, day-to-day, shared implementation of agile, is striking. 

> with so many differences, how can we say there is one way that will work for everybody? We can’t. And yet what I’m hearing so much...is imposing methods upon people. That to me is a travesty.

> Even the agile advocates wouldn’t say that agile is necessarily the best thing to use everywhere. The point is: the team doing the work gets to decide how to do it. That is a fundamental agile principle, which means that if a team doesn’t want to work in an agile-way, then agile probably isn’t appropriate in that context. And that is the most agile-way of doing things.

I can’t help be nod my head in agreement with Dave’s summary: “Fowler’s perspective and patience with the Agile Industrial Complex gives me a foothold to keep from falling into hopelessness.”

## Article: [“Don’t Solve the Problem”](https://m.signalvnoise.com/dont-solve-the-problem/) via signalvnoise

> Your job as a leader isn’t to just help clarify thought process – but to give confidence in their thinking.
>
> As Wade says, “You’re trying to just help them get to that realization that, ‘You know what to do.’”

They have some good suggestions on 16 questions you can ask to propel those doing the problem-solving, instead of jumping in to solve the problem yourself:

1. What do you see as the underlying root cause of the problem?
2. What are the options, potential solutions, and courses of action you’re considering?
3. What are the advantages and disadvantages to each course of action?
4. How would you define success in this scenario?
5. How do you know you will have been successful?
6. What would the worst possible case outcome be?
7. What’s the most likely outcome?
8. Which part of the issue or scenario seems most uncertain, befuddling, and difficult to predict?
9. What have you already tried?
10. What is your initial inclination for the path you should take?
11. Is there another solution that isn’t immediately apparent?
12. What’s at stake here, in this decision?
13. Is there an easier way to do what you suggested?
14. What would happen if you didn’t do anything at all?
15. Is this an either/or choice, or is there something you’re missing?
16. Is there anything you might be explaining away too quickly?
