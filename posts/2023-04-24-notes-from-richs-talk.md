# Notes and Reflections from Rich Harris’ Talk

[Rich has a new talk](https://www.youtube.com/watch?v=uXCipjbcQfM) and, as usual, it’s full of practicality. I’ve got my text editor open and ready to take notes as we go.

## Whatever Framework You’re Using, It’s Fine

Note: that’s coming from the author of a framework!

Rich points out that most of the degraded, slow, hostile user experiences out there on the web have much more to do with the incentives around how the site is built and maintained than it does the framework being used.

In other words, choose Svelte or React or Remix or vanilla JS or _whatever_, but your site will still suck if you monetize the site with things that degrade the UX, like tracking or telemetry scripts, ad-injected images, ad-injected videos, etc.

## 0kb JS is Not a Goal

The goal is to meet a user need.

“Lighthouse is a diagnostic tool not a scorecard.” When a measure becomes a target, and we all chase those green circles regardless of the site’s goal or purpose, it’s no longer a good measure. To quote [something I wrote earlier](https://blog.jim-nielsen.com/2021/thoughts-on-avoiding-an-excessive-dom-size/) (which serendipitously also quotes a talk from Rich):

> The beauty of the web is that it’s bigger than any rules [or benchmarks] we try to draw around it. As Rich Harris stated… “[the web is] a medium that by its very nature resists definitional boundaries.”

## Most Sites Should Work Without JavaScript

Google Calendar doesn’t work without JS. At a minimum, why can’t I view, create, and delete events on my calendar without JS?

To paraphrase Rich: I don’t blame the developers or PMs for wrong priorities, but it is a shame that our tooling doesn't make it efficient and cost effective to build progressively enhanced sites. You should get that “for free” (which is what I always loved about [Remix’s approach of layering technology](https://blog.jim-nielsen.com/2022/notes-from-michael-jackson-devmode-fm/)).

Unfortunately, so much of our tooling today optimizes time and cost for a different kind of architectural approach to applications.

## Explicit DSLs Are Good

So many frameworks _start_ with JavaScript for describing interfaces, and augment from there. HTML and CSS then become merely outputs of JavaScript.

This is, in my opinion, why we’ve seen a rising prevalence of sticking HTML in JS, or CSS in JS: because the frameworks _start_ at JavaScript, making the other web languages become a byproduct — a second-class citizen — of this fundamental starting point. HTML and CSS are no longer two of the three pillars of the web platform, but merely outputs of the lone pillar: JavaScript.

In contrast, a framework like Svelte starts from the perspective of HTML and asks: how do we add stuff on top of it to make the UX better? Svelte is a DSL that augments HTML, CSS (`<style>`) and JS (`<script>`).

## Implicit DSLs Are…Less Good

Rich nails in on the head when he pinpoints the rising mismatch between what code _looks like_ in the editor and what it _actually does_.

As he observes, in order to successfully work with JavaScript or TypeScript these days, there’s a growing need to understand some of the very sophisticated transformations that are happening under the hood between the code that you’re writing and the code that runs in the browser.

There’s a fundamental mismatch between these two that makes everything harder because you lose the predictability of a standardized language — hence why explicit is better than implicit.

## Conclusion

I like Rich’s ending. He specifically says: I’m not telling you what to think, I’m just telling you what _I_ think. Go look at other frameworks, play with them, and come up with your own opinions. In the end, “None of this matters”. So let's not take ourselves too seriously and go have fun building the stuff we enjoy building.