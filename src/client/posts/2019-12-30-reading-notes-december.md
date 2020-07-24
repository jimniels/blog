---
tags: readingNotes
---

# Reading Notes, December 2019

## Article: [“Larry and Sergey: a valediction”](http://www.roughtype.com/?p=8661) by Nicholas Carr

Loved this paragraph from Carr:

> When, in 1965, an interviewer from Cahiers du Cinema pointed out to Jean-Luc Godard that “there is a good deal of blood” in his movie Pierrot le Fou, Godard replied, “Not blood, red.” What the cinema did to blood, the internet has done to happiness. It turned it into an image that is repeated endlessly on screens but no longer refers to anything real.

## Article: [“Martin Scorsese: I Said Marvel Movies Aren’t Cinema. Let Me Explain.”](https://www.nytimes.com/2019/11/04/opinion/martin-scorsese-marvel.html) via nytimes.com

Apparently Martin Scorsese threw some shade—at least that’s how some people saw it—at the Marvel films:

> I’ve tried to watch a few of them and they’re not for me, they seem to me to be closer to theme parks than they are to movies as I’ve known and loved them throughout my life, and in the end, I don’t think they’re cinema.

He then wrote an opinion piece to clarify what he was trying to say:

> There’s worldwide audiovisual entertainment, and there’s cinema. They still overlap from time to time, but that’s becoming increasingly rare. And I fear that the financial dominance of one is being used to marginalize and even belittle the existence of the other.

Read his words how you want, but one of my interpretations is: data-driven movie making has ruined cinema:

> everything in [The Marvel movies] is officially sanctioned because it can’t really be any other way. That’s the nature of modern film franchises: market-researched, audience-tested, vetted, modified, revetted and remodified until they’re ready for consumption.

“But the data proves that’s what the people want!” He addresses that:

> And if you’re going to tell me that it’s simply a matter of supply and demand and giving the people what they want, I’m going to disagree. It’s a chicken-and-egg issue. If people are given only one kind of thing and endlessly sold only one kind of thing, of course they’re going to want more of that one kind of thing.

He concludes:

> In the past 20 years, as we all know, the movie business has changed on all fronts. But the most ominous change has happened stealthily and under cover of night: the gradual but steady elimination of risk.

I wonder if this is happening in pockets software design and development, for better or worse...

## Article: [“The Principles of Versioning in Go”](https://research.swtch.com/vgo-principles)

This piece is quite an exhuastive look at why the folks behind Go version the way they do. I found the entire thing quite an interesting analysis of semver and versioning software. So if you’re interested in that kind of computer science stuff, read the whole thing!

While the article deals specifically with the topic of versioning in software, I found this commentary about code aesthetics to have many parallels to design. I thought it was a good articulation of how I feel about keeping links underlined—and in many cases the default “blue”—on the web.

> The most common objection to semantic import versioning is that people don’t like seeing the major versions in the import paths. In short, they’re ugly. Of course, what this really means is only that people are not used to seeing the major version in import paths.  
> ...  
> Both these changes—upper-case for export and full URLs for import paths—were motivated by good software engineering arguments to which the only real objection was visual aesthetics. Over time we came to appreciate the benefits, and our aesthetic judgements adapted. I expect the same to happen with major versions in import paths. We’ll get used to them, and we’ll come to value the precision and simplicity they bring.

What would the www be like if _everyone_ kept their links underlined? 

## Tweet: [@ryanflorence](https://twitter.com/ryanflorence/status/1201997439915311104?s=21)

> There are two types of software companies: those that ship code that embarrasses their engineers and those that go bankrupt.

Based on my experience thus far in my career, I would agree with this statement. Granted it’s a black and white statement, but if you read between the lines, the essence here resonates with me. 

I think a corrollary to design would quite frequently hold to be true as well: “there are two types of software companies: those that ship products that embarass their designers and those that go bankrupt.”

## Article: [“Tape loop”](https://colly.com/journal/tape-loop) by Simon Collison

A beautiful piece that ruminates on the experience of music as it was before the iPod. Back then, music was an experience that shaped your identity, your life! And now that experience is completely gone, except for those of us who remember it. We are vessels of the cassette. 

> Physicality [the cassette tape] feels like an investment in something: a relationship with a piece of work that I'll endeavour to like. If I decide I don't like it, I will be sure of that, having tested more thoroughly than if it was one of hundreds of Spotify album samplings.

Maybe it’s just nostalgic ramblings, but I agree with his conclusion: “[I enjoy] music in more ways than one, and I feel much richer for it.”

## Article: [‘“Ethics” and Ethics’](https://ia.net/topics/ethics-and-ethics)

> the tech industry prefers the word “ethics” over morals 

Why? Because:

> “Ethics” is nice. Morals are uncomfortable.  
> “Ethics” is less binding. They feel more abstract, neutral, less scary, less obligatory. Morals command.  
> “Ethics” is abstract. Morals are concrete.

Overall, a bit rambling in spots but had some interesting insights I think.

## Article: [“Bluesky: Twitter Announces Effort to Build ‘Decentralized Standard for Social Media’”](https://daringfireball.net/2019/12/bluesky) via Daring Fireball

Gruber’s commentary on Twitter’s apparent forway into creating an open source standard for social media. What I liked was John’s analysis of prescriptive vs. descriptive specs. 

> XHTML was a boil-the-ocean plan to create a new version of HTML, its creators’ ideal for how HTML should be used — a prescriptive spec. HTML5 took the approach of standardizing how HTML already was being used — a descriptive spec. We all use HTML5 today.
