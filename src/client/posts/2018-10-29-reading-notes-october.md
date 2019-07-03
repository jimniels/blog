---
title: Reading Notes, October 2018
date: 2018-10-29
tags: readingNotes
---

## Article: [Design Principles – React](https://reactjs.org/docs/design-principles.html)

I’d never read this before. It‘s a document from the React team stating, essentially, the philosophical underpinnings of why the build software they way they do.

One of the things I found interesting was their perspective on `setState()` and why it’s asynchronous. After all the things that’ve been said about `setState()` their articulation about how they think about it is probably the most helpful I’ve heard and what we should teach to beginners: that it’s not so much about “setting state” as it is “scheduling an update”. of what `setState()` a

> There is an internal joke in the team that React should have been called “Schedule” because React does not want to be fully “reactive”.

One of the real powers I think behind React is the ability you have as a developer to trace as state of the UI to the data that produced it. This explicit design goal really does “turn debugging from guesswork into a boring but finite procedure”: 

> If you see something wrong on the screen, you can open React DevTools, find the component responsible for rendering, and then see if the props and state are correct. If they are, you know that the problem is in the component’s render() function, or some function that is called by render(). The problem is isolated.
>
> If the state is wrong, you know that the problem is caused by one of the setState() calls in this file. This, too, is relatively simple to locate and fix because usually there are only a few setState() calls in a single file.
>
> If the props are wrong, you can traverse the tree up in the inspector, looking for the component that first “poisoned the well” by passing bad props down.
>
> This ability to trace any UI to the data that produced it in the form of current props and state is very important to React. It is an explicit design goal that state is not “trapped” in closures and combinators, and is available to React directly.
>
> While the UI is dynamic, we believe that synchronous render() functions of props and state turn debugging from guesswork into a boring but finite procedure.

I also liked the section where they talked about their own internal style of developing the React codebase and how practicality generally trumps elegance:

> Verbose code that is easy to move around, change and remove is preferred to elegant code that is prematurely abstracted and hard to change.

## Article: [“Preparing a conference talk”](https://adactio.com/journal/14363) via adactio

An thoughtful writeup behind how Jeremy prepares for his conference talks. I like this part about how even a plain text file, which seems open-ended, still enforces a certain kind of linear constraint, whereas a blank sheet of paper and a pencil is truly more open-ended:

> I used to do this mind-mapping step by opening a text file and dumping my thoughts into it. I told myself that they were in no particular order, but because a text file reads left to right and top to bottom, they are in an order, whether I intended it or not. By using a big sheet of paper, I can genuinely get things down in a disconnected way (and later, I can literally start drawing connections).

## Video: [“"Shaping our children's education in computing”](https://www.youtube.com/watch?v=y-xgWLYQc4g) by Simon Peyton Jones at Strange Loop 2018

About the first twenty minutes of this talk (before he gets into the Brittian-specific stuff) is absolutely fantastic.

> Education should prepare young people for jobs that do no yet exist, using technologies that have not yet been invented, to solve problem of which we are not yet aware.

