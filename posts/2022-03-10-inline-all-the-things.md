#html #jsTemplating

# Inline All The Things

I’ve been meaning to blog about technical stuff I’ve done with my blog as of late, but never got around to it.

Then I read Chris’ piece [“How to make MPAs that are as fast as SPAs”](https://gomakethings.com/how-to-make-mpas-that-are-as-fast-as-spas/) and almost every single thing he outlined was a technique I’d implemented on my blog, so I figured that gave me a good writing outline wherein I could describe my experience.

Here’s Chris’ high-level summary of how he makes his sites fast:

> 1. Serve pre-rendered, mostly static HTML.
> 2. Inline everything, including CSS and JavaScript.
> 3. Use mostly platform-native JavaScript, and as little of it as possible.
> 4. Minify and gzip all the things.
> 5. Lean heavily on service workers.

The following is my experience with each of the above (as it relates to my blog—I get it, not all sites have the constraints and needs of a personal blog, so caveat noted).

## Pre-rendered, Static HTML

Grade: 👍

I use the static site generator Metalsmith to build my site. Build tooling and hosting is all through Netlify. Not much else to add here. Static files on a CDN are my jam — JAMstack you might say.

## Inline Everything

Grade: 👍

While I want to inline as much as possible for every document, I also want to continue authoring everything in componentized files.

This is what I was doing previously and represents the code delivered to the client:

```html
<head>
  <link rel="stylesheet" href="assets/css/modern-normalize.css">
  <link rel="stylesheet" href="assets/css/styles.css">
  <link rel="stylesheet" href="assets/css/atom-one-light.css">
  <link
    rel="stylesheet"
    href="assets/css/atom-one-dark.css"
    media="screen and (prefers-color-scheme: dark)"
  >
</head>
```

This code dictates the browser fetch four stylesheets for a single page. I wanted to inline all those requests but also continue to author my code in individual files.

Rather than bringing in the kitchen sink and setting up a bundler, I opted for a no-dependecy solution using the tools already available in my build process, which is based on node.js ([templates are vanilla JS](https://blog.jim-nielsen.com/2021/javascript-templating/)).

Now I reference those style files in my template and my build process reads the files and inlines them to the HTML.

```js
<head>
  <style>
    ${[
      "./assets/css/modern-normalize.css",
      "./assets/css/styles.css",
      "./assets/css/atom-one-light.css"]
        .map(importFile)
        .join("")}

    @media screen and (prefers-color-scheme: dark) {
      ${importFile("./assets/css/atom-one-dark.css")}
    }
  </style>
</head>
```

What this means is, rather than four file requests per user agent at runtime, I read those four files from disk at build time and embed them directly into the HTML file resulting in a single request for the user agent. This allows me to continue authoring files as modularly as I want without 1) a cost to the end user, and 2) a bundler dependency.

That `importFile` function is a simple helper which takes a file path, reads the file from disk, and inserts its contents directly into the template.

```js
const importFile = (filepath) =>
  fs.readFileSync(join(__dirname, filepath)).toString();
```

This is not only useful for CSS, but other files I want to author independent of my HTML document but then embed at build time—like SVG or JavaScript files.

For example, here’s a template before I begin inlining everything:

```js
<head>
  <link rel="stylesheet" href="./my-styles.css">
</head>
<body>
  <img src="./my-logo.svg">
  <!-- Some HTML -->
  <script type="module" src="./my-script.js"></script>
</body>
```

Here’s that template after:

```js
<head>
  <style>${importFile("./my-styles.css")}</style>
</head>
<body>
  ${importFile("./my-logo.svg")}  
  <!-- Some HTML -->
  <script type="module">${importFile("./my-script.js")}</script>
```

Again, no complex bundler dependency needed. Just node reading files from disk. 

In this way, only one request comes over the network: the source HTML. In many cases, nothing else is needed to render the page. 

<img src="https://cdn.jim-nielsen.com/blog/2022/inline-everything-one-request.png" width="1118" height="879" alt="Screenshot of Safari with the developer tools open on a page of blog.jim-nielsen.com and only one network request is being made (for the URL’s HTML document)." /> 

For posts which use the `<img>` tag, those are the only additional network requests.

<img src="https://cdn.jim-nielsen.com/blog/2022/inline-everything-multiple-requests.png" width="1118" height="879" alt="Screenshot of Safari with the developer tools open on a page of blog.jim-nielsen.com and the only network requests being made beyond the source HTML document is for any image tags in the document." /> 

## Use platform-native JavaScript

Grade: 👍

Remember how sometimes you have to ask, “what if the JavaScript doesn’t load?” That’s not a worry in this case, as the little JavaScript I have gets embedded directly into the HTML document. Loading JS won’t fail because of a network call to a linked script.

Granted, JS can still fail because of other reasons—like using syntax unsupported in a given browser, or a bug (I do write those from time to time).

My blog doesn’t have much JavaScript, and where it does I’m using web components (another blog post on that soon). It doesn’t need lots of JS either, it’s a bunch of static documents for reading. And the fancy UX of the site, to me, is how fast it loads. Every document is one request, plus any external images. That’s it.

## Minify & Gzip

Grade: 👍

I don’t minify. I probably should. I once setup a branch with a step in the build to minify all the output. But when I compared the resulting feature preview branch with my production branch, the minification savings were so negligible I didn’t bother tidying up the PR and adding the additional complexity to my codebase. Maybe I’ll go back and do that some time—that’s another good blog post.

That said, I do Gzip. Or rather, my host Gzips. Actually, [Netlify uses Brotli](https://www.netlify.com/blog/2020/05/20/gain-instant-performance-boosts-as-brotli-comes-to-netlify-edge/). Get yourself a good host and you won’t have to worry about this.

## Service Workers

Grade: 👎

I’m not doing this one. Honestly, I haven’t felt compelled to do it for my blog yet but I can understand the recommendation.

## Conclusion

What I’ve found neat about all this inlining is how fast the site is. For example, on a mobile device (with a decent network connection) page loads are nigh instantaneous which really makes the UI/UX for transitioning between pages in a browser shine. 

<img src="https://cdn.jim-nielsen.com/blog/2022/inline-all-things-blog.gif" width="356" height="766" alt="GIF showing page transitions in mobile Safari for blog.jim-nielsen.com" />

This is super helpful for me because my blog is increasingly becoming a second-brain of notes which I reference all the time, so making it easy to navigate and find my notes quickly is important.