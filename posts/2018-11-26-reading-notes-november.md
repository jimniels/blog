#readingNotes

# Reading Notes, November 2018

## Tweet: [@necolas](https://twitter.com/necolas/status/360170108028600320)

With every passing day that I work in technology, I find this quote more and more relevant:

> Replace "can you build this?" with "can you maintain this without losing your minds?"

## Article: [“Against Software Development”](http://www.rntz.net/post/against-software-development.html)

An interesting, and short, look at problem areas of software development. This line has been lingering in my head for a few days:

> Perhaps we should expect true advances in software “engineering” only when we learn how better to govern ourselves.

## Article: [“Programmer Archeologists”](http://lambda-the-ultimate.org/node/4424)

This sounds like a future we could very possibly live in:

> In Verner Vinge’s space opera A Deepness in the Sky, he proposes that one of this future’s most valuable professions is that of Programmer-Archaeologist. Essentially, the layers of accreted software in all large systems are so deep, inter-penetrating, idiosyncratic and inter-dependent that it has become impossible to just re-write them for simplicity’s sake – they genuinely can’t be replaced without wrecking the foundations of civilization. The Programmer-Archaeologist churns through this maddening nest of ancient languages and hidden/forgotten tools to repair existing programs or to find odd things that can be turned to unanticipated uses.

## Article: [”’It’s Not a Bug, It’s a Feature.’ Trite—or Just Right?”](https://www.wired.com/story/its-not-a-bug-its-a-feature/) by Nicholas Carr via Wired

> It’s not a bug, it’s a feature is an acknowledgment, half comic, half tragic, of the ambiguity that has always haunted computer programming.
>
> In the popular imagination, apps and other programs are “algorithms,” sequences of clear-cut instructions that march forward with the precision of a drill sergeant. But while software may be logical, it’s rarely pristine. A program is a social artifact. It emerges through negotiation and compromise, a product of subjective judgments and shifting assumptions. As soon as it gets into the hands of users, a whole new set of expectations comes into play. What seems an irritating defect to a particular user—a hair-trigger ­toggle between landscape and portrait mode, say—may, in the eyes of the programmer, be a specification expertly executed.

Shortly after reading this article, [I found this lovely t-shirt](https://twitter.com/jimniels/status/1064547820496146433):

![T-shirt where a bug is dressed up as a feature](https://pbs.twimg.com/media/DsYIlegU0AAy9wC.jpg)

## Article: [“Choose Boring Technology”](http://mcfunley.com/choose-boring-technology)

An interesting opinion piece on how “boring” technology can be a pretty safe bet:

> The nice thing about boringness (so constrained) is that the capabilities of these things are well understood. But more importantly, their failure modes are well understood.

New technology has a much larger magnitude of failure modes that are unknown. We all know this. Searching for a way to fix something (which is huge part of you’re job as a developer) that’s been around 10 years is much easier than searching for a to fix something that’s been around 10 days.

> It can be amazing how far a small set of technology choices can go...If you think you can't accomplish your goals with what you've got now, you are probably just not thinking creatively enough.

That seems to be the embodiment of JavaScript.

## Video: [“Make the Right Thing the Easy Thing: Designing Processes Teams Will Actually Follow”](https://www.youtube.com/watch?v=xqT8e6_yzLg) by Jason Lengstorf

I thought this was a really great presentation around how to be effective building software.

> If you have a rockstar and everyone on the team is deferring to the rockstar, you have fewer people on your team taking initiative. If you have a team of 10 people and 9 of them, when you ask a question, just turn to look at the senior dev to see what their solution is, you’ve just lost 9 brains worth of thinking power.

You have to ask yourself:

> What are the underlying problems that created the need for a rockstar to come in and fix everything?

He makes a point about how code reviews get a bad rap because a lot of teams only conduct code reviews when something is wrong:

> Code reviews are a chance for the lead developer to flog someone in the public square because they did something that, I don’t know, was a memory hog. That is not what a code review should be. I think that code reviews should mostly be when someone does something that you like. Pull it up in front of the entire team and walk through what they did right. Then talk about all the other ways it could’ve been written that wouldn’t have been optimal. Show what the anti-pattern could’ve been, and praise what was done.
>
> [As a senior developer] You should be constantly failing in front of your team then showing them how you learn from your mistakes, because that’s how you got where you are — that’s how you became a senior developer.

A really good point on thinking about longevity in the things you build:

> Use stable open source tools if that option exists because if you build something in house you are now saying “this tool, in addition to our product, is something that we need to maintain and staff.”
>
> Write code that’s small and easy to delete...when you optimize for deletion, you don’t have to write code that’s valid five years in the future...[google scale] you should be building features for 500 rather than optimizing for 5 million...weight the tradeoffs and choose the thing that will make your team more productive, not the thing that will make your app best in ten years.
