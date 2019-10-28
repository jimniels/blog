---
title: Netlify as an FTP Server
tags: engineering
---

Or, "how to revivie the old dropbox public folder"

Or, "how to use netlify as an FTP but also a global CDN"

Ways I tried:

- script editor that launches terminal script
- bitbar that has a shortcut to launching terminal script
- daemon that watches files in background and launches terminal script (sends notification)
- bitbar that runs every couple seconds with local index of files and checks for changes

## The Core Idea: A Netlify Deploy Script - Use Netlify JS to Deploy a Folder

On twitter

The implementation was actually quite simple, thanks to the hard work of people at Netlify who had already built the tool to deploy via the API.

```js
const NetlifyAPI = require("netlify");
const client = new NetlifyAPI("YOUR_TOKEN_HERE");

client
  .deploy("SITE_ID", "/path/to/folder", {/* options */})
  .then(res => {
    /* site was successfully deployed!
       `res` is netlify telling you about it */
  })
  .catch(err => {
    console.error(err);
  });
```

## Attempt 1: BitBar

My first thought was to build another [BitBar](https://github.com/matryer/bitbar) plugin. I say another because I already built [a menubar plugin for Netlify](https://blog.jim-nielsen.com/2019/how-to-create-a-macos-menu-bar-app-for-netlify/) once before, so this approach seemed actually achievable from a technical perspective. And it was pretty straightforward too based on BitBar’s API.

```js
#!/usr/bin/env /usr/local/bin/node
const fs = require("fs");
const NetlifyAPI = require("netlify");
const path = require("path");

console.log("Netlify");
console.log("---");
console.log(
  "Sync to CDN | bash=/usr/local/bin/node param1=/Users/jimnielsen/Sites/jim-nielsen.com/cdn/deploy-to-netlify.js"
);
```

What that code above is basically doing is outputting a link that goes in a mneubar dropdown which, when clicked, opens a terminal window and triggers my netlify deploy script (mentioned above).

![Animated gif depicting how bitbar menubar dropdown works](/images/2019/netlify-sync-in-terminal.gif)

Pros:
- Already know how to build it
- Manual deployment. I get to decide when I’ve made file changes that I consider to be ready for deployment. No wasted deploys for batch changes.

Cons:
- Manual deployment. I have to remember to deploy anytime I change files, which is a click away and a bit obtrusive because it launches a terminal window (which I could change by telling BitBar to silently launch the window, but then I can’t see a log of what happened).

In summary: this approach worked, but I didn’t love the experience of it. It was basically a GUI shortcut to launching a terminal script; in other words, it was one level of abstraction above opening the terminal and then typing the command to execute a script.

## Attempt 2: Script Editor on Mac

One of the things I really felt was lacking from the BitBar approach was the feedback loop. My options were: open the deploy script in a terminal window every time I deploy and see the log of what happened, or silently trigger the script and never see what happened (unless I went to netlify.com and looked up if the deploy was successful).

This got me thinking about how I could achieve some more subtle level of feedback. This threw me down a rabbit hole of building something “closer to the metal” of macOS. Could I trigger like a system notification that just said, “Deploy successful! `n` files changed"? What about some kind of live “files are syncing” progress bar? These questions led me to discover something I’d vaguely known about but never actually looked into: building native applications for Mac using JavaScript.

I have vaguely known about building native apps for Mac using JavaScript. There Electron, of course, but I’d never dabbled in it. I also remember [an old post by a friend about building OS X apps with JavaScript](https://tylergaw.com/articles/building-osx-apps-with-js/). I re-read it and followed the links in the post to a number of related articles. Then I learned about this thing called “[JXA](https://github.com/JXA-Cookbook/JXA-Cookbook)” which looked _very_ interesting.

I hacked around on this a bit and figured out how to get the native script menubar item up with my custom script in it:

![Screenshot of the Script Editor menubar app in macOS](images/2019/netlify-sync-script-editor-menubar.jpg)

I even got it working:

![Animated gif showing my node deploy script being triggered through the Script Editor menubar](images/2019/netlify-sync-script-editor-menubar.gif)

You probably noticed that, when I say “working”, I mean I was able to write some simple JavaScript in the Script Editor app that merely opened the terminal and triggered my node deploy script. 

![Screenshot of the Script Editor with my single-line custom script in it](images/2019/netlify-sync-script-editor.png)

So really, what I had was the same thing as my first BitBar solution: a GUI where I can click and trigger a script in the terminal. 

After a couple hours of researching and trying to deduce exactly how to achieve what I wanted—native macOS UI controls and feedback mechanisms—I basically gave up. Apple’s docs on scripting looked very promising, especially the parts about [file watching](https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/WatchFolders.html#//apple_ref/doc/uid/TP40016239-CH39-SW1), [displaying notifications](https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/DisplayNotifications.html#//apple_ref/doc/uid/TP40016239-CH61-SW1), and [displaying progress](https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/DisplayProgress.html#//apple_ref/doc/uid/TP40016239-CH37-SW1). Those were all exactly the kinds of things I wanted to do: watch some files for changes, do something in response, display progress as things were completed, then provide feedback when its all done.

In the end, though, I couldn't quite get things working. I’m so used to working in this node/npm mindset, but I was unsure about running a node script under mac automation. It sounded like you could use a bundler to build the script then run it as an automation script, but once I read “bundler” I gave up. I was  too fatigued to throw a bundler on top of everything I was already trying to learn and setup. There were some [other interesting](https://github.com/johnelm/node-jxa) JS libs that looked like they might help, but I was too far in at this point and wanted out.

Pros:
- Possibility to access native macOS libs for things like watching files, showing progress, or triggering notifications.
- Script tools are built-in to the Mac

Cons:
- Mac automation using JavaScript is a new concept/syntax to learn. Difficult to find really great, definitive, exhaustive docs (Apple basically gives [you release notes for JavaScript automation](https://developer.apple.com/library/content/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/OSX10-10.html#//apple_ref/doc/uid/TP40014508-CH109-SW1), but not great docs, at least that I can tell) other than [Mac Automation Scripting](https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/DisplayProgress.html#//apple_ref/doc/uid/TP40016239-CH37-SW1) which is more detailed if you’re doing AppleScript

In summary: I could see myself coming back to this prospect in the future. The idea of the Mac natively supporting JavaScript for scripting automation is incredibly intriguing. I’d really love to learn more about it, and how the worlds of npm and JXA could (or should) meet. But at the end of the day, I just wanted to get something working and so skipped this effort. But I think this will be good project to “grind my JavaScript for macOS axe” on someday.

## Attempt 3: 

## Attempt 4: BitBar, But More Sophisticated
