#netlify

# Netlify Public Folder, Part IV: Simplification with macOS Shortcuts

After about three years of using my [Netlify Public Folder](https://blog.jim-nielsen.com/2019/netlify-public-folder-part-i-what/), I’m here to give an update.

Given how fast technology moves, it’s probably no surprise to hear that the tech stack of my [original solution](https://blog.jim-nielsen.com/2019/netlify-public-folder-part-iii-how/) is already falling out of date. I have:

- BitBar, which depends on
- a custom script, which depends on
- the Netlify node.js client, which depends on
- node.js.

BitBar has since been “rebooted” and is now called [xbar](https://xbarapp.com) (there’s also an alternative called [SwiftBar](https://github.com/swiftbar/SwiftBar)). Additionally, the Netlify node.js client (at the time of this writing) is on major version 11. However, some of the functionality I was using in my custom script was pegged to APIs deprecated back around versions 3 or 4 (so I’ve been using an old version of the Netlify node.js client 🤫).

Relatedly, [I’ve been playing](https://blog.jim-nielsen.com/2022/automate-public-folder-workflow/) with some of the more integrated automation features of macOS available in the Shortcuts app. In doing so, the thought hit me: why not simply my Netlify Public Folder stack? After years of usage, what I really want is a quickly-accessible button in the menubar which fires off syncing my local folder to Netlify’s CDN — and that’s it.

In light of these new, simplified needs, the thought hit me: why not create a macOS shortcut that runs a shell script and does the sync? That would simplify my tech stack down to:

- the Netlify CLI, which depends on
- node.js.

And macOS shortcuts already has the ability to pin shortcuts for quick availability and execution in the menu bar.

<img src="https://cdn.jim-nielsen.com/blog/2022/netlify-public-iv-macos-menubar.png" width="359" height="151" alt="Screenshot of the Shortcuts app menu bar in macOS, with a “Sync Netlify CDN” command active." />

You can even sit and watch your Shortcut run to completion if you want.

<img src="https://cdn.jim-nielsen.com/blog/2022/netlify-public-iv-macos-menubar-syncing.png" width="360" height="145" alt="Screenshot of the Shortcuts app menu bar in macOS, with a “Sync Netlify CDN” command actively running." />

The beauty is, [the Netlify CLI](https://cli.netlify.com/) tool has a `deploy` command, so syncing a local folder to a remote site is a one-liner (or multiple lines for readability’s sake). Here’s what my deploy command looks like (sensitive info removed):

```sh
# Source $PATH so you know where node is
source ~/.zshrc

# Then run the netlify-cli command
netlify deploy \
  --dir ~/path/to/folder \
  --site your-site.netlify.com \
  --auth YOUR_TOKEN_HERE \
  --message "Deploy from macOS shortcut" \
  --prod
```

You can take that command, create a new Shortcut in macOS, add an action to run a shell script, paste the command in the script box, and boom! You’ve got a macOS Shortcut you can run to sync a local folder to a public-facing site on Netlify’s CDN.

<img src="https://cdn.jim-nielsen.com/blog/2022/netlify-public-iv-macos-shotrcuts.png" width="916" height="541" alt="Screenshot of a Shortcut in macOS running a shell script to sync a local folder to Netlify using the netlify CLI command." />

Of note: the shell run by Shortcuts has to know where to find the `netlify` executable (as well as the `node` executable it depends on), so you have to make sure that info is in your $PATH variable (I think I explained this right, but smarter people than me [helped me figure it out](https://twitter.com/jimniels/status/1521684089400668161) — if you’re a shell expert, you probably know what you’re doing).

I really like where I am now with this script. Fewer dependencies to maintain over time but an equivalent solution for my needs.

Three cheers for my Netlify Public Folder: sync a local folder of files to a global CDN with two clicks! Hip, hip, hooray!