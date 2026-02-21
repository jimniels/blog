#webOrigami

# Making Icon Sets Easy With Web Origami

Over the years, I’ve used different icon sets on my blog. Right now I use [Heroicons](https://heroicons.com).

[The recommended way](https://github.com/tailwindlabs/heroicons) to use them is to copy/paste the source from the website directly into your HTML. It’s a pretty straightforward process:

- Go to the website
- Search for the icon you want
- Hover it
- Click to “Copy SVG”
- Go back to your IDE and paste it

If you’re using React or Vue, there are also npm packages you can install so you can import the icons as components.

But I’m not using either of those frameworks, so I need the raw SVGs and there’s no `npm i` for those so I have to manually grab the ones I want.

In the past, my approach has been to copy the SVGs into individual files in my project, like:

```
src/
  icons/
    home.svg
    about.svg
    search.svg
```

Then I have a “component” for reading those icons from disk which I use in my template files to inline the SVGs in my HTML. For example:

```js
// Some page template file
import { Icon } from './Icon.js'
const template = `<div>${Icon('search.svg')} Search</div>`

// Icon.js
import fs from 'fs'
import path from 'path'
const __dirname = /* Do the stuff to properly resolve the file path */;
export const Icon = (name) => fs.readFileSync(
  path.join(__dirname, 'icons', name),
  'utf8'
).toString();
```

It’s fine. It works. It’s a lot of node boilerplate to read files from disk.

But changing icons is a bit of a pain. I have to find new SVGs, overwrite my existing ones, re-commit them to source control, etc. 

I suppose it would be nice if I could just `npm i heroicons` and get the raw SVGs installed into my `node_modules` folder and then I could read those. But that has its own set of trade-offs. For example:

- Names are different between icon packs, so when you switch, names don’t match. For example, an icon might be named `search` in one pack and `magnifying-glass` in another. So changing sets requires going through all your templates and updating references.
- Icon packs are often quite large and you only need a subset. `npm i icon-pack` might install hundreds or even thousands of icons I don’t need.

So the project’s npm packages don’t provide the raw SVGs. The website does, but I want a more programatic way to easily grab the icons I want.

How can I do this?

## Enter Origami

I’m using [Web Origami](https://weborigami.org) for my blog which makes it easy to map icons I use in my templates to Heroicons hosted on Github. It doesn’t require an `npm install` or a `git submodule add`. Here’s an snippet of my file:

```ori
{
  home: https://raw.githubusercontent.com/tailwindlabs/heroicons/refs/heads/master/optimized/24/outline/home.svg,
  about: https://raw.githubusercontent.com/tailwindlabs/heroicons/refs/heads/master/optimized/24/outline/question-mark-circle.svg,
  search: https://raw.githubusercontent.com/tailwindlabs/heroicons/refs/heads/master/optimized/24/outline/magnifying-glass.svg
}
```

As you can see, I name my icon (e.g. `search`) and then I point it to the SVG as hosted on Github via the Heroicons repo. Origami takes care of fetching the icons over the network and caching them in-memory.

Beautiful, isn’t it? It kind of reminds me of [import maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap) where you can map a bare module specifier to a URL (and [Deno’s semi-abandoned HTTP imports](https://blog.jim-nielsen.com/2024/deno-de-emphasizes-http-imports/) which were beautiful in their own right).

## How It Works

Origami makes file paths first-class citizens of the language — even “remote” file paths — so it’s very simple to create a single file that maps _your_ icon names in a codebase to _someone else’s_ icon names from a set, whether those are being installed on disk via npm or fetched over the internet.

To simplify my example earlier, I can have a file like `icons.ori`:

```ori
{
  home.svg: https://example.com/path/to/home.svg
  about.svg: https://example.com/path/to/information-circle.svg
  search.svg: https://example.com/path/to/magnifying-glass.svg
}
```

Then I can reference those icons in my templates like this:

```html
<div>${icons.ori/home.svg} Search</div>
```

Easy-peasy! And when I want to change icons, I simply update the entries in `icons.ori` to point somewhere else — at a remote or local path.

And if you really want to go the extra mile, you can use Origami’s caching feature:

```ori
Tree.cache(
  {
    home.svg: https://raw.github.com/path/to/home.svg
    about.svg: https://raw.github.com/path/to/information-circle.svg
    search.svg: https://raw.github.com/path/to/magnifying-glass.svg
  },
  Origami.projectRoot()/cache
)
```

Rather than just caching the files in memory, this will cache them to a local folder like this:

```
cache/
  home.svg
  about.svg
  search.svg
```

Which is really cool because now when I run my site locally I have a folder of SVG files cached locally that I can look at and explore (useful for debugging, etc.)

This makes [vendoring](https://blog.jim-nielsen.com/2025/be-mindful-of-what-you-make-easy/) really easy if I want to put these in my project under source control. Just run the file once and boom, they’re on disk!

There’s something really appealing to me about this. I think it’s because it feels very “webby” — akin to the same reasons I liked HTTP imports in Deno. You declare your dependencies with URLs, then they’re fetched over the network and become available to the rest of your code. No package manager middleman introducing extra complexity like versioning, transitive dependencies, install bloat, etc.

What’s cool about Origami is that handling icons like this isn’t a “feature” of the language. It’s an outcome of the expressiveness of the language. In some frameworks, this kind of problem would require a special feature (that’s why you have special npm packages for implementations of Heroicons in frameworks like react and vue). But because of the way Origami is crafted as a tool, it sort of pushes you towards crafting solutions in the same manner as you would with web-based technologies (HTML/CSS/JS). It helps you speak “web platform” rather than some other abstraction on top of it. I like that.