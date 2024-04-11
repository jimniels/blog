# Single Line Comments in CSS

[Brad Frost noted on Twitter](https://twitter.com/brad_frost/status/1661099466533773320?s=20) how he recently made a website with plain HTML, CSS, JS, etc., and found himself missing some of the ergonomics from Sass. 

Having mostly abandoned Sass on personal projects, I was curious what he felt was missing.

He mentioned nesting media queries, using variables inside of media queries, as well as mixins and functions.

All great features — functions especially. I kind of forgot how much I loved functions. But I also love not troubleshooting failing builds and [the entropy of dependencies](https://blog.jim-nielsen.com/2020/cheating-entropy-with-native-web-tech/).

Sass was like jQuery: a wonderful proving ground for innovative, constructive ideas and APIs that eventually made their way into the web platform. It seems like every year we get shiny new APIs in CSS that are old familiar APIs in Sass — I mean, [nesting just landed in Safari last week](https://webkit.org/blog/14154/webkit-features-in-safari-16-5/)!

Then [Brad Westfall](https://twitter.com/bradwestfall/status/1661137189860790274) reminded me of a Sass feature that, while small, is probably the one I miss the most every single time I write vanilla CSS: single line `//` comments.

Which got me to thinking: wait, of all the things Sass has given us, how come we never got `//` as a single line comment in CSS?[^1]

I mean, JavaScript has single-line `//` comments. It has multi-line `/**/` comments. Hell, it even has [HTML-esque](http://www.javascripter.net/faq/comments.htm) `<!-- -->` comments.

And yet, for some reason, CSS has no single line comment.

Granted, somebody from, say, Python might request, “CSS should have `#` for single line comments.” But a kind of parity for comments in web technologies would make sense: `/**/` for multi-line comments, `//` for single-line comments _in both CSS and JS_.

Why did we never inherit this from Sass?

My guess was something to do with backwards compatibility and, after a little online research, that does seem to be the case. This great answer on [softwareengineering stackexchange](https://softwareengineering.stackexchange.com/a/329133) has some great context. The problem stems from CSS’ generous (and precise) “error-tolerant” parsing rules:

> If an illegal sequence of characters (like `//`) is detected inside a declaration, the current declaration is discarded and everything until the next semicolon is skipped...If single-line comments were introduced it would mean the parse after `//` should skip until next linebreak instead of until next semicolon.

What are the implications of this? It could break old CSS files in surprising ways. The author shares an example like this:

```
45   /* lots of CSS rules */
46   p { font: 12px//16px; }
47   div { color: red; }
48   /* lots of other rules */
```

Today, the CSS parser would fail on the `font` declaration for the `p` tag (line 46), thus ignoring that particular rule but continuing to parse the rest of the file (line 47, for example, would parse correctly).

However, if `//` was introduced for single line comments, the rest of line 46 would be ignored including the closing brace `}` thus potentially breaking the rest of the file because the `p` declaration was never closed. [CSS treats newlines like all other whitespace and cannot determine the end of a comment without a terminating delimiter](https://stackoverflow.com/a/2479371/1339693).

Think of minification, for example. If all your CSS was minified to a single line, what happens with `//`? It would comment out _everything_ from that point forward!

So, to preserve backwards compatibility and prevent breaking files on the web, `//` has never been introduced in CSS.

And yet...I still want it. It’s going on my next CSS wishlist.


[^1]: Because CSS’ error recovery rules are are pretty well defined, you can actually use `//` as a kind of comment, but it has [some gotchas](https://www.xanthir.com/b4U10).