#tips #css

# Seemly Selectors

Take a look at this:

`*`

In CSS terms, that's the universal selector. Are warning sirens relating to performance sounding in your head? Are you feeling emotions of avoidance, like you do when you see `!important`? It's possible you do. The universal selector carries a negative stigma of poor performance. But should it? [Paul Irish answers](http://paulirish.com/2012/box-sizing-border-box-ftw/):

> Apparently you’ve heard its slow. Firstly, it’s not. It is as fast as `h1` as a selector. It can be slow when you specifically use it like `.foo >` , so don’t do that

It can be slow, but mostly it's not. Still, that may seem like reason enough in your mind to avoid using (or misusing) it. Stop thinking that way. Turn those "[Danger, Will Robison!](http://en.wikipedia.org/wiki/Danger,_Will_Robinson)" sirens off. Don't be afraid to use it. Why? Paul Irish continues:

> You are not allowed to care about the performance of `*` unless you concatenate all your javascript, have it at the bottom, minify your css and js, gzip all your assets, and losslessly compress all your images.

It's important to remember that general rules of thumb, such as:

- don't use the `*` selector, it's slow
- don't use the `!important` rule

are rules discovered and shared by developers working on immensely large scale applications and websites, like Google.com. Some rules just don't apply to your ten page Wordpress site.

The `*` and `!important` rules were invented for a reason. If you find yourself needing them, use them. That's what they were made for. If page performance takes a hit, look into larger-scale optimization techniques first, such as image optimization and concatenation. After that, you can get down to the nit-picky. In general, [optimization of selectors should be the job of the rendering engine](http://calendar.perfplanet.com/2011/css-selector-performance-has-changed-for-the-better/), not the designer.
