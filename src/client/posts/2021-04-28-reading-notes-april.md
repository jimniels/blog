#readingNotes

# Reading Notes, April 2021

## Video: [Earthrise](https://vimeo.com/296530275)

A beautiful reflection on the story behind Apollo 8 and their capturing of the “earthrise” photograph—the first photo of Earth from space.

> We didn't have any specific directions about the use of photography. We were all on the earth, so we all knew about the earth. They wanted photographs of something that was unusual [like] close-ups of the far side of the moon. The earth? It was strictly secondary.

More than the documentary details of the earth-rise photo, this is a musing on our existence in the cosmos. 

## Article: [“Realign 2020: Realigned”](https://tylergaw.com/blog/realign-2020-realigned/)

> I made the classic mistake. I started out with small updates; type, color, logo. And published those posts after each chunk of work. But then? I made a mess. I made a git branch with the ominous name "rebuild." So, of course, that turned into an amorphous catch-all.

Been there. Done that.

> That leads to feelings of lack of accomplishment and a constant feeling of something in the distance that you know you want to get to, but can't will yourself to move towards. I guess? I dunno? Who knows? What was I even talking about? Oh yeah. Web design.

Tyler updated his site and I absolutely love it.


## Article: [“Don’t think like a database”](http://robinrendle.com/notes/dont-think-like-a-database.html)

> If the data or the back-end requires you to do something, it doesn't mean that's how users should think about a problem. It's a common mistake in UI design...complexity on the back-end doesn't mean you should show that complexity on the front-end....
> 
> It's hard doing that though because first you have to understand the back-end. Then you have to unlearn it.

Like Robin, I struggle with this as well. There’s forever a tension between how the system works, how the end user thinks about the task they want to accomplish, and what timeline you have to bridge the gap between the two.

## Article: [“2021 Redesign or: How I Learned to Stop Art Directing and Love the Blog”](https://reaganray.com/2021/03/05/2021-redesign.html)

> Art-directed blog posts are a trap. For instance, I have a silly little post about hair band albums that I've been nudging for months. I couldn't get it to look how I wanted, and I ended up scrapping the idea. Mind you, the post took about an hour to write. I could have pushed send at that point and gone on to the next post. I asked myself: how many more posts could I have written instead of trying ten different shades of 80s-inspired pink?
>
> I realized that if I cared about publishing in any consistent manner, I'd have to give up the obsessive art-directed posts (which is hard to do when it's a creative outlet). So I decided to keep some flexibility to art direct; I'd just put up some constraints. Dave Rupert has a great (and practical) article about art-directed posts that made a lot of sense to me. Instead of giving myself total freedom, I've limited the number of decisions I can make. I can change the font, and I can change the color scheme.

Like Regan, I feel the tension of art directed posts being an impediment to publishing.

My goal (right now) is to write and publish, so I do it over and over. This helps me become better at writing and by extension thinking.

My goal (right now) _is not_ to get better at making things look awesome. If that were my goal, I’d likely take on art directed posts again. 

But there’s always that question: are people coming to your blog to _read it_ or to _look at it_? 

## Article: [CSS Working Group FAQs](https://wiki.csswg.org/faq)

