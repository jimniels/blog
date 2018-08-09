---
title: My Little Cabin in the Woods of Logo Integrity
date: 2018-08-09
tags: stories
---

Back in December (of 2017) I received [a tweet from @ycparak](https://twitter.com/ycparak/status/940646088389939201) out of the blue:

> @jimniels Found Logo Integrity, it's really quite cool, well done. Posted it to Designer News and it's trending.

My immediate reaction was: “oh, that old thing?” My [logo integrity project](http://jim-nielsen.com/logo-integrity/) was [something I had built back in 2014](http://jim-nielsen.com/blog/2014/logo-integrity/). A few people tweeted about it back then (and by a few, I mean like [two](https://twitter.com/gooeyblob/status/507615539586273280) [people](https://twitter.com/LeBinoclard/status/507553432488529920)) and then it faded into obscurity. I was ok with that. I didn’t make it for anyone except myself. It was a fun experiment for me, and at the time, probably the most complex ~~JavaScript~~ jQuery “app” I had ever built. I mean look at the repo:

![Screenshot of codebase]({{ site.imageurl }}/2018/logo-integrity-code.png)

I’ve got a Sass file in there, a `package.json` along with a Grunt file. I’ve also got some PHP files in there that I used for templating because, honestly, that’s the best way I knew how to render a file from a particular set of static data back then.

Quick anecdote: I remember this project introduced me to the concept of approximate string matching. You see, the app required users to enter values where I wanted to give them the right answer if they were “close enough” but I had no idea how to do that. If I have the value `Adidas` and the user typed `Addidas`, how could I code “yup, that’s close enough”? I knew strict equality `if (userInput === answer)` but how could I do something like `if (userInput ~= answer)`? Then [a friend](https://tylergaw.com) told me what I wanted was “fuzzy string matching” which gave me the keyword I needed to find a solution via Google (I ended up using [fuzzySet.js](https://glench.github.io/fuzzyset.js/)).

Anyhow, I digress. Where was I going with this? That’s right. So I got pinged on twitter one day that someone has posted the project to Designer News and said it was “trending” whatever that means. I decided to look at my analytics to see what was a happening and [sure enough](https://twitter.com/jimniels/status/942805152234332160) it was getting some attention:

![Screenshot of Google analytics](https://pbs.twimg.com/media/DRWC3ygVwAA-aui.jpg)

So I followed the link to [the designer news thread](https://www.designernews.co/stories/90192-logo-integrity) and read the [top comment](https://www.designernews.co/comments/279744) only to find that the worst thing that can happen when one of your projects gets lots of attention had happened: the site was broken. Not in a load balancing kind of way. The host was just fine. The interactivity of the site was broken in the browser.

This was a little surprising to me as I had done thorough testing when I initially released the site and everything worked, even in legacy IE. Granted, when I built the site it was using some of the more modern yet esoteric web technologies (specifically SVG blurring), so realizing a browser might’ve changed something and broke my site wasn’t a huge surprise in the end.

The whole experience kind of felt like going back to your cabin in the woods that you hadn’t visited in a couple years and you find just general deterioration due to the passing of time, like some broken pipes, cobwebs, etc. Only for me (keeping this bad analogy alive) I came back to my cabin to find a giant party going on at the same time with a bunch of guests.

Some quick troubleshooting of the problem made me realize it was broken only in Safari, which was a relief since traffic to the site was spiking. “At least the site isn’t _completely_ broken” I told myself. A little further debugging led me to put in [a quick fix](https://github.com/jimniels/logo-integrity/commit/d8323cc8d1575262f60c0f3fe448c7dea761de77) which gave me peace of mind knowing Safari users weren’t clicking around like “this stupid thing is broken. Who is the author? This @jimniels sucks!”

So I was quite fortunate to get pinged on twitter early on so I could fix the problem (#twitterPagerDuty) as the site got more and more traffic over the next few days. In fact, a lot of people were posting their scores to twitter with the hashtag `#logoIntegrity`, which is funny because when I initially built the site without the “game” aspect. But at the recommendation of [the same friend](https://tylergaw.com) mentioned earlier, I put in a little widget at the end that says “congrats, you scored \_\_ points. Share it on twitter!”

![Screenshot of twitter with people linking to the logo-integrity project]({{ site.imageurl }}/2018/logo-integrity-twitter.png "A screenshot excerpt of people posting about the project on Twitter")

Granted that little share widget could totally be manipulated and you could put whatever score in there you wanted. Accusations of this were hurled around on Designer News.

![Screenshot of Designer News with accusation of inspect being used]({{ site.imageurl }}/2018/logo-integrity-inspect-used.png)

I don’t even know why I am writing this blog post. I guess just for my own satisfaction in documenting this little thing that happened. The internet is a funny thing sometimes in how you’ll go from 0 visitors to 20,000 in an instant. Maybe I’ll put that on my resume one day if I ever go into marketing: increased a site’s visitors 424,000%.

![gif of exponential analytics growth]({{ site.imageurl }}/2018/logo-integrity-analytics-growth.gif)

My guess is, in another three or four years, this will probably make the rounds again. That seems to be how it goes. Hopefully the site still works then and my cabin of logo integrity is found to be comfortable and cozy.
