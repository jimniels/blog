# Leveraging a Web Component For Comparing iOS and macOS Icons

Whenever Apple does a visual refresh in their OS updates, a new wave of icon archiving starts for me.

Now that “Liquid Glass” is out, I’ve begun nabbing the latest icons from [Apple](https://www.iosicongallery.com/developers/apple/) and [other apps](https://www.iosicongallery.com/apps/) and adding them to my gallery.

Since I’ve been collecting these icons for so long, one of the more interesting and emerging attributes of my collection is the visual differences in individual app icons over time.

For example: what are the differences between the icons I have in my collection for Duolingo? Well, [I have a page for that today](https://www.iosicongallery.com/apps/570060128/).

<img src="https://cdn.jim-nielsen.com/blog/2025/compare-icons-duolingo.png" width="1176" height="899" alt="" />

That’ll let you see all the different versions I’ve collected for Duolingo — not exhaustive, I’m sure, but still interesting — as well as [their](https://www.iosicongallery.com/apps/570060128/sm) [different](https://www.iosicongallery.com/apps/570060128/lg) [sizes](https://www.iosicongallery.com/apps/570060128/xl).

But what if you want to analyze their differences pixel-by-pixel? Turns out, There’s A Web Component For That™️.

[Image Compare](https://image-compare-component.netlify.app) is exactly what I was envisioning: “A tiny, zero-dependency web component for comparing two images using a slider” from the very fine folks at [Cloud Four](https://cloudfour.com). It’s super easy to use: some HTML and a link to a script (hosted if you like, or you can [vendor it](https://blog.jim-nielsen.com/2025/be-mindful-of-what-you-make-easy/)), e.g.

```html
<image-compare>
  <img />
  <img />
</image-compare>
<script src="https://unpkg.com/..."></script>
```

And just like that, boom, I’ve got a widget for comparing two icons.

<video controls src="https://cdn.jim-nielsen.com/blog/2025/compare-icons-duolingo.mp4" width="550" height="550"></video>

For Duolingo specifically, I have a long history of icons archived in my gallery and they’re all [available under the `/comapre` route for your viewing and comparison pleasure](https://www.iosicongallery.com/apps/570060128/compare/).

<img src="https://cdn.jim-nielsen.com/blog/2025/compare-icons-duolingo-history.png" width="902" height="1126" alt="" />

Wanna see some more examples besides Duolingo? Check out the ones for [GarageBand](https://www.iosicongallery.com/apps/408709785/compare/), [Instagram](https://www.iosicongallery.com/apps/389801252/compare/), and [Highlights](https://www.iosicongallery.com/apps/1498912833/compare) for starters. Or, just look at [the list of iOS apps](https://www.iosicongallery.com/apps/) and find the ones that are interesting to you (or if you’re a fan of [macOS icons, check these ones out](https://www.macosicongallery.com/apps/)).

I kinda love how easy it was for my thought process to go from idea to reality:

- “It would be cool to compare differences in icons by overlaying them…“
- “Image diff tools do this, I bet I could find a good one…“
- “Hey, Cloud Four makes a web component for this? Surely it’s good…”
- “Hey look, it’s just HTML: a `<script>` tag linking to compiled JS along with a custom element? Easy, no build process required…“
- “Done. Well that was easy. I guess the hardest part here will be writing the blog post about it.”

And I’ve written the post, so this chunk of work is now done.