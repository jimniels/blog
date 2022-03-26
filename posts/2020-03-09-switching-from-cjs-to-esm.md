#engineering

# Switching from CJS to ES Modules

I’ve [written previously](https://blog.jim-nielsen.com/2019/es-modules-in-node-my-own-rabbit-hole/) on my attempts at switching from CJS to ES Modules. tldr; it wasn’t as easy as I thought. But that had more to do with the configuration and setup of a particular project than it did Node’s implementation of ES modules. 

I am happy to report that, once Node [official announced](https://medium.com/@nodejs/announcing-core-node-js-support-for-ecmascript-modules-c5d6dc29b663) core support for ES modules, I switched a few other projects over without much hassle.

Here’s a quick run-down of what it took.

## Update `package.json`

Node will treat files with the extension `.mjs` as ES modules, but who wants to rename all their files?

As an alternative, Node will also treat `.js` files as ES modules when the nearest `package.json` contains a `"type": "module"` value in it. So I went with that.

<img src="https://cdn.jim-nielsen.com/blog/2020/cjs-to-esm-package-json.png" alt="Screenshot of a git diff for a package.json file." width="329" height="131" />

You may have noticed that I also added an `engines` value too. As [noted in the npm docs](https://docs.npmjs.com/files/package.json#engines), this is a way to say “hey, you should probably be running `x` version(s) of Node with this project.” For me, the sole reason I specify `13.2.0` or higher is because that’s the moment when core ES module support shipped in Node! So that’s my new baseline.

Oh, and because one of the projects was building/deploying on top of netlify, I had to tell the build to make sure it was using that version of Node or higher as well.

<img src="https://cdn.jim-nielsen.com/blog/2020/cjs-to-esm-node-version.png" alt="Screenshot of a git diff for a netlify.toml file." width="384" height="107" />

## Change Module Statements from CJS to ESM

This next step might seem self-evident, but it’s worth noting anyway: I had to change all my `require` statements to `import` statements and my `module.export` statements to `export` statements.

<img src="https://cdn.jim-nielsen.com/blog/2020/cjs-to-esm-require-import.png" alt="Screenshot of git diff when changing import and export statements from CJS to ESM" width="1037" height="343" />

## Replace Any CJS-Specific Variables

Some CJS globals (like `__dirname`) are not available with ES modules. You can still use them as values, but you have to set them yourself. I was only using `__dirname` in one file, so I changed it in place.

```js
import path from "path";
const __dirname = path.dirname(
  new URL(import.meta.url).pathname
);
```

There are actually a few different ways I’ve seen this done. [Node’s docs have an example](https://nodejs.org/api/esm.html#esm_no_require_exports_module_exports_filename_dirname), so it’s probably worth following their code samples and not mine.

Note: if you’re going to need to access CJS variables like `__dirname` quite frequently across modules, you might want to [abstract the retrieval of their values into helper functions](https://blog.jim-nielsen.com/2019/common-js-equivalent-of-dirname-in-es-modules/) as I’ve written about in a prior post.

## Celebrate

That’s it. Here’s [the PR](https://github.com/jimniels/blog/pull/14/files) where I did this for my blog’s codebase. The PR has a bit more code in it because I had to also change an aspect of my build/development tooling to get things working properly, but you can filter those pieces out and see the gist of what it took to transform that specific project from CJS to ESM.
