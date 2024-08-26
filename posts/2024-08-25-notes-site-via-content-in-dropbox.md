#myNotesSite

# New Workflow for Publishing Notes: Content in Dropbox, Code in GitHub

I recently changed my workflow around authoring and publishing my site [notes.jim-nielsen.com](https://notes.jim-nielsen.com). Here’s the rundown.

## Before

Pretty standard JAMstack type stuff. All my notes are markdown files in a git repository that live alongside the code generating the website, e.g.

```
package.json
notes/
  note1.md
  note2.md
  note3.md
src/
  index.js
  styles.css
```

I author new notes in [iA Writer](https://ia.net/writer). When I want to publish them, I move the file to my git repo, commit, and push to Netlify which builds and deploys the site.

This works fine, but I’ve never loved that the content and code for the site live in the same git repository, which requires a git tool for pushing new content or updates (much more cumbersome on a mobile device).

## Now

All my notes are markdown files in Dropbox. I author them using iA Writer and Dropbox takes care of syncing everything.

When I want a new deploy of my site, I use [a Shortcut that does a POST to a Netlify webhook](https://blog.jim-nielsen.com/2024/deploying-with-netlify-shortcuts/) and triggers a build/deploy.

Netlify runs my build process which, as part of the build, reaches out to Dropbox and gets a copy of all my markdown files, then processes them and turns them into a website.

Perhaps a diagram is worth a thousand words:

<img src="https://cdn.jim-nielsen.com/blog/2024/notes-dropbox-netlify-diagram.png" width="1058" height="594" alt="Diagram showing iA writer saves files to Dropbox, and running a Shortcut triggers a build in Netlify which pulls files from Dropbox (and code from GitHub) and produces my notes website." />

I really like this workflow for a few reasons:

- Content and code are separate. My git repository holds the code and I edit that with VSCode, while my markdown files are just plain-text files on disk and I edit those with my favorite writing app iA Writer.
- I can easily make spelling corrections or publish a quick post from any device. iA Writer + Dropbox are available as apps on mobile, and the Shortcuts app can run from any Apple device.
- I like to forever tweak my workflow and tools. Sue me.

It’s worth noting that under the hood I changed my build tool from Metalsmith to [Web Origami](https://weborigami.org): a fascinating tool for building small/medium websites from [Jan Miksovsky](https://jan.miksovsky.com). I want to write more about why I like this tool — especially the Dropbox integration piece — but I’ll have to save that for another post. If you want to poke around, [the code is on GitHub](https://github.com/jimniels/notes/tree/dcb3b0dcdc7e322a37ac917d791d604c95454311).