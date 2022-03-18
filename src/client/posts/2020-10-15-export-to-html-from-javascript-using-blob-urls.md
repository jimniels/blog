#javascript

# Exporting to HTML from JavaScript Using Blob URLs

I was working on a project recently where I had a data structure in JavaScript that I wanted to export to an HTML representation. I’ve traditionally seen this done by using JavaScript to create an `<a>` link, set its `href` to a base-64 encoded data URI, set `target="_blank"`, etc. Something like this:

```js
function openHtmlInNewTab(html) {
  let a = document.createElement("a");
  a.setAttribute(
    "href",
    "data:text/html;charset=utf-8," + encodeURIComponent(html)
  );
  a.setAttribute("target", "_blank");
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
openHtmlInNewTab("<h1>Hello World</h1>");
```

[This post from ourcodeworld](https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server) does a great job outlining this kind of a solution. However, it also has a really interesting alternative solution that I personally found rather novel. It uses concepts in JavaScript that I’m not that familiar with yet, like [Blobs](https://developer.mozilla.org/en-US/docs/Web/API/Blob) and [.createObjectUrl](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL). I wanted to document the approach to help solidify it in my brain.

The post from ourcodeworld shows you how you can create a blob for a file (an HTML file for example), but then what do you do with it? Thanks to [this answer on StackOverlow](https://stackoverflow.com/a/16245768) I was able to figure that out: you create a blob URL. What is that? From [another StackOverflow answer](https://stackoverflow.com/questions/30864573/what-is-a-blob-url-and-why-it-is-used) (I’m overflowing the stack on StackOverflow pointers here):

> Blob URL/Object URL is a pseudo protocol to allow Blob and File objects to be used as URL source for things like images, download links for binary data, and so forth.
> 
> ...Instead of uploading the binary data [of an image, text file, etc.], then serve it back via an URL, it is better to use an extra local step to be able to access the data directly without going via a server.
>
> It is also a better alternative to Data-URI which are strings encoded as Base-64. The problem with Data-URI is that each char takes two bytes in JavaScript. On top of that a 33% is added due to the Base-64 encoding. Blobs are pure binary byte-arrays which does not have any significant overhead as Data-URI does, which makes them faster and smaller to handle.

So how do you work with these? First, the code.

```js
function dataToHtml(data) {
  let html = `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${data.some.value}</title>
      </head>
      <body>
        <h1>${data.some.otherValue}</h1>
        <hr />
        ${data.array.map((thing) => thing.nestedHtml).join("")}
      </body>
    </html>
  `;
  const blob = new Blob([html], { type: "text/html" });
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl, "_blank");
};
```

In essence, this takes your data in JavaScript, runs it through a template to create a string of HTML, creates that HTML file in-memory along with a corresponding URL from which you can view it, then opens that URL in the browser window. Neat!

That’s it. That’s all I have to share.

Side note: I find in-memory file blobs incredibly interesting. I first encountered them when looking at an [ES modules shim](https://github.com/guybedford/es-module-shims). The shim works by essentially doing the following:

1. Resolve the dependency graph for you (rather than having the browser do it) and fetch all the ES modules.
2. Parse all the ES modules and look for code relevant to module imports that isn’t yet natively supported in browsers.
3. Rewrite unsupported syntax in a way that today’s browsers will understand (i.e. bare imports like `import React from "react"` would get rewritten by leveraging an import map to something like `import React from "https://cdn.dev/react@16.3.0"`)
4. Create in-memory blob URLs for all rewritten ES modules.
5. Hand it over to the browser to parse, resolve, and execute your dependency graph via the blob URLs.

So, in essence, your entire dependency graph gets rewritten such that every ES module is no longer a file at an `https:` URL somewhere on the internet, but rather a file at a `blob:` URL stored in memory (the JavaScript file the shim fetched and rewrote). The browser then resolves that entire dependency tree from those in-memory blob URLs. Pretty cool!
