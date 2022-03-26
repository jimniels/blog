#readingNotes

# Reading Notes, June 2019

## Article: [“What I Learned Co-Founding Dribbble”](https://medium.com/dribbble/what-i-learned-co-founding-dribbble-8680f6816e3d) by Dan Cederholm

A lot of good reflection in here on Dan’s personal experiences. But what I really liked was this take on keeping a healthy perspective of your digital work in conjunction with the other things in life that are important:

> One thing all of this [digital design work] has in common is that it’s all gone. It doesn’t exist anymore. Kaput. Deleted.
>
> Now you can either get really depressed about how digital work is so disposable, or you can view that as a positive. That you can continue to reinvent yourself and your work.
>
> Remember how important some of this stuff seemed at the time? Emergency meetings? Calls while on vacation? There are no lives at stake here. It’s here and then it’s replaced. Something I try to keep in mind when things start getting a little urgent and stressy.
>
> ...while pixels can disappear and your work is temporary, people and relationships stick around. Soon, you’ll realize they are the most important part of all of this. Long after the work is gone, if you do things right, you’ll have good people, friends, co-workers, future co-workers around you that will be much more valuable than the things you created.

## Video: [“The Faker You Are, the More Successful You Can Be”](https://www.youtube.com/watch?v=bEg5ySTUGxE) by Pablo Stanley

While specifically targeted at designers and the design industry, I thought this was a rather (comedic) talk on the culture of the technology at large. It’s kind of written in the spirit of the old tale “The Emperor’s New Cloths”, a way of saying “look at these moments in your professional life and realize that nobody is wearing any clothes”.

A couple quotes I liked:

> that’s the spirit of the creative: always carrying that soul-crushing insecurity

> the more buzzwords you use, the less you have to explain your actual design thinking.

> “empathy map”, “user journey maps”, we’re kinda crazy about maps, I don’t know what it is, probably because we’re lost [as an industry].

## Article: [“Why I don't use web components”](https://dev.to/richharris/why-i-don-t-use-web-components-2cia) by Rich Harris

> I think that websites should work without JavaScript wherever possible. Web components don't.

