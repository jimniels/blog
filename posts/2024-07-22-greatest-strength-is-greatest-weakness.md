# Your Greatest Strength Is Also Your Greatest Weakness

Referring to product management, my old boss used to say, “There is no right or wrong, only trade-offs.” This applies to technology too (and, if you really think about it, life generally — but we won’t go that far).

As an example, what makes npm great? It’s so easy to install a dependency. What makes npm not so great? It’s [too easy](https://www.reddit.com/r/node/comments/higlf0/heaviest_objects_in_the_universe/) to install dependencies. [npm makes it so easy to get a bunch of complexity](https://notes.jim-nielsen.com/#2016-11-18T1230).

In other words: its greatest strength is also its greatest weakness.

Nesting in ~~Sass~~ CSS is similar: nesting selectors aids readability, but [do it too much](https://mastodon.social/@jimniels/112830741174375242) and now nothing is readable. Again, a double-edged sword.

The things you extol about a technology are also going to be the things that get you into trouble because those are the trade-offs. 

So to evaluate a piece of tech, you should ask yourself: what are the downsides of the the very things I love about this?

The folks at Linear articulated this perfectly in a post-mortem explaining why they were having issues related to speed. To quote [their post](https://linearapp.notion.site/Improving-performance-at-scale-432a23dc5607416cafb5f82360e5f157):

> These [speed] problems stem from trade-offs in our architecture. The reason Linear is fast is also the reason Linear is slow once workspaces grow in size.

The reason it’s fast (in certain scenarios) is also the reason it’s slow (in other scenarios).

The reason it’s great sometimes is also the reason it sucks sometimes.

Your greatest strength is also your greatest weakness.