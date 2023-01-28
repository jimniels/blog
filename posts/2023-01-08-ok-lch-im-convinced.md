# OK LCH, I’m Convinced

Here’s Josh delivering a fascinating tidbit about LCH color in his recent post [“Color Formats in CSS”](https://www.joshwcomeau.com/css/color-formats/):

> LCH isn't linked to a particular color space, and so we don't know where the upper saturation limit is. It's not static: as display technology continues to improve, we can expect monitors to reach wider and wider gamuts. LCH will automatically be able to reference these expanded colors by cranking up the chroma. Talk about future-proofing!

Wait, what?!? LCH syntax has an eye towards future-proofing?? I did not know this!!

I’ve heard LCH proponents talk about why they prefer it — usually it has to do with how it accounts for human perception in color changes. Here’s [Lea Verou](https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/):

> In LCH, the same numerical change in coordinates produces the same perceptual color difference. This property of a color space is called “perceptual uniformity”. RGB or HSL are not perceptually uniform.

That’s neat and solves a real problem I’ve encountered in color transformations.

But this “future-proofing” business? I love that! Granted, technology will always be changing, but a new API that aims for longevity is a hype train I can jump on — and hopefully ride for a very long time. Switching from hex to rgb to hsl to hwb to who knows what next over the years can be a bit exhausting.

Lea explains how LCH is designed to represent the entire spectrum of what humans can see. As such, chroma for example, is theoretically unbounded in the syntax allowing for increased saturation values as hardware improves:

> In HSL, saturation is a neat 0-100 percentage, since it’s a simple transformation of RGB into polar coordinates. In LCH however, **Chroma is theoretically unbounded**. LCH (like Lab) is designed to be able to represent the entire spectrum of human vision, and not all of these colors can be displayed by a screen, even a P3 screen. Not only is the maximum chroma different depending on screen gamut, it’s actually different per color.

Josh illustrates how this concept works in this intriguing code example:

```css
.red-box {
  /* This is a very-red box in sRGB: */
  background: lch(50% 120 20);
  
  /*
    This is an identical color in sRGB, but will appear
    MUCH REDDER in the wider-gamut displays of the future:
  */
  background: lch(50% 500 20);
}
```

Note how the chroma value is jacked up super high? It’s representing a color visible to the human eye but maybe only visible on certain hardware. 

And that’s the beautiful part: this all builds on the idea of progressive enhancement. If a color you specify in LCH is outside the gamut of a given monitor (e.g. you specify a YUGE chroma value) browsers will scale back the value to the closest approximation of that color given the supported hardware. Here’s Lea again:

> While the lack of boundaries can be somewhat unsettling (in people and in color spaces), don’t worry: if you specify a color that is not displayable in a given monitor, it will be scaled down so that it becomes visible while preserving its essence. After all, that’s not new: before monitors got gamuts wider than sRGB, this is what was happening with regular CSS colors when they were displayed in monitors with gamuts smaller than sRGB.

Perceptual uniformity? An eye towards longevity? Future-proofing syntax? Graceful fallbacks? Aligned with human anatomy? OK LCH, I’ll jump on your bandwagon.

One color syntax to rule them all!

(BTW: [this post](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl) on LCH, and color in general on the web, was super helpful for me too!)

## Update 2023-01-09

Dan Peterson, who works on 1Password, [ping me on Mastodon](https://mastodon.social/@danvpeterson/109660316334309838) noting his love for OKLCH after using it on a color token project. He also passed along a bunch of links he found useful during his research. I haven’t gone down the rabbit hole of all these, but they all look super useful so I’m appending them here. Thanks Dan!

- [“A perceptual color space for image processing”](https://bottosson.github.io/posts/oklab/)
- [Okhsv and Okhsl](https://bottosson.github.io/posts/colorpicker/)
- [“It’s time for a more sophisticated color contrast check for data visualizations”](https://blog.datawrapper.de/color-contrast-check-data-vis-wcag-apca/)
- [“An interactive review of Oklab”](https://raphlinus.github.io/color/2021/01/18/oklab-critique.html)
- [“Designing Color Systems — Transparent vs. Solid Shades”](https://uxplanet.org/designing-color-systems-transparent-vs-solid-shades-9eb841571fdd)
- [“Why APCA as a New Contrast Method?”](https://git.apcacontrast.com/documentation/WhyAPCA)
- [APCA Contrast Calculator](https://www.myndex.com/APCA/)
- [OKLCH Color Picker & Converter](https://oklch.com/)
- [Interactive color picker comparison](https://bottosson.github.io/misc/colorpicker/#8c2d2d)
- [Color.js](https://colorjs.io/)

## Update 2021-01-11

In case you’re wondering, the consensus seems to be: you should be using `oklch` and not `lch` because `oklch` fixes a bug in `lch` (and adds a few new features).

But that `ok` prefix, where did that come from? [I asked on Twitter](https://twitter.com/jimniels/status/1612487807871623169):

> dumb question: is it called "oklch" because it fixes a bug in lch and so it's the "ok" version of lch to use? i can't discern where the "ok" comes from...

And it sounds like that actually is the case, ha! [Here’s Björn Ottosson](https://twitter.com/bjornornorn/status/1613211390600450049), creator of Oklab:

> In many cases simpler models are more practical to use, and should give OK results. Not a lot of effort has gone into finding such simple models though. Oklab/Oklch is my attempt at addressing that, to get OK results without being too complicated.