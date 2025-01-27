#html

# HTML Minification for Static Sites

This is a note to my future self, as I’ve setup HTML minification on a few different projects and each time I ask myself, “How did I do that again?” So here’s your guide, future Jim (and anyone else on the internet who finds this).

I use [html-minifier](https://github.com/kangax/html-minifier) to minifiy HTML files created by my static site generator. Personally, I use the CLI tool because it's easy to add a CLI command as an npm `postbuild` step.

Example `package.json`:

```json
{
  "scripts": {
    "build": "<BUILD-COMMAND>"
    "postbuild": "html-minifier --input-dir <BUILD-DIR> --output-dir <BUILD-DIR> --file-ext html <OPTIONS>"
  }
}
```

All the minification options are off by default, so you have to turn them on one-by-one (HTML minfication is [a tricky concern](http://perfectionkills.com/experimenting-with-html-minifier/)). Me personally, I’m using the ones exemplified in the project README:

```
--collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true
```

So, for a site folder named `build`, the entire command looks like this:

```
html-minifier --input-dir ./build --output-dir ./build --file-ext html --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true
```

That’s it — that’s the template.

## What Kind of Results Do I Get?

I use this on a few of my sites, including my [notes site](https://notes.jim-nielsen.com) and this blog. 

When testing it locally for my blog’s build, I:

- Run a build and put files to `./build`
- Copy `./build` to `./build-min`
	- Command: `cp -R build build-min`
- Run `html-minifier` on `build-min` and compare the resulting folders in macOS finder.

Here’s my results for my blog (2,501 items in `./build`):

- Directory size:
	- Before: 37MB
	- After: 28.4MB
	- Difference: ▼ -8.6MB (-23.24%)
- Main `index.html` file lines of code:
	- Before: 1,484
	- After: 15 lines
	- Difference: ▼ -1,469 lines (-99%)
- Main `index.html` file size over the network:
	- Before: 30.6kB
	- After: 17.6kB
	- Difference: ▼ -13kB (-42.48%)

And the results for my notes (one big `index.html` file):

- File size:
	- Before: 1.5MB
	- After: 1.1MB
	- Difference: ▼ -0.4MB (-26.67%)
- Lines of code:
	- Before: 25,974
	- After: 1
	- Difference: ▼ -25,973 lines (-99.996%)