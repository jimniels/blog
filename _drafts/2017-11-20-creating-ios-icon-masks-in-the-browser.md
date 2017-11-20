---
title: Creating iOS Icon Masks in the Browser
date: 2017-11-08
tags: engineering tips
---

For some time I’ve been maintaining [iOS Icon Gallery](http://iosicongallery.com), a site dedicated to showcasing great icon designs for iOS. This post is a look at just one piece of engineering that site: mimicking the iOS-style rounded icons.

## A Little Background on iOS Icons

The icons in iOS are pretty iconic in their shape. Just look at the silhoutte of one and you’ll probably think “iPhone”:

![iOS icon silhouette]({{ site.imageurl }}/2017/iosicons-silhouette.png)

In iOS, all icons must conform to this shape. This is in contrast to Android, for example, where your icon can take whatever shape you want (while having transparency or not having transparency, up to you). Hence, when you’re creating an icon for iOS it’s not a blank canvas, there are constraints like a lack of transparency and a requirement for square artwork.

The shape of the icon’s mask is defined at the system level and applied automatically by iOS. So the actual image file submitted by app developers is just a square image and the corners are masked by iOS.

![iOS icon with and without mask]({{ site.imageurl }}/2017/iosicons-icon-with-and-without-mask.png)

What if you’re displaying an iOS icon on the web? Creating this same effect on has got to be easy right? ... RIGHT?! I have three words for you: cross-browser support.

### How Apple Does It

So if you want to display a bunch of iOS icons on the web how would you do it?

Well, a good place to start would be to see how Apple does it. If you look up an app preview in iTunes Preview (let’s say [Angry Birds](https://itunes.apple.com/us/app/angry-birds/id343200656?mt=8)) and open the browser’s dev tools, you can see how Apple displays iOS icon artwork using web technologies.

So how do they do it? Each icon is merely an `<img>` tag. Adjacent to the image tag, there’s a `<span class="mask">` tag which leverages CSS to load and position another image, which acts as a mask, on top of the icon. Try removing the mask and all you’ll see is the square icon.

![Masking an image in HTML/CSS]({{ site.imageurl }}/2017/iosicons-itunes-preview.gif)

If you look closely at the `<span class="mask">` and it’s background image, you’ll see it has three distinct pieces:

1. A transparent area in the shape of the iOS mask
2. An opaque white background outside the area of the transparent mask
3. A 1px, semi-transparent, inner border around the mask shape

![Anatomy of an iOS icon mask]({{ site.imageurl }}/2017/iosicons-mask-anatomy.png)

The reason you need the 1px border is because some icons have white backgrounds. So, if you did’t have a border in the shape of the iOS mask, you wouldn’t get that iconic iOS shape around the image.

![Need for a border]({{ site.imageurl }}/2017/iosicons-border-need.gif "Note how when the mask with a border is removed, the icon doesn’t have any shape.")

Even for icons that aren’t on a pure white background, the 1px inset border still provides a nice aesthetic that varies in perceptibility based on the color intensity of the underlying icon.

![Border comparison]({{ site.imageurl }}/2017/iosicons-inner-border-comparison.png "Note the semi-transparent border which blends in to the underlying icon at varying degrees, depending on the color.")

### How I Did It

When I first created the gallery showcasing iOS icons, CSS3 properties like `border-radius` were just barely gaining support. I know it seems hard to imagine now, but even getting consistent results across browsers for `border-radius` back then was really hard. I remember using all the vendor prefixes and still seeing inconsistent results. When applied specifically to an `<img>` tag, some browsers would mask the image and thus hide the overflow while others would not. I know this might seem hard to imagine now, but writing `border-radius` wasn’t as easy as you kids have it today.

So, I decided to take the approach Apple took and have a transparent PNG that would cover the icon. I had to create a variety of sizes for these masks (1024px, 512px, 256px, 128px) since I was displaying icons at a variety of sizes on my site.

![iOS icon masks in photoshop]({{ site.imageurl }}/2017/iosicons-masks-psd.gif "Note the transparency of the masks and how they would overlay the icons.")

### Then Along Came iOS 7

Because icon masks were applied at the system level, Apple was able to make programmatic refinements and tweaks to how icons displayed in iOS over time. For example, pre-iOS7, icons used to have a mask as well an (optional) highlight applied by the operating system:

![Pre iOS7 icon example]({{ site.imageurl }}/2017/iosicons-early-versions-ios.png)

Additionally, in versions of iOS prior to iOS 7, the mask for an icon was essentially just a square with a border radius. However, with the introduction of iOS 7 the icon mask shape changed in a subtle way. Icon designers were some of the first to notice the change. They dubbed it the [“squircle”](https://applypixels.com/the-hunt-for-the-squircle/) (image courtesy of [manbolo blog](http://blog.manbolo.com/2013/08/15/new-metrics-for-ios-7-app-icons)).

![Diff between iOS6 and iOS7 icons]({{ site.imageurl }}/2017/iosicons-ios6-ios7-diff.gif "Note the subtle difference in the icon’s corners pre- and post-iOS7")

Before Apple officially released a template for the icon mask, there was a lot of discussion in the design world about how to achieve this particular shape, including sophisticated, mathematically-precise formulas for calculating the icon mask’s curvature at the corners (as it was no longer a traditional rounded square with a border radius—image courtesy of [this article](https://applypixels.com/the-hunt-for-the-squircle/)).

![iOS 7 icon radius math formula]({{ site.imageurl }}/2017/iosicons-math-formula.png)

Eventually, Apple released an official icon template in vector format which helped designers everywhere know precisely what shape their icons would take at the system level. Side note: if you’d like to read an interesting proposition as to why Apple made this rather subtle change to their iconic icon shapes on iOS, go read [this article on curvature continuity](https://hackernoon.com/apples-icons-have-that-shape-for-a-very-good-reason-720d4e7c8a14)).

Accordingly, I had to update the bitmap icon masks on iosicongallery.com to take the shape of the iOS7 “squircle”. After all, the site is primarily a site for iOS icon designers seeking inspiration, so pixel-level precision is something they’ll notice.

## The Problem I Set Out To Solve

Using transparent PNG masks has served as a viable method for creating iOS icon masks for a number of years. For a while I thought I’d be able to replace this bitmap approach with an approach using `border-radius` directly on the `<img>` element, but with the advent of the “squircle” in iOS7, those hopes went out the window. However, my hopes and prospects for a more browser-native approach to image masking have improved as browsers continue to improve, but no concrete use case for ditching transparent PNGs as image masks had surfaced ... until now.

One of the things I was playing around with on my gallery site was a the idea of a “quick preview” of a full-sized icon. Initially I thought, “well I’ll just throw the icon in a modal”. So playing around with it in the browser, I came up with this:

![Icon in a modal]({{ site.imageurl }}/2017/iosicons-modal-mask.jpg "Just a traditional modal: the icon on top of the overlay.")

Do you see my problem with this approach? The main content of the modal, the icon, is sitting on top of a semi-transparent modal overlay. However, the mask of the icon is not transparent at all. This means that if any part of the icon mask is overlaying content underneath, you’ll see the white edges of the mask.

![Icon in a modal indicating problematic areas]({{ site.imageurl }}/2017/iosicons-modal-mask-problem.jpg "Note the corners of the icon mask overlaying the content underneath.")

One of the other things I wanted to archive with this icon “quick preview”  was to mimic the blur aesthetic found in the newer versions of iOS. For example, when triggering the modal overlay, rather than just having a semi-transparent background overlay, I wanted to have it blur the underlying content. This actually wasn’t that difficult thanks to the advances in CSS. I was able to progressively enhance this aesthetic into my design by leveraging the `filter: blur()` CSS property. For modern browsers, this means you get the nice iOS aesthetic of blurring background content while bringing foreground content into sharp focus. However, as you’ll notice, this only further intensified the problem of overlaying an image mask on the icon, as the white corners of the mask became even more evident.

![Icon in a modal with blurred background]({{ site.imageurl }}/2017/iosicons-modal-mask-blurred.jpg "With the blurred background, the mask’s white corner edges stood out even more.")

What I wanted, was a modal that looked like this:

![Icon in a modal with blurred background]({{ site.imageurl }}/2017/iosicons-modal-desired-effect.jpg "This was the effect I wanted, with real image masking on the icon.")

The effect itself seems pretty simple. It’s just a masked image. Any graphics editing software worth a dime could do this. But the browser isn’t a graphics editing program and masking images in the browser (at least up until recently) wasn’t possible. That’s why I created the workaround described earlier which places an image with transparent sections on top of another image in the browser to achieve the illusion of an image mask. But we’ve come a long way in since I first implemented this workaround. I’d heard rumblings of image masking in CSS but never had to actually use it, so this seemed like the perfect opportunity to do some research and figure out how to mask images natively in the browser.

### Possible Solutions

My main goals for enhancing my current approach to masking iOS icons were:

1. Do true image masking directly in the browser, thus avoiding any unsightly mask corners when icons are displayed on top of other content or other colors besides white
2. Come up with a pixel-agnostic solution (likely with SVGs) so as to avoid the need to create @2x and @3x versions of a raster image mask

I sat down and gave the problem a few minutes of thought. I asked myself, “what are all the possible ways I could achieve a ‘squircle’ mask in the browser?” I came up with the following solutions:

- Apply the mask directly to the original source image
- Use `border` and `border-radius` in CSS
- Use `clip-path: url(#mask.svg)` in CSS
- Use `mask-image: url(#mask.svg)` in CSS

### Directly Mask the Image

The idea here was that when I created a new post for my gallery, just save the actual image as a transparent PNG with the corners already cut-off in the shape of the squircle.

I didn’t want to rule out any ideas immediately, but this one was off the table as a solution as quickly as I’d added it. Apple applied the image mask at the OS level for good reason: it allowed them the flexibility to change icon masks in the future without having to generate new image files. This already had happened once when the icon shape changed from iOS 6 to iOS 7. And in the future it could change again and then all the source images for my gallery site would be outdated.

So this was a no-go.

### CSS: `border` and `border-radius`

As discussed earlier, using the `border` and `border-radius` properties in CSS would be sufficient if we were dealing with pre-iOS 7 icons. But it wasn’t good enough for achieving the “squircle” shape. Now I know what you’re thinking “geez, come on, the difference between the two is soooo miniscule, nobody will ever notice the difference.” However, I would counter that notion with this: the main users of this site are designers and they literally make a living off noticing and making use of 1px differences. So I knew I had to achieve the exact iOS effect for the site to be of any use.

However, one useful thing I thought of when considering this option was that `border` and `border-radius` *could* work as a good-enough, graceful degradation fallback. In other words, if I could find a cutting-edge CSS property that allowed me to do native image masking in the browser whose browser support was limited to modern browsers only, `border-radius` seemed like a good fallback choice to achieve a “close-enough” iOS icon masking effect. After all, if you’re a modern iOS designer who painstakingly scrutinizes icon designs on a large retina screen but you use IE9, sorry dude I have no sympathy for you. You get the “close-enough” version of the site.

### CSS: `clip-path`

After doing [a little](https://css-tricks.com/clipping-masking-css/) [research](https://codepen.io/yoksel/full/fsdbu) on image masking, I came across the `clip-path` property which seemed promising at first because of the relatively-good browser support for it. However, after playing around with it for a bit, I encountered a few problems that ended up being deal breakers.

First: the responsiveness of `clip-path` has much to be desired. In fact, it doesn’t really work. The `objectBoundingBox` attribute can fix this, but then you have to resize all your SVG units to be in 1×1 pixel ratio. Eric Meyer had a [clever little workaround](http://meyerweb.com/eric/thoughts/2017/02/24/scaling-svg-clipping-paths-for-css-use/) for this, but I actually could never really quite get it working (though in theory, it *should have* worked). In the end, I took Apple’s vector icon mask and shrunk it down to 1×1 pixels in Sketch and then exported it as an SVG to get my units correct. But even then I found other problems with `clip-path`.

Second: browser support for `clip-path` is complicated. Support appears relatively broad at first glance, but you have to be careful. There’s a difference between support for `clip-path` on SVG elements and support for it on HTML elements. `clip-path` is essentially just a rule that says “hey browser, mask this element with this image mask I have defined”. If you want to use `clip-path` *inside* an SVG element, browser support is really good. But that’s not what I was trying to do. I wanted to use `clip-path` on an HTML element (specifically an `<img>` element). For example, my usage would look something like this: `img.icon { clip-path: url(#mask.svg) }`. This is basically telling the browser, “hey for all `<img>` elements with the class `icon`, go get the `mask.svg` file and apply it as a mask to the HTML element.” Unfortunately, browser support for this varies considerably, even in modern browsers. In fact, even modernizr didn’t support testing for `clip-path` (well they did, but only for SVG elements, not for HTML elements because [apparently it’s hard](https://github.com/Modernizr/Modernizr/issues/213)).

In the end, this solution wouldn’t really work for me because I didn’t have a reliable way to test for support and provide a fallback as needed. 

### CSS: `mask-image`

Finally I came to `mask-image`, which is used in a similar manner to `clip-path` where you target your HTML element and then specify your image mask, which can be a vector SVG i.e. `img.icon mask-image: url(#my-mask.svg)`.

Support for `mask-image` is [relatively good](https://caniuse.com/#search=mask-image) for modern browsers. Plus it works great, as opposed to `clip-path`, because I can use it in conjunction with `@supports` in CSS, thus providing me a concrete way to test for support because every browser that supports `mask-image` also supports `@supports`. So I could easily provide a fallback to `border-radius` when the browser can’t interpret `@supports` and `mask-image`. My final code looked something like this:

```scss
// For browsers that can't mask, just do a border and border-radius
img.icon {
	border-radius: 22.5%;
	border: 1px solid rgba(0, 0, 0, 0.125);
}

// For browsers that can mask, you get the squircle and a 1px border
@supports (mask-size: cover) or (-webkit-mask-size: cover) {
	img.icon {
		// Override the above borders
		border-radius: 0;
		border: none;
		-webkit-mask-image: url(/shared/img/ios-mask-512.svg);
		-webkit-mask-size: cover;
		mask-image: url(/shared/img/ios-mask-512.svg);
		mask-size: cover;
		// more stuff here...
	}
}
```

In the end, this solution solved great because it solved all my problems:

- Pixel agnostic? Check. Use an SVG to define your mask.
- True image masking? Check. The browser handles it all.
- Graceful degradation? Check. Just use `@supports`

#### A side note

The trickiest part of this ended up being supplying the 1px border around the icon. When you use `mask-image`, you’re SVG is essentially just a shape that the browser uses to mask. You can’t have additional graphical elements in there. So here’s what I had to do.

First, I created my image mask. I could define this at any size I wanted because I used the `mask-size` property to have the mask fill the dimensions of its parent. This was the easy part.

I thought about doing the same thing for my mask’s border. Just define one size and let it scale. But there were a few problems with this approach. First, you [don’t get to choose the positioning of SVG borders](https://stackoverflow.com/questions/7241393/can-you-control-how-an-svgs-stroke-width-is-drawn). They are always applied at the center (image courtesy of [sketchapp](https://www.sketchapp.com/docs/styling/borders/)).

![Border positioning example]({{ site.imageurl }}/2017/iosicons-border-position.jpg "With SVGs, all borders are positioned at the center.")

The problem here is that I needed the position to be on the inside, so that the semi-transparent border could overlay the underlying content. This is the exact effect Apple used and that’s what I was striving for in terms of pixel-level precision.

This meant I would have to create my icon mask borders myself. First I leveraged the vector icon Apple provides for the squircle shape. Then I outlined the mask with a 1px inner border in sketch, then converted that shape to an outline. Again, the reason it has to be outlined is because even as an “inner” border in sketch, it will end up as a “centered” border when exported to SVG. 

![Border positioning example]({{ site.imageurl }}/2017/iosicons-border-outline.png)

The one downside here is that I had to export all the different sizes I was using the shape at because, as outlines, if they were ever scaled in the browser they would scale below 1 pixel. I view this as an implementation detail that I will likely be able to resolve in the future once the SVG spec allows border positioning specification. If that came to pass, I would be able to specify one shape with a correctly-positioned border whose shape can scale to any size. However, for now, I have a simple export for all my SVG shapes I need.

![Screenshot of SVG exports]({{ site.imageurl }}/2017/iosicons-svg-exports.png)

These end up being displayed as pseudo elements on top of the actual icon’s `<img>` element. So the underlying icon image is natively masked by the browser and the 1px icon border is a SVG outline on top of it the icon as a pseudo element.

![Screenshot of icon modal overlay with SVG border on icon mask]({{ site.imageurl }}/2017/iosicons-svg-border.jpg)

## Conclusion

This was the long way of saying “How To Do iOS Icon Masks in the Browser”. I gave all the background information as a way of saying “don’t just take my word for it, but here’s how I arrived at the solution I propose here”. In the future, there are probably two more enhancements I’d make to this:

1. More semantic markup: currently I have to wrap every icon’s `<img>` element in a `<span>` in order to achieve the effect I want. This `span` serves no other purpose than presentation but I need it for the icon mask’s border which is a pseudo element of the `span` (since you can’t have a pseudo element on an `<img>` tag).
2. Define one border in SVG and apply everywhere, even in the case of responsiveness where the SVG shrinks

Hope you enjoyed this exhaustive look at doing a rather simple thing.

