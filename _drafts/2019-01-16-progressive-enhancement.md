---
title: Building a Progressively-Enhanced Site
date: 2019-01-16
tags: engineering
---

I recently added the ability to search for icons (by name) on my [icon](https://www.iosicongallery.com) [gallery](https://www.macosicongallery.com) [sites](https://www.watchosicongallery.com).

![New search functionality GIF]({{ site.imageurl }}/2019/progressive-search.gif)

I even got it working nicely on mobile.

![New search functionality GIF on mobile]({{ site.imageurl }}/2019/progressive-search-mobile.gif)

There are about a million ways I could’ve done this. However, one of the self-imposed engineering constraints with my icon gallery sites is accessibility. I ~~like~~ love the idea of building [resilient](https://resilientwebdesign.com/) web sites that’ll not only stand up to spotty networks or antiquated devices, but I love building sites with longevity. Semantic HTML, enhanced with styles and JS interactivity, is a recipe for a website that could last a decade or two or [three](http://info.cern.ch/hypertext/WWW/TheProject.html). Although it’s often less feasible for me to build sites like this at my place of employment, my personal projects get to serve as a sandbox for practicing the tenants of progressive enhancement.

So how do I go about such an endeavor?

## HTML

First and foremost, I my sites are built with HTML. I focus on trying to make my markup simple and semantic. I strive to write markup that describes the content, rather than markup that describes _how I’ll style_ the content. That means describing content with the proper tags, rather than making every container a `<div>`. It also means abstaining from superfluous elements, like `<span>`, just to create a stylish effect (`::before` and `::after` in CSS make this way easier than it used to be). I strive to have every tag semantically describe not merely the content it’s wrapping, but the relationship between its children, parents, and siblings.

![Screenshot of DOM structure]({{ site.imageurl }}/2019/progressive-dom-structure.png "Example DOM structure")

If you hit my site’s URL and the CSS or the JavaScript fails to load, you’ll still be able to navigate the site and view the content.

![Screenshot of site without CSS or JavaScript]({{ site.imageurl }}/2019/progressive-no-css.png "Cropped screenshot illustrating the header, body, and footer content of my site without any styles of JavaScript")

## CSS

Next comes styling. For these particular sites, I revel in modern CSS layouts, like `grid` and `flexbox`. I like to try and think of my CSS as a suggestion to the browser on how to display the content. The browser might say “great I support all of these styles” and paint it just how I described. Or it might only support and paint 80% of my styles. Or 20%. Or it might never paint any of them. Either way, the content is still there so I don’t have to worry about users of my site never being able to see anything.

So if a user went to my website and the CSS loaded, but for some reason the JavaScript didn’t (or the user had JavaScript disabled), this is what they’d see:

![Screenshot of site without JavaScript]({{ site.imageurl }}/2019/progressive-no-js.png "JavaScript failed to load (or was disabled)")

## JavaScript

Now if the JavaScript did run (and the styles loaded), this is what a user might see:

![Screenshot of site with JavaScript]({{ site.imageurl }}/2019/progressive-js.png "Fully-enhanced version of the site with CSS & JavaScript")

Did you notice the difference?

![Differences between sites with and without JavaScript loaded]({{ site.imageurl }}/2019/progressive-difference.png)

### Ads

The ads on my site are loaded through a third-party via JavaScript. That’s pretty much standard ad-tech these days.

Actually, that’s not entirely true. The ads for [iosicongallery.com](https://www.iosicongallery.com) are loaded via JavaScript from third-party [Carbon Ads](https://www.carbonads.net/). The ads for [macosicongallery.com](https://www.macosicongallery.com) and [watchosicongallery](https://www.watchosicongallery.com) are actually “server-side” ads. They get generated at build time and built into the site’s HTML, so there’s no third-party assets (JavaScript, images, etc) for displaying them. It’s solely an affiliate link. I kind of like that setup. I’ll probably ditch Carbon Ads one day and either not have ads in general, or try and find someone who wants to pay me like \$10/month and I’ll put up whatever they want in that spot. But that’s a discussion for another blog post another day.

### Search & Dark Mode Toggle

The search box (which I recently finished building) and the dark mode toggle (which I also recently finished and [wrote about](https://blog.jim-nielsen.com/2018/icon-galleries-dark-mode/)) are pieces of functionality that only work if JavaScript loads on the page. Therefore, if the JavaScript doesn’t execute (because a user has it disabled or the network fails for some reason) the user won’t see that functionality in the UI.

These sites are actually all built on top of a static site generator, which means there’s no server-side component. So I can’t do `<form action="/action.php">`. Instead, if JavaScript runs I fetch an index of content (that I generate at build time) and attach some events so that when the user enters keywords into an input, I can perform a search client-side.

Similarly, for the “dark mode” toggle, I don’t have a server that’s persisting the state of the dark mode toggle and writing the appropriate class names into the HTML between page requests. Rather, I use `localStorage` in JavaScript to persist the state of whether the user is in dark mode between page loads. Then I apply the appropriate class name early in the DOM so when you navigate between pages it looks like you’re “staying in dark mode” (you can [read about how I did that](https://blog.jim-nielsen.com/2018/icon-galleries-dark-mode/) in a previous post).

All this is to say, the site is progressively enhanced. If you’re browser supports certain features in JavaScript, you get extra feature sets in your UI. Otherwise, you get a basic experience of navigating between HTML pages.

## Modern JavaScript

When I built this new search functionality, I had the option to do it in React (or some other framework) but opted not to. It seemed like a relatively simple feature that could be written in vanilla JavaScript and I could thus avoid shipping all of `react` and `react-dom` to the client.

I also didn’t want to bother setting up (and maintaing) the rube goldberg machine of modern JavaScript applications (webpack, babel, etc). I simply wanted to have a `.js` file with the code powering my search functionality. But the more and more I wrote the code to power the search, the more I found myself wanting to write the more-expressive ES5+ code (using syntax like `() => {}`, `const`, `let`, and `` (`template ${strings}`) ``. I also found myself wanting to break up my code into smaller, discrete modules but I didn’t want to setup a bundler/transpiler.

So, I opted to use `<script type="module">` to load all my JavaScript. As module support in JavaScript landed relatively recently, I could ensure that any browser which supported ES modules also supported the syntactic sugar I craved (like arrow functions and template literals). This allowed me to write and ship modern JavaScript [without first creating the universe](https://postlight.com/trackchanges/if-you-wish-to-write-javascript-from-scratch-you-must-first-create-the-universe).

As an example, in my footer, I had a script tag to load ES modules:

```html
<script type="module" src="/assets/scripts/global.js"></script>
```

I wrote each discrete piece of JavaScript-powered functionality as a `.js` module. Then inside of `global.js`, I imported these pieces of functionality as functions and executed them:

```js
import initDarkModeToggle from "/assets/scripts/init-dark-mode-toggle.js";
import initQuickSearch from "/assets/scripts/init-quick-search.js";

initDarkModeToggle();
initQuickSearch();
```

Inside of each of those modules was vanilla JavaScript that dealt with reaching into the DOM and progressively enhancing the page with extra feature sets. For example, the dark mode toggle looked something like:

```js
const isDarkMode = () => {
  return localStorage.getItem("isDarkMode") === "true";
};

export default function addDarkModeToggle() {
  const $toggle = document.querySelector(".dark-mode-toggle");
  $toggle.removeAttribute("hidden");

  // If we're in dark mode, set the toggle as being so
  if (isDarkMode()) {
    $toggle.querySelector("input").setAttribute("checked", true);
  }

  $toggle.addEventListener("change", () => {
    document.documentElement.classList.toggle("is-dark-mode");
    localStorage.setItem("isDarkMode", !isDarkMode());
  });
}
```

I went back and forth on whether I should stick the markup for progressively-enhanced features in the original HTML, or in its respective JavaScript file. In the end, I chose to render the markup in the DOM (in part because I could easily leverage my templating engine for some of the markup). Each feature that was unavailable without JavaScript got a `hidden` attribute to hide it on screen (and from screen readers). For example, every HTML page has this bit of markup in it:

```html
<label
  class="dark-mode-toggle"
  for="dark-mode-toggle"
  title="Toggle Dark Mode"
  hidden
>
  <input type="checkbox" name="dark-mode-toggle" id="dark-mode-toggle" />
  <!-- An <svg> embedded here -->
</label>
```

If you look back at the JavaScript for the dark mode toggle, you’ll see that (if it loads) it’s essentially looking into the DOM for this piece of markup, removing the `hidden` attribute, and attaching some event listeners to make the whole thing interactive.

## Conclusion
