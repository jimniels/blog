#designEngineer

# Sanding UI, pt. II

Let’s say you make a UI to gather some user feedback. Nothing complicated. Just a thumbs up/down widget. It starts out neutral, but when the user clicks up or down, you highlight what they clicked an de-emphasize/disable the other (so it requires an explicit toggle to change your mind).

<img src="https://cdn.jim-nielsen.com/blog/2025/sanding-ui-ii-options.png" width="148" height="268" alt="A set of thumbs-up and thumbs-down icons in various states, with some in grayscale and others highlighted in green or red." />

So you implement it. Ship it. Cool. Works right?

Well, per [my previous article about “sanding” a user interface UI](https://blog.jim-nielsen.com/2024/sanding-ui/) by clicking around a lot, did you click on it _a lot_?

If you do, you’ll find that doing so selects the thumbs up/down icon as if it were text:

<img src="https://cdn.jim-nielsen.com/blog/2025/sanding-ui-ii-selected.gif" width="168" height="106" alt="Animated gif of a thumbs up icon being clicked repeatedly and gaining a text selection UI native to the OS." />

So now you have this weird text selection that’s a bit of an eye sore. It’s not relevant to _text selection_ because it’s not text. It’s an SVG. So the selection UI that appears is misleading and distracting.

<img src="https://cdn.jim-nielsen.com/blog/2025/sanding-ui-ii-selected-screenshot.png" width="184" height="112" alt="A thumbs up icon that was clicked repeatedly and has a text selection UI native to the OS overlaid on it." />

One possible fix: leverage the `user-select: none` property in CSS which makes it not selectable. When the user clicks multiple times to toggle, no text selection UI will appear.

<img src="https://cdn.jim-nielsen.com/blog/2025/sanding-ui-ii-not-selected.gif" width="170" height="102" alt="A thumbs up icon with a cursor over it and no text selection UI." />

Cool. Great!

Another reason to click around a lot. You can ensure any rough edges are smoothed out, and any “UI splinters” are ones you get (and fix) in place of your users.