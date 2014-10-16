---
layout: post
title: "Breaking Sass"
date: 2014-05-14
tags: insights
---

> Not knowing when the dawn will come I open every door. — *Emily Dickinson*

You know how they say that failures in life can also be opportunities? Though I’m not one for motivational clichés, this is true when compiling Sass. Bear with me and I’ll explain.

## Compiling Failure

Anyone who has written Sass has seen it. The syntax error. Something like this:

`Syntax error: Invalid CSS after ".module": expected "{", was "}"`

![Sass command line error](http://jim-nielsen.com/blog/assets/img/2014/sass-command-line-error.png)

Sometimes you might not catch that error in the command line. You will, however, catch the error in the browser. It breaks everything!

![Sass busted CSS in browser](http://jim-nielsen.com/blog/assets/img/2014/sass-busted-css.png)

You first reaction might be to instantaneously switch back to your text editor and fix that error you just introduced, but hold on a second. This might be one of those “turn a disaster into an opportunity” moments!

SASS breaking can be a great opportunity to see your site “in the nude”, without any styling, just pure markup untainted by externals like CSS or Javascript. You see when the browser makes a request it generally gets back a single `.html` file. CSS is the first enhancement you apply to that file’s content. Seeing your SASS break is a great opportunity to stop and ask yourself some important questions about your page’s core content: the HTML. 

You can begin to ask yourself questions like: 

1. Does my site’s HTML structure make sense, i.e. is it readable—understandable—on it’s own without any CSS? 
2. Am I using a `<ul>` for lists of items but a `<dl>` when defining relationships between items? 
3. Am I denoting semantically-rich variations in the text using tags like `<strong>` and `<em>` rather than the generic `<span>` tag?

How about you test this out on your own page right now. Open up developer tools, find the
