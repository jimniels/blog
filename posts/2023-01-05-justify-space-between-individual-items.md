# Justify Space Between Individual Items in Flexbox

This is a seemingly trivial thing but I’ve probably looked it up at least three times now, so it’s time to write a blog post about it in hopes that I’ll finally remember the solution.

**tl;dr** when aligning a flat hierarchy of items with flexbox, you can use `margin: auto` to get the effect of justification between individual items.

<img src="https://cdn.jim-nielsen.com/blog/2023/flex-margin-auto-examples.png" width="800" height="420" alt="Illustration showing three flexbox layouts. The first is normal `display: flex`. The second shows the first element with a `grow: 2` rule making it fill the remaining space in its container. The third shows the first element with `margin: auto` making the space between elements become justified." />

## The Problem

Sometimes you have a list of nodes and you’re using flexbox to lay them out. For example, let’s say you have a set of navigation links.

```html
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/archive">Archive</a>
</nav>
<style>
  nav { display: flex }
</style>
```

Those will lay out on the horizontal axis.

<img src="https://cdn.jim-nielsen.com/blog/2023/flex-margin-auto-horizontal.png" width="800" height="160" alt="Illustration of three elements in a horizontal flex layout." />

But let’s say you want (a relatively standard) layout where you have the primary item on the left and secondary items on the right.

<img src="https://cdn.jim-nielsen.com/blog/2023/flex-margin-auto-justified.png" width="800" height="160" alt="Illustration of three elements in a horizontal flex layout, with the space justified between the first and second elements." />

There are a couple of ways to achieve this, some better than others.

## 👎 Solution 1: Extra Markup

Alter the markup by wrapping the stuff on the left in a `<div>` and the stuff on the right in a `<div>`, then justify the space between them.

```html
<nav>
  <div>
    <a href="/">Home</a>
  </div>
  <div>
    <a href="/about">About</a>
    <a href="/archive">Archive</a>
  </div>
</nav>
<style>
  nav {
    display: flex;
    justify-content: space-between;
  }
</style>
```

That gets you what you want, but you’re adding  markup solely for styling purposes.

## 👎 Solution 2: Flex Grow

You can tell the item on the left to grow and take up the remaining space.

```html
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/archive">Archive</a>
</nav>
<style>
  nav { display: flex }
  nav > :first-child { flex-grow: 2 }
</style>
```

That gets you what you want, but it makes the first child grow the entire length of the box. 

<img src="https://cdn.jim-nielsen.com/blog/2023/flex-margin-auto-grow.png" width="800" height="160" alt="Illustration of three elements in a horizontal flex layout, with the first element growing to fill the remaining space." />

From a visual standpoint, this space-filling effect might be unnoticeable for something like simple text.

However, from an interaction standpoint the link on the left grows to fill the unused space and will be clickable when you hover _the entire space_, not just the text. This results in a strange behavior where whitespace is interactive.

<img src="https://cdn.jim-nielsen.com/blog/2023/flex-margin-auto-hover.png" width="800" height="160" alt="Illustration of three elements in a horizontal flex layout, with the first element growing to fill the remaining space and a mouse hovering over the empty white space showing it is interactive." />

## 👍 Solution 3: Margin Auto

So, using only CSS, how do you justify the space between a set of individual items in a flat hierarchy of many items?

With the right keyword search, I was led to [this StackOverflow question](https://stackoverflow.com/questions/23621650/how-to-justify-a-single-flexbox-item-override-justify-content) which reminded me, once again, that you can use `margin` in flexbox to your advantage!

In our example, `margin: auto` will make the first link on the left fill the space between it and the following items _without making the link itself fill the left over space_.

```html
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/archive">Archive</a>
</nav>
<style>
  nav { display: flex }
  nav > :first-child { margin-right: auto }
</style>
```

<img src="https://cdn.jim-nielsen.com/blog/2023/flex-margin-auto-justified-margin.png" width="800" height="160" alt="Illustration of three elements in a horizontal flex layout with the first having `margin: auto` and the space between it and the other elements being justified." />

There you go, a whole blog post just for that. If you came here from a search engine, I hope that was helpful.