---
tags: theMoreYouKnow
---

# Reverse Domain Name Notation

Go ahead and file this one under “can’t believe I’ve been in tech this long and only now am learning this.”

You’ve probably seen it before, especially if you own a Mac.

Those directories full of files whose names start with `com.*`.

Look familiar?

<img src="https://cdn.jim-nielsen.com/blog/2021/reverse-dns-syntax.png" alt="Screenshot of a folder of files on Mac with reverse DNS naming." width="253" height="379" />

I never knew what those files were or why they were named that way.

But it never bothered me enough to ask or find out.

Then one day I was watching a YouTube video on creating apps in Xcode. 

When prompted for a name following a syntax such as `com.thing.name.bundle`, the narrator said “this is reverse-DNS syntax.”

🤯

So that’s what that is!? `com.adobe.service.plist` is, in essence, just a domain name backwards? 

I honestly never saw that.

And now the whole world makes sense.

From [Wikipedia](https://en.wikipedia.org/wiki/Reverse_domain_name_notation):

> Reverse domain name notation (or reverse-DNS) is a naming convention for components, packages, types or file names used by a programming language, system or framework

The syntax is useful because the ordering of the named components gets reversed, surfacing the logical groupings inherent in the designed structure of DNS.

For example, imagine a bunch of my web properties in a list sorted alphabetically:

- blog.jim-nielsen.com
- gimmiedaticon.jim-nielsen.com
- sassme.jim-nielsen.com
- www.iosicongallery.com
- www.jim-nielsen.com
- www.macosicongallery.com
- www.watchosicongallery.com

There’s no discernible meaning to this list of items.

However, there is an inherent grouping to these names since they originate from the domain name system.

If we rename these to follow the reverse-DNS notation and sort them alphabetically, the groupings surface:

- com.jim-nielsen.blog
- com.jim-nielsen.gimmiedaticon
- com.jim-nielsen.sassme
- com.jim-nielsen.www
- com.iosicongallery.www
- com.watchosicongallery.www
- com.macosicongallery.www

Now everything in the world makes sense.

Again, surprising I didn’t know this until now.