---
title: Automated Batch Redirects in Jekyll
date: 2018-01-27
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

## The Solution: Better URL Design

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
2. My posts would be unique for the next thousands of years and not just till the end of the current century. Granted that’s a little ridiculous and hard to justify, but more and more I like to think of [the long game of the web](https://adactio.com/articles/1522). I’d like to think in the year 2156 you could still browse this site :)

After coming to a conclusion about what I felt was best, I let it sit for a few days. Not thinking about it and forgetting all my reasoning around it, then coming back to it is one of my favorite problem solving tricks. Then I have fresh eyes and my immediate gut reaction lets me know if i’ve arrived at a good decision. When I came back after a few days, my gut was still wavering between two choices, so I waited a few more days. Then when I came back again I finally arrived at a decision I felt good about:

`iosicongallery.com/logic-remote-20170711`

I like this format because the human friendly slug touches the right balance with the slightly obscured yet still discernible date. These two pieces of information make up entirely what constitutes an icon in the gallery: what the app is and when the icon was posted. I knew I’d never post the same application icon on the same day, so this was enough to make each post unique while I also felt I finally struck the right balance in the readability of the information encoded in the URL.

I know, it sounds like a lot of fretting over nothing, but I really wanted to get the URLs right because I don’t ever want to redo them again. As a recovering link rot perpetrator, I try to do everything I can these days to preserve my URLs for time and all eternity. Which leads me to the second part of this post: how I automated writing over a thousand redirects into static Jekyll markdown posts.

## The How: Writing Lots of Redirects for Jekyll Posts

In order to prevent link rot, I vowed to setup proper redirects for all my existing posts. The constraints of my site dictated I use Jekyll for doing redirects, as I didn’t have a server-side aspect to the site where I could do some kind of pattern-matching redirects. Instead, my sole option was [jekyll-redirect-from](https://github.com/jekyll/jekyll-redirect-from) which is the official, Github pages supported option for creating redirects in Jekyll. jekyll-redirect-from works by creating “an HTML file with an HTTP-REFRESH meta tag which points to your destination”.

I was actually already using jekyll-redirect-from in my site from the last time I changed the URLs. Many of my posts from 2012 and 2013 were initially hosted on the web at URLs following a pattern of `/:category/:slug`. When I changed to `/:year/:slug` I had to create redirects for those posts. So some of my posts were already leveraging `redirect_from` in their YAML front-matter, i.e.

```yaml
title: Angry Birds
slug: angry-birds
date: 2011-06-16
redirect_from: /games/angry-birds/
```

Since I decided to change my URLs from their current structure of `/:year/:slug`, I had to ensure that every existing markdown file had at least one redirect (`/:year/:slug` -> `/:slug-:date/`). Plus, as mentioned above, I also needed to accommodate some of my posts having two redirects.

### What I Needed Done

At first (perhaps naively) I thought I could leverage a find/replace regex through my editor to add a `redirect_from` to each posts’ front-matter, but I quickly realized the changes I needed to make were more significant. 

Some quick pseudo code illustrated that I needed some kind of custom automation script to loop through every post and do a couple things for each one.

#### Redirects

Some of my posts already had a `redirect_from` value in the front-matter (which was in the form of a single value). For these posts, I would now need multiple values representing multiple redirects. For example:

```
# 2011-01-12-angry-birds.md

# Exisiting `redirect_from` value:
redirect_from: /games/angry-birds

# Desired `redirect_from` value:
redirect_from:
  - /games/angry-birds/
  - /2011/angry-birds
```

For posts that didn’t yet have a `redirect_from` value, I could just add it to the post:

```
# 2017-02-03-tweetbot.md

# Desired `redirect_from` value:
redirect_from:
  - /2017/tweetbot
```

So essentially I needed my script to detect: does this already have a `redirect_from` value? If so, turn it into an array of values and add the new redirect to it. Otherwise, just add a new `redirect_from` value with the new redirect (as an array, in case we ever need to add more in the future).

I had to read through each post file line by line, because I didn’t have any assurances about where in the file a `redirect_from` value might be found. It could be the first piece of metadata in the file, the last, or somewhere in between. Thus, my script read through each post line by line and when it found a `redirect_from`, it stored it in memory and rewrote it at the very end of the YAML front-matter. If no `redirect_from` value was found, then I wrote the new redirect at the end.

#### Icon Images

Each post had corresponding icons image files matching their URL (i.e. a `slug-date.png` pattern resulted in an icon image like `angry-birds-2017.png`) which meant I was running into the same naming collision problem with the URLs over time. To fix this, I needed my pattern for naming icons image files for a post to match the URL.

Because I my automation script was already looping through each post, I had each posts’ metadata available to me. This allowed me to put together all the pieces of information from the post which I needed for the new filename pattern I decided on: `:slug-:year-:month-:day.png`. Additionally, I had various sizes for each icon in a respective folder, so I had to do a rename for all icon sizes, i.e.

- `icons/512/facebook-2017.png` -> `icons/512/facebook-02-24-2017.png`
- `icons/256/facebook-2017.png` -> `icons/256/facebook-02-24-2017.png`
- `icons/128/facebook-2017.png` -> `icons/128/facebook-02-24-2017.png`
- etc.


### The Actual Script

If you’d like to read through the specifics of my node script, I’ve got it here in all its glory for your reading pleasure (along with some comments to better help describe what’s going on).

```js
const fs = require('fs');
const path = require('path');

// Setup my paths
const baseDir = path.join(__dirname, '../../');
const postsDir = path.join(baseDir, '_posts');
const imgsDir = path.join(baseDir, 'img');

// Loop over each post .md file and do some stuff
fs.readdirSync(postsDir)
  // Filter out any files that aren't a post .md file
  .filter(filename => filename.endsWith('.md'))
  .forEach(filename => {
    
    // String accumulator for the new file i'm going to write
    let fileout = "";

    // Each piece of information is on it's own line, so put each line of the
    // the file into an array.
    const lines = fs.readFileSync(path.join(postsDir, filename)).toString().split('\n');

    // Pull out any values i'll need for later
    const date = lines.filter(line => line.startsWith('date:'))[0].split(':')[1].trim();
    const dateYear = (new Date(date)).getFullYear();
    const slug = lines.filter(line => line.startsWith('slug:'))[0].split(':')[1].trim();

    // Format each redirect will take, i.e. /2017/facebook
    // Storing these in an array because we might have more than one redirect
    // to write to the file.
    let redirect = [`/${dateYear}/${slug}`];
    
    lines.forEach((line, i) => {
      // If it's the last line of the file, do nothing
      if (line === "" && i === lines.length - 1) {
        return;
      }

      // If it has a redirect, store it, then skip writing out this line
      // as we'll write it out later when we're at the end of the front-matter
      if (line.startsWith('redirect_from:')) {
        redirect.unshift(line.split(':')[1].trim());
        return;
      }

      // If last line of front-matter, write the redirect, otherwise just
      // write the normal content of the line.
      if (line === "---" && i !== 0) {
        fileout += `redirect_from:\n${redirect.map(r => `  - ${r}\n`).join('')}---\n`;
      } else {
        fileout += line + "\n";
      }
    });

    // We've looped over every line in the file and concatenated our new file
    // So just write out the new changes to the .md file
    fs.writeFileSync(path.join(postsDirTarget, filename), fileout);

    // Now find all the icons associated with this post and rename them
    // to have the full date, i.e.
    // "facebook-2017.png" -> "facebook-2017-01-20.png"
    ['128', '256', '512', '1024'].forEach(size => {
      const oldImgName = slug + "-" + dateYear + '.png';
      const oldImgPath = path.join(imgsDir, size, oldImgName);
      
      if (fs.existsSync(oldImgPath)) {
        const newImgName = slug + "-" + date + '.png';
        const newImgPath = path.join(imgsDir, size, newImgName);
        fs.renameSync(oldImgPath, newImgPath);
      }
    });
});
```

## The End

Well, I think that’s about all I have to say on this matter. I ran my script on all three of my gallery sites and it worked perfect on each one. Fortunately, git made this process easy, as I could run my script as many times as I wanted. Each time through it would manipulate files and then I could preview the differences using git. If something wasn’t as I expected, I could just re-checkout every file in git (`git checkout -- .`), modify my script, and then try running it again. I did this however many times it took until it was rewriting my files as I expected. Using git like this made the whole process incredibly easy. In the old days before git, I could’ve seen myself doing a copy/paste of my entire project, running the node script on the file copies, and if the changes went awry, deleting the copied files and then trying again. It would’ve been a lot of copy pasting. And even when I though the script was running perfectly, I would’ve still created a copy of the original project and stored it somewhere just in case when I deployed the changes via FTP and found something wrong, I’d still have a backup. So what I learned from this process is:

1. Git is awesome.
2. URLs are UI and should be [thoughtfully designed](https://www.w3.org/Provider/Style/URI) at the beginning of a project.


