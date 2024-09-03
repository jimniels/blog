# Sanding UI

One of the ways I like to do development is to build something, click around _a ton_, make tweaks, click around more, more tweaks, more clicks, etc., until I finally consider it done.

The _clicking around a ton_ is the important part. If it’s a page transition, that means going back and forth a ton. Click, back button. Click, right-click context menu, “Back”. Click, in-app navigation to go back (if there is one). Click, keyboard shortcut to go back. Over and over and over. You get the idea.

It’s kind of a QA tactic in a sense, just click around and try to break stuff. But I like to think of it as being more akin to woodworking. You have a plank of wood and you run it through the belt sander to get all the big, coarse stuff smoothed down. Then you pull out the hand sander, sand a spot, run your hand over it, feel for splinters, sand it some more, over and over until you’re satisfied with the result.

With software, the fact is that sometimes there are just [too many variables](https://daverupert.com/2024/02/ui-states/) to know and test and smooth out. So I click around, [using the UI over and over](https://notes.jim-nielsen.com/#2023-03-08T1210), until I finally cannot give myself any more splinters.

Just the other day, I was working on a list of radio options, pretty standard-fare stuff:

- Create a `<label>` with an associated `<input type="radio">`.
- Put them on the same row, center align them with a gap between the control and the label.
- Etc.

As an oldie who used to leverage floats in CSS, I’m still amazed when I can use flexbox to do this stuff — it’s so easy!

```html
<div class="container">
  <label for="control">Foo</label>
  <input id="control" type="radio">
</div>

<style>
	.container {
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  gap: .5rem;
	}
</style>
```

As I was doin’ my thang — clicking around a bunch, trying to get some splinters — I realized there was a dead spot in the UI, a place between the radio and the label where clicking didn’t toggle the control like I expected.

<img src="https://cdn.jim-nielsen.com/blog/2024/radios-flexbox-animated.gif" width="172" height="135" alt="Animated gif of some radio inputs where the space between the control and the label doesn’t select the radio grouping." />

“What the?” I thought. “I’ve got my `<label>` and `<input>` and associated `for` attribute, why isn’t this working?” Then I thought, “`gap` in my flex display must be the culprit!”

<img src="https://cdn.jim-nielsen.com/blog/2024/radios-flexbox.png" width="312" height="159" alt="Screenshot of Chrome developer tools where an item has a flex layout with a CSS gap in between a label and an input." />

Sure enough, it was. While flexbox had made it super easy to add some visual spacing between the control and its label, that spacing had become a dead zone of interaction even though it wasn’t my intention!

There’s probably a million different ways to solve this problem — because [CSS is awesome](https://blog.jim-nielsen.com/2021/css-is-in-fact-awesome/) — but I just removed the `gap` and added some padding to my label, then voilà!

<img src="https://cdn.jim-nielsen.com/blog/2024/radios-non-flexbox-padding.png" width="95" height="29" alt="Screenshot Chrome developer tools with a label that has a left padding." />

Putting padding on the label, instead of the containing flexbox, made the whole thing clickable without a deadzone.

<img src="https://cdn.jim-nielsen.com/blog/2024/radios-non-flexbox.png" width="269" height="81" alt="Screenshot of the Chrome developer tools where an element has a flex layout but no gap." />

A bunch more clicking around and things were working as expected.

<img src="https://cdn.jim-nielsen.com/blog/2024/radios-non-flexbox-animated.gif" width="135" height="106" alt="Animated gif of some radio inputs where the space between the control and the label can be clicked and it selects the entire radio grouping." />

It’s a small thing, but lots of small splinters lead to an agonizing experience.

So my recipe is: sand it, feel the grain, get a splinter, sand again, and repeat until smooth.