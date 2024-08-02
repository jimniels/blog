#myNotesSite

# Deploying on Netlify with Apple’s Shortcuts

Just a quick note on a personal workflow thing.

I’ve written before about [the many different ways I host my personal websites on Netlify](https://blog.jim-nielsen.com/tags#netlify).

I’ve got a few websites that aren’t the traditional model of: commit to git, push, build triggers on Netlify, website goes live.

Sometimes I want to manually trigger a site deploy — but I’m lazy and don’t want to open a browser, go to netlify.com, find my site in the UI, find the button to trigger a deploy, etc.

To make it easier, I’ve setup [build hooks](https://docs.netlify.com/configure-builds/build-hooks/) for the sites where I want to manually trigger deploys. These give me a URL to which I can send a POST request that will trigger a build, e.g

```
curl -X POST -d '{}' https://api.netlify.com/build_hooks/MY_BUILD_HOOK_URL_HERE
```

Using Apple’s Shortcuts app, I can create a shortcut that sends a POST request to my build hook URL.

<img src="https://cdn.jim-nielsen.com/blog/2024/netlify-deploy-shortcuts-tutorial.png" width="875" height="592" alt="Screenshot of the macOS shortcuts app with arrows indicating which shortcut to choose and how to change the request method to a POST" />

It’s a super simple shortcut, and I can create as many of these as I want and they should last for...well, as long as I have an account with Netlify.

<img src="https://cdn.jim-nielsen.com/blog/2024/netlify-deploy-shortcuts.png" width="862" height="512" alt="Screenshot of my Netlify deploy shortcut in the macOS app." />

And I can access these shortcuts from anywhere on any of my devices. On my Mac, Raycast indexes them so I have quick, easy access to them from the command bar.

<img src="https://cdn.jim-nielsen.com/blog/2024/netlify-deploy-raycast.png" width="777" height="218" alt="" />

I can access them equally as easily on my iPhone, which makes triggering a build on mobile super simple.

Why would I do this? I have my reasons. I’ll have to write about those later.
