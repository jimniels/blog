---
title: "Netlify Public Folder, Part I: What? Recreating the Dropbox Public Folder With Netlify"
tags: engineering netlify
---

This is part one of a three part series:

- Netlify Public Folder, Part I: What?
- [Netlify Public Folder, Part II: Why?](/2019/netlify-public-folder-part-ii-why/)
- [Netlify Public Folder, Part III: How?](/2019/netlify-public-folder-part-iii-how/)

---

For the past few years, do you know what I’ve [yearned](https://youtu.be/vnqBAuehmhM?t=82) for? The old Dropbox Public folder. It was a beautiful idea: you put files in a folder, they sync to Dropbox, then instantly become available on the web (via a URL that matches the structure of your folder). It was like a modern take on a FTP server, with Dropbox solving a lot of the ailments of FTP (security, credentials, file syncing, etc.) Just move, copy, or rename some files on your local computer and boom, they’re on the web (plus automatically backed up in Dropbox!)

Some kind of service like that has to exist in 2019, right? I couldn’t find it, so [I asked twitter](https://twitter.com/jimniels/status/1176892638143713280?s=20):

> Question: is there some kind of service out there, like Dropbox, where you drag and drop files to a folder on your Mac which syncs to a server and makes each file immediately available via a URL on a CDN? Kind of like the old Dropbox public folder?

Turns out, you can build it with Netlify! (Of course you can, “use Netlify” seems to always be the right answer.)  Thanks to some pointing-in-the-right-direction from [@swyx](https://twitter.com/swyx), I figured out a way to “sync” the contents of a local folder (like you would to an FTP server) [pretty easily](https://twitter.com/jimniels/status/1182305914575114240?s=20) using Netlify’s API. And if you make that “local folder” a Dropbox folder, then you get some redundancy in backups for free! 

So what do I have to show you exactly? I wrote [a script](https://github.com/jimniels/bitbar/blob/master/src/bitbar-scripts/netlify-sync.1m.js) that uses [BitBar](https://getbitbar.com) to create a menubar app which watches for changes to a local folder and, when it finds some, uses node to run [Netlify’s JS client](https://www.npmjs.com/package/netlify) and “sync” the file changes to Netlify. I keep a log of each “sync” that happens, including the output of Netlify’s JS client, and put it in the menubar dropdown so I can easily access and monitor what has happened.

<img src="https://cdn.jim-nielsen.com/blog/2019/netlify-lm-bitbar-dropdown.png" alt="Screenshot of my BitBar dropdown menu detailing a log of sync actions to Netlify" width="564" height="397" />

Allow me to show a video for the full effect. What I have is a folder on my computer which syncs its contents: A) to Dropbox for backups, and B) to Netlify for hosting. 

<video
  controls
	src="https://cdn.jim-nielsen.com/blog/2019/netlify-lm-video.mp4"
	poster="https://cdn.jim-nielsen.com/blog/2019/netlify-lm-video-poster.jpg"
	width="920"
	height="610" />
</video>

So what exactly is going on here? I made a script that looks at a folder on my local computer, checks if any files have changed in it, and (if any have) syncs the files to Netlify where each files becomes instantly available on Netlify’s global CDN via an URL. 

You can read more about [why](https://blog.jim-nielsen.com/2019/netlify-public-folder-part-ii-why/) and [how](https://blog.jim-nielsen.com/2019/netlify-public-folder-part-iii-how/) I did all of this in my other posts.

Granted, this is all a bit technical and requires a little more know-how than the old Dropbox Public folder feature. But I’m sure if someone smarter than me spent some time on this, they could make a more seamless, cross-platform, native GUI. 

Suffice it to say: I’m quite happy with this. I’ve been using it for production websites for a couple weeks now. In fact, it’s even powering the image hosting for this blog. If you inspect the source for this site, you’ll see images are loading from `cdn.jim-nielsen.com` which is my “Public Netlify” folder, and not from `blog.jim-nielsen.com` which is the git repo for my blog. In other words, I’ve decoupled the static assets for my blog—and other sites—to their own “service”, which is a local (Dropbox) folder on my computer mirrored to Netlify’s CDN.

My thanks to the folks at Netlify for having built a platform and tooling that made this kind of feature possible for me to build.

---

Next: [Netlify Public Folder, Part II: Why?](/2019/netlify-public-folder-part-ii-why/)
