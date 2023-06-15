# JavaScript Imports Under The Hood

In [my notes from Rich Harris’ talk, I noted](https://blog.jim-nielsen.com/2023/notes-from-richs-talk/):

> in order to successfully work with JavaScript or TypeScript these days, there’s a growing need to understand some of the very sophisticated transformations that are happening under the hood between the code that you’re writing and the code that runs in the browser.

While I didn’t provide a concrete example of this, one came to mind the other day when I was reading Pascal Schilp’s post [“The Cost of Convenience”](https://dev.to/thepassle/the-cost-of-convenience-kco) where he notes:

> When we talk about conveniences, we generally talk about non-standardisms or any kind of magical behavior. A useful rule of thumb is to ask: "Does it run natively in a browser?". A good example of this are imports, which often get subjected to magical behavior and transformed into non-standardisms.

This was exactly the kind of thing I had in mind when I heard Rich’s point about the growing need to understand the sophisticated transformations that happen to the code you write vs. the code that runs in the browser.

Borrowing from Pascal’s example, here’s a sampling of some imports you might see in a codebase today:

```js
import icon from './icon.svg';
import data from './data.json';
import styles from './styles.css';
import foo from '~/foo.js';
import foo from 'bar:foo';
```

Do you know what any of those do?

In one sense, they’re all “non-standard” in terms of their ability to run natively on the web platform (none of these imports would work if dropped into a browser). On the other hand, they’re also pretty “standard” in terms of their prevalence across many codebases.

Let’s take a closer look at each.

## SVG

What does this do?

```js
import icon from './icon.svg';
```

Does it give you the raw contents of an SVG file you can stick in some HTML, e.g. `<div>{icon}</div>` which results in `<div><svg ...></svg></div>`?

Or does it give you a `src` reference for use in an image, e.g. `<img src={icon} />` resulting in `<img src="/path/from/bunlder/icon.svg" />` (and a bundler somehow takes the `icon.svg` file and outputs it as a static file at the specified path in your `./build` folder)?

Or does it do something else?

The answer is: who knows. If you saw that code, you’d have to take a step back and inspect your build tools (and plugins) to know what that code will do at runtime, as it won’t work as-written in the browser.

## JSON

What does this do?

```js
import data from './data.json';
```

If you drop this code into the browser, the answer is “Nothing”. Or, more accurately, it throws an error. 

But if you saw it in a codebase, it’s probably pretty intuitive to understand the transformation happening under the hood: _something_ is reading a file from disk, expecting that file’s contents to be JSON, and transforming it into a JS object for use in your code.

It’s a shortcut to writing something like this:

```js
import fs from 'fs';
const data = JSON.parse(
  fs.readFileSync("./data.json").toString()
);
```

But you have to understand that importing a JSON file is not standard. Some kind of bundler/compiler/tool is required to make that possible.

FWIW: [import assertions](https://v8.dev/features/import-assertions) for JSON are being standardized and already available for use in some environments:

```js
import data from './data.json' assert { type: 'json' };
```


## CSS

What does this do?

```js
import styles from './styles.css';
// or sometimes just `import './styles.css'`
```

Like SVG, does it give you a path to a static CSS file the bundler outputs at compile time, which you then use in a link tag, e.g. `<link rel='stylesheet' href={styles}>`?

Or does it read the contents of the CSS file and inject into the DOM as a style tag at some point during runtime, e.g. `<style>{styles}</style>`?

Or does it give you back an object whose class names you use in your markup, e.g. `<div class={styles.foo}>...</div>`?

And, in any of these cases, what transformations are happening to the contents of that CSS file? Is it being pre/post-processed? Are class names being randomized for automated scoping? Oh, and if styles are being injected into the DOM, what about their removal? Does that happen automatically on a page-by-page basis in some way? Or are the styles forever in the DOM once injected?

Or, is something else happening that I haven’t described above?

The answer is: who knows. It depends on what framework/bundler/tool you’re using. It doesn’t work in the browser, so you’d have to look to the docs for your tooling to understand how it’s handling these kinds of imports.

FWIW: import assertions for CSS are being [standardized](https://web.dev/css-module-scripts/) in a way that gives you a constructible stylesheet to work with:

```
import sheet from './styles.css' assert { type: 'css' };
```

## Module Identifiers

What does this do?

```js
import foo from '~/foo.js';
```

Maybe you’ve seen it this way:

```js
import foo from '@/foo.js';
```

The answer is: who knows. Once again, it depends on your tooling as [this is not standardized](https://stackoverflow.com/a/42711271/1339693):

> The meaning and structure of the module identifier depends on the _module loader_ or _module bundler_ [which] is not part of the ECMAScript spec.

Most commonly, these identifiers allow you to specify a root for your project so that, rather than having to type `../` multiple times to navigate references to other files (or change your imports when you move files around), you can specify  the root of your project and imports work more like absolute paths.

But again, this is not standardized and doesn’t work in browsers. If you see it in a codebase, all bets are off. You’ll have to delve into your specific tooling to know what it does.

## Prefixes

What does this do?

```js
import foo from 'bar:foo';
```

The colon in the module, does that do something special?

There’s really [no standardized meaning](https://stackoverflow.com/a/76040260/1339693). However, Node has adopted this syntax to help with problems associated with [namespacing core modules](https://stateful.com/blog/node-18-prefix-only-modules):

> Prefix-only core modules provide a clear delineation between core and userland, reducing much of the friction involved in adding a new core module.

So you’ve most likely seen code like this:

```js
import fs from 'node:fs';
```

Once again, there’s really no standard, but if node is doing it,  it’s gonna be common real soon.

## Bare Module Specifiers, Extension-less Imports, Wildcards, and More

I’ve tried to avoid the whole topic of bare module specifiers:

```
import foo from 'package';
```

These are not supported natively by the platform unless you have an associated [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) setup.

So if you see a bare module import, you _might_ have an import map setup that can be dropped directly into the browser — or you might have a bundler setup, that’s on you to figure out.

And then there’s extension-less imports:

```js
import Component from './Component';
```

These are non-standard imports that don’t work in browsers. You’d have to dive into your tooling to understand what’s happening there (and who knows if it’s a JS or TS file).

And there’s also [wildcard module declarations](https://www.typescriptlang.org/docs/handbook/modules.html#wildcard-module-declarations):

```js
import foo from "./foo.txt!text";
```

Once again, this is a non-standard import whose functionality varies from one codebase to the next. Check your local tooling setup to find out more.

## Conclusion

I’m sure there are more import syntaxes I missed. And of the ones I did cover, there are undoubtedly more functionalities I did not cover.

The point is: in many of these cases, you can’t tell by looking at the code what is happening. You have to zoom out to the level of your tooling (which varies from one codebase to the next) to understand what transformations and build-time optimizations are happening under the hood. Some imports end up as runtime imports, some compile away, some are bundled,  and some...well, who knows.

It’s like the ancient Tower of [Babel](https://babeljs.io/) where the language has been split asunder and nobody can’t talk to each other because “import” means a hundred different things depending on which tool you use. What an ironic name.

Though verbose to many, I like [Deno’s approach to module loading](https://deno.com/manual@v1.34.2/basics/modules) which tries to stick to browser semantics: if it works in Deno, it works natively in the browser (except for those pesky TS imports). Deno’s level of web compat is much higher and I find that nice. There’s less magic under the hood and more consistent expectations across working code, whether in a server or client runtime.

I do feel like it’s getting more and more difficult to understand the chasm of complexity between the code you write and the code that runs in the browser. I still think that, for many projects, there’s a lot of value and power in authoring code as it will be run in the browser. You [cheat entropy](https://blog.jim-nielsen.com/2020/cheating-entropy-with-native-web-tech/) and get [a simple but fast feedback cycle](https://blog.jim-nielsen.com/2023/rich-fast-loops-and-tradeoffs/).