#cssViewTransitions

# Aspect Ratio Changes With CSS View Transitions

So here I am playing with CSS view transitions (again).

I’ve got [Dave Rupert’s post](https://daverupert.com/2023/05/getting-started-view-transitions/) open in one tab, which serves as my recurring reference for the question, “How do you get these things to work again?”

I’ve followed Dave’s instructions for transitioning the page generally and am now working on individual pieces of UI specifically.

I feel like I’m 98% of the way there, I’ve just hit a small bug.

It’s small. Many people might not even notice it. But I do and it’s bugging me.

When I transition from one page to the next, I expect this “active page” outline to transition nicely from the old page to the new one. But it doesn’t. Not quite.

<img src="https://cdn.jim-nielsen.com/blog/2025/view-transitions-bug.gif" width="480" height="254" alt="Animated gif of a CSS page transition where the tab outline doesn’t grow proportionally but it happens really quickly so you barely see it." />

Did you notice it? It’s subtle and fast, but it’s there. I have to slow my `::view-transition-old()` animation timing waaaaay down to see catch it. 

<img src="https://cdn.jim-nielsen.com/blog/2025/view-transitions-bug-slow.gif" width="427" height="222" alt="Animated gif of a CSS page transition where the tab outline doesn’t grow proportionally but it happens really slowly so you can definitely see it." />

The outline grows proportionally in width but not in height as it transitions from one element to the next.

I kill myself on trying to figure out what this bug is.

Dave mentions in his post how he had to use `fit-content` to fix some issues with container changes between pages. I don’t fully understand what he’s getting at, but I think maybe that’s where my issue is? I try sticking `fit-content` on different things but none of it works.

I ask AI and it’s totally worthless, synthesizing disparate topics about CSS into a [seemingly right on the surface but totally wrong answer](https://blog.jim-nielsen.com/2024/nothing-is-something/).

So I sit and think about it.

What’s happening almost looks like some kind of screwy side effect of a `transform: scale()` operation. Perhaps it’s something about how default user agent styles for these things is animating the before/after state? No, that can’t be it…

Honestly, I have no idea. I don’t know much about CSS view transitions, but I know enough to know that I don’t know enough to even formulate the right set of keywords for a decent question. I feel stuck.

I consider reaching out on the socials for help, but at the last minute I somehow stumble on this perfectly wonderful blog post from Jake Archibald: [“View transitions: Handling aspect ratio changes”](https://jakearchibald.com/2024/view-transitions-handling-aspect-ratio-changes/) and he’s got a one-line fix in my hands in seconds!

The article is beautiful. It not only gives me an answer, but it provides really wonderful visuals that help describe why the problem I’m seeing is a problem in the first place. It really helps fill out my understanding of how this feature works. [I absolutely love finding writing like this on the web.](https://blog.jim-nielsen.com/2025/missed-connections/)

So now my problem is fixed — no more weirdness!

<img src="https://cdn.jim-nielsen.com/blog/2025/view-transitions-bug-fixed.gif" width="480" height="389" alt="Animated gif of CSS multi-page transitions animating active tabs across pages of a website" />

If you’re playing with CSS view transitions these days, [Jake’s article](https://jakearchibald.com/2024/view-transitions-handling-aspect-ratio-changes/) is a must read to help shape your understanding of how the feature works. Go give it a read.