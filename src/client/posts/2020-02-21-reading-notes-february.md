---
tags: readingNotes
---

# Reading Notes, February 2020

## Article: [“The Shallows: tenth anniversary edition”](http://www.roughtype.com/?p=8755) by Nicholas Carr

Reflecting on the 10th anniversary of his book *The Shallows*

> Welcome to The Shallows. When I wrote this book ten years ago, the prevailing view of the Internet was sunny, often ecstatically so...In a 2010 Pew Research survey of some 400 prominent thinkers, more than 80 percent agreed that, “by 2020, people’s use of the Internet [will have] enhanced human intelligence; as people are allowed unprecedented access to more information, they become smarter and make better choices.”
>
> The year 2020 has arrived. We’re not smarter. We’re not making better choices.

Then later:

> When it comes to the quality of our thoughts and judgments, the amount of information a communication medium supplies is less important than the way the medium presents the information and the way, in turn, our minds take it in. The brain’s capacity is not unlimited. The passageway from perception to understanding is narrow. It takes patience and concentration to evaluate new information — to gauge its accuracy, to weigh its relevance and worth, to put it into context — and the Internet, by design, subverts patience and concentration.

## Article: [“Guide to Internal Communication, the Basecamp Way”](https://basecamp.com/guides/how-we-communicate) via basecamp.com

A collection of general principles the folks at Basecamp try to keep in mind when communicating. There’s a lot of really great stuff in there. I’ve only surfaced a few here that feel particularly relevant to me in February 2020.

> Writing solidifies, chat dissolves. Substantial decisions start and end with an exchange of complete thoughts, not one-line-at-a-time jousts. If it's important, critical, or fundamental, write it up, don't chat it down.
>
> Speaking only helps who’s in the room, writing helps everyone. This includes people who couldn't make it, or future employees who join years from now.
> 
> "Now" is often the wrong time to say what just popped into your head. It's better to let it filter it through the sieve of time. What's left is the part worth saying.


## Article: [“Looking at Letters”](https://www.frankchimero.com/blog/2020/looking-at-letters/) by Frank Chimero

A great analysis of choosing type and making creative decisions. 

> you can also pick by gut or chance once you’re certain you have a solid pool to choose from. Reasons can be arbitrary, and you need to leave room for whim. I once chose a typeface because I liked the 7. Sometimes one can overthink things.

> I raise all this to show the natural limits of intent...Best to take those first big steps in the right direction, whittle down the options, and commit to what feels right to you. No choice is bulletproof, and no amount of evidence is ever going to completely clarify or validate a choice. This is what makes these choices creative.

## Article: [“Agile as Trauma”](https://doriantaylor.com/agile-as-trauma)

Questioning the thinking that more collaboration is better:

> Collaboration! So much effort goes into writing and talking about collaboration, and creating tools to facilitate collaboration and telecollaboration, with the tacit assumption that more collaboration is always better...Since communication overhead increases proportionally the square of the number of people on the team—a fact illuminated by Brooks in the 1970s—what you actually want is as little collaboration as you can get away with.

On the spurious nature of feature comparison:

> Features don’t work, in the sense that they can be easily gamed. A brittle and perfunctory implementation, done quickly, is going to score more intramural brownie points over a robust and complete one. If the question is does product A have feature X? then the answer is yes either way. This also makes features a spurious basis for comparison in competing products because you need to seriously examine them to determine the extent to which they are any good.

How to speed up software development;

> Like any other creative endeavour, software development can’t be sped up as much as we can eliminate the phenomena that slow it down. 

Viewing software development through an entirely new lens:

> A development paradigm that can be construed from the outside as setting great store by speed—or, I suppose, velocity—is invariably going to be under continuous political and economic pressure to accelerate...If instead you asserted that the work amounts to continual discovery, it happens at one speed, and could potentially continue indefinitely, you might be able to pace yourself.

## Article: [“Letting tools make choices”](https://www.jackfranklin.co.uk/blog/letting-tools-make-choices/)

This little story resonated with my own experience so much, I just wanted to make note of it—a kind of “hey, somebody else feels the same as me.”

> I remember sitting down one evening after work to focus on a side project and losing the best part of the evening trying to get two different tools that I'd chosen to use playing nicely alongside each other. I finished for the night and realised that I'd made no progress...Once I had everything playing nicely, one of the tools would have an update which broke something and I'd repeat the process all over again.

## Article: [“The Simplest Way to Load CSS Asynchronously”](https://www.filamentgroup.com/lab/load-css-simpler/) via filament group

This post is about seven months old, but I hadn’t seen this trick before. I didn’t even need an explanation (though theirs is great). Just reading the markup dawned on me the elegance of this trick to loading a CSS stylesheet async.

`<link rel="stylesheet" href="/path/to/my.css" media="print" onload="this.media='all'">`

I love little tricks in HTML like this that would otherwise require who knows how many lines of JavaScript.