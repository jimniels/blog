---
title: Reading Notes, January 2019
tags: readingNotes
---

## Article: [“Busy is the new stupid”](https://m.signalvnoise.com/busy-is-the-new-stupid/)

> You can’t claim time on anyone else’s calendar, either. Other people’s time isn’t for you — it’s for them. You can’t take it, chip away at it, or block it off. Everyone’s in control of their time. They can give it to you, but you can’t take it from them.

The video was especially interesting.

## Article: [“Four Cool URLs”](http://alexpounds.com/blog/2018/12/29/four-cool-urls)

A neat look at varying URL designs. The author touches on the idea of designing URLs so that users can construct a URL without having to actually use your site. Additionally, as users become more familiar a site’s URL patterns, you’ll find it’s often quicker to edit the URL rather than use the GUI to navigate the application or website.

I’ve been thinking about URL design more and more lately. In fact, on my icon gallery sites [I designed the URLs of each icon “resource” to act as my API for accessing the icon’s artwork](https://blog.jim-nielsen.com/2018/choosing-a-static-site-generator/):

> I could leverage my site’s URLs as an interface for getting icons, i.e. `/icons/:id/` for the HTML representation of the icon and `/icons/:id/:size.png` for the actual icon (i.e. `/icons/facebook/512.png` would give me facebook’s 512px app icon).

## Video: [“In The Loop”](https://www.youtube.com/watch?v=cCOL7MC4Pl0&t=1126s) by Jake Archibald at JSConf.Asia 2018

A great, visually-instructive talk about the event loop and how your JavaScript actually gets executed by the browser. He has some great examples of gotchas that are worth wrapping your head around. Like [this one](https://twitter.com/jaffathecake/status/954285104720957440): if the user clicks the button, in what order are things logged?

![Two event listeners in JavaScript](https://pbs.twimg.com/media/DT5MZL1X4AAR-O8.jpg)

His descriptions of tasks, animation callbacks, and micro tasks, from the perspective of the browser, were all eye opening. Great talk for anyone doing JavaScript.

## Article: [“CSS for JavaScripters 1”](https://www.quirksmode.org/blog/archives/2019/01/css_for_javascr.html) via quirksmode.org

An interesting take on explaining CSS to “JavaScripts” through the lens of JSON:

> Like JSON files, CSS files are not programs. but a series of declarations that programs use in order to create output. Also, they fail silently when they contain instructions that the receiving program does not understand.
> 
> If you approach CSS as you approach JSON you’ve taken a step toward understanding it.

## Article: [“Thieves of experience: On the rise of surveillance capitalism”](http://www.roughtype.com/?p=8608) by Nicholas Carr

Nicholas Carr, in reviewing a new book, is at it again: writing counterpoints to the Silicon Valley gospel.

> Zuboff’s fierce indictment of the big internet firms goes beyond the usual condemnations of privacy violations and monopolistic practices. To her, such criticisms are sideshows, distractions that blind us to a graver danger: By reengineering the economy and society to their own benefit, Google and Facebook are perverting capitalism in a way that undermines personal freedom and corrodes democracy.

Later:

> Whenever we use free apps and online services, it’s often said, we become the products, our attention harvested and sold to advertisers. But, as Zuboff makes clear, this truism gets it wrong. Surveillance capitalism’s real products, vaporous but immensely valuable, are predictions about our future behavior — what we’ll look at, where we’ll go, what we’ll buy, what opinions we’ll hold — that internet companies derive from our personal data and sell to businesses, political operatives, and other bidders. 
