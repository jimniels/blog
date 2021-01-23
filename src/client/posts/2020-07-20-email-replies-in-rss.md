---
tags: myBlog
---

# Email Replies in Feeds

[Robin](https://www.robinrendle.com/notes/reply-links-in-rss-feeds) and [Jonnie](https://destroytoday.com/blog/reply-link-in-rss-feed-posts) have both written about adding “reply links” at the bottom of each post in their feeds. I think it’s a neat idea. Honestly, I don’t think I have the kind of following where people are going to actually email me; that said, I would love to hear the thoughts of anyone who subscribes to my feed. Occasionally I do get feedback on posts via email, twitter DMs, etc., and it has always been good. Hopefully this increases that kind of correspondence. 

Doing this was straightforward. My blog is based on a static site generator ([metalsmith](https://metalsmith.io) to be specific). In my JSON/XML feeds, I added an extra template that outputs a divider and a `mailto` link.

```html
<hr />
<p>
  <a href="mailto:jimniels@gmail.com?subject=RSS Reply&body=Source article ${postLink}">
    Reply via email
  </a>
</p>
```

You may have noticed I injected info into the subject line and body of the email to help me understand the context of any incoming emails. I figured it’d be nice to have a reference to the post that triggered the reply. This code saves the sender the work of having to do it. That said, they’re always free to edit the email as they please.

These links render in both my [RSS](https://blog.jim-nielsen.com/feed.xml) and [JSON](https://blog.jim-nielsen.com/feed.json) feeds.

