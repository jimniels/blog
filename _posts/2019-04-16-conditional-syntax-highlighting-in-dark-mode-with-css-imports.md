---
title: Using @import in CSS to Conditionally Load Syntax Highlighting Styles in Dark Mode
date: 2019-04-16
tags: engineering
---

I’ve been [playing around with dark mode](https://blog.jim-nielsen.com/2018/icon-galleries-dark-mode/) recently and found an interesting little trick I havent’t seen published anywhere. Let me tell you about  it.

You know how they always say “don’t use `@import` in CSS”? Well, that’s probably true in a lot of cases, but I recently found a case where using it actually makes a lot of sense, and is quite elegant in comparison to other similar solutions.

## The Problem

[I recently incorporated dark mode into my blog](https://blog.jim-nielsen.com/2018/dark-mode-on-the-web/), but it was a kind of “minimum viable” dark mode. One of the places where I didn’t fully polish my site’s styles for dark mode was in the code syntax highlighting of my blog posts. 

If you read my blog today (in “light mode”) you’ll see colored syntax highlighting for the code examples. However, when you switch to dark mode you lose that “feature” and all code just becomes white.

![Screenshot of code from my blog showing how it’s all the same color]({{ site.imageurl }}/2019/dark-mode-syntax-old-screenshot.png)

If you looked at the CSS for this, you’d see how I left myself a little @TODO comment saying “hey, you should get around to this”. I essentially had to overwrite all the “light mode” styles and say, “just make everything white when in dark mode”, as I hadn’t had the time to figure out a dark color scheme and how to make it work (that `*` selector is nested and ends up something like `.markdown pre *`):

![Screenshot of the syntax highlighting CSS code where I left a comment saying “fix this”]({{ site.imageurl }}/2019/dark-mode-syntax-old-code.png)

I finally got around to trying to make this a bit better and I found a nifty solution that uses `@import` in CSS.

## The Solution

My blog posts are rendered with [markdown-it](https://github.com/markdown-it/markdown-it) which gives you the ability to [add syntax highlighting](https://github.com/markdown-it/markdown-it#syntax-highlighting) to your generated markup. The markup that gets generated has a bunch of classes that correspond to syntax highlighting themes from [highlightjs.org](https://highlightjs.org/). So getting “light mode” working was pretty straightforward: I added a `<link>` to a highlight.js stylesheet hosted on a CDN and boom, I had syntax highlighting.

```html
<link rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/default.min.css">
```

Now the question is: when the user is in “dark mode”, how do I override the “light” styles I’ve `<link>`’d to and instead leverage a different, themed stylesheet from highlight.js? At first I thought I was going to have to use JavaScript to detect (and listen for) when the user was in dark mode and then trigger something that swaps out stylesheets. Having worked with [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) before, I figured that was the route I was going to go. But inside I was grumbling a bit, “that’s a lot of code to write for something so simple” I thought.

Then I started thinking about `@media (prefers-color-scheme: dark)` in CSS and how simple and declarative that was for handling light/dark mode. The declarative nature of CSS allows me to just say “when it’s dark, do this; when it’s light, do that.” Because I was already using `<link>` in my HTML to include the necessary stylesheet, I thought to myself: wouldn’t it be nice if I could just delaratively say use one or the other based on whether I’m in dark or light mode? i.e. something like this:

```html
<!-- If dark mode, use this -->
<link rel="stylesheet" href="cdn.com/atom-one-light.min.css">
<!-- Otherwise, assume its light mode and use this -->
<link rel="stylesheet" href="cdn.com/atom-one-dark.min.css">
```

I knew CSS already allowed you to do that logic using `@media` queries, but it took me a second before I remembered the oft-neglected `@import` at-rule, which  does exactly what I was alluding to with the conditional `<link>` tags in HTML. Then my brain made the jump: “wait a second, I could just pair `@import` with `@media` and I’m done!” I was thinking something akin to:

```css
/* By default, include the "light" color theme for syntax highlighting */
@import "cdn.com/atom-one-light.min.css";
/* And if you’re in dark mode, have those rules superseded via a different stylesheet */
@media (prefers-color-scheme: dark) {
  @import "cdn.com/atom-one-dark.min.css";
}
```

I was close, but that actually doesn’t actually work. The idea was there, I just had to figure out the right syntax. [Mozilla’s great docs pointed out](https://developer.mozilla.org/en-US/docs/Web/CSS/@import) that “`@import` cannot be used inside conditional group at-rules.” Instead, you actually declare conditional imports based on media queries (which I didn’t know was a thing, and is actually pretty dang cool). So, in my case, I ended up with two lines of code:

```css
/* Assume light mode by default */
@import "cdn.com/atom-one-light.min.css" screen;
/* Supersede dark mode when applicable */  
@import "cdn.com/atom-one-dark.min.css" screen and (prefers-color-scheme: dark);
```

That’s pretty cool, and honestly feels like a perfect case for `@import`. I am conditionally declaring styles for syntax highlighting based on whether the user is in dark mode or not. And I didn’t have to use any JavaScript. No event listeners. No imperative fetch calls. Just two lines of CSS and it works.

![Animated gif showing syntax highlighting changes between light and dark mode]({{ site.imageurl }}/2019/dark-mode-syntax-switch.gif)

It might not be apparent, but that gif showing the switch from light to dark is actually a whole different set CSS rules for doing syntax highlighting on that code.

`@media (prefers-color-scheme: dark)` is still pretty new, which is why I don’t use `@media (prefers-color-scheme: light)` for the first `@import`. I assume a light mode by default, but if the user has a newer browser and their system says they’re in dark mode, they’ll get the dark styles. The idea of conditionally serving different styles to different devices based on information queried from `@media` feels like the perfect use case for `@import` in CSS.

## Update: Apr 17, 2019

[@tylergaw](https://twitter.com/tylergaw) hit me up on twitter after this post, pointing out that you can use the `media` attribute on the `<link>` tag in HTML to essentially accomplish the same thing I was doing with `@import` in CSS.

> Yesterday's post was great. You're making me want to do light/dark styles for my site now. That import syntax is super cool, I'd never seen that. Could you also use the `media` attribute of `link` to accomplish the same thing? Like: 
> ```
> <!-- Default light mode and use this -->
> <link rel="stylesheet" href="cdn.com/atom-one-dark…">
> <!-- If dark mode, use this -->
> <link rel="stylesheet" href="cdn.com/atom-one-light…" media="screen and (prefers-color-scheme: dark)">
> ```

It’s funny because my questioning began at the HTML level, i.e. “wouldn’t it be nice if, in HTML, I could declaratively say ‘use this stylesheet if you’re in dark mode, otherwise use this one’”. Turns out you can!

Doing it in HTML is even cooler because now I have control over *when* the `<link>` appears in the HTML. For example, the CSS styles for syntax highlighting are really only applicable to “post” pages on my blog. For example, my “About” page doesn’t have any syntax highlighting on it, so including those styles is just dead weight. However, now that I can include these styles on a page-by-page basis, I can tap into my static site generator and only include the `<link>` to dark mode syntax highlighting on applicable pages. 

For example, I have a `<Page>` component that wraps every single `.html` page that gets output by my static site generator. Inside of that component, I can detect if the page it’s rendering is a “post” page. If it is, only then do I include a `<link>` to the syntax highlighting styles. Example:

```jsx
const Page = (props) => 
  <html>
    <head>
      {/* Styles every page on my site needs */}
      <link rel="stylesheet" href="assets/styles.css" />
      
      {/* Styles only post pages need */}
      {props.isPost && 
        <>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/atom-one-light.min.css"
            media="screen"
          />
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/atom-one-dark.min.css"
            media="screen and (prefers-color-scheme: dark)"
          />
        </>}
    </head>
  </html>
```

Now only my post pages will have `<link>` tags that retrieve syntax highlighting styles. And the browser takes care of fetching the right one, depending on whether the client is “in dark mode” or not.

This is pretty damn cool. In the future, I can imagine a world where you can split up all your stylesheets by light/dark and then just tell the browser “fetch the one you need, based on user preferences”.

```html
<link
  rel="stylesheet"
  href="light-mode-styles.css"
  media="screen and (prefers-color-scheme: light)"
/>
<link
  rel="stylesheet"
  href="dark-mode-styles.css"
  media="screen and (prefers-color-scheme: dark)"
/>
```