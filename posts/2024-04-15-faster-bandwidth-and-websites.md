# Faster Connectivity !== Faster Websites

This post from Dan Luu discussing [how web bloat impacts users with slow devices](https://danluu.com/slow-device/) caused me to reflect on the supposition that faster connectivity means faster websites.

I grew up in an era when slow internet was the primary limiting factor to a great experience on the web. I was always pining for faster speeds: faster queries, faster page navigations, faster file downloads, etc. Whatever I wanted to do with a computer, bandwidth seemed like the sole limiting factor to a great experience.

So that’s why I still often mistakenly equate a faster connection with a faster (and better) experience on the web. And I often need reminding that’s not necessarily true.

That’s what Dan does well in his post. He points out how _slow devices_ are becoming as big of an impediment to a good experience on the web as _slow connections_.

> CPU performance for web apps hasn't scaled nearly as quickly as bandwidth so, while more of the web is becoming accessible to people with low-end connections, more of the web is becoming inaccessible to people with low-end devices even if they have high-end connections.

Here’s that last line again:

> more of the web is becoming inaccessible to people with low-end devices even if they have high-end connections

It’s kind of incredible how the world is being flooded with bandwidth (I mean, you can get internet beamed to you anywhere on earth from a string of satellites.)

The question is quickly shifting from _how slow is your connection_ to _how slow is your device_?

## Newer !== Better, and More Usable for the Minority is More Usable For the Majority

To borrow from [Devine’s warning about equating newer with better](/2024/notes-from-computing-sustainably/): if the new website runs slower on old hardware, is the new website better than the old website?

Here’s Dan talking about how old websites beat out new ones in performance:

> Another pattern we can see is how the older sites are, in general, faster than the newer ones, with sites that (visually) look like they haven't been updated in a decade or two tending to be among the fastest. 

This reminds me of [an accessibility ethos](https://notes.jim-nielsen.com/#2023-01-31T1227) which asserts that things that are made usable for marginalized individuals are invariable the most usable for everyone — regardless of capability.

Similarly: websites that were made to be fast on older, slower connections (and devices) are invariably the fastest for everyone — regardless of device or connection speed.

> When using slow devices or any device with low bandwidth and/or poor connectivity, the best experiences, by far, are generally the ones that load a lot of content at once into a static page. 

This is undoubtedly true for high-end devices as well. When you use something in the way it was designed to be used, it’s going to perform at its peak — and the web was designed, from its inception, to load a lot of static content up front.

It’s fascinating to see from Dan’s research how the output of modern blogging platforms (such as Medium or Substack) are not really competitive in terms of pure speed and performance with the “old” blogging / bulletin board platforms.

## Overriding Defaults is the Fastest Path to Jank

To paraphrase [Johan](https://johan.hal.se/wrote/2024/02/28/care/), the fastest path to janky websites is overriding browser defaults. Dan illustrates this perfectly in his piece, which I quote at length:

> Sites that use modern techniques like partially loading the page and then dynamically loading the rest of it, such as Discourse, Reddit, and Substack, tend to be less usable… Although, in principle, you could build such a site in a simple way that works well with cheap devices but, in practice sites that use dynamic loading tend to be complex enough that the sites are extremely janky on low-end devices. It's generally difficult or impossible to scroll a predictable distance, which means that users will sometimes accidentally trigger more loading by scrolling too far, causing the page to lock up. Many pages actually remove the parts of the page you scrolled past as you scroll; all such pages are essentially unusable. Other basic web features, like page search, also generally stop working. Pages with this kind of dynamic loading can't rely on the simple and fast ctrl/command+F search and have to build their own search.

The bar to overriding browser defaults should be way higher than it is.

> A lot of the optimizations that modern websites do, such as partial loading that causes more loading when you scroll down the page, and the concomitant hijacking of search (because the browser's built in search is useless if the page isn't fully loaded) causes the interaction model that works to stop working and makes pages very painful to interact with.

The foundations of web browser design lay in static document exploration and navigation. The bar to overriding the interaction UI/X for these kinds of experiences should be _way higher_ than it is.

I find it ironic how, in our search for ticking Google’s performance checkboxes like “first contentful paint” and therefore providing better user experiences, we completely break other fundamental aspects of the user experiences like basic scrolling and in-document search.

## A Parting Thought on a Core Tenent of the Web: Universal Accessibility

I want to leave you with this quote from Dan’s article. It begs us all to question whether the new stuff we’re making now is as universally accessible as what we’ve had (and taken for granted) up to this point.

> The impact of having the fastest growing forum software in the world [Discourse] created by an organization whose then-leader was willing to state that he doesn't really care about users who aren't "influential users who spend money", who don't have access to "infinite CPU speed", is that a lot of forums are now inaccessible to people who don't have enough wealth to buy a device with effectively infinite CPU.

Are we leaving the internet better than we found it?

> If [this attitude] were an anomaly, this wouldn't be too much of a problem, but [it’s] verbalizing the implicit assumptions a lot of programmers have, which is why we see that so many modern websites are unusable if you buy the income-adjusted equivalent of a new, current generation, iPhone in a low-income country.

I need to ponder on my own part in this more. Great food for thought.