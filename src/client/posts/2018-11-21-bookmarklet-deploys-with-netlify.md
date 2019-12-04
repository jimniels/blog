---
title: Triggering a Deploy in Netlify With Bookmarklets
tags: engineering netlify
---

Ok here’s the pitch: trigger a build of your Netlify site through a custom bookmarklet, then leverage bookmark syncing so you have one-click build triggers across all your devices.

Now you never have to login to Netlify again to trigger a build of your site.

## How It Works

Remember bookmarklets? I feel like bookmarklets used to be really popular, but don’t get talked about as much these days. In case you don’t remember what they are, here’s a refresher from [Wikipedia](https://en.wikipedia.org/wiki/Bookmarklet):

> A bookmarklet is a bookmark stored in a web browser that contains JavaScript commands that add new features to the browser. Bookmarklets are unobtrusive JavaScripts stored as the URL of a bookmark in a web browser or as a hyperlink on a web page.

So bookmarklets are browser bookmarks that let you run some JavaScript. Now, pair this idea with the fact that Netlify lets you trigger a build of your site by hitting a unique URL, and you end up with a recipe for one-click deploys:

1. [Generate a custom build hook in Netlify](https://www.netlify.com/docs/webhooks/)
2. Write a JavaScript bookmarklet which POSTs to your unique build hook URL
3. Create a bookmark (of any website) in your browser of choice then change the bookmark’s address URL to your bookmarklet code.

Your bookmarklet JavaScript (expanded) would look like this:

```js
javascript: (function() {
  fetch(
    // Your unique build hook URL here
    "https://api.netlify.com/build_hooks/a1b2c3e4f5g6h7i8j9",
    { method: "POST" }
  );
})();
```

Pop it into your browser, and voilà!

![Animated gif showing bookmark URL change and one-click deploy trigger in Netlify](https://cdn.jim-nielsen.com/blog/2018/netlify-bookmarklet.gif "Update your bookmark’s URL to your custom JavaScript code, then click it and watch Netlify trigger a build")

## One-Click Deploys Everywhere

What makes this even better is when you sync your bookmarks across devices. I use iCloud for syncing bookmarks in Safari, which means I can trigger a deploy of any of my sites from Safari on my iPhone or my Mac.

![Screenshot of Safari mobile deploy bookmarks](https://cdn.jim-nielsen.com/blog/2018/netlify-bookmarklet-mobile-sync.png)

![Screenshot of Safari desktop deploy bookmarks](https://cdn.jim-nielsen.com/blog/2018/netlify-bookmarklet-desktop-sync.png)
