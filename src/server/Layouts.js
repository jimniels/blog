import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { html } from "./utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const importFile = (filepath) =>
  fs.readFileSync(join(__dirname, filepath)).toString();
const avatar = fs
  .readFileSync(join(__dirname, "avatar.png"))
  .toString("base64");

const fidelities = [
  {
    id: "high",
    title: "Default",
  },
  {
    id: "med",
    title: "Minimal",
  },
  {
    id: "low",
    title: "Text-Only",
  },
];

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
          <jim-navbar></jim-navbar>

          <nav class="navv wrapper">
            <a href="/" ${path === "/" && "aria-current='page'"}>
              Jim Nielsen’s Blog
            </a>

            <a href="/menu/" ${path === "/menu/" && "aria-current='page'"}
              >Menu</a
            >
            <a href="/about/" ${path === "/about/" && "aria-current='page'"}
              >About</a
            >
            <a
              href="/subscribe/"
              ${path === "/subscribe/" && "aria-current='page'"}
              >Subscribe</a
            >

            <theme-picker></theme-picker>
            <!-- prettier-ignore -->
            <script>${importFile("./theme-picker.js")}</script>
          </nav>

          ${children}
        </body>
      </html>
    `
  );
}
