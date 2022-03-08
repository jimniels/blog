# The Optional Chaining Operator, “Modern” Browsers, and My Mom

Eric Bailey recently wrote on CSS-Tricks about [testing your website on a crappy laptop](https://css-tricks.com/test-your-product-on-a-crappy-laptop/) and it reminded me of this anecdote from my own life.

About a month ago, I was talking to my Mom on the phone. At the end of the call, she asked if I could help her with a computer problem on my next visit. “Of course,” I replied. Most of my parents computer issues are easy fixes: ensure all the cables are plugged in, restart the computer, you know the drill.

When I arrived at my parents’ house, I asked my Mom what was wrong.

“I can’t open this website I always use to make a reservation to volunteer. It doesn’t work on our computer and it doesn’t work on my iPad. But it does work on Mike’s (my brother) laptop, so I’ve just been using his. Can you fix it?”

Hmm. Something that works on one computer, but not on two others. That doesn’t sound like an unplugged cable. What could it be?

First I looked to confirm the problem. I pulled up the website on my parents’ computer as well as my Mom’s iPad and sure enough, the website didn’t load. Then I opened it on my brother’s laptop, and it did load. My Mom’s verbal JIRA ticket was right.

This problem started to sound all too familiar: a website that doesn’t work across multiple devices.

My first thought was, “well it can’t be a browser issue. It’s not like my Mom is using Internet Explorer! She has relatively modern tech: an iPad (Safari) and a Chromebox (Google Chrome).”

But the more I thought about it—a website that works on some devices but not on others—the more I realized this had to be a browser issue.

So I looked at the version of Chrome on my parent’s computer. Version 76! I knew we were at ninety-something in 2022, so I figured that was the culprit. “I’ll just update Chrome,” I thought.

Turns out, you can’t. From what I could gather, the version of Chrome was tied to ChromeOS which couldn’t be updated because of the hardware. No new ChromeOS meant no new Chrome which meant stuck at version 76.

But what about the iPad? I discovered that my Mom’s iPad was a 1st generation iPad Air. Apple stopped supporting that device in iOS 12, which means it was stuck with whatever version of Safari last shipped with iOS 12.

So I had two older browsers that couldn’t be updated. It was device obsolescence because you couldn’t install the latest browser.

“But what was the culprit in the website,” you ask? After opening the developer tools in Chrome and looking at the console, I discovered the website authors were shipping JavaScript that used the [optional chaining operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) (`?.`), an unsupported syntax in older browsers that caused the entire website to fail.

<img src="https://cdn.jim-nielsen.com/blog/2022/mom-chaining-operator.jpg" width="700" height="397" alt="Photo of the Chrome developer tools showing JavaScript code using the optional chaining operator." /> 

In my brain, I always thought of Safari and Chrome as “modern” browsers. But even Chrome, an “evergreen” browser, failed because it wasn‘t on an “evergreen” operating system (or hardware).

I went back to my Mom and told her I’d found the issue. In essence, “your computer is too old and I can’t update it.” This only reconfirmed my parents’ belief that device makers deliberately make things go out of date so that you have to go buy new hardware every couple of years.

I wanted to try and explain to my Mom that, while true for many native applications, browsers shouldn’t go out of date so easily because of hardware. “This isn’t your problem Mom. You should’t have to go buy new hardware. This is a fixable problem by the people who make that website. They should be making their website’s code more accessible to legacy devices. Just because you don’t have a browser that can run ECMAScript 2020, you should still be able to access and use this website.” But I didn’t feel like explaining the idea of progressive enhancement to my Mom—or even what a compiler like Babel is useful for.

The real-life impact of our technical decisions really hit home to me once again: my Mom had trouble volunteering and participating in her local community because somebody shipped the optional chaining operator in their production JavaScript. 

Reminds me of this line, which I love, from [the W3C’s design principles](https://www.w3.org/TR/design-principles/):

> The internet is for end users: any change made to the web platform has the potential to affect vast numbers of people, and may have a profound impact on any person’s life.

## Update 2022-03-07

When [talking about this article with Chris and Dave](https://shoptalkshow.com/504/), Chris helped me see the irony of this story: the optional chaining operator is often used to program defensively, to keep JavaScript from crashing the page. And yet, in this case, it’s the presence of the optional chaining operator that crashed the page.