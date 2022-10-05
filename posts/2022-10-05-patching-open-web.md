# Patching The Open Web

Dave has a piece about [the patchability of the open web](https://daverupert.com/2022/09/patchability-of-the-open-web/) that resonates with my experience:

> I under-appreciate the ability to patch or coerce websites to meet my needs. 

He outlines the ways he commonly opens the developer tools and tweaks websites to do what he wants or needs — an empowering feeling!

I find myself doing this a lot, so I figured I’d document a couple recent examples where I empowered myself with a little devtools magic — all due to the open nature of the web, an attribute where native apps fall woefully short.

## Resize a Video

I often come across a video I want to watch, but it’s embedded in the site design at a really small size.

<img src="https://cdn.jim-nielsen.com/blog/2022/patchable-web-video-small.png" width="1366" height="1029" alt="Screenshot of a website with a small video embed." />

I don’t want to click the “full screen” control on the video player because then it’ll overtake my entire screen. I simply want it bigger in its current context. Nothing a little CSS tweaking in the developer tools can’t fix.

<img src="https://cdn.jim-nielsen.com/blog/2022/patchable-web-video-big-styles.png" width="1366" height="1029" alt="Screenshot of a website with the developer tools opened and the `max-width` property being adjusted on the container for a video embed, making the video larger." />

Boom! A video at the size I want in the window I want.

<img src="https://cdn.jim-nielsen.com/blog/2022/patchable-web-video-big.png" width="1366" height="1029" alt="Screenshot of a website with a large video embed." />

## Snagging Archived Content

I was trying to grab some MP3s for a podcast that disappeared from its original domain (and the RSS feed was no longer in Apple’s registry).

Thanks to the internet archive, I was able to find an old version of the site with a listing of each episode and a (still active) link to the episode MP3.

<img src="https://cdn.jim-nielsen.com/blog/2022/patchable-web-audio-website.png" width="972" height="735" alt="Screenshot of a website from the internet archive with a listing of podcast episodes and a blue “Listen Now” link to download the episode MP3." />

But we’re talking hundreds of MP3s here. Who wants to manually click “Download linked file as…” for every episode? 

Instead, I open the devtools, inspect the site’s structure, and come up with a little script to grab the download link for each episode and join them into a line-delimited list.

```js
Array
  .from(document.querySelectorAll("td a[href]"))
  .map(a => a.getAttribute("href"))
  .join("\n")
```

<img src="https://cdn.jim-nielsen.com/blog/2022/patchable-web-audio-devtools.png" width="972" height="735" alt="Screenshot of a website with the developer tools open and a script in the console that selected all links on the page and combined their hrefs into a giant list or URLs." />

From there, I figure out how to batch download a list of files using a tool like `curl` and shortly I’ve got every episode I need.

## Nab an Image

Often I’ll come across a site implementing images via CSS — `background-image: url()` — rather than via HTML — `<img src="">`. This makes grabbing the image and downloading it difficult from the browser GUI (_cough_ Instagram _cough_). However, I can open the devtools and pretty quickly find the image rendered on screen (select the target element and look at the CSS, peek into the network tab, I have my ways…).

Just yesterday my five year old asked me for a kid’s halloween color by number page. We found one he liked together, but because the image was rendered on screen via CSS, it wasn’t so easy to just drag the image to my desktop, open it in Preview, and hit “Print”. But with a little devtools magic, that thing was coming hot out the printer in no time.

## Readlists

I would be remiss if I didn’t mention [my Readlists project](https://readlists.jim-nielsen.com) which allows me to grab content from all over the web and compile it into my own ebook for use on other devices and applications. It’s like making a mixtape but with online articles.

All of this possible because of the open nature of the web.