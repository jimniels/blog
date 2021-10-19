# Thoughts on Avoiding an Excessive DOM Size

I recently read [Web Platform News #40](https://webplatform.news/media/bonus-content-40.png) and saw this:

> The Lighthouse tool for auditing web pages suggests avoiding an excessive DOM size…Lighthouse recommends keeping a page’s DOM size below 1,500 DOM elements.

I had never seen this before. I knew a large DOM could create performance problems, but I’d only encountered them when trying to script against a large DOM. In my own (anecdotal) experience, loading an HTML with lots of DOM nodes was never necessarily a performance hit.

I wanted more color around this recommendation, so I read through [the page Lighthouse links to](https://web.dev/dom-size/):

> Lighthouse flags pages with DOM trees that:
> 
> Have more than 1,500 nodes total.  
> Have a depth greater than 32 nodes.  
> Have a parent node with more than 60 child nodes.  

Interesting.

I wanted to see this in action for myself, so I pulled up a classic website that surely has lots of DOM nodes: Wikipedia. Specifically, I looked at the [World Wide Web entry](https://en.wikipedia.org/wiki/World_Wide_Web) and found Lighthouse taking exception with the size of the DOM:

<img src="https://cdn.jim-nielsen.com/blog/2021/dom-size-wikipedia-lighthouse-warning.png" width="1052" height="780" alt="Screenshot of the World Wide Web entry on Wikipedia in Chrome with the Lighthouse dev tools open showing a warning about the size of the DOM." /> 

At the time of this writing, the recommended limit for DOM elements is 1,500. This Wikipedia page came in at 4,606. 

(How exactly does DOM size gets calculated? I’m not sure. I ran `document.querySelectorAll("*").length` in the console and got the number 4,641, which is pretty close to what Lighthouse reported but this method isn’t very scientific or reproducible across different web pages. Looking at [the source code for Lighthouse](https://github.com/GoogleChrome/lighthouse/blob/c333322264e6c2c34553f94abc85ed01c60e2d3d/lighthouse-core/gather/gatherers/dobetterweb/domstats.js#L47) you could probably derive how DOM size is calculated.)

What’s intriguing about this warning on DOM size is that it doesn’t appear (at least at the moment) to have any bearing on the performance score, as this Wikipedia page came in at 100 (for a “Desktop” performance audit).

<img src="https://cdn.jim-nielsen.com/blog/2021/dom-size-wikipedia-lighthouse-score.png" width="1052" height="780" alt="Screenshot of the World Wide Web entry on Wikipedia in Chrome with the Lighthouse dev tools open showing a performance score of 100." /> 

Out of curiosity, I wanted to try and find a Wikipedia page whose DOM size would be even larger, so I tried the entry for [Human](https://en.wikipedia.org/wiki/Human). It weighed in at 12,075 DOM elements. 

What I found intriguing about the DOM size warning in Lighthouse was the callout to the DOM element with the most children (likely intended as a hint to an element in the DOM you should consider refactoring). In this case, the DOM element with the most children was the references!

<img src="https://cdn.jim-nielsen.com/blog/2021/dom-size-wikipedia-references.png" width="1082" height="835" alt="Screenshot of the Wikipedia entry for ‘Human’ with the Lighthouse dev tools open showing a warning about the number of DOM elements." /> 

Wouldn’t want to cite too many sources now would we?

I’m being flippant here, but only in part.

A guideline that a web page’s DOM should avoid being too large? I can buy that. The codification of that guideline into an industry standard tool? That causes me hesitation.

The fuzziness of human language allows us to recommend a “best practice” like “don’t let your DOM size get too big” while still providing room for nuance which may alter or even void the recommendation entirely. 

However, codifying a guideline or best practice into an automated tool which can be measured requires lines be drawn. A metric, however arbitrary, must be chosen in order to make a measurement and provide a judgement.

In this particular case,  it’s choosing a maximum number of DOM elements — 1,500 — to represent a threshold at which point your DOM has become too big. Why 1,500? I don’t know. But the binary nature of that number boggles my brain a bit. 1,499 DOM elements? Green check, you’re ok. 1,501 DOM elements? Red alert, you’re doing something wrong!

A closer look [the official rationale behind](https://web.dev/dom-size/) avoiding a large DOM outlines three reasons why a large DOM can contribute to slower performance,  two of which hinge on JavaScript running. No JavaScript? There’s only one (stated) reason to limit your DOM size: “network efficiency and load performance”:

> A large DOM tree often includes many nodes that aren't visible when the user first loads the page, which unnecessarily increases data costs for your users and slows down load time.

Ok, I can agree with that in principle. Makes sense—the bigger anything is on a computer, the more compute resources will be required to handle it.

But in practice, it seems to me there’s more nuance to the question of DOM size than having 1,500 elements or less.

However nice as a guideline, I’m not sure I buy an arbitrary limit on DOM nodes codified into a performance tool everyone uses. It might seem harmless, but we are shaping our performance tool which will shape us and how we think about what the web is, how it should work, and what it ultimately should be. Limiting DOM size is a specific point of view about the nature of a web page and is therefore limiting, perhaps exclusionary, in its vision of what a web page can be.

As a simple illustration of what I’m trying to get at, consider the book _Moby Dick_. The fact that [you can access that book digitally](https://www.gutenberg.org/cache/epub/2701/pg2701-images.html) is quite astounding, a feat many would’ve marveled at thirty years ago. The entire book available at a URL as HTML. No need for an app that optimizes for performance by only allowing access to one chapter at a time while requiring a “save for offline reading” feature to download the entire book. Just fast, performant, searchable text delivered as HTML with no JavaScript — and no need to keep the DOM size small.

<img src="https://cdn.jim-nielsen.com/blog/2021/dom-size-moby-dick.png" width="901" height="821" alt="Screenshot of the Lighthouse dev tool flagging the large DOM size for ‘Moby Dick’ on Project Gutenburg." /> 

The beauty of the web is that it’s bigger than any rules we try to draw around it. As [Rich Harris stated in his talk on transitional apps](https://www.youtube.com/watch?v=860d8usGC0o), “[the web is] a medium that by its very nature resists definitional boundaries.” 

Perhaps there’s more room for nuance and range in our performance tools and metrics.