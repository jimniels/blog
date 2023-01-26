#iconGalleriesBook

# Digital Preservation and “The App Icon Book”

<img src="https://cdn.jim-nielsen.com/blog/2022/flarup-app-icon-talk.png" width="1209" height="629" alt="Screenshot of a talk from Michael Flarup where he is talking about digital preservation. The frame shows Michael talking on the left, with his slides on the right showing a SNES game console and game on the left and a Macbook with Xcode and a cloud icon on the right." />

Here’s an excerpt from [a presentation by Michael Flarup](https://www.youtube.com/watch?v=NnMHQ2TA8Nw) talking about the difference between consoles and games created in the 80’s and 90’s vs. iPhones and games created in the 2010’s:

> Early cartridge and disk-based games have been fairly easy to preserve. If you have an NES and a game cartridge, you can play the game. But this is not possible for iPhone apps. To run an old iPhone app, you’ll need an older device and the related cloud services to be running as they were at the time.
>
> Modern software is in a strange place where it’s more at risk of being erased from history than software created in the pre-internet era. Everything we work on is so incredibly ephemeral.

This struck me as intriguing. To run an old game, you need the hardware (console) and the software (game cartridge). But with the interconnected, interdependent nature of so much software today, you not only need the hardware and the software, but also _all the cloud services_ the software depends on.

How will you run a web app in the future if `npm i` isn’t working in 100 years? Half (or even more) of the software’s code is missing from the source repository — that’ll be a complete headache for anyone in the future trying to run software from our present.

It’s so hard to preserve something in the original state and context of its time. You’re often required to make preservation decisions that alter the artifact from its original form.

## The App Icon Book As Digital Preservation

In the case of [The iOS App Icon Book](https://www.appiconbook.com/), we had to make decisions around color reproduction because the app icons in the book were designed on digital screens in RGB color space but the book required printing the icons in CMYK color.

Or, as another example, we tried to preserve the original setting of the icons which meant a box shadow for icons pre-iOS7 and a light, 1px border for icons post-iOS7. But there’s no 1px in print, so we had to make judgements around what effect in print most looked like a  digital `box-shadow` and `1px` hairline.

In order to achieve an act of preservation, we were required to make decisions like this which, admittedly, resulted in some kind of modification to each icon’s original artwork (or its frame of presentation).

So, in the end, the artwork is preserved but not in conditions identical to its original creation.

This is why I often think of digital preservation being akin to linguistic translation: you try to capture the form, essence, and meaning of the original intent but ultimately must make creative, work-altering decisions along the way. “Pure digital preservation” feels like a pipe dream, as we’re all increasingly captive to the present — our moment in time — and the ever-changing software out there in the cloud which powers so many aspects of our lives.