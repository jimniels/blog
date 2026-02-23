import fs from "fs";
import { html, readFile } from "./utils.js";
import { Icon } from "./Icon.js";

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

          <!-- Prefetch navigational pages -->
          <link rel="prefetch" href="/menu/" />
          <link rel="prefetch" href="/search/" />

          <!-- Dynamic <head> content where applicable -->
          ${head}
        </head>
        <body>
          <nav class="navv wrapper" hidden>
            <a
              href="/"
              title="Jim Nielsen’s Blog"
              aria-label="Jim Nielsen’s Blog"
              ${path === "/" && "aria-current='page'"}
              ${path === "/" ||
              ["/menu/", "/search/", "/subscribe/"].includes(path)
                ? "hidden"
                : ""}
            >
              Jim’s Blog
            </a>

            ${["/menu/", "/search/", "/subscribe/"].includes(path)
              ? html`<a
                  href="/"
                  onclick="document.referrer ? history.back() : window.location.href = '/'; return false;"
                  title="Close menu (back)"
                  aria-label="Close menu (back)"
                  >${Icon("heroicon-close")}</a
                >`
              : html`
                  <a href="/subscribe/" aria-label="Subscribe" title="Subscribe"
                    >${Icon("heroicon-rss")}</a
                  >
                  <a href="/search/" aria-label="Search" title="Search"
                    >${Icon("heroicon-search")}</a
                  >
                  <a href="/menu/" aria-label="Menu" title="Menu"
                    >${Icon("heroicon-menu")}</a
                  >
                `}
          </nav>
          ${children}
        </body>
      </html>
    `
  );
}
