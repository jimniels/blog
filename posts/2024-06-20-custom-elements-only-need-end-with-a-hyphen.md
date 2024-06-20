# Custom Elements, At Minimum, Only Need End With a Hyphen

[Scott Jehl reached out](https://mstdn.social/@scottjehl/112646802312714877) to help me resolve a conundrum in [my post about what constitutes a valid custom element tag](https://blog.jim-nielsen.com/2023/validity-of-custom-element-tag-names/).

The spec says you can have custom elements with emojis in them. For example:

`<emotion-😍></emotion-😍>`

But for some reason [the Codepen](https://codepen.io/jimniels/pen/QWBzMpw) where I tested this wasn’t working.

Turns out, I’m not very good at JavaScript and simply failed to wrap everything in a try/catch.

What’s funny about this is that `<my-$0.02>` isn’t a valid custom element but `<my-💲0.02>` is!

Anyhow, I’ve since updated that post and now things work as the spec says. All is good with the world.

But that’s not all.

In my convo with Scott, he pointed out that **custom element tag names don’t need a hyphen as a separator of characters, they only need the hyphen**.

This kinda blew my mind when I realized it. All this time I’d been thinking about the rules for custom elements wrong.

You aren’t required to have the hyphen as a separator:

`<my-tag></my-tag>`

You’re just required to have it:

`<mytag-></mytag->`

Those are both valid custom element tag names!

Which means, if you have a really simple element and can’t think of a better name than an existing HTML element, you can do this:

`<h1->My custom heading</h1->`

Or this:

`<p->My custom paragraph</p->`

Or, I suppose, even this:

```html
<ul->
  <li>My custom unordered list</li>
  <li>That still uses normal li’s</li>
  <li>Because why not?</li>
</ul->
```

I’m not saying you _should_ do this, but I am saying you _could_ — you know, [nothing ever went wrong](https://knowyourmeme.com/memes/your-scientists-were-so-preoccupied-with-whether-or-not-they-could-they-didnt-stop-to-think-if-they-should) doing something before stopping to thinking about whether you should.