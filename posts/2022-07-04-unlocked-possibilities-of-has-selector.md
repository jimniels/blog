#css

# The Unlocked Possibilities of the :has() Selector

I was listening to [ShopTalkShow Ep. 520](https://shoptalkshow.com/520/) where Eric Meyer talks about all the new possibilities (many yet undiscovered) the `:has()` selector unlocks, including what he calls “classes-less markup”. Here’s Eric:

> Anytime you’ve been in a situation where you’re like, “Ah crap, I have to class the parent two or three levels up…so I can style it different”, [with `:has()`] that goes away.

This is amazing the more you think about it. Let’s think about it some more.

Traditionally, I’ve had to rely on JavaScript to add and remove classes for styling concerns. Something happened in the DOM? Add a class over here and over there so I can style different elements throughout the tree. But with `:has()` that goes away. No more reliance on JavaScript (or duplicating state in the form of a class, more on that in a moment).

A great illustration of this idea is usage of the [`:checked` pseudo-class](https://css-tricks.com/almanac/selectors/c/checked/). Today, you might style something different in the UI depending on whether a checkbox is checked. To do this with pure CSS, you’re required to structure your markup in such a way that you can target elements with CSS based on that state. For example, leveraging the adjacent sibling selector.

```html
<form>
  <input type="checkbox">
  <label>Make this red when checked</label>
</form>

<style>
  [type="checkbox"]:checked + label { color: red }
</style>
```

You pretty much _have to_ write your markup that way. If, for example, you nest the `<input>` inside the label then there’s no way to target the `<label>` once the checkbox is checked other than using JavaScript to add/remove a class higher up the tree.

```html
<form>
  <label>
    <input type="checkbox">
    Make this red when checked
  </label>
</form>

<style>
  /* `[type="checkbox"]:checked` can only target siblings
     and sibiling children. Otherwise you’ll have to
     add/remove a class with JS */
  label.checked { color: red }
</style>

<script>
  document.querySelector("[type=checkbox]")
    .addEventListener("change", () => {
      /* code that handles adding/removing `.checked` class */
    })
</sript>
```

With `:has()`, targeting an element at any level of the DOM tree based on state anywhere else in the DOM tree becomes incredibly easy. This frees you to structure your HTML in the most semantic form possible, not due to some constraint of available CSS selectors.

```html
<form>
  <label>
    <input type="checkbox">
    Make this red when checked
  </label>
</form>
<button>Make this red too!</button>

<style>
  body:has([type="checkbox"]:checked) label,
  body:has([type="checkbox"]:checked) button {
    color: red;
  }
</style>
```

What’s intriguing about this is how it starts to look like React in terms of “re-rendering”. In React, you have a canonical place for state and everything derives from that. If state changes, everything re-renders — `UI=fn(s)`. With `:has()` a similar idea comes to CSS! How?

Imagine a DOM tree.

<img src="https://cdn.jim-nielsen.com/blog/2022/has-selector-dom-tree-1.png" width="650" height="370" alt="A tree of nodes representing the DOM." />

In today’s DOM, if you have a piece of state somewhere in the tree that can be controlled by the user, you need JavaScript to listen for changes to that state and duplicate it in the form of classes elsewhere in the tree.

<img src="https://cdn.jim-nielsen.com/blog/2022/has-selector-dom-tree-2.png" width="650" height="370" alt="A tree of nodes representing the DOM, with one of the nested childnodes having an arrow drawn elsewhere in the tree to illustrates how its state must be duplicated to style other places in the DOM." />

With `:has()`, you don’t have to duplicate that piece of state in the form of class names elsewhere in the DOM to get styling control. Instead, you can write a `:has()` selector which looks for it anywhere in the tree.

<img src="https://cdn.jim-nielsen.com/blog/2022/has-selector-dom-tree-3.png" width="650" height="370" alt="A tree of nodes representing the DOM, with a :has() selector at the top which can target anything anywhere in the DOM based on an element anywhere in it." />

As another example, imagine a color scheme preference control. You could stick it _anywhere_ in the DOM and get styling control at any other level of the DOM you desire — no JavaScript or extra CSS classes necessary. [Check out this codepen as an example](https://codepen.io/jimniels/pen/QWmwxjY?editors=1100). (Granted, this doesn’t solve persistent state across requests and all that, but it does illustrate this idea of class-less markup.)

This is just one of the possibilities the `:has()` selector unlocks. A [previous sibling selector](/2022/previous-sibling-selector/) is another. What other possibilities are there? I’m excited!