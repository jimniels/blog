#generalNotes #talkNotes

# Notes from Alexander Petros’ “Building the Hundred-Year Web Service”

I _loved_ this talk from [Alexander Petros](https://alexanderpetros.com) titled [“Building the Hundred-Year Web Service”](https://www.youtube.com/watch?v=lASLZ9TgXyc). What follows is summation of my note-taking from watching the talk on YouTube.

---

Is what you’re building for future generations:

- Useful for them?
- Maintainable by them?
- Adaptable by them?

Actually, forget about future generations. Is what you’re building _for future you_ 6 months or 6 years from now aligning with those goals?

While we’re building codebases which may not be useful, maintainable, or adaptable by someone two years from now, the Romans built a bridge thousands of years ago that is still being used today.

> It should be impossible to imagine building something in Roman times that’s still useful today. But if you look at [Trajan’s Bridge in Portugal, which is still used today] you can see there’s a little car on its and a couple pedestrians. They couldn’t have anticipated the automobile, but nevertheless it is being used for that today.

That’s a conundrum. How do you build for something you can’t anticipate? You have to think [resiliently](https://resilientwebdesign.com/).

Ask yourself: What’s true today, that was true for a software engineer in 1991? One simple answer is: Sharing and accessing information with a uniform resource identifier. That was true 30+ years ago, I would venture to bet it will be true in another 30 years — and more! 

> There [isn’t] a lot of source code that can run unmodified in software that is 30 years apart.

And yet, [the first web site ever made](https://info.cern.ch) can do precisely that. The source code of the very first web page — which was written for a line mode browser — still runs today on a touchscreen smartphone, which is not a device that Tim Berners-less could have anticipated.

<img src="https://cdn.jim-nielsen.com/blog/2025/old-web-source-code.png" width="1083" height="610" alt="" />

Alexander goes on to point out how interaction with web pages has changed over time:

- In the original line mode browser, links couldn’t be represented as blue underlined text. They were represented more like footnotes on screen where you’d see something like this[1] and then this[2]. If you wanted to follow that link, there was no GUI to point and click. Instead, you would hit that number on your keyboard.
- In desktop browsers and GUI interfaces, we got blue underlines to represent something you could point and click on to follow a link
- On touchscreen devices, we got “tap” with your finger to follow a link.

While these methods for interaction have changed over the years,  the underlying medium remains unchanged: information via uniform resource identifiers.

> The core representation of a hypertext document is adaptable to things that were not at all anticipated in 1991.

The durability guarantees of the web are absolutely astounding if you take a moment to think about it.

<img src="https://cdn.jim-nielsen.com/blog/2025/old-web-alternative-platforms.png" width="1074" height="600" alt="" />

In you’re sprinting you might beat the browser, but it’s running a marathon and you’ll never beat it in the long run.

> If your page is fast enough, [refreshes] won’t even repaint the page. The experience of refreshing a page, or clicking on a “hard link” is identical to the experience of partially updating the page. That is something that quietly happened in the last ten years with no fanfare. All the people who wrote basic HTML got a huge performance upgrade in their browser. And everybody who tried to beat the browser now has to reckon with all the JavaScript they wrote to emulate these basic features.