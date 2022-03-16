#deno

# Deno is Webby (pt. 2)

The Deno team recently shipped [_Deno by example_](https://examples.deno.land/):

> _Deno by example_ is a collection of annotated examples for how to use Deno, and the various features it provides.

It’s a pretty neat little reference.

I browsed through each of the examples and one thing I noticed, [which I’ve blogged about before](https://blog.jim-nielsen.com/2021/deno-is-webby/), is how “webby” Deno is. Meaning, its APIs are (as much as possible) the web platform JavaScript APIs.

For example, look at the recommendations for doing [input prompts](https://examples.deno.land/prompts): it’s the `alert`, `confirm`, and `prompt` JavaScript APIs. No new APIs, just the ones you know and love.

In other words: are you building a CLI tool and need to capture some input from the user? No need to find, vet, install, and learn some third-party input library. Use what you know.

```js
const name = prompt("Please enter your name:");
console.log("Name:", name);
```

Continuing on the theme of a CLI tool, what if you need to log some output with a dash of style, like colors or font styles? Again, no need to find, vet, install, and learn a third-party library. You can [log and style CLI output](https://examples.deno.land/color-logging) the same way you do it in the browser’s developer tools: using what you know with `console.log`

```js
console.log("%cHello World", "color: red");
```

<img src="https://cdn.jim-nielsen.com/blog/2022/deno-examples-console-log.png" width="803" height="771" alt="Screenshot of Safari with the developer tools open on examples.deno.land showing a console.log command with colors." /> 

The point is: You Might Not Need NPM™. Deno strives to mimic web platform APIs wherever possible. Commands like `alert` and `console.log` are available as globals in Deno (while non-standard web APIs you’ll find under the `Deno` global).

It reminds me of [Ryan Florence’s](https://remix.run/blog/not-another-framework) article where he touts one of the benefits of Remix is that you learn the web platform as you learn Remix. It’s not all proprietary framework knowledge that will one day go extinct.

> When you learn how to handle requests and send responses in Remix, you're actually learning the Web Fetch API that's in the browser already…This knowledge transfers!

I find Deno similar: if you learn server-side JavaScript with Deno, you might accidentally learn the web platform along the way. It’s transferrable knowledge.

So you can:

1. Learn the tool and, in the process, learn the platform.
2. Or, learn the tool and, in the process, learn nothing else — when the tool fades, so does your knowledge.

This is what I love about Deno: always bet on the web.