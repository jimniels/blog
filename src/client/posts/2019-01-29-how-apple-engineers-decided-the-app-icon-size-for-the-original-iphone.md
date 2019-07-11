---
title: How Apple Engineers Decided the App Icon Size for the Original iPhone
tags: stories
---

Ken Kocienda was one of the engineers on “Project Purple”, the codename for the project behind the original iPhone. He pioneered the iPhone’s multitouch keyboard along with autosuggest. He tells that story – along with others – in his recent book ([which I just read](https://blog.jim-nielsen.com/2019/book-notes-creative-selection/)) titled: [“Creative Selection: Inside Apple's Design Process During the Golden Age of Steve Jobs”](https://www.amazon.com/Creative-Selection-Inside-Apples-Process/dp/1250194466).

As you might know, I run a couple [icon](https://www.iosicongallery.com/) [gallery](https://www.macosicongallery.com/) [sites](https://www.watchosicongallery.com/) dedicated to showcasing beautiful app icon artwork from Apple’s app store. So it was quite interesting to me when I read Ken’s book and discovered the story around how exactly they came to the conclusion that the app icon should be 57 pixels square.

First, it’s worth noting that back around 2006 nobody was doing touchscreens. Seemingly-simple questions about UI/UX were uncharted territory, which meant a lot of trial and error. After trying new software on prototype hardware, they quickly realized things like “oh yeah, duh, tapping small things on a screen is hard. And it’s even hard for my friend Joe who has big fingers. We should make these things bigger.”

As Ken describes it in his book, the engineers behind the first iPhone began seeing their prototype come to life and one of the key questions looming in everyone’s mind was: what’s the optimal tap target size for objects on screen?

> Tap targets needed to be small enough so that a single screen displayed enough content to be useful but large enough that you could confidently tap what you wanted. Beyond that, we didn’t have more detailed notions about the sizes of onscreen objects. (222)

This was especially important for “Springboard”: the home screen of app icons. The first few sessions the engineers had with their crude iPhone prototypes provided them insight into the variety of human anatomy their product would encounter amongst the general public:

> Scott Forstall had long, spidery fingers that narrowed to small fingertips...[he] was genetically predisposed to be amazingly accurate with his touchscreen taps...In contrast, Greg Christie’s hands shook...

And Greg often encountered difficulty when on-screen tap targets were too small, frequently resulting in him cursing under his breath in frustration because he couldn’t properly tap on screen and execute the software with intention. More and more, this raised the question to the team: what’s the best size for a home screen icon?

That question was answered through a game. In Ken’s words, here’s how they came to the conclusion that the tap targets for home screen icons on the original iPhone should be 57×57 pixels square:

> Scott Herz...wrote an app and circulated it around the [iPhone] team. There wasn’t much to it. The app launched showing a very large Start button. After tapping that button, the screen would go blank for a moment, then a box would appear somewhere on the display. The goal was to tap the box. After you tapped, whether you succeeded or failed, and after another momentary blank, another box would appear somewhere else. Only this next box would be a different size, maybe larger, maybe smaller. Tap the box. Tap the box. Tap the box.
>
> Honestly, it was fun. Like a game. After twenty or so boxes and taps, the “game” would end, and the app would show you your score: how many boxes you hit and how many you missed. Behind the scenes, the software tracked the sizes of the boxes and their location. Since it was a fun game to play..._ahem_...a serious test program to gather essential touchscreen usability data, the Herz tap app made a quick round of the [iPhone] hallway. Within a few days, we had quite a bit of information about tap-target sizes and accuracy.
>
> The results of Scott’s game showed that if we placed a box on the screen that was fifty-seven pixels square, then we could put it at any location–high, low, left, or right. If we did that, then everybody could tap the box comfortably, with near 100 percent accuracy. (222)
