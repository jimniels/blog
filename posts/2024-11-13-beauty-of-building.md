# The Beauty of Building

[Jan Miksovsky has an absolutely tremendous article](https://jan.miksovsky.com/posts/2024/11-12-momboard) about how he cobbled together some disparate pieces of hardware and software in order to help improve the quality of life of his mother who has amnesia.

Everything about this article illustrates what got me into making websites.

Everything about this article is what fuels my curiosity and interest in continuing to make boring little websites.

But first, a quick overview of Jan’s story. First, the problem:

> the side-effects of a long surgery left my mom with permanent anterograde amnesia…[she] still lives on her own in an apartment. Because she cannot remember things, she goes through each day in a state of low-grade anxiety about where her grown children are and whether they are all right.

To help alleviate this, he dreamed up a solution:

> I thought some sort of unobtrusive, always-on device installed in her apartment might be able to show her notes written by my siblings and me.

But technological solutions are famously fickle and rarely easy. How do you introduce a new device into someone’s life when you can’t teach them how to use it because their mind is incapable of remembering?

Not easy stuff. But Jan’s imposed set of constraints on any solution are a great start. The solution has to be:

> resilient to network failures

> not enshittified with a subscription service or proprietary App Store

He gives insights into the technical details:

> Since it’s essentially impossible to debug anything that happens on the device, I made as much use of vanilla HTML and CSS as possible.

Boring is good! Even the “backend” where the family posts notes sounds like just an absolutely lovely little website:

> A small web app manifest lets us save the Compose page to a phone’s home screen as an icon for quick access.
>
> The whole site is tiny, entails no build process, and with the exception of the service (below) is just static files.

Jan’s retrospective is wonderful from the human side:

> Looking back, the display is essentially the only intervention of any kind we’ve tried that’s actually been successful at improving her quality of life (and ours). One reason it’s worked so well is that it didn’t require her to learn anything new. Without the ability to remember new things, it’s virtually impossible for her to learn a new skill or to form new habits.

And the technical retrospective is wonderful as well:

> For my part, keeping the software as simple as possible and sticking to vanilla web technologies surely helped avoid bugs.

It reminds me of the early years of the web, when nobody quite knew what was possible with all this web stuff. If you knew enough about how to [patch things together](https://daverupert.com/2022/09/patchability-of-the-open-web/) on this big open standard, you could do some pretty magical things for people.

Not magical in the sense of “Hey, I think I uncovered something that I can generalize into a product and then provide as a service to the entire world” — though there was plenty of that coming out of the early days of the web.

But magical more like the way a great cook would improvise a meal for a small group of hungry people based on their needs and what was available in the pantry at the moment.

That magic of using your digital fluency to scrappily cobble together some disparate technologies in service of helping solve the unique problem of an individual loved one or friend. No scale. No monetization. No buzzwords. No grand upside potentiality.

Just building cool shit for people you love on the ethos of an open platform. 