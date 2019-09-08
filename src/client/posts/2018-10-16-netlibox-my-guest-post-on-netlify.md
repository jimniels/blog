---
title: "Netlibox: My Guest Post on Netlify’s Blog"
tags: engineering
---

[![Screenshot of guest post](/images/2018/netlibox-post-screenshot.png)](https://www.netlify.com/blog/2018/10/15/combining-netlify-with-dropbox-for-a-one-click-publishing-process/)

I’ve been a big fan of Github Pages over the last few years and have used it quite extensively for hosting my web paraphernalia. I pay $8/month and I get source control and static site hosting. And I’ve developed and deployed [quite](http://www.iosicongallery.com) [a](http://jim-nielsen.com/) [few](http://jim-nielsen.com/sassme) [sites](http://jim-nielsen.com/teamcolors/) using this model.

With that said, there have been a few limitations in my usage of Github Pages. For example:

- No control over the build process - Either you use Jekyll and allow Github to generate your site content, or - You generate your site content locally and commit to your repo
- No server-side controls for things like rewrites
- ~~No HTTPS on custom domains~~ ([recently supported](https://blog.github.com/2018-05-01-github-pages-custom-domains-https/))

There are more I could add to this list, but I think you get the idea.

In addition to building what I suppose one would consider “regular” websites (if there is such a thing), I’ve also found myself wanting to have multiple kinds of note-taking “blogs”. Essentially I just have a bunch of plain text files I leverage for note taking but I want to turn them into a simple blog via a static site generator like Jekyll. Along these lines, I’ve been seeking my own kind of “holy grail” for writing and publishing to the web. My current process for changing text files, which requires that I edit them then add them to git, add a commit message, and push my repo, has felt like a bit too much friction. What I’ve wanted is:

1. Easy to write (markdown)
2. Easy to manage (plain text files)
3. Can use editor of choice (iA Writer)
4. Can use any device (Mac, iPhone, etc)
5. Website is generated and deployed automatically (as a static site)

Essentially, I want a blog that consists of a bunch of text files I can manipulate via Finder or iOS, compose in my favorite editor, and then deploy onto the web by implicitly just saving a file to my disk. I’ve thought about this for some time, but have never really been able to put all the pieces together.

Until Netlify came along.

I’ve been playing around with Netlify quite a bit lately, and to be honest, it’s felt like a revelation. I haven’t had many “watershed” moments over the course of my career on the web (and I don’t want to say something I can’t take back here) but I think Netlify has really hit upon something with what they’re building. Their ethos — of creating a world where builds and deployments are so mundane, so predictable, that you could [deploy a site every minute](https://www.netlify.com/blog/2018/08/02/exploring-the-potential-of-friction-free-deployments/) if you wanted too — really resonates with the way I build and publish content to the web.

Anyhow, as I’ve been playing more and more with Netlify, the disparate pieces of my “holy grail” writing and publishing experience for the web have begun to come together. And that’s what I want to share here: I’ve called it “Netlibox” (Netlify + Dropbox) and it’s a process for writing and publishing content to the web. In a nutshell, I’m using Dropbox to manage a bunch of text files, which, every time one of them is updated or a new one is created, a notification gets sent from Dropbox to Netlify, which triggers Netlify to create a new build of my site, and the latest content is always pulled in at build time from Dropbox.

This makes my life easier because Dropbox integration is so prevalent that I can update text files from my phone, from my computer, or just about anywhere, and by the simple act of “saving” the file, a build will get triggered in Netlify and my site will be live on the web with the newest content in no time. I don’t even have to _think_ about deploying my site. My simple blog is merely a function of my content.

![Explanatory illustration of Netlibox process](/images/2018/netlibox-explanation.png)

You can read more of the specifics over on [the post I wrote for Netlify’s blog](https://www.netlify.com/blog/2018/10/15/combining-netlify-with-dropbox-for-a-one-click-publishing-process/) or you can [check out the sample project on Github](https://github.com/jimniels/netlibox).
