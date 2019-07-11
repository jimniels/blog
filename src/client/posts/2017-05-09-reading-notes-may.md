---
title: Reading Notes, May 2017
date: 2017-05-09
tags: readingNotes
---

## "[Complexity and Strategy](https://hackernoon.com/complexity-and-strategy-325cd7f59a92)" by Terry Crowley, Former Microsoft Office Lead

Terry Crowley, a Microsoft engineer who lead Office development for over the last decade, reflects on the complexity of building software: from planning releases to technical strategy to dealing with market competition. There were two parts that stuck out to me I wanted to note:

First, he comments on how Google came into the "office productivity" space and applied pressure to what Microsoft was doing by having a suite of tools purely in the browser, available to any platform with an OS.  Though he thinks it's too early to see how this will all play out, he does believe the complexity Microsoft has endured in building native Office tools (as opposed to Google's web-based tools) may end benefiting them. Googles apps can't compete in terms of functionality and features because building software as rich as Office in the browser just isn't feasible. 

> the performance challenges with running large amounts of code or large data models in the browser and managing the high relative latency between the front and back end of your application generally make it harder to build complex applications in a web-based environment. Hyper-ventilation by journalists and analysts about the pace of Google App’s innovation generally ignored the fact that the applications remained relatively simple...I knew the pace of innovation that was possible when functionality was still relatively low ...and nothing I saw as Google Apps evolved challenged that.
 
In the end, the complexity of the Office software suite ends up acting as a “moat” against the attacks of competitors that simply can’t be crossed without the years of experience Microsoft has gained building this kind of software. 

> Competitive strategy argues that when a competitor attempts to differentiate you need to focus on neutralizing that differentiation as quickly as possible... It is clear the Office apps would not be positioned functionally the way they are now (with fully compatible native and web clients on all devices and support for offline and co-editing) if there had been any squeamishness about embracing the challenges of complexity. That complexity (as it embodies valued functionality) is the moat.

It’s interesting to think of this complexity, rather than being an liability to the business, when viewed and handled correctly,  being an asset and competitive advantage. 

Number two:

> The dynamic you see with especially long-lived code bases like Office is that the amount of framework code becomes dominated over time by the amount of application code and in fact frameworks over time get absorbed into the overall code base. The framework typically fails to evolve along the path required by the product — which leads to the general advice “you ship it, you own it”. This means that you eventually pay for all that code that lifted your initial productivity. So “free code” tends to be “free as in puppy” rather than “free as in beer”.

I find that a very interesting long-term observation on leveraging frameworks in your codebase. You always see the benefits up front. But in the long run frameworks are “free as in puppy”: once the initial joy has subsided they leave you with responsibility.


## "[Back to the Cave](https://www.frankchimero.com/writing/back-to-the-cave/)" by Frank Chimero

I have to admit, when I first started reading this and the author was framing some important questions, I felt like I was going to barf a little when it seemed he was going to give a definitive answer for each (like almost every article on the internet it seems). But then he didn't. It was so refreshing. It reminded me how little things like that make me love Frank’s writing. The question he frames: is going off on your own worth it?

> Well, I am here to offer a resounding maybe. 

Frank is always marrying paradoxes, which is what makes great writing in my opinion. Like this other part:

> How can we be independent together?

Independent together? Resounding maybe? Jumbo shrimp? These are great paradoxes stacked against each other and in proving contraries you find the truth. As Frank points out later in his article “independence is always supported by interdependence."

Now about employment:

> Many people presume that employment is the opposite of independence, and that endlessly irritates me. It’s so short-sighted. History shows a long record of artists who did “normal” work to support their creative practice.

He points out many of the famous artists and writers whose work that is now famous today were “side projects” from their daily employment.

> There’s one other important benefit to the unrelated day job: when it comes to your art, you don’t have to take any shit from anybody. You can honor any creative impulse because your paycheck is never on the line. Go nuts, make crazy shit. What’s more independent than that. 

That’s one reason I’ve personally never liked contract work on the side, or even writing tutorials now. I feel like I have to finish all those things and sometimes I just don't want to. I want to explore as far as I want to go and stop when I want. A day job affords me that because my side projects can be whatever I want whenever I want. I never thought of that, but that *is* freedom. 

Along these lines there is also great quote for this Krista Tippet:

> I worry about our focus on meaningful work. I think that’s possible for some of us, but I don’t want us to locate the meaningfulness of our lives in our work. I think that was a 20th-Century trap. I’m very committed and fond of the language of vocation, which I think became narrowly tied to our job titles in the 20th Century. Our vocations or callings as human beings may be located in our job descriptions, but they may also be located in how we are present to whatever it is we do

