# Social Share Imagery via a Data Attribute

I’ve done something few on the internet do. I’ve changed my mind.

<img data-og-image src="https://cdn.jim-nielsen.com/blog/2025/social-share-meme.jpg" width="332" height="250" alt="Double take meme of girl with a disgusted face on one side then the same girl with a face of changed opinion. Both faces have the text “og:image” superimposed." />

[A](https://blog.jim-nielsen.com/2025/rip-browsers/) [few](https://blog.jim-nielsen.com/2025/npm-risks/) [posts](https://blog.jim-nielsen.com/2025/my-antis/) on my blog have started to unfurl social share imagery.

<img src="https://cdn.jim-nielsen.com/blog/2025/social-share-preview.png" width="543" height="601" alt="Screenshot of a post from @jimniels@mastodon.social showing a link to blog.jim-nielsen.com and an accompanying og:image preview." />

You might be wondering, “Wait Jim I thought you hated those things?”

It’s not that I hate social share imagery. I just think…well, [I’ve shared my thoughts before](https://blog.jim-nielsen.com/2021/quibbles-with-social-share-imagery/) (even made [a game](https://blog.jim-nielsen.com/2024/omgimg/)) so I won’t get on my soapbox.

But I think these “previews” have their place and, when used as a preview — i.e. an opportunity to graphically depict a brief portion of the actual, underlying content — these function well _in service of readers_.

For example, I often write posts that have zero images in them. They’re pure text. I don’t burden myself with the obligation to generate a graphical preview of the ideas contained in those posts.

But, sometimes, I create posts that have [lots of imagery in them](https://blog.jim-nielsen.com/2025/mac-app-flea-market/), or even just [a good meme-like photo](https://blog.jim-nielsen.com/2025/casing-on-the-web/) and it feels like a shame to _not_ surface that imagery in some way.

So, in service of that pursuit, I set out to resolve how I could do [og:images](https://ogp.me) in my posts.

It’s not as easy as “just stick it your front-matter” because [my markdown files don’t use front-matter](https://blog.jim-nielsen.com/2022/markdown-sans-front-matter/). And I didn’t want to “just add front-matter”. I have my own idiosyncratic way of writing markdown for my blog, which means I need my own idiosyncratic way of denoting “this post has an og:image and here’s the URL”.

After giving it some thought, I realized that all my images are expressed in markdown as HTML (this lets me easily add attributes like `alt`, `width`, and `height`) so if I wanted to mark one of my images as the “preview” image for a post, I could  just add a special data attribute like so:

```md
You guys, I made the funniest image to depict this:

<img data-og-image src="" width="" height="" alt="">

Isn’t that hilarious?
```

Then my markdown processor can extract that piece of meta information and surface it to each post template, essentially like this:

```html
<html>
  <title>{post.title}</title>
  {post.ogimage &&
    <meta property="og:image" content={post.ogimage}>}
  <body>
    <h1>{post.title}</h1>
    {post.content}
```

I love this because it allows me to leverage existing mechanisms in both the authoring and development processes (data attributes in HTML that become metadata on the `post` object), without needing to introduce an entirely new method of expression (e.g. front-matter).

It also feels good because:

1. **It’s good for me**. It doesn’t require any additional work on my part. I don’t have to create additional images for my posts. I’m merely marking images I’ve already created — which were done in service of a post’s content — as “previews” for the post.
2. **It’s good for users**. Readers of my site get image previews that are actually, well, previews — e.g. a graphical representation that will contextually reappear in the post, (as opposed to an image template whose contents do nothing to provide an advanced graphical preview of what’s to follow in the post itself).

It’s technology in service of content, rather than content in service of technology.

Or at least that’s what I like to tell myself :)