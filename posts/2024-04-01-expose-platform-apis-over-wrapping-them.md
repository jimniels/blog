# Expose Platform APIs Over Wrapping Them

From Kent C. Dodds’ article about [why he won’t be using Next.js](https://www.epicweb.dev/why-i-wont-use-nextjs):

> One of the primary differences between enzyme and Testing Library is that while enzyme gave you a wrapper with a bunch of (overly) helpful (dangerous) utilities for interacting with rendered elements, Testing Library gave you the elements themselves. To boil that down to a principle, I would say that instead of wrapping the platform APIs, Testing Library exposed the platform APIs.

I’ve been recently working in a Next.js app and a lot of Kent’s critiques have resonated with my own experience, particularly this insight about how some APIs wrap platform ones rather than exposing them.

For example, one thing I struggled with as a n00b to Next is putting metadata in an HTML document. If you want a `<meta>` tag in your HTML, [Next has a bespoke (typed) API dedicated to it](https://nextjs.org/docs/app/api-reference/functions/generate-metadata).

I understand _why_ that is the case, given how Next works as an app/routing framework which dynamically updates document metadata as you move from page to page. Lots of front-end frameworks have similar APIs.

However, [I prefer writing code as close as possible to how it will be run](https://blog.jim-nielsen.com/2020/cheating-entropy-with-native-web-tech/), which means staying as close as possible to platform APIs.

Why? For one, standardized APIs make it easy to shift from one tool to another while remaining productive. If I switch from tool A to tool B, it’d be a pain to relearn that `<div>` is written as `<divv>`.

Additionally, you don’t solely write code. You also run it and debug it. When I open my webpage and there’s a 1:1 correspondence between the `<meta>` tags I see in the devtools and the `<meta>` tags I see in my code, I can move quickly in debugging issues and trusting in the correctness of my code.

In other words, the closer the code that’s written is to the code that’s run, the faster I can move with trust and confidence. However, when I require documentation as an intermediary between what I see in the devtools and what I see in my code, I move slower and with less trust that I’ve both understood and implemented correctly what is documented.

With Next, what I write _compiles to HTML_ which is what the browser runs. With plain HTML, what I write is what the browser runs. It’s weird to say writing plain HTML is “closer to the metal” but here we are ha!

That said, again, I realize why these kinds of APIs exist in client-side app/routing frameworks. But with Next in particular, I’ve encountered a lot of friction taking my base understanding of HTML APIs and translating them to Next’s APIs. Allow me a specific example.

## An Example: The Metadata API

The basic premise of Next’s metadata API starts with the idea that, in order to get some `<meta>` tags, you use the key/value pairs of a JS object to generate the `name` and `content` values of a `<meta>` tag. For example:

```js
export const metadata = {
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
}
```

Will result in:

```html
<meta name="generator" content="Next.js" />
<meta name="application-name" content="Next.js" />
<meta name="referrer" content="origin-when-cross-origin" />
```

Simple enough, right? camelCased keywords in JavaScript translate to their hyphenated counterparts, that’s all pretty standard web API stuff.

But what about when you have a `<meta>` tag that doesn’t conform to this simple one-key-to-one-value mapping? For example, let’s say you want the `keywords` meta tag which can have multiple values (a comma-delimited list of words):

```html
<meta name="keywords" content="Next.js,React,JavaScript" />
```

What’s the API for that? Well, given the key/value JS object pattern of the previous examples, you might think something like this:

```js
export const metadata = {
  keywords: 'Next.js,React,JavaScript'
}
```

Minus a few special cases, [that’s how Remix does it](https://remix.run/docs/en/main/route/meta). But not in Next. According to the docs, it’s this:

```js
export const metadata = {
  keywords: ['Next.js', 'React', 'JavaScript'],
}
```

“Ah ok, so it’s not just key/value pairing where `value` is a string. It can be a more complex data type. I guess that makes sense.” I say to myself.

So what about other meta tags, like the ones whose `content` is a list of key/value pairs? For example, this tag:

```html
<meta
  name="format-detection"
  content="telephone=no, address=no, email=no"
/>
```

How would you do _that_ with a JS object? Initially you might think:

```js
export const metadata = {
  formatDetection: 'telephone=no, address=no, email=no'
}
```

But after what we saw with `keywords`, you might think:

```js
export const metadata = {
  formatDetection: ['telephone=no', 'address=no', 'email=no']
}
```

But this one is yet another data type. In this case, `content` is now expressed as a nested object with more key/value pairs:

```js
export const metadata = {
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}
```

To round this out, let’s look at one more example under the [“Basic fields”](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#basic-fields) section of the docs.

```js
export const metadata = {
  authors: [
    { name: 'Seb' },
    { name: 'Josh', url: 'https://nextjs.org' }
  ],
}
```

This configuration will produce `<meta>` tags _and_ a `link` tag.

```html
<meta name="author" content="Seb" />
<meta name="author" content="Josh" />
<link rel="author" href="https://nextjs.org" />
```

“Ah oh, so the `metadata` keyword export isn’t solely for creating `<meta>` tags. It’ll also produce `<link>` tags. Got it.” I tell myself.

So, by solely looking at the “Basics” part of the docs, I’ve come to realize that to produce `<meta>` tags in my HTML I should use the `metadata` keyword export which is an object of key/value pairs where `value` can be a string, an array, an object, or even an array of objects! All of which will produce `<meta>` tags or `<link>` tags.

Ok, I think I got it.

## Not So Fast: A Detour to Viewport

While you might think of the viewport meta tags as part of the metadata API, they’re not. Or rather, they _were_ but [got deprecated in Next 14](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#viewport). 

> Deprecated: The viewport option in metadata is deprecated as of Next.js 14. Please use the viewport configuration instead.

[insert [joke](https://mastodon.social/@jimniels/112179860705354768) here about how the `<meta>` tag in HTML is never gonna give you up, never gonna let you down, never gonna deprecate and desert you]

Ok so [viewport has its own configuration API](https://nextjs.org/docs/app/api-reference/functions/generate-viewport). How does it work?

Let's say I want a viewport tag:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
/>
```

What’s the code for that? Given our knowledge of the metadata API, maybe we can guess it.

Since it gets its own named export, `viewport`, I assume the `content` part of the tag will represent the key/value pairs of the object? 

And yes, that’s about right. Here's the code to get that tag:

```js
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}
```

Ok, I guess that kinda makes sense. `false` = `no` and all, but I see what’s going on.

But the `viewport` export also handles other tags, not just `<meta name="viewport">`. Theme color is also under there. You want this tag?

```html
<meta name="theme-color" content="black" />
```

You might’ve thought it’s this:

```js
export const metadata = { themeColor: 'black' }`
```

But according to the docs it's part of the `viewport` named export:

```js
export const viewport = { themeColor: 'black' }
```

And what if you want multiple theme color meta tags?

```html
<meta
  name="theme-color"
  media="(prefers-color-scheme: light)"
  content="cyan"
/>
<meta
  name="theme-color"
  media="(prefers-color-scheme: dark)"
  content="black"
/>
```

Well that’s the `viewport` named export but instead of a string you give it an array of objects:

```
export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'cyan' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}
```

Ok, I guess this all kind of makes sense — in its own self-consistent way, but not necessarily in the context of the broader web platform APIs…

## Back to Our Regularly Scheduled Programming: Next’s Metadata API

Ok so, given everything covered above, let’s play a little game. I give you some HTML and you see if you can guess its corresponding API in Next. Ready?

```html
<link
  rel="canonical"
  href="https://acme.com"
/>
<link
  rel="alternate"
  hreflang="en-US"
  href="https://acme.com/en-US"
/>
<link
  rel="alternate"
  hreflang="de-DE"
  href="https://acme.com/de-DE"
/>
<meta
  property="og:image"
  content="https://acme.com/og-image.png"
/>
```

Go ahead, I’ll give you a second. See if you can guess it...

Have you tried? I’ll keep waiting...

Got it?

Ok, here’s the answer:

```js
export const metadata = {
  metadataBase: new URL('https://acme.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    images: '/og-image.png',
  },
}
```

That’s it. That’s what will produce the HTML snippet I gave you. Apparently there’s a whole [“convenience” API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase) for prefixing metadata fields with fully qualified URLs.

You’ve heard of CSS-in-JS? Well this is HTML-in-JS. If you wish every HTML API was just a (typed) JavaScript API, this would be right up your alley. No more remembering how to do something in HTML. There’s a JS API for that.

And again, I get it. Given the goals of Next as a framework, I understand why this exists. But there’s definitely a learning curve that’s feels divergent to the HTML pillar of the web.

Contrast that, for one moment, with something like this which (if you know the HTML APIs) requires no referencing docs:

```js
const baseUrl = 'https://acme.com';

export const head = `
  <link
    rel="canonical"
    href="${baseUrl}"
  />
  <link
    rel="alternate"
    hreflang="en-US"
    href="${baseUrl}/en-US"
  />
  <link
    rel="alternate"
    hreflang="de-DE"
    href="${baseUrl}/de-DE"
  />
  <meta
    property="og:image"
    content="${baseUrl}/og-image.png"
  />
`;
```

I know, I know. There’s tradeoffs here. But I think what I'm trying to get at is what I expressed earlier: there’s a clear, immediate correspondence in this case between the code I write and what the browser runs. Plus this knowledge is transferable. This is why, to Kent’s point, I prefer exposed platform APIs over wrapped ones.


## Conclusion

I only briefly covered parts of Next’s metadata API. If you look closer at the docs, you’ll see APIs for generating `<meta>` tags related to open graph, robots, icons, theme color, manifest, twitter, viewport, verification, apple web app, alternates, app links, archives, assets, bookmarks, category, and more.

Plus there’s all the stuff that you can use in “vanilla” HTML but that’s [unsupported in the metadata API in Next](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#unsupported-metadata).

This whole post might seem like an attempt to crap on Next. It’s not. As Kent states in his original article:

> Your tool choice matters much less than your skill at using the tool to accomplish your desired outcome 

I agree.

But I am trying to work through articulating why I prefer  tools that expose underlying platform APIs over wrapping them in their own bespoke permutations. To generalize Kent’s original articulation:

**Expose platform APIs over wrapping them.**

It reminds me of [this note I took from an article from the folks building HTMX](https://notes.jim-nielsen.com/#2024-01-17T2100):

> Whenever a problem can be solved by native HTML elements, the longevity of the code improves tremendously as a result. This is a much less alienating way to learn web development, because the bulk of your knowledge will remain relevant as long as HTML does.

Well said.