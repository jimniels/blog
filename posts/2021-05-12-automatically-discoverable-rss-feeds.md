#rss

# Making Your RSS Feeds Automatically Discoverable

When I stumble on folks online whose writing I find interesting, I want to follow it. The easiest way to do that is add their website to my RSS reader.

Sometimes that’s easy. I merely copy/paste their website URL into my RSS client and their feed gets picked up automagically.

<img src="https://cdn.jim-nielsen.com/blog/2021/rss-link-app.png" width="1070" height="400" alt="Screenshots of the Reeder app when going through the user flow of adding an RSS feed." /> 

However, sometimes a feed URL can’t be found automagically. That could mean one of two things:

1. They have an RSS feed, it just can’t be found.
2. They don’t have an RSS feed.

To find out which is the case, I then go to the person’s website in the browser and look for an RSS link _somewhere_ in their UI.

Sometimes I find a feed URL and sometimes I don’t.

In cases where I can’t find a feed URL, like a friendly RSS evangelist, I’ll lookup their contact info and send them a friendly message noting that there’s at least one person in the world looking to read their online writing via a feed.

In cases where I do find a feed URL, I send them a quick message saying, “hey, did you know your feed URL isn’t being automatically discovered by RSS clients—but it can!?”

There’s actually nothing magic about how these feed URLs are discovered by RSS clients. It’s all thanks to the `<link>` tag.

Website owners can publish feed URLs in their site’s source HTML which allows RSS clients to automatically discover what they can subscribe to. This is called [feed autodiscovery](https://blog.whatwg.org/feed-autodiscovery) and it works like this:

```html
<link
  rel="alternate"
  type="application/rss+xml"
  href="/feed.xml"
  title="RSS Feed">
```

Personally, I put these `<link>` tags in the source of every single page on my site. This allows RSS clients to find my sites’s feeds from any page.

<img src="https://cdn.jim-nielsen.com/blog/2021/rss-link-jim-nielsen-code.png" width="680" height="210" alt="Screenshot of the HTML on blog.jim-nielsen.com with the RSS feed link elements defined." /> 

Note that your site can publish lots of different feeds. For example, Jeremy Keith publishes a number of different feeds for the various types of content on his site [adactio.com](https://adactio.com).

<img src="https://cdn.jim-nielsen.com/blog/2021/rss-link-adactio-code.png" width="856" height="470" alt="Screenshot of adactio.com with the developer tools open showing the RSS link tags to his various feed URLs." /> 

Because of these `<link>` tags, all of the feeds on adactio.com are automatically discoverable by RSS clients.

<img src="https://cdn.jim-nielsen.com/blog/2021/rss-link-adactio-feeds.png" width="380" height="433" alt="Screenshot of the Reeder app’s autodiscovery of the feed URLs on adactio.com" /> 

I write all this in case anyone doesn’t know about this wonderful feature of RSS. If you write online, [publish a feed](http://www.landofcode.com/rss-tutorials/rss-publish.php). And if you publish a feed, make it automatically discoverable with the `<link>` tag.
