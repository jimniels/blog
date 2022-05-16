# Principles of Color? Going Beyond sRGB

[Jen asked](https://twitter.com/jensimmons/status/1508484189875806210) on Twitter: 

> Web developers, of all the new technology shipping in browsers this year, what are you most excited to learn, while simultaneously overwhelmed by the idea you gotta go learn it?

[My response](https://twitter.com/jimniels/status/1508487212631048207) was around all the new color stuff:

> Colors: hwb, lab, oklab, lch, oklch, color(), p3, etc. And not just the syntax, but when, how, and why you would use any of them over the others.

Chris wrote, in the way only he can, [a layman’s intro to all this new color syntax/gamut stuff over on CSS-Tricks](https://css-tricks.com/new-css-color-features-preview/). That helps. And there’s more [great resources on the subject out there](https://css-tricks.com/the-expanding-gamut-of-color-on-the-web/).

But I’m still struggling a bit. But to better explain why, let me take a step back.

There’s a revolution happening in color. Craig wrote about its coming years ago on [the Iconfactory blog](https://blog.iconfactory.com/2016/04/looking-at-the-future/). He pointed out how, thanks to innovations like the Retina Display,  screens could no longer improve by getting denser. Our biology as humans became the limiting factor because pixel density beyond a certain point can’t be perceived by our eyes and therefore provides no additional value. Therefore the only way for display makers to improve screens (and gain a competitive advantage) is to make them “deeper” by showing a wider range of color. Enter the new color gamuts we’re seeing like Display P3. Here’s Craig:

> Over the coming years, displays that only show sRGB are going to feel as antiquated as ones that can only display @1x resolution. And the only way you’re going to be able to cope with all these new kinds viewing environments is with a thing called “color management.”

The retina screen is an interesting parallel. When the retina screen came out, a different kind of revolution began to take place on the web centered around pixel density.

All of the sudden there was a pressing need to begin creating raster graphics with higher resolutions—@1x, @2x, @3x naming conventions anyone?—to support these new displays. If you didn’t, your websites didn’t look ✨good✨.

Or, the even sleeker solution was to start creating all the graphics you could in a vector format like `.svg` and serving those. Where @2x versions of images provided a solution to a problem, vector graphics removed the problem entirely.

The beautiful thing about adapting to screens with high pixel density was that, once you understood the principles of how they worked, you could design for them without actually having to own a high pixel density display. “Use vector where you can, otherwise serve multiple versions of raster images with the appropriate media query”. If I followed these guidelines, I could trust the implementation would look good without actually needing to see it. No hardware dependency to create or test graphics.

Now, as we begin to enter this new world of displays with wider color gamuts, I’m left wondering: are there underlying principles for designing in these colors beyond sRGB which would allow you to eschew seeing them and still feel comfortable using them?

As a designer, is it possible for me to make design decisions around these new color gamuts without actually owning a display capable of displaying them? How do you pick a suitable color if you can’t see it? Can you? Should you?

As a really basic example of what I’m trying to get at, if I’m on an device that only allows looking at sRGB, can I: 

- choose a vibrant, accessible red in the rgb gamut,
- convert it to display-p3,
- modify the display-p3 value (according to some formula), and then
- trust that this enhanced color (on supported devices) will look better while remaining accessible?

If anyone knows of a good article that answers these questions, please hit me up.

I get the sense, as Craig predicted, that color is going to become a lot more complicated than it has been for the last few decades.

> There’s no getting around the fact that color is a complicated subject: you’re dealing with both the physics of electromagnetic radiation and the physiology of our eyes and brains. The things that produce and sense color in our world are inherently complex.
>
> For the past 20 years, we’ve had it easy. We could rely on just red, green and blue to get the job done. But as displays become deeper and smarter, that’s about to change.
>
> We’re all going to have to face the music.

I’ve been reading [Craig’s book on color management](https://abookapart.com/products/making-sense-of-color-management) (I don’t pretend to understand it all) and there is a chapter around color management on the web. However, I still don’t quite grasp how (or if it’s even possible) to use these new colors upon principle alone. I get the sense that you can’t design for these new gamuts unless you have the hardware to do so. 

In short: it’d be nice to have some [declarative design principles](https://adactio.com/journal/18982) for color that span hardware and gamuts, allowing you to design according to the principle and let the outputs render variedly, according to the strengths of each user agent.

With these new colors, the display of a web page is about to get even more varied which means trying to exert any kind of control or expectation of uniformity is a path to madness. The only thing to do is embrace the diversity of devices accessing the web and to build accordingly.