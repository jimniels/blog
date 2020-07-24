---
tags: engineering
---

# Static Site Templating: Switching from React & JSX to JavaScript & Template Literals

First, let’s get this out of the way: I love React & JSX. 

However, I don’t love fiddling with JavaScript tooling to get React & JSX to work. Anytime I dive back into a project I haven’t touched in >6 months that uses React, I get a bit scared. Am I going to have to have to touch the webpack config? What version of webpack am I on? What about babel? I’m on 6. Should I update to 7? Where does my babel config go again and what does it look like? Do I use a preset to transform my JSX or find the react-specific plugins I need? What _are_ the plugins I need again? Should I use the CLI or the node API? Oh wait, there’s the require hook. But what if I want to use ESM not CJS?

You know what? Maybe I just won’t update this old side project.

I find myself torn these days when I open up an old hobby project: do I hope it’s a jQuery project or a React project? Do I prefer jQuery spaghetti or transpiler-bundler linguine? I think my brain hopes for the codebase to be React, but deep in my heart of hearts there’s a small voice saying “please let this be a jQuery project so I don’t have to confront JS tooling.” It’s disheartening to not even be able to _get started_ on an old project because your build won’t work.

Because of this, I’ve decided to start moving away from React as a default templating choice. In this post I’m going to talk about one example where I did that: on my [icon](https://www.iosicongallery.com) [gallery](https://www.macosicongallery.com) [sites](https://www.watchosicongallery.com).

## Previously: React and JSX for Server-Side Templating

In a previous post from last year, I outlined [why I moved from EJS to JSX for templating](https://blog.jim-nielsen.com/2019/moving-from-ejs-to-jsx/). This post is an extension of that post.

When I moved from EJS to JSX I gained a lot and lost nothing. Moving from JSX to tagged template literals in vanilla JavaScript is the same: I gain a lot and lose nothing (at least, not that I know of). All of the benefits of JSX I outlined in that post, I still get them with this approach. Plus now I don’t have to worry about additional dependencies. My templating solution is “part of the language”, so I’ll never have to update a dependency to get my templates to work.

In addition, now I get new language and platform features for free without having to wait for library authors to support them. For example, in that [previous post](https://blog.jim-nielsen.com/2019/moving-from-ejs-to-jsx/) where I outlined moving to JSX, at the end I mentioned how I wanted to move to ES modules in node but couldn’t get it to work. I didn’t know it at the time, but [later learned](https://blog.jim-nielsen.com/2019/es-modules-in-node-my-own-rabbit-hole/) that my JSX template files couldn’t be processed because node’s ES modules implementation doesn’t support babel register’s loader. Even today—Jan 2020—it’s still not supported as far as I know because the node modules team hasn’t built and shipped support for custom module loader hooks yet. 

## Now: JavaScript Tagged Template Literals for Server-Side Templating

So how does this all work? Let me provide a simple example.

For my server-side rendering in React, I have a bunch of components that look something like this:

```jsx
// Page.js
import React from "react";
export default function MyComponent(props) {
  const { pageTitle, pageContents, siteName } = props;
  return (
    <html>
      <head>
        <title>
          {pageTitle && pageTitle + " | "}{siteName}
        </title>
      </head>
      <body>
        {pageContents}
      </body>
    </html>
  );
}
```

And at the top-most level of all these components, I use ReactDOM to render an entire tree of components to a string of HTML

```js
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const Page = require("./Page.js");

const pageData = {/* some data */}
const myHtmlFile = "<!DOCTYPE html>" +
  ReactDOMServer.renderToStaticMarkup(
    <Page {...pageData}>
  );

// Then write the file to disk somewhere
// and there’s your index.html file
```

What you don’t see pictured in those code samples is Babel. That `Page.js` file has JSX in it, which is not valid JavaScript. You have to make sure that code is transpiled first by Babel before node can execute it.

So how do you transition from a template written as a React component in JSX React to a template written in plain JavaScript?

Well I still have “components”, but what I call a “component” is simply a function that takes a single argument as props (a JavaScript object) and returns a string of HTML:

```js
// Page.js
export default function MyComponent(props) {
  const { pageTitle, pageContents, siteName } = props;
  return `
    <html>
      <head>
        <title>
          ${pageTitle
              ? pageTitle + " | " + siteName
              : siteName}
        </title>
      </head>
      <body>
        ${pageContents}
      </body>
    </html>
  `;
}
```

You can see in my `return` statement I am using [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) which are native to JavaScript. No more need for Babel because it’s not JSX. It really is Just JavaScript™.

You probably noticed there are a couple differences in the interpolation syntax of the template. What’s cool, though, is that you can make this syntax much more similar to JSX if you want to (by using short-circuit operators and the like). To do so, you use a tagged template literal like so:

```js
// Page.js
import { html } from "./utils.js";
export default function MyComponent(props) {
  const { pageTitle, pageContents, siteName } = props;
  return html`
    <html>
      <head>
        <title>
          ${pageTitle && pageTitle + " | "}${siteName}
        </title>
      </head>
      <body>
        ${pageContents}
      </body>
    </html>
  );
}
```

Note the `html` I put in front of my template literal? What this does is tag the template with a special function I’ve written myself (I named it `html` because it’s very similar to what you can do in other libs like [`lit-html`](https://lit-html.polymer-project.org/) and you get syntax highlighting inside the template literal for free). My `html` function is a special function that essentially strips out `undefined` or falsy values. It also allows me to return arrays in the template, so I can loop over data like I do in JSX and I don’t have to worry about remembering to do `.join("")` at then end of an array of items. You can read more about how precisely this works in an earlier blog post I wrote about [JSX-like syntax in tagged template literals](https://blog.jim-nielsen.com/2019/jsx-like-syntax-for-tagged-template-literals/).

## Benefits of Template Literals Over JSX

JSX is great. Like really great. I still love it in a lot of scenarios, but it has its quirks. And remember, JSX is not HTML. Perfectly valid HTML is not valid JSX. However, because template literals are just strings, you can write anything (valid or invalid HTML) with template literals and JavaScript won’t care. In this particular scenario of server-side templating, I like that freedom. Get out of my way. I’m gonna write what I want to write (besides, prettier will auto-format if it’s valid right?)

Here are a few breaths of fresh air I’ve felt since switching from JSX to template literals for server-side templating.

### No Babel

As already alluded to, one of the first things I was able to get rid of was my dependency on babel and its plugins to transform my JSX.

 <img src="https://cdn.jim-nielsen.com/blog/2019/js-templating-no-babel.png" alt="Screenshot of a git diff where @babel dependencies were removed in package.json" width="482" height="109" />
 
 In the immediate, it just felt really good to remove code and dependencies from my project. But the real pay off of transitioning away from babel is going to be in the long run. It’s less code to maintain. Template literals in JavaScript are going to work forever. Template literals aren’t tied to semver. There won’t be any syntax changes. No tool configuration tweaks. It’ll just work. Forever.

### Speed

I was wondering what the performance implications of switching my templating system would be. While tagged templates were faster overall, they weren’t _that_ much faster for production builds. 

For development builds, however, they were _extremely_ faster. As I’ve previously written about, [React DOM server can be really slow for production builds](https://blog.jim-nielsen.com/2019/improving-server-side-rendering-react/).

> In development mode, React spends 75% of its time just checking for error warnings.

So my prod builds got a bit faster, and my development builds got _way_ faster. Here’s a table comparing the overall average build time of each templating solution:

|                      | React JSX | JS Template Literals |
|----------------------|-----------|----------------------|
| NODE_ENV=production  | 2.062s    | 1.552s               |
| NODE_ENV=development | 53.756s   | 1.652s               |

Here’s some of the sample data from the builds I ran:

**React + JSX**:

- `NODE_ENV=production`
  - 1.893s
  - 2.243s
  - 2.050s
- `NODE_ENV=development`
  - 53.121s
  - 53.764s
  - 54.382s

**JavaScript + Template Literals**:

- `NODE_ENV=production`
    - 1.419s
    - 1.560s
    - 1.677s
- `NODE_ENV=development`
    - 1.733s
    - 1.609s
    - 1.614s

### Valid Elements

There are things you just can’t write in JSX. They are considered invalid. Two things that are considered invalid JSX but _very much valid_ HTML are: comments and doctype.

With template literals, I can finally author HTML comments! `<!-- comment here -->` works in template literals. It doesn’t in JSX. Granted, JSX gives you `{/* comment */}` style commenting, but those don’t compile to your HTML. That’s fine in most scenarios. But sometimes _I want_ comments in my HTML and JSX won’t let me do that.

Additionally, putting the `<!doctype>` in my templates is now possible! (I almost can’t believe I’m even listing that as a win?) In JSX, that element was invalid. I had to prepend the doctype at the place where I call  `ReactDOM.renderToString()`. 

<img src="https://cdn.jim-nielsen.com/blog/2019/react-to-js-doctype-html.png" alt="Screenshot of git diff when changing import and export statements from CJS to ESM" width="977" height="277" />

But now, it can be directly part of my template (right where it should be IMO).

```js
// JSX page template
const PageTemplate = () => (
  <html>
     ...some stuff here...
  </html>
);

// Template literal
const PageTemplate = () => `
  <!doctype html>
  <html>
     ...some stuff here...
  </html>
`;
```

### HTML Attributes

Ever seen this warning?

> Warning: Invalid DOM property `class`. Did you mean `className`?

I have. A lot. I still forget to write `className` in my JSX. And it’s not just `className`. I see lots of others warnings just like it related to invalid attributes in JSX:

> Warning: Invalid DOM property `srcset`. Did you mean `srcSet`?

With template literals, I don’t get any more errors around HTML attributes. Some might see that as a downside, because your attributes aren’t being “validated” (what if you mistyped one?) Personally I don’t see it that way. Again, I like the freedom. I learned HTML a long time ago and having to re-learn _some_ JSX-specific attribute names always trips me up. 

But now with template literals, no more converting HTML attributes to camelCase and no more special names, which leads me to my next benefit.

### SVGs

Have you tried SVGs in JSX? It can get tricky.

However, with template literals, all those SVG in JSX quirks are no longer a problem. `<use xlink:href="#" />` is exactly that. No more mapping SVG attributes to JSX-compatible camelCased attributes!

### Sibling Elements in HTML

No more `<>` or `React.Fragment`. I almost can’t believe I’m typing this, but doing adjacent HTML nodes is easy with template literals. You just don’t think about it and write them (who’d have thought “you can author adjacent nodes easily in markup” would be an advantage to one particular templating solution?) 

I always strive to write semantic HTML which necessitates HTML that takes a particular structure. The grain of JSX wants me to nest everything in an element, which is why you so often see a proliferation of `<div>`s in React code. `React.Fragment` was the way around that (and later the `<>` syntax sugar). But with template literals, you don’t have to worry about any of that. Just write HTML.

### Embeddable Scripts in HTML

Writing scripts directly into your templates is easy with template literals. You simply write them. No more having to use `dangerouslySetInnerHTML`. For example, let’s say I wanted to embed a `<script>` directly into my template for its output to HTML. Here’s how you would do that with JSX:

```jsx
// React component
const Component = () => (
  <script dangerouslySetInnerHTML={{ __html: `
      document.write("<h1>Heading</h1>");
  `}} />
);
```

And here’s how you’d do it with template literals:

```js
// Template literal component
const Component = () => `
	<script>
		document.write("<h1>Heading</h1>");
	</script>
`;
```

### Non-HTML Files

Need to render XML (say a `.rss` file) on the server with JSX as your templating system? What about a `.json` file? It’s not as easy as you’d think.

When I first encountered this problem, I thought “well I can use `<React.Fragment>` to render a react element without a tag and then use `dangerouslySetInnerHTML` for the content!” 

```jsx
return (
  <React.Fragment
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);
```

Turns out, that’s not possible. I describe what I was trying to do in much more detail in [this issue on the React Github project](https://github.com/facebook/react/issues/12014#issuecomment-454869517). There’s still no solution to this problem.

But with template literals, this is not a problem at all. I can write XML in my template. Or I can use `JSON.stringify()`. With template literals, I’m always returning a string so I can do just about anything I want!

### I Can Still Do PropType Checking

Just because I’m not using React anymore doesn’t mean I can’t keep checking my props between templating components. The `prop-types` package was designed to be useful outside of React. And while React checks the props for you automatically, I call them myself in my template literal components. This ensures that the data coming in to each of my components is what I expect. At build time, my build process will show any warnings that came from failed props. 

You can read more about how I did that over on [this post](https://blog.jim-nielsen.com/2020/proptypes-outside-of-react-in-template-literal-components/).

## Conclusion

I’ve really enjoyed this new “templating system” thus far. And I’m really happy that I have one less project that’s dependent on webpack/babel. Not that there’s anything specifically wrong with those tools. But for my particular needs on this project, it felt like overkill. 

The reason I put “templating system” in quotes is because it doesn’t really feel like a system to me. It’s just a bunch of functions that take data and return strings. Here’s a really simple illustration of “template literal components” in JavaScript:

```js
import fs from "fs";

// A "template literal component"
const Main = (props) => `
  <main>
    ${props.content}
  </main>
`;

// Another "template literal component" with a nested component
const Page = (props) => `
  <!doctype html>
  <html>
    <head>
      <title>${props.pageTitle}</title>
    </head>
    <body>
      <header>
        <h1>${title}</h1>
      </header>

      ${Main({ content: props.pageContent })}

      <footer>
        <p>Copyright 2020</p>
      </footer>
    </body>
  </html>
`;

// Gather your markdown
const markdown = fs.readFileSync("./src/index.md");
// Process your markdown into HTML however you like...
const data = { pageTitle: "Home", pageContent: markdown };
// Call your top-most "component", pass it data, 
// and write the output to a file
fs.writeFileSync("./build/index.html", Page(pageData))
```

I’ve moved [my blog](https://blog.jim-nielsen.com) and my [icon](https://www.iosicongallery.com) [gallery](https://www.macosicongallery.com) [sites](https://www.watchosicongallery.com) over to “template literal components” for server-side rendering and am loving every minute of it.
