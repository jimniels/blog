---
tags: readingNotes
---

# Reading Notes, September 2021

## Article: [“Some reasons to measure”](https://danluu.com/why-benchmark/)

Why, in some cases, I measure for personal projects:

> the impetus for my measurements is curiosity. I just want to know the answer to a question; most of the time, I don't write up my results. 

Also, this random factoid:

> As consumers, we should expect that any review that isn't performed by a trusted, independent, agency, that purchases its own review copies has been compromised and is not representative of the median consumer experience.

Remember who butters the bread of whatever “review” you read online.

## Podcast: [“Frontend Feud: ShopTalk vs Syntax”](https://podcasts.apple.com/us/podcast/js-party-javascript-css-web-development/id1209616598?i=1000534946896) on JS Party

A fun episode.

These were the top-ranked answers to the question: “What’s your favorite HTML element?”

1. `<div>`
2. `<marquee>`
3. `<button>`
4. `<input>`
5. `<p>`
6. `<script>`

If you can believe it, elements such as `<a>` and `<img>` were not on the list of top-ranked answers. However, as Dave observed on the podcast, “well [this] is a JS podcast, so checks out”

## Article: [“In Quest of Search”](https://sarasoueidan.com/blog/in-quest-of-search/)

> I do strongly encourage the addition of a new HTML element that represents—and can consequently obviate the use of—the ARIA search landmark role. A search element would provide HTML parity with the ARIA role, and encourage less use of ARIA in favor of native HTML elements.

A great rationale and well-articulated justification for a new `<search>` element in HTML.

>  The purpose of ARIA…is to provide parity with HTML semantics. It is meant to be used to fill in the gaps and provide semantic meaning where HTML falls short.

Also, a good reminder about semantics and ARIA:

> The first rule of ARIA use in HTML states that you should avoid using ARIA if there is a native HTML element with the semantics of behavior that you require already built in.

## Article: [Designing Beautiful Shadows in CSS](https://www.joshwcomeau.com/css/designing-shadows/)

I’ve had this in my queue to read for a while, but it’s the kind of post you need to read in your browser not via a feed reader since the inline examples are so deep and illustrative. Anyway, I finally got to reading it’s excellent.

> By using different shadows on [different elements], we create the impression that [one] is closer to us than [another]. Our attention tends to be drawn to the elements closest to us, and so by elevating [some elements over others], we make it more likely that the user focuses on it first.

> Here's the first trick for cohesive shadows: every shadow on the page should share the same ratio. This will make it seem like every element is lit from the same very-far-away light source, like the sun.

Also of note: the difference between `box-shadow` and `filter: drop-shadow()` is really neat because `box-shadow` is, well, a shadow in the space of a box. However, with `filter: drop-shadow()` your shadow will follow the shape of your image or HTML element! `filter` is hardware-accelerated, so its more performant too!

## Article: [“Design research on the Clearleft podcast”](https://adactio.com/journal/18474)

> There’s qualitative research (stories, emotion, and context) and then there’s quantitative research (volume and data). But there’s also evualative research (testing a hyphothesis) and generative research (exploring a problem space before creating a solution). By my count that gives four possible combos: qualitative evaluative research, quantitative evaluative research, qualitative generative research, and quantitative generative research. Phew!

Applicable to design, since—as Maite Otondo says—research uncovers the reality of today so you can design for the future of tomorrow. 

## Article: [“Python as a build tool”](https://tonsky.me/blog/python-build/)

This is an article about python, but it gets there by bashing other scripting language first. This critique of Bash resonated with me:

> We tried Bash, but Bash is a terrible, terrible language. Variables do not work as you expect them to work, there are significant whitespaces in your script, spaces in strings are special, and to top it all there are slight differences in CLI utilities you have to use with Bash.

Then this conclusion:

> please don’t use Bash. I know, it’s tempting, it’s just “two lines of code”. It always starts small until one day it grows into a unportable, unsupportable mess. In fact, Bash is so simple and so natural to just start using that I had to make a very strict rule: never use Bash. Just. Don’t.  

As someone who has been exposed to Bash, tried to use it, never understood it, then always wondered why it was so prevalent (thinking it must be because it’s easy) this made me feel better. 

## Article: [“Making a case for letter case”](https://medium.com/@jsaito/making-a-case-for-letter-case-19d09f653c98)

> According to Google’s first UX writer, Sue Factor, one of the main reasons why Google decided to go with sentence case was because it was just easier to explain to designers and engineers. In a product interface, it’s not always clear what’s considered a “title.” Is a tab name a title? How about a settings checkbox? Or a confirmation message?

A great breakdown of title vs. sentence case. I have to admit, after reading it, I’m becoming a believer in sentence-casing all the things. My brain is already thinking about how I’d do this on my blog—say, a regex to find/replace title casing on all post titles going back a decade? Must…resist…urge…

## Article: [“The Green Ray”](https://frankchimero.com/blog/2021/the-green-ray/)

> Color sits in a continuum—ok, sure—a spectrum, dictated by scientific fact, registered through personal experience, and ossified with shared cultural framing. That sounds fancy, but in short: “Red” is a vague term that is solid in the middle and hazy at its edges. Fights over redness always happen at the boundary of orange-red and red-orange, because the edges of definition are determined by all the stuff that makes other people fascinating, annoying, and real: their perception, their labels, their culture, their location.

Frank at it again with his words. This time talking about color, but also words:

> The tech industry is where words go to die. It’s a tragic bit of irony: tech work is all abstractions, and those abstractions can only be considered and revised through precise language. But we are slobs and so poor at wielding language. 

## Article: [“How Your Desk Helps You Think”](https://forge.medium.com/how-your-desk-helps-you-think-21da2ea2fb14)

The history of the office workspace:

> First, bosses got rid of private offices. That dramatically reduced how many surfaces you had control over: Cubicles give you far less space to arrange things as you’d prefer. Then open-offices came along and made things even more miserable, because they destroyed even the vestigial bits of privacy we had with cubicles — as well as the meagre (but still useful) cubicle wall-space you’d use to organize info. And of course, open offices also meant more noise distractions and more interruptions, which were, as [a researcher] argues, possibly the worst blow of all to our thought: “Perhaps the most important form of control over one’s space is authority over who comes in and out.”

The research around gaining control of your office space and environment is telling:

> being able to organize your workspace makes you nearly one-third more productive than when you can’t.…as [the author of the experiment said] “three people working in empowered offices accomplished almost as much as four people in lean offices.”