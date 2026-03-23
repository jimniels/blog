#myNotesSite

# More Details Than You Probably Wanted to Know About Recent Updates to My Notes Site

I shipped some updates to [my notes site](https://notes.jim-nielsen.com). Nothing huge. Just small stuff.

But what is big stuff except a bunch of small stuff combined? So small stuff is important too.

What follows is a bunch of tiny details you probably don’t care about, but they were all decisions I had to make and account for along the way to shipping.

For me, the small details are the fun part!

## Each Post Now Has Its Own URL

The site used to consist of a single, giant HTML page with every note ever. For feeds and linking purposes, I would link to individual posts by anchor linking somewhere in that giant HTML document, e.g.

https://notes.jim-nielsen.com/#2026-03-09T2305

That worked fine, but as my notes page was getting bigger and bigger, it seemed like a waste to load _everything_ when all I wanted to do was link to a single note.

So I changed things. Now every note now gets its own individual page, e.g.

https://notes.jim-nielsen.com/n/2026-03-09-2305/

### You Might Have Noticed: I Changed the Note’s Identifier

Whenever I create a note, I name it based on the date/time of publishing, e.g.

`2026-03-09T2305.md`

That is what turns into the fragment identifier when deep linking to the note, e.g.

`/#2026-03-09T2305`

Initially, I was going to just translate those IDs to paths, e.g.

`/#2026-03-09T2305` -> `/n/2026-03-09T2305/`

And while it seems fragment identifiers are supposed to be case-sensitive, in testing I was seeing Safari sometimes change the `T` to a `t` in the URL bar, e.g.

`/#2026-03-09T2305` -> `/n/2026-03-09t2305`

Which _really_ irked me.

Which got me thinking more about those identifiers, to the point where I decided to change them.

Which is why you the fragment identifier for old posts will now redirect to new post pages with a slightly tweaked identifier:

`/#2026-03-09T2305` -> `/n/2026-03-09-2305/`

I pulled the `T` and swapped it with a hyphen `-` so now the format for my markdown posts is:

`YYYY-MM-DD-HHmm.md`

Which ends up with permalinks to:

`/n/YYYY-MM-DD-HHmm/`

Too much info, I know, but I agonized over the right format here for my URLs because I don’t want to change it in the future.

I like where I landed.

### But Wait! What About Redirects?

If you’re gonna change old URLs, you gotta have redirects to the new URLs — right? (Yes — if you want to be [cool]([cool](https://www.w3.org/Provider/Style/URI)).)

But there’s no way to read fragment identifiers and handle redirects on the server (I’m on Netlify), so I had to handle redirects on the client.

I did this by sticking a render-block `<script>` in the head of my document, that way the browser looks to see if it should redirect really early when loading the root document. Something like:

```html
<!-- root HTML page -->
<head>
<script>
if (window.location.hash) {
  const hash = window.location.hash.trim();
  // Look for /#YYYY-MM-DDTHHmm
  const match = hash.match(/^#(\d{4}-\d{2}-\d{2})T(\d{4})$/);
  // If you find it, redirect to /n/YYYY-MM-DD-HHmm
  if (match) {
    const href = "/n/" + match[1] + "-" + match[2] + "/";
    location.replace(href);
  }
}
</script>
<!-- if no redirect happened (because no fragment is present) 
     continue rendering the rest of the doc -->
</head>
```

### But Wait! How To Roll Out These Changes?

There’s one problem here: if I change all the identifiers for my old posts to match how I’m going to do my new posts, that would mess up my feed, e.g.

```xml
<!-- <item> entry based on old post ID -->
<guid isPermaLink="false">2026-03-19T2330</guid>

<!-- same <item> entry but with new post ID -->
<guid isPermaLink="false">2026-03-19-2330</guid>
```

This is a big deal (to me) because it would make a bunch of my most recent posts show up twice in people’s feed readers.

So, to avoid this issue, I maintained support for the old IDs in my code alongside the new IDs. 

```xml
<!-- all old post before my changes -->
<guid isPermaLink="false">2026-03-19T2330</guid>

<!-- all new posts after my changes -->
<guid isPermaLink="false">2026-03-20-1221</guid>
```

Once my feed fills up with posts that use the new identifiers, I'll pull support in the code for the old format and rename all my old posts to follow the new identifier style.

Oh, and by the way, this was super easy to test with [Web Origami](https://weborigami.org). I simply run a build locally and then use the `Dev.changes` tool to diff the currently-in-prod version of my feed against the new-locally-built one:

```
ori Dev.changes https://notes.jim-nielsen.com/feed.json, build/feed.json
```

Boom, no duplicate posts! You’re welcome feed readers.

## Shuffle Functionality

I also added the ability to “shuffle” between posts. This is mostly for myself. I like to randomly jump through notes I’ve published in the past for reoccurring inspiration.

I didn’t want a server-side solution for this (e.g. a `/shuffle/` route) because it would require a host-specific solution (like Netlify’s edge functions).

I figured it would be easier — and more resilient over time, in case I have to change hosts or my host’s API changes — to make this a client-side enhancement.

So it’s implemented as a `<a>` tag. If JS is present, it’ll stick a random `href` value in there. The code looks something like this:

```html
<a href="#" id="shuffle">...</a>
<script>
const postsIds = /* array of IDs generated by my SSG */;

// Randomly select one
const randomPostId = postsIds[
  Math.floor(Math.random() * postsIds.length)
];

// Set the href
const $a = document.querySelector("#shuffle");
if ($a) $a.href = `/n/${randomPostId}/`;
</script>
```

I thought about implementing this in my SSG, so each time I regenerate my site, it generates each new page with a random shuffle link. But there are build/deployment performance issues with that (file fingerprints change even on content-only deployments because of the inherent randomness), so this felt like a set of trade-offs I could be happy about.

## The End

That’s it. Way more than you probably ever wanted to know about a really small release of changes to my notes site.

Does anybody even care about stuff like this anymore? AI could’ve just generated all of this in no time by my saying “I want a new route for each individual post” — right?

Probably. But there were a lot of small details to work through and get right. I don’t trust AI to get the details right. Not yet. Plus, I enjoy the details. It’s the part so many people skip over so there’s lots of esoteric fun to be had in that area.

If you’re not already, [go subscribe](https://notes.jim-nielsen.com/feed.json) because — as you can see — I take care of my subscribes. Or at least I try to :)
