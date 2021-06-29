---
tags: iconGalleries
---

# Courting WEBP

Now that WEBP is supported across popular modern browsers—looking at you Safari for being [late](https://www.macrumors.com/2020/06/22/WEBP-safari-14/) to the party—I’ve been considering serving images in WEBP format across my [icon](https://www.iosicongallery.com) [gallery](https://www.macosicongallery.com) [sites](https://www.watchiosicongallery.com).

Today I’m serving PNGs which I optimize via [the ImageOptim API](https://imageoptim.com/api). It does a pretty damn good job of doing lossless minification for the original icon designs.

I’m also using lot of bandwidth. The past few months, according to Netlify, I’ve been burning through 150GB or more of traffic per month for these sites—the majority of that being serving images.

So I’ve been thinking: if I could cut image sizes, say, in half, that would cut my bandwidth usage in half! However, given that the primary focus of these sites is the icons themselves, I need to continue providing high quality icons. People come to these sites to admire the design of the icons and it would be difficult to admire and appreciate the quality of something that’s been altered and degraded from its original form. That is why I serve lossless PNGs today. 

But maybe WEBP could meet the same standard of quality I have from today’s PNGs and still save me some bytes? That’s my hope.

Given the above, I devised a few ways to test whether WEBP would be sufficient to my needs. I’m documenting what I find here.

**tldr;** I picked a random sample of sixty iOS icons and converted them to WEBP to see where the biggest changes (both visually but also in file size) would show up between PNG and WEBP formats. Takeaways:

- I found it intriguing to see lossless WEBP images come in at a collectively larger file size than lossless PNGs (which I use today)!
- Like most technology, WEBP is not a cure all. It’s pretty damn good though, especially with images composed of modern “flat” aesthetics—solid or gradient fill colors, silhouette shapes, etc.
- Will I be switching to WEBP for my icon gallery sites? I don’t have a definitive answer yet. We’ll see...

## More Details

I took 260 sample PNG images at their largest size of 1024×1024 pixels. In terms of resolution, these are the largest PNGs used on my sites. Today they are optimized using [imageoptim](https://imageoptim.com) at a lossless compression.

I then ran them through the [imagemin](https://github.com/imagemin/imagemin) tool three different times, each with a different setting, from lossless compression to lossy compressions at a quality of 100 and 80. These were the resulting folder sizes of those 260 images:

- PNGs, lossless: **66.7MB**
- WEBP, lossless: **74.2MB**
- WEBP, lossy@100: **39.4MB**
- WEBP, lossy@80: **10.5MB**

I found it interesting that going from lossless PNG files optimized with imageoptim to lossless WEBP files optimized with imagemin resulted in an _increase_ of overall file size. However, once I turned on lossy compression, the file sizes started to drop drastically.

However, file size isn’t the only important consideration. How do WEBP images differ from PNG images in terms of visual fidelity and detail when similar compression is used?

I found that, for “flat” icons, WEBP trumps PNG easily. But when you start to get into icons with lots of visual detail and texture, WEBP struggles to maintain fidelity to the source PNG artwork.

Here’s a sample of what I found in terms of file size:

| Icon       | PNG   | WEBP lossless | WEBP lossy@100 | WEBP lossy@80 |
|------------|-------|-------|----------|---------|
| 1Password  | 353kb | 328kb | 292kb    | 48kb    |
| 3d scanner | 1.1MB | 1.9MB | 587kb    | 140kb   |
| Watch      | 70kb  | 63kb  | 68kb     | 29kb    |
| Hippo      | 997kb | 805kb | 253kb    | 57kb    |
| Alarm      | 353kb | 545kb | 171kb    | 47kb    |

### An Example: 1Password

1Password has a number of icon variations through the years, following the general aesthetic trend in iOS, from skeuomorphic to flat in appearance.

<img src="https://cdn.jim-nielsen.com/blog/2021/WEBP-1password-icons.png" width="186" height="338" alt="iOS icons for 1Password from 2020, 2018, 2014, and 2012 which show how the icon’s aesthetic has changed over time." />

The more recent flat icons compress really well under the WEBP lossy compression, losing hardly any noticeable visual fidelity while shrinking drastically in size.

<img src="https://cdn.jim-nielsen.com/blog/2021/WEBP-1password-flat-icons.png" width="1223" height="854" alt="3 versions of the 1Password icon, each with a PNG and WEBP version, illustrating how well the compression worked for icons design with a “flat” aesthetic." />  

Here’s how the 1Password icons changed in file size:

| App               | PNG   | WEBP@80 |
|-------------------|-------|---------|
| 1Password (2020)  | 138kb | 23kb    |
| 1Password (2018)  | 64kb  | 25kb    |
| 1Password (2014)  | 68kb  | 31kb    |
| 1Password (2012)  | 353kb | 48kb    |

However, the older skeuomorphic icon was different.

<img src="https://cdn.jim-nielsen.com/blog/2021/WEBP-1password-icon.png" width="280" height="280" alt="The 1Password iOS icon from 2012." /> 

While its size changed drastically, it wasn’t without a noticeable loss in visual fidelity. This illustrates the broader trend I saw across many app icons: anything skeuomorphic in nature or containing a lot of visual texture lost detail.

It’s worth noting that when it went from the original PNG to WEBP with lossy compression at a quality of 100, there was little to no quality lost in visual fidelity (yet there remained a file size savings).

| App               | PNG   | WEBP@100 | WEBP@80 |
|-------------------|-------|----------|---------|
| 1Password (2012)  | 353kb | 292kb    | 48kb    |

But going down to a lossy quality of 80, you can see the differences between PNG and WEBP. Here’s a screenshot of the texture of the original PNG.

<img src="https://cdn.jim-nielsen.com/blog/2021/WEBP-diff-1password-png.png" width="464" height="240" alt="Close up on a cross section of the 1Password icon as a PNG showing the background texture in the image." /> 

And now the WEBP version (compressed at a quality of 80).

<img src="https://cdn.jim-nielsen.com/blog/2021/WEBP-diff-1password-WEBP.png" width="465" height="243" alt="Close up on a cross section of the 1Password icon as a lossy WEBP showing the loss of background texture in the image." /> 

Note how a lot of that minuscule texturing gets lost. The effect looks similar to that JPEG block effect you see as a compression artifact resulting from a lossy conversion.

### Other Examples

These are a few examples going from lossless PNG to lossy WEBP at a quality of 80 (going to 100 didn't make much of a difference and going lossless made the WEBP icon sizes _bigger_).

The [3d Scanner](https://www.iosicongallery.com/icons/3d-scanner-app-2021-04-22/) app, which has much more photo-realistic design with lots of textures, is exactly the kind of image where I see WEBP conversion struggle the most. Here’s a close up on the texturing in the original lossless PNG:

<img src="https://cdn.jim-nielsen.com/blog/2021/WEBP-diff-3d-scanner-png.png" width="298" height="481" alt="Screenshot of the Activity app icon with lossless PNG compression." /> 

And here it is after lossy conversion to WEBP:

<img src="https://cdn.jim-nielsen.com/blog/2021/WEBP-diff-3d-scanner-WEBP.png" width="305" height="494" alt="Screenshot of the Activity app icon with lossy WEBP compression." /> 

In Apple’s [Activity app icon](https://www.iosicongallery.com/icons/activity-2017-09-26/), you can see banding in the original PNG.

<img src="https://cdn.jim-nielsen.com/blog/2021/WEBP-diff-activity-png.png" width="212" height="198" alt="Screenshot of the Activity app icon with lossless PNG compression." /> 

And that gets lost during the conversion to WEBP (almost more of a JPEG compression effect).

<img src="https://cdn.jim-nielsen.com/blog/2021/WEBP-diff-activity-WEBP.png" width="208" height="197" alt="Screenshot of the Activity app icon with lossy WEBP compression." /> 

The [Air Hippo](https://www.iosicongallery.com/icons/air-hippo-2012-12-03/) app icon

<img src="https://cdn.jim-nielsen.com/blog/2021/WEBP-diff-air-hippo-png.png" width="286" height="235" alt="Screenshot of the Air Hippo app icon with lossless PNG compression." /> 

Note the detail being lost

<img src="https://cdn.jim-nielsen.com/blog/2021/WEBP-diff-air-hippo-WEBP.png" width="284" height="238" alt="Screenshot of the Activity app icon with lossy WEBP compression." /> 

And then the [Alarm Clock](https://www.iosicongallery.com/icons/alarm-clock-hd-2019-05-29/) app icon

<img src="https://cdn.jim-nielsen.com/blog/2021/WEBP-diff-alarm-png.png" width="477" height="230" alt="Screenshot of the Alarm Clock app icon with lossless PNG compression." /> 

Note the detail lost here, things becoming just a bit more blurry, especially the squares in the background.

<img src="https://cdn.jim-nielsen.com/blog/2021/WEBP-diff-alarm-WEBP.png" width="477" height="231" alt="Screenshot of the Activity app icon with lossy WEBP compression." /> 

## Conclusion

It looks as though, to get really impressive file size savings, I’ll have to go to lossy WEBP compression. This means some icons in my galleries will suffer a loss of visual fidelity.

I might be ok with that, but I’m not sure. These galleries are all about admiring the original icon designs, so I’d like to be as faithful as possible to the source artwork. That might mean more bandwidth is required.

Given [how I’m currently storing and serving my icons](https://blog.jim-nielsen.com/2019/netlify-public-folder-part-i-what/), switching to WEBP wouldn’t be a light lift. [If I could get Netlify’s imagine transformation service to support the delivery of WEBP as a format](https://answers.netlify.com/t/improved-image-optimisation-on-netlify-netlify-large-media/2565/19?u=jimniels), I’d definitely give this a shot. That would be an easy way to get my feet wet and try it out without too much upfront cost.

As it stands, I’m leaning towards leaving things as they are today. Long live the PNG.
