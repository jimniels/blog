import fs from "fs";
import { html, readFile } from "./utils.js";

const comment = `
<!--



👋
Want to read the code behind this code?
It’s available on GitHub.
https://www.github.com/jimniels/blog/



-->
`;

/**
 * Children will do: Page({...}, html`<main {class="{wrapper|copy}"}?>...</main>`)
 * @type {import("types").PageLayout}
 */
export function Page(props, children) {
  const {
    site: { origin, tags, name },
    page: { head = "", path, title },
  } = props;

  return (
    "<!DOCTYPE html>" +
    comment +
    html`
      <html lang="en-us" id="top" data-path="${path}">
        <head>
          <title>${title && `${title} - `}${name}</title>

          <link rel="stylesheet" href="/styles.css" />
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="author" content="Jim Nielsen" />
          <meta
            name="description"
            content="Writing about the big beautiful mess that is making things for the world wide web."
          />
          <link rel="me" href="https://github.com/jimniels" />
          <link rel="me" href="https://twitter.com/jimniels" />
          <link rel="me" href="https://mastodon.social/@jimniels" />
          <link rel="me" href="https://dribbble.com/jimniels" />
          <link rel="preconnect" href="https://cdn.jim-nielsen.com" />

          <script
            type="module"
            src="https://www.jim-nielsen.com/jim-navbar.js"
          ></script>

          <!-- Feeds -->
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS: XML Feed"
            href="/feed.xml"
          />
          <link
            rel="alternate"
            type="application/json"
            title="RSS: JSON Feed"
            href="/feed.json"
          />
          <link
            rel="alternate"
            type="application/mf2+html"
            title="RSS: HTML Feed"
            href="/feed.html"
          />

          <script>
            ${readFile("./theme.js")};
          </script>

          <!-- Dynamic <head> content where applicable -->
          ${head}
        </head>
        <body>
          <jim-navbar></jim-navbar>

          <nav class="navv wrapper">
            <a href="/" ${path === "/" && "aria-current='page'"}>
              Jim Nielsen’s Blog
            </a>

            ${["/menu/", "/search/"].includes(path)
              ? html`<a
                  href="/"
                  onclick="document.referrer ? history.back() : window.location.href = '/'; return false;"
                  aria-label="Close menu (back)"
                  >${readFile("./svgs/heroicon-close.svg")}</a
                >`
              : html`
                  <a href="/search/"
                    >${readFile("./svgs/heroicon-search.svg")}</a
                  >
                  <a href="/menu/">${readFile("./svgs/heroicon-menu.svg")}</a>
                `}
          </nav>

          ${children}
        </body>
      </html>
    `
  );
}
