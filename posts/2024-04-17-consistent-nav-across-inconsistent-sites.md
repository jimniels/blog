#myBlog

# Consistent Navigation Across My Inconsistent Websites

Anything I ship to my personal domain `jim-nielsen.com` is made using IDD: impulse driven development.

I can convince myself that just about anything is a good idea at the time. But in retrospect my rationales are quite often specious.

At one point in the past, I decided that I wanted to have my personal homepage and my blog be different “websites”. By that I mean: rather than have one site that has unified navigation and a coherent experience across all content, I wanted to have independent sites that evolve and progress at their own pace.

For example, if I decided I wanted to redesign my homepage (which acts as a sort of resume), I wouldn’t have to think about the typography of my blog posts. I could go super whacky in one direction, if I wanted, without having to think about how it affects the whole.

That’s how I’ve ended up with the different sites I have today, like my homepage [jim-nielsen.com](https://www.jim-nielsen.com), my blog [blog.jim-nielsen.com](https://blog.jim-nielsen.com), and my notes [notes.jim-nielsen.com](https://notes.jim-nielsen.com). Each has their own unique design and codebase that can be modified and changed without regard for the others.

That’s nice for me, but one of the drawbacks has been that it’s not immediately apparent to people who visit those sites that all three exist. There’s no top-level navigation across all three sites with links to “Home”, “Blog”, and “Notes”.

I sort of always knew this and thought “Well that’s intentional, they’re three different sites after all!” But the trouble it actually presents people was brought to my attention by Chris Coyier when [I was on the ShopTalkShow](https://blog.jim-nielsen.com/2024/shoptalk-show-605/) (he called it an “intervention”):

> Jim, I gotta tell ya, intervention here, you don’t make it easy. You go to jim-nielsen.com, there’s no link to the blog, you gotta just “know” it’s a subdomain. And then, Jim has this incredible blog, cause he has the “think blog” and then he has this “what I’m reading” with thoughts [and they’re] equally great blogs (you should subscribe I’m not blowing smoke) but you just can’t find [them]. Like you have to go to the “About” page to find the reading blog. You gotta just smash them together [Jim]. I mean, you do you, but they’re just too hard to find.

I’m nothing if not a very poor marketer for myself and the things I do. 

This was a Good Idea from Chris.

Honestly, I have _lots_ of ideas on how to remedy this. But in the spirit of avoiding curiously exploring all the possibilities and then shipping nothing, I decided to just start with something small as a stop-gap.

My thought was: what kind of widget can I build that represents a coherent interaction across an otherwise incoherent set of web properties?

My solution? A floating head. Of myself. Fixed on every page.

At least you’ll know who the site belongs to, right?

So [that’s what I built](https://github.com/jimniels/www/blob/1483ecc5f1a456cd67fac162d2de788b087657e8/static/jim-navbar.js). It’s a JavaScript web component. Basically I stick this markup on every page across all my domains:

```html
<jim-navbar></jim-navbar>
<script
  type="module"
  src="https://www.jim-nielsen.com/jim-navbar.js">
</script>
```

And, for browsers that support it, you get a floating head of me that works as a navigational widget across my home page, blog, and notes. When you click it, you get a popup that lets you easily navigate between the three disparate sites.

<img src="https://cdn.jim-nielsen.com/blog/2024/subdomain-navigation-widget-phone.png" width="884" height="639" alt="Screenshot of a floating popup that provides navigation to and across blog.jim-nielsen.com, notes.jim-nielsen.com, and www.jim-nielsen.com" />

## I’m Rusty on Animations, But They’re Fun

For my first implementation of the widget, I wanted to try and make a little animated menu. I settled on the idea of my head and, when clicked, it spins around and reveals a menu.

For the v1 iteration, I used CSS `transform` to scale and rotate the different elements.

<img src="https://cdn.jim-nielsen.com/blog/2024/subdomain-navigation-widget-v1.gif" width="306" height="348" alt="Animated gif of a profile photo of Jim Nielsen that, when clicked, reveals a popup menu with an 'x' over where Jim’s face was." />

It was pretty decent. I liked it, but I wanted to try doing something more sophisticated — something like what iOS does with the dynamic island.

To do this, I would need to make it look like the round avatar of my head was transforming its shape into the popup menu. In v1, the popup menu was just scaling down to zero and was distinct and separate from the shape of the avatar. So I tried doing this in v2.

<img src="https://cdn.jim-nielsen.com/blog/2024/subdomain-navigation-widget-v2.gif" width="321" height="389" alt="Animated gif of a profile photo of Jim Nielsen that, when clicked, reveals a popup menu with an 'x' over where Jim’s face was. This one has more refined shape shifting in the animation." />

The difference here is subtle. You almost have to slow down the animation to notice it: the popup transforms itself into the circle shape of the avatar.

<img src="https://cdn.jim-nielsen.com/blog/2024/subdomain-navigation-widget-v2-slow.gif" width="324" height="400" alt="Slow motion animated gif of a popup menu whose shape transforms back down to a circle avatar with a profile photo of Jim Nielsen." />

In slow motion you’ll notice there are some other parts of this animation that aren’t quite right (like the timing of the opacity on the profile photo).

Feeling like I could do better, I tried a third iteration. This is the one that’s on the site today. It’s still not as refined as the dynamic island, but hey, baby steps.

<img src="https://cdn.jim-nielsen.com/blog/2024/subdomain-navigation-widget-v3.gif" width="314" height="351" alt="Animated gif of a profile photo of Jim Nielsen that, when clicked, reveals a popup menu with a 'x' over where Jim’s face was." />

Honestly, even v3 is still not very great. But I’m improving on it, including [responding to bugs on social media](https://x.com/albinoblack/status/1775659043492667571) (in that case, I was excited about shipping nested CSS without compilation, but maybe the world isn’t quite ready for that yet).

I’ve got even better ideas for this in the future, but who knows if I’ll ever get to them. This works for now.

Anyhow, that’s a very long way of saying: intervention succeeded.