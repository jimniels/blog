#myBlog

# Have You Heard the Good News About Microlighter?

Dave Rupert [wrote](https://daverupert.com/2026/08/microlighter/) about shipping [microlighter](https://davatron5000.github.io/microlighter/): a tool for handling syntax highlighting using [the CSS Custom Highlights API](https://www.bram.us/2024/02/18/custom-highlight-api-for-syntax-highlighting/). [I saw](https://mastodon.social/@jimniels/117123353673091732) his post the day he released it, and I had an implementation PR up for my blog by end of day.

Then, like I do with so many things, I let it sit there.

This is the period where my subconscious takes over. It does the work of, “How do I actually feel about that? Do I want to merge it? Do I have any regrets about what I did?” If I still want to merge it after a few days, that’s usually a good sign that I’ll be happy with the work. (Sometimes after a few days I say, “What the hell was I thinking?” and then it’s easy to simply close the PR with zero regrets.)

Well it’s a few days later and I still feel good about it, so time to ship!

[My PR](https://github.com/jimniels/blog/pull/85/changes) for this is pretty straightforward:

- Remove `highlight.js` dependency (and related plumbing)
- On paths that 1) match my post pages (i.e. `/YYYY/:slug`), and 2) have code on them, pull microlighter deps from a CDN and run it.
- Done.

Granted, there are trade-offs to this approach. I get it. Dave’s explainer for this tool on [The ShopTalk Show](https://shoptalkshow.com/729/) vibed with me because I’ve been in his shoes many times: “Whoops, somehow syntax highlighting on my blog is broken again. Guess I need to fix it. Ugh. I’ve done [prism](https://prismjs.com), I’ve done [highlight.js](https://highlightjs.org), I’ve done [shiki](https://shiki.style). What should I do this time? Could I do this in a way that’s just _less_?” He clarifies:

> I’m not coming at this like, “Everyone is doing it wrong!” I was just kind of like, “Could I do this in a way that suited me?”

Well, this approach suites me.

There’s a kind of conceptual elegance to it where syntax highlighting lives in the realm of a styling operation rather than a content transformation plus styling. In short: syntax highlighting, i.e. styling text, is a styling concern so solve it with CSS — no DOM manipulation required!

Plus, I mean, how cool is it that the code on the website is the same as the code in the DOM?!?

<img src="https://cdn.jim-nielsen.com/blog/2026/microlighter.png" width="1152" height="683" alt="Screenshot of the microlighter website with the webpage code sample on the left and the devtools open on the right to the same code in the DOM and there are no span tags wrapping the code!" data-og-image />

I guess this is how I know I still like working on the web, because seeing browsers do stuff like this that they couldn’t do before still feels really cool!