I’ve never found myself with the need to use [physical lengths in CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units#lengths) such as `in`, or `cm`, or `mm`.

Nonetheless, I stumbled on this historical background describing why real-world units in CSS has been and will be a failure. I found it intriguing:

> Originally, all the “real world” units were meant to be accurate physical measurements. However, in practice most people authored content for 96dpi screens (the de facto standard at the time of early CSS, at least on PCs) which gave a ratio of 1in = 96px, and when browsers changed that ratio because they were displaying on different types of screens, webpages that implicitly assumed the ratio was static had their layouts broken. This led us to fixing a precise 1in:96px ratio in the specs, and the rest of the physical units maintained their correct ratios with inches.
> 
> Later, Mozilla attempted to address this again, by adding a separate “mozmm” unit that represented real physical millimeters. This ran into the second problem with real physical units - it relies on the browser accurately knowing the actual size and resolution of your display. Some devices don't give that information; others lie and give info that's only approximately correct. Some displays literally *cannot* give this sort of information, such as displaying on a projector where the scale depends on the projection distance. Authors also used mozmm for things that didn't actually want or need to be in accurate physical units, so when mozmm and mm diverged, they were sized badly.
> 
>  The overall conclusion is that trying to present accurate real-world units is a failure; browsers can't do it reliably, and authors often misuse them anyway, giving users a bad experience

## Article: [“Remote to who? A working letter”](https://tinyletter.com/aworkinglibrary/letters/remote-to-who-a-working-letter)

Lots of folks online are linking to this article by Mandy Brown—and for good reason. Here’s what resonated with me:

> I am not actually a fan of the “remote” terminology: I prefer to talk of teams as being either co-located or distributed, as those terms describe the team not the individual. After all, no one is remote all by themselves. But if we’re going to be stuck with that term, and it seems like we are, then we have to ask—remote to who? Perhaps you are remote to your colleagues, but you can be deeply embedded in your local community at the same time. Whereas in a co-located environment, you are embedded in your workplace and remote to your neighbors.

And then this:

> Because if remote work gives us anything at all, it gives us the chance to root ourselves in a place that isn’t the workplace. It gives us the chance to really live in whatever place we have chosen to live—to live as neighbors and caretakers and organizers, to stop hoarding all of our creative and intellectual capacity for our employers and instead turn some of it towards building real political power in our communities.

And this:

> As offices start to reopen there are going to be more and more pieces about the minority of CEOs who buck the trend of hybrid remote work and tell their entire staff to get back to their desks full-time. They will say it’s because collaboration and creativity are better when people are all in the same room, that the companies who continue to pay for expensive offices will end up with a competitive advantage. I promise you those CEOs are the ones looking at the balance sheet and doing a calculation in their head that says that even though remote work might save them millions on real estate, the transfer of power to their employees would be too great to make that a good deal.

## Article: [“How to make an ineffective 404 page”](https://ericwbailey.design/writing/how-to-make-an-ineffective-404-page/)

> If you make websites, a thing you should know is that complete redesigns are oftentimes political, and not stemming from user demand. It’s a move to claim ownership over those who came before you.

From now on, whenever I see a redesign announced to the world, I am going to ask myself: “hmmm...I wonder who is claiming control over what over in that business?”

## Article: [“Non-Fungible Taylor Swift”](https://stratechery.com/2021/non-fungible-taylor-swift/)

> It’s not that “art is important and rare”, and thus valuable, but rather that the artists themselves are important and rare, and impute value on whatever they wish.

I’m late to the Taylor Swift re-recoding her own album news, but  found Ben’s take intriguing.

## Quote: Edward Tufte and the data-to-ink ratio

Found [here](https://stasaki.com/designer-as-writer/8/):

> In the book The Visual Display of Quantitative Information, data visualization designer Edward Tufte introduced the data-ink ratio concept, which is the proportion of ink devoted to the non-redundant display of data-information.
> 
> From this, Tufte derives one of his most famous principles: “Erase non-data-ink, within a reason. Ink that fails to depict statistical information does not have much interest to the viewer of a graphic; in fact, sometimes such non-data-ink clutters up the data, as in the case of thick mesh of grid lines.”

## Article: [“Why Obama Fears for Our Democracy”](https://www.theatlantic.com/ideas/archive/2020/11/why-obama-fears-for-our-democracy/617087/)

> If we do not have the capacity to distinguish what’s true from what’s false, then by definition the marketplace of ideas doesn’t work. And by definition our democracy doesn’t work. We are entering into an epistemological crisis.

This excerpt is what drew me in to this interview. It’s long, but there were a number of insights in it that stuck out to me. I’ve noted some for myself elsewhere, but I wanted to note a few here in a professional vein.

First up, this observation about life being like high school is interesting. It might be maddening at first, but as Obama points out, it should be empowering:

> You’re in high school and you see all the cliques and bullying and unfairness and superficiality, and you think, Once I’m grown up I won’t have to deal with that anymore. And then you get to the state legislature and you see all the nonsense and stupidity and pettiness. And then you get to Congress and then you get to the G20, and at each level you have this expectation that things are going to be more refined, more sophisticated, more thoughtful, rigorous, selfless, and it turns out it’s all still like high school. Human dynamics are surprisingly constant. They take different forms. It turns out that the same strengths people have—flaws and foibles that people have—run across cultures and are part of politics. This should be empowering for people. 

Lastly, I wanted to note Obama’s own admitted disposition towards optimism intertwined with this idea of forgoing changing the world and instead iteratively improving the world;

> I think it is possible to be optimistic as a choice without being naive...[However] being optimistic doesn’t mean that five times a day I don’t say, “We’re doomed.”...
>
> The point I sometimes make [is] “Can we make things better?”
> 
> I used to explain to my staff after we had a long policy debate about anything, and we had to make a decision about X or Y, “Well, if we do this I understand we’re not getting everything we’re hoping for, but is this better?” And they say yes, and I say, “Well, better is good. Nothing wrong with better.”

Nothing wrong with better, indeed.
