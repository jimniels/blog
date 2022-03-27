#css

# CSS Is, In Fact, Awesome

I recently listened to [a talk by Hidde de Vries titled “On the origin of cascades”](https://talks.hiddedevries.nl/2gDDUr). It was an intriguing talk full of interesting historical tidbits about the origins and evolution of doing styles in the browser. 

Hidde points out how adaptive CSS has been and continues to be and he compares that to this idea of natural selection. He points out that one of the biggest contributors to the success of CSS is its ability to adapt to the wide variety of needs stemming from the user base of the web.

Specifically, I really enjoyed Hidde’s shakedown of the “CSS is Awesome” meme. You probably know it. I’ve seen it. I’ve laughed at it. It’s an iconic representation of what people perceive as  wrong with CSS:

<img src="https://cdn.jim-nielsen.com/blog/2021/css-is-awesome-default.png" width="498" height="364" alt="The standard ‘CSS is awesome’ meme where the word ‘awesome’ flows outside of its containing box." />

Hidde flips this joke on its head and points out that this joke actually demonstrates how awesome CSS is.

What you see in the image is CSS _by default_. From this starting point, you have options. CSS doesn’t guess at what you’re trying to do.

Want to let the containing box grow dynamically with its contents? You can do that with a little more CSS.

<img src="https://cdn.jim-nielsen.com/blog/2021/css-is-awesome-in-box.png" width="544" height="372" alt="The words ‘CSS is awesome’ where the words fit their containing box." />

Want to maintain sizing and cut off content when it overflows its containing box? You can do that with a little different CSS:

<img src="https://cdn.jim-nielsen.com/blog/2021/css-is-awesome-cut-off.png" width="394" height="369" alt="The words ‘CSS is awesome’ where the word ‘awesome’ is truncated  fit their containing box." />

And, as one more example I’ll throw in myself: want to truncate text that overflows its containing box? That’s also possible with a little extra CSS:

<img src="https://cdn.jim-nielsen.com/blog/2021/css-is-awesome-truncated.png" width="383" height="369" alt="The words ‘CSS is awesome’ where ‘awesome’ is truncated within its containing box to ‘awe...’" />

CSS doesn’t know which of those—or others—were your intention. Rather than guess, it starts at a base level and branches into a variety of  outcomes with each additional styling rule.

This is the _power_ of CSS. It gives you options. Use them or don’t.

So the dots Hidde connects, which I’d never put together, is that when we see this:

<img src="https://cdn.jim-nielsen.com/blog/2021/css-is-awesome-default.png" width="498" height="364" alt="The standard ‘CSS is awesome’ meme where the word ‘awesome’ flows outside of its containing box." />

And we point and jest, that is merely us not liking—or understanding—the defaults inherent in CSS. The overflow is working here as specified. We simply haven’t learned or understood CSS on that deeper level.

This lack of understanding CSS at a deeper level has corollaries in JavaScript. For example, people will laugh at expressions in JavaScript like this:

```js
true == "true" // false
```

On the surface, yes that’s odd. But if you look at the spec and understand the mechanisms that are at play deep in the language (coercion in this example), you’ll begin to understand how and why the spec is written the way it is.

This is precisely what Kyle Simpson argues in his eye-opening book [_You Don’t Know JS_](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/up%20%26%20going/ch1.md):

> While designed to help you, implicit coercion can create confusion if you haven't taken the time to learn the rules that govern its behavior. Most JS developers never have, so the common feeling is that implicit coercion is confusing and harms programs with unexpected bugs, and should thus be avoided. It's even sometimes called a flaw in the design of the language.
> 
> However, implicit coercion is a mechanism that can be learned, and moreover should be learned by anyone wishing to take JavaScript programming seriously. Not only is it not confusing once you learn the rules, it can actually make your programs better!

This is right inline with an insightful sentiment expressed by Josh Comeau in his post [“The Importance of Learning CSS”](https://www.joshwcomeau.com/css/the-importance-of-learning-css/):

> CSS is a very implicit language; it relies heavily on mechanisms buried deep in the CSS specification. When those mechanisms work in ways we don't expect, we're left in the dark, not sure what the heck is going on..
>
> When we write code—in any language—we rely on our mental model of how that language works. If our mental model is incomplete or incorrect, there's a good chance that we won't get the result we were expecting. In CSS, those misalignments are super common, because of how implicit CSS is.

This all falls right inline with [a sentiment I’ve expressed before](/2020/web-technologies-and-syntax/) about how “the working knowledge of [HTML/CSS/JS] are less about syntax and more about how things work.” CSS is, in fact, awesome. Familiarizing ourselves with its underlying rules and mechanisms allows us to fully recognize its awesomeness.

## Update 2021-04-07

[Chris linked to this post from CSS-Tricks](https://css-tricks.com/css-is-in-fact-awesome/) where he provides much more history behind the “CSS is Awesome” meme, including Brandon Michael writing about it [on CSS-Tricks](https://css-tricks.com/css-is-awesome/) circa 2017, Steven Frank, original creator of the meme, [commenting on Brandon’s post](https://css-tricks.com/css-is-awesome/#comment-1609829), and Mandy Michael [tweeting](https://twitter.com/Mandy_Kerr/status/985351593972252672) about it circa 2018. Lots of good history documented in Chris’ post.
