---
tags: readingNotes
---

# Reading Notes, June 2017

## Video: [Andrew Clark Keynote @ ReactEurope 2017](https://www.youtube.com/watch?v=QW5TE4vrklU)

An interesting overview on the state of React and where it’s headed, especially in regards to React Fiber and its “cooperative multitasking” feature. 

The speaker does a really good job explaining the current problem React has due to the single-threaded nature of Javascript, which essentially boils down to this: it doesn’t matter how efficient your code is if you end up scheduling a lot of it in an uninterrupted sequence. React Fiber attempts to solve this through a more asynchronous approach to component rendering.

It’s an interesting look at where we are with React and where we might go in the future. 

## Article: “[Some Lessons I Learned in 2013](https://www.frankchimero.com/archive/2014/2013-lessons/)” by Frank Chimero

This is a couple years old now, but I found Frank’s “lessons learned” insightful:

1. Life isn’t a story.
2. A lot of things don’t need to be intellectualized: “because I want to” is often a good enough reason.
3. Empathy is first an act of imagination.
4. Don’t take business advice from people with bad personal lives.
5. There are two ways to look at your life: what happened to you or what you did.
6. Resources don’t replace will.
7. Lazy trumps smart.
8. Everybody wants to give advice and no one wants to take it.
9. We only deserve what we can take care of.
10. Clearly labeling other people’s petty grievances as bullshit is a fast track to well-being and fewer complaints of your own.
11. Money is circulated. Time is spent.
12. You can punch back.
13. Social media gets less annoying if you’re willing to say to people, “Who the hell do you think you are?”
14. Pain is unavoidable. Suffering is optional.
15. Who you are has more to do with how you act and what you love than what you have or say.
16. It’s more complicated than that.
17. Everything good I have came from honesty, good intentions, and low expectations.
18. Stick with the attentive ones.
19. Find a way to forgive your mistakes.
20. You’ll never know enough. Oh well.

## Article: [Conversations with Technology Leaders: Erik Meijer](http://queue.acm.org/detail.cfm?id=3092954)

This is a Q&A article I stumbled on that has some good pieces of advice in it.

First, I liked this point on the absolutist terms we so often use in conversations: “oh, we have to use X because it’s declarative”. Declarative compared to what? These arguments should be more specific.

>  We cannot talk about everything in absolute terms. Compared to assembly code, C is declarative. But compared to transistors and gates, assembly code is declarative. Developers need to recognize these levels of abstractions.

I also liked the metaphor of computer tools being an extension of your mind:

> Good developers understand that they can't do everything, and they know how to leverage tools as prosthetics for their brains.

Some interesting advice on how to find your way between theory and practice (as alway the answer seems to lie somewhere in the middle):

> focus at the intersection of theory and practice. There is no progress without friction. It is easy to dive into theory, or all the way into just practice—but the real interesting work happens between theory and practice. Try to understand both sides. The safe spot is to retreat to one of the extremes.

Remember: there is no silver bullet. Your processes alone won’t save you:

> With prescriptive processes, people are looking for a silver bullet to solve problems, but it doesn't exist...The world is super-confusing, and you have to embrace it and work with it.

Lastly, I love this bit about finding questions before answers. I often have to remind myself of this before digging into any project: 

> first focus on finding the right questions, and then the answers.

## Article: [The art of throwing JavaScript errors](https://www.nczonline.net/blog/2009/03/03/the-art-of-throwing-javascript-errors/)

There were two good reminder pieces for me in this article:

> Errors are the friends of developers, not enemies.

And

> It helps to think of errors as built-in failure cases. It’s always easier to plan for a failure at a particular point in code than it is to anticipate failure everywhere.

## Article: [Design Better Data Tables](https://uxdesign.cc/design-better-data-tables-4ecc99d23356)

A page full of gifs depicting interaction paradigms for designing data tables. Kind of an interesting little summary.

![Gif of table header interaction](https://cdn-images-1.medium.com/max/800/1*kXEEaxvKP_9xRT0HuqScTQ.gif)
