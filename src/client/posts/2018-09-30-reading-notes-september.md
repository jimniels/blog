---
title: Reading Notes, September 2018
date: 2018-09-30
tags: readingNotes
---

## Article: [The Rise and Rise of JSON](https://twobithistory.org/2017/09/21/the-rise-and-rise-of-json.html)

An interesting little story about how JSON rose to its prominence today. It’s probably an illustration of the [rule of least power](https://en.wikipedia.org/wiki/Rule_of_least_power) (“choose the least powerful language suitable for a given purpose”). In fact, the article’s author states as much:

> my own hunch is that people disliked XML because it was confusing, and it was confusing because it seemed to come in so many different flavors.

The author goes on to say:

> XML was designed to be a system that could be used by everyone for almost anything imaginable. To that end, XML is actually a meta-language that allows you to define domain-specific languages for individual applications...And yet here was JSON, a format offering no benefits over XML except those enabled by throwing out the cruft that made XML so flexible.

The simplicity of JSON, which I’m sure is often ridiculed, is quite fascinating in comparison to XML:

> The first lines of a typical XML document establish the XML version and then the particular sub-language the XML document should conform to. That is a lot of variation to account for already, especially when compared to JSON, which is so straightforward that no new version of the JSON specification is ever expected to be written.

There were a few little historical tidbits I found interesting in this story. For example, when Douglas Crockford first implemented what would become “JavaScript object notation” by embedding a `<script>` tag in HTML, he ran into a problem where dynamically written keys could conflict with reserved words in JavaScript, so he just required all key names to be quoted. JSON requires quoted key names to this day. 

There’s also the story about the name and the spec:

> Crockford and Morningstar...wanted to name their format “JSML”, for JavaScript Markup Language, but found that the acronym was already being used for something called Java Speech Markup Language. So they decided to go with “JavaScript Object Notation”, or JSON. They began pitching it to clients but soon found that clients were unwilling to take a chance on an unknown technology that lacked an official specification. So Crockford decided he would write one.

On, and there was so linked reading in the article, some of which I followed. I liked [this comment](https://blog.codinghorror.com/xml-the-angle-bracket-tax/) on XML, which put into words my feelings based on experience with XML:

> I spend a disproportionate amount of my time wading through an endless sea of angle brackets and verbose tags desperately searching for the vaguest hint of actual information

## Video: [“Why Greatness Cannot Be Planned: The Myth of the Objective”](https://www.youtube.com/watch?v=dXQPL9GooyI&feature=youtu.be)

> The path to success is through not trying to succeed.
> To achieve our highest goals, we must be willing to abandon them.

In a lot of ways, that’s the premise of this talk. And I, for one, thought his points resonated a lot with my own experiences of creativity. There’s quite a few paradoxical findings here.

## Article: [“The top four web performance challenges”](https://adactio.com/journal/14329) by Jeremy Keith

> One outcome was to realise that there’s a tendency (in performance, accessibility, or SEO) to focus on what’s easily measureable, not because it’s necessarily what matters, but precisely because it is easy to measure.

Too true. 

I think incremental and iterative improvements can be served well by measurements. But vast, innovative improvements and directional changes in product need more than analytics. They need vision and taste from humans.

Here’s a thought? Things that are measurable are like the micro of products, whereas vision and taste are the macro.

## Article: [Why Trump Tweets (And Why We Listen)](http://politi.co/2BvZsIV) by Nicholas Carr

Once again, an interesting opinion from Nicholas Carr into our current political state and its relationship to modern technology.  

> Twitter’s formal qualities as an informational medium—its immediacy and ephemerality, its vast reach, its lack of filters—mirror and reinforce the impulsiveness, solipsism, and grandiosity that define Trump’s personality and presidency and, by extension, the times. Banal yet mesmerizing, the president’s Twitter stream distills our strange cultural moment—the moment the noise became the signal.

Gambling and social media:

> A similarly seductive dynamic [to gambling] plays out on the screens of social media apps. Because tweets and other posts also offer unpredictable rewards—some messages go viral, others fall flat—they exert the same kind of pull on the mind. “You never know if your next post will be the one that delivers a jackpot.”

And how that relates to Trump:

> Trump’s tweets don’t just amass thousands of likes and retweets. They appear, sometimes within minutes of being posted, in high-definition blowups on "Fox & Friends" and "Morning Joe" and "Good Morning America." They’re read, verbatim, by TV and radio anchors. They’re embedded in stories in newspapers and on news sites, complete with Trump’s brooding profile picture. They’re praised, attacked and parsed by Washington’s myriad talking heads. When Trump tweets—often while literally watching the TV network that will cover the tweet—the jackpot of attention is almost guaranteed. Trump, by all accounts, spends an inordinate amount of time monitoring the media, the outsized coverage becomes all the more magnified in his mind. And as the signals flow back to him from the press, he is able to fine-tune his tweets to sustain or amplify the coverage. For Trump, in other words, tweeting isn’t just a game of chance. It’s a tool of manipulation. Twitter controls Trump, but Trump also controls Twitter—and, in turn, the national conversation.

On the nature of the medium that is Twitter:

> With its emphasis on brief messages and reflexive responses, Twitter is a medium that encourages and rewards [a] reductive view of the world...it’s an invitation to shallowness.

And what that leads to:

> Twitter relieves the president [and many of its users] of the pressure to be well-informed or discerning, even when he’s addressing enormously complicated issues like the North Korean nuclear threat...Twitter gives Trump [and again its users] license to sidestep rational analysis.

More acutely:

> We listen so intently to Trump’s tweets because they tell us what we want to hear about the political brand we’ve chosen. In a perverse way, they serve as the rallying cries of two opposed and warring tribes...[Trump] succeeds in pulling the national conversation down to his own level—and keeping it there.

On a more philosophical level:

>  Thanks to the rise of networks like Twitter, Facebook and Snapchat, the way we express ourselves, as individuals and as citizens, is in a state of upheaval, an upheaval that extends from the family dinner table to the upper reaches of government. Radically biased toward space and against time, social media is inherently destabilizing. What it teaches us, through its whirlwind of fleeting messages, is that nothing lasts. Everything is disposable. Novelty rules. The sense that “nothing matters,” that wry, despairing complaint of people worried about national politics right now, isn’t just a Trump phenomenon; it’s built into the medium.