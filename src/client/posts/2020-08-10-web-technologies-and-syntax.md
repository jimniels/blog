---
tags: thoughts html css
---


# Web Technologies and Syntax 

I feel like [CUBE CSS](https://piccalil.li/blog/cube-css/) has already made the rounds on the internet, but I’m catching up via RSS so news moves slower relative to me. While the approach outlined in that post was interesting, one thing that stood out to me had nothing to do with the practical suggestions behind CUBE CSS. Rather, it was this paragraph that rattled around in my brain for a while.

> CSS is an incredibly complex programming language to learn because so much of the working knowledge is less of syntax and more how things work...

With all the hype around ES5, then ES6, now ES7-8-9 (whatever we’re up to now), there’s been a lot of focus on syntax and language features in JavaScript. That probably has something to do with why it has received so much attention, it’s like the cable news of web technologies: news 24/7. Meanwhile, CSS is over here like a weekend newspaper in print, trying to [muster up to CSS4](https://css-tricks.com/css4/) (essentially as a marketing ploy of sorts) which makes you feel like it’s really just trying to play keep-up with the JavaScript Joneses.

Let me give an example of what I’m trying to get at: one of the most common problems for anyone who has written JavaScript is this error:

`Uncaught TypeError: Cannot read property ___ of undefined`,

So how do you go about fixing this error? A modern answer might be, “just use [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)!” A little syntax and all your problems are solved.

What’s the CSS equivalent in terms of an incredibly pervasive problem? It’s got to be something to do with specificity, right?
Turns out, in CSS there’s a language feature to solve all your specificity problems too: “just use `!important`!” A little syntax and all your problems are solved.

But wait.

Anyone familiar with CSS knows that using `!important`  doesn’t always fix your problems. In fact, it might just cause you more problems. Ditto for optional chaining in JavaScript, it might cause you more problems than it fixes (we just don’t know it yet since it hasn’t been around long enough).

I’m not saying the optional chaining syntax was bad and should have never been introduced. However, I do think there’s something in the observation that optional chaining, while useful in certain circumstances, could too easily be used as a lazy catch-all for problems inherent to JavaScript. To quote the CUBE CSS article: it’s less about syntax and more about how things work. I quote from Corey House’s [tweet thread](https://twitter.com/housecor/status/1088419498846244864):

> Hot take: Optional chaining encourages writing brittle code. 
>
> Example (currently a stage 1 JS feature):
> const data = myObj?.firstProp?.secondProp?.actualData
>
> Instead, normalize object structures at the time of creation (in JS apps, that often means in API call response handler)

> Checking for property existence every time we need to use an object leads to needless noisy code, and confusion about data structures. Instead, when instantiating objects, make sure they have consistent properties. 
>
> Summary: Consistent object structures help avoid bugs

> For this reason...I believe [optional chaining] encourages writing redundant and needlessly defensive code. Centralized normalization is cleaner, easier to understand, and easier to maintain.

Note how optional chaining is kind of like the `!important` of CSS: its syntax ~solves~ helps get around one of the most pervasive problems inherent to the language but, if not used correctly, will lead to brittle code littered with its usage.

Syntax and language features won’t solve your problems—not in CSS, not in JS. Optional chaining doesn’t fix the problem of possibly undefined, deeply-nested values. It just quickly helps prevent the entire program from crashing to a halt. In fact, you could argue that people got along just fine without optional chaining for a long time. And sure, in some cases it’s probably very useful. However, like `!important`, it might just be a  two-edged sword. You’d be better off addressing the root of the problem—solidifying the data promises of your app or normalizing and flattening the data coming in—than you would by using some nice syntax. In this way, you’ve solved the problem of the uncaught error instead of just working around it.

Zooming out for a minute, this is probably why single file components / CSS-in-JS are so popular: they are a form of guaranteeing encapsulation in your styles. Specificity run amok is the CSS equivalent of JavaScript’s “cannot read property ____ of undefined”. A lot of CSS-in-JS solutions attempt to solve the specificity problem for you through syntax, but in a lot of cases you lose the cascade part of CSS along the way. Styles get applied locally and inline vs. leveraging the cascade. It’s really more like Styles-in-JS (S-in-JS). 

Which brings me back to the excerpt I quoted from the CUBE CSS article, which I would restate thus: web technologies (HTML, CSS, JS) are—despite their surface appearance—incredibly deep languages to learn _well_ because so much of the working knowledge is less about syntax and more about how things work.

Think about it: HTML seems “simple” on the surface. It’s “just” a markup language, some text wrapped in tags. But if you go deeper than that, if you examine the grain of HTML, how it _wants_ to be used, how it was designed to be used, you’ll see its proper usage is steeped in nuance and expertise. Entire books have been written on how to use HTML as the base grammar of the web, and to enhance from there. Same with CSS and JS.

So while that new blog post detailing the latest syntax or language additions appear to present a resolution to decades-long problems, the working knowledge of these languages are less about syntax and more about how things work.