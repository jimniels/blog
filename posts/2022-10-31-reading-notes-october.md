#readingNotes

# Reading Notes, October 2022

## Article: [“Designing with Emoji”](https://ia.net/topics/designing-with-emoji)

Should I use emojis in my writing?

> What and how you write is more important than how you decorate it.

I agree! The thing is, you probably already know the answer as to whether you should use them.

> Do you use your emoji in a meaningful way, beyond measurability, clickability, usability and SEO? Or are you just making noise? Most of the time, you can find the answer without Google Analytics, eye trackers, CT, or lie detectors.

And while this refers to use of emojis, I feel the same way about social images these days:

> [If] you do what everyone does, you do not stand out. Design is hard to measure. You can count seconds, clicks, and dollars. Meaning, beauty, love, and trust do not translate well into percentages.

Don’t use emoji when you don’t really have a meaning or purpose for it.

> Do not hope the reader will figure out what you haven’t thought through

While using emoji has its place, unfortunately the common case seems to be:

> Spread mechanically and without much thought, to add some color to an otherwise dull text, [emojis] just decorate boredom.

Lastly, I love this great point on why we write:

> Finding verbal clarity on a subject of which one had only vague feelings, seeing clearly expressed what was only in the back of one’s mind, is one of the chief pleasures of reading good writing. 

## Article: [“Mailbag: What isn't measurable? To hire as exec or not?”](https://lethain.com/mailbag-not-measurable-whether-hire-exec/)

> Even if we shipped more features one quarter than another, I wouldn’t actually believe that our velocity had necessarily gone up, it’s more likely that the features themselves were smaller.

## Article: [“Style with Stateful, Semantic Selectors”](https://benmyers.dev/blog/semantic-selectors/)

> If a state is important enough to indicate visually, it's probably important enough to expose to assistive technologies.

Love this idea of building state into HTML attributes for screen readers and doing your styling there

Instead of:

`.button--is-expanded {}`

You do:

`button[aria-expanded="true"]::before {}`

## Article: [“The wasted potential of CSS attribute selectors”](https://elisehe.in/2022/10/16/attribute-selectors)

> there’s a reason why `<article class="card" data-align="left" data-size="small" />` looks attractive — it’s mirroring the APIs we’re used to seeing in design systems and component libraries, but bringing it to vanilla HTML and CSS. Indeed, it’s a small step from data attribute selectors to custom pseudo selectors or prop-based selectors when using Web Components (think `<my-card align="left" size="small" />`).

I’m intrigued by this idea and the code samples.

```
<article
  class="card"
  data-loading="true"
  data-variant="primary"
  data-size="large"
  data-border="top right"
  data-elevation="high"
/>

<style>
  .card[data-loading=true] {}
  .card[data-variant=primary] {}
  .card[data-size=large] {}
  /* etc. */
</style>
```

## Article: [“Computers are an inherently oppressive technology”](https://www.devever.net/~hl/ruthlessness)

> people are led to view the consequence of the ruthlessness of the machine as a kind of force of nature, and rendered powerless to object. Yet it is not a force of nature; in reality it is a system deliberately designed by humans to advance a ruthless end, without admitting to it.

“The system won’t let me do it.” How many times have you heard that excuse when pleading with another person for some kind of humane understanding and exception to your scenario?

> companies realise they can escape from accountability by hiding behind the facelessness of the machine, which disempowers the individual to fight or object to it.

And that’s how we want our money to work?

> using cryptography, systems — institutions — can be created which possess absolute integrity, where all past efforts to create such institutions have failed, having been comprised of humans who are infinitely more corruptible…
> 
> All transactions are final; none can be reversed. It does not matter if your coins were stolen, or if your family will come to ruin because of it; the system does not care. There can be no exceptions. If we desire a system of absolute integrity, we must accept these outcomes as the cost

## Article: [“Attention Shoppers!”](https://www.wired.com/1997/12/es-attention/)

Wow! I wasn’t aware of this piece from 1997 by WIRED.

> Twenty-five years ago, it was projected that, in an ever-more interconnected world, money would no longer be the prime currency, attention would be. This would reshape social values, and as we became more engrossed in efforts to gain attention, we would shortchange those around us; in other words, the drive for self would come at the expense of concern for others. The projection has played out as prophetic, and the attention economy is here, with its associated societal shifts.

## Article: [“The Proprietary Syndication Formats”](https://chriscoyier.net/2022/10/17/the-proprietary-syndication-formats/)

> RSS solves many of the same problems [AMP, Facebook Instant astticles, Apple News Formawt] were trying to solve, like out-of-control JavaScript ruining the mobile web…
> 
> Guess which format is going to outlast all these proprietary syndication formats. I’d say RSS, which I believe to be true, but really, it’s HTML.

Great point about the longevity of HTML, especially since feeds (XML or JSON ones) are just a wrapper around the content which comes in guess what format? HTML. 