---
tags: engineering tips
---

# A Node.js Helper Function for Accessing the CommonJS Equivalent of __dirname in ES Modules.

## tldr;

Put this in a `helpers.js` or `utils.js` file in your project and you’re good to go.

```js
import { fileURLToPath } from 'url';
import { dirname } from 'path';
/**
 * Given a file path, return the CJS equivalent of `__dirname`
 * @param {String} importMetaUrl - Should be `import.meta.url`
 * @returns {String}
 */
export function getDirname(importMetaUrl) {
  return dirname(fileURLToPath(importMetaUrl));
}
```

## Explaining the Code

If you’re switching to ES modules in Node.js you’re going to find a few global helpers are missing. One of the most common ones that I miss the most is the global `__dirname`. You can’t just type that and get the current working directory of the file being executed.

No worries thought, the [Node.js docs have you covered](https://nodejs.org/api/esm.html#esm_no_code_require_code_code_exports_code_code_module_exports_code_code_filename_code_code_dirname_code):

> [some] CommonJS variables are not available in ES modules...`__dirname` can be created inside of each file via `import.meta.url`.

And they give the following example in the docs:

```js
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

Ok, that’s cool. But I don’t want to have to remember and type that every time I just want `__dirname` in a file.

“So abstract it into a function in a `helpers.js` file in your project, Jim!” That’s a good idea.

```js
// /path/to/project/root/helpers.js
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export function getDirname() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return __dirname
}
```

Ah but that’s not going to work. Why? Because `import.meta.url` is going to return a `file:///` path to that specific `helpers.js` file. So if you import `getDirname` from a file deep in your project somewhere, it’s going to return the directory name of the `helpers.js` file, not the directory of the file importing the function. Example:

```js
// Let's say `helpers.js` lived here:
//   /path/to/project/root/helpers.js

// And now you were gonna import `getDirname` from here:
//  /path/to/project/root/components/layouts/MyThing.js
import { getDirname } from "../../helpers.js";
const __dirname = getDirname();
console.log(__dirname);
// -> /path/to/project/root
```

The problem is that `import.meta.url` is specific to the file in which it is called.

Ok, we can get around that. Pass `import.meta.url` as the first argument to `getDirname` when invoking it. And modify the `getDirname` function to take one parameter representing the `file:///` path of the file invoking the function.

Here’s what your final code would look like:

```js
// /path/to/project/root/helpers.js
import { fileURLToPath } from 'url';
import { dirname } from 'path';
export function getDirname(importMetaUrl) {
	return fileURLToPath(dirname(importMetaUrl));
}

// /path/to/project/root/components/layouts/MyThing.js
import { getDirname } from "../../helpers.js";
const __dirname = getDirname(import.meta.url);
console.log(__dirname);
// -> /path/to/project/root/components/layouts
```

That’s it. A Node.js helper function for accessing the CommonJS equivalent of `__dirname` in ES modules.
