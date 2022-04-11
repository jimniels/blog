#netlify #myBlog

# Automating My Netlify “Public Folder” Workflow With macOS Shortcuts

I’ve written before about [my process for managing images](https://blog.jim-nielsen.com/2019/netlify-public-folder-part-i-what/) on my blog (and other websites).

In short: I put files in a select, local folder, that folder syncs to a site on Netlify, and all its contents become instantly available on a global CDN.

For example, imagine I have the following folder structure:

```
.
├── blog/
│   └── screenshot.png
├── other/
│   └── screenshot.png
└── some-image.jpg
```

That folder’s contents sync to a site on Netlify hosted at a particular domain, in my case: `cdn.jim-nielsen.com`. Once synced, every one of those files becomes available at a path matching the structure of that folder, i.e.

```
cdn.jim-nielsen.com/blog/screenshot.png
cdn.jim-nielsen.com/other/screenshot.png
cdn.jim-nielsen.com/blog/some-image.jpg
```

Like any workflow, this has its benefits and drawbacks. But it has served me well for a few years now.

Recently the idea struck me: why not add a contextual menu item when you right click in the Finder to copy the public URL of any file in this folder?

<img src="https://cdn.jim-nielsen.com/blog/2022/shortcuts-automation-context-menu.png" width="528" height="556" alt="Screenshot of a right-click menu in macOS with a “Copy CDN URL” menu option." />

The logic is pretty simple:

- Get the path of the selected file on disk
    - `/Users/Me/Dropbox/cdn-folder/image.jpg`
- Replace the local folder’s path with the CDN URL
    - Replace `/Users/Me/Dropbox/cdn-folder`
    - With `https://cdn.jim-nielsen.com`
- Copy the URL to the clipboard
    - `https://cdn.jim-nielsen.com/image.jpg`

I’m not good with Automator, but I’d always wanted to try Apple’s new [Shortcuts for iOS/macOS](https://support.apple.com/guide/shortcuts). After some finagling, I had what a wanted.

<img src="https://cdn.jim-nielsen.com/blog/2022/shortcuts-automation-copy-cdn-url-screenshot.png" width="924" height="551" alt="Screenshot of the Shortcuts app on macOS with a string of workflow actions showing how to take a file on disk as an input and output a public-facing URL for that image." />

Now I drop a file into my local folder, it syncs to Netlify, and a quick command from Finder copies that file’s public URL to my clipboard!

<img src="https://cdn.jim-nielsen.com/blog/2022/shortcuts-automation-finder-shortcuts-browser.png" width="1200" height="763" alt="Screenshot of three apps on macOS: 1) Finder, 2) Shortcuts, and 3) Safari. Text is overlaid on the image to show the connection between each app in copying the path of a file on disk to a public-facing URL in the browser." />

I even took this one step further: I created an action that would not only derive the public URL of a file in my local CDN folder, but it would also retrieve the image’s width and height, divide those values in half (since all my images are optimized for @2x display), and copy the markup for an image  with the proper `src`, `width`, and `height` attributes to the clipboard.

This shortcut is more complex, but the logic at play is pretty straightforward. Honestly, I don't know if I’m doing this right in Shortcuts but it works. [Sidenote: trying to Google what you want to do by using the keyword “Shortcuts app” is pretty terrible, as the name is quite generic.] Here’s an example screenshot of my action:

<img src="https://cdn.jim-nielsen.com/blog/2022/shortcuts-automation-get-img-markup.png" width="450" height="660" alt="Screenshot of a large number of stacked actions in the Shortcuts app on macOS which are required to generate the img tag markup for a given file." />

Overall, this makes writing blog posts in markdown with images even more automated for my current workflow:

1. Put an image my local CDN folder (it syncs to Netlify)
2. Choose “Copy img markup" from actions menu
3. Paste markup in a text file

<img src="https://cdn.jim-nielsen.com/blog/2022/shortcuts-automation-ia-writer-screenshot.png" width="1422" height="878" alt="Screenshot of iA Writer and Finder on macOS with text and arrows overlaying the screen, showing one can generate the markup for an img tag from a file in the Finder." />

Sure, it’s a bit convoluted. But it works for me.

The idea is as old as FTP but still useful: every file in a local folder syncs to a server with a public-facing URL. With this, every file’s public-facing URL is copy/paste-able via a Finder integration.