---
title: Blog Redesign Over the Years Time Machine
date: 2018-04-02
tags: design
---

I know, I know. Yet another post in which somebody is announcing a redesign. But I got an itch to redesign my blog and I can scratch it because, hey, it’s my blog and you can’t tell me what to do.

The thing that moved me to redesign my blog was...well, to be honest it was in part due to fatigue. My blog is basically [just a place for me to write](https://jim-nielsen.com/blog/about/) about things I want to write about because they either interest me or because I want to learn more about them and writing helps me do that. And the more I read and write on the web, the more I wish I had some of those old-school web features, like usage of the `:visted` pseudo class in CSS. Why? Because then I could browse around and actually know what I’ve already looked at or read. But hardly anyone uses those things anymore. Be the change you want to see in the world right? 

I’ve been reading some of [Tim Berners Lee’s notes on the web](https://www.w3.org/DesignIssues/) recently and have really enjoyed it. Granted, that site isn’t going to win any “design” awards, but the *exprerience* of reading from that site is fantastic, in part because it uses basic ”web” styles: blue for links, purple for visited ones. This made reading his stuff really easy. If it was purple, I’d already read it. I didn’t need an app to keep track of what I’ve read and what I have’t. It sounds so simple, but it was so nice. It's the small things you know?

Anyway, I decided I wanted to do the same thing with my blog. Try to go back to basic web styles. I’m not trying to win any design awards for my blog, it’s just a place for me to dump my thoughts. My initial design attempt basically stripped everything away, but the visual part of me begged for just a tiny bit more, so that’s how I ended up with what I have today. 

Really, at this point, the blog design is more about the content than it is the look. Isn’t that how it should be? I’m sure I’ll change my mind on this in a few months or years when I want to redesign something again. But there’s also a part of me that someday hopes I can strip everything down such that the extent of the CSS on my blog would be something like:

```css
body {
  max-width: 35rem;
  margin: 0 auto;
  line-height: 1.5;
}
```

In fact, just writing that prior paragraph gave me an idea: what if I included the ability for someone to browse my site free of CSS? Here’s [my base implementation of that](https://jim-nielsen.com/?noCSS)

## The Blog at jim-nielsen.com

One of the things that interested me when I started this redesign was how many times I’ve changed my blog design over the years. Thanks to the [WayBack Machine](@TODO) I could find out. Allow me to take you on a tour:

![Screenshot of my blog in November of 2011]({{ site.imageurl }}/2018/blog-history-snapshot-2011-11-04.png)

**Circa November 2011**: ah yes, probably the very first design of my blog. It very much fit the design of a Wordpress blog around the time: content feed on the left, blog categories and tags on the right, posts with featured images, it all brings me back to a simpler time.

![Screenshot of my blog in June of 2012]({{ site.imageurl }}/2018/blog-history-snapshot-2012-06-14.png)

**Circa June 2012**: this looks like it was an at attempt at making my blog more “visual”. As you can see, the content previews for the post listings were removed in favor of showing only each post’s featured image. Ah young Jim, did you really think you were going to create a “featured image” for every single blog post? Who do you think you are, an online media company? I’m sure by the time I had three or four blog post drafts, I quickly realized I’d either be 1) rarely publishing anything, due to effort required to create a unique image with every post, or 2) redesigning my blog soon.

![Screenshot of my blog in March of 2013]({{ site.imageurl }}/2018/blog-history-snapshot-2013-03-02.png)

**Circa March 2013**: ahhh, I remember this. This was when I switched to the now-defunct service [Scriptogram](@TODO) for hosting my blog. That service was pretty neat. You could publish markdown files to a folder on Dropbox and their service would build your blog for you. In a sense it was really great because I could edit a plain-text markdown file from anywhere and the edits would be live to my blog within a minute or so, all due to Dropbox’s file syncing platform. It was kind of like Jekyll but without the jekyll-ness of it. You have a folder of markdown files representing posts (which take a certain format), we turn it into a blog. The service, however, was free so (as you can imagine) it wasn’t around long. 

This particular screenshot reflects the default theme the service applied to all their blogs. It was fine, it worked for me. Or rather, it worked until I wanted to roll my own design, which fortunately their service did actually allow for. And that leads me to my next picture:

![Screenshot of my blog in May of 2014]({{ site.imageurl }}/2018/blog-history-snapshot-2014-05-13.png)

**Circa March 2014**: I actually had this design for a while. I remember thinking it was pretty good. It was a “theme” I developed first when my blog was hosted on Scriptogram. When that service went down, there was this thing called “Jekyll + Github Pages” I decided to give a try. I remember it being relatively easy to transfer all my posts and the site’s theme from scriptogram (markdown posts in dropbox + static CSS theme) to jekyll (markdown posts and HTML/CSS in Github). I think I kept this design longer than others, but eventually the itch to redesign struck again (as it always does).

![Screenshot of my blog in August of 2016]({{ site.imageurl }}/2018/blog-history-snapshot-2016-08-26.png)

**Circa August 2016**: about this time, I began tracking [my “redesigns” as tagged releases in Github](https://github.com/jimniels/blog/releases). You could technically head over there to see them all, but I’ll continue posting the rest here for convenience sake. 

This particular design came about because one day I was particularly enjoying the experience of navigating my blog and the `_posts/` directory of jekyll in my code editor and I thought “what if this was the experience on the actual website?” Before I could even think if it was a good idea, I was coding because I wanted to see if it could be done and what it would feel like. Shortly thereafter I published my new theme, but it didn’t last very long. To be honest, it was a decision made in the haste and excitement of something novel. But that’s ok, it’s my blog. I can do whatever I want.

![Screenshot of my blog in April of 2017]({{ site.imageurl }}/2018/blog-history-snapshot-2017-04-06.png)

**Circa April 2017**: in a similar vein to the impulse described above (blog theme emulating an IDE), this was a foray into treating a post’s typography as if it were a plain text file with markdown syntax. I took this one to the extreme of having everything in a single font size. It was interesting. I kind of liked it for a while. But the novelty wore off and I was quickly onto the next thing.

![Screenshot of my blog in August of 2017]({{ site.imageurl }}/2018/blog-history-snapshot-2017-08-18.png)

**Circa August 2018**: this was my most recent theme (before the new one you see today). It was the result of a more natural progression from the ones preceding it. It had a “dark theme” which was nice, but honestly I never used it. I thought about doing something fancy where I detect the time of the client and if it’s past like 10PM, automatically setting the theme as dark. But then I realized that I hate it when apps do that to me. If I want it dark, I’ll set it dark. So I removed that, though I wouldn’t be surprised if it makes it back someday.

![Screenshot of my blog at the time of this writing (2018)]({{ site.imageurl }}/2018/blog-history-snapshot-present-2018.png)

**March 2018** Ah yes, the redesign of 2018 where you wrote a blog post to go with the new design. What were you thinking back th...oh wait, this is my current design. I’m sure all my rationale (or rather impulse) for this design will be considered “silly” by Jim of 2020, but that’s ok. I’ve learned to live with myself.





----

Change color of visisted links
https://www.nngroup.com/articles/change-the-color-of-visited-links/

Default link colors are prescribed in HTML5
https://stackoverflow.com/questions/4774022/whats-default-html-css-link-color