That last line is fantastic: finding meaning and a calling might be found in being present in whatever we do, be that our job, parenting, or just being a friend. As Frank goes on to comment, “meaning comes from a way of being”:

> When Campbell told us to follow our bliss, he wasn’t telling everyone to chase their dreams until they became careers. He said it as a call for people to pursue a vocation as Krista Tippett has defined it. Vocation is as much about who you are and how you are as it is about what you do. Bliss is an attitude, a disposition, so meaning comes from a way of being and is not a consequence of producing work. You make the art, the art does not make you.

One last great point:

> I mistake the work’s flaws for my own. Perhaps that’s something many of us have in common. The way to approach this issue is clear: we must acknowledge we are involved in our unsteadiness, but believe we are only part of its reason. If we allow room in our work for serendipity to occur, that same space must also be reserved for misfortune. We are the cause of neither.

## A Quote

A quote often attributed to Einstein, though [apparently sourced  from a nameless professor at Yale](http://quoteinvestigator.com/2014/05/22/solve/): 
 
> If I had only one hour to solve a problem, I would spend up to two-thirds of that hour in attempting to define what the problem is.

The more I work in software, the more I realize this is the way to go.

## “[How technology created a global village—and put us at each others throats](https://www.bostonglobe.com/ideas/2017/04/21/how-technology-created-global-village-and-put-each-other-throats/pu7MyoAkdyVComb9aKyu6K/story.html)” by Nicholas Carr via The Boston Globe

I don’t know how they get numbers like this, but it’s an interesting figure:

> Thanks to the Internet and cellular networks, humanity is more connected than ever. Of the world’s 7 billion people, 6 billion have access to a mobile phone — a billion and a half more, the United Nations reports, than have access to a working toilet. 

All of this interconnectivity was supposed to foster tolerance. The more we knew of someone, the more we would like them. Or at least tolerate them. Carr points out that assumption isn’t new. It’s been proclaimed by many western thinkers since the invention of the telegraph—and radio, TV, phone and Internet were only supposed to make it better. And yet, in some ways, they didn’t. 

> Yet we live in a fractious time, defined not by concord but by conflict. Xenophobia is on the rise. Political and social fissures are widening. From the White House down, public discourse is characterized by vitriol and insult. We probably shouldn’t be surprised

He cites some research done by psychologist in 2007 around people who lived in the same apartment building and they found that:

>  as people live more closely together, the likelihood that they’ll become friends goes up, but the likelihood that they’ll become enemies goes up even more...The nearer we get to others, the harder it becomes to avoid evidence of their irritating habits. Proximity makes differences stand out.

Social networks seem to only amplify this effect:

> Social networks like Facebook and messaging apps like Snapchat encourage constant self-disclosure. Because status is measured quantitatively online, in numbers of followers, friends, and likes, people are rewarded for broadcasting endless details about their lives and thoughts through messages and photographs. To shut up, even briefly, is to disappear. One study found that people share four times as much information about themselves when they converse through computers as when they talk in person.

Work along these lines from British scholars in 2011 concluded:

> With the advent of social media it is inevitable that we will end up knowing more about people, and also more likely that we end up disliking them because of it.

That rings true every time you hear someone talk complain about all the racist, hateful, stupid garbage from acquaintances in their Facebook feed. I agree with Carr that, at then end of the day, you’ll never be able to build a global community of harmony with only software.

> [there’s an idea], long prevalent in American culture, that technological progress is sufficient to ensure social progress. If we get the engineering right, our better angels will triumph. It’s a pleasant thought, but it’s a fantasy. Progress toward a more amicable world will require not technological magic but concrete, painstaking, and altogether human measures: negotiation and compromise, a renewed emphasis on civics and reasoned debate, a citizenry able to appreciate contrary perspectives. At a personal level, we may need less self-expression and more self-examination.

Love that last line. It’s worth repeating:

> we may need less self-expression and more self-examination

Carr concludes:

> [technology doesn’t] make us better people. That’s a job we can’t offload on machines.

## Video: “[The Post JavaScript Apocalypse](https://www.youtube.com/watch?v=NPB34lDZj3E)” by Douglas Crockford

Some thoughts about the direction of JavaScript, specifically  how to remove redundant constructs of today’s javascript from the language and leave ourselves with fewer methods of expression. You might think having fewer methods of expression would be a bad thing, but he argues that fewer is actually better because it lowers the cognitive dissonance you encounter when running into two things that are *mostly* similar but not identical, which you then have to expend mental energy differentiating (he illustrated this with an analogy to purging your life of things, which I thought was interesting). It’s a parallel for [Garrett’s law](http://www.garrettkalleberg.com/), which goes something like this: if two things are similar, either 1) accentuate the differences and make them more different, or 2) eliminate the differences and make them identical.

Here are some examples of changes the speaker recommended:

- Tabs vs. Spaces
	- Get rid of tabs. Not because spaces is “better” but because we have two things doing the same thing. Let’s simplify. And since we can’t get rid of spaces, tabs has to go.
- Double Quote `"` vs. Single Quote `'`
	- Get rid of single quotes (as it’s already overload in use as an apostrophe) to do things like encapsulate strings and use double quotes exclusively. 
- `null` vs `undefined`
	- Get rid of `null` as an empty pointer and use `undefined` solely (he recommends leveraging `null` in the future as an empty object).

He goes into depth on other idiosyncrasies of JavaScript and how he would fix them. Things like what `0 / 0` should equal and why `(0.1  + 0.2 === 0.3)` returns false. It was an interesting talk and I found the metaphor for removing clutter from your life an interesting parallel to the argument for removing redundancies from the langauage of JavaScript. Obviously you can’t just remove them now, but from a perspective of personal code writing, it’s an interesting argument I may try out in practice.

## Video: [Jeremy Keith at Render 2017](https://www.youtube.com/watch?v=wAekLOUpMB4)

Two important questions when building software:

1. How well does it work?
2. How well does it fail?

Great example with CSS shapes. In browsers that don’t support it, if you use it, you just get a regular fallback. 

Service workers are another good example. When somebody loads your webpage for the first time, they download images, html, css, etc, and a service worker. Then on any subsequent request, the service worker does it’s work. Note that *every* browser, the first time your page is loaded, doesn’t support service workers because they haven’t been downloaded yet. So you start out building under the assumption that your site doesn’t have a service worker, then you enhance from there.

It’s a really good way to build your UI’s, by building them around failure cases.

## “[Mobile First, Desktop Worst – Prototyping: From UX to Front End](https://medium.com/@opdbrooks/mobile-first-desktop-worst-f900909ae9e2)” by Oliver Brooks, Creative Director at MetaLab

An interesting read which presents a challenge to the traditional mobile first thinking. The author contrasts “mobile first” design philosophy (at least as one of its definitions) to an analogy of physical product design:

> If “Mobile First” design philosophy were applied in the domain of physical product design, the implication would be that you should design the compact, multi-tool screwdriver first. The compact design could then be used to inform the design of a larger version. Why? Because it allegedly is best to ladder-up in complexity (see, progressive enhancement vs. graceful degradation). This idea is, however, is based on the assumption that there is a consistent, linear relationship between complexity and form.

I like the challenge he presents to the assunmption that “there is a consistent, linear relationship between complexity and form”. For some websites I think staring at mobile first and building up linearly works just fine. For others, however, I think it leaves *much* lacking.

## "[Plainness and Sweetness](https://www.frankchimero.com/blog/2017/plainness-and-sweetness/)" by Frank Chimero

> It’s human nature: I over-value where I have influence. Since I am a designer, this frequently means placing too much emphasis on how things look and work rather than the direction they are pointed. But reflecting on the other side of the issue is also interesting: I find that the more input I have in the content and strategy of the project, the less burden I place on the aesthetics. Perhaps this is because I believe the aesthetic of the work should be an extension of its objectives, so if you get the strategy right, the look follows. Since I like to tackle problems sideways, I must risk being plain and rely on direct visuals to keep the work comprehensible.

And this next part is good:

> I am for a design that’s like vanilla ice cream: simple and sweet, plain without being austere. It should be a base for more indulgent experiences on the occasions they are needed, like adding chocolate chips and cookie dough. Yet these special occasions are rare. A good vanilla ice cream is usually enough. I don’t wish to be dogmatic—every approach has its place, but sometimes plainness needs defending in a world starved for attention and wildly focused on individuality. Here is a reminder: the surest way forward is usually a plain approach done with close attention to detail. You can refine the normal into the sophisticated by pursuing clarity and consistency. Attentiveness turns the normal artful

More:

> the longer we spend in contact with the products of design, the more their willful attempts at individualism irritate us.

The danger of redesigning your brand to current trends:

> Many believe that normalcy and consistency breads monotony, but what about the trap of an overly accentuated, hyper-specific identity? When the world changes around you, what do you do?

This is often true of personal portfolios that strive to be different, but in reality, when you're sorting through tons of resumes you're looking for the content before the individuality. The individuality are like fireworks, they may catch your attention for a second, but once that attention is grabbed, if the content is confusing, hard to read, hard to digest, you've failed.

> All contain the aching desire to be noticed when instead they should focus on being useful.