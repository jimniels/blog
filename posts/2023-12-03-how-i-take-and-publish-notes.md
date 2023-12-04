# How I Take and Publish Notes

I publish notes at [notes.jim-nielsen.com](https://notes.jim-nielsen.com).

I’ve written about [why I made that site](https://blog.jim-nielsen.com/2023/notes-dot-jim-nielsen-dot-com/) as well as [some of my favorite aspects of its design](https://blog.jim-nielsen.com/2023/notes-on-notes/).

But I’ve yet to write about _how_ I take and publish notes to it.

The other day Bill Beckelman emailed me and told me [he made a similar site of personal notes](https://excerpts.beckelman.net/) including [details around his process](https://excerpts.beckelman.net/how/).

He asked how I take notes and I took that as the perfect opportunity to turn an answer into a blog post.

99% of the time, this is how my note-taking process goes:

- I’m catching up on my RSS feed (on my phone in [the Reeder app](https://reederapp.com))
- I read something that strikes me as interesting, novel, or insightful.
- I copy/paste it as an blockquote into a new, plain-text note in [iA writer](https://ia.net/writer).
- I copy/paste the link of the article into iA writer.
- I finish reading the article and copy/paste anything else in the article that strikes me.
- I add my own comments in the note as they pop into my head.
- I move on to the next article in my RSS feed.
- Repeat.

Because every “note” starts with me citing something somebody else said (as blockquote in markdown) and I don’t even name the file, my list of notes in iA writer starts to look like this:

<img src="https://cdn.jim-nielsen.com/blog/2023/notes-how-ia-writer.png" width="293" height="181" alt="" />

I like to let my notes sit for a couple days (or even weeks). I find that if I come back to a note and still find it interesting/insightful that means it’s worth keeping, so I put in the work of cleaning it up and publishing it.

If I come back to the note and don’t find it valuable anymore (or wondering why I ever wrote it down in the first place) I just delete the file.

I find this to be a good editorial process. Note it down in the moment, revisit it a few days/weeks later and, if it’s still “fresh”, package it up for publishing. Otherwise discard it.

“Cleaning up” a note for publishing usually[^1] means taking a markdown file that looks like this:

```md
> something somebody said

My two cents.

https://example.com/path/to/article
```

And re-formatting it as a standalone markdown file that matches the format of all my other notes. This entails revisiting the article and copy/pasting the author’s OG title, like this:

```
# [Title of article](https://example.com/path/to/article)

> something somebody said

My two cents.
```

Then I name the file by looking at the date and time on my computer, convert it to 24hr time in my head, and follow this format:

`YYYY-MM-DDTHHMM.md`

For example:

`2023-11-30T2129.md`

Then I drag the file in iA writer to my pinned “notes” folder. This is the git-backed folder of all my notes on my laptop. From here, I push the new note to GitHub, Netlify picks it up and — a minute or two later — the note is live on my site.

That’s it. That’s how I take and publish notes.

FWIW: if you want the technical details around how a plain-text `.md` file gets turned into a web site then you can go check out [the code, it’s on GitHub](https://github.com/jimniels/notes).

[^1]: Sometimes I’ll come back to a note and have a lot more commentary to add — or a lot of commentary to edit — and if my words starts to outnumber the quote I wrote down in the fist place, then my note usually ends up as a blog post.