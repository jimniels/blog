#myBlog

# Markdown Sans Front Matter

The perfectionist in me won.

I changed how I format my blog posts. I’ve been testing this new format for a while and I like it so much I retroactively went through previous posts and re-formatted them too.

In this way, the purist in me has beat out the practical guy. But hey, it’s an eternal struggle. The practical guy will be back when the purist gets knocked over the head by the complexity of the real world and suddenly realizes the value of the practical guy’s argument.

---

Here’s how I format my blog posts files now: one file, named `YYYY-MM-DD-slug.md`, no front matter, a hashtag at the top of the file if I want to tag the post.

That’s it.

The perfectionist in me sees it as a “pure” markdown document. It's simple, I like it. Every time I start (or finish) a post, I don’t have to worry, “What metadata do I need to add again?”

For example: previously, for a file like `2022-08-12-my-blog-post.md`, I had to do:

```md
---
title: My Blog Post
tags:
  - html
  - css
---

Start my blog post here.
```

Now, for the same `2022-08-12-my-blog-post.md` (which you’ll note already contains the `date` and `slug` metadata) I do:

```md
#html #css

# My Blog Post

Start my blog post here.
```

One of the things I like about this is that writing document outlines just feels right.

Previously, I had to put the “post title” as metadata. This always made me think, “Wait, so is the next heading I write an `<h1>` or an `<h2>`? Because I don’t have an `<h1>` in here yet…”

```md
---
title: My Blog Post
tags:
  - html
  - css
---

Start my blog post here, but now I need a heading.

# Should this be an H1?

I mean, technically I don’t have an `<h1>` in here yet — but no, it should be an `<h2>` because the `title` in the front matter is the `<h1>`.
```

Now my markdown files feel more like they can stand on their own, almost like [a form of progressive-enhancement but for the authoring experience](https://blog.jim-nielsen.com/2022/progressively-enhanced-builds/). A blog post is self-contained to one abstraction (markdown) not two (markdown + front matter).

Now when I start a blog post, I have a blank editor staring at me and I just start writing, not worrying about the technical details I’ll have to add later.

Plus, with iA Writer being my long-time authoring tool for blog posts, I get their built-in support for tagging. This includes autosuggestions as I add tags:

<img src="https://cdn.jim-nielsen.com/blog/2022/purist-blogger-ia-writer-tags.png" width="1066" height="768" alt="Screenshot of a markdown file in iA Writer with a tag autosuggestion appearing at the top of the markdown file as a tag is added." />

And also built-in filtering in the editor itself:

<img src="https://cdn.jim-nielsen.com/blog/2022/purist-blogger-ia-writer-tag-filtering.png" width="1214" height="866" alt="Screenshot of iA Writer with a tag selected in the left sidebar and the result of options showing in the file list." />

How does it all work? The metadata I use on my blog is pulled from either the file name – `YYYY-MM-DD-slug.md` – or from the contents of the markdown itself – post title and tags. **Note the distinction**: metadata is _pulled from the document_ rather than _annotated with it_. (You can peek at [the code](https://github.com/jimniels/blog/blob/5a3f4e4c7098315bea12fe9d44d4f7ec8e787044/scripts/cache-site-data.js#L65-L94) if you want).

This lets me focus on my writing and the inherent structure of a document outline without having to worry about rigid guidelines for metadata annotation. The document is written first for a human, second for a computer (rather than the other way around). I know people would argue with me on that, but it’s how I feel for my blog. The parser pulls the metadata out of the human writing, not the human writing metadata for the parser.

The simplest example of this is the title of a blog post. Whereas something like [Stripe’s Markdoc](https://markdoc.io) suggests you write the title as metadata then template it into your document, e.g.

```
---
title: What is Markdoc?
---

# {% $markdoc.frontmatter.title %}

Markdoc is a…
```

My approach is to start with the content and do the extraction of metadata afterwards:

```
# What is Markdoc?

Markdoc is a…
```

Both can result in the same data for the build process:

```json
{
  title: "What is Markdoc?"
  contents: "<p>Markdoc is a…</p>"
}
```

I get it. This totally breaks down as documents become much more sophisticated and rich with metadata. But for my personal blog, which is a simplistic example, I try to deliberately keep the authoring experience devoid of the smallest ounce of complexity that will get in the way of _just writing_.

It’s a small detail that likely doesn’t matter to anyone else. But the purist in me now sleeps better at night.