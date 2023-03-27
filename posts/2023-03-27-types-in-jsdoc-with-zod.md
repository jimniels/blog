# Types in JavaScript With Zod and JSDoc

There are cases where I like types in JavaScript. And I don’t mind Typescript, especially for bigger projects — as long as somebody more knowledgable than me sets it up and maintains it.

When I want type hints in VSCode for smaller, personal projects, I use [JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) which lets you declare types inside plain, old JavaScript comments — you can even share them across files!

```js
// file: file-1.js
/**
 * @typedef Candy
 * @property {string} name
 * @property {"chocolate"|"gummy"} type
 */
 
// file: file-2.js
/** @type { import('./file-1').Candy[] } */
const candy = [
  { name: "Kit Kat", type: "chocolate" },
  { name: "Peach Rings", type: "gummy" },
];
```

If you’re using VSCode, that means no compiling/transpiling/configuration necessary. Type hints work out of the box.

<img src="https://cdn.jim-nielsen.com/blog/2023/zod-jsdoc-1.png" width="690" height="193" alt="Screenshot of code in VSCode with type hints on a JSDoc comment." />

In addition, sticking `@ts-check` at the top of the file will give you type checking on code in the file, red squiggles and all.

<img src="https://cdn.jim-nielsen.com/blog/2023/zod-jsdoc-2.png" width="829" height="360" alt="Screenshot of code in VSCode with type error checking enabled via `@ts-check`." />

This is great because it gives me type hints and checks as I code. But sometimes I also want the benefits of my types _at runtime_. JSDoc won’t give me that. Not even Typescript will give me that, as it only works up to compile time.

For runtime, you need something like [Zod](https://zod.dev/), which lets you write your type schemas, then infer them as Typescript types automatically.

```ts
// Declare your schema with zod
const CandySchema = z.object({
  name: z.string(),
  type: z.enum(["chocolate", "gummy"]),
});

// Extract the type for typescript
type Candy = z.infer<typeof CandySchema>;

// Instead of re-writing it like this
type Candy = {
  name: string;
  type: "chocolate" | "gummmy";
};
```

But what if you don’t want to write `.ts` files? What if you’re writing regular old `.js` files with JSDoc comments? Can you infer your Zod types in JSDoc?

It appears[^1] you can!

```js
// Declare your schema with zod
const CandySchema = z.object({
  name: z.string(),
  type: z.enum(["chocolate", "gummy"]),
});

// Extract the inferred type as a JSDoc type
/** @typedef { z.infer<typeof CandySchema> Candy } */

// Instead of re-writing it as a JSDoc type like this
/**
 * @typedef Candy
 * @property {string} name
 * @property {"chocolate"|"gummy"} type
 */
```

With this approach, you “declare your types” with Zod in regular JavaScript files and then you can 1) use them at runtime and 2) extract them as JSDoc types and use them as hints in your editor.

```js
// file: file-1.js
const CandySchema = z.object({
  name: z.string(),
  type: z.enum(["chocolate", "gummy"]),
});
/** @typedef { z.infer<typeof CandySchema> Candy } */

// file: file-2.js
/** @type { import('./file-1').Candy[] } */
const candy = [
  { name: "Kit Kat", type: "chocolate" },
  { name: "Peach Rings", type: "gummy" },
];
```

A `@ts-check` at the top of the file gives you red squiggles type checking in the file too — no `.ts` files required!

Again, the beauty of this approach is that _it’s all JavaScript_. You don’t have to compile/transpile/configure anything. The code you write is 100% valid JavaScript you can dump straight into the browser, but it also provides you a nice DX in VSCode as you program.

In my particular case, I use this on a SSG project where I want to 1) ensure the data flowing through my site generator is correct by using runtime (i.e. _build time_) type checking, and 2) get nice hints directly in my editor as to the shape of my data as well as in-file squiggles for any errors.

It’s just enough to help me be productive without requiring I setup and maintain Typescript tooling over time.

[^1]: It was harder than I thought to find out about JSDoc + Zod online, but thanks to [this gist](https://gist.github.com/pmuellr/60668d33049f96ce7323f5eab648f468) I was able to figure it out. So, I figured I’d write a quick blog post in case anyone in the future ever wants to know if you can infer types using Zod with JSDoc comments in plain JavaScript files.