# Browser Defaults We Throw Away

[Stefan Judis on Twitter](https://twitter.com/stefanjudis/status/1533418029551439874):

> I'm diving into @remix_run and I strongly agree with the sentiment that a JS approach that includes writing `event.preventDefault` all the time is kinda off.
>
> The browser defaults are great, and yet we're rollin' our own for years now. 🤔

I’ve been thinking about browser defaults a bit lately.

I think there are a few browser-related features that, collectively, we simply ignore. They’re built-in to the browser for our use, and yet it has become an almost knee-jerk reaction to immediately override them.

I’m thinking of three things in particular:

1. `box-sizing: border-box`
2. CSS reset
2. `e.preventDefault()`

## box-sizing: border-box 

I frequented it so much to grab this snippet, I can still visualize [the post on Paul Irish’s website](https://www.paulirish.com/2012/box-sizing-border-box-ftw/) in my mind’s eye.

<img src="https://cdn.jim-nielsen.com/blog/2022/browser-defaults.png" width="620" height="446" alt="Screenshot of Paul Irish’s website with the `box-sizing: border` box blog post." />

If I say `width: 200px` I want it to be 200px. Not some other number depending on my borders and padding. I think a lot of people find this mental model more intuitive and, since it’s not the default for historical reasons, this is a piece of code I find myself writing a lot. Every time I start a new website, this is one of the first things I reach for.

Speaking of reaching for things every time I start a new site…

## CSS Reset

Many times when you start a new web page, you just want the browser defaults (as they regard to style) to get out of your way.

In my mind, the OG way of doing this is “[the Eric Meyer reset](https://meyerweb.com/eric/tools/css/reset/)”.

[Normalize](https://necolas.github.io/normalize.css/) is also a thing, but its ethos is the opposite: don’t _reset_ the defaults, _normalize_ them across browsers.

Andy Bell makes the argument that normalizing isn’t as big of a deal anymore and suggests [a modern CSS reset](https://piccalil.li/blog/a-modern-css-reset) (which uses `box-sizing: border-box` under the hood).

This is all to say: how many people don’t use _some_ kind of override for the browser defaults? Are these defaults getting in the way more than they’re helping? [@jacobmparis](https://twitter.com/jacobmparis/status/1648989316440375296?s=20) has an intriguing idea:

> Browsers should let us opt out of user agent styles so we don’t need to ship big reset stylesheets ourselves


## e.preventDefault()

Ah yes, `e.preventDefault()`, the CSS reset of JS. Form submitted? Link clicked? The very first thing we do is throw away all the browser’s default handling.

The idea was: make the `<form>` submission work _without_ JavaScript, and then use `e.preventDefault()` to have JavaScript take over.

The reality often is `<form>` doesn’t work without JS (sometimes user input doesn’t even take place inside a `<form>`, it’s inside a `<div>`). JavaScript becomes the sole executor of all interactivity and data mutations in the browser.

When the very first thing you do is write `e.preventDeafult()`, you’re immediately removing a whole class of default functionality that’s been built into browser for a very long time (e.g. submission serialization and request cancelation upon multiple clicks).

This is merely an observation. Everybody has different constraints, different goals, and different priorities. But I do think `e.preventDefault()` falls in the class of items in this post: browser defaults we throw away almost daily.

## Where Do We Go From Here?

I don’t have solutions to the above. Mostly this is a diary note taking inventory of the platform’s defaults that we’re constantly overriding. And if we’re constantly overriding the defaults, perhaps we should stop and think: are these defaults helping more than they’re hurting? But also: why were these made the defaults in the first place?

Often we toss away the defaults because that’s what we see others do. But to paraphrase G.K. Chesterton, don’t tear down a fence until you know why it was put there in the first place.