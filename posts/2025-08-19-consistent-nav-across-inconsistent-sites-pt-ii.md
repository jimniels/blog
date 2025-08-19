# Consistent Navigation Across My Inconsistent Websites, Part II

I refreshed the little thing that let’s you [navigate consistently between my inconsistent subdomains](https://blog.jim-nielsen.com/2024/consistent-nav-across-inconsistent-sites/) ([video recording](https://cdn.jim-nielsen.com/blog/2025/new-pill-video.mp4)).

<img src="https://cdn.jim-nielsen.com/blog/2025/new-pill-animation.gif" width="305" height="245" alt="Animated gif of a dynamic-island like control that expands smoothly up when clicked to reveal additional selection options." />

Here’s the tl;dr on the update:

- I had to remove some features on each site to make this feel right.
	- Takeaway: adding stuff is easy, removing stuff is hard.
- The element is a web component and not even under source control (🤫). I serve it directly from [my cdn](https://blog.jim-nielsen.com/2019/netlify-public-folder-part-i-what/). If I want to make an update, I tweak the file on disk and [re-deploy](https://blog.jim-nielsen.com/2024/deploying-with-netlify-shortcuts/).
	- Takeaway: cowboy codin’, yee-haw! Live free and die hard.
- So. Many. Iterations. All of which led to what? A small, iterative evolution. 
	- Takeaway: it’s ok for design explorations to culminate in updates that look more like an evolution than a mutation.

Want more info on the behind-the-scenes work? Read on!

## Design Explorations

It might look like a simple iteration on what I previously had, but that doesn’t mean I didn’t explore the universe of possibilities first before coming back to the current iteration.

<img src="https://cdn.jim-nielsen.com/blog/2025/new-pill-explorations.png" width="976" height="834" alt="Screenshot of a Figma canvas with lots of artboards too small to see but denoting a lot of iterations." />

### v0: Tabs!

A tab-like experience seemed the most natural, but how to represent it? I tried a few different ideas. On top. On bottom. Different visual styles, etc.

<img src="https://cdn.jim-nielsen.com/blog/2025/new-pill-v0.png" width="922" height="668" alt="3 mobile-sized UI mockups of a blog post with different navigation bars." />

And of course, gotta explore how that plays out on desktop too.

<img src="https://cdn.jim-nielsen.com/blog/2025/new-pill-v0-desktop.png" width="2363" height="752" alt="Three desktop-sized UI mockups of a blog post with different navigation bars." />

Some I liked, some I didn’t. As much as I wanted to play with going to the edges of the viewport, I realized that every browser is different and you won't be able to get a consistent “bleed-like” visual experience across browsers. For example, if you try to make tabs that bleed to the edges, it looks nice in a frame in Figma, and even in some browsers. But it won’t look right in all browser, like iOS Safari.

<img src="https://cdn.jim-nielsen.com/blog/2025/new-pill-v0-tabs.png" width="1348" height="550" alt="Mobile UI mockups showing a folder-style segmented tab control. One is in the frame of an iPhone where the control bleeds up into the restricted space where the dynamic island lives as well as down into the website. Whereas the other mockup is in a frame in Figma, so the highlighted tab only bleeds down into the website." />

So I couldn’t reliably leverage the idea of a bounded canvas as a design element — which, I should’ve known, has always been the case with the web.

### v1: Bottom Tabs With a Site Theme

I really like this pattern on mobile devices, so I thought maybe I’d consider it for navigating between my sites.

But how to theme across differently-styled sites? The favicon styles seemed like a good bet!

<img src="https://cdn.jim-nielsen.com/blog/2025/new-pill-v1.png" width="939" height="682" alt="Mobile-sized mocksups with a bottom tab bar whose active highlight color changes with the active color of each subdomain." />

And, of course, what do to on larger devices? Just stacking it felt like overkill, so I explored moving it to the edge.

<img src="https://cdn.jim-nielsen.com/blog/2025/new-pill-v1-desktop.png" width="1591" height="758" alt="Desktop-sized mocks with tab controls on the far left of the page and the active site is higlighted according to the site's active theme color." />

I actually prototyped this in code, but I didn’t like how it felt so I scratched the idea and went other directions.

## v2: The Unification

The more I explored what to do with this element, the more it started taking on additional responsibility.

“What if I unified its position _with_ site-specific navigation?” I thought.

This led to design explorations where the disparate subdomains began to take on not just a unified navigational element, but a unified header.

<img src="https://cdn.jim-nielsen.com/blog/2025/new-pill-v2-1.png" width="899" height="645" alt="Mobile-sized UI mocks for Home, Blog, and Notes on jim-nielsen.com" />

And I made small, stylistic explorations with the tabs themselves too.

<img src="https://cdn.jim-nielsen.com/blog/2025/new-pill-v2-2.png" width="885" height="645" alt="Mobile-sized UI mocks for Home, Blog, and Notes on jim-nielsen.com" />

You can see how I played toyed with the idea of a consistent header across all my sites (not an intended goal, but ya know, scope creep gets us all).

<img src="https://cdn.jim-nielsen.com/blog/2025/new-pill-v2-3.png" width="594" height="398" alt="Different header + navigation styles for submdomains on jim-nielsen.com including a hamburger button." />

As I began to explore more possibilities than I planned for, things started to get out of hand.

## v3: Do More. MORE. MORE!!

Questions I began asking:

- Why aren’t these all under the same domain?!
- What if I had a single domain for feeds across all of them, e.g. `feeds.jim-nielsen.com`?
- What about icons instead of words?

<img src="https://cdn.jim-nielsen.com/blog/2025/new-pill-v3.png" width="1184" height="659" alt="Four mobile-sized mockups for subdomains on jim-nielsen.com, each one getting a different highlight color." />

Wait, wait, wait Jim. Consistent navigation across inconsistent sites. That’s the goal. Pare it back a little.

## v4: Reigning It Back In

To counter my exploratory ambitions, I told myself I needed to ship something without the need to modify the entire design style of all my sites.

So how do I do that?

That got me back to a simpler premise: consistent navigation across my inconsistent sites.

<img src="https://cdn.jim-nielsen.com/blog/2025/new-pill-v4.png" width="1070" height="768" alt="Dynamic-island-like navigational pill for the subdomains on www, blog, and notes subdomains of jim-nielsen.com" />

Better — and implementable.

## Technical Details

The implementation was pretty simple. I basically just forked my previous web component and changed some styles. That’s it.

The only thing I did different was I moved the web component JS file from being part of my `www.jim-nielsen.com` git repository to a standalone file (not under git control) on my CDN.

This felt like one of the exceptions to the rule of always keeping stuff under version control. It’s more of the classic FTP-style approach to web development. Granted, it’s riskier, but it’s also way more flexible. And I’m good with that trade-off for now. (Ask me again in a few months if I’ve done anything terrible and now have regrets.)

Each site implements the component like this (with a different `subdomain` attribute for each site):

```html
<script type="module" src="https://cdn.jim-nielsen.com/shared/jim-site-switcher.js"></script>
<jim-site-switcher subdomain="blog"></jim-site-switcher>
```

That’s really all there is to say. Thanks to Zach for [prodding me to make this post](https://fediverse.zachleat.com/@zachleat/114942811780696272).