---
tags: netlify engineering iconGalleries
---

# Deploying a (Wannbe) Monorepo in Netlify

For a long time, I’ve had my [icon](https://www.iosicongallery.com) [gallery](https://www.macosicongallery.com) [sites](https://www.watchosicongallery.com) setup as three distinct repos in Github. The public-facing sites are (essentially) identical but the content for each site is different.

To accommodate this kind of structure, each site’s repo contains the contents of its respective site while the actual templates, code, etc., that build each site live in a subfolder that is a git submodule (i.e. one shared repo among the three sites). So the directory structure looks something like this:

```
├── icons/
│   ├── twitter-icon.md
│   ├── facebook-icon.md
│   └── etc.
├── shared/
│   └── [shared code as a git submodule]
└── netlify.toml
```

I wanted to setup a single git repository with all of the content of my individual sites _as well as_ the code that powers each. A monorepo—of sorts (it’s not really a “monorepo” in the true sense of there being a `package.json` file for each individual site). In this way, I’d have one central repo for all my icon gallery sites. The code that powers each site would be the same (with a bit of configuration differences) while the content for each site would vary (the content being a bunch of markdown files). As a simple illustration, my directory structure would look something like this:

```
├── sites/
│   ├── ios
│   │   ├── icon1.md
│   │   ├── icon2.md
│   │   └── ...
│   ├── macos
│   │   ├── icon1.md
│   │   ├── icon2.md
│   │   └── ...
│   └── watchos
│       ├── icon1.md
│       ├── icon2.md
│       └── ...
├── src/
│   ├── plugins/
│   ├── templates/
│   └── public/
├── netlify.toml
└── package.json
```

My first question was: does Netlify support this? Short answer: yes!

## Knowing Which Site to Build

Netlify lets you create more than one site linked to the same git repo. So I could create a site in Netlify for each site’s domain:

- [iosicongallery.com](https://www.iosicongallery.com)
- [macosicongallery.com](https://www.macosicongallery.com)
- [watchosicongallery.com](https://www.watchosicongallery.com)

And each of those sites in Netlify would link to the same Github repo. Cool, hurdle number one crossed!

Now what? When Netlify builds each site, it needs to know which site it’s building. Because the site to git repo relationship isn’t one-to-one, I realized I’d have to leverage the Netlify UI in some form to set the context for the build command so it knows which site to build. There were two ways I could do this (note the code is simplified for illustration’s sake).

**Option 1**: setup a custom build command (via the Netlify UI) per-site with a parameter picked up by the build script so it knows which site to build.

```
// Custom build commands for each site via the Netlify UI
node build.js ios
node build.js macos
node build.js watchos

// build.js
const buildContext = process.argv[1];
```

**Option 2**: a single build command defined in `netlify.toml` with each site having an environment variable (set via the Netlify UI) so it knows which site to build.

```
// Custom env variables for each site via the Netlify UI
SITE=ios
SITE=macos
SITE=watchos

// netlify.toml
[build]
  command = "npm run build"

// build.js
const buildContext = process.env.SITE
```

I went with the environment variable approach for a number of reasons that I don’t need to outline here. Suffice it to say, having an environment variable I could access in my build script so I knew which site was being built allowed me to reach into the appropriate `sites/` folder for the content of the site being built (as well as properly set configuration settings, etc.).

## Only Building When Necessary

The one problem with this kind of setup is that I now have three different sites in Netlify synced to the same git repo. With Netlify’s strong bias towards a git-based workflow, this meant anytime I pushed a new update to the repo all three sites would kick off an automated build. While that would be the ideal side effect _in some cases_ it’s very much less than ideal _for all cases_.

For example, if I added a new icon to my macOS gallery by adding a file to `sites/macos/`, I don’t want my other sites to rebuild. That would be completely unnecessary and a waste of build minutes. On the other hand, if I changed some text in the footer by editing a file in `src/templates`, I would want all three sites to rebuild and deploy because the footer changed for all three sites.

Fortunately, Netlify has solved this problem for monorepos by introducing the ability to [ignore a build based on the result of a shell command](https://docs.netlify.com/configure-builds/file-based-configuration/#ignore-builds):

> An exit-code of `1` indicates the contents have changed, so if your [shell] command returns that code the build process will continue per usual. An exit-code of `0` indicates that the build should return early.

They even give an example of the configuration you can set in your `netlify.toml` file:

```
[build]
  ignore = "git diff --quiet HEAD^ HEAD sub_dir/"
```

Notice what that command is doing? It runs a git command which diffs the current tip of your branch with that last commit for a given path (or paths).

This seemed perfect for me! I figured I could set an environment variable via the Netlify UI for each site and then do something like this:

```
[build]
  ignore = "git diff --quiet HEAD^ HEAD src/ sites/$SITE"
```

This essentially tells Netlify: if anything from the latest commit has changed in my repository’s shared source files for templating, building, etc., (`src/`) or any content for the site you’re building has changed (referenced via the environment variable `site/$SITE_ID`) then rebuild this site. Otherwise, don’t bother.

It didn’t work.

Why? I found [this one little problem](https://docs.netlify.com/configure-builds/file-based-configuration/#inject-environment-variable-values):

> Using environment variables directly as values (`$VARIABLENAME`) in your `netlify.toml` file is not supported.

Crap. But I need someway for the `build.ignore` to know which site it is dealing with in Netlify, so that it can say “oh, this is iosicongallery, not macosicongallery, so I don’t need to rebuild the site because none of my source files or content in `sites/ios` changed.”

After posting about [this problem in the Netlify Community](https://community.netlify.com/t/workarounds-for-not-being-able-to-put-environment-variables-in-build-ignore/20334), I was able to find out that, while you can’t reference the environment variable in the `build.ignore` command itself, you can access it from a shell command executed by the `build.ignore` command. In other words, this doesn’t work:

```
[build]
  ignore = "git diff --quiet HEAD^ HEAD src/ sites/$SITE"
```

While telling `netlify.toml` to run a shell script for `build.ignore` does work:

```
[build]
  ignore = "./ignore.sh"
```

Because inside of that shell command you can run the same `git diff` command and reference any environment variable you’ve set via the Netlify UI:

```
#!/bin/bash
git diff --quiet HEAD^ HEAD src/ sites/$SITE
```

Lastly, it’s worth noting that if you have an old site in Netlify, this might not work. [You have to be sure you’re running the latest build image](https://community.netlify.com/t/build-ignore-command-not-working/20585) in order to Netlify to detect an ignore command in the configuration file.

## The End

Phew! After all the above, I was able to get my three different sites in Netlify all hooked up to the same repository, with the CI/CD configured to only trigger a build when relevant content and/or templates have changed for a particular site. To be honest, this has kind of been my dream for these projects since about 2015, so being able to finally take the time to get it working is a good feeling. Thank you Netlify!

Useful references: 

- [Workarounds for not being able to put environment variables in build.ignore](https://community.netlify.com/t/workarounds-for-not-being-able-to-put-environment-variables-in-build-ignore/20334)
- [Build Ignore Command Not Working?](https://community.netlify.com/t/build-ignore-command-not-working/20585/3)
- [Launching Monorepo support for Netlify sites](https://www.netlify.com/blog/2019/10/09/launching-monorepo-support-for-netlify-sites/)
- [Ignore builds](https://docs.netlify.com/configure-builds/file-based-configuration/#ignore-builds) in the netlify.toml configuration file
- [Support Guide: How can I optimize my Netlify build time?](https://community.netlify.com/t/support-guide-how-can-i-optimize-my-netlify-build-time/3907/77)
