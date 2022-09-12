import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { html } from "./utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const importFile = (filepath) =>
  fs.readFileSync(join(__dirname, filepath)).toString();

const comment = `
<!--



👋
Want to read the code behind this code?
It’s available on GitHub.
https://www.github.com/jimniels/blog/



-->
`;

// Children will do: Page({...}, html`<main {class="{wrapper|copy}"}?>...</main>`)
export function Page(props, children) {
  const {
    site: { origin, tags, name },
    page: { head = "", path, title },
  } = props;

  const nav = [
    {
      label: "Archive",
      path: "/archive/",
    },
    {
      label: "About",
      path: "/about/",
    },
    {
      label: "Preferences",
      path: "/preferences/",
    },
    {
      label: "RSS",
      path: "/feed.xml",
    },
  ];

  return (
    "<!DOCTYPE html>" +
    comment +
    html`
      <html lang="en-us" id="top">
        <head>
          <title>${title && `${title} - `}${name}</title>

          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="author" content="p-author" />
          <link rel="preconnect" href="https://cdn.jim-nielsen.com" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS"
            href="/feed.xml"
          />
          <link
            rel="alternate"
            type="application/json"
            title="JSON Feed"
            href="/feed.json"
          />

          <!-- Inline all our styles -->
          <style>
            ${[
              "./styles/modern-normalize.css",
              "./styles/styles.css",
              "./styles/atom-one-light.css",
            ]
              .map(importFile)
              .join("")}

            @media screen and (prefers-color-scheme: dark) {
              ${importFile("./styles/atom-one-dark.css")}
            }
          </style>

          <!-- Dynamic <head> content where applicable -->
          ${head}
        </head>
        <body>
          ${/* icon sprite importFile("./svgs/icons.svg") */ ""}
          <script>
            ${importFile("./theme-color.js")};
          </script>
          <theme-color></theme-color>

          <nav>
            <div>
              ${path === "/"
                ? `<span class="highlight">Jim Nielsen’s Blog</span>`
                : `<a href="/" class="highlight">Jim Nielsen’s Blog</a>`}
            </div>
            <div>
              ${nav.map(({ label, path: navItemPath }) =>
                navItemPath === path
                  ? html`<span>${label}</span>`
                  : html`<a href="${navItemPath}">${label}</a>`
              )}
            </div>
          </nav>

          ${children}
        </body>
      </html>
    `
  );
}
