---
tags: engineering iconGalleries
---

# SVG Stroke Positioning, iOS Masks, and the Browser

This is a follow up post to a topic I’ve written about previously around [masking iOS icons for display in the browser](https://blog.jim-nielsen.com/2017/creating-ios-icon-masks-in-the-browser/).

I was able to implement a single, reusable vector image in the shape of a “squircle” for _masking_ icons at any size.

However, I wasn’t able to create a single, reusable vector image in the shape of a “squircle” for _outlining_ icons at any size. To do that, I had to create a vector image at each specific size—which feels like defeating the purpose of doing vector images.

<img src="https://cdn.jim-nielsen.com/blog/2021/ios-icons-all-masks.png" width="1117" height="862" alt="Screenshot of various SVG masks in the shape of iOS icons at multiple sizes." />

From an implementation perspective, what I was trying to achieve was a single “squircle” shape with an _inner_ 1px border that could be resized to fit any area, from 64 pixels up to 512 pixels square.

This wasn’t possible as a pure border in SVG because, while you can use `vector-effect="non-scaling-stroke"` to keep the 1px border from scaling in size as you scale the image, SVGs don’t allow you to position borders. Borders are drawn from the center of the stroke and [you can’t change that](https://stackoverflow.com/questions/7241393/can-you-control-how-an-svgs-stroke-width-is-drawn) (at least at the time of this writing).

My dilemma was that I could get a 1px _centered_ border at variable sizes, but I couldn’t get a 1px _inner_ border at variable sizes.

In 2021, you can dictate the position of the border in a design tool like Sketch but not in the SVG file you export (image courtesy of [Peter Nowell](https://medium.com/sketch-app-sources/sketchs-brilliant-new-way-to-export-borders-as-svg-bc8fc5f6d5b1)).

<img src="https://cdn.jim-nielsen.com/blog/2021/ios-icons-svg-borders.png" width="640" height="380" alt="Screenshot depicting inner, outer, and centered border positioning for vector strokes along with support for each by Sketch and the SVG spec." />

How to deal with this dilemma? [Peter Nowell has a great article](https://medium.com/sketch-app-sources/sketchs-brilliant-new-way-to-export-borders-as-svg-bc8fc5f6d5b1) on the subject where he notes three solutions (along with superb animations of the solutions, you should check them out):

1. Outline your borders (this is what I did originally)
2. Use centered borders, but manually reposition the points yourself
3. Use centered borders, but double the border width and mask the overflow

## Option 1 (What I Was Doing)

Number one is what I did originally. It works, but the purist in me doesn’t allow me to sleep at night when I have to create multiple sizes of the same image: that’s the very antithesis of vector images! 

## Option 2 (What Won’t Work in My Case)

Number two is interesting. In essence, you redraw the shape but slightly inset with a centered border. In my case, for example, rather than draw a 128px image with a 1px _inner_ border (not possible with SVGs), I draw a 127px image with a 1px _centered_ border and position it half a pixel inside it’s normal bounds. 

<img src="https://cdn.jim-nielsen.com/blog/2021/ios-icons-respositioned-and-resized.png" width="1453" height="985" alt="Screenshot of Sketch showing a vector stroke aligned on a half pixel edge." />

This works and is a neat trick. But it becomes problematic in my case as the SVG scales in size. When it goes from 128px to 512px in size, the half pixel positioning of the x/y edges fudges slightly. Not a ton, but just enough to become noticeable. Once I changed the SVG to be scalable to its containing box, notice how its position relative to its edges become flexible and no longer bleed to the edges:

<img src="https://cdn.jim-nielsen.com/blog/2021/ios-icons-resized-position.png" width="947" height="981" alt="Screenshot of two different iOS borders, where the larger iOS border doesn’t bleed to the edge of the frame." />

This could be user error. Perhaps I’m not configuring my SVGs properly. But I could also see it being due to proportional resizing: the inset proportionally resizes as the image does, so it’s not always one half of a pixel inset, but rather a percentage that grows as the image does.

## Option 3 (What I’m Now Doing)

The idea here is actually quite elegant: since all SVGs will draw borders from the center, draw the border where you normally would, but double its size to 2px: 1px being an _inner_ border and 1px being an _outer_ border. Then mask your same shape so the _outer_ border doesn’t show.

<img src="https://cdn.jim-nielsen.com/blog/2021/ios-icons-mask-border.gif" width="976" height="740" alt="Animated gif showing the outer border 1px border of a 2px stroke get masked beyond the edge of its parent frame.">

When paired with `vector-effect="non-scaling-stroke"` and a resizable artboard, this works perfectly for my exact use case! No matter the size, 64px, 128pz, 256px, 512px, 1024px, or more, the SVG scales and positions itself perfectly, leaving a 1px inner semi-transparent border around my icons. This is precisely what I need for accurately displaying iOS icons in the browser (as laid out in [my original post](https://blog.jim-nielsen.com/2017/creating-ios-icon-masks-in-the-browser/)).

This is what I’m doing today for my [iOS Icon Gallery](https://www.iosicongallery.com) and I can now sleep at night, knowing I’ve got a single vector image that can scale infinitely in size  to the needs of the context.

As for the purist in me, well, he is sort of content. He still wants inner, outer, or centered borders supported natively in SVG. When that comes along, I’m sure there will be another blog post where I switch to that so I can sleep even more soundly at night.