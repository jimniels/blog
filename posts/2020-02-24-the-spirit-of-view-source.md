#thoughts

# The Spirit of “View Source”

I recently finished reading Clive Thompson’s book _Coders_ and one of the parts I found rather interesting was his story on how the web spurred a revolution of coding education via the “View Source” feature.

> When the web took off in the mid-90’s, it offered one of the most democratized ways to start coding—because a curious young person could peel back the hood of the web and see how it worked...Back in the 90’s...[the folks at Netscape] realized that it would be fun to let people surfing the web see this code, if they wanted to. So they put in a feature that let you view the “source” of a page. If you clicked it, Netscape would open up a window showing you the raw HTML of the page you were currently browsing.
> 
> Pretty soon, people around the world were clicking “view source” and getting a glimpse into how this crazy new world, the web, really worked. (49)

Before the web, there was a revolution in coding in languages like BASIC. But the problem in that revolution was that if you wanted code to study and learn from, you had to download it from a bulletin board system or buy a magazine or book with printed program code in it. “View Source” changed all of that: the learning opportunity was now available instantaneously for every page on the web!

> Every single web page you visited contained the code showing you how it was created. The entire internet became a library of how-to guides on programming. (49) 

This all got me thinking: I’ve been using the DevTools and not “View Source” for years, how does it actually work in today’s browsers?

## How Browsers Do “View Source” Today (On Mac)

Today’s mainstream browsers provide incredible DevTools for peering into the their inner workings. Additionally, mainstream browsers still provide a way to “View Source” like we used to ye’ olde days: right-click on a web page and choose “View Source”.

### Chrome, Firefox, & Edge

These browsers all function identically: for any given web page, you can right-click on the page and choose the menu item labeled “View Page Source”. This will prompt the browser to open a new tab and reveal that page’s source HTML, preserved precisely in the same formatting as delivered to the browser over the network (with a bit of syntax highlighting added on top for easier reading).

Chrome looks like this:

<img src="https://cdn.jim-nielsen.com/blog/2020/view-source-chrome.png" alt="Screenshot of Chrome’s “View Source” tab for a particular web page on css-tricks.com" width="912" height="755" />

Firefox like this:

<img src="https://cdn.jim-nielsen.com/blog/2020/view-source-firefox.png" alt="Screenshot of Firefox’s “View Source” tab for a particular web page on css-tricks.com" width="911" height="755" />

And Microsoft’s Edge like this:

<img src="https://cdn.jim-nielsen.com/blog/2020/view-source-edge.png" alt="Screenshot of Edge’s “View Source” tab for a particular web page on css-tricks.com" width="912" height="755" />

You may have noticed that all three browsers open a new tab with the current page’s URL prefixed with the text `view-source:`. Cool! These browsers have made the ability to view source part of the protocol of the URL. You can navigate to a page and right-click, or you can type `view-source:` in the address bar followed by the URL of the page whose source you want to view!

### Safari

Safari does things a bit differently—surprised? The menu item label is “Show Page Source” instead of “View Page Source”.

<img src="https://cdn.jim-nielsen.com/blog/2020/view-source-safari-dev-tools-on.png" alt="Screenshot of Safari’s contextual menu when you right-click on a webpage with the developer tools turned on." width="207" height="204" />

A label difference isn't a big deal. But there’s more. 

Rather than open a new tab, the menu item opens Safari’s developer tools, displaying the source HTML (original formatting is preserved and aided by some syntax highlighting).

<img src="https://cdn.jim-nielsen.com/blog/2020/view-source-safari.png" alt="Screenshot of Safari’s “Show Page Source” view for a particular web page on css-tricks.com" width="914" height="756" />

This got me thinking. You have to explicitly “turn on” the developer tools in Safari. They’re not implicitly available like in other browsers. You have to actually open up Safari’s preferences and check a box.

<img src="https://cdn.jim-nielsen.com/blog/2020/view-source-safari-developer-menu-preferences.png" alt="Screenshot of Safari’s contextual menu when you right-click on a webpage with the developer tools turned on." width="886" height="568" />

So what if you don’t have the developer tools turned on? What happens? Turns out you won’t have access to “Show Page Source” in the right-click menu.

<img src="https://cdn.jim-nielsen.com/blog/2020/view-source-safari-dev-tools-off.png" alt="Screenshot of Safari’s contextual menu when you right-click on a webpage with the developer tools turned on." width="185" height="154" />

Interesting. And `view-source:` in the address bar doesn’t work either.

So Safari has taken a leap towards obscuring the ability to access the underlying source code of a website _from casual users_ because the developer tools setting is turned off by default. You’d have to know what you were looking for to “View Source” in Safari, unlike other browsers where you could serendipitously stumble on it.

## Bringing Back the Spirit of View Source

I like View Source. I hope browsers keep it. I like the sentiment Thompson expresses in his book about the power behind the original view source feature:

> Every single web page you visited contained the code showing you how it was created. The entire internet became a library of how-to guides on programming.

Things have changed a bit since then. When you did “View Source” in the early days of the web, it’s very likely you were literally viewing the source code as authored by the webmaster. Now-a-days, however, the “source” you view was likely the result of some tooling stitching together content and markup through a series of templates then munging/minifying it for delivery over the network. While viewing that _machine-generated_ source is still useful in many cases, if we’re talking about “View Source” being a “how-to” guide on programming for the web, it’s only a piece of the puzzle. Being able to view the actual source code that generated the source in “View Source” would be the other piece. A “View Source of Page Source” if you will.

Adding something like that isn’t too difficult. In fact, I’m gonna do it. I’ll add a nice friendly HTML comment to my source that people will see when they “View Page Source” or open the DevTools. Something like this at the top of each HTML page:

```html
<!--
  👋
  Want to read the code behind this code?
  It’s available on GitHub.
  https://... 
-->
```

Which you’d stumble on when attempting to “View Page Source”.

<img src="https://cdn.jim-nielsen.com/blog/2020/view-source-html-comment-view-source-tab.png" alt="Screenshot of “View Source” tab in Chrome displaying the source HTML with a comment pointing to the source code on Github that generates that HTML." width="1075" height="761" />

Or when you open the DevTools:

<img src="https://cdn.jim-nielsen.com/blog/2020/view-source-html-comment-devtools.png" alt="Screenshot of Chrome with the developer tools open and displaying the source HTML with a comment pointing to the source code on Github that generates that HTML." width="1075" height="761" />

Idea: would be cool if there was a convention where you could denote the source code behind your website in markup, something like this:

`<meta name="repository-source" content="https://github.com/..." />`

Then you could be more programmatic in spreading word about code education on the web. Imagine, for example, a browser plugin—or something in the browser itself!—that looks for that meta tag and lights up every time it finds it: “oh hey, this site publishes its source code, want to check it out?” 

That feels like the spirit of “View Source”.
