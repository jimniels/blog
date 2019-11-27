---
title: Reading Notes, November 2019
tags: readingNotes
---

## Article: [“From public intellectual to public influencer”](http://www.roughtype.com/?p=8645) by Nicholas Carr

Nicholas Carr with another great analysis. This time he points his lens at the “influencer”:

>  Marketing has displaced thinking as our primary culture-shaping activity, the source of what we perceive ourselves to be. The public square having moved from the metaphorical marketplace of ideas to the literal marketplace of goods, it’s only natural that we should look to a new kind of guru to guide us.

Then later:

> The idea that the self emerges from the construction of a set of values and beliefs has faded. What the public influencer understands more sharply than most is that the path of self-definition now winds through the aisles of a cultural supermarket. We shop for our identity as we shop for our toothpaste, choosing from a wide selection of readymade products. The influencer displays the wares and links us to the purchase, always with the understanding that returns and exchanges will be easy and free.

A great post. Read the entire thing.


## Article: [“Five Packages”](http://daverupert.com/2019/11/five-packages/) by Dave Rupert

> I find something poetic in the fact that the dependencies I rely on the most will eventually not be needed.

I’ve actually been thinking about this the past couple years. Dave put this feeling into words here.

So much of my web dev work for the last couple years, both via my employer and on personal projects, has been around trying to make conscientious decisions about what and why I include as a dependencies in a project. For personal projects, I’ve been trying to get to “dependency zero” (where reasonably possible) or close to it. When I do bring in deps, I try to architect my project and use the dependencies in such a way that whatever code I write and tool I compile with, one day I’ll be able to remove that dependency entirely from my project and not have to touch a single line of code other than in my `package.json`. I’ve been able to do that a few times and let me tell you: *that* is a nice feeling. 

## Article: [“The Popeye Moment”](https://redesign.frankchimero.com/2019/popeye/) by Frank Chimero

>  Most design content has become poor quality, surface-level content marketing that does more damage than good, because it offers over-simplified, misinformed perspectives dressed up as guidance. One hardly gets the sensation of lived experience and professional acumen in the words.

Love that articulation. Love all of Frank’s words. Looking forward to following this little project he’s started.


## Online eBook: [“Modest JS: Upgrading (the idea of) dependencies”](https://modestjs.works/book/part-1/upgrading-idea-of-dependencies/) 

This is a little excerpt from an online book about “modest JavaScript”. I liked this particular paragraph which brings into focus the more general meaning of the word “dependency” then circles back to its usage in the context software:

> The idea of dependencies in software writing goes back a while...But being dependent, that’s a concept with an even longer history. Including dependencies into your project feels like a win (all of this work you don’t have to do), but depending on other people’s work doesn’t feel so much like a win anymore. Being dependent: that doesn’t feel good at all.

## Article: [“Third party”](https://adactio.com/journal/16099) by Jeremy Keith

An interesting post as always from Jeremy, but this line:

> I know that it would make my life as a developer harder. But that’s of lesser importance. It would be better for the web.

## Podcast (Transcript): [“You Can Learn A Lot For The Low Price Of Your Ego - With Shawn Wang”](https://kentcdodds.com/chats-with-kent-podcast/seasons/01/episodes/you-can-learn-a-lot-for-the-low-price-of-your-ego-with-shawn-wang)

I like Shawn and the unique perspectives he brings about learning to the world of webdev. I haven’t listented to this entire podcast yet, but I liked this excerpt from the transcript:

> “You can learn so much on the internet for the low, low price of your ego.” If you keep your identity small, you can remain open to new ideas. If you make what you know a part of your identity, being receptive to new ideas and accepting that you were wrong becomes challenging.

## Article: [“The Department of Useless Images”](https://gerrymcgovern.com/the-department-of-useless-images/)

> The Web is smothering in useless images. These clichéd, stock images communicate absolutely nothing of value, interest or use. They are one of the worst forms of digital pollution because they take up space on the page, forcing more useful content out of sight. They also slow down the site’s ability to download quickly. In the last ten years, webpages have quadrupled or more in file size, and one of the primary reasons for this is useless image proliferation. If organizations are filling their websites with these useless, information-free images, are they also filling their websites with useless, information-free text? Are we still in a world of communicators and marketers whose primary function and objective is to say nothing of value and to say it as often as possible? And whatever you do, look pretty.

The struggle is real. 

Loved this imagined conversation:

> “We have this contact form and we need a useless image for it.”
> “How about a family cavorting in a field of spring flowers with butterflies dancing in the background?”
> “Perfect.”

## Article: [“How Life Became an Endless, Terrible Competition”](https://www.theatlantic.com/magazine/archive/2019/09/meritocracys-miserable-winners/594760/)

My wife shared this with me, commenting that I should think about this in the context of our young kids. With our 4 year old just about to reach the age where the social convention is you send them off to public school, we’ve been discussing topics like this.

> Elites first confront meritocratic pressures in early childhood. Parents—sometimes reluctantly, but feeling that they have no alternative—sign their children up for an education dominated not by experiments and play but by the accumulation of the training and skills, or human capital, needed to be admitted to an elite college and, eventually, to secure an elite job.

## Update: Nov 27, 2019

After writing this article and posting about it in the [metalsmith slack channel](https://metalsmith-slack.herokuapp.com/), I found this wonderful suggestion from [@AndrewGoodricke](https://twitter.com/AndrewGoodricke) (a.k.a. “Woody”):

> Don't use `metalsmith-watch`, it caused issues with various plugins. It is also good to separate the build process from watching (and triggering a re-build), the build shouldn't know anything except for what it is building...use `browser-sync` and `nodemon`. 

I had actually always wanted to do something like this, but I’d tried various combinations of file watchers and web servers available on npm and had never been able to get anything to work. But now I had a concerete suggestion of how to proceed forward.

So I followed Woody’s suggestions and things worked like a charm! Granted, it wasn’t technically a resolution to the problem I described above. `nodemon` is watching for changes and then reloading/rerunning metalsmith altogether, which means I don’t have a module cache problem because my `import` statements are “fresh” each time the app runs.

Technically, this solution is a bit slower. `metalsmith-watch` was insanely fast because it was only processing changes (vs. rerunning the entire metalsmith build). This was nice because, well, it was insanely fast. But it actually had some cognitive overhead into how you build and structure your metalsmith project. For example, any custom plugins have to take into consideration that they might be processing all expected files *or* just files that changed (which actually can get really tricky). So while the nodemon approach suggested here is a bit slower in terms of dev feedback loop, it’s a much cleaner separation of concerns, which helps you side-step thorny issues like “is this plugin processing things the first time around, or the 2nd, 3rd, 4th, etc?”

I’ve included a screenshot of Woody’s notes here, since you’d otherwise have to have a slack account to find them.

<img src="https://cdn.jim-nielsen.com/blog/2019/node-rabbit-hole-nodemon-suggestion.png" alt="Screenshot of documentation on how to ditch metalsmith-watch and use nodemon + browsersync instead." width="1136" height="1419">



