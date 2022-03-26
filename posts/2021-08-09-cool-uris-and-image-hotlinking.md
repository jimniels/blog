#html

# Cool URIs and Image Hotlinking

I try to keep my URLs [cool](https://www.w3.org/Provider/Style/URI). If they must change, I leverage redirects. This helps prevent linkrot and feels like I’m doing my small part to be a tidy citizen of the web. 

I try to preserve URLs for resources I publicly link to (i.e. an HTML document) but not for resources I reference “under the hood” (i.e. stylesheets, scripts, images).

For example, let’s say I have URL I link to publicly. It serves an HTML document:

`https://myblog.com/posts/my-opinion/`

I try incredibly hard to keep that URL immutable.

But I consider many resources referenced _within_ that document to be private and subject to change at my discretion.

For example, I might refactor a project’s structure and, as part of that process, change the location of assets “under the hood”.

```html
<!--
    Before
    (URL: /posts/my-opinion)
-->
<link href="/styles.css" rel="stylesheet">
<img src="/images/my-image.jpg">
<script src="/scripts.js"></script>

<!--
    After
    (URL: /posts/my-opinion)
-->
<link href="/assets/styles/index.css" rel="stylesheet">
<img src="/assets/images/my-image.jpg">
<script src="/assets/scripts/index.js"></script>
```

URLs I reference publicly, i.e. you can follow them by clicking on an `<a>` tag on a page, are a public-facing commitment. I promise to keep those around and unchanged.

However, URLs I reference privately, i.e. you’d have to open the developer tools to see which resources are being downloaded, are subject to change on a whim. I make no guarantees as to their availability over time. 

Which brings me to [hotlinking](https://simple.wikipedia.org/wiki/Hotlinking): directly referencing a resource hosted by someone else.

There was [a story going around](https://twitter.com/veltman/status/1359204870264262657?s=21) a little while back about a random Wikimedia flower photo that was getting 90+ million requests a day because somebody copy/pasted code into a popular mobile app which hotlinked the image.

A similar thing happens to me with my [icon](https://www.iosicongallery.com) [gallery](https://www.macosicongallery.com) [sites](https://www.watchosicongallery.com). All of the icons in my gallery are hosted on a domain through Netlify. The top three referring sources for that domain are:

1. At ~1 million referrals, my site: iosicongallery.com
2. At ~1 million referrals, my site: macosicongallery.com
3. At ~1/2 million referrals, ~~my site watchosicongallery.com~~ some random website, primetuition.lk

<img src="https://cdn.jim-nielsen.com/blog/2021/hotlinking-netlify-sources.png" width="579" height="460" alt="" /> 

As you can see from my analytics, I’ve got a number of sites summing to  ~1 million hits in a 30 day period and I don’t even know who they are. Apparently I am graciously hosting their traffic needs.

A cursory investigation of these domains provides some easy answers: a Facebook icon is being hotlinked in one website’s header.

<img src="https://cdn.jim-nielsen.com/blog/2021/hotlinking-ismhybrid.png" width="1112" height="845" alt="" /> 

I can guess at an explanation here: somebody did a Google image search for “facebook icon”, found my site in the results, and copy/pasted the image URL in their HTML. (It’s the 512px version nonetheless, even though it’s only being rendered at 32px!!)

Other sites’ usage of my bandwidth isn’t so easy to decipher. Visiting a particular domain might redirect me to another domain with a paywall. It’s not always easy to find clues as to why or how someone is hotlinking to images from my galleries.

I’ve never publicly authored URLs for the icons in my gallery—you have to dig into the source HTML to find them. As such, I don’t feel bad changing them. If you link to something I’ve referenced privately (i.e. not as a public `<a>` link) and all the sudden the URL breaks, that’s on you.

In fact, given the amount of bandwidth it takes to host other people’s image needs, a revolving schedule of URL changes for images in my gallery might be a good idea. Netlify graciously hosts my icon gallery sites for me, but if I was paying for this bandwidth myself, I might consider deliberately changing URLs so as to intentionally break other people’s unsanctioned use of my bandwidth.

Perhaps some might say that kind of deliberate breaking of URLs isn’t [cool](https://www.w3.org/Provider/Style/URI) but I feel it falls within my purview and remains a solid interpretation of the spirit of cool URIs.
