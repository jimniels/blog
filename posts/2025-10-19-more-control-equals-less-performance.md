# Write Code That Runs in the Browser, or Write Code the Browser Runs

I’ve been thinking about [a note](https://notes.jim-nielsen.com/#2025-07-18T0946) from Alex Russell where he says:

> any time you're running JS on the main thread, you're at risk of being left behind by progress.
>
> The zen of web development is to spend a little time in your own code, and instead to glue the big C++/Rust subsystems together, then _get out of the bloody way._

In his thread on Bluesky, [Alex continues](https://bsky.app/profile/infrequently.org/post/3lu7j6gwjf2cd):

> How do we do this? Using the declarative systems that connect to those big piles of C++/Rust: CSS for the compositor (including scrolling & animations), HTML parser to build DOM, and for various media, dishing off to the high-level systems in ways that don't call back into your JS.

I keep thinking about this difference:

- I need to write code that does X.
- I need to write code that calls a browser API to do X.

There’s a big difference between A) making suggestions for the browser, and B) being its [micromanager](https://bell.bz/be-the-browsers-mentor-not-its-micromanager/).

Hence the title: you can write code that will run in the browser, or you can write code that calls the browser to run.

## A Few Examples

So what are the browser ‘subsystems’ I can glue together? What are some examples of things I can ask the browser to do rather than doing them myself?

A examples come to mind:

- View transitions API (instead of JS DOM diffing and manual animation).
- CSS transitions or `@keyframes` (GPU-accelerated) vs. manual JS with `setInterval` updates.
- `scroll-behavior: smooth` in CSS vs. JS scroll logic.
- CSS grid or flexbox vs. JS layout engines (e.g., Masonry clones).
- `<video>` and `<audio>` elements with native decoding and hardware acceleration vs. JS media players.
- `<picture>` or `<img>` with `srcset` for responsive images vs. manual image swapping logic in JS.
- Built-in form state (`formData`) and validation (`required`, `pattern`, etc.) vs. JS-based state, tracking, and validation logic.
- Native elements like `<details>`, `<dialog>`, `<select>`, etc., which provide built-in keyboard and accessibility behavior vs. custom ARIA-heavy components.

## Going Galaxy Brain

<img src="https://cdn.jim-nielsen.com/blog/2025/galaxy-brain-animation.jpg" width="500" height="702" alt="Galaxy brain meme from top to bottom: setTimeout -> requestAnimationFrame -> document.startViewTransition -> @view-transition" data-og-image />

The trick is to let go of your need for control. Say to yourself, “If I don’t micromanage the browser on this task and am willing to let go of control, in return it will choose how to do this itself with lower-level APIs that are more performant than anything I can write.”

For example, here are some approaches to animating transitions on the web where each step moves more responsibility from your JavaScript code on the main thread to the browser’s rendering engine:

- `setTimeout`
    - JS timers, DOM manipulation, browser repaints when it can. Dropped frames.
- `requestAnimationFrame`
    - Syncs to browser repaint cycle. Smooth, but you gotta handle a lot yourself (diffing, cleanup, etc.)
- View Transitions in JS
    - JS triggers, browser snapshots and animates. Native performance, but requires custom choreography on your part.
- View Transitions in CSS
    - Declare what you expect broadly, then let the browser take over. 

It’s a scale from:

I want the most control, and in exchange I’ll worry about performance.

To:

I don’t need control, and in exchange you’ll worry about performance.

I don’t know about you, but I’d much rather hand over performance, accessibility, localization, and a whole host of issues to the experts who build browsers.

## It’s Trade-offs All the Way Down

Building on the web is a set of choices:

- Do it yourself.
- Let the browser do it.
- Somewhere in between. 

Anytime you choose to do something yourself, you’re choosing to make a trade-off. Often that increase in control comes at the cost of a degradation in performance. 

Why do it yourself? Often it’s because you want a specific amount of control over the experience you’re creating. That may be perfectly ok! But it should be a deliberate choice, not because you didn’t consider (or know) the browser offers you an alternative. Maybe it does!

So instead of asking yourself, “How can I write code that does what I want?” Consider asking yourself, “Can I write code that ties together things the browser already does to accomplish what I want (or close enough to it)?”

Building this way will likely improve your performance dramatically — not to mention decrease your maintenance burden dramatically!