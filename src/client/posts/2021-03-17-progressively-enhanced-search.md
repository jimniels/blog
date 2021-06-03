---
tags: progressiveEnhancement theMoreYouKnow
---

# A Simple Tactic For Progressively-Enhanced Search

I was reading [this post by Chris Coyier detailing the recent redesign of CSS-Tricks](https://css-tricks.com/design-v18/) and caught something I can’t believe I’d never thought of before.

Chris described creating a sophisticated client-side search experience whose base HTML markup was a link to a Google site search:

> [the] search is JavaScript-powered, so to make it more resiliant, it’s also a valid hyperlink to Google search results:

```html
<a 
  href="https://www.google.com/search?q=site:css-tricks.com%20layout"
  class="jetpack-search-filter__link"
>
  <span class="screen-reader-text">Search</span>
  <svg> ... </svg>
</a>
```

Neat idea. I have a few cases like this where search is powered via JS/client-side scripting. Because of this dependence, I inject the functionality via JavaScript (don’t have JS? You won’t see the search functionality).

Instead of merely a link, you could also capture the search query on your page and pass it to a search engine via a regular HTML form:

```html
<form method="get" action="https://www.google.com/search">
  <input type="text" id="search" name="q" />
  <button type="submit">Search</button>
</form>
```

Then use JS, where present, to prevent the default behavior of the form from submitting to Google—or the search engine of your choice for the privacy minded—and instead execute whatever client-side search functionality you dream up on your site.

I like this idea of being able to provide the core search functionality without JavaScript. It requires no additional lift on my part to leverage a search engine that’s already indexing my site.

Of course, in order for this to work, you better make sure the content of your site is meaningfully indexed by search engines.