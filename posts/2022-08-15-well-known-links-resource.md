# A Well-Known Links Resource

In [my previous article](/2022/playing-with-blog-home/) exploring what might go on my blog’s home page, I wondered aloud:

> It’d be neat to be able to surface (credible) sites that are linking to my posts, like, “[Post Foo] linked from the Sidebar.io newsletter” or, “[Post Bar] linked from css-tricks.com”.

That got me thinking about [another previous article](/2020/indexing-my-blogs-links/) article where I explored the idea of creating and surfacing an index of all the outbound links on my blog — something you can see [here](/about/external-links/).

That index of links is mine and its representation is an HTML document within the context of my blog. But it got me wondering: why just for me?

What if everyone — individuals, companies, etc., — surfaced their outbound links in an open, accessible way which could then be aggregated in one source for querying?

## Individual Websites

First we’d need a convention for the location of this resource as it would need to be consistent across websites. Good thing we already have a convention for that! The [well-known URI](https://en.wikipedia.org/wiki/Well-known_URI). In my case, I’m going to commandeer `/.well-known/links`.

Any domain that supports this convention can make a giant JSON blob of all their (outbound) links accessible at this endpoint, grouped by domain e.g.

```json
[
  {
    domain: "twitter.com",
    count: 129,
    links: [
      {
        sourceUrl: "https://blog.jim-nielsen.com/..."
        targetUrl: "https://twitter.com/...",
      },
      {
        sourceUrl: "https://blog.jim-nielsen.com/..."
        targetUrl: "https://twitter.com/...",
      }
      // 127 more...
    ]
  }
  // More domains here...
]
```

Additionally, you could allow people to query a particular domain for your site’s links. For example, you might ask, “I wonder what links Jim has to my site?” And the answer would be a query to:

```
https://blog.jim-nielsen.com/.well-known/links?domain=mysite.com
```

The response to that query is some JSON that will list every URL on `blog.jim-nielsen.com` that links to `mysite.com`.

Here are a few examples from my blog:

- [`/.well-known/links?domain=sarasoueidan.com`](https://blog.jim-nielsen.com/.well-known/links?domain=sarasoueidan.com)
- [`/.well-known/links?domain=css-tricks.com`](https://blog.jim-nielsen.com/.well-known/links?domain=css-tricks.com)
- [`/.well-known/links?domain=daverupert.com`](https://blog.jim-nielsen.com/.well-known/links?domain=daverupert.com)

If this pattern were more broadly available on the web, it would empower me to ask something like, “I wonder where CSS-Tricks links to me?” And I could query here:

```
https://css-tricks.com/.well-known/links?domain=blog.jim-nielsen.com
```

And get an answer! Every URL on CSS-Tricks that links to my blog. A form of [bi-directional link](https://maggieappleton.com/bidirectionals) metadata.

## All The Websites

Now, it gets a little trickier if you want to know more broadly, “Who is linking to me?”

Trying to find all the domains on the web that support `/.well-known/links` would be hard. However, in theory someone could figure it out — index every site you can find that has data at `/.well-known/links` and put it into one giant, queryable resource.

That’s where the magic would be.

Imagine if someone like Google — who killed the `link:` search operator BTW — made this index and allowed you to query it. All you had to do was type:

`google.com/find-my-links?domain=blog.jim-nielsen.com`

And, given its own database of `/.well-known/links` from across the web, it could serve back links from all the sites on the internet it knows about.

I can imagine that being an incredibly valuable resource, so getting someone to do it freely and openly might seem a bit crazy.

Not to mention that you would have to get people to actually adopt the pattern of indexing all their outbound links and making them available in a standardized format at `/.well-known/links`.

And it probably doesn’t work at scale. I mean, an index route for `twitter.com/.well-known/links` would be wildly big! But, then again, a call to `twitter.com/.well-known/links?domain=blog.jim-nielsen.com` would be wildly interesting!

It’s a fun thought to entertain.

## Available Now

As mentioned, I’m already collecting [all the external links](/about/external-links) on my site, so I went ahead and made that data publicly available as a prototype of the above concept.

You can hit [blog.jim-nielsen.com/.well-known/links](/.well-known/links) and see the data for yourself. Do a `CMD + F` in the response to find your domain, or you could try hitting `/.well-known/links?domain=xxx` with your domain and see if there’s a hit.

You should try [indexing all the outbound links](/2020/indexing-my-blogs-links/) on your site. Do it for yourself, you’ll likely find some interesting or even surprising patterns. And then, once you’ve done it for yourself, you may as well make it publicly available for others to look at and consume. Why not?