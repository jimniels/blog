# LLMs and Naming Things

In [Simon’s talk](https://notes.jim-nielsen.com/#2023-09-08T1227) around practical use of LLMs, he quotes the famous saying about there being two hard problems in computer science: 1) cache invalidation and 2) naming things.

Then he unapologetically says the “naming things” problem is solved with LLMs. Here’s Simon:

> [When asking for help naming things] Always ask it for lots and lots of options, because the first few will always be garbage and obvious but by the time you get to the end you'll get something that might not be what you want, but it will be the spark of inspiration that gets you to the thing that you need.

I like this articulation. It sums up pretty well my own experience with LLMs thus far: they might not give you exactly what you want, but they can give you the spark of inspiration that allows you to pull from your own creative well and produce the thing that you need.

In the case of naming, the other day I was trying to name a collection of API schemas when working with [Zod](https://zod.dev). I needed a good naming convention to differentiate between the varying payloads for request and response types.

So I asked ChatGPT, given an structure like this:

```js
const apiSchemas = {
  'GET /v0/files': z.object({...}),
  'GET /vo/files/:uuid': z.object({...}),
  'DELETE /v0/files/:uuid': z.object({...})
}
```

What’s a good naming convention so I can differentiate between the request and response types for each of those endpoints?

ChatGPT’s response was something along the lines of the following.

Try the “suffix convention” which looks like this:

```js
const apiSchemas = {
  'GET /v0/files/request': z.object({...}),
  'GET /v0/files/:uuid/request': z.object({...}),
  'DELETE /v0/files/:uuid/request': z.object({...}),
  'GET /v0/files/response': z.object({...}),
  'GET /v0/files/:uuid/response': z.object({...}),
  'DELETE /v0/files/:uuid/response': z.object({...})
};
```

Or the “prefix convention” which looks like this:

```js
const apiSchemas = {
  'request.GET /v0/files': z.object({...}),
  'request.GET /v0/files/:uuid': z.object({...}),
  'request.DELETE /v0/files/:uuid': z.object({...}),
  'response.GET /v0/files': z.object({...}),
  'response.GET /v0/files/:uuid': z.object({...}),
  'response.DELETE /v0/files/:uuid': z.object({...})
};
```

Or the “grouping convention” which looks like this:

```js
const apiSchemas = {
  request: {
    'GET /v0/files': z.object({...}),
    'GET /v0/files/:uuid': z.object({...}),
    'DELETE /v0/files/:uuid': z.object({...})
  },
  
  response: {
    'GET /v0/files': z.object({...}),
    'GET /v0/files/:uuid': z.object({...}),
    'DELETE /v0/files/:uuid': z.object({...})
  }
};
```

Those all seemed pretty good but I wanted a few more examples to think through, especially because I liked having the path first.

So I prompted ChatGPT to give me more examples similar to:

`/v0/files GET <request>`

It responded with the pattern I ended up following which was more of flat structure, e.g.

```js
const apiSchemas = {
  '/v0/files.GET.request': z.object({...}),
  '/v0/files.GET.response': z.object({...}),
  '/v0/files/:uuid.GET.request': z.object({...}),
  '/v0/files/:uuid.GET.response': z.object({...}),
  '/v0/files/:uuid.DELETE.response': z.object({...}),
  '/v0/files/:uuid.POST.request': z.object({...}),
  '/v0/files/:uuid.POST.response': z.object({...})
};
```

Anyhow, that’s a long-winded way of saying that LLMs have been hit or miss in a variety of use cases for me. However, to Simon’s point, they have helped me with naming things.

Makes me wonder if, had ChatGPT shown up a few years earlier, I would’ve tried: “What are some names for baby boys that are timeless but not overused...”

(The future: “Mommy, Daddy, where did my name come from?” / “Let’s start with what a large language model is…”)