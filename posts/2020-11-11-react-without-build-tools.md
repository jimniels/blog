#javascript

# React Without Build Tools

First off: this is mostly a reference for myself. I find myself quite often needing to prototype something really quick, sometimes even build an “MVP” of something I can put out into the world for feedback. Using a framework like React can make doing that incredibly easy—as long as there is no build tooling involved. The moment configurations, build processes, and what not get involved, _those_ become the focus of my attention. It’s like I immediately forget that I was trying to build something useful and instead it becomes a fight of nerd vs. computer—“can I get this working?”—and I find that I’ll move heaven and earth just to see something work only to realize that what I wanted to do was building something usable in a browser, not optimize and streamline my “DX”.

Ok, so, with that context in mind, I have this little boilerplate I’ve pieced together from a couple different sources (big thanks to [the preact docs](https://preactjs.com/guide/v10/getting-started#no-build-tools-route)). It allows me to leverage React and write JSX-like syntax without any dependence on a build tool. The code I write is the code that ships to the browser. This is a great place to start with an idea. If it becomes viable longer term, I then consider factoring in a build process, removing my dependence on React, etc.

First, I have my root HTML file (`index.html`):

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Title of Your Page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <div id="root">
      Loading...
      <noscript>JavaScript is required.</noscript>
    </div>
    <script type="module" src="/index.js"></script>
  </body>
</html>
```

Then my `index.js` file:

```js
import { React, ReactDOM, html } from "./deps.js";

const App = (props) => {
  return html`<div>Hello World! foo: ${props.foo}</div>`;
}

ReactDOM.render(
  html`<${App} foo=${"bar"} />`,
  document.getElementById("root")
);
```

Lastly, I list all my dependencies in a single file (`deps.js`):

```js
import React from "https://unpkg.com/es-react@latest/dev/react.js";
import ReactDOM from "https://unpkg.com/es-react@latest/dev/react-dom.js";
import PropTypes from "https://unpkg.com/es-react@latest/dev/prop-types.js";
import htm from "https://unpkg.com/htm@latest?module";

const html = htm.bind(React.createElement);

export {
    React,
    ReactDOM,
    PropTypes,
    html 
}
```

This kind of setup is nice because it sets me up, right off the bat, with a nice modular setup for my JavaScript files. I can very easily create a new file/component at any time, import any dependencies, and export any functions/components. It scales quite effortlessly for prototyping ideas.

You can see [an example of this setup on my codepen](https://codepen.io/jimniels/pen/jOrBJWQ). A few notes:

- I am using `es-react` because [React still doesn’t provide official ESM exports](https://github.com/facebook/react/issues/11503#issuecomment-407122820), which means you can’t import the library directly from the official react repo on a CDN.
	- `/dev` in the URL is what makes the development version of the build work so you get better logging and warnings during prototyping. If you’re building something for “production” the easiest way to get around this is to commit URLs without the `/dev` URL, then whenever you’re developing locally just add the `/dev` back in those URLs in `deps.js` and never commit those changes.
- `htm` is cool because it let's you author JSX-like syntax without requiring a build step (which JSX requires). You can compile it away for production if you really want.

And if you really wanted to put it all on one page, you could.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Title of Your Page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <div id="root">
      Loading...
      <noscript>JavaScript is required.</noscript>
    </div>
    <script type="module">
      import React from "https://unpkg.com/es-react@latest/dev/react.js";
      import ReactDOM from "https://unpkg.com/es-react@latest/dev/react-dom.js";
      import PropTypes from "https://unpkg.com/es-react@latest/dev/prop-types.js";
      import htm from "https://unpkg.com/htm@latest?module";
      const html = htm.bind(React.createElement);

      const App = (props) => {
        return html`<div>Hello World! foo: ${props.foo}</div>`;
      };

      ReactDOM.render(
        html`<${App} foo=${"bar"} />`,
        document.getElementById("root")
      );
    </script>
  </body>
</html>
```

But as I mentioned, I like splitting the JavaScript out into individual modules because it helps me expand and grow the functionality over time. For example, having a `deps.js` file makes it so I don’t have to write out those long CDN URLs all the time. I import the libraries in one place and export them for use in other files. (Once we get stuff like [import maps](https://blog.jim-nielsen.com/2020/es-modules-there-is-no-registry/) you wouldn’t even have to do this.)

Granted, you can author in JSX and ship it directly to the browser. At the time of this writing, that’s what the React docs show you how to do it for basic examples, i.e.:

```html
<script src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<div id="root"></div>
<script type="text/babel">
  ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
  );
</script>
```

But this imports babel into the browser and transforms on the fly. Plus it doesn’t give you the ability to start splitting out your components into individual JavaScript modules. So pick your poison.

Anyway, this might be a long-winded way of stating something most folks already know. But for those who don’t, try this setup. I think you’ll find it quite refreshing to use React A) with a JSX-like syntax, and B) without any kind of build tooling.
