---
tags: engineering javascript
---


# ES Modules: There is No Registry

I’m excited. I’ve always wanted to live in the future, and the future is now. With ES modules support in browsers and projects like deno, the dependency on `node_modules` and npm is going away. In the future, there is no ~~spoon~~ registry.

<img src="https://cdn.jim-nielsen.com/blog/2020/modules-there-is-no-registry.jpg" alt="Screenshot of a scene from “The Matrix” where Neo is taught by a young child “there is no spoon”. The text “there is no spoon” is overlaid on the image with “spoon” crossed out and “registry” overwritten in its stead." width="512" height="241" />

Previously, if you wanted a JavaScript SPA (no matter how small) you’d generally have to setup something like this:

- Install node 
    - Probably install a node version manager like [nvm](https://github.com/nvm-sh/nvm) or [n](https://github.com/tj/n)
- Install a few project and development dependencies via npm (which likely installs hundreds if not thousands of transitive dependencies)
- Setup and configure a bundler (plus all of its plugins like file imports, dev server, etc.)
- Setup a build process
- Etc.

The amount of tooling got expensive really fast. While some tools like [create-react-app](https://github.com/facebook/create-react-app) were designed to ~~solve~~ hide a lot of these issues for you, you still ended up dependent on npm, a giant `node_modules` folder, and a build process. 

The future—at least for smaller projects—cuts out all of that.

- Have a static `index.html` file with a `<script type="module">` and your entire dependency graph is resolved to files on a CDN somewhere.
- Done.

In this world, you wouldn’t (technically) even need node. All you need is an `index.html` file and a web server. Can’t picture how this would all work? Here’s an example `index.html` file using React and [htm](https://github.com/developit/htm) (`htm` to avoid using JSX, which would require a build step to transpile):

```html
<!DOCTYPE html>
<html>
<body>
  <div id="root"></div>
  <script type="module">
    import { React, ReactDOM } from 'https://unpkg.com/esm-react';
    import htm from 'https://unpkg.com/htm?module'

    const html = htm.bind(React.createElement);

    function App (props) {
      return html`<h1>Hello ${props.name}!</h1>`;
    }

    ReactDOM.render(
      html`<${App} name="World" />`,
      document.getElementById("root")
    );
  </script>
</body>
</html>
```

Once your app gets big, you can start breaking out your components into individual `Component.js` files and then merely `import` them wherever you need them. Still no need for any complex bundler, build tooling, etc.

Now, to talk managing dependencies. How could you ease the burden of having to type a fully-qualified CDN URL in every single file where you need a third-part dependency? There are two viable options I’ve come across:

1. A “Dependencies” JS File
2. Import Maps

## A “Dependencies” JS File

One of the conventions coming out of the deno community is the idea of putting all your dependencies in a `deps.js` file. In this way, you have one central place to see and manage (possibly all of) your dependencies.

```js
// deps.js
export {default as React} from "https://cdn.dev/react@16.0.0";
export {default as ReactDOM} from "https://cdn.dev/react-dom@16.0.0";
export {default as PropTypes} from "https://cdn.dev/prop-types@16.0.0";

// index.js
import React from "./deps.js";
import ReactDOM from "./deps.js";
ReactDOM.render(
  React.createElement("h1", null, "Hello World"),
  document.querySelector("#root")
);
```

Pros:
- Requires no new syntax or polyfills. It just works.

Cons:
- Doesn’t easily allow you to import named exports of a specific dependency, i.e. `import React, { useState } from "./deps.js"`. You’d have to do that on a separate line from your import statement, explicitly export the named export (which could easily lead to naming collisions), or export dependencies as an object with named keys. Suffice it to say, it isn’t always an easy mapping between your `deps.js` file and what the library authors provide.
- All dependencies in `deps.js` get loaded at once. If you have dynamic imports for external third-party dependencies, you’ll have to use the CDN URL in that exact place in the code. This means your `deps.js` file _might not be_ a canonical listing of all third-party dependencies in your project (the way, say, a `package.json` file can be).

## Import Maps

Import maps are a cool new browser specification being worked on that allows (among other things) use of bare specifiers in ES modules, i.e. 

`import React from "react"`

You can read more about [import maps on Github](https://github.com/WICG/import-maps). What’s neat is that you can start using them today with the [es-module-shims polyfill](https://github.com/guybedford/es-module-shims).

In this example, `index.html` is the new `package.json`

```html
<!-- Setup where you’ll inject your app -->
<div id="root">
  Loading...
  <noscript>JavaScript is required.</noscript>
</div>

<!-- Load the bare module imports shim -->
<script
  defer
  src="https://unpkg.com/es-module-shims@0.4.7/dist/es-module-shims.min.js">
</script>

<!-- Specify your 3rd party dependencies -->
<script type="importmap-shim">
  {
    "imports": {
      "react": "https://cdn.dev/react@16.0.0",
      "react-dom": "https://cdn.dev/react-dom@16.0.0",
      "prop-types": "https://cdn.dev/prop-types@16.0.0",
    }
  }
</script>

<!-- Import your app logic -->
<script
  type="module-shim"
  src="/js/index.js">
</script>
```

Then in any of your JS files, you can import your third party deps using bare module specifiers and your own modules using relative (or absolute) paths:

```js
import React from "react";
import ThirdPartyDep from "third-party-dep";
import localDep from "./local-dep.js";

export default function MyComponent(props) {
  return (
    <div>My stuff goes here</div>
  );
}
```

Once import maps become mainstream, you'll be able to get rid of the shim and cut the `-shim` off the attributes on the script tags and boom, you’ve got browser-native module loading with bare module specifiers.

<img src="https://cdn.jim-nielsen.com/blog/2020/modules-shim-diff.png" alt="Screenshot of a code diff before and after the addition of the ES modules shim in an HTML file." width="1400" height="476" />

Pros:
- Preservers convention of bare module names from node.js.
- Based on a standard.
- Drastically shortens having to type fully qualified CDN URLs across multiple files.
- All your dependencies in one place.

Cons:
- Based on a _working_ standard.
- Requires polyfill.

## Conclusion

I believe deno has really helped push forward these ideas. Rather than the interdependent connection between node and npm, deno gets rid of the package manager. [Deno is a browser for code](https://kitsonkelly.com/posts/deno-is-a-browser-for-code/).

Granted all of the above is an example of working on an SPA (with a single `index.html` file). But these ideas are transportable. If you were creating a CLI tool, you could still remove your dependency on npm by importing all your deps from a CDN (you can even [import ES modules directly from Github](https://blog.jim-nielsen.com/2020/import-es-modules-from-github/)). In this kind of world, you can forget having to worry about build steps, publishing steps, installation steps, etc. (or even configuring CI to do that all for you). As long as you setup your URLs right, `git push` your code and you’re done. 

The future is [a good thing](https://blog.jim-nielsen.com/2019/good-things/).