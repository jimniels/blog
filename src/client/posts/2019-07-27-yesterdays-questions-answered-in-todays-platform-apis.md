---
title: On The Web, Yesterday’s Questions Are Answered in Today’s Platform APIs
---

I recently read an article titled [“Keep JavaScript Dumb”](http://www.hyperorg.com/blogger/2019/03/08/keep-javascript-dumb/) and I share a lot of  feelings about writing JavaScript in 2019 with its author.

>  I like Javascript for tawdry reasons: It’s straightforward, there’s a huge collection of libraries, any question I might ever have has already been asked and answered at StackOverflow, and I get to see the results immediately on screen…But…If you’re a hobbyist who enjoys programming for the logic of it, the new stuff in JS hides that logic on behalf of things I happen not to care about like elegance, consistency, and concision. Now, I know that I don’t have to use the new stuff. But in fact I do, because the community I rely on to answer my questions — basically StackOverflow — increasingly is answering with the new stuff.

Which makes him knowling conclude in error:

> I’m going to lose this argument. I already have lost it. I should lose it. My position is wrong. I know that. Nevertheless, I stand firmly on the wrong side of history as I declare in my lonely, quavering voice: Keep. JavaScript. Dumb.

What I find interestingly illustrated in this article is his point that he feels like he has to move on to “the new hot stuff” in JavaScript because the answers he seeks online to “how can I do *x* in JavaScript?” are increasingly not answered in jQuery, but the new stuff. 

I wonder if this will forever be a problem of the web? I encounter this issue all the time. For example, a question about traversing the DOM in a specific way is always answered first and foremost by a jQuery solution. That’s slowly changing (sidenote: I’m sure that’s why the word “vanilla” was invented, to help with search queries). But in 10 years, I bet a lot of our questions about building for the web (how can I encapsulate styles with my code?) will have answers tied to the popular libraries of the decade (here’s a CSS-in-JS library).

It seems platform answers will always lag behind library answers. How could it be any other way? That’s the route we’ve chosen to go on the web. That’s why XHTML died. We decided it’s better to discover new platform APIs in userland and port them back into the platform. A byproduct of that choice seems to be that we’ll always be fighting the problem described above. Which means the following:

Today’s questions are answered in today’s library APIs. Yesterday’s questions are answered in yesterday’s library APIs—and unfortunately today’s platform APIs. 
