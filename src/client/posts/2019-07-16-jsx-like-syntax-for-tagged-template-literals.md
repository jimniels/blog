---
title: JSX-Like Syntax for Tagged Template Literals in JavaScript
tags: engineering
---

I recently moved my blog off Jekyll. Instead of choosing an off-the-shelf templating framework, I naively decided I would attempt rolling my own.

My blog is pretty simple in terms of what needs to be done. A couple pages, a hundred or so posts, and some feed files. Nothing too sophisticated. What I wanted to try was to leverage [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) in JavaScript as my “templating language” to generate all my markup. What I came up with was pretty straightforward: a number of functions which took data and returned strings. node.js would then take those strings and write them out as static HTML files.

What I love about this setup is the longevity of it: it’s just javascript. There’s no special syntax. No framework. It’s all merely functions returning strings. And what truly makes this possible (and ergonomic) in 2019 are template literals. 

Let me try to explain with an example. The navigation of my site is pretty simple. It’s a set of links that exist on every page. And, if the page you’re viewing is one of the links in the navigation, it gets highlighted.

![Screenshot of the navigation on my blog](https://cdn.jim-nielsen.com/blog/2019/jsx-style-templates-blog-navigation.png)

Under the hood, my static site generator ([metalsmith](https://metalsmith.io/)) is calling a layout function for each file and passing it some data. The layout function is, in essence, a template file that renders the HTML that’s shared across every page of my entire site, like for example the navigation. It looks something like this:

```js
const Navigation = require("./Navigation.js");

const Layout = (props) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${props.title}</title>
    </head>
    <body>
      <nav>${Navigation(props)}</nav>
      <!-- More stuff here -->
    </body>
  </html>
`;
```

This kind of structure allows me write component-ized template files for each section of HTML content. So I can have a `Navigation.js` component file which renders the navigational HTML for each static `.html` page. It takes data (like information about the current page being rendered) and returns a string.

```js
const navItems = [
  { path: "/", title: "Home" },
  { path: "/about/", title: "About" },
  { path: "/tags/", title: "Tags" }
];

const Navigation = (props) => `
  <ul class="navigation">
    ${navItems.map(item => `
      <li>
        <a
          class="${props.page.path === item.path ? 'active' : ''}"
          href="${item.path}">
          ${item.title}
        </a>
      </li>
    `).join("")}
  </ul>
`;

module.exports = Navigation;
```

You can see in the example above, my function receives data about the page being rendered by metalsmith and uses that data to know what kind of HTML to output. I actually quite like this syntax. It’s a string I can format how I want and interpolate data as needed. If write JSX often, this will probably look familiar. But there are two things in particular here that are different:

1. `.map(...).join("")` - Joining arrays into a string 
2. `boolean ? "echo this" : ""` - Ternaries with an empty string instead of a shortcut operator

First, `.map()` in the example above is going to return _an array_ of strings. That would result in an array being inside a string, so the array is going to get coerced into a string which is not going to give me what I want. That’s why I have to add `.join("")` onto the end of it. It joins all the items in the array into a string. React knows how to handle arrays of children, so it works in JSX. But with template literals, you have to make sure every expression inside your backticks (`${expression}`) is going to result in a string. 

Allow me to illustrate:

```js
// This
const str = `
  <ul>
    ${["Home", "About"].map(item => `<li>${item}</li>`)}
  </ul>
`;

// Is basically like writing this:
const str = "<ul>" + ["<li>Home</li>", "<li>About</li>"] + "</ul>";

// Which will result in a string like this:
// "<ul><li>Home</li>,<li>About</li></ul>"
```

Notice how without `.join("")` you are coercing an array to a string and so you end up with commas delimiting each item in the array. Whereas:

```js
// This
const str = `
  <ul>
    ${["Home", "About"].map(item => `<li>${item}</li>`).join("")}
  </ul>
`;

// Is basically like writing this:
const str = "<ul>" + "<li>Home</li><li>About</li>" + "</ul>";

// Which will result in a string like this:
// "<ul><li>Home</li><li>About</li></ul>"
```

In a similar vein, if want to output something based on a conditional, you’d have to use a ternary and always make sure in the negative case you output a string:

```js
const str = `
  <a class="${props.page.path === item.path ? 'active' : ''}">
    Text
  </a>
`;
```

Whereas JSX allows you to be a bit more concise in using shortcut operators like `&&`:

```jsx
const component = (
  <a class={props.page.path === item.path && "active"}>
    Text
  </a>
);
```

If you tried to do that in a template literal, it’s very possible one of the values in the expression will result in `false` or `undefined` and that would get coerced into a value in your string. Example:

```js
`${true && "string"}`
// Returns "string"

`${false && "string"}`
// Returns "false"

`${undefined && "string"}`
// Returns "undefined"
```

So, using the example above:

```js
// If the === operator here resulted in false
const str = `
  <a class="${props.page.path === item.path && 'active'}">
    Text
  </a>
`;
// You'd end up with a string like this:
// '<a class="false">Text</a>'
```

To be honest, these workarounds to achieving a JSX-like syntax in template literals are ok. I could go about adding `.join("")` onto my arrays and always having an empty string on my ternarys `true ? "this" : ""`, but because this is programming I can’t not try to figure out a workaround...

## _Tagged_ Template Literals

One cool thing about this new backtick syntax in JavaScript for template literals is that you can “tag” them. What does that mean? The best explanation I’ve found comes from [Wes Bos’ article](https://wesbos.com/tagged-template-literals/).

> One feature that comes along with template literals, or template strings, is the ability to tag them.
>
> That means is that we can run a template string through a function, and rather than have the browser immediately assign that value to a variable, we can have control over how this actual string is made.

You really should read Wes’ entire article if you don’t understand how tagged template literals work, otherwise the rest of this post won’t make much sense.

Read it? Ok so with tagged template literals you can control how the string inside the backticks gets made. In our case, that means we can support a more JSX-like syntax in our template literals. We can detect the value of the expression that was evaluated and, depending on its type, we can output the value we would expect. The code to do that would look something like this:

```js
/**
 * Tagged template literal function for coercing certain values to what
 * we would expcted for a more JSX-like syntax.
 * 
 * For values that we don't want to coerce, we just skip outputing them
 * Example:
 *   `class="${variable}"`
 * If the value of my variable was one of these types I don't want 
 * JavaScript to coerce, then I'd get this:
 *   'class=""'
 */
function jsx(strings, ...values) {
  let out = "";
  strings.forEach((string, i) => {
    const value = values[i];

    // Array - Join to string and output with value
    if (Array.isArray(value)) {
      out += string + value.join("");
    } 
    // String - Output with value
    else if (typeof value === "string") {
      out += string + value;
    }
    // Number - Coerce to string and output with value
    // This would happen anyway, but for clarity's sake on what's happening here
    else if (typeof value === "number") {
      out += string + String(value);
    }
    // object, undefined, null, boolean - Don't output a value.
    else {
      out += string;
    }
  });
  return out;
};
```

Now we can prefix our backticks with `jsx` and the expressions inside those backticks will be omitted as we specified in our function. Here’s an example:

```js
const { jsx } = require("./utils.js");

console.log(`I love ${false && "dogs"}`);
// "I love false"

console.log(jsx`I love ${false && "dogs"}`);
// "I love dogs"

const fruit = ["apple", "banana"];

console.log(`
  <ul>
    ${fruit.map(f => `<li>${fruit}</li>`)}
  </ul>
`);
// "<ul><li>apple</li>,<li>banana</li></ul>

console.log(`
  <ul>
    ${fruit.map(f => jsx`<li>${fruit}</li>`)}
  </ul>
`);
// "<ul><li>apple</li><li>banana</li></ul>
```

Going back to our nav example, we can tag our template literal where we want our string to be evaluated with more JSX-like syntax. That allows us to remove `.join("")` from the end of `.map()` and also allows us to use a shortcut operator when rendering a class name:

```js
const { jsx } from "./utils.js";

const navItems = [
  { path: "/", title: "Home" },
  { path: "/about/", title: "About" },
  { path: "/tags/", title: "Tags" }
];

const Navigation = (props) => `
  <ul class="navigation">
    ${navItems.map(item => jsx`
      <li>
        <a
          class="${props.page.path === item.path && 'active'}"
          href="${item.path}">
          ${item.title}
        </a>
      </li>
    `)}
  </ul>
`;

module.exports = Navigation;
```

It’s worth noting there are definitely edge cases here. For example, if a value was an array but not an array of strings (perhaps, say, an array of objects), you’re probably going to see something you don’t expect. So keep that in mind. In my case, I only ever use `.map()` to return an array of strings.

Note that each time you have a template literal that needs JSX-like syntax, you’ll have to tag it, i.e. if you have a template literal inside a template literal, you have to tag each one that want evaluated with `jsx`. You can’t just tag the one at the top and everything underneath works. Example:

```js
const results = [/* array of 20 objects */]
console.log(
  jsx`
    <div>
      <p>${results.length} item${results.length !== 1 && "s"}</p>
      <ul>
        ${results.map(item => jsx`<li>${item.name}</li>`)}
      </ul>
    </div>
  `
)
// "<div><p>20 items</p><ul><li>Apples</li>...</ul></div>"
```
