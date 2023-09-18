# Notes from “Weathering Software Winter” by Devine Lu Linvega

I watched [this talk](https://www.youtube.com/watch?v=9TJuOwy4aGA)[^1] where the presenter details their experience trying to use modern digital devices while living on a boat with little to zero connectivity.

> It soon became obvious that all the technology [we planned to use] was not designed to leave the western world.

It was a fresh perspective given their unique context, which is was so far divorced from my day-to-day experience of making software (sitting at home with a desk, $1,000+ of computing hardware, and a wired internet connection pumping hundreds of Mbps):

> To give you a picture of what it looks like to use a modern stack in places where you're not supposed to, imagine two people in a small sailboat in the tropics…[and there’s] us, trying to lift a smartphone in a ziplock bag up the mast so we'd have one bar of signal trying to update Xcode which at the time was 11GB. We had this stack of 2GB mobile data [cards] and with Xcode you can't resume a download if it fails. But, we could swap the codes for the cards if we did it within 10 seconds it would only detect like a timeout and then would continue. But the problem is that if you're not done by 6pm, the sun is setting and our batteries are dying and if you're at 7GB [downloaded] and we have three more hours left to download...after a while it was just silly.

Really paints a picture of how fragile modern digital hardware and software is to any kind of transplantation outside a very specific context (e.g. access to ubiquitous internet connectivity and power).

What follows are a few of the excerpts that stuck out to me and why I liked them.

## Making A Fast Website Requires You Have Slow Internet

This is how you start a talk: a bold assertion that cuts against the status quo right out the gate.

> To make fast software, you need slow computers.

Which means all of us on our M[insert_number_here] laptops are incapable of making fast software.

Well, that’s obviously not _entirely_ true, but it does make you think:

- Is it possible to make fast software with a fast computer?
- Is it possible to make a fast website with a fast internet connection?

Obviously, yes, it is. But it does make you question whether a faster computer/network is working for or against you in that goal. 

The point I take away is: we’re pretty lousy at solving problems we’re personally divorced from.

It takes constant mindfulness to be otherwise.

## Tools Like Figma Not Only Own Your Data, They Own Your Skillset

It’s interesting to think about a “skill” as something that can’t be taken away from you by a corporate entity. Drawing is a skill. Singing is a skill. Using Figma?

When you learn a piece of proprietary software, you  become a tenant to it. You use it (and often pay for it) but it can be taken away at any moment, which means the ability to exercise your expertise and skillset in that tool is also taken away.

> Learning a service (like learning Photoshop)…isn't really like learning a skill, like learning to draw. You learn how to operate within the constraints and confines of someone else’s playground and if that rug is pulled from underneath you there's nothing you can really say. And you never really understood how it worked in the first place so you can't replicate it. 

Just like that, you’re no longer “good” at computers.

> I wanted a way of doing computers that nobody could take away from me.

This is a really great argument against becoming an expert at any one tool, like Figma, and instead spending your time learning to build websites with the technology of the open web: HTML, CSS, and JS.

> In some cases you think you've developed a skill, like [working in Photoshop or Illustrator], and all of the sudden you realize that skill you thought you had is actually entirely owned by someone else. Even though you've been paying for that software for years, the moment you can't have access to authenticate yourself, that skill is taken away. This really scared us.

## Constraints

I kinda love this sentiment:

> I know myself. I don't like programming that much. And in the future I'm probably going to hate it more. So I want my future self to reimplement my entire system, at most, in a weekend.

Imagine putting that constraint on any side project you took on!

Maybe that’s crazy, but what I took away as the essence of this talk was that perhaps we could do a lot more with less in computers.

This was best summed up by the presenter in their own words:

> I don't think we've even begun to scratch the surface with what can be done with little.


[^1]: I originally watched [the video on Vimeo](https://vimeo.com/780005704) but then when I returned to my notes to publish this post, the video was gone — and I hadn’t even written down the presenter’s name yet! So [I asked about it on Mastodon](https://mastodon.social/@jimniels/111044932360293976) and some people quickly helped me realize [the presenter](https://100r.co/site/home.html) is well-known. I also realized I should’ve dropped [the Vimeo link in to the Wayback Machine](https://web.archive.org/web/20230119082822/https://vimeo.com/780005704) and I would’ve found what I was looking for, but at least this way I now have multiple links to the video including the YouTube one linked above. TY people of the fediverse!