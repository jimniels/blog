# RSS in HTML

I have a question: has anyone ever tried to standardize an RSS feed in HTML?

I can’t find any discussion around it — but I’d love to read more about the idea because it intrigues me. 

The OG RSS was an [XML feed](https://www.rssboard.org/rss-specification).

Later we got [JSON feeds](https://www.jsonfeed.org/version/1.1/).

So why not an HTML feed standard? (I know, I know, obligatory [xkcd link](https://xkcd.com/927/).) At this point, I think it’s fair to say HTML has won. As [Yehuda says](https://twitter.com/wycats/status/1376963953054547970?s=20):

> HTML…is humanity's best effort to create a single set of portable semantics for the interaction patterns in computing.

In 100 years, will we still be writing XML for feeds? I would venture to guess that HTML will still be prevalent, so why not be writing HTML?

Plus it would be nice to have an “RSS” link on your website that, when an end-user clicks on it, is actually human-readable.[^1]

If you go to [my blog’s XML feed](https://blog.jim-nielsen.com/feed.xml), well who knows what you’ll get. Depends on the browser. If you’re in Chrome, the resulting page is indecipherable unless you know what you’re looking at.

<img src="https://cdn.jim-nielsen.com/blog/2024/html-rss-xml.png" width="947" height="687" alt="Screenshot of an a bunch of XML code in Chrome browner" />

[My blog’s JSON feed](https://blog.jim-nielsen.com/feed.xml) is the same thing:

<img src="https://cdn.jim-nielsen.com/blog/2024/html-rss-json.png" width="947" height="687" alt="Screenshot of the JSON feed for blog.jim-nielsen.com in a Chromium browser" />

Why not have feeds in HTML? Then you wouldn’t need an RSS client to _read_ content, only to _subscribe_ to it.

Feeds would be readable like any other content on the web.

Plus, betting on HTML in the long run seems like a good idea.

Anyway, just a thought. Surely others have had it. Send me a link if you know where this conversations has happened.

[^1]: Granted, you can [style your XML feed](https://darekkay.com/blog/rss-styling/) if you want to wrangle RSS. I want to style my XML feed but I don’t want to wrangle RSS, which is why I haven’t done this — yet.