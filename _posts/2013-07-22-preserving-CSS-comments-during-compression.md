---
title: Preserving CSS Comments For Wordpress During Sass Compression
date: 2013-07-22
tags: tips webDesign
redirect_from: /posts/preserving-CSS-comments-during-compression/
---

Compressing your CSS for production websites is a best-practice, especially if you're using a CSS preprocessor like Compass. If you don't compress your CSS, all your comments (along with stuff from Compass) will show up in your final CSS file.

Here's an example of compiled CSS output before compression:

```scss
/* line 22, ../../../../../../../../Library/Ruby/Gems/1.8/gems/compass-0.12.2/frameworks/compass/stylesheets/compass/reset/_utilities.scss */
a:hover {
    border: 0; /* remove border from CSS */
}
```

Now here's that same rule compressed:

```css
a:hover{border:0}
```

You should already be commenting your code generously. Thus, your CSS file size will increase rather quickly. Here's a comparison example of CSS file sizes for a project I'm currently working on:

- Prior to compression
		- File size: 122.413kb
		- Lines of code: 4,601
- After compression:
		- File size: 81kb
		- Lines of code: 1

To compress using Compass, simply run `compass compile -s compressed` to strip out all comments and other unnecessary content.

## How Do You Preserve Selective Comments?

What if you want to preserve specific comments in your CSS? Suppose you want to include licensing information at the beginning of the file, or copyright information, or other required comments, how do you do it?

### Wordpress Example

When creating a Wordpress theme, you **must** include CSS comments in `style.css` identifying your theme. It's usually something like this:

```scss
/*
Theme Name: Twenty Ten
Theme URI: http://wordpress.org/
Description: The 2010 default theme for WordPress.
Author: wordpressdotorg
Author URI: http://wordpress.org/
Version: 1.0
*/
```

Why? Wordpress uses that information in to identify themes. From the [codex](http://codex.wordpress.org/Theme_Development#Theme_Stylesheet):

> The stylesheet must provide details about the Theme in the form of comments. **No two Themes are allowed to have the same details** listed in their comment headers, as this will lead to problems in the Theme selection dialog.

So if you're creating a Wordpress theme, it's imperative your theme-identifying CSS comments **do not** get stripped out during compression.

### The Solution

To ensure specific CSS comments are included in a compressed file, make the first letter of a comment `!`. According to the [SASS documentation](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#comments):

> When the first letter of a comment is !, the comment will be interpolated and always rendered into css output even in compressed output modes.

Thus, in the example above, your Wordpress comments would go something like this:

```scss
	/*!
	Theme Name: Twenty Ten
	Theme URI: http://wordpress.org/
	Description: The 2010 default theme for WordPress.
	Author: wordpressdotorg
	Author URI: http://wordpress.org/
	Version: 1.0
	*/
```

Compass will now preserve that comment block when compressing your CSS.
