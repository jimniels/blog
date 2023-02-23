# Faux Progress

[Eric’s recent post](https://ericwbailey.website/published/modern-health-frameworks-performance-and-harm/) really got me thinking. He shows an all-to-familiar screen he got stuck on:

<img src="https://cdn.jim-nielsen.com/blog/2023/modern-health-routing-failure.png" width="988" height="630" alt="Screenshot of the Modern Health website that is mostly blank with a spinner in the middle." />

And notes:

> Since I make digital experiences for a living, I immediately knew what happened…If you do not make digital experiences for a living, what happened is not obvious at all. All you see is a tiny fake loading spinner that never stops.

For non-technical folks, the worst part is you don’t even know the spinner is fake! You likely interpret it as a legitimate representation of live feedback.

I remember when I first started as a designer, I naively created a progress bar for some UI thinking, “We’ll indicate progress as this thing happens!” 

I was quickly informed that an accurate representation of progress was incredibly complex and not in the cards for our feature (’twas then I was introduced to the idea of [polling](https://en.wikipedia.org/wiki/Polling_(computer_science))).

Since then, posts like Eric’s constantly remind me of the faux authenticity of so many of our digital experiences. I have no doubt progress bars and loading indicators are vastly misinterpreted by non-technical folks as feedback mechanisms which communicate the live, accurate progress of known-quantity computing tasks.

But I’ve seen behind the curtain, so I am deeply skeptical of most progress indicators. Most of the time I assume them to be, at best, a guesstimate of progress; at worst, a lie — a veneer of sophistication, a sleight of hand.

At least when a computer freezes, you know. The feedback mechanism of input/output halts completely. But with loading indicators and progress bars you’re left in a state of limbo, unsure whether something is working and at any moment might change, or if you just need to try “turning it off and on again”.