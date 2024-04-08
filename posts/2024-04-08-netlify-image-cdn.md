#iconGalleries #netlify

# Implementing Netlify’s Image CDN

**tl;dr** I implemented [Netlify’s new image transformation service](https://docs.netlify.com/image-cdn/overview/) on my icon gallery sites and saw a pretty drastic decrease in overall bandwidth. Here are the numbers:

| Page | Requests | Old | New | Difference
| - | - | - | - | 
| Home | 60 | 1.3MB | 293kB |  ▼ 78% (1.01MB)
| Colors | 84 | 1.4MB | 371kB | ▼ 74% (1.04MB)
| Designers | 131 | 5.6MB | 914kB | ▼ 84% (4.71MB)
| Developers | 140 | 2.5MB | 905kB | ▼ 65% (1.62MB)
| Categories | 140 | 2.2MB | 599kB | ▼ 73% (1.62MB)
| Years | 98 | 4.7MB | 580kB | ▼ 88% (4.13MB)
| Apps | 84 | 5.2MB | 687kB | ▼ 87% (4.53MB)

For more details on the whole affair, read on.

## A Quick History of Me, Netlify, and Images

This post has been a long time coming. Here’s a historical recap:

- A git repo with tons of images gets unwieldy very quickly. Netlify’s solution to this was [Large Media](https://docs.netlify.com/git/large-media/overview/) which leveraged [gitlfs](https://git-lfs.com/) (don’t worry if you don’t know what that is or how it works, I never could figure it out either) to store images and then Netlify’s [large media image transform service](https://docs.netlify.com/git/large-media/transform-images/) to serve them on your website.
- I run my [icon](https://www.iosicongallery.com) [gallery](https://www.macosicongallery.com) [sites](https://www.watchosicongallery.com) on Netlify and had all my images in git which resulted in problems on GitHub (YUGE repo, >1GB) and build problems on Netlify. [I looked into their Large Media service but decided against it](https://blog.jim-nielsen.com/2019/netlify-public-folder-part-ii-why/).
- Time passed and we got new image formats on the web like webp which [I looked into using for my icon gallery sites](https://blog.jim-nielsen.com/2021/courting-webp/) but decided against because I couldn’t make it all work easily with Netlify (and avif support was coming).
- More time passed and we got cross-browser avif support but still there was no good way to use with Netlify ([I continued to wish for it in the forums](https://answers.netlify.com/t/improved-image-optimisation-on-netlify-netlify-large-media/2565/22?u=jimniels)).
- Folks continued to languish with git + lots of images on Netlify. My choice to not use it was [vindicated by an old friend’s pain](https://mastodon.social/@tylergaw/110950961082106816).
- At last, in November 2023, [Netlify launched their new image CDN service](https://www.netlify.com/blog/introducing-netlify-image-cdn/). I took it for [a brief spin and was immediately impressed](https://mastodon.social/@jimniels/111449400557658203).
- Given my positive first impressions, I finally took the time to implement it on my icon gallery sites.
- I write this blog post to celebrate. It took a while, and perhaps a few wrong turns with LFS, but I think Netlify nailed it with this solution. (That said, [what the pricing will be is still unclear](https://answers.netlify.com/t/a-few-questions-about-netlify-image-cdn/106714/2?u=jimniels) at the time of this writing, so take that into consideration.)

Phew.

Ok, so now let’s get into the details of implementing [Netlify’s image CDN](https://docs.netlify.com/image-cdn/overview/).

## How It Works

The gist of the feature is simple: any image you want transformed, just point it at a Netlify-specific URL and their image service will take care of the rest.

For example: instead of doing this:

```html
<img src="/assets/images/my-image.png">
```

Do this:

```html
<img src="/.netlify/images?url=/assets/images/my-image.png">
```

And Netlify’s image service will takeover. It looks at the headers of the browser making the request and will serve a better, modern format if supported. Additionally, you can supply a bunch of parameters to exercise even greater control over how the image gets transformed (such as size, format, and quality).

## How I Use It

Given [my unique setup for delivering images](https://blog.jim-nielsen.com/2022/netlify-public-folder-part-iv/), I spent a bit of time thinking about how I wanted to implement this feature.

Eventually I settled on an implemntation I’m _really_ happy about. I use Netlify’s image CDN in combination with their [redirects](https://docs.netlify.com/image-cdn/overview/#redirects-and-rewrites) to serve the images. Why do I love this? Because if something breaks, my images continue to work. It’s kind of like a progressive enhancement use of the feature.

Previously, I had multiple sizes for each of my icons, so paths to the images looked like this:

```html
<img src="/ios/512/my-icon.png">
<img src="/ios/256/my-icon.png">
<img src="/ios/128/my-icon.png">
```

Using Netlify’s redirects rules, I kept the same URLs but added a single query param:

```html
<img src="/ios/512/my-icon.png?resize=true">
<img src="/ios/256/my-icon.png?resize=true">
<img src="/ios/128/my-icon.png?resize=true">
```

Now, instead of serving the original PNG, Netlify looks at the size in the URL path, resizes the image, and converts it to a modern format for supported browsers.

There’s more going on here as to _why_ I chose this particular setup, but explaining it all would require a whole different blog post. Suffice it to say: I’m really happy about how this new image CDN feature composes with other features on Netlify (like the redirects engine) because it gives me tons of flexibility to implement this solution in a way that best suites the peculiarities of your project.

## How It Turned Out

To test out how much bandwidth this feature would save me, I created a PR that implemented my changes. It was basically two lines of code.

From there, Netlify created a preview deploy where I could test the changes. I put the new preview deploy up side-by-side against what I had in production. The differences were pretty drastic.

For example, the site’s [home page](https://www.iosicongallery.com) has 60 images on it, each displayed at 256px if you’re on a retina screen. It resulted in a 78% drop in bandwidth.

Additionally, the index pages for icon metadata (such as the [designers page](https://www.iosicongallery.com/designers))  can have up to 140 image on them. On a retina screen, 60 of those are 256px and 80 are 128px. They also a huge reduction in overall bandwidth.

<img src="https://cdn.jim-nielsen.com/blog/2024/netlify-img-service-side-by-side.png" width="1000" height="555" alt="A side-by-side screenshot of the designers index page for iOS Icon Gallery. On the left is the “old” page and on the right is the “new” page. Both websites look the same, but both also have the developer tools open and show a drastic drop in overall resources loaded." />

Here’s the raw data showing the difference in overall resources loaded across different pages of the old and new sites (the old serving the original PNGs, the new serving AVIFs).

| Page | Requests | Old | New | Difference
| - | - | - | - | 
| Home | 60 | 1.3MB | 293kB |  ▼ 78% (1.01MB)
| Colors | 84 | 1.4MB | 371kB | ▼ 74% (1.04MB)
| Designers | 131 | 5.6MB | 914kB | ▼ 84% (4.71MB)
| Developers | 140 | 2.5MB | 905kB | ▼ 65% (1.62MB)
| Categories | 140 | 2.2MB | 599kB | ▼ 73% (1.62MB)
| Years | 98 | 4.7MB | 580kB | ▼ 88% (4.13MB)
| Apps | 84 | 5.2MB | 687kB | ▼ 87% (4.53MB)

Out of curiosity, I wanted to see what icon in my collection had the largest file size (at its biggest resolution). It was a ridiculous 5.3MB PNG.

<img src="https://cdn.jim-nielsen.com/blog/2024/netlify-img-service-biggest-files.png" width="612" height="498" alt="Screenshot of macos finder showing a list of PNG files sorted by size, the largest one being 5.3MB." />

Really I should’ve spent time optimizing these images I had stored. But now with Netlify’s image service I don’t have to worry about that. In this case, I saw the image I was serving for that individual icon’s URL go from 5.3MB to 161kB. A YUGE savings (and no discernible image quality loss — AVIF is _really_ nice).

When something is “on fire” in tech, that’s usually a bad thing — e.g. “prod is on fire” means “all hands on deck, there’s a problem in production” — but when I say Netlify’s new image CDN is on fire, I mean it in the positive, NBA Jam kind of way.