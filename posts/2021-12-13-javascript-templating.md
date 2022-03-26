#jsTemplating

# Templating in JavaScript, From Zero Dependencies on Up

Imagine you want to do some simple templating. By simple I mean: you have some data and you want to turn it into HTML. No interactivity or event handlers. No virtual DOM. Just data turned into HTML, server- or client-side.

There are so many ways to template now-a-days. Each one of these files has its own vocabulary for templating (and their own framework-specific features and quirks):

- `.jsx`
- `.vue`
- `.svelte`
- `.astro`
- `.njk`
- `.liquid`
- `.hbs`
- `.mustache`
- `.ejs`
- `.haml`
- `.pug`

Each one is an abstraction, which means you have to include it as a dependency in your project, keep it up to date, and learn its syntax (and keep your knowledge of it up to date).

But what if you wanted to go dependency free? A templating language native to JavaScript?

You can with template literals and functions in JavaScript! node.js, deno, the browser, this approach works in them all with zero dependencies.

```js
// Import a function that returns a string
import Navigation from "./Navigation.js";

// Define your components with this pattern
const Layout = (props, children = "") => `<!doctype html>
  <html>
    <head>
      <title>${props.title}</title>
    </head>
    <body>
      ${Navigation(props)}
      <main>
        ${children}
      </main>
    <body>
  </html>
`;

// Render a string of HTML
const myHtml = Layout({ title: "My Site" });
```

No additional abstractions needed. No includes, partials, or helpers. It’s Just JavaScript™. It’s functions returning strings, all the way down.

By ensuring all expressions inside your backticks resolve to strings, your syntax can resemble JSX but with zero dependencies:

- `[].map().join("")`
- `booleanCondition ? "" : ""`
- `function(data) { return "" }`

Example:

```js
const MyComponent = (props) => `
  <h1>My Heading</h1>
  <ul>
    ${props.items.map(item => `
      <li>${item.title}</li>
    `).join("")}
  </ul>
  ${props.isThing
    ? "<p>This is a thing.</p>"
    : ""}
`;
```

Note again the structure: every “component” in this world is a function that takes data and returns a string. That’s it. 

## Adding Some Sugar

With a small dependency, your syntax becomes a bit more JSX-like and requires slightly less repetitive typing.

This uses [tagged template literals—a topic I’ve written about before—](https://blog.jim-nielsen.com/2019/jsx-like-syntax-for-tagged-template-literals/) to automatically turn acceptable primitives into strings for you, i.e. an array returned from a `.map()` operation will be concatenated with `.join("")` (it’s up to you to make sure it’s an array of strings):

```js
import html from "https://cdn.jsdelivr.net/gh/jimniels/html@0.2.0/html.js";

const MyComponent = (props) => html`
  <h1>My Heading</h1>
  <ul>
    ${props.listItems.map(item => html`
      <li>${item.title}</li>
    `)}
  </ul>
  ${props.isThing && 
    "<p>This is a thing.</p>"}
`;
```

If you [look at the imported code](https://cdn.jsdelivr.net/gh/jimniels/html@0.2.0/html.js), you’ll see it’s tiny and understandable. You can always copy/paste the code directly into your codebase if you want to avoid the network request (see [the project on GitHub](https://github.com/jimniels/html)).

## Composing With Components

As noted earlier, this approach is founded on the idea of “functions returning strings”. So to do components you create a function, pass “props” (i.e. function parameters), and return a string.

If your components need “children”, you can do that too! The way I like to do it is have a function which takes two parameters: `props` and `children`. For example:

```js
// Define all your "Components" like this:
export function MyComponent(props = {}, children = "") {
  return `
    <h1>${props.title}</h1>
    ${children ? `<div>${children}</div>` : ""}
  `;
}

// And then use the component like this:
import MyComponent from "./MyComponent.js";
document.querySelector("#root").innerHTML = 
  MyComponent(
    { title: "My Component" },
    `<p>This is my component’s children here.</p>`
  );
```

You could namespace `children` as a reserved type in your `props` parameter. But there’s something I like about the second (optional) parameter. Whatever you choose, being consistent is the key.

This pattern is incredibly useful, composable, and flexible. Here’s the pattern in action with a layout component.

```js
// Layout component common to all pages
const Layout = ({ title }, children) => `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <title>${title}</title>
      <!--
        All the links to your stuff. Heck even accept
        a "meta" prop which is a string of HTML <meta> tags
        specific to this page and dump it here if you want.
      -->
    </head>
    <body>
      <nav>
        <!-- My site navigation -->
      </nav>
      ${children}
    </body>
  </html>
`;

// A specific page, which uses the Layout component
const HomePage = () => Layout({ title: "Home" }, `
  <main>
    <h1>My home page</h1>
    <p>
      With some content here for my page, all wrapped
      up in a nice layout.
    </p>
  </main
`);
```

Granted, you don’t get that syntactic, JSX-like sugar where your components closely resemble HTML:

`<div><MyComponent title="Hi" /></div>`

But that’s kind of the point: you trade that sugar for zero dependencies, leveraging vanilla JavaScript with template literals and functions returning strings.

`<div>${MyComponent({ title: "Hi" })}</div>`

That said, if you really wanted to, you could get even closer to JSX (without having to compile) using something like [htm](https://github.com/developit/htm) combined with [vhtml](https://github.com/developit/vhtml), which would get you syntax like this:

`<div><${MyComponent} title="Hi"><//></div>`

I could explain that more, but the point of this post is to show how to do templating _without_ additional dependencies. That said, htm combined with something like preact (or even react, if you wanted) can get you virtual DOM functionality in the browser.

It’s worth pointing out that sometimes you just don’t need the virtual DOM. You could have a `render()` function which wipes the `innerHTML` of a section of the document with fresh data each time you need to re-render it—a plausible scenario for many small projects or pages which are progressively enhanced.

```js
const render = (props) => {
  const format = (d) => d.toLocaleString(
    "en-US",
    {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    }
  );
  return `
    <p>
      The local time is: ${format(props.now)}
    </p>
  `;
};

setInterval(() => {
  document.querySelector("#root").innerHTML = render({ 
    now: new Date()
  });
}, 1000);
```

[See the example on codepen](https://codepen.io/jimniels/pen/LYzROZQ).

## Conclusion

I’m using this pattern on a number of projects, like server-side rendering [my blog](https://github.com/jimniels/blog/) or client-side rendering small bits of UI functionality on my [icon galleries sites](https://iosicongallery.com), which allows me to skip all the tooling (and headaches) that come with compiling templating languages.

Since it’s merely functions returning strings, it also allows me to easily render others things—[like XML for a feed](https://github.com/jimniels/blog/blob/master/src/client/feed.xml.tmpl.js)—and it let’s me skip the quirks of any particular templating framework, like having to write the attribute `className` instead of the HTML-compliant `class`.

Hooray for zero dependency templating that works anywhere there’s JavaScript. No extra tools necessary.
