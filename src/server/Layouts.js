import fs from "fs";
import { html, readFile } from "./utils.js";
import { NavPill } from "../routes/index.html.js";

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

          <!-- Prefetch navigational pages -->
          <link rel="prefetch" href="/menu/" />
          <link rel="prefetch" href="/search/" />

          <!-- Dynamic <head> content where applicable -->
          ${head}
        </head>
        <body>
          <div class="nav-pill">
            <input type="checkbox" id="t" class="nav-pill__menu-toggle" />
            ${NavPill({ name: "Blog", className: "border" })}

            <div
              class="nav-pill__menu"
              onClick="document.querySelector('t').checked = false"
            >
              ${NavPill({ name: "Blog", className: "active" })}
              ${NavPill({ name: "Notes" })} ${NavPill({ name: "Home" })}

              <a href="/archive/">Archive</a>
              <a href="/tags/">Tags</a>
              <a href="/about/external-links/">External Links</a>
              <a href="/about/internal-links/">Internal Links</a>
              <a href="/search/">Search</a>
            </div>
          </div>
          <nav class="navv wrapper">
            <a
              href="/"
              title="Jim Nielsen’s Blog"
              aria-label="Jim Nielsen’s Blog"
              ${path === "/" && "aria-current='page'"}
            >
              ${readFile("./svgs/initial.svg")}
            </a>

            ${["/menu/", "/search/"].includes(path)
              ? html`<a
                  href="/"
                  onclick="document.referrer ? history.back() : window.location.href = '/'; return false;"
                  aria-label="Close menu (back)"
                  >${readFile("./svgs/heroicon-close.svg")}</a
                >`
              : html`
                  <a href="/search/" aria-label="Search"
                    >${readFile("./svgs/heroicon-search.svg")}</a
                  >
                  <a href="/menu/" aria-label="Menu"
                    >${readFile("./svgs/heroicon-menu.svg")}</a
                  >
                `}
          </nav>

          ${children}
        </body>
      </html>
    `
  );
}
