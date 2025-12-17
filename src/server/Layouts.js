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
    site: { origin, tags, name, posts },
    page: { head = "", path, title },
  } = props;

  const postCountsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear();
    if (!acc[year]) {
      acc[year] = 0;
    }
    acc[year]++;
    return acc;
  }, {});

  const postTagsByCount = Object.entries(
    posts.reduce((acc, post) => {
      post.tags.forEach((tag) => {
        if (!acc[tag]) {
          acc[tag] = 0;
        }
        acc[tag]++;
      });
      return acc;
    }, {})
    // ).sort((a, b) => b[1] - a[1]);
  ).sort((a, b) => (b[0] > a[0] ? -1 : 1));

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
            src="https://cdn.jim-nielsen.com/shared/jim-site-switcher.js"
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
          ${
            /*<script>
            ${fs
              .readFileSync(
                "/Users/jimnielsen/Dropbox/cdn/shared/jim-site-switcher.js"
              )
              .toString()};
          </script>*/ ""
          }

          <style>
            body {
              margin-left: 280px;
              margin-top: var(--s-24);
            }
            .navv {
              display: none;
            }
            .nnav {
              position: fixed;
              left: 0;
              width: 280px;
              top: 0;
              height: 100%;
              overflow-y: auto;
              font-size: 0.825rem;
              padding: var(--s-16);
              border-right: 1px solid var(--c-border);

              h3 {
                font-size: 0.75rem;
                opacity: 0.5;
                margin-bottom: -0.5rem;
              }
              ul,
              li {
                list-style: none;
                padding: 0;
              }
              li {
                border-bottom: 1px solid transparent;
              }

              li a {
                padding: var(--s-4);
                display: flex;
                gap: var(--s-8);
                align-items: center;
                border-radius: var(--border-radius);

                &:hover {
                  background: var(--c-bg-opaque);
                  text-decoration: none;
                }

                span {
                  margin-left: auto;
                }
              }
              li a[aria-current="page"] {
                background: var(--c-bg-opaque);
              }
              a {
                color: inherit;
              }
              li span {
                opacity: 0.5;
                font-size: 0.75rem;
              }
              li svg {
                width: 18px;
                height: 18px;
              }
            }
          </style>
          <div class="nnav">
            <h3>Jim Nielsen’s Blog</h3>
            <ul>
              <li>
                <a href="/" ${path === "/" && "aria-current='page'"}
                  >${Icon("heroicon-home")} Posts</a
                >
              </li>
              <li>
                <a
                  href="/search/"
                  ${path === "/search/" && "aria-current='page'"}
                  >${Icon("heroicon-search")} Search</a
                >
              </li>
              <li>
                <a
                  href="/about/external-links/"
                  ${path === "/about/external-links/" && "aria-current='page'"}
                  >${Icon("heroicon-outlinks")} External Links</a
                >
              </li>
              <li>
                <a
                  href="/about/internal-links/"
                  ${path === "/about/internal-links/" && "aria-current='page'"}
                  >${Icon("heroicon-inlinks")} Internal Links</a
                >
              </li>
              <li>
                <a
                  href="/subscribe/"
                  ${path === "/subscribe/" && "aria-current='page'"}
                  >${Icon("heroicon-rss")} Subscribe</a
                >
              </li>
              <li>
                <a href="/about/" ${path === "/about/" && "aria-current='page'"}
                  >${Icon("heroicon-about")} About</a
                >
              </li>
            </ul>
            <h3>Posts by Year</h3>
            <ul>
              ${Object.entries(postCountsByYear)
                .sort((a, b) => b[0] - a[0])
                .map(
                  ([year, count]) => `
                  <li><a href="/${year}/" ${
                    path === `/${year}/` && "aria-current='page'"
                  }>${year} <span>${count}</span></a></li>
                `
                )}
            </ul>
            <h3>Posts by Tag</h3>
            <ul>
              ${postTagsByCount.map(
                ([tag, count]) => `
                <li><a href="/tags/${tag}/" ${
                  path === `/tags/${tag}/` && "aria-current='page'"
                }>#${tag} <span>${count}</span></a></li>
              `
              )}
            </ul>
          </div>
          <nav class="navv wrapper" hidden>
            <a
              href="/"
              title="Jim Nielsen’s Blog"
              aria-label="Jim Nielsen’s Blog"
              ${path === "/" && "aria-current='page'"}
              ${path === "/" ||
              path.includes("/posts/") ||
              path.includes("/archive/") ||
              ["/subscribe/", "/search/", "/menu/"].includes(path)
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
