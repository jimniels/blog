Switching from React to Native JS Templates (and from CJS to ESM)

## Switching to ES Modules

This was relatively straightforward. I had to change my metalsmith dev setup (@TODO link to old post)

In some places, it was pretty straightforward. All I had to do was change `require` statements to `import` statements and `module.export` statements to `export` statements:

<img src="https://cdn.jim-nielsen.com/blog/2019/react-to-js-cjs-to-es-modules.png" alt="Screenshot of git diff when changing import and export statements from CJS to ESM" width="1037" height="343" />

## High-Level: How It Works

What I call a “component” is simply a function that takes a single argument as props (a JavaScript object) and returns a string of HTML.

```js
import {html} from "./utils.js";

export default function MyComponent(props) {
  // destructure props
  const { pageTitle, siteName } = props;
  
  return html`
    <header class="header">
      <h1>${pageTitle && pageTitle + " | "}${siteName}</h1>
    </header>
  `;
}
```

You can see in my `return` statement I am using tagged template literals in JavaScript. To make this syntax even closer to JSX, I tag the template with a function which allows me to write easy logic in my templates and it won’t render `undefined` if a value is missing or something. It also allows me to return arrays in the template, so I can loop over data like I do in JSX and I don’t have to worry about remembering to doing `.join("")` at then end. You can read more about how precisely this works in an earlier blog post I wrote about [JSX-like syntax in tagged template literals](https://blog.jim-nielsen.com/2019/jsx-like-syntax-for-tagged-template-literals/).



## Swtucgubg frin React to Vanilla JS
Benefits:

**Faster** (especially in non-prod builds)

build: react NODE_ENV=production
1.893s
2.243s
2.050s
1.855s
2.006s

build: react NODE_ENV=development
53.121s
53.764s
54.382s

build: dev
1.7333s
1.609s
1.614s
1.721s
1.567s

build: prod
1.419s
1.560s
1.677s
1.530s
1.548s

**HTML semantics**

You can even do HTML comments, i.e. `<!-- my comment here -->`

No more `className`. No more errors around HTML attributes that weren't changed to camelCase.
> Warning: Invalid DOM property `srcset`. Did you mean `srcSet`?

No more `<>` or `React.Fragment`. Doing adjacent HTML nodes is incredibly easy.

Embeddable script tags. No more `dangerouslySetInnerHTML` (see issue). Say I wanted to write this into my HTML:\

```js
// Template literal component
const JSComponent = () => `
	<script>
		document.write("<h1>Heading</h1>");
	</script>
`;

// React component
const JSXComponent = () => (
  <script dangerouslySetInnerHTML={{ __html: `
      document.write("<h1>Heading</h1>");
  `}} />
);
```

Even something as simple as putting the HTML doctype in my overarching page layout template was now possible! In React, I couldn’t put that in my JSX. I had to prepend it to my `ReactDOM.renderToString()` call. But now, it can just be part of my JS template literal.

<img src="https://cdn.jim-nielsen.com/blog/2019/react-to-js-doctype-html.png" alt="Screenshot of git diff when changing import and export statements from CJS to ESM" width="977" height="277" />

**SVGs**

All those weird SVG attributes are no longer a problem. `<use xlink:href="#" />` is exactly that.

**Non-HTML files**

Need an xml file rendered to string? It's really hard now (see issue on GitHub)

