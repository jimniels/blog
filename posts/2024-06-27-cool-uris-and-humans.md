# Cool URIs Don’t Change — But Humans Do

Here are two ideas at odds with each other:

1. You should have human-friendly URIs
2. Cool URIs don’t change

If a slug is going to be human-friendly,  i.e. human-readable, then it's going to contain information that is subject to change because humans make errors.

If “to err is human” then our errors will be forever cemented into our URIs at publish time.

For example, if I write:

`/the-earth-is-flat`

But later realize I was wrong, I can change the content at that URI but am forever stuck with the erroneous idea expressed in my slug (if my URI is to remain cool).

Whereas if I’d had a non-human-readable URI like this:

`/19382`

Then I can hide from my errors by merely updating the content at that URI anytime I want.

How do you get around this problem?

In [my post about great URI designs](https://blog.jim-nielsen.com/2023/examples-of-great-urls/) I note how StackOverflow addresses this via a URI design that puts the machine-readable identifier first, then the human-readable slug second.

`/:id/:slug`

This allows the slug to change over time without breaking links. For example, you could publish:

`/19382/the-earth-is-flat`

And later change it to:

`/19382/the-earth-is-round`

And both will resolve to the same resource. It doesn’t matter what you put in the position of `:slug` it’ll always be as if you merely typed: 

`/19832`

Granted you can’t protect from people putting misleading information in your URIs. For example, this would resolve to the same resource as the others:

`/19382/the-earth-is-a-triangle`

That said, there is one problem with the StackOverflow example: it doesn’t work with simple static file hosts where you don’t have control over routing logic.

The McGyver, jerry-rigged version of this URL would be to use a search param that doesn’t do anything other than provide human-readable context. For example:

`/19382?the-earth-is-flat`

That would work with a static file host without special routing logic (though it’s still subject to abuse same as the StackOverflow example).

So, to my original example:

`/19382?the-earth-is-flat`

Could later be changed to:

`/19382?the-earth-is-round`

And it remains cool 🕶️

Not saying you should, but you could.