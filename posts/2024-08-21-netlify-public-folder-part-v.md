#netlify

# Netlify Public Folder, Part V: Now With an Image CDN

On [ShopTalkShow no. 628](https://shoptalkshow.com/628/), Chris and Dave got to talking about s3/r2 and hosted media solutions. Dave graciously gave a shoutout to my [Netlify “public folder”](https://blog.jim-nielsen.com/2019/netlify-public-folder-part-i-what/) workflow, which reminded me of something I’ve been meaning to write about.

Chris mentions how he prefers being able to drop a large resolution image on a CDN as his “source” and then request transformations of that image on-demand as necessary, e.g. “I’ll upload my 3000px JPG source image and then reference it on my website as a 800px modern image format (AVIF, WEBP, etc.)”

That makes perfect sense to me. You really only want to keep the best image you have, then easily reference, transform, and serve it on your website.

And that’s what I’ve been doing with Netlify’s new image CDN in combination with my “public folder” workflow. All I need to enable this functionality is a few lines of code to properly configure redirects on my site to leverage Netlify’s image CDN.

## The Results

I took a file and dropped it in my folder, synced it to Netlify, then requested various versions of it. Here’s what I got.

The original image, no transformations or optimizations. Exactly as it is on my computer:

- `/sample.png`
	- PNG
	- 1024x1024
	- 220kb

An “optimized” version. Netlify’s image CDN optimizes and transforms the image as they see best given the user agent making the request:

- `/sample.png?optimize=true`
	- AVIF
	- 1024x1024
	- 16.6kb

An “optimized” version resized to my own specifications:

- `/sample.png?optimize=true&w=64`
	- AVIF
	- 64x64
	- 5.0kb


## How It Works

My first thought in making this work was to create a special path prefix for everything that’s in my folder, e.g. `/$/`, and then I can append whatever [image CDN query params](https://docs.netlify.com/image-cdn/overview/#transform-images) I want:

```toml
[[redirects]]
  from = "/$/*"
  to = "/.netlify/images?url=/:splat"
  status = 200
  force = true
```

For example, a “public folder” like this:

```
public-folder/
  avatar.png
  2024/
    my-image.jpg
```

Would map to these URLs:

```
cdn.jim-nielsen.com/avatar.png
cdn.jim-nielsen.com/2024/my-image.jpg
```

This would would serve the original images as they exist on disk. You request an image and it’s 3000 pixels? That’s what you get.

If I wanted to transform or optimize any, I could prefix each URL like this:

```
cdn.jim-nielsen.com/$/avatar.png?w=64
cdn.jim-nielsen.com/$/2024/my-image.jpg?w=800
```

The problem with this kind of path-based redirect is that those URLs can break over time because they don’t represent a 1:1 mapping of file-on-disk path to URL path.

If I moved off Netlify one day but I had a bunch of `<img>` tags linking to some path prefixed with `/$/` I’d have to deal with that (or even just serving files locally without using Netlify’s `netlify dev` tool).

So I wanted a solution that allowed me to reference the actual path to the files on disk with search params being the means to say “but I want this image optimized this way”. Under these constraints, even if I migrated off any kind of image transformation service, my original URLs would still work.

To accomplish this, I added this code to my `netlify.toml` file:

```toml
[[redirects]]
  from = "/*"
  query = { optimize = ":o", w = ":w" }
  to = "/.netlify/images?url=/:splat&w=:w"
  status = 200
  force = true
[[redirects]]
  from = "/*"
  query = { optimize = ":o" }
  to = "/.netlify/images?url=/:splat"
  status = 200
  force = true
```

In this solution, the URL paths to my images are a 1:1 mapping of files in my folder to files on the remote server. So even if the image transformation service isn’t working, my images will still show (just un-optimized).

The downside to this is that it requires explicitly handling redirects for each query parameter combination you want to use from Netlify’s image CDN because as soon as you specify _one_ query param Netlify will strip off any others (whereas with a path-based solution, Netlify will pass all query params through).

It’s a tradeoff, but this works for me because longevity of the URL is the most important to me — plus I really only ever use the image width resize param and none of the others. So I only need two redirect rules.

## My Full Workflow Today

So now I have this generalized workflow for storing images _outside of_ a git repo and easily syncing them to a remote server for use anywhere across the web. And now with Netlify’s image CDN service, I can not only _serve_ any images in my public folder, I can dynamically transform and optimize them on the fly.

Here’s my workflow today:

- Save an image to a Dropbox folder (on my laptop)
	- e.g. `/new-image.jpg`
	- (Dropbox client syncs that folder to its server as a backup)
- [Run a macOS shortcut](https://blog.jim-nielsen.com/2024/deploying-with-netlify-shortcuts/) that deploys that folder of static assets to a website (`cdn.jim-nielsen.com`) on Netlify
	- Really it “syncs” the folder, because it doesn’t re-upload files Netlify already has from a previous “deploy”
- All files in that folder are now live at my website in a structure mimicking the folder on my laptop
	- e.g. `cdn.jim-nielsen.com/new-image.jpg`
- Add my own query params to resize that image on the fly
	- e.g. `cdn.jim-nielsen.com/new-image.jpg?optimize=true&w=64`