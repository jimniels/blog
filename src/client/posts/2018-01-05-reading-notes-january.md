---
title: Reading Notes, January 2018
date: 2018-01-05
tags: readingNotes
---

## Song Lyrics: ["No Phone"](https://www.youtube.com/watch?v=I93XzY8nRso) by Cake

Just happened to be listening to some Cake the other day and the song [“No Phone”](https://www.youtube.com/watch?v=I93XzY8nRso”) came on. To be honest, I kind of sat marveling that this song was written in 2003, way before smartphones came along. Seems incredibly prescient. Here’s some lyrical excerpts:

> No phone No phone I just want to be alone today  
> ...   
> Ringing stinging  
> Jerking like a nervous bird  
> Rattling up against his cage  
> Calls to me throughout the day  
> ...   
> No phone No phone I just want to be alone today  
> ...   
> Rhyming chiming got me working all the time  
> Gives me such a worried mind  
> ...   
> No phone No phone I just want to be alone today  
> ...   
> Shaking quaking  
> Waking me when I'm asleep  
> Never lets me go too deep  
> Summons me with just one beep  
> The price we pay is steep  
> ...   
> My smooth contemplations will always be broken  
> My deepest concerns will stay buried and unspoken  
> ...   
> No phone No phone I just want to be alone today  

## Article: [“Computer latency: 1977-2017”](https://danluu.com/input-lag/) via danluu.com

This article is an exhaustive look at computer latency over the last few decades. The conclusion? Modern computers are significantly slower in keyboard-to-screen response time.

> the default configuration of the powerspec g405, which had the fastest single-threaded performance you could get until October 2017, had more latency from keyboard-to-screen than sending a packet around the world.

Though the article deals specifically with detailing the degradations in latency of a keypress on computer hardware over the past few decades, I found this observation to be eerily similar to what’s happening with the degradations in speed of the web over the past few decades:

> The solution to poor performance caused by “excess” complexity is often to add more complexity. In particular the gains we’ve seen that get us back to the quickness of the quickest machines from thirty to forty years ago have come not from listening to exhortations to reduce complexity, but from piling on more complexity.

## Article: [“Hooked and booked”](https://adactio.com/journal/13109) by Jeremy Keith

Data only answers what, not why:

> At Booking.com, they do a lot of A/B testing.  
> At Booking.com, they’ve got a lot of dark patterns.  
> I think there might be a connection.  
> A/B testing is a great way of finding out what happens when you introduce a change. But it can’t tell you why.  

More:

> The problem is that, in a data-driven environment, decisions ultimately come down to whether something works or not. But just because something works, doesn’t mean it’s a good thing.
>
> If I were trying to convince you to buy a product, or use a service, one way I could accomplish that would be to literally put a gun to your head. It would work. Except it’s not exactly a good solution, is it? But if we were to judge by the numbers (100% of people threatened with a gun did what we wanted), it would appear to be the right solution.

Love the picture he paints with the “gun-to-head” example. Though often mistakenly interpreted otherwise, data is only one piece of a multi-faceted story.

## Article: [“Origin Story”](https://adactio.com/journal/13187) by Jeremy Keith

Jeremy responding to the commonly-held assertion that the web is a primitive technology because it was just designed for sharing documents. 

> If the web had truly been designed only for documents, [rich interactive applications] wouldn’t be possible.

## Article: [“Airplanes and Ashtrays”](https://csswizardry.com/2017/10/airplanes-and-ashtrays/) via csswizardry

The author asks: inflight smoking has been banned in commercial airlines for the last twenty decades but airplanes are still fitted with ashtrays, why? Because rules aren’t going to stop 100% of people. The author summarizes this sentiment from the airlines manufacturers: “We absolutely do not want people to smoke on board, but if they do, then we need to handle the fallout from it in the safest way possible.” It’s about pragmatism. 

How does this relate to writing code?

> ten years of being a developer has taught me that, sometimes, doing the wrong thing is the right thing to do

Also:

> When a team cannot bend the rules of your system or framework, they’ll often opt to simply not use it at all. This is a net loss, where allowing them to do the wrong thing would have at least led to greater adoption, more consistency, and less repetition.

The conclusion being:

> Whenever you plan or design a system, you need to build in your own ashtrays; a codified way of dealing with the inevitability of somebody doing the wrong thing.

## Article: [“The Fallacies of Distributed Computing”](https://csswizardry.com/2017/11/the-fallacies-of-distributed-computing-applied-to-front-end-performance/) via csswizardry

I liked this reminder that things don’t always work as expected:

> If you build and structure applications such that they survive adverse conditions, then they will thrive in favourable ones. Something I often tell clients and workshop attendees is that if you optimise for the lowest rung, everything else on top of that comes for free.

## Video: [“PureScript: Tomorrow’s JavaScript Today”](https://vimeo.com/243148125) by Kris Jenkins 

An interesting look at the value proposition of PureScript.

What I found really interesting here were the function signatures because they afford you so much by merely glancing at them, especially when your code has side effects. Here’s the example the presenter uses:

```
-- Pure
summariseDocument :: String -> String
-- Needs network
fetchDocument :: DocumentId -> Eff (ajax :: AJAX) String
-- Needs a browser
renderDocument :: String -> Eff (dom :: DOM) ()
```

This lets you keep track of what pieces of your code can run by themselves and which require other systems (servers, databases, etc) in order to run.

> [PureScript] takes you to the future of large scale front-end code reliability. [Now I’ve written systems in PureScript] and every one of those systems in recent years has needed a little bit of JavaScript. Maybe five to ten percent of the codebase is JavaScript. All of my bugs, all of my runtime exceptions, all of my problems, come from that five to ten percent. The rest [of the codebase] is rock solid. I worry about logical errors but I don’t worry about the reliability of my code anymore on the front-end.

## Quote: David Foster Wallace on Reading

I really enjoyed this quote. It speaks directly to improving your language skills, but I think can more broadly be applied to just about any skill at which you wish to improve. The quote comes from [this book](https://www.amazon.com/gp/product/0991118111/ref%3Das_li_qf_sp_asin_il_tl?ie=UTF8&tag=farnamstreet-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=0991118111&linkId=b3fd3f1886007f084137faecf900de7b) (emphasis mine):

> Not just reading a lot, but paying attention to the way the sentences are put together, the clauses are joined, the way the sentences go to make up a paragraph. Exercises as boneheaded as you take a book you really like, you read a page of it three, four times, put it down, and then try to imitate it word for word so that you can feel your own muscles trying to achieve some of the effects that the page of text you like did. If you're like me, **it will be in your failure to be able to duplicate it that you'll actually learn what's going on**. It sounds really, really stupid, but in fact, you can read a page of text, right? And “Oh that was pretty good…” but you don't get any sense of the infinity of choices that were made in that text until you start trying to reproduce them.

## Article: [“How smartphones hi jack our minds”](http://www.roughtype.com/?p=8248) by Nicholas Carr 

Nicholas Carr at it again.

> The smartphone has become a repository of the self, recording and dispensing the words, sounds and images that define what we think, what we experience and who we are.

He speaks about an interesting test that was done on cognition and how the results showed that if your phone was even near you, you scored less (emphasis mine):

> The results were striking. In both tests, the subjects whose phones were in view posted the worst scores, while those who left their phones in a different room did the best. The students who kept their phones in their pockets or bags came out in the middle. **As the phone’s proximity increased, brainpower decreased.**

The most interesting part is that they didn’t even know it:

> In subsequent interviews, nearly all the participants said that their phones hadn’t been a distraction—that they hadn’t even thought about the devices during the experiment. They remained oblivious even as the phones disrupted their focus and thinking

I think we can all admit it’s tough:

> Just suppressing the desire to check our phone, which we do routinely and subconsciously throughout the day, can debilitate our thinking. 

Perhaps we’re not as in control as we think:

> The evidence that our phones can get inside our heads so forcefully is unsettling. It suggests that our thoughts and feelings, far from being sequestered in our skulls, can be skewed by external forces we’re not even aware of.

But is it really that big of a surprise our phones have such a hold on us?

> Imagine combining a mailbox, a newspaper, a TV, a radio, a photo album, a public library and a boisterous party attended by everyone you know, and then compressing them all into a single, small, radiant object. That is what a smartphone represents to us. No wonder we can’t take our minds off it.

Another problem is that we offload remembering information to the computer because we have search engines available to us 24/7. But that is diminishing our own personal knowledge. Plus, as was found in a study “when people call up information through their devices, they often end up suffering from delusions of intelligence. They feel as though ‘their own mental capacities’ had generated the information, not their devices.” So what do we do?

> Only by encoding information in our biological memory can we weave the rich intellectual associations that form the essence of personal knowledge and give rise to critical and conceptual thinking. No matter how much information swirls around us, the less well-stocked our memory, the less we have to think with.

The conclusion? (emphasis mine):

> That insight sheds light on society’s current gullibility crisis, in which people are all too quick to credit lies and half-truths spread through social media. **If your phone has sapped your powers of discernment, you’ll believe anything it tells you.**

At the end of the day, all our phones can give us is data, but we often misperceive that as knowledge:

> Data, the novelist and critic Cynthia Ozick once wrote, is “memory without history.” Her observation points to the problem with allowing smartphones to commandeer our brains. When we constrict our capacity for reasoning and recall or transfer those skills to a gadget, we sacrifice our ability to turn information into knowledge. We get the data but lose the meaning. Upgrading our gadgets won’t solve the problem. We need to give our minds more room to think. And that means putting some distance between ourselves and our phones.