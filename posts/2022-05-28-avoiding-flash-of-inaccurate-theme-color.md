#css

# Avoiding Flash of Inaccurate Theme Color

[Firing off a quick post here about a rather simple problem I suppose I should’ve known the answer to, but didn’t. So I’m documenting it in case, someday, somebody else has the same question.]

Are you running into a nasty case of [flash of inAccurate coloR Theme (FART)](https://css-tricks.com/flash-of-inaccurate-color-theme-fart/)?

I’d been noticing it on my [icon gallery sites](https://www.iosicongallery.com) but not any of my other sites so I was wondering what was wrong.

I figured it had to be a difference in implementation, as my icon gallery sites were [the first sites I implemented dark mode on](https://blog.jim-nielsen.com/2018/icon-galleries-dark-mode/), so like many things, I probably did it wrong the first time and never went back and fixed it.

Here’s what I was seeing: when in dark mode, I’d see the page flash from light to dark as I transitioned between page requests.

<video
  controls
	src="https://cdn.jim-nielsen.com/blog/2022/fart-white-flash.mp4"
	width="1046"
	height="720">
</video>

There’s no synchronous JavaScript at play here applying dark mode classes or the like. It’s only `@media (prefers-color-scheme)`. So why is it flashing like this?

My first thought was, “I don’t think I knew about [color-scheme](https://blog.jim-nielsen.com/2020/color-scheme-property/) when I  did dark mode here, maybe that’s why?” So I added `color-scheme: light dark` to my CSS. It didn’t fix my issue, but it did do _something_: it changed from a light to dark flash between page requests, to a dark to slightly lighter dark flash between page requests.

<video
  controls
	src="https://cdn.jim-nielsen.com/blog/2022/fart-dark-flash.mp4"
	width="1056"
	height="720">
</video>

Interesting—but I’m still seeing the flash, so problem not solved.

As I looked at my CSS trying to think what the problem might be, I realized my page background color was being applied to the `<body>` element and not the root or `<html>` element. My first thought was, “Well I should stick it on the root, that just seems proper.” But as I was changing it, I remembered [Chris’ CSS-Tricks post from way back](https://css-tricks.com/just-one-of-those-weird-things-about-css-background-on-body/) and my brain thought, “I wonder if this is _actually_ the fix?”

Sure enough, that fixed the problem!

<video
  controls
	src="https://cdn.jim-nielsen.com/blog/2022/fart-no-flash.mp4"
	width="1032"
	height="720">
</video>

So: if you’re seeing a flash of color as you transition between pages in dark mode (and you’re not doing anything sophisticated like applying dark mode classes via JavaScript) chances are you might just be applying your page’s background color to the wrong element! Put it on `:root` or `html` element, not on the `body`!