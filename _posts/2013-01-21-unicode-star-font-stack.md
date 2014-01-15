---
layout: post
title: Miscellaneous Unicode Symbols, Font Stacks, and You
date: 2013-01-21
tags: tips
---

I needed a star symbol in my design. That's how this all started. I wanted to use something other than an image to display the star on screen for various reasons:

1. I wanted the star to be different colors in different contexts and I didn't want to create an image of the star for each variance. 
2. I wanted the star to be crisp and clear, which meant I'd have to create multiple sizes of the image for retina screen support.

So rather than create a handful of stars as images (in different colors and sizes) I decided to try using the black star symbol in Unicode (U+2605, &amp;#9733).

## Unicode and Font Stack Correlations
I began by simply inserting the character reference in my markup with the default CSS font-size of 1em and font stack of Helvetica. However, I stumbled on an inconsistency in modern browsers: the unicode star was rendering at different sizes in browsers that implement different rendering engines.

![Black Star Unicode Using Helvetica and Arial Unicode MS](http://jim-nielsen.com/images/2013/black-star-unicode-arial-helvetica.png)

Notice the size difference? It appears the black star unicode symbol is not supported by my default stack of Helvetica. In order to display the character, each browser is resorting to a font of it's own choosing that *does* support it. In this case, each browsers is choosing a different font; hence the size discrepancy. 

By resorting to a font stack that supports the black star glyph (in this case Arial Unicode MS), I achieved consistent sizing across browsers. You can see the differences and similarities in this blown up photo:

![Zoomed in Photo of Black Star Unicode Glyph](http://jim-nielsen.com/images/2013/black-star-unicode-arial-helvetica-zoomed.png)

## But Wait, There's Always IE
Of course, if you're trying to support IE, throw everything I just said out the window. The black star wasn't displaying in IE 7 & 8 on Windows XP. This is because Windows XP, by default, didn't have a font that supports the black star glyph using standard Unicode. However, if the user had additional fonts installed, like the ones that come with MS Office, I'm guessing this technique would probably work. I'll leave that up to someone else to test.

## Conclusion

If you're going to use Unicode symbols, make sure you're using a font that supports them. If you don't, you'll find some strange inconsistencies across browsers. Here is Wikipedia's take:

> The Miscellaneous Symbols Unicode block (2600–26FF) contains various glyphs representing things from a variety of categories …  these [characters] may not display properly if your computer does not implement Unicode and have the proper fonts installed. Also, some browsers may not display certain symbols properly at all even if your computer has the required implemented Unicode and fonts. - [Wikipedia](http://en.wikipedia.org/wiki/Miscellaneous_Symbols)

I started realizing consistent Unicode support across browsers and platforms was a rabbit's hole I didn't want to go down any further. So I switched my implementation technique to [icon fonts](http://css-tricks.com/examples/IconFont/), which was much more bullet-proof.


