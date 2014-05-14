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

![Sass command line error]({{site.imageurl}}/2014/sass-command-line-error.png)

Sometimes you might not catch that error in the command line. You will, however, catch the error in the browser. It breaks everything!

![Sass busted CSS in browser]({{site.imageurl}}/2014/sass-busted-css.png)

You first reaction might be to instantaneously switch back to your text editor and fix that error you just introduced, but hold on a second. This might be one of those “turn a disaster into an opportunity” moments. How? When sass breaks it's a great opportunity to see your site “nude” per-se, without styling. CSS is a the first progressive enhancement you apply to your site.