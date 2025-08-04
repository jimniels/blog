#html

# A Few Things About the Anchor Element’s href You Might Not Have Known

I’ve written previously about [reloading a document using only HTML](https://blog.jim-nielsen.com/2023/reloading-document-in-html-and-preserve-query-params/) but that got me thinking: What are all the values you can put in an anchor tag’s `href` attribute?

Well, [I looked around](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#href). I found some things I already knew about, e.g.

- Link protocols like `mailto:`, `tel:`, `sms:` and `javascript:` which deal with specific ways of handling links.
- Protocol-relative links, e.g. `href="//"`
- [Text fragments](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment/Text_fragments) for linking to specific pieces of text on a page, e.g. `href="#:~:text=foo"`

But I also found some things I didn’t know about (or only vaguely knew about) so I wrote them down in an attempt to remember them.

## href="#"

Scrolls to the top of a document. I knew that.

But I’m writing because `#top` will also scroll to the top _if_ there isn’t another element with `id="top"` in the document. I didn’t know that. 

([Spec](https://html.spec.whatwg.org/multipage/browsing-the-web.html#scrolling-to-a-fragment): “If _decodedFragment_ is an ASCII case-insensitive match for the string `top`, then return the top of the document.”)

**Update:** [HTeuMeuLeu pointed out to me on Mastodon](https://mastodon.social/@HTeuMeuLeu/114971342411854119) that you can use `#page=` to deep-link to a specific page in a PDF, e.g. `my-file.pdf#page42` would like to page 42 in the file.

## href=""

Reloads the current page, preserving the search string but removing the hash string (if present).

URL                  | `href=""` resolves to
-------------------- | ----------------------
`/path/`             | `/path/`
`/path/#foo`         | `/path/`
`/path/?id=foo`      | `/path/?id=foo`
`/path/?id=foo#bar`  | `/path/?id=foo`

## href="."

Reloads the current page, removing both the search and hash strings (if present).

**Note**: If you’re using `href="."` as a link to the current page, ensure your URLs have a trailing slash or you may get surprising navigation behavior. The path is interpreted as a file, so `"."` resolves to the parent directory of the current location.

URL                 | `href="."` resolves to
------------------- | ----------------------
`/path`             | `/`
`/path#foo`         | `/`
`/path?id=foo`      | `/`
`/path/`            | `/path/`
`/path/#foo`        | `/path/`
`/path/?id=foo`     | `/path/`
`/path/index.html`  | `/path/`


## href="?"

Reloads the current page, removing both the search and hash strings (if present). _However_, it preserves the `?` character.

**Note**: Unlike `href="."`, trailing slashes don’t matter. The search parameters will be removed but the path will be preserved as-is.

URL                 | `href="?"` resolves to
------------------- | ----------------------
`/path`             | `/path?`
`/path#foo`         | `/path?`
`/path?id=foo`      | `/path?`
`/path?id=foo#bar`  | `/path?`
`/index.html`       | `/index.html?`

## href="data:"

You can make links that navigate to [data URLs](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data). The super-readable version of this would be:

```html
<a href="data:text/plain,hello world">
  View plain text data URL
</a>
```

But you probably want `data:` URLs to be encoded so you don’t get unexpected behavior, e.g.

```html
<a href="data:text/plain,hello%20world">
  View plain text data URL
</a>
```

Go ahead and try it (FYI: may not work in your user agent). Here’s a <a href="data:text/plain,hello%20world" target="_blank">plain-text file</a> and an <a href="data:text/html,%3Ch1%3Ehello%20world%3C/h1%3E" target="_blank">HTML file</a>.

## href="video.mp4#t=10,20" 

[Media fragments](https://www.w3.org/TR/media-frags/) allow linking to specific parts of a media file, like audio or video.

[For example](https://indieweb.org/media_fragment), `video.mp4#t=10,20` links to a video. It starts play at 10 seconds, and stops it at 20 seconds.

([Support](https://caniuse.com/media-fragments) is limited at the time of this writing.)

## See For Yourself

I tested a lot of this stuff in the browser and via JS. I think I got all these right.

Thanks to [JavaScript’s URL constructor](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) (and the ability to pass a `base` URL), I could programmatically explore how a lot of these href’s would resolve.

Here’s a snippet of the test code I wrote. You can copy/paste this in your console and they should all pass 🤞

```js
const assertions = [
  // Preserves search string but strips hash
  // x -> { search: '?...', hash: '' }
  { href: '', location: '/path',               resolves_to: '/path' },
  { href: '', location: '/path/',              resolves_to: '/path/' },
  { href: '', location: '/path/#foo',          resolves_to: '/path/' },
  { href: '', location: '/path/?id=foo',       resolves_to: '/path/?id=foo' },
  { href: '', location: '/path/?id=foo#bar',   resolves_to: '/path/?id=foo' },
  
  // Strips search and hash strings
  // x -> { search: '', hash: '' }
  { href: '.', location: '/path',              resolves_to: '/' },
  { href: '.', location: `/path#foo`,          resolves_to: `/` },
  { href: '.', location: `/path?id=foo`,       resolves_to: `/` },
  { href: '.', location: `/path/`,             resolves_to: `/path/` },
  { href: '.', location: `/path/#foo`,         resolves_to: `/path/` },
  { href: '.', location: `/path/?id=foo`,      resolves_to: `/path/` },
  { href: '.', location: `/path/index.html`,   resolves_to: `/path/` },
  
  // Strips search parameters and hash string,
  // but preserves search delimeter (`?`)
  // x -> { search: '?', hash: '' }
  { href: '?', location: '/path',              resolves_to: '/path?' },
  { href: '?', location: '/path#foo',          resolves_to: '/path?' },
  { href: '?', location: '/path?id=foo',       resolves_to: '/path?' },
  { href: '?', location: '/path/',             resolves_to: '/path/?' },
  { href: '?', location: '/path/?id=foo#bar',  resolves_to: '/path/?' },
  { href: '?', location: '/index.html#foo',    resolves_to: '/index.html?'}
];

const assertions_evaluated = assertions.map(({ href, location, resolves_to }) => {
  const domain = 'https://example.com';
  const expected = new URL(href, domain + location).toString();
  const received = new URL(domain + resolves_to).toString();
  return {
    href,
    location,
    expected: expected.replace(domain, ''),
    received: received.replace(domain, ''),
    passed: expected === received
  };
});

console.table(assertions_evaluated);
```