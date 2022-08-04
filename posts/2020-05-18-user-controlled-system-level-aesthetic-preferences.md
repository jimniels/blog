# Thoughts on Designing a UI Driven By User-Controlled, System-Level Preferences

I’ve been playing with an idea for a side project (more on that another time). Without diving too much into the existential questions a from-scratch project makes you ask yourself, I decided to try a new approach on the visual design of this particular project.

One thing I’ve been thinking about lately is for the ability of a user to specify OS-level preferences related to aesthetics that then cascade down into the applications used on their system. I think there’s a whole philosophical debate to be had behind this approach to designing software for the web (which I tried to articulate in my article [“Your Product Doesn’t Have to Look the Same On Every Platform”](https://blog.jim-nielsen.com/2019/your-product-doesnt-have-to-look-the-same-on-every-platform/)). 

It’s worth mentioning this idea is not without precedent. There’s a swath of [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) that allow web developers to query information about the realities or preferences of the end user based on their hardware or software. `@media (prefers-color-scheme: dark)`, for example, allows web developers to access a system-level preference of the user and respond accordingly. I’ve written about why I think this is so compelling in my article “[Dark Mode on the Web via OS-Level Preferences](https://blog.jim-nielsen.com/2018/dark-mode-on-the-web/)”

> what [I] found really intriguing...[is] how a user’s preferences at the OS level could cascade down into the browser to control styling. This felt like a throwback to some of the old ideas of the web where user settings and preferences should be taken into account when displaying websites (looking at you `font-size`). I love that idea! Web browsers, seize the means of styling!

All of this was in the back of my head as I started my new side project. Because my app consisted mainly of text with some input controls mixed in, I kept feeling myself coming back to the idea of minimal styling. I needed an accent color for a few places and I started thinking “it’d be cool if this accent color was customizable...” but then I realized I’d have to build UI controls for picking and customizing the accent color of the app in the app, which was too much complexity for a side project MVP. As I thought about it some more, I realized I was already getting splashes of color from macOS in the form of `<select>` controls, so I thought, “what if I just matched that color?” 

<img src="https://cdn.jim-nielsen.com/blog/2020/system-accent-select.png" width="382" height="68" alt="Screenshot of a <select> element in macOS" />

As I began thinking more and more about color, I realized the OS was already optimizing the “blue” for the select control when dark mode was turned on. That made me wonder if there’s a way to  “tap into” and use that accent color. If I could, I wouldn’t have to worry about optimizing colors between dark and light mode (i.e. define an accent color in light mode and another version of it for `prefers-color-scheme: dark`). The OS would take care of all of that for me. Plus, I would get the added benefit of my app being themed to the user’s overarching aesthetic preferences within their operating system (i.e. ceding some control of the visual design to the end user, for coherence within their environment, instead of hoarding that control for myself).

Putting aside questions like “should I do this?" and getting straight to “can I do this?”, I began to [think out loud on Twitter](https://twitter.com/jimniels/status/1259867275588448262):

> Anybody know if the system accent color is accessible in macOS from the web (even as a webkit prefix)? 
>
> Some of the other configurations have CSS equivalents, but this one?
> 
> <img src="https://cdn.jim-nielsen.com/blog/2020/system-accent-system-preferences-twitter-screenshot.png" width="594" height="195" alt="Screenshot of macOS system preferences and how they map to CSS rules" />

The amazing thing about Twitter is that I got a [response](https://twitter.com/othermaciej/status/1261209849829810177?s=20) from [@othermaciej](https://twitter.com/othermaciej), the head of webkit engineering at Apple, who noted that there is a nonstandard value in webkit accessible for use: `-apple-system-control-accent`.

That answered my question, but didn’t result in something that functioned quite as [I had hoped](https://twitter.com/jimniels/status/1261308238546587650?s=20). So I wrote this post to convey what, exactly, I had hoped for.

I hoped that I could access the system-level accent color defined by macOS and leverage it in my CSS (with a fallback for browsers that didn’t understand the value). For example:

```css
button {
  color: #0000ff;
  color: -apple-system-control-accent;
}
```

In this manner, my app’s color accents would match the system’s color accents for native controls (like `<select>`) and change accordingly when the user entered “dark mode”. 

This would allow the user to change the accent color of my app—not through some custom widget I built in HTML/CSS/JS, but through their system-level OS settings.

For example, by default you’d get “blue” everywhere:

<img src="https://cdn.jim-nielsen.com/blog/2020/system-accent-preference-blue.png" width="1385" height="846" alt="Screenshot of a website alongside the system preferences in macOS where you can configure the accent color (with the accent set to blue)." />

But if you changed that to “purple” at the OS-level, the browser  would automatically redraw everything—including styles leveraging `-apple-system-control-accent`—to be purple.

<img src="https://cdn.jim-nielsen.com/blog/2020/system-accent-preference-purple.png" width="1385" height="846" alt="Screenshot of a website alongside the system preferences in macOS where you can configure the accent color (with the accent set to purple)." />

What’s neat about this too is that you don’t have to set text highlight color with `::selection`. That’s already handled for you at the OS-level. 

<img src="https://cdn.jim-nielsen.com/blog/2020/system-accent-preference-purple-with-highlight.png" width="1385" height="846" alt="Screenshot of a website with a system-level accent color preference for purple showing that even the textual highlight is in purple." />

And when you switch to dark mode (assuming you pick the right blacks—but we won’t get into accessing system-level blacks, that’s another wishlist item) your accent color would—in theory—“just work” as it would be optimized for appearance in a dark context by the OS designers.

<img src="https://cdn.jim-nielsen.com/blog/2020/system-accent-preference-blue-dark.png" width="1385" height="953" alt="Screenshot of a dark-themed website with a system-level adjusted accent color." />

Is it just me, or would that not be damn cool?

Let’s go one step further: what if you could tap into the actual color value of `-apple-system-control-accent` such that you could manipulate it to render different shades of that one color? For example:

```css
// imagine that `-apple-system-control-accent` was defined as a
// set of HSL color values, like `0,100%,100%` such that you
// could nest it inside an HSLA value and draw a shade of it
button {
  color: hsla(-apple-system-control-accent, .5);
}
```

Honestly, I have no idea how you’d do that, but it doesn’t stop me from asking: wouldn’t it be cool?

I haven’t used Windows in a long time, so to be honest, I’m not sure if there’s an equivalent to this there (or on other operating systems)? But, as a web designer, having more tools at my disposal to handle being responsive to a user’s environment choices seems like a sound idea.

To be fair, this approach probably isn’t for everyone or every app. But the idea of thinking of our CSS as starting at the OS-level instead of just the root `<html>` seems compelling. Your site’s styles start at the level of the operating system, and then “cascade” down into your website. CSS: “Cascading System Styles”.
