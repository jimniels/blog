---
tags: css
---

# Custom Style Sheets in Safari

I first heard mention of adding a custom style sheet in Safari a couple months back. I honestly can’t remember where I saw it but I was reading _something_ and, in passing, the author mentioned the idea of hiding the right sidebar on Twitter using a custom style sheet in Safari. This thing:

<img src="https://cdn.jim-nielsen.com/blog/2021/custom-stylesheet-twitter-sidebar.png" width="350" height="939" alt="Screenshot of the right sidebar of twitter.com, circa Jan 2021.">

It’s funny how you sometimes miss the entire point of someone’s writing and selectively remember what you want, in this case “hey, I can hide that dumb module on Twitter with little effort?” I’d like to say that I have the self-discipline to avoid clicking on anything in that module, but unfortunately I am not that strong of a person. Sometimes I just get bored and something there makes me think “oh, hmm, I wonder...” and then I click it. It’s one of those things where, if it wasn’t there, it wouldn’t be a problem. Like keeping cookies right next to your desk. But it’s frictionless and easy and RIGHT THERE that I succumb. But I digress. My weaknesses are not on trial in this post.

The thought hit me: “hey I should hide that right sidebar on twitter.com using a custom style sheet in Safari!” So I did. And then I moved on with life. I never thought to write a post about it because, you know, custom style sheets in a browser? That’s old news.

