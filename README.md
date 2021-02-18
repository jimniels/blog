# [Jim Nielsen’s Blog](https://blog.jim-nielsen.com)

## Reading Notes

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
