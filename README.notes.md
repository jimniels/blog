# Option 1: blog.jim-nielsen.com & notes.jim-nielsen.com

This is a nice format because I can just dump my notes on notes.jim-nielsen and then anything I want to pull out into some kind of synthesized piece, I can do that over on blog.jim-nielsen.com

## Content format

```md
#notes_article #notes_twitter #n_rss

# [Five years of quitting Twitter](https://nolanlawson.com/2022/02/02/five-years-of-quitting-twitter/)

> [for many] I only exist when someone takes pity on me and links to my blog from Twitter, Reddit, Hacker News, or a big site like CSS Tricks...
>
> For those people who are re-sharing my content on social media, I suspect most of them found it from their RSS feed. So RSS definitely still seems alive and well, even if it’s just a small upstream tributary for the roaring downstream river of Twitter, Reddit, etc
```

Gets parsed in to:

```json
[
  {
    id: "https://notes.jim-nielsen.com/2022-01-08T09-05",
    content_html: "<h1><a href='..."
    date_published: "2022-01-08T09:05-07:00"
    title: "Five years of quitting twiter"
    url: id,
    external_url: "https://nolanlawson.com/..."
    tags: ["type_article", "twitter", "rss"]
  }
]
```

## File names

- Ported reading notes:
  - `2022-01-12T00-00.md`
  - `2022-01-12T00-01.md`
  - `2022-01-12T00-02.md`
- New files
  - `2023-08-01T10-36.md`
  - `2023-08-05T12-22.md`

## URLs

Load them all in one giant HTML file on `notes.jim-nielsen.com`

Why one big file? Because I want to be able to search/filter them all at once and one page makes that easy. Plus the exercise here is all text so it should be small.

Accessible as anchor link in main file:

- `notes.jim-nielsen.com/#2022-05-01T12-00`

Or as its own URL

- `notes.jim-nielsen.com/2022-05-01T12-00`

Will require:

1. Port all exisiting reading notes into new repository as `.md` files
2. Script that gets all files, parses them into `db.json` file, and turns them into static files (and feed files)
3. Add a thing to all reading notes posts that indicate they are now reposted on `notes.jim-nielsen.com` — or do a redirect? from old blog reading notes posts to new `notes.jim-nielsen.com` - this might be a little weird...
4. 


# Option 2: Refactor Blog With Namespaced Content 

URLs go from `/2022/:slug` -> `/posts/:slug` e.g. 

- `/2019/reading-notes-january` -> `/posts/reading-notes-january-2019`

This allows for different namespaces in the future, i.e.

- `/notes/:id`

Filenames
  - `posts/2019-05-12-a-web-of-people.md`
  - `notes/2019-05-12T1335.md`

URLs:
  - Posts:
    - `/feed.xml` `feed.json`
      - Would we want this to become `/posts/feed.xml` or `/posts/feed.json`
      - What do we do with the old one? Keep both?
    - `/posts/a-web-of-people-2019-05-12/`
    - `/posts/2019/a-web-of-people/`
    - `/posts/a-web-of-people/`
      - Would fail for `reading-notes-march`
  - Notes:
    - `/notes/feed.xml` and `/notes/feed.json`
    - `/notes/theverge.com-2019-05-12T13:35`
    - `/notes/2019-05-12T1335/`

ISO8601 [only allows for a colon in the time component](https://stackoverflow.com/questions/27725408/alternative-to-colon-in-a-time-format) of the syntax, otherwise it's all just munged together.

Ramifications of changes:

- `/posts/` Becomes today’s `/archive/` page (including `/posts/#2015`)
  - A list of all posts
- `/notes/` Is an index of all notes
  - A list of all links, or
  - All notes laid out textually
- `/tags/` all tags and associated posts/notes
  - `/posts/tags/` and `/notes/tags/` or
  - `/tags/posts/` and `/tags/notes/`

Example:

```md
#n_type_article #n_twitter #n_rss

# [Five years of quitting Twitter](https://nolanlawson.com/2022/02/02/five-years-of-quitting-twitter/)

> [for many] I only exist when someone takes pity on me and links to my blog from Twitter, Reddit, Hacker News, or a big site like CSS Tricks...
>
> For those people who are re-sharing my content on social media, I suspect most of them found it from their RSS feed. So RSS definitely still seems alive and well, even if it’s just a small upstream tributary for the roaring downstream river of Twitter, Reddit, etc
```

---

# URL options

```
/links/2205010915
/links/220501T0915
/links/20220501T0915
/links/2022-05-01T09-15
/links/2022-05-01-09-15
THIS DOESN'T WORK CAUSE TWO LINKS TO SAME DOMAIN ON SAME DAY
/links/2022-05-01-youtube.com
/links/2022-05-01-youtube.com
```

---

# Parsing Reading Notes

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

Current types:
Article: 305,
Video: 36,
Podcast: 8,
Tweet: 13,
Quote: 4,
Website: 5,
eBook: 2,
Talk: 3, (maybe "presentation"? powerpoint + words)
Tool: 1,
Song: 1, (maybe "quote"?)
eCourse: 1,
Book: 4
  
SOLUTION: rather than indicating the type, you should do that in a narrative form, unless we want to be able to filter by these types, i.e. show me all notes that were tweets, videos, etc., which it seems like we would....

Maybe each of these need a tag, and that's all, i.e.

#n_type_article - type
#n_

**Infer the type by domain, e.g. video is youtube, vimeo, etc**


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

`/src/client/links/2022-09-10T09-47.md`
`/links/202209100947`
`/links/2022-09-10-09:47-theverge.com/`


# After coding some of this up to see how it feels....

What’s the difference between a “post” and a “link/note”?

A "post" is a long form set of my own thoughts on specific things
Can also be things like bookNotes

A "note" is a excerpt of something I learned with little commentary. It's fuel
for what I would write if i ever wrote a blog post on the topic.
Should always link to _something_, i.e. a podcast, article, book, etc.
Really it’s just a "pre-post" in a lot of ways?

If we make them all in this format, we can parse them into the different pieces we need:

For notes, we always get a markdown file which we parse into these disparate pieces based on direct or meta info in the markdown file itself.

```md
#html #css #urls

# [“Cool URIs Don’t Change”](https://w3c.org)

> Something really interesting.

I agree 100% with what is being said here. Maybe i’ll elaborate on the
idea at some future date.
```

# 2022-03-26 Feeling like 'notes' it is

It could just be links, because _I believe_ everything will be a link.

However, really these are more about "notes to self" in a way. Freeform tagging is really important here. I want to be able to post something, tag it, and look up topics with important quotes (and my working commentary) when I need them.

Do I want tags to be prefixed? Or is it ok to tag posts and notes with the same 

`Posts`: longform, more developed thoughts on any given topic
`Notes`: quick, short excerpts from others that struck me with shortform commentary from me

How we tag them really only matters for the iA writer tag functionality. On my blog, I'll always be able to separate tags however I wish because i'll know the "entity type" at parsing time (is this a post? is it a note?)

- Do we want a tag for entity type? i.e. #n_article #n_podcast #n_video
