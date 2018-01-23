---
title: Automating Batch Redirects for a Jekyll Site
date: 2018-01-13
tags: engineering
---

## The Problem: Poor URL Design

Confession: when I initially setup my [icon](http://iosicongallery.com/) [gallery](http://macosicongallery.com/) [sites](http://watchosicongallery.com/), I did’t really know what I was doing. I knew I had to have URLs for each icon. So I basically just copied what I saw lots of other blogs doing those days, I picked a URL structure which followed this pattern:

`/:category/:slug/`

Which, for example, resulted in a URL like this:

`/social-networking/facebook/`

Then, at a later point in time, (I believe it coincided with the point in time at which I switched my blog from running dynamically on Wordpress to running on the static site generator Jekyll) I changed my URL structure to this new pattern:

`/:year/:slug`

Which resulted in URLs that looked like this:

`/2015/facebook`

I think one of my lines of reasoning (at the time) was that categories 1) weren’t that important to the information architecture of the site itself and 2) were subject to change by Apple (Apple uses IDs in their API for categories, therefore they can easily change the name of a category from say "Social Networking" to "Social Networks"). After having posted icons for a couple years, I also found myself occasionally posting multiple icons for the same application. For example, Twitter had one icon in 2012, but with the popularization of “flat design”, they changed its design in 2014 and I had both icons in my gallery. So at the time I concluded that the date the icon was posted had at least some kind of meaning in the information architecture of my site. I *believe* that’s why I decided to put the year in the URL. I probably thought “there’s no way I’ll ever need to post an icon from an app more than once a year”. I don’t know if I actually thought that, but if I did, I wasn’t very ~~smart~~ experienced.

I’m foreshadowing here but that decision came back to haunt me because the URL structure dictated I could only post one icon per app per year. For example, if I posted the icon for [Tweetbot](https://tapbots.com/tweetbot/) in, say, January of 2017, the URL to that post would look like this:

`/2017/tweetbot`

Then, if Tweetbot released a new icon in, say, October of 2017, my URLs would clash. The only way to post an icon for the same app would be to:

1. Wait until the next year (which is obviously a ridiculous limitation)
2. Give the icon a new, unique slug (something that really shows I know how to use computers, like `/2017/tweetbot-2`)

This wasn’t an issue I ran into all the time, but I did run into it on occasion. So I decided to finally do something about it and change all my URLs so that I could post any icon at any point in time.

### The Solution: Better URL Design

I began thinking about what I wanted my new URLs to look like.

At first I thought about using just a seemingly cryptic ID of some kind, like `/2817ad039a`. However, my site was run on Jekyll which doesn’t support automatically generating unique IDs on a per post basis (at the time of writing this blog post, the only way to accomplish that would be to go back into every post and add some kind of unique ID in the yaml front matter for every single post).

I decided to work within the constraints of the [jekyll permalinks](https://jekyllrb.com/docs/permalinks/) and what they provided. I knew the slug alone (i.e. `angry-birds`) wasn’t going to be enough as a unique identifier for a post. I needed to also bring in the date as meaningful identifier for representing a icon in the gallery.

At first I thought about keeping the same format I’d had on the site, just with an extended date to help alleviate myself of any potential issues with URL collision, i.e.

`iosicongallery.com/2017-07-11/logic-remote`

But at the end of the day, I did’t want to support index listings at the date level. For example, under the format above, if the user hit `/2017-07-11/` a semantically-responsible site would return all posts from that date. I didn’t want to support this kind of querying via URLs. Plus, writing that kind of static file structure wasn’t even something Jekyll supported anyway.

So I decided a good URL structure would be to merely have all individual posts live directly off the root, identified solely by a unique ID consisting of a combination of the date and the app’s slug. This led me to try `date-slug` and `slug-date` with a few variations in between:

- `iosicongallery.com/2017-07-11-logic-remote`
- `iosicongallery.com/logic-remote-2017-07-11`

Here I decided I liked the slug reading first before the date as I figured identifying the app’s name made sense before identifying the post date of the app’s icon. So I made sure to have all subsequent contenders following that pattern. For what it’s worth, I basically did what you’re seeing me do here which is write out all possible options in a single text file and then compare them, weeding out possible contenders based on how they made me feel or what logical arguments around URL design they brought to mind.

Anyway, I knew I wanted the pattern `slug-date`. Now I just had to figure out what format I wanted my dates to take.

- `iosicongallery.com/logic-remote-2017-07-11`
- `iosicongallery.com/logic-remote-17-07-11`
- `iosicongallery.com/logic-remote-20170711`
- `iosicongallery.com/logic-remote-170711`

I didn’t like how the dates read when separated by hyphens in combination with the application slug. It made the URL read very long while also making the slug  feel like it had equal weight with the date. Whereas indicating the date as a single unit with no hyphens felt like it gave a better division to the slug/date separation, which (granted in my mind only perhaps) made the URL read a little more human friendly, i.e. “name-of-the-thing” followed by “computer  stuff”. In my mind, it was almost like the date was designed to be put there as a kind of “this is one of those computer ID things” but if you looked closer you could discern it was a date. This felt like the right balance in terms of a human brain parsing the URL and the computer needing unique IDs per post. The date reads more inconsequential than the slug yet still parseable. It’s still readable, but not on the same level of “read this” as the hyphenated slug, it’s morel like “hey it’s there if you need it”

So I weighed these last two options:

- `iosicongallery.com/logic-remote-20170711`
- `iosicongallery.com/logic-remote-170711`

Excluding the year prefix makes the date a little more cryptic as you almost just intake the number. I liked the idea of keeping the “20” prefix for two reason:

1. It was more discernible and discoverable as a date by humans.
2. My posts would be unique for the next thousands of years and not just till the end of the current century. Granted that’s a little ridiculous and hard to justify, but more and more I like to think of the long end-game of the web. I’d like to think in the year 2156 you could still browse this site :)


---LEFT OFF HERE
Let it sit for a few days and I came to this conclusion, which felt obvious on day 3. Reason being “I want this to be a human-friendly date” where as a more cryptic 171107 is not. Because the date of posting the icon is very important to it’s place in the site.
iosicongallery.com/logic-remote-2017-07-11


### Writing Redirects

redirect_from: /posts/understanding-comes-in-stages/

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


