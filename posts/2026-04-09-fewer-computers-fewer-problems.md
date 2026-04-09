#myNotesSite

# Fewer Computers, Fewer Problems: Going Local With Builds & Deployments

[Me, in 2025, on Mastodon](https://mastodon.social/@jimniels/113782973510218163):

> I love tools like Netlify and deploying my small personal sites with `git push`
>
> But i'm not gonna lie, 2025 might be the year I go back to just doing builds locally and pushing the deploys from my computer.
>
> I'm sick of devops'ing stupid stuff because builds work on my machine and I have to spend that extra bit of time to ensure they also work on remote linux computers.
>
> Not sure I need the infrastructure of giant teams working together for making a small personal website.

It’s 2026 now, but I finally took my first steps towards this.

## The Why

One of the ideas I really love around the “local-first” movement is this notion that everything canonical is done locally, then remote “sync” is an enhancement.

For my personal website, I want builds and deployments to work that way.

All data, build tooling, deployment, etc., happens first and foremost on my machine.

From there, having another server somewhere else do it is purely a “progressive enhancement”. If it were to fail, fine. I can resort back to doing it locally _very easily_ because all the tooling is optimized for local build and deployment first (rather than being dependent on fixing some remote server to get  builds and deployments working).

It’s amazing how many of my problems come from [the struggle to get one thing to work identically across multiple computers](https://blog.jim-nielsen.com/2025/multiple-computers/).

I want to explore a solution that removes the cause of my problem, rather than trying to stabilize it with more time and code.

“The first rule of distributed computing is don’t distribute your computing unless you absolutely have to” — especially if you’re just building personal websites.

## The What

So I un-did stuff I previously did (that’r right, my current predicament is self-inflicted — imagine that).

[My notes site](https://notes.jim-nielsen.com) used to work [like this](https://blog.jim-nielsen.com/2024/notes-site-via-content-in-dropbox/):

- Content lives in Dropbox
- Code is on GitHub
- Netlify’s servers pull both, then run a build and deploy the site

It worked, but sporadically. Sometimes it would fail, then start working again, all without me changing anything. And when it did work, it often would take a long time — like five, six minutes to run a build/deployment.

I never could figure out the issue. Some combination of Netlify’s servers (which I don’t control and don’t have full visibility into) talking to Dropbox’s servers (which I also don’t control and don’t have full visibility into).

I got sick of trying to make a simple (but distributed) build process [work across multiple computers](https://blog.jim-nielsen.com/2025/multiple-computers/) when 99% of the time, I really only need it to work on one computer.

So I turned off builds in Netlify, and made it so my primary, local computer does all the work. Here are the trade-offs:

- **What I lose**: I can no longer make edits to notes, then build/deploy the site from my phone or tablet.
- **What I gain**: I don’t have to troubleshoot build issues on machines I don’t own or control. Now, if it “works on my machine”, it works period.

## The How

The change was pretty simple.

First, I turned off builds in Netlify. Now when I `git push` Netlify does nothing.

Next, I changed my build process to stop pulling markdown notes from the Dropbox API and instead pull them from a local folder on my computer. Simple, fast. 

And lastly, as a measure to protect myself from myself, I cloned the codebase for my notes to a second location on my computer. This way I have a “working copy” version of my site where I do local development, and I have a clean “production copy” of my site which is where I build/deploy from. This helps ensure I don’t accidentally build and deploy my “working copy” which I often leave in a weird, half-finished state.

In my `package.json` I have a `deploy` command that looks like this:

```sh
git pull && npm ci && netlify deploy --build --prod
```

That’s what I run from my “clean” copy. It pulls down any new changes, makes sure I have the latest deps, builds the site, then lets Netlify’s CLI deploy it.

As extra credit, I created a macOS shortcut

```sh
# So it knows where to get the right $PATH to node
source ~/.zshrc

# Then switch to my dir and run the command
cd ~/Sites/com.jim-nielsen.notes/
npm run deploy
```

So I can do `CMD + Space`, type “Deploy notes.jim-nielsen.com” to trigger a build, then watch the little shortcut run to completion in my Mac’s menubar.

I’ve been living with this setup for a few weeks now and it has worked beautifully. Best part is: I’ve never had to open up Netlify’s website to check the status of a build or troubleshoot a deployment.

That’s an enhancement I can have later — if I want to.