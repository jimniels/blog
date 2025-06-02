# Is It JavaScript?

> OH: It’s just JavaScript, right? I know JavaScript. 
>
> My coworker who will inevitably spend the rest of the day debugging an electron issue
> 
> — [@jonkuperman.com on BlueSky](https://bsky.app/profile/jonkuperman.com/post/3lnzwrayka22t)

“It’s Just JavaScript!” is probably a phrase you’ve heard before. I’ve used it myself [a](https://blog.jim-nielsen.com/2019/jsx-like-syntax-for-tagged-template-literals/#:~:text=it%E2%80%99s%20just%20javascript) [number](https://blog.jim-nielsen.com/2019/moving-from-ejs-to-jsx/#:~:text=write%20templates%20using%20%E2%80%9C-,just%20JavaScript) [of](https://blog.jim-nielsen.com/2020/switching-from-react-to-js-for-templating/#:~:text=Just%20JavaScript) [times](https://blog.jim-nielsen.com/2021/javascript-templating/#:~:text=Just%20JavaScript).

It gets thrown around a lot, often to imply that a particular project is approachable because it can be achieved writing the same, ubiquitous, standardized scripting language we all know and love: JavaScript.

Take what you learned moving pixels around in a browser and apply that same language to running a server and querying a database. You can do both with the same language, It’s Just JavaScript!

But wait, what _is_ JavaScript?

Is any code in a `.js` file “Just JavaScript”?

Let’s play a little game I shall call: “Is It JavaScript?”

<img src="https://cdn.jim-nielsen.com/blog/2025/is-it-javascript.jpg" width="534" height="657" alt="Poster from the game “Is It Cake?” showing a guy cutting through a cake, but the words “Is It JavaScript?” have been superimposed on the poster, as well as the JS logo over the cake." />

## Browser JavaScript

```js
let el = document.querySelector("#root");
window.location = "https://jim-nielsen.com";
```

That’s DOM stuff, i.e. browser APIs. Is it JavaScript?

“If it runs in the browser, it’s JavaScript” seems like a pretty good rule of thumb. But can you say “It’s Just JavaScript” if it _only_ runs in the browser?

What about the inverse: code that _won’t_ run in the browser but will run elsewhere?

## Server JavaScript

```js
const fs = require('fs');
const content = fs.readFileSync('./data.txt', 'utf8');
```

That will run in Node — or something with Node compatibility, like Deno — but not in the browser.

Is it “Just JavaScript”?

### Environment Variables

It’s very possible you’ve seen this in a `.js` file:

```js
const apiUrl = process.env.API_URL;
```

But that’s following a Node convention which means that particular `.js` file probably won’t work as expected in a browser but will on a server. 

Is it “Just JavaScript” if executes but will only work as expected with special knowledge of runtime conventions?

## JSX

What about this file `MyComponent.js`

```jsx
function MyComponent() {
  const handleClick = () => {/* do stuff */}
  return (
    <Button onClick={handleClick}>Click me</Button>
  )
}
```

That won’t run in a browser. It requires a compilation step to turn it into `React.createElement(...)` ([or maybe even something else](https://github.com/krakenjs/jsx-pragmatic)) which will run in a browser.

Or wait, [that can also run on the server](https://react.dev/reference/rsc/server-components).

So it can run on a server or in the browser, but now requires a compilation step. Is it “Just JavaScript”?

### Pragmas

What about this little nugget?

```
/** @jsx h */
import { h } from "preact";
const HelloWorld = () => <div>Hello</div>;
```

These are magic comments which affect the interpretation and compilation of JavaScript code ([Tom MacWright has an excellent article on the subject](https://macwright.com/2025/04/29/directive-prologues-and-javascript-dark-matter)).

If code has magic comments that direct how it is compiled and subsequently executed, is it “Just JavaScript”?

## TypeScript

What about:

```ts
const name: string = "Hello world";
```

You see it everywhere and it seems almost synonymous with JavaScript, would you consider it “Just JavaScript”?

## Imports

It’s very possible you’ve come across a `.js` file that looks like this at the top. 

```js
import icon from './icon.svg';
import data from './data.json';
import styles from './styles.css';
import foo from '~/foo.js';
import foo from 'bar:foo';
```

But a lot of that syntax is non-standard ([I’ve written about this topic previously in more detail](https://blog.jim-nielsen.com/2023/imports-under-the-hood/)) and requires some kind of compilation — is this “Just JavaScript”?

## Vanilla

Here’s a `.js` file:

```js
var foo = 'bar';
```

I can run it here (in the browser).

I can run it there (on the server).

I can run it _anywhere_.

It requires no compiler, no magic syntax, no bundler, no transpiler, no runtime-specific syntax. It’ll run the same everywhere. 

_That_ seems like it is, in fact, _Just JavaScript_. 

## As Always, Context Is Everything

A lot of JavaScript you see every day is non-standard. Even though it might be rather ubiquitous — such as seeing `processn.env.*` — lots of JS code requires you to be “in the know” to understand how it’s actually working because it’s not following any part of [the ECMAScript standard](https://ecma-international.org/publications-and-standards/standards/ecma-262/).

There are a few vital pieces of context you need in order to understand a `.js` file, such as:

- Which runtime will this execute in? The browser? Something server-side like Node, Deno, or Bun? Or perhaps something else like Cloudflare Workers?
- What tools are required to compile this code _before_ it can be executed in the runtime? (vite, esbuild, webpack, rollup typescript, etc.)
- What frameworks are implicit in the code? e.g. are there non-standard globals like `Deno.*` or special keyword exports like `export function getServerSideProps(){...}`?

When somebody says, “It’s Just JavaScript” what would be more clear is to say “It’s Just JavaScript for…”, e.g.

- It’s just JavaScript _for the browser_
- It’s just JavaScript _for Node_
- It’s just JavaScript _for Next.js_

So what would you call JavaScript that can run in any of the above contexts?

Well, I suppose you would call that “Just JavaScript”.