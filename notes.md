# Redirects

```
/archive/ -> /posts/ (/posts/#2015)
/tags/ -> /posts/tags/

/posts/a-web-of-people-20120629
/posts/a-web-of-people-2012-06-29
/posts/2012-06-29-a-web-of-people
/posts/20120629-a-web-of-people
/posts/a-web-of-people-120629

/links/2205010915
/links/220501T0915
/links/20220501T0915
/links/2022-05-01T09-15
/links/2022-05-01-09-15
/links/2022-05-01-theverge.com
THIS DOESN'T WORK
/links/2022-05-01-youtube.com
/links/2022-05-01-youtube.com
```

# Reading Notes

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
