---
title: Reading Notes, January 2017
date: 2017-01-31
tags: readingNotes
---

## [Tweet from @practicingdev](https://twitter.com/practicingdev/status/811956403745210368)

> The work of an experienced software developer... perception vs. reality.

![Perception vs. reality in software](https://pbs.twimg.com/media/C0SmBk6XcAQRVPH.jpg)

## [The JavaScript Wars](http://cssence.com/blog/2016-11-the-javascript-wars)

One interesting thought: HTML, CSS, and JavaScript are often called “the building blocks of the web”. But perhaps it’s worth considering URLs as the building blocks of the web:

> There is another building block for the web, one that is more important than HTML, CSS and JavaScript combined. It all starts with URLs. Those things uniquely identify some piece of information on the web. It should not be that hard or expensive to have a server dump this information into HTML, whatever that information might be; some content, a list of URLs to some more content, you name it. Let’s keep it really simple, just the content, without replicating any of the site’s chrome 

It’d be an interesting design exercise to work on building a site purely from URLs with no navigation, i.e. what would typically be your application header would just be one level up: in the browser URL bar.

## [Your are not paid to write code](http://bravenewgeek.com/you-are-not-paid-to-write-code/)

New industry title: Front-end Systems Engineer. The responsibilities? You spend all your time updating dependencies of a project. 

(See [Rich Hickey notes](http://jim-nielsen.com/blog/2016/reading-notes-november/) about how `gem install hairball` is easy: easy to get all that complexity.)

> But if you set up a system, you are likely to find your time and effort now being consumed in the care and feeding of the system itself. New problems are created by its very presence. Once set up, it won’t go away, it grows and encroaches. It begins to do strange and wonderful things. Breaks down in ways you never thought possible. It kicks back, gets in the way, and opposes its own proper function. Your own perspective becomes distorted by being in the system. You become anxious and push on it to make it work. Eventually you come to believe that the misbegotten product it so grudgingly delivers is what you really wanted all the time. At that point encroachment has become complete. **You have become absorbed. You are now a systems person.** (*emphasis added*)

On another note:

> We’re not paid to write code, we’re paid to add value (or reduce cost) to the business. Yet I often see people measuring their worth in code, in systems, in tools—all of the output that’s easy to measure. I see it come at the expense of attending meetings. I see it at the expense of supporting other teams. I see it at the expense of cross-training and personal/professional development. It’s like full-bore coding has become the norm and we’ve given up everything else.

Conclusion:

> engineers should understand that they are not defined by their tools but rather the problems they solve and ultimately the value they add. But it’s important to spell out that this goes beyond things like commits, PRs, and other vanity metrics...you are not paid to write code. 

## [Kiss My Classname](http://www.zeldman.com/2017/01/03/kiss-my-classname/) from Jeremy Zeldman

> The codebase on big sites isn’t impenetrable because developers slavishly followed arbitrary best practices. The codebase is broken because developers don’t talk to each other and don’t make style guides or pattern libraries. **And they don’t do those things because the people who hire them force them to work faster instead of better.** It starts at the top. (*emphasis added*)

I added that emphasis because I thought it was a great point. It’s easy to point the finger and say “well it’s not my fault the codebase is impenetrable” but as a professional software engineer it’s your job to communicate the value and importance of a codebase that is comprehendible. Zeldman continues:

> Employers who value quality in CSS and markup will insist that their employees communicate, think through long-term implications, and document their work. Employers who see developers and designers as interchangeable commodities will hurry their workers along, resulting in bloated codebases that lead intelligent people to blame best practices instead of work processes.

Great perspective, in my opinion, on organizational structure and effects on code. It’s always talked about how John or Jane Doe developer impacted the codebase, but people outside of the engineering department have an effect too. And that impact is not often talked about (or even perceived). 

## [Software development: it's got nothing to do with computers](http://www.philipotoole.com/software-development-got-nothing-computers/)

> “When it comes to successful software development only the people matter.”

Code matters, but code is ultimately written by people. I think there were some good questions to ask here about your own software teams: 

1. How coherently does your team work?
2. How well do they communicate with each other?
3. What processes are in place that empowers them? 
4. Do they derive pride from their work?
5. How involved do they feel?

## [On Getting Old(er) in Tech](http://corgibytes.com/blog/2016/12/06/getting-old-er-in-tech/)

Don't love everything in this article, but a few pieces I think are solid. Like this: 

> When I hear someone say they have 20 years of experience, I wonder if that’s really true or if they merely had 1 year of experience 20 times. I’ve known too many developers that used the same techniques they learned in their first year of employment for the entire span of their career...My point is certainly not that younger developers are smarter. It’s that many programmers let themselves grow stale. And the bigger problem is, after doing the same year’s worth of experience ten times, many programmers forget how to learn. Not only can it be extremely hard to catch up with ten years of technology, it can be next to impossible if you’ve forgotten how to learn.

> If you plan on being in the IT field for more than 10 years, you need to be a lifelong learner.  I’ve always been a lifelong learner. I’ve learned and developed with numerous programming languages, frameworks, and strategies. As a result, I’ve honed my learning skills.

“I’ve honed my learning skills”, a resume piece indeed. I need someone who will take on whatever is thrown at them. That might mean doing it yourself. Or it might mean finding someone else to do it. Or it might mean recruiting the aid of someone else, who does know what they're doing, and letting them guide you through to the completion of the project. 

For example, at my most recent job, a customer promise was made with significant business implications. I was asked to help lead the engineering effort through to completion. All I was given was a repository for a codebase nobody understood which was written in Ruby (a language I don’t know except for the occasional fiddling around with Jekyll). But hey, it was a problem that needed to be solved to add value to the business. So I dived in, recruited others to help, and saw it through. 

## [Test Your Ideas (And Assumptions)](http://briangilham.com/blog/2016/11/7/test-your-ideas-and-assumptions)

Idea of figuring out a basic prototype deliverable first. If people don’t get that right away, the extra work you would’ve invested wouldn’t have been enough to make it successful. Instead refine the conceptual idea more until the prototype is enough to convey and convince. 

> Cut everything else out and share it with the world. Right now. It isn’t easy – you’ll worry it isn’t polished enough. But that’s the point. If your audience doesn’t “get it” in the rough stages, it’s unlikely a few extra hours of work will change their minds. You can always improve it later if the feedback is positive...Some of the more critical comments sting a little, at first. But I’d rather hear them now than ten episodes down the road.

## [Web development as a hack of hacks](http://www.quirksmode.org/blog/archives/2016/09/web_development.html)

An interesting commentary on a [hacker news thread](https://news.ycombinator.com/item?id=12477190). Front-end is often looked down on, but that looked down upon-ness stems mostly from real CS people who see the web stack (HTML, CSS, JavaScript) as suboptimal to their real stacks. 

When people talk bad about JavaScript, HTML, and CSS:

> The main reason back-end developers don’t understand front-end is that they expect a well-defined environment.

That’s an advantage of the web! The multiple browsers, the varied environments is what gives you reach, unlike any other platform!

>  if there's any reason why tech ageism is amazingly dumb it's this one imo (have the guy on your team who's graduated past the fanboy stage make your tool, platform and framework choices, you will save far more than the premium that you have to pay him).

Front-end-ers love shiny stuff, but sometimes it’s employers too: (hackernews comment)

> This is because employers are demanding that candidates know the latest and greatest technologies (eg. looking for 5 years of experience in 1 year old technology)...If I need to be experienced with [all this shiny new stuff] to stay employable because just doing my job isn’t enough, then I’m going to learn it.

The real problem he comes up with:

> the main reason why front-end is so behind: Real Programmers With A CS Degree don’t do front-end. Front-end is for script kiddies and pixel pushers, it’s not to be taken seriously...Unfortunately Real Programmers don’t know anything about browsers and have no desire to learn. That makes them useless as front-end teachers. This problem, more than anything else, is what perpetuates web development as a hack of hacks.