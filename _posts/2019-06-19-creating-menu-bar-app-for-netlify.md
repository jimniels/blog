---
title: Creating a Menu Bar App for Viewing the Build Status of Your Netlify Sites
date: 2019-06-19
tags: engineering
---

In case you don’t already know, I like Netlify. And I [build](https://blog.jim-nielsen.com/2019/trigger-build-in-netlify-from-aws-iot-button/) [on](https://blog.jim-nielsen.com/2018/bookmarklet-deploys-with-netlify/) [it](https://blog.jim-nielsen.com/2018/netlibox-my-guest-post-on-netlify/) on a lot.

A while back, I was scrolling through my twitter feed and saw [this tweet from Phil Hawksworth](https://twitter.com/philhawksworth/status/1107646222582587392):

> I really like this. I've been meaning to make my own dashboard showing the status any of my sites that I care about by just including a list of [@Netlify](https://twitter.com/Netlify) deploy badges.
>
> [https://www.netlify.com/blog/2019/01/2...](https://www.netlify.com/blog/2019/01/29/sharing-the-love-with-netlify-deployment-badges/)
>
> But [@lekoarts_de](https://twitter.com/lekoarts_de) beat me to it with this nice example.

Similar to Phil, a tool of some sort showing the build status of all my sites on Netlify was a fun project idea I’d had in the back of my mind for a couple months. It was cool to see [somebody else execute on it](https://twitter.com/lekoarts_de/status/1107620649021960193) so beautifully:

![Screenshot of lekoarts_de’s Netlify status board]({{site.imageurl}}/2019/netlify-menubar-status-board-screenshot.png)

Not only can you checkout a [live demo of the dashboard](https://status.lekoarts.de), but you can also read/view/fork [the code behind it](https://github.com/LekoArts/gatsby-status-dashboard) to get your own dashboard! So why try and make anything better than that?

Well I’m not trying to. But I did try to make something _different_. Rather than a website dashboard, what if you had a menu bar app on your mac (sorry Windows folks, this post is not for you) that could show you the same information? Namely, what’s the build status of all my sites on Netlify?

That’s what I set out to do.

## A Netlify Menu Bar App for Mac

So how does it work exactly? Well, I thought about this a lot. I even thought about jumping into Xcode and learning how to build natively for Mac, but ain’t ~~nobody~~ me got time for that. At least not right now.

So instead I looked for tools with less of a learning curve. “There’s got to be a way to write JavaScript for OS X” I thought, “like an Electron app but for the Mac’s menubar.” Then I found [BitBar](https://github.com/matryer/bitbar): an app that let’s you “put the output from any script or program in your Mac OS X Menu Bar”. Boom! Precisely what I was looking for. “Netlify has [an API](https://www.netlify.com/docs/api/)” I thought, “I bet I could write a node script that talked to Netlify and conformed the output for BitBar!” A little while later and I had exactly what I wanted.

So how does it work?

By default you get a nice little Netlify logo in your menu bar.

![Screenshot of Netlify app in my Mac’s menu bar]({{site.imageurl}}/2019/netlify-menubar-screenshot-no-notification.png)

What’s neat is BitBar has instructions on how to build your menu bar app so it accommodates things like retina screens and dark mode.

![Screenshot of Netlify app in my Mac’s menu bar in dark mode]({{site.imageurl}}/2019/netlify-menubar-screenshot-no-notification-dark-mode.png)

BitBar also has a very simple API for indicating how often your script should run: via the file name! I set mine to run every minute (but I could make it every 30, 15, or 5 seconds if I wanted). Each time it runs, it asks Netlify for all my sites and the latest build status of each. If there’s a build in progress, I get a number next to the menu bar icon to indicating the number of sites currently being built.

![Screenshot of Netlify app in my Mac’s menu bar with a notification]({{site.imageurl}}/2019/netlify-menubar-screenshot-notification.png)

When I click on the menu bar app, I get a native dropdown which displays all my sites (I decided to group them by domain) along with a little status light indicator to show the build status:

- Green: latest build was successful
- Yellow: latest build is in progress
- Red: latest build failed
- Gray: no build pipeline applicable

![Screenshot of Netlify menu bar app dropdown]({{site.imageurl}}/2019/netlify-menubar-screenshot-dropdown.jpg)

Clicking on any of the sites listed in the dropdown will take you to that particular site in Netlify.

So putting it all together, you get something like this:

![Animated gif depicting how the Netlify menu bar app works]({{site.imageurl}}/2019/netlify-menubar-animated.gif)

## Under the Hood

So, from a technical perspective, how do you actually do all of this?

Well, first of all, you have to install [BitBar](https://getbitbar.com) on your Mac. Once installed, you’ll get a directory where you can put individual scripts (of all kinds might I add, like PHP, JavaScript, Ruby, Go, [etc](https://github.com/matryer/bitbar#tested-languages)). Those scripts get turned into individual menu bar apps.

So, in my case, I have a `netlify.1m.js` file in my BitBar scripts folder (the `1m` in [the filename tells bitbar](https://github.com/matryer/bitbar#configure-the-refresh-time) how often to refresh my script: every 1 minute). In addition, since my script is JavaScript (node) I have to put a shebang at the front of my file which denoting where my node executable is.

So, to get started, you have a file like `myFile.5m.js` which looks like this:

```
#!/usr/bin/env /path/to/the/node/executable

/*
  Write your javascript here.
  Anything you console.log() out is what ends up in your menubar.
*/
```
