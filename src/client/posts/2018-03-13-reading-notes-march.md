---
tags: readingNotes
---

# Reading Notes, March 2018

## Article: [“The Loveliest Living Fossil”](https://www.typography.com/blog/the-loveliest-living-fossil) via typography.com

A really interesting article that looks at the fluctuating meanings behind punctuations in typography:

> At its leading edge, punctuation is volcanically active, giving shape to concepts that move far faster than words. Anyone communicating today has seen #topics and #themes and #categories identified this way, using a symbol that was intuitively understood and replicated even before it was first called a hashtag in 2007. The symbol and its meaning are now universally recognized, transcending even the locality of language, but their use is scarcely a decade old — an astounding accomplishment for a bit of lexical fluff

But the “#” symbol has a myriad of different meanings:

> Nº was the number sign before # became a number sign, and it refreshingly serves this one and only purpose. Compare the #, which when preceding a number is read as “number” (“#1 in my class”), but when following a number means “pound” or “pounds” If you’re curious what the # symbol has to do with the abbreviation lbs., here’s one possible missing link. (“70# uncoated paper”), leading to printshop pile-ups like “#10 envelope, 24# bond.” To programmers, a # can mean either “ignore what follows” (as in a Python comment) or “use what follows” (when referencing a page fragment, or a Unicode value in html.) To a proofreader, a # means “insert space,” so in the middle of a numbered list, the notation “line #” does not mean “line number,” but rather “add a line space.” Because of #’s resemblance to the musical symbol for “sharp” (♯), it’s a frequent stand-in for the word “sharp,” and often the correct way of rendering a trademarked term such as The C# Programming Language. The # is rapidly assuming musical duties as well, especially in online databases, leading to catalog collisions like “Prelude & Fugue #13 in F#.” How fortunate a designer would be to have a numero symbol, with which to write “Prelude & Fugue Nº 13 in F#,” or “Nº 10 Envelope, 24# bond.”

Conclusion:

> the Nº is a reminder that typography exists to serve readers, and that readers do not live by semantic punctuation alone. There’s a place for variety and richness in typography

A great article, worth reading in its entirety. 

## Video: [“The Functional Tao of Bash”](https://m.youtube.com/watch?v=yD2ekOEP9sU) by Garrett Smith

The principles of this talk are illustrated by code examples of BASH, but I think they are general enough to apply to any programming language. The speaker walks you through his own personal thought process and techniques for understanding and refactoring a piece of code which he did not write himself. 

I️ found many useful ideas from his own personal techniques that I’d like to try. His overall goal is to make the code easy to understand and comprehend *at a glance*. He does this by breaking things up into really small function chunks, so you end up with something like:

```js
// Top of file
DoThing();
DoAnotherThing();
DoLastThing();

// Underneath main execution are the declarations
function DoThing() {...}
function DoAnotherThing() {...}
function DoLastThing() {...}
```

I also enjoyed this quote around the ~11:30 mark:

> Programming is not a moral debate. We’re not talking about evil and good. We’re talking about a process of programming. “Writing terrible code” is probably a misnomer. That so called “terrible code” is code that is experimental and trying to prove something. That’s fine. Prove it. Understand it. Get it to work. Learn from it. Then make it clearer. Make it better. *As needed*.

## Article: [“Your brain does not process information and it is not a computer”](https://aeon.co/essays/your-brain-does-not-process-information-and-it-is-not-a-computer) by Robert Epstein

I liked this article and agree personally that the metaphor of the human brain as a computer or information processing machine feels intuitively off-base to what I experience (both as a human and, albeit, amateur computer enthusiast and writer-of-code).

I found rather interesting the author’s examples of how human metaphors for the brain's inner workings have changed drastically over time (none yet seem to have adequately explained the phenomenon):

> The invention of hydraulic engineering in the 3rd century BCE led to the popularity of a hydraulic model of human intelligence, the idea that the flow of different fluids in the body – the ‘humours’ – accounted for both our physical and mental functioning. The hydraulic metaphor persisted for more than 1,600 years, handicapping medical practice all the while.

The author concludes that, at some future day, the metaphor of the human brain as a computer will seem as ridiculous as this notion of the brain as a hydraulic machine does now. One example of how a computer is a poor metaphor for the mind is found in the idea of “storing memory”:

> Misleading headlines notwithstanding, no one really has the slightest idea how the brain changes after we have learned to sing a song or recite a poem. But neither the song nor the poem has been ‘stored’ in it. The brain has simply changed in an orderly way that now allows us to sing the song or recite the poem under certain conditions. When called on to perform, neither the song nor the poem is in any sense ‘retrieved’ from anywhere in the brain, any more than my finger movements are ‘retrieved’ when I tap my finger on my desk. We simply sing or recite – no retrieval necessary.

He continues:

