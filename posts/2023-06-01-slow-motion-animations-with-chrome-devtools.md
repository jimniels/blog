#cssViewTransitions

# Watch Transitions in Slow Motion in Chrome’s DevTools

For those of you about to do view transitions, I salute you!

And I pass on this super useful (perhaps obvious) piece of information [I received from Bramus](https://twitter.com/bramus/status/1661727675218796548?s=20): watch your animations play out in slow motion using Chrome’s devtools.

I’ve been [working on view transitions](https://twitter.com/jimniels/status/1656874636095700992?s=20) on my icon gallery site but was running into an issue where going from page A to page B worked fine, but then hitting the back button was causing this super weird flash of content and transitions.

I couldn’t tell precisely what was happening, so I did a screen recording of the page transitions and then [scrubbed through the recording frame-by-frame](https://twitter.com/jimniels/status/1661586581407379457?s=20) to analyze what was happening. 

Turns out, hitting the back button from page B to page A would:

- Jump from B to A instantly
- Jump from A back to B instantly, with B now visually missing the element it was supposed to transition _from_
- B cross fading to A, but A now visually missing the element it was supposed to transition _to_
- Once the transition was entirely complete, the element we were transitioning to would pop into place instantly

This all happened so fast it was impossible to perceive without watching things in slow motion — hence my screen recording.

Bramus jumped into the fray and solved all my problems by 1) noting this was [a bug in Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=1448818) (thus relieving me of the feeling that I was incompetent), and 2) clueing me in on the “Animations” panel in Chrome’s devtools.

The animations panel lets you slow down the animations happening in the browser so you watch them play out at much slower speeds and troubleshoot the mechanics of the animation.

To do it, open the console drawer (`ESC`), then choose the “Animations” panel from the “More” menu (vertical three dots). Or, open the Animations panel from the command palette (`CMD` + `Shift` + `P` on Mac) and search for animations.

<img src="https://cdn.jim-nielsen.com/blog/2023/animations-panel-command-palette.png" width="584" height="184" alt="Screenshot of the command palette in Chrome’s devtools with the keyword “Animat” typed in and filtering the list of options so the first list item is the command to show the “Animations” panel. " />

From here, you can set your animation speed and watch the animation play in slow-mo!

<img src="https://cdn.jim-nielsen.com/blog/2023/animations-panel-icon-gallery.gif" width="556" height="370" alt="Animated gif showing a buggy view transition on macosicongallery.com" />

Absolutely _yuge_ shout out to [Bramus](https://www.bram.us/) for helping me out on this one. As view transitions become more and more prevalent, I anticipate the Animations panel becoming one of my top-used features of the devtools.