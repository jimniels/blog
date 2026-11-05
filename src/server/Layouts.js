import fs from "fs";
import { html, readFile } from "./utils.js";
import { Icon } from "./Icon.js";
import FooterTheme from "./FooterTheme.js";

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
    page: { head = "", path, title, description },
  } = props;

  const metaDescription =
    description ||
    "Writing about the big beautiful mess that is making things for the world wide web.";

  return (
    "<!DOCTYPE html>" +
    comment +
    html`
      <html
        lang="en-us"
        id="top"
        data-path="${path}"
        data-syntax-theme="dracula"
      >
        <head>
          <title>${title && `${title} - `}${name}</title>

          <link rel="stylesheet" href="/styles.css" />
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="author" content="Jim Nielsen" />
          <meta name="description" content="${metaDescription}" />
          <link rel="me" href="https://github.com/jimniels" />
          <link rel="me" href="https://twitter.com/jimniels" />
          <link rel="me" href="https://mastodon.social/@jimniels" />
          <link rel="me" href="https://dribbble.com/jimniels" />
          <link rel="preconnect" href="https://cdn.jim-nielsen.com" />

          <!-- Feeds -->
          <link
            rel="alternate"
            type="application/json"
            title="RSS: JSON Feed"
            href="/feed.json"
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS: XML Feed"
            href="/feed.xml"
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
          <script type="module">
            // If URL is /YYYY/* _and_ it has a code block, load syntax highlighting
            const firstPathSegment = window.location.pathname.split("/")[1];
            if (
              firstPathSegment &&
              firstPathSegment.length === 4 &&
              document.querySelector("pre > code")
            ) {
              const link = document.createElement("link");
              link.rel = "stylesheet";
              link.href =
                "https://cdn.jsdelivr.net/npm/microlighter@2/dist/themes/dracula.css";
              document.head.appendChild(link);
              import(
                "https://cdn.jsdelivr.net/npm/microlighter@2/dist/microlighter.min.js"
              );
            }
          </script>

          <!-- Prefetch navigational pages -->
          <link rel="prefetch" href="/search/" />

          <!-- GA (testing) -->
          <!-- Google tag (gtag.js) -->
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-CP7ZEPS11G"
          ></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("js", new Date());

            gtag("config", "G-CP7ZEPS11G");
          </script>

          <!-- Dynamic <head> content where applicable -->
          ${head}
        </head>
        <body>
          <nav class="navv wrapper">
            ${path === "/"
              ? html`
                  <a href="/subscribe/" aria-label="Subscribe" title="Subscribe"
                    >${Icon("heroicon-rss")}</a
                  >
                  <a href="/search/" aria-label="Search" title="Search"
                    >${Icon("heroicon-search")}</a
                  >
                  <a href="/stats/">Stats</a>
                  <a href="/tags/">Tags</a>
                  <a href="/external-links/">Links</a>
                `
              : html`<a href="/">Jim Nielsen’s Blog</a>`}
          </nav>
          ${children}
          <footer>
            <p>This is <a href="/">a blog by Jim Nielsen</a></p>
            <p hidden>
              <a href="/">Go home</a> | <a href="/subscribe/">Subscribe</a> |
              <a href="/">Contact me</a>
            </p>

            ${FooterTheme()}
          </footer>
        </body>
      </html>
    `
  );
}
