# RSS in HTML: A Follow-Up

I asked if anyone has tried to do [RSS with HTML](https://blog.jim-nielsen.com/2024/rss-in-html/) and a good number of people responded (via [Mastodon](https://mastodon.social/@jimniels/111775081836258706) and email — TY kind people).

Many folks pointed me to [h-feed microformats](http://microformats.org/wiki/h-feed) which, in hindsight, I’m surprised I didn’t think of as I already implement the [h-entry format](http://microformats.org/wiki/h-entry) on my individual blog posts.

When I initially thought of an “HTML feed”, my brain went to using custom elements to make it a bit more like XML or JSON feeds, e.g.

```html
<!doctype>
<html>
  <head>
    <title>My feed title</title>
    <meta name="meta-key" content="meta-value">
  </head>
  <body>
    <feed-item id="..." url="...">
      <!-- html content of post here -->
    </feed-item>
  </body>
</html>
```

But I decided to leave out speculating on syntax because I figured somebody else had surely spent more time thinking about this.

Sure enough, microformats were the more flexible solution of what I was envisioning in my head.

And rather than try to describe in prose what I was envisioning in my head for an “HTML feed”, I figured I would just build it. (Sometimes it’s just easier to make something with glaring, explicit assumptions than to try and describe it in prose and leave unspoken, implicit assumptions.)

So, without further ado, here’s the [“HTML feed” for my blog](https://blog.jim-nielsen.com/feed.html):

<img src="https://cdn.jim-nielsen.com/blog/2024/html2-site.png" width="1052" height="901" alt="Screenshot of the HTML feed page on blog.jim-nielsen.com" />

It’s basically just a web 2.0 blog home page (lol): an index page with the full content of my 10 most recent blog posts — but peppered with microformats ([my PR on GitHub](https://github.com/jimniels/blog/pull/49/files#diff-063b548d78e4df555ca5d59ec05c630215d2aac1241951f65a69ea4348e19ea3R99)).

As alluded to in my original post, the main idea is that when somebody clicks on the “RSS” link at the top of my page, instead of being taken to a garbled blob of text, they get something more human friendly.

On it, there are links to the XML and JSON feeds. Or for [those who just chuck any old link into a reader](https://chriscoyier.net/2024/01/13/exposed-rss/), you can copy-paste the link from my “HTML feed” (or any other page on my blog) and you’ll get what you need.

I added a `<link>` tag for the HTML feed, so [feed auto-discovery](https://blog.jim-nielsen.com/2021/automatically-discoverable-rss-feeds/) will present people with a list of choices, e.g.

```html
<link
  rel="alternate"
  type="application/rss+xml"
  title="RSS: XML Feed"
  href="/feed.xml"
/>
<link
  rel="alternate"
  type="application/json"
  title="RSS: JSON Feed"
  href="/feed.json"
/>
<link
  rel="alternate"
  type="application/mf2+html"
  title="RSS: HTML Feed"
  href="/feed.html"
/>
```

But as far as I know, there aren’t any feed readers out there that will prefer the “HTML feed” over the XML or JSON one. As [Baldur noted](https://toot.cafe/@baldur/111776345453097179):

> once you have the XML feed ecosystem up and running, bootstrapping a new HTML one has no added utility to anybody involved..

But who knows, maybe in the long run we could get there.

Is this implementation of perfect? No. Does it work? I think so…?

If I plug the page’s HTML into [a microformats parser](https://microformats.github.io/microformats-parser/), it seems to give back what I would expect.

<img src="https://cdn.jim-nielsen.com/blog/2024/html2-parser.png" width="716" height="570" alt="Screenshot of the output of an HTML feed in a microformats parser." />

And that’s really the purpose of the page. It contains all the same feed information the XML or JSON feeds do — including the content of every post — but it’s in HTML and more understandable to people viewing it in a browser.

There’s room for improvement, but on the whole it hits on all the things I was envisioning in my original post. After building it, these are my thoughts:

- Nice-to-haves:
    - It’s just HTML, so you get all the styling controls you know and love. If somebody is viewing the document in a feed reader, none of it is relevant. But if it’s a browser, it all is.
        - CSS variables? Yes!
        - Dark mode? Yes!
        - Layout/nav structure of the rest of my site? Yes!
    - `<link>` tags in the document so feed discovery happens automagically. Just tell people to copy/paste the link.
- Not-so-nice-to-haves:
    - I hide the content of every post in a `<details>` but the browser loads all resources (like images), so that's a bit of a bummer. There’s probably a workaround to this, but that’s for another day.

I think this is a case where just _building something_ was better than trying to _describe something_.

## Update 2024-01-22

[A suggestion from Roma](https://front-end.social/@kizu/111793992772345116) spurred me to fix the issue where the remote contents of every post are fetched even in the not-yet-expanded contents of the `<details>` element.

It was a really easy but effective fix. In my code, I changed:

`post.toString()`

To

`post.toString().replaceAll("<img", "<img loading=lazy")`

And the page for my HTML feed went from:

`~20 requests/4MB`

To

`~5 request/120kb`

Because now images load when you expand the contents of the `<details>` vs. when the document loads.

Lovely!