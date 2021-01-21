---
tags: engineering netlify
---

# Netlify Public Folder, Part II: Why? Netlify Large Media Wasn’t For Me, But Netlify Still Was

This is part two of a three part series:

- [Netlify Public Folder, Part I: What?](/2019/netlify-public-folder-part-i-what/)
- Netlify Public Folder, Part II: Why?
- [Netlify Public Folder, Part III: How?](/2019/netlify-public-folder-part-iii-how/)

You might want to read the previous posts for this one to make complete sense. Even then, I make no guarantees it will make sense.

---

Over the years, my git repo which houses [iosicongallery](https://www.iosicongallery.com) has been slowing growing unwieldy in size.

I’m going to step out on a limb and say it’s probably because of all those icons! 1,473 of them to be exact (at the time of writing this post).

Ah but here’s the catch: while there’s 1,473 icons in my gallery, I have (approximately) six versions of each icon as files on disk. Why? Allow me to explain.

First, I have five (optimized) sizes for each icon: 

1. 64×64 pixels
2. 128×128 pixels
3. 256x256 pixels
4. 512×512 pixels
5. 1024×1024 pixels

I consider these the “deliverable” versions of my icons (because I’ve created these versions to be delivered to users of the website). To use terminology familiar in the photography world, these are my “post-processed” files—not originals, but derivatives resized and optimized for use on the web. Each variant is required for a specifically-designed context on my website (and I use [`srcset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset) to conditionally deliver @2x versions for high-resolution consumers).

“But you said you have six versions of each icon, that’s only five?” Great! You’re following me.

I also have what I call the source version of each icon. These are my “raw”, original versions of an icon. They constitute the original icon as pulled from Apple’s servers at the time I decided to include it in my gallery. _Almost_ all of these “source” icons are unoptimized, 1024×1024 pixel PNG files. The idea is that, if I ever needed to, I could regenerate all the “deliverable” icon variations from these original sources.

For example, say I drastically changed the design of my website such that I now need three sizes of each icon: 32 pixels, 417 pixels, and 906 pixels. I could do it. I’d trash all the old “post-processed” icons and generate new ones from the original source files (granted, it’d probably take a while and make my laptop really hot in the process). 

Honestly though, that’s not likely to happen. I don’t think I’ve ever done that in the history of running my [icon](https://www.iosicongallery.com) [gallery](https://www.macosicongallery.com) [sites](https://www.watchosicongallery.com)—which has been almost a decade now!

“So you’re hedging against something you never anticipate doing?” Kind-of, yes. Which brings me to my next point.

The other reason I keep these source files is to hedge against something I hope never happens: data loss. While I can be more flippant about how I store the 64, 128, 256, 512, and 1024 “post-processed” versions of the icons, I am much more careful about how I store and backup my original source icons. If something were to ever happen, I only really need to totally safeguard the source versions of the icons because, if I ever did lose everything, I could theoretically use these original icons to generate all the other size variations I need for my website.

“Ok, so how big is your repo?” I’m glad you asked. According to Github, my repo is _almost_ 1GB in size:

<img src="https://cdn.jim-nielsen.com/blog/2019/netlify-lm-repo-size-github-before.png" alt="Screenshot of the Github UI detailing the size of my repo (while holding thousands of PNG icon) at 952MB" width="365" height="52" />

Checking that against my local copy of the repo seems to give me the same information:

<img src="https://cdn.jim-nielsen.com/blog/2019/netlify-lm-repo-size-terminal.png" alt="Screenshot of the result of running `git count-objects -vH` in the terminal against my local copy of the repository" width="602" height="369" />

Now I’ve never heard from GitHub saying, “yo dude, you gotta reduce that repo size” but it’s theoretically possible according to [GitHub’s docs](https://help.github.com/en/github/managing-large-files/what-is-my-disk-quota):

> We recommend repositories be kept under 1GB each...If your repository exceeds 1GB, you might receive a polite email from GitHub Support requesting that you reduce the size of the repository to bring it back down.

From the perspective of git, there’s been no real forcing function—yet—for me to look into ways to solve this huge repo thing that might become a problem one day. Git only pulls/pushes changes, so once I clone that big fat repo down to my computer (which can take a minute) there’s no real issue beyond that.

At least, there wasn’t. Then I started to do automated deploys through Netlify.

## My Big Fat Netlify Build

Let’s take a look at one of my latest builds. It took three minutes, nine seconds to build (total deploy time was six minutes, forty-three seconds):

<img src="https://cdn.jim-nielsen.com/blog/2019/netlify-lm-build-time.png" alt="Screenshot of the Netlify UI describing how long my build/deploy took." width="646" height="75" />

That seems like a long time. At least it does to me. So why is it taking so long?

“Might have something to do with the fact that your repo is almost 1GB in size Jim.” Yeah, that’s what I thought. Let’s look at the deploy logs in Netlify.

I don’t know exactly all that’s going on when Netlify runs a deploy, but by looking at the logs and the time between different tasks executing, I can get a pretty good idea of where my slow downs might be.

Firs, there’s the cache. The cache for my build is 2.6GB. Downloading and extracting that cache took Netlify just over a minute.

<img src="https://cdn.jim-nielsen.com/blog/2019/netlify-lm-build-speed-cache.png" alt="Screenshot of the Netlify deploy log where downloading and extracting the cache happens" width="575" height="189" />

I’m not sure if that whole minute counts towards the “build time” or just the overall “deploy time”, but either way, it’s no small chunk of time. If my repo was super lean (i.e. absent thousands of PNG files) I bet I could get that cache down quite a bit.

Ok, next looking at the logs, I can see that the actual build command Netlify runs (i.e. the piece I control) is pretty quick (and I’m doing quite a bit of filesystem work there, but I’ll save that for another post someday):

<img src="https://cdn.jim-nielsen.com/blog/2019/netlify-lm-build-speed-execution.png" alt="Screenshot of the Netlify deploy log where my custom build command is run" width="745" height="217" />

About 20 seconds to run my build. That’s cool, I’ve got no qualms with that. I bet I could get that trimmed down, but I think I can squeeze out larger returns elsewhere before looking at that particular piece of computing time.

Ok, let’s see, what else is in that deploy log? There’s some stuff near the end that looks like it’s taking some time:

<img src="https://cdn.jim-nielsen.com/blog/2019/netlify-lm-build-speed-end.png" alt="Screenshot of the Netlify deploy log at the very end where the deploy happens" width="664" height="240" />

Whoa. There’s a lot of time passing there and I honestly don’t know exactly what Netlify is doing there. “Starting post processing” to “Post processing done” seems to be the big culprit. There’s like four minutes in that black box. I don’t know why exactly, but I have two suspicions as to the big culprits:

1. Something do with all those images
2. Something to do with the way I generate random “related icons” for each individual icon’s HTML page (hint: it changes the fingerprint for each icon’s HTML file every time the build runs, which means it Netlify has to “re-deploy” every icon’s HTML page—even if nothing about the icon changed)

Point two is something I’ll address in another blog post. But for point one, what’s one to do?

## Reaching Out For Help

What’s interesting about my repo is that it’s this giant collection of (largely) static images which really never change. The only time my images change is when I add new ones (making the repo bigger). What seemed like a nice solution to this problem would be to pull all non-text files out of my git repo. That would, by extension, exclude those images from my Netlify deploy. But where do I stick them? I would need to host them somewhere? In theory, I could stick them all in an s3 bucket somewhere. Then, rather than having all my images reference my site’s domain for the icon’s image file, just point them at some public URL for my bucket.

But I don’t want to get in the business of managing an s3 bucket (hooked up to cloud flare) by myself. I’ve done it before and, well, it’s not the user-iest of friendly. “Is there a way I can just host those images through Netlify, like I would via s3 (or even just an FTP server)?”

That line of thought is what led me to reach out to Netlify (and [@swyx](https://twitter.com/swyx) because he’s always been super helpful to me regarding Netlify questions). Here’s [my tweet](https://twitter.com/jimniels/status/1098672051890671617?s=20):

> @netlify @swyx I got a git repo that's getting pretty large (>1GB), mostly because it's full of images. Is there any way to split those images out of my repo but keep them hosted through netlify? (I could move them to s3 but then I'm hosting from there rather than netlify's CDN)

Apparently, my timing was impeccable. Shortly after my tweet, Netlify announced a feature to address the (apparently common) scenario of needing to store and host large media outside of the context of a working git repository. The feature is known as “[Netlify Large Media](https://www.netlify.com/products/large-media/)” and I was super excited to dig in and see how to resolve my problem.

## The Answer to My Woes Is: Netlify Large Media

When I first read [the blog post](https://www.netlify.com/blog/2019/02/26/manage-your-code-and-assets-together-with-netlify-large-media/) on Netlify’s “Large Media” feature, their solution was novel to me: use an open source tool called [Git LFS](https://git-lfs.github.com) to remove those large binary assets from your repo and replace them with textual pointers. Cool! 

But [what really stood out to me](https://twitter.com/jimniels/status/1100532780423888898?s=20) was that “Netlify Large Media” was much more than Git LFS: it was an entire service _built on top of Git LFS_ which included an image transformation service! 

“Do you understand the ramifications of this for your particular scenario, Jim?” Yes, yes I think I do.

What this means is I no longer have to store five additional, processed versions of my 1,473 icons. Now I can:

1. Store only one version of each icon: the original, source file
2. Store that one file using Git LFS (no more large files in Git, just textual pointers)
3. Reference that one file on the web via a single URL with parameters for whatever size my heart desires!

It’s a dream come true, right?

## Why Netlify Large Media is Awesome, But I Won’t Be Using It

As I re-read the docs around large media and pondered on how to actually get it up and running myself, I began to have a few reservations. 

“How much will this cost me?” I thought. I was already paying nothing for serving my icon gallery sites through Netlify. This new image transformation service had some fees attached to it (understandably so, a dynamic image transformation service is no small feat of engineering and computing resources I’m sure). The stated costs were tied to usage, but I had no idea exactly what my usage would be. Based on my analytics, I would guess it wasn’t the free tier. That’s ok though. I don’t mind giving Netlify my money. They’ve definitely earned it.

“So, if it’s not money, what other reservations could you possible have from such a neat feature?” Glad you asked. Let me explain.

What really deterred me from using Netlify’s image transformation service was the fact that it felt like a big step towards a tighter coupling between _how_ I build and host my websites and _who_ I build and host my websites with. 

Up to this point in time, I’ve been building this giant collection of PNG files for use on my icon gallery site. And you know what’s great about them? They’re just a collection of files on a hard drive. To put them on the web, I just have to copy them (and their directory structure) to a web server and point some DNS at them. Doesn’t matter if that web server is AWS, Digital Ocean, or something else. It’s the same file/folder structure I’ve been maintaining for years.

```
AWS-URL.com/path/to/128/icon.png
DIGITAL-OCEAN-URL.com/path/to/128/icon.png
SOME-FTP-SERVER.com/path/to/128/icon.png
SUBDOMAIN.DOMAIN.com/path/to/128/icon.png
```

Not that I ever plan to migrate off Netlify, but let’s be honest: it could happen. I’ve had to change hosting providers before. And the one lesson I’ve learned is: the looser the coupling between who I host with and how I host stuff, the less the pain in migration.

Netlify Large Media, while incredibly powerful (and, in many ways, tailor fit to my use case) presents this kind of tighter coupling. It asks that I pay a price of entanglement between my hosting provider and my hosted content that I didn’t want to pay. One of the things I really love about the JAMstack—or at least the “JAMstack” as I personally think about it—is the notion of static files on disk. At it simplest form, that’s all you’re ever dealing with: a collection of static files on disk. There’s no proprietary interfaces for accessing content. Nothing between you and your files. When you hit that URL, it’s just getting a file on disk. There’s no heap of infrastructure required to look at that URL, determine what’s being asked for, crop it, resize it, optimize it, and deliver it. When it’s just files, it can stand on its own. Local web server. Remote web server. It’s just URLs that point to files, not URLs that point to services or platforms where I have to cast the right incantation to get my file.

Static files in web hosting are like the plain text of data: simple, portable, universal, and longevous. And while an image transformation service is incredibly powerful and useful in a variety of contexts, I didn’t find it worth the price in my particular scenario.

## Why I Will Still Be Using Netlify

So I have this problem (a bunch of large files in Git) that I ~~can’t~~ don’t want to resolve with a given solution (Netlify Large Media). Now what do I do?

Well, with Netlify being so geared towards a Git workflow, I wasn’t sure if what I wanted was even really possible. I mean, in some ways, it seemed like what I wanted was a step back into the past: Netlify, but as an FTP server. I give you files, you put them on your global CDN—but decoupled from git.

This is where the idea of a “Dropbox Public Folder” but for Netlify comes in. What if you could make a Netlify “Public” folder? It’d just be a folder on disk with files. When you add files to it, they get put on Netlify’s global CDN and become available via a URL that matches the file structure of your folder.

[Turns out, you can](https://twitter.com/jimniels/status/1176892638143713280?s=20)!

You can read more about how I did that in [my other post](/2019/netlify-public-folder-part-iii-how/). Suffice it to say: this solution is exactly what I was looking for. I can continue to merely have files on disk mirrored to a remote server and available at a URL. If for any reason I ever had to move off Netlify, all I would have to do is sync this folder to another web service (and make sure my DNS is setup right) and boom, everything is still available just as before.

Bonus: what’s really nice about this particular setup is my “local folder” that’s syncing to Netlify is actually a Dropbox folder. So my icons get “backed up” to Dropbox while also getting served via Netlify! So it’s actually quite redundant.

## So What Happened to Your Repo Size and Build Time?

My GitHub repo went down in size just a smidge.

<img src="https://cdn.jim-nielsen.com/blog/2019/netlify-lm-repo-size-github-after.png" alt="Screenshot of the Github UI detailing the size of my repo (after removing all icons) at 249KB" width="365" height="52" />

Remember what it was before? 952MB. I went from 952MB to 249KB. That’s not drastic at all, is it?

What about build/deploy time? That dropped too. Not as significantly as I hoped, but still a good amount. (FWIW: the other culprit I suspected, differences in file fingerprints between builds, was the biggest culprit in build time. Fixing that drastically reduced my build time. So my two suspected culprits were both found guilty.) How much did the times change? My iOS icon gallery had the most drastic time change because it has the most icons. So while the other two sites didn’t benefit from this change as much, they will undoubtedly in the future as I add more icons.Here’s a rundown of time differences for each respective icon site:

**iosicongallery**

- Build time
	- Before: 2 minutes, 54 seconds
	- After: 1 minute, 52 seconds
- Deploy time
	- Before: 6 minutes, 19 seconds
	- After: 5 minutes, 4 seconds

**macosicongallery**

- Build time
	- Before: 1 minute, 7 seconds
	- After: 49 seconds
- Deploy time
	- Before: 2 minutes, 11 seconds
	- After: 1 minutes, 50 seconds

**watchosicongallery**

- Build time
	- Before: 51 seconds
	- After: 37 seconds
- Deploy time
	- Before: 1 minute, 12 seconds seconds
	- After: 59 seconds

## Conclusion

I really like the solution I ended up. I’ve actually started to use it for more than just my icon gallery sites. I love the power and simplicity of: put a file in a folder and it 1) gets backed up to the cloud (Dropbox), then 2) gets deployed to a global CDN (Netlify). That’s a powerful combo right there IMO.

And I also think it’s worth mentioning that while Netlify’s solution to this kind of problem area (Large Media) wasn’t the right fit for me, I absolutely love that they provide a platform that allowed me to engineer a solution tailor fit to my own esoteric needs and demands. They provide the cutting edge as a solution, but don’t dictate it. I still have the power to say, “get off my lawn” and do things “the old fashioned way”.

---

Next: [Netlify Public Folder, Part III: How?](/2019/netlify-public-folder-part-iii-how/)
