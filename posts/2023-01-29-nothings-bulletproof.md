# Nothing’s Bulletproof

[Tyler](https://tylergaw.com/) is a super smart web designer. I’ve known him for a long time and have always admired his work. I mean, just look at the fun on his home page:

<img src="https://cdn.jim-nielsen.com/blog/2023/tyler-gaw-website.gif" width="396" height="472" alt="Animation showing the squiggling line and rotating circle on tylergaw.com" />

So when [he tagged me on Mastodon](https://mastodon.social/@tylergaw/109773405716485185) asking about an AVIF/iOS bug — which I was not familiar with — I was super intrigued. Here’s Tyler:

> iOS 16 added support avif images, but seems like there could be bugs? Seeing support for the image/avif image type, so avif version loads, but then displays as a broken image. https://tests.caniuse.com/avif 

What could it be?

I went down [a rabbit hole of image optimization](https://blog.jim-nielsen.com/2019/down-the-rabbit-hole-of-image-optimization-tooling/) a while back, trying to decide if I should support newer image formats on my [icon](https://www.iosicongallery.com) [gallery](https://www.macosicongallery.com) [sites](https://www.watchosicongallery.com). The one takeaway I remember was this: AVIF seemed incredibly promising in its capability to preserve quality while drastically decreasing file size. However, browser support at the time was not great.

Fast-forward to 2023 and I still haven’t seriously considered revisiting AVIF, though I know [support has been broadening](https://www.coywolf.news/webdev/safari-supports-avif-in-macos-ventura-and-ios-16/).

So hearing what Tyler had to say about his own mileage with AVIF piqued my interest. In general, I like to let other people smarter than me bleed on the edge. Then I catch the second wave and learn from all their cuts and bruises.

Thankfully, Tyler [blogged about what he found out](https://tylergaw.com/blog/ios-16-avif-fix/). What struck me most in his post was how proper he served his images yet still had a nasty bug.

> I've been using AVIF images throughout this site since about 2020. I use the `source` element with `srcset` to provide AVIF, WEBP, and JPG or PNG formats for most images. This worked until iOS shipped support for AVIF. Before then, iOS would just not recognize the AVIF format and use WEBP instead.
> 
> With AVIF support, iOS started recognizing and loading AVIF images…[but] there would be a missing image. Either blank, in Chrome iOS, or the little blue question mark in Safari iOS.

It seems like he did all the right things: multiple image formats (old and new) with semantic markup allowing the client to choose the best supported experience. Yet he still had issues — on a modern browser nonetheless.

The beautiful theory of new image formats like AVIF is that you can leverage HTML to provide a baseline experience that works across the most clients possible (using an old format like PNG) and then, for clients that support it, provide additional markup for the new fancy formats of the present, like WEBP or AVIF.

```html
<picture>
  <source type="image/avif" srcset="…" />
  <source type="image/webp" srcset="…" />
  <img src="….png" srcset="…" alt="…" />
</picture>
```

In this way, modern clients that support a new format like AVIF can fetch those resources and ignore the others while older browsers will just fetch the PNG image.

In Tyler’s case, he did everything right but the modern clients were still failing. They were looking at the HTML and saying, “Oh yeah, we support AVIF. Let’s fetch that!” But then the AVIF images were failing to render in the browser.

Why? Here’s Tyler:

> TL;DR: [You’ll have to] re-encode any AVIF images that aren't working. There have been AVIF spec changes and there were bugs in popular encoders that caused AVIF not to work in iOS.

I was a little surprised when I first saw this was the problem. [I joked](https://mastodon.social/@jimniels/109773680963077592) that, “images are software now. you have to update (e.g. re-encode) between major versions or things break.”

But in all seriousness, there’s a good reminder in Tyler’s experience for me.

To keep things from breaking on the web, the idea is to build with new technologies (e.g. client APIs or image formats) by layering experiences on top of each other. Start with a baseline and enhance. If you build this way, you can watch support become more ubiquitous and not have to change a thing (or at least very little).

However, as Tyler’s example shows, just because you layer in a new technology doesn’t mean it’ll work for any browser that adopts support for it. Burgeoning technologies change constantly and even layered experiences can break. Not because the experience isn’t supported. On the contrary, it very well might be supported, just in an earlier, non-compatible form.

Resiliency is important, but it’s not being bullet proof. Nothing’s bullet proof, even with modern clients. 