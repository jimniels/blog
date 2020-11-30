---
tags: readingNotes
---

# Reading Notes, November

## Article: [“Don’t Be A Hero”](http://robinrendle.com/notes/dont-be-a-hero.html)

> Having that utopian vision of the world is important though. And being optimistic about making enormous change is important, too. But I’m learning that the truly wise folks hold that vision in their minds whilst making tiny incremental progress in that direction every single day

This reminded me of my experience learning to play the piano. You want to start out playing the incredible pieces written for piano—Beethoven’s “Moonlight Sonata”, Debussy’s “Clair de Lune”,  Liszt’s “Hungarian Rhapsody No. 2”—but you quickly realize you can’t. So instead you practice over and over and over. Every day. And every day you practice, you can barely notice any improvement from when you started that day. But as time goes by, you notice drastic improvements week over week, month over month, year over year. Tiny, incremental, accumulative progress towards a goal is a powerful thing.

## Website: [carolynzhang.com](https://www.carolynzhang.com/)

> these days, i'm trying to not define myself by what i make, or what people pay me for.

Lovely new portfolio site. 

## Website: [Ephemeralist](https://ephemeralist-ixz4p7lmaq-ue.a.run.app) by Paul Ford

First of all, what is it?

> Ephemeralist [is] a web page that...pulls archives from places like the MoMA and the Smithsonian, and allows you to scroll through history—from books and fossils, to pictures of donkeys from the 1700s.

Paul talks about why he created the site on [the Postlight Podcast](https://postlight.com/podcast/life-in-the-clouds-the-present-and-future-of-cloud-hosting-services):

>  I kinda did it just so when I’m going to bed I would have something to look at that would be distracting...And what’s better than old art and ridiculous ephemera? I like a lot of historical nonsense...

## Article: [“Reflections on software performance”](https://blog.nelhage.com/post/reflections-on-performance/)

This feels relevant to reinventions that attempt to make the web faster (like AMP) vs. building in a leaner, more purposeful way with the tools we already have which have been optimized for performance gains.

> There’s a general observation here: attempts to add performance to a slow system often add complexity, in the form of complex caching, distributed systems, or additional bookkeeping for fine-grainedincremental recomputation. These features add complexity and new classes of bugs, and also add overhead and make straight-line performance even worse, further increasing the problem.
>
> When a tool is fast in the first place, these additional layers may be unnecessary to achieve acceptable overall performance, resulting in a system that is in net much simpler for a given level of performance.

That kind of perfectly describes Google’s AMP, does it not? It was an attempt to make the web faster, not by encouraging the proper use of web technologies already available but by reinventing the wheel, even to the point of changing URLs.

## Video: [“Oh The Scripts We'll Load”](https://www.youtube.com/watch?v=tr6aHw8I32M&t=993s) by Tim Kadelc

This in-depth analysis of loading scripts in the browser is filled with nerdy technical details.

For example, Tim tells this story about a team that was loading a giant bundle of JavaScript using the `<script async>` tag. To try and improve performance, they ruthlessly cut down the amount of JavaScript being shipped to the browser. They got the file size way down and...performance got worse! Do you know why? Watch this video to find out—or I’ll just tell you why: even though it was `async`, the giant mass of JavaScript was blocking the parser _when it arrived_, and because it was so much smaller than before, it was arriving earlier and thus blocking the parsing of the HTML document earlier and giving the appearance of slower performance. Hence Tim’s statement at one point in his talk:

> Don't take anything as gospel. There will always be tradeoffs.

## Article: [“Learning from mistakes”](http://www.jackfranklin.co.uk/blog/learning-from-mistakes/)

> it's easy to write code you can understand now, but hard to write code you'll understand in six months. The best engineers I've worked with aren't the best because they know every API method under the sun, or because they can turn five lines of code into two with a clever reduce call, but because they write code that they (and their colleagues) can understand now and code that can be understood in the future...
> 
> How do these engineers get this ability? Experience. They don't foresee problems because they are able to look into a crystal ball...but because they've been there, done that, countless times.

A good reminder that we’re all here to fail. An “experienced” developer, designer, manager, etc., is just someone who has failed a lot—and learned from it.

## Article: [“The M1 Macs”](https://daringfireball.net/2020/11/the_m1_macs)

Gruber’s review of the M1 MacBook Air has this nugget which feels so relevant to product and software:

> What you need to understand is that the best aspects of these Macs aren’t benchmark-able. It’s about how nice they are. The cooling system never making any noise doesn’t show up in a benchmark. I suppose you could assign it a decibel value in an anechoic chamber, but silent operation, and a palm rest that remains cool to the touch even under heavy load, aren’t quantities. They’re qualities. They’re just nice.

We’re always trying to quantify things that we can measure in order to show, with objective data, that they improved. But insanely great human-to-computer interaction isn’t solely a science. It’s also an art, which means the qualities you can’t or don’t measure have a huge impact.

## Article: [“The design systems between us.”](https://ethanmarcotte.com/wrote/the-design-systems-between-us/)

This line resonates:

> design applications have made it much easier for designers to work together; development applications have made it easier for developers to work together.
>
> But...the gap between each discipline’s workspace hasn’t changed significantly.