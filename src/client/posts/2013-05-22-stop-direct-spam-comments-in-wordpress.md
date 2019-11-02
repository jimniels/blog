---
title: Stop Direct Spam Comments in Wordpress
tags: tips
redirect_from: /posts/stop-direct-spam-comments-in-wordpress/
---

I recently redesigned my wordpress theme for [iOS Icon Gallery](http://iosicongallery.com) and [Mac Icon Gallery](http://macicongallery.com).

The old themes provided the ability to comment through the interface. Due to a lack of real comments and a surplus in spam comments, I decided to entirely remove the ability to comment from the interface.

## Removing the Ability to Comment From the Interface Is Not Enough to Keep Out Spam

Once my theme went live, I was still getting spam comments in the Wordpress backend. I asked myself, "how are comments still appearing in the Wordpress backend when I don't have a single comment form on my website?" After some Googling, I discovered this was due to spambots posting data directly using `wp-comments-post.php`.

![Sneaky Gif](https://cdn.jim-nielsen.com/blog/2013/sneaky.gif)

## Further Stopping Spambots
To prevent spambots from posting to Wordpress via a URL, you can block access to `wp-comments-post.php` via the `.htaccess` file. Simply include these rules in your `.htaccess` file (thanks to [catswhocode](http://www.catswhocode.com/blog/snippets/blockreduce-wordpress-spam-comments-via-htaccess))

	<IfModule mod_rewrite.c>
		RewriteEngine On
		RewriteCond %{REQUEST_METHOD} POST
		RewriteCond %{REQUEST_URI} .wp-comments-post.php*
		RewriteCond %{HTTP_REFERER} !.*yourdomainname.* [OR]
		RewriteCond %{HTTP_USER_AGENT} ^$
		RewriteRule (.*) ^http://%{REMOTE_ADDR}/$ [R=301,L]
	</IfModule>

**Note**: Be sure to change the `yourdomainname` part!

## That Doesn't Help You?
If this doesn't seem like the best fix for you, try looking at this article from WP Tuts+ detailing [easy and efficient ways to combat spam comments](http://wp.tutsplus.com/tutorials/security/6-easy-and-efficient-ways-to-combat-spam-comments/).
