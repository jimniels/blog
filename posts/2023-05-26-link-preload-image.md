# Link Preload as Image

I’ve been playing with [these fancy new view transitions](https://daverupert.com/2023/05/getting-started-view-transitions/) and my experience thus far is that they work ok on localhost, but as soon as I push code to a preview branch on a remote server, the image loads between transitions are [janky because of image loading](https://twitter.com/jimniels/status/1661557620719734785?s=20).

<img src="https://cdn.jim-nielsen.com/blog/2023/view-transition-slow-img.gif" width="465" height="344" alt="Animated gif of icon loading slowly between transitions." />

Granted, transitions are behind a flag so unexpected glitches are expected.

But transitioning images across views — especially from a small thumbnail on a list view to a full size image on a detail view — seems like _such_ a common use case. I’m sure [they’ll figure this out](https://twitter.com/bramus/status/1662014937080774657?s=20)

[Bramus pointed out](https://twitter.com/bramus/status/1661726370076975104?s=20) I should try [preloading the image](https://web.dev/preload-responsive-images/#preload-overview) on the detail page.

Duh, I should be doing that regardless of whether I’m trying to  make view transitions work!

In fact, on a site like [my icon gallery](https://macosicongallery.com), the large image icon is literally the “raison d'être” of the page itself — that’s what you’re there, to see the big, beautiful icon! There’s no asset more crucial on that page than that one, I should be preloading it!

There’s a nice [web.dev](https://web.dev/preload-responsive-images/#preload-overview) article on the subject, but I like to get varying perspectives and explanations when trying to understand something. So I searched to learn more. Of course [Chris had already written on it](https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/) and explains it in the way only he can. And, again unsurprisingly, [Stefan had a helpful resource](https://www.stefanjudis.com/today-i-learned/how-to-preload-responsive-images-with-imagesizes-and-imagesrcset/) on preloading too.

In essence, you want to tell the browser that that a certain image exists on the page and is super important before the prescanner discovers it.

I think of it kind of like when I tell my wife a story about our kids. I start with, "Ok, don't worry, everyone is fine, but...[story about some crazy thing the kids did].” A little heads up goes a long ways.

On my icon detail page, I have:

```
<img src="icon.png" srcset="icon@2x.png 2x">
```

So, to tell the browser it’s gonna need that image before it parses to that point in the HTML, I include this in the `<head>`:

```
<link rel="preload" as="image" href="icon.png" imagesrcset="icon@2x.png 2x" />
```

If you're not up to speed on this one — like I was — might be a good ‘un to familiarize yourself with now.