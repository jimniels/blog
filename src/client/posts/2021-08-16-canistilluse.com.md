# canistilluse.com

There’s something beautiful about the website [caniuse.com](https://caniuse.com/) which I never fully appreciated until last week when news spread that `alert`, `prompt`, and `confirm` are [in danger of being deprecated](https://groups.google.com/a/chromium.org/g/blink-dev/c/hTOXiBj3D6A/m/1Q0TjPwWAwAJ) from the web platform.

When you lookup a certain feature on caniuse.com, there’s an incredible assumption many of us make when interpreting its UI: given enough time, most everything goes green.

For example, here’s a screenshot of [support for the `.avif` file format](https://caniuse.com/avif)—a feature that (at the time of this writing) isn’t  supported across all major browsers.

<img src="https://cdn.jim-nielsen.com/blog/2021/canistilluse-caniuse-avif.png" width="728" height="516" alt="Screenshot of caniuse.com of the .avif file format, showing mixed browser support." /> 

For perhaps the first time explicitly, I noticed how my brain interprets this UI: `.avif` isn’t widely supported across many browsers, but support is gaining traction as time passes and eventually everything will be green.

_Eventually everything will be green_. That’s quite an optimistic assumption when you think about it. Granted, there are nuances here about the standards process, but that’s probably how many of our brains work when we look at caniuse.com:

- We get a general consensus about where a given feature is in the standards process.
- If its far enough along, we look at caniuse.com to understand how and where it’s implemented today.
- We assume eventually it’ll be supported (green) everywhere.
- Once green, forever green.

Let’s look at a feature that recently reached the threshold of (mostly) supported everywhere: [the `.webp` file format](https://caniuse.com/webp).

<img src="https://cdn.jim-nielsen.com/blog/2021/canistilluse-caniuse-webp.png" width="728" height="581" alt="Screenshot of caniuse.com of the .webp file format, showing broad support across evergreen browsers." /> 

It’s noteworthy how my brain now thinks of this UI: I can use this feature—indefinitely. That “indefinitely” is the interesting part.

Due to the nature of evergreen browsers—a wonderful advancement in the evolution of the web—we currently operate under the assumption that once a feature is supported, we’ll be able to use it for the foreseeable future. There is no semver on the web. Major version changes (HTML5, CSS3, ES6) does not mean breaking changes.

I can’t (and never will) use `.webp` in IE. Not because API support never made the roadmap. Nor because API support was deprecated. Rather, it’s because the browser itself is being deprecated by its maker. On the web (thus far), browser APIs are rarely deprecated. Instead, browsers themselves are. 

<img src="https://cdn.jim-nielsen.com/blog/2021/canistilluse-caniuse-browser-deprecated.png" width="337" height="291" alt="Screenshot of caniuse.com where a specific browser API shows no support in IE11." /> 

A browser with widely deprecated APIs is a broken browser for end users, and a broken browser isn’t much worth using.

Given the above, you would be forgiven if you saw an API where a feature went from green (supported) to red (unsupported) and you thought: is the browser being deprecated?

<img src="https://cdn.jim-nielsen.com/blog/2021/canistilluse-chrome-deprecated.png" width="397" height="216" alt="Screenshot from canistilluse.com where a browser API goes from green (supported) to red (unsupported)." /> 

That’s the idea behind my new shiny domain: [canistilluse.com](https://www.canistilluse.com). I made the site as satire after reading [Jeremy Keith’s insightful piece](https://adactio.com/journal/18337) where he notes:

> the onus is not on web developers to keep track of older features in danger of being deprecated. That’s on the browser makers. I sincerely hope we’re not expected to consult a site called canistilluse.com.

There are a few cases where [browser APIs have been deprecated](https://whatwg.org/faq#removing-bad-ideas). An example on caniuse.com is [appcache](https://caniuse.com/?search=appcache):

<img src="https://cdn.jim-nielsen.com/blog/2021/canistilluse-caniuse-appcache.png" width="727" height="534" alt="Screenshot of caniuse.com showing deprecated support for the appcache API." /> 

Note how browser support was short-lived.

But what about longer-lived APIs? Take a look at the `substr` method in JavaScript. Note its support on [caniuse.com](https://caniuse.com/mdn-javascript_builtins_string_substr)

<img src="https://cdn.jim-nielsen.com/blog/2021/canistilluse-caniuse-substr.png" width="727" height="509" alt="Screenshot of caniuse.com showing green support for the deprecated substr API." /> 

All green boxes indicating support, with a note at the bottom: “this feature is deprecated/obsolete and should not be used”.

To Jeremy’s point, the onus should not be on web developers to keep track of older APIs in danger of deprecation. `substr` is an API that’s been in browser since, well, as far back as caniuse.com tracks browser support. [alert](https://caniuse.com/?search=alert), [confirm](https://caniuse.com/?search=confirm), and [prompt](https://caniuse.com/?search=prompt) are the same. Green boxes back to the year 2002.

I sincerely hope browser makers can find a way forward in improving the deficiencies of APIs like `alert` without setting further precedent that [breaking the web is the price of progress](https://dev.to/richharris/stay-alert-d).

Anyhow, that’s the thrust of the idea behind [canistilluse.com](https://www.canistilluse.com) (yet another domain I purchased and don’t need).

