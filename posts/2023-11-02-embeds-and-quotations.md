# Embeds and Quotations in Writing

Chris wrote [“0 KB Social Media Embeds”](https://chriscoyier.net/2023/11/01/0-kb-social-media-embeds/) and it got me thinking about my own approach to embeds and quotations in my writing.

_A lot_ of my blogging is quoting other people. 

I remember debating the use of social embeds on my blog because I quoted a lot of things on Twitter. 

But I also quoted a lot of things from blogs, and blogs don’t have special embeds. There’s no `<iframe src=chriscoyier.net><script>`. So why should social sites get different treatment?

That’s when I decided to try and be more systematically coherent with how I quote other writing.

At first, I wanted to use a pattern similar to what Chris uses in his post of `<blockquote>` with `<cite>`.

```html
<blockquote>
  <p>Something really insightful.</p>
  <cite><a href="">Jane Doe on her blog</a></cite>
</blockquote>
```

However, I was using markdown and lazy old me didn’t want to write HTML every time I quoted someone. So instead changing how I write my markup, I changed the way I write my prose.

In essence, I fell back to what my college writing professor told us we should do: preface what somebody said in your own words, then quote them. This landed me on an approach that uses `<a>` with `<blockquote>` because that’s easy in markdown. 

```md
[On her blog, Jane Doe](LINK) said something insightful:

> Something really insightful.
```

Which outputs as:

```html
<p><a href>On her blog, Jane Doe</a> said something insightful:</p>
<blockquote><p>Something really insightful.</p></blockquote>
```

But really it doesn’t even have to be a `<blockquote>`. It could all be inline in a paragraph.

```md
[On her blog, Jane Doe](LINK) said something really insightful: “Something really insightful.”
```

Which outputs:

```html
<p><a href="">On her blog, Jane Doe</a> said something insightful: “Something really insightful.”</p>
```

That’s the beauty of the web: you get a paragraph of text (like a book) but then you also get an interactive hyperlink to the source.

An “embed” could be as simple as text in quotes with a link.

It’s simple, understandable, 0kb, and will last forever. Plus, as Chris points out, you can absorb it without the social influence of how many likes it got.