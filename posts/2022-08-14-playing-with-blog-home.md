#myBlog

# Playing With My Blog’s Home Page

I’ve been wanting to play with my blog’s home page. Previously, I had two lists: 1) most recent, and 2) popular (based to [the last 30 days of analytics data from Netlify](https://blog.jim-nielsen.com/2020/using-netlify-analytics-to-build-list-of-popular-posts/)).

<img src="https://cdn.jim-nielsen.com/blog/2022/new-home-page-list-old.png" width="720" height="550" alt="" />

I thought, “What other kinds of lists could I add?” Two ideas came to mind:

1. My own personal favorites
2. Stuff that’s been popular on HackerNews

Number one seemed like a great idea and was easy enough to implement (it’s actually a list of about ten which randomly get selected each time my site builds anew).

Number two I mostly wanted to do for fun, like “Can I do it?” I find integrating with a JSON API strangely fun.

I’ve seen tons of Hacker News clones, so I knew there must be some API I could use to search for links that’ve been posted for my domain `blog.jim-nielsen.com`.

Sure enough, [Algolia’s Hacker News search API](https://hn.algolia.com/api) was precisely what I wanted. A quick read through the docs and I found the API call I needed: a search query restricted to just the URL.

`http://hn.algolia.com/api/v1/search?query=blog.jim-nielsen.com&restrictSearchableAttributes=url`

It gives back a list of hits, each of which contains a few pieces of info I could use. Here’s a sample:

```
{
  "hits": [
    {
      "title": "Canistilluse.com",
      "url": "https://blog.jim-nielsen.com/2021/canistilluse.com/",
      "points": 555,
      "num_comments": 361,
      "objectID": "28309885"
    },
    {
      "title": "Inspecting Web Views in macOS",
      "url": "https://blog.jim-nielsen.com/2022/inspecting-web-views-in-macos/",
      "points": 536,
      "num_comments": 140,
      "objectID": "30648424"
    }
  ]
}
```

I added [an async step to my build](https://github.com/jimniels/blog/commit/b1a250b2357d21e69a58ce3265114e1761fb47f8) to go fetch this data and make it available in the model of my site’s data for use in templating.

That got me a list of “HackerNews Hits” on my home page:

<img src="https://cdn.jim-nielsen.com/blog/2022/new-home-page-list-hackernews.png" width="706" height="312" alt="" />

Reading comments on HackerNews isn’t usually my thing, but if it’s yours, now have a potential signal for where to start reading on my blog.

After sitting on it a little longer, I decided to cut down each of my home page lists to three items each.

I kind of like where this ended up. Rather than just a giant chronological list of posts (which I have in [the archives](/archive)), I’ve got some modicum of curation going on. The conversation in my head is: “New to the blog and not sure what to read? Here are a few points of interest that could serve as jumping-off points.”

1. My most recent posts
2. Posts that are being viewed a lot right now
3. Posts that, historically, have ended up on HackerNews and had the most comments
4. My own personal favorites

<img src="https://cdn.jim-nielsen.com/blog/2022/new-home-page-list-all.png" width="742" height="970" alt="" />

What’s fun about these lists is how dynamic they are. If a post goes and gets tons of comments on HackerNews, it’ll show up on home page the next time my site builds.

It kind of makes me want to add a few more lists, I’m just trying to think of what those could be?

It’d be neat to be able to surface (credible) sites that are linking to my posts, like, “[Post Foo] linked from the Sidebar.io newsletter” or, “[Post Bar] linked from css-tricks.com”. I’m not sure how you’d do that without some form of human curation — "an automated tool that indexes the web and surfaces credible sites linking to yours” sounds a lot like rebuilding Google.

If I had webmentions setup, maybe I could pull some interesting stats out of that for the home page? Like:

- Post Foo (15 recent mentions, including css-tricks.com and twitter.com)
- Post Bar (20 recent mentions, including domain.com)

I just haven’t been able to muster the energy to setup webmentions yet. I’ll think about it some more. And I’ll think about what other possible angles of curation I could invent for my home page. 
