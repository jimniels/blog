---
title: Automating Batch Redirects for a Jekyll Site
date: 2018-01-13
tags: engineering
---

## The Problem

When I initially setup my [icon](http://iosicongallery.com/) [gallery](http://macosicongallery.com/) [sites](http://watchosicongallery.com/), I did’t really know what I was doing. I knew I had to have URLs for each icon, so not putting much thought into it and basically doing what I saw lots of other people doing those days, I picked a URL structure which followed this pattern:

`/:category/:slug/`

Which resulted in URLs that looked like this:

`/social-networking/facebook/`

To be honest, I don’t even remember why, but at a later point in time (I believe it coincided with the point in time at which I switched my blog from running dynamically on Wordpress to running on the static site generator Jekyll) I changed my URL structure to this new pattern:

`/:year/:slug`

Which resulted in URLs that looked like this:

`/2015/facebook`

I think one of my lines of reasoning was that categories 1) weren’t that important to the information architecture of the site itself and 2) were subject to change by Apple (Apple uses IDs in their API for categories, therefore they can easily change the name of a category from say "Social Networking" to "Social Networks"). After having posted icons for a couple years, I also found myself occasionally posting multiple icons for the same application. For example, Twitter had one icon in 2012, but with the popularization of “flat design”, they changed its design in 2014 and I had both icons in my gallery. Thus, I concluded at the time, the date at which I posted the icon had at least some kind of meaning in the information architecture of my site. I *believe* that’s why I decided to put the year in the URL. I probably thought “there’s no way I’ll ever need to post an icon from an app more than once a year”. I don’t know if I actually thought that, but if I did, I wasn’t very ~smart~ experienced.

SOMETHING HERE ABOUT THE URL REDIRECTS IN JEKYLL?

As you can imagine, that decision came back to bite me.


 which followed this pattern:

`/:year/:slug`

which resulted in URLs like this:

`/2017/tweetbot`

The recurring problem I had with these URLs is that their structure dictated I could only post one icon for an app once a year. For example, if I posted the icon for [Tweetbot](https://tapbots.com/tweetbot/) in, say, January of 2017, the URL to that post would look like this:

`/2017/tweetbot`

Then, if that app released a new icon in, say, October of 2017, my URLs wouldn’t allow me to post a new icon. The only way to do would be to give the app’s slug a new name, like:

`/2017/tweetbot-2`

This wasn’t an issue I ran into all the time, but I did run into it on occasion. So I decided to finally do something about it and change all my URLs so that I could post any icon at any point in time.

### New URLs

I began thinking about what I wanted my new URLs to look like. Because i’ve found myself often needing to post different icons of the same application, simply using the application’s name wasn’t going to be enough as a universally-unique identifier. However, I knew if I threw time in there as a factor in the form of a data, I would never be posting an icon for a single app on the same day. So a combination of the app’s name and the date I posted it seemed to be the write tradeoff.

I thought about using just a cryptic guid of some kind, like `/2817ad039a` but my site was setup on Jekyll so because Jekyll doesn’t support generating unique IDs per post for you, the only way to accomplish that would be to go back into everypost and add some kind of unique identifier in the yaml front matter.

Instead, I worked with the constraints of the [jekyll permalinks](https://jekyllrb.com/docs/permalinks/) and what they provided. I took a look at the following options:

- `iosicongallery.com/2017-07-11/logic-remote`
  - No because I don’t want to support the index listings at the date level (nor does Jekyll even officially support this)
- `iosicongallery.com/2017-07-11-logic-remote`
- `iosicongallery.com/logic-remote-2017-07-11`
- `iosicongallery.com/17-07-11-logic-remote`
  - No, I don’t like how the date reads with hyphens making it seem as important as the slug. It’s not
- `iosicongallery.com/20170711-logic-remote`
- `iosicongallery.com/logic-remote-20170711`
  - A little better, the date reads almost inconsequential but still parseable
- `iosicongallery.com/logic-remote-170711`
	Date is a little more cryptic, so you mostly just intake the number (plus number is shorter)

Let it sit for a few days and I came to this conclusion, which felt obvious on day 3. Reason being “I want this to be a human-friendly date” where as a more cryptic 171107 is not. Because the date of posting the icon is very important to it’s place in the site.
iosicongallery.com/logic-remote-2017-07-11

Like 20170711 because it’s still readable, but not on the same level of “read this” as the hyphenated slug, it’s morel like “hey it’s there if you need it”



## What

Write a node script that will read in every .md file, add a redirect, then write back out.
And if there’s already a redirect, read it’s value and create an “array”.

```
// new ones
redirect_from: /2017/logic-remote

// old ones
redirect_from:
  - /games/angry-birds/
  - /2011/angry-birds/
```




New icon files

For every post:
- Write a redirect
    - If there’s already one, add it
- Find the icon’s image file in all locations and rename it with a date

Make sure new urls have trailing slash 