This is a pretty good summary of my feelings in dealing with web components. I particularly like his points about progressive enhancement. I’ve only found web components particularly useful for pieces of your UI that are intrinsically interactive or really small, discrete pieces of UI that can be progressively enhanced quite easily (like [Github’s time-elements](https://github.com/github/time-elements)).

## Article: [“Freedom”](http://inessential.com/2019/04/23/freedom)

I thought this was an interesting set of musings about the liberating feeling that comes with a true “personal” computer—a computer that you can do what you want, when you want, how you want—and how that freedom has eroded over time. I think it’s another side of [the thoughts I wrote a couple months back about software product interface design](https://blog.jim-nielsen.com/2019/your-product-doesnt-have-to-look-the-same-on-every-platform/). It’s the rationale behind why I can’t move to an iPad as my primary computing device.

> Maybe because I lived through this — maybe because I’m a certain age — I believe that that freedom to use my computer exactly how I want to, to make it do any crazy thing I can think of — is the thing about computers.
>
> That’s not the thing about iOS devices. They’re great for a whole bunch of other reasons: convenience, mobility, ease-of-use.
>
> You can do some surface-level automation, but you can’t dig deep and cobble together stuff — crossing all kinds of boundaries — with some scripts the way you can on a Mac. They’re just not made for that. And that’s fine — it’s a whole different thing.

Later:

> With every tightened screw we have less power than we had. And doing the things — unsanctioned, unplanned-for, often unwieldy and even unwise — that computers are so wonderful for becomes ever-harder...But if we don’t have this power that is ours, then I don’t actually care about computers at all. It meant everything.

## Article: [“Perceived Velocity through Version Numbers”](https://daverupert.com/2019/04/perceived-velocity/) by Dave Rupert

> A single number bump replaces a mountain of marketing

Dave muses on the versioning numbers behind HTML, CSS, and JavaScript:

> In JavaScript, there’s a never-ending stream of libraries, frameworks, polyfills, importers, bundlers, alterna-script languages, and performance problems to write about. It’s sure to dominate the daily programming news cycle. HTML and CSS don’t really have that position and luxury any more. In many ways, the switch to a “Living Standard” have made them dead languages, or at least mostly-dead. New language features don’t show up like they used to, or at least I don’t see the release notes anymore.
>
> I’m on a bit of a quest to understand why these three technologies built to work together are so unequally yoked in popularity and their communities polarized. One end of the spectrum experiences a boom while the other experiences a bust. The rising tide does not lift all boats.

## Article: [“Codeacademy vs. The BBC Micro”](https://twobithistory.org/2019/03/31/bbc-micro.html)

An interesting look at how the UK government tried to educate their citizens about computers in the 70’s, and how their approach back then compares to the way we “teach computers” now-a-days.

I really liked the author’s points. Especially the idea of teaching general computing principles, not what code to write to make a computer do something, but how and why the computer requires you to write code to run programs (emphasis mine):

> “Learn to code” is Codecademy’s tagline. I don’t think I’m the first person to point this out—in fact, I probably read this somewhere and I’m now ripping it off—but there’s something revealing about using the word “code” instead of “program.” It suggests that the important thing you are learning is how to decode the code, how to look at a screen’s worth of Python and not have your eyes glaze over. I can understand why to the average person this seems like the main hurdle to becoming a professional programmer. Professional programmers spend all day looking at computer monitors covered in gobbledygook, so, if I want to become a professional programmer, I better make sure I can decipher the gobbledygook. But **dealing with syntax is not the most challenging part of being a programmer, and it quickly becomes almost irrelevant in the face of much bigger obstacles**. Also, armed only with knowledge of a programming language’s syntax, you may be able to read code but you won’t be able to write code to solve a novel problem.

> As I’ve written before, I suspect learning about computing at a time when computers were relatively simple was a huge advantage. But perhaps another advantage these people had is shows like The Computer Programme, which strove to teach not just programming but also how and why computers can run programs at all. After watching The Computer Programme, you may not understand all the gobbledygook on a computer screen, but you don’t really need to because you know that, whatever the “code” looks like, the computer is always doing the same basic thing. After a course or two on Codecademy, you understand some flavors of gobbledygook, but to you a computer is just a magical machine that somehow turns gobbledygook into running software. That isn’t computer literacy.

> I’m banging the drum for “general principles” loudly now, so let me just explain what I think they are and why they are important. There’s a book by J. Clark Scott about computers called “But How Do It Know?” The title comes from the anecdote that opens the book. A salesman is explaining to a group of people that a thermos can keep hot food hot and cold food cold. A member of the audience, astounded by this new invention, asks, “But how do it know?” The joke of course is that the thermos is not perceiving the temperature of the food and then making a decision—the thermos is just constructed so that cold food inevitably stays cold and hot food inevitably stays hot. People anthropomorphize computers in the same way, believing that computers are digital brains that somehow “choose” to do one thing or another based on the code they are fed. But learning a few things about how computers work, even at a rudimentary level, takes the homunculus out of the machine.

## Article: [“if statements and for loops in css”](http://www.quirksmode.org/blog/archives/2019/03/if_statements_a.html)

An novel take on CSS selectors as if statements and for loops:

```css
menu a {
  color:red;
}
menu a:first-child {
	color: blue;
}
menu a:not(#current) {
	color: red;
}
```

Now do that imperatively in JS:

```
for (all menus) {
	for (all links in this menu) {
		let first = [figure out if this is the first link in the menu]
		if (first) {
			link.color = 'blue'
		} else if (link.id !== 'current') {
			link.color = 'red';
		}
	}
}
```

> The drawback of the JavaScript version is that it’s more verbose than the CSS version, and hence more prone to error. The advantage is that it offers much finer control than CSS. In CSS, we’ve just about reached the limits of what we can express. We could add a lot more logic to the JavaScript version, if we wish.
>
> In CSS, we tell the browser how links should look. In JavaScript, we describe the algorithm for figuring out how an individual link should look.

## Article: [“The web we broke.”](https://ethanmarcotte.com/wrote/the-web-we-broke/) by Ethan Marcotte

> At the end of February, WebAIM published an accessibility analysis of the top one million home pages. The results are, in a word, abysmal...And we failed. I say we quite deliberately. This is on us: on you, and on me. And, look, I realize it may sting to read that.

But this piece isn’t just a criticism. I like Ethan’s resolution towards building a more-accessible web. It’s a practice I think I could incorporate into anything I want to learn.

> The only way this work gets done is if we start small, and if we work together. Instead of focusing on “accessibility” writ large...aim to do one thing this week to broaden your understanding of how people use the web, and adapt your design or development practice to incorporate what you’ve learned.
>
> Or at least, that’s what I’m going to do. Maybe you’d like to join me.