His main point is that we (in computers) often put too much focus on technology and not enough on ideas. He showed this [really cool video about how you could illustrate sorting algorithms to kids without using any technology](https://www.youtube.com/watch?v=30WcPnvfiKE). His point is that we need more that encourages inquisitiveness and imagination.

He also makes good arguments about why we should teach “computer science” (again, ideas not technology) to kids. Technologies come and go, but the underlying ideas persist:

> Why do we teach biology to kids? Do we expect every kid to become a biologist? No. It’s about coming to understand the world you live in and how you can navigate it, how to take control of events in your life and not just be at their mercy.
> 
> Education shouldn’t be about teaching a skill and splitting someone out at the end who is armed with that skill. Rather we teach skills or reason and dedication and problem solving so that when they get spit out, they can navigate the successive waves of technology that will come at them over their careers. Knowing one won’t be enough.

## Article: [“Taking Pattern Libraries to the Next Level”](https://www.smashingmagazine.com/taking-pattern-libraries-next-level/) via Smashing Magazine

We love to talk about “Atomic Design” and “Pattern Libraries” but I found this to be an even more thoughtful look at why those things aren’t silver bullets and how you need an even more thoughtful, overarching design system.

> A strong design is informed by a view of the big picture, an understanding of the context, and strong art direction — even at the cost of consistency or time.

> Design doesn’t emerge by skinning or theming components; it needs a perspective and a point of view — it desperately needs creative guidance. However, I can’t help but notice that when we are building these lovely pattern libraries and design systems and style guides using fantastic tools such as Pattern Lab and living style guides, we tend to settle on a single shared view of how a pattern library should be built and how it should appear. Yet that view doesn’t necessarily result in a usable and long-lasting pattern library

## Article: [In Praise of Mediocrity](https://www.nytimes.com/2018/09/29/opinion/sunday/in-praise-of-mediocrity.html) via the NYTimes

The article as a whole felt lacking, but there were a few particular lines that caught my eye as relevant:

> We’re afraid of being bad at [hobbies]. Or rather, we are intimidated by the expectation...that we must actually be skilled at what we do in our free time. Our “hobbies,” if that’s even the word for them anymore, have become too serious, too demanding, too much an occasion to become anxious...If you’re a jogger, it is no longer enough to cruise around the block; you’re training for the next marathon. If you’re a painter, you are no longer passing a pleasant afternoon, just you, your watercolors and your water lilies; you are trying to land a gallery show or at least garner a respectable social media following. When your identity is linked to your hobby...you’d better be good at it, or else who are you?

Then later:

>  The demands of excellence are at war with what we call freedom. For to permit yourself to do only that which you are good at is to be trapped in a cage

This probably stuck out to me because of my post [“The Art of the Side Project”](http://jim-nielsen.com/blog/2017/the-art-of-the-side-project/) I wrote back at the beginning of 2017. Still seems relevant.

## Article: [“Netlify DX Q&A: Gatsby v2 with Jason Lengstorf”](https://www.netlify.com/blog/2018/09/24/netlify-dx-qa-gatsby-v2-with-jason-lengstorf/) via Netlify

Interview with Jason Lengstorf who is a developer advocate for Gatsby. I liked this bit which referrs to graphql but it’s how I feel about most technology I use. It’s my adoption cycle:

> Learn about GraphQL  
> Dismiss it as a fad  
> Keep hearing about it  
> Try it out  
> Hate it  
> Keep trying  
> Things click  
> Never willingly use anything but GraphQL ever again  

## Article: [“The Rise and Demise of RSS”](https://twobithistory.org/2018/09/16/the-rise-and-demise-of-rss.html)

An interesting look at what happened to RSS. What I found interesting was the author’s “moral of the story” about how hard building consensus is (whether it’s in open source software, or even just in a business):

> But the more mundane reason [why RSS failed] is that centralized silos are just easier to design than common standards. Consensus is difficult to achieve and it takes time, but without consensus spurned developers will go off and create competing standards. The lesson here may be that if we want to see a better, more open web, we have to get better at not screwing each other over.

## Tweet: [“@asymco on data”](https://twitter.com/asymco/status/1047366402590629889?s=21)

This just seems so true, probably because I subscribe to “[people can come up with statistics to prove anything](https://www.youtube.com/watch?v=7tzfl1wTemM)”:

> If you have enough data you can prove anything. Which is to say that with enough data everything is true, so nothing is. All great insights I’ve ever seen have come from n=1.

## Article: [“Aesthetics”](https://ia.net/topics/aesthetics) via Information Architects

Following on the heels the previous tweet, there’s this piece from the ever insightful folks over at ia.net. Here are a few of the pieces that stood out to me.

> Not the master designer but the user is the arbitrator of good design.

> The world was sucked into a medium that allowed measuring the performance of forty-one shades of blue. And thus the notion of good and bad design radically changed. Design used to be about sensitivity, beauty, and taste. Today, design is about what engages users and grows profits.

> The key performance indicator for design has changed from beauty to profit. Measuring design has transformed a handicraft into an engineering job. The user is king. The user decides what is good and what is bad design

> We are also beginning to realize eliminating what is not measurable may come at an unmeasurable cost.

> How much of what us human is truly measurable and verifiable?

> How do we measure friendship? By the number of replies per month? By the length of replies? With computer linguistics? How do we measure usefulness? Lots of page views? Few page views? Stickiness? Number of Subscriptions? How do we measure trust? By the number of likes? Retweets? Comments? How do we measure truth?

> However, out of experience, we know those good things are rare, that quality always comes at a price and that the price tag of quality grows exponentially.
>
> We also know that what is truly good is somehow beautiful, and what is truly beautiful is somehow good. It’s not a direct relationship, it’s a deeper connection.

My comment: Silicon Valley’s law: all software problems will be resolved with more software