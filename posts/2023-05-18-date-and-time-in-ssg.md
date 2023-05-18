# Date and Time with a Static Site Generator

Do you have a static site generator?

If so, how do you handle the date _and time_ for when your posts are published?

For me, I record the publish date once: in the filename (e.g. `2023-05-16-my-slug.md`). That YYYY-MM-DD string in the filename is the canonical location for my posts’ publish date.

Now that date is fuzzy because, you know, timezones. If somebody looks at one of my blog posts and it says, “Published 2023-05-16” what does that mean? Is that today? Or yesterday? Well, it depends on where _and when_ in the world you’re looking at that post. “2023-05-16” in Denver is not the same as “2023-05-16” in Melbourne.

But for my personal website, that’s ok. I don’t worry about storing and presenting the date with an incredible level of precision. It’s really not necessary for my website.

However, it is a problem for my _feeds_.

My feeds ([RSS](/feed.xml) and [JSON](/feed.json)) want more precision. They want date, time, and timezone. JSON feed wants [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339), e.g. `2002-11-07T00:00:01Z`, while RSS wants [RFC 822](https://datatracker.ietf.org/doc/html/rfc822), e.g. `Sat, 07 Sep 2002 00:00:01 GMT`.

This presents a problem for me because I don’t store the time and timezone offset in my date metadata. And if I don’t put _something_ for time in my feeds, they’ll be invalid.

Now I’m lazy. I don’t want to store the time and timezone metadata in my file names (plus, before I even understood timezones in computers, I was blogging and didn’t historically record this information). So, instead I programmatically set the time for all my posts to the exact same time upon every build: noon my time (MST)[^1].

In other words, I take the date from each post’s file name and hardcode the time to noon MST (UTC-7):

```
// Given a filename like `2023-05-16-my-slug.md`
const dateFromFile = filename.slice(0, 10);
const date = new Date(dateFromFile + "T19:00:00Z");
```

Now this approach has its own quirks. For example, if it’s 1AM MST and I publish a post on that day, technically its publish time is going to show up as being in the future for anyone who accesses that post in their feeds before 12PM MST that day. But whatever, I’m fine with that.

I am kind of curious how other people handle this? Given the prevalence of `YYYY-MM-DD-slug.md` as a naming scheme for files (thanks Jekyll, I believe) how are people getting the _time_ into their feeds made by a static site generator? 

I’m guessing most people have `date` in their front matter as a datetime string (in addition to the file name) and that’s where that info gets pulled from?

```
title: My Post
date: 2023-05-12T12.31.00Z
```

Or maybe people just don’t even realize this discrepancy exists in their blogging setup? I know I didn’t for a while. And that’s fine. Computers are pedantic about this kind of stuff so sometimes ignorance is bliss. Hopefully this posts doesn’t burst your ignorance bubble too much :)

[^1]: I know, I know. When I say “my time” that’s a relative term. I’ve lived in different timezones through the years so the definition of “noon” my time has changed through the years. When I lived in EST in 2013 and published a post at “noon my time” that was different than when I published a post last week at “noon my time” in MST. But, again, I’m just trying to get the computer to not throw validation errors at my feeds and this makes the computer satisfied.