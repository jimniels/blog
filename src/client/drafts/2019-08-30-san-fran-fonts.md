---
title: Reading Notes, August 2019
tags: readingNotes
---

I recently watched Apple’s [“Introducing the New System Fonts”](https://developer.apple.com/videos/play/wwdc2015/804/), which is a recording of a presentation at WWDC 2015 that introduced the San Francisco font. While the talk was focused on the San Francisco font specifically, it provided an overview of a number of good typographic principles and how they were applied to the design of the San Francisco fonts. 

![Weight similitude]({{site.imageurl}}/2019/sf-weight-similitude.png)
![Weight similitude]({{site.imageurl}}/2019/sf-dissimilar.gif)
![Weight similitude]({{site.imageurl}}/2019/sf-monospace-vs-proportional-numbers.gif)
![Weight similitude]({{site.imageurl}}/2019/sf-proportional-numbers-for-static-labels.gif)


> Visual perception is largely about illusion.

Example of square and circle and you want to make them look like the same size. Mathematical alignment will make the circle look shorter. Or even to make them appear as though they are of the same area, the circle must be larger.

> to make shapes look similar, they often have to be made dissimilar. 

Example of slides where text alignment on the slide itself appears centered when it’s not actually centered.

Example where you have to make larger text a lighter weight than smaller text in order to have them appear similar.



For SF family, Text weights come in 6 weights. Display fonts come in 9 weghts. Why? The extreme weights of the family are designed for titles, so it doesn’t make sense to use them below 20pt (and text is designed for 20pt or less, so no need for them there).

Proportional numbers by default, Monospace by opt-in. Differences?

## Display vs. Text 

![Selection of variety of SF fonts in Sketch]({{site.imageurl}}/2019/sf-font-selection.png)


![Display sizes vs. text sizes]({{site.imageurl}}/2019/sf-display-vs-text.png)
![Display sizes vs. text i]({{site.imageurl}}/2019/sf-display-vs-text-i.png)

I actually never knew which was which
“Display” fonts are for larger text
“Text” fonts are for smaller text
The system (text set in iOS0 adjusts that for you, so you don’t have to. But if you’re using a design application like photoshop, you are supposed to switch yourself, depending on your usage context.\

![Display weights]({{site.imageurl}}/2019/sf-display-weights.png)
![Text weights]({{site.imageurl}}/2019/sf-text-weights.png)

Don’t draw the font at a small size and draw up. You won’t get all the smarts that went into it. Draw it at the size you need, so you get display text instead of regular text.

![Screenshot of talk detailing differences between upscaling font size and choosing a specific one]({{site.imageurl}}/2019/sf-point-sizes.png)