> Because neither ‘memory banks’ nor ‘representations’ of stimuli exist in the brain, and because all that is required for us to function in the world is for the brain to change in an orderly way as a result of our experiences, there is no reason to believe that any two of us are changed the same way by the same experience. If you and I attend the same concert, the changes that occur in my brain when I listen to Beethoven’s 5th will almost certainly be completely different from the changes that occur in your brain. Those changes, whatever they are, are built on the unique neural structure that already exists, each structure having developed over a lifetime of unique experiences.

If you start paying attention, you’ll notice how pervasive the metaphor of “human brain as a computer” is. In fact, I admit (somewhat ashamedly) that when my first son was born I was kind of in shock that during his nine months of development in the womb, there wasn’t some kind of bug that worked its way into his biological system (a weird nose, an immune deficiency, etc). Thousands of babies must be born everyday, most of them likely in “normal working order”. How is that possible? I can’t even ship a single piece of code without some underlying a bug. I suppose I’ve been spending *too* much time writing software.

## Article: [“In Search of the Perfect Writing Font”](https://ia.net/topics/in-search-of-the-perfect-writing-font/) via ia.net

A well-articulated set of arguments for why the folks at IA ship their plain text editor with only a monospaced font:

> In contrast to proportional fonts that communicate “this is almost done” monospace fonts suggest “this text is work in progress.” It is the more honest typographic choice for a text that is not ready to publish...The typographic rawness of a monospace font tells the writer: “This is not about how it looks, but what it says. Say what you mean and worry about the style later.” Proportional fonts suggest “This is as good as done and stand in an intimidating contrast to a raw draft.”

I wonder if that’s why there’s so many bugs in software: we’re subconsciously believing it’s always a work in progress? Well, the folks at IA address the programmers and monospaced fonts later:

> Programmers use monospaced fonts for their indentation and because it allows them to spot typos. In a perfectly regular horizontal and vertical raster, letters and words become easily discernible

But is there a balance between a proportional font and a monospaced one?

> This year, again, we set out exploring our own writing font. We started from scratch, moved from proportional to monospace to three spaces and ended up with duospace...Progressively, we came to realize that the right question is how to make a proportional font look like a monospace, but how many exceptions you allow until you lose the benefits of a sturdy monospace.

And here’s the why behind exploring duospace:

> The advantage over proportional fonts is that you keep all benefits of the monospace: the draft like look, the discernability of words and letters, and the right pace for writing. Meanwhile, you eliminate the downside stemming from mechanical restrictions that do not apply to screen fonts.

## Article: [“Dying a Little in Computer Poetry”](https://ia.net/topics/computer-poetry/) via ia.net

Honesty, I’d like to see more blog posts like this. These kinds of observations (and their implications) get brushed over too frequently. In my opinion, the author is trivially breezing over a topic that could results in the ultimate regret at the end of his life:

> As a so-called HCI (Human Computer Interaction) designer, I know that using a computer I am, in fact, communicating with a computer. I communicate with computers all day long. I know that, most of the time, I talk to something that has no body, no feelings, and no understanding...I mostly use the computer as a tool to talk to other humans. I structure interfaces and write text that I share with other humans. I communicate more with computers than with my kids. I caress my iPhone more often than my kids. This is a bit sad. Maybe it’s very sad. But, hey, most people spend more time at work than with the family! Spending time with my computers, I support my family. And, hey, eventually, my words and designs will reach other human beings. I know that what I do on my computers will be felt by humans in some way. I fear that on my death bed I might regret these words as much as what they try to deny. But, hey… There is a difference between communicating through computers and communicating with computers.

He also touches on that nagging concern many of us in tech have that what you do becomes worthless in a matter of ~~years~~ months:

> Spending time with computers we still risk that all the energy we invested in communicating with them disappears into that little black electric holes that used to eat our Word documents. When we talk to computers, we risk dying a little, as we lose time to the possibility that all our energy turns to zeroes.

Conclusion:

> Just pay attention to not pour half your life into the digital void.

## Article: [“Take the Power Back”](https://ia.net/topics/take-the-power-back/) via ia.net

Great analogy:

> One of the first lessons you learn as a young traveler is when you go to a faraway country: avoid the people that call you on the street. “Massage?” “Hungry?” “Need a guide?” Only noobs follow the hustlers. You find a quiet spot and research where to go. Then you go there and then go further. Same thing when you travel on the Web. Don’t get lured in. Find a quiet spot and research and then go there. And then go further...Things pushed in our stream through an algorithm tailored to our weakness are the digital equivalent of the calls that try to lure you in when you walking down a street in Bangkok. 

Also, I thought this was a rather interesting (and funny) observation on how younguns view URLs. Apparently, this was a conversation that happened:

> 11-year-old: “What is this strange stuff on the Milk package?”  
> Dad: “This strange stuff is a URL.”  
> 11-year-old “What does it say?”  
> Dad: “It’s an Internet address.”  
> 11-year-old “Address of what?”  
> Dad: “Of a Website. It’s used in the browser—you put it in that field on top and then you go to a Website.”  
> 11-year-old “What is the browser?“  

The author’s observation on this conversation is that:

> The browser now is just another app...Apps bring him there sometimes. To a chatting teen, the address bar is a cousin of the terminal.