But then, I recently found [this post published in November of 2020](http://kgrz.io/safari-custom-user-agent-css-overrides-using-webfonts.html) about customizing your browsing experience using custom style sheets and thought “I guess this isn’t old news just quite yet.” Plus [I’m trying to write a lot more this year](https://blog.jim-nielsen.com/2021/writing-in-2020-and-2021/), so here we are.

Note: it’s worth mentioning that hiding the right sidebar in twitter isn’t a novel idea. [Craig Hockenberry created](https://twitter.com/chockenberry/status/1162440345830846464?s=20) a Safari extension that’ll do it for you called “Fixerrific”. Granted, like my custom style sheet, this removes the entire right sidebar, including the search box which you might actually find useful. That said, you can still access the search functionality on twitter by going to the Explore tab.

## How I Did It

First off, Safari lets you specify a custom style sheet.

<img src="https://cdn.jim-nielsen.com/blog/2021/custom-stylesheet-safari-preferences.png" alt="Screenshot of Safari’s preferences pane where you can select a custom style sheet." width="904" height="525" />

In case you don’t know, a custom style sheet is a bunch of CSS rules that you get to specify and then the browser will apply them _to every single web page you visit_.

The first thing I needed to do was open twitter.com and find out what type of CSS rule I could write to target that right sidebar. I can tell you, it wasn’t easy. Twitter has a bunch of generated classes names, which I’m assuming are quite dynamic, so finding a rule that would target the right sidebar _and not change in the near future_ seemed like it might be tough. But then I found it: a DOM node which encompassed the entire right sidebar that had a very specific attribute `data-testid="sidebarColumn"`. 

<img src="https://cdn.jim-nielsen.com/blog/2021/custom-stylesheet-twitter-sidebar-dom.png" alt="Screenshot of twitter.com in Safari with the developer tools open and targeting a parent DOM node of the right sidebar." width="1191" height="876" />

I can’t say for sure, but that looks like one of those attributes the QA team appends to certain elements they want to find with their automated browser tests. The whole purpose of those kinds of attributes is so the engineers won’t touch them and change their names, that way the automated tests can run for a long time without breaking. Again, I can’t make any guarantees, but this selector will probably be around for a while. So I felt pretty confident I could use that selector and not have it break in a short period of time due to twitter refactoring their DOM markup.

Once I had a selector I could use, I opened my text editor and created the following CSS file:

```css
/* Twitter: sidebar */
[data-testid="sidebarColumn"] {
  display: none;
}
```

From there, I saved the `.css` file in my Dropbox folder (for backup purposes, i.e. a lazy man’s version control) then opened Safari’s preferences and selected my newly created file. A restart of Safari and boom! The sidebar was gone.

Feeling emboldened and empowered with my CSS sword of righteousness, I figured I’d go ahead and get rid of the DM/chat widget thing twitter recently introduced. It was merely visual noise to me. And fortunately, it had a similar way to be targeted: `[data-testid="DMDrawer"]`.

<img src="https://cdn.jim-nielsen.com/blog/2021/custom-stylesheet-twitter-dm-dom.png" alt="Screenshot of twitter.com in Safari with the developer tools open and targeting a parent DOM node of the right sidebar." width="1191" height="876" />

Pretty cool. Now I have a version of twitter custom tailored to me, free of a lot of distractions I don’t want to see.

<img src="https://cdn.jim-nielsen.com/blog/2021/custom-stylesheet-applied-to-twitter.png" alt="Screenshot of twitter.com in Safari with a custom style sheet applied that hides the sidebar and the DM widget in the bottom right." width="1236" height="846" />

## Observations Nobody Asked For

If you write a lot of custom styles for sites across the web, you could start running into naming collisions. It would be neat if you could scope styles to a specific domain. Maybe there’s a way to do it? I couldn’t think of one. Imagine:

```
:root[location*="twitter.com"] .selector {
  display: none;
}
```

JavaScript has access to a page’s URL via `window.location` but AFAIK that’s not available—at least not in any standardized way—in CSS.

It's likely a terrible idea, but we have custom user  style sheets, is there such a thing as a custom user scripts? Imagine giving a `.js` file to the browser and it runs it on every single page, like a custom style sheet. Why? Because I want to specify all my custom styles using JavaScript not CSS.

Just kidding.

But seriously, if there was something like this, I could have a script that runs on every page and sticks an attribute on the root html element with the page’s URL. Imagine:

```js
document.documentElement.setAttribute("data-location", window.location.href);
```

This would result in every page getting an attribute on the root element with the current page’s `href` on it.

```html
<html data-location="https://twitter.com/home">
<head>...</head>
<body>...</body>
</html>
```

This would allow me to scope every single one of my custom style sheet selectors to a specific domain:

```css
[data-location*="twitter.com"] .selector {
  display: none;
}
```

Honestly, that sounds cool but impractical (not to mention the incredible security implications). It’s fun to think about though.

But hey, if I felt like disabling JavaScript, I could use this theoretical custom script functionality to run the following JavaScript on ever page I visit, just to show who really is in power:

```js
throw Error("Where are your JavaScript gods now?");
```

## Conclusion

I love old-school browser functionality like this. Can you imagine a feature like custom style sheets being proposed and implemented in today’s world? I feel like this is in Safari as a holdover from a bygone era. Could it ever get the momentum to happen today? I worry Apple might take it out sometime in the future.

All that said, if you want to read more, [this post has a perspective on the history of custom style sheets in Safari](http://theoveranalyzed.net/2018/3/16/safaris-custom-style-sheet#the-history-of-user-defined-style-sheets-in-desktop-safari) that you might find interesting.

## Update 2020-01-14

I received an email from [John P. Rouillard](https://www.cs.umb.edu/~rouilj/resume/) who read my question about having custom user scripts and said “You mean like greasemonkey or tapermonkey?”

I realized when I wrote that paragraph that I was merely describing what browser extensions are for. What I was trying to get at is that it would be really cool if custom user scripts were a feature of the browser, i.e. adding a custom user script was as simple as adding a custom style sheet: select a `.js` file on disk and boom, you’re done.

That said, maybe I’ll give one of these user scripts extensions a try. I’ve heard of greasemonkey and used it back in like 2012. But I’ve never heard of tampermonkey. Looks like it’s [open source](https://github.com/Tampermonkey/tampermonkey) and even available for [Safari](https://www.tampermonkey.net/?browser=safari). Thanks John!

