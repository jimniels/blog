---
title: Personal Observations on “CSS and Network Performance” by Harry Roberts
date: 2018-12-29
tags: engineering
---

First and foremost, this post is a reflection on [“CSS and Network Performance”](https://csswizardry.com/2018/11/css-and-network-performance/) by Harry Roberts via CSS Wizardry, which is a really interesting (and deep) look at all the ways CSS can affect the loading and rendering speed of an HTML document.

## `<script>`s Before `<link>`s

> There is a fascinating behaviour present in all browsers that is intentional and expected, yet I have never met a single developer who knew about it. This is doubly surprising when you consider the huge performance impact that it can carry:
>
> A browser will not execute a `<script>` if there is any currently-in flight CSS.

Example:

```html
<link rel="stylesheet" href="slow-loading-stylesheet.css" />
<script>
  console.log(
    "I will not run until slow-loading-stylesheet.css is downloaded."
  );
</script>
```

> This is by design. This is on purpose. Any synchronous `<script>`s in your HTML will not execute while any CSS is currently being downloaded. This is a simple, defensive strategy to solve the edge case that the `<script>` might ask something about the page’s styles

The implication here is that moving moving third party JS down before your closing `</body>` tag (a relatively well-known practice) can actually be detrimental to performance. So when Google Analytics says to put their script in the `<head>` element, that’s actually the best thing to do performance-wise. However, that doesn’t mean you _have to_ do it. Now that you’re familiar with this fact, you can make an informed decision most pertinent to whatever project you’re working on. The author’s advice is:

> If your `<script>…</script>` blocks have no dependency on CSS, place them above your stylesheets.

Stated again:

> If the files do not depend on one another, then you should place your blocking scripts above your blocking styles—there’s no point delaying the JavaScript execution with CSS upon which the JavaScript doesn’t actually depend.

Stated yet again, if your external JavaScript has no dependencies on the CSS styles that get loaded into the document, you can achieve optimal loading and rendering of the document by placing `<script>` tags before `<link>` tags, i.e.:

```html
<!-- This -->
<head>
  <script src="/myScript.js"></script>
  <link rel="stylesheet" href="/myStyles.css" />
</head>

<!-- Would be faster than this -->
<head>
  <link rel="stylesheet" href="/myStyles.css" />
  <script src="/myScript.js"></script>
</head>
```

Here’s an example why (from the author):

```html
<!-- This JavaScript executes as soon as it has arrived. -->
<script src="i-need-to-block-dom-but-DONT-need-to-query-cssom.js"></script>

<link rel="stylesheet" href="app.css" />

<!-- This JavaScript executes as soon as the CSSOM is built. -->
<script src="i-need-to-block-dom-but-DO-need-to-query-cssom.js"></script>
```

## Breaking Up Your CSS Files

Now let’s talk about the relatively standard practice of putting all your CSS in one file. Turns out, doing this can actually be suboptimal in many regards (which the author outlines in the article). An alternative approach is splitting that single-file CSS into multiple CSS files and then including them in your HTML alongside their HTML counterparts. Example:

```html
<html>
  <head>
    <link rel="stylesheet" href="core.css" />
  </head>
  <body>
    <link rel="stylesheet" href="site-header.css" />
    <header class="site-header">
      <link rel="stylesheet" href="site-nav.css" />
      <nav class="site-nav">...</nav>
    </header>
  </body>
</html>
```

The author explains one of core the benefits to this approach:

> due to a recent change in Chrome (version 69, I believe), and behaviour already present in Firefox and IE/Edge, `<link rel="stylesheet" />`s will only block the rendering of subsequent content, rather than the whole page...In browsers that don’t currently support this new behaviour, we suffer no performance degradation: we fall back to the old behaviour where we’re only as fast as the slowest CSS file.

I actually found this a really interesting insight. It has a few parallels to the benefits gained with modern css-in-js approaches, like style and markup collocation. However, in this case, you can still maintain a ”separation of concerns”: styles in one file, markup in another. This approach allows you to write CSS that’s scoped to a specific set of DOM markup, yet “global” in the sense that it can still be used across pages. I find this to be an interesting convention in how you might structure a project, as it allows you to be disciplined in creating and maintaining componentized CSS files, knowing their context is scoped to a corresponding set of DOM markup (if it’s not related, it should be elevated to a “higher level” of CSS, the “core” stylesheet being the highest level). This keeps the separation between HTML/CSS/JS yet gives you a lot of the conveniences of componentization that you have today in single-page JS apps. Plus, as the author points out, it can actually result in a faster (at least perceptually) loading experience, as the DOM is loading and painting content as it goes down the page.

For example, on my [icon gallery site](https://www.iosicongallery.com) (which is static site generated using metalsmith), I have a “module” for displaying a list of icons. This “module” shows up across different pages. For example, on the homepage (`/`), you see a list of icons displayed in a grid which represent the most recently-posted icons to the site. On individual icon pages (`/icons/:id`), there are multiple lists of icons displayed in a grid, each list representing other icons in the site that correlate to the current icon in some way (for example color).

Today, every single one of these pages, whether the home page (`/`) or an individual icon’s page (`/icon/:id`), has a single `<link>` tag in the head of the document, linking to **all** the CSS across my entire site.

```html
<link href="/global.css" />
```

What I realized (or re-realized in some cases) from this article, is that splitting those CSS styles into multiple files and including them inline with their relevant HTML snippets can have three benefits:

1. The page load/render is faster (the browser loads and paints things as they asynchronously load into the DOM, rather than loading everything once and then painting)
2. Less CSS (and thus less bytes) are transferred across the network and loaded into the page, because I’m only including CSS relevant to the page, rather than _all_ CSS for the site (some of which is for module patterns that are not used on the current page).
3. The relationship between HTML and CSS is made more explicit in my codebase due to the proximity of files and their relationship in naming.

So my resulting HTML would look something like this:

```html
<link href="styles/icon-list.css" />
<ul class="icon-list">
  <li>
    <a href="/icons/facebook/"> <img src="icons/facebook/128.png" /> </a>
  </li>
  <li>
    <a href="/icons/twitter/"> <img src="icons/twitter/128.png" /> </a>
  </li>
</ul>
```

You can see the relationship between the CSS styles and the HTML below it. This relationship can be expressed in the codebase via file names and proximity, i.e. `icon-list.html` for the markup of your template and `icon-list.css` for the corresponding styles. Obviously you could set this up however you want, but I think it can make the relationships in your codebase more clear especially when refactoring code. Change the `<ul class="icon-list">` markup? Go change the styles in `icon-list.css`.

What also makes this really neat is these “modules” can be marked up semantically depending on their context across the site. Additionally, if I have a page where I don’t show a list of icons (like, say, an `/about/` page), I don’t have to load those styles at all.

```html
<!-- `/` (home) page, where the list of icons is
     the primary content of the page -->
<link href="styles/icon-list.css" />
<main>
  <ul class="icon-list">...</ul>
</main>

<!-- `/icon/:id` icon view pages, where the list of
     icons is the related, "sidebar" content -->
<link href="styles/icon-list.css" />
<aside>
  <ul class="icon-list">...</ul>
</main>

<!-- `/about/` page, where I don't have a list of icons,
    so there's no <ul> and no <link> and thus those styles
    Don’t have to be loaded over the network. -->
```

You could do this for all the “modules” across your entire website. For example, a single HTML page could look something like this:

```html
<link href="styles/header.css" />
<header class="header">...</header>

<link href="styles/icon-view.css" />
<main class="icon-view">...</main>

<link href="styles/icon-list.css" />
<aside>
  <h3>Related "blue" icons</h3>
  <ul class="icon-list">
    ...
  </ul>

  <h3>Related icons designed by Michael Flarup</h3>
  <ul class="icon-list">
    ...
  </ul>
  <aside>
    <link href="styles/footer.css" />
    <footer class="footer">...</footer>
  </aside>
</aside>
```

Granted, this probably doesn’t work in all situations. The answer as to whether you should do this is _it depends_. But I think it’s an interesting collection of development practices that could bring further clarity and readability to a codebase, not to mention faster load and render times for the user. Rather than wait for _everything_ (some of which you likely won’t need), load and paint individual pieces as you go.
