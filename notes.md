# Original look at structure of "Reading Notes" posts

Every note will be an `<h2>` represented in markdown by `##`. They should all follow this pattern:

`## Type: [Name of link](url)`

Maybe write a script where this is not true?

From that, our parser could generate data for all of these, like:

```json
{
  type: "Article",
  title: "Name of link"
  url: "https://..."
}
```

Do I actually want this? Or do I want to be able to specify more details in the header title? i.e.

`## Type: [name of link](url) by Expert Name via Website`

If we supported that, you could parse that with a regex and extra the data.

`## Type: [title](url) by author via website`

Obviously a more structured way of doing this would be something like:

```yml
title: Name of link
url: https://css-tricks.com/
author: Chris Coyier
website: CSS Tricks 
```

Types:

- Article
- Video
- Tweet (tweets? tweet thread?)
- Podcast
- Quote
- Song Lyrics
- Book
- Website

  'Article',   'Video',
  'Website',   'Tweet',
  'Podcast',   'Online eBook',
  , 'Tool',
  'Quote',     'Song',
  'Book',      


# Follow up of what I might do...

Jeremy:

- Journal - long form blog posts
  - `/journal/19283`
- Links - links to stuff with small notes
  - `/links/19201`
- Articles - stuff written elsewhere on the internet and posted here
  - `/articles/10291`
- Notes - tweets and other...
  - `/notes/20192`

John:

- Linked list, link log, linkblog, "daily list of interesting links with brief commentary"
- Articles, `/2022/02/on_the_origin_of_the_iphone`
  - `/2022/02/` articles published in february
  - `/2022/` articles pusblished in 2022

Me:

/posts/:id
  /posts/2022-09-01-a-web-for-all
  /posts/202209010915
/links/:id
  /links/2022-09-01-09-15

Blue Organic Lens 117*

`/src/client/links/2022-09-10T09-47.md`
`/links/202209100947`
```md
#l-twitter #l-rss

# [Five years of quitting Twitter](https://nolanlawson.com/2022/02/02/five-years-of-quitting-twitter/)

> [for many] I only exist when someone takes pity on me and links to my blog from Twitter, Reddit, Hacker News, or a big site like CSS Tricks...
>
> For those people who are re-sharing my content on social media, I suspect most of them found it from their RSS feed. So RSS definitely still seems alive and well, even if it’s just a small upstream tributary for the roaring downstream river of Twitter, Reddit, etc
```

# After coding some of this up to see how it feels....

WhatÆs the difference between a “post” and a “link/note”?

A "post" is a long form set of my own thoughts on specific things
Can also be things like bookNotes

A "note" is a excerpt of something I learned with little commentary. It's fuel
for what I would write if i ever wrote a blog post on the topic.
Should always link to _something_, i.e. a podcast, article, book, etc.
Really it’s just a "pre-post" in a lot of ways?

If we make them all in this format, we can parse them into the different pieces we need:

For notes, we always get a markdown file which we parse into these disparate pieces based on direct or meta info in the markdown file itself.

```md
#l-type-article #l-html #l-css

# [“Cool URIs Don’t Change”](https://w3c.org)

> Something really interesting.

I agree 100% with what is being said here. Maybe i’ll elaborate on the
idea at some future date.
```
