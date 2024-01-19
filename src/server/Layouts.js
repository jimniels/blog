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
      label: "RSS",
      path: "/feed.html",
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
          <script>
            ${importFile("./theme-color.js")};
            document.write("<theme-color></theme-color>");
          </script>

          <header class="header">
            <a
              href="/"
              class="header__brand"
              style="--avatar: url('data:image/jpeg;base64,${avatar}');"
            >
              <span>
                <b>Jim Nielsen’s Blog</b>
                ${importFile("./svgs/check-mark.svg")}
              </span>
              <span>Verified ($10/year for the domain)</span>
            </a>
            <nav class="header__nav">
              ${nav.map(({ label, path: navItemPath }) =>
                navItemPath === path
                  ? html`<span>${label}</span> `
                  : html`<a href="${navItemPath}">${label}</a> `
              )}
            </nav>
            <details class="prefs">
              <summary class="prefs__trigger">
                <span style="display: none" aria-hidden="true"
                  >${importFile("./svgs/preferences.svg")}</span
                >
                <span>Preferences</span>
              </summary>

              <form id="js-color">
                <fieldset>
                  <legend>Theme:</legend>
                  <span id="js-color-root" class="prefs__content prefs-color">
                    This feature requires JavaScript as well as the default site
                    fidelity (see below).
                  </span>
                </fieldset>
              </form>

              <form id="js-fidelity" action="/.netlify/functions/preferences">
                <fieldset>
                  <legend>Fidelity:</legend>
                  <p>
                    Controls the level of style and functionality of the site, a
                    lower fidelity meaning less bandwidth, battery, and CPU
                    usage. <a href="/2022/website-fidelity/">Learn more</a>.
                  </p>
                  <span class="prefs__content prefs-fidelity">
                    ${fidelities.map(
                      ({ id, title }, i) => html`
                        <label id="${id}">
                          <input
                            type="radio"
                            name="fidelity"
                            value="${id}"
                            ${i === 0 ? "checked" : ""}
                          />
                          ${title}
                        </label>
                      `
                    )}
                  </span>
                  <button type="submit">Update</button>
                </fieldset>
              </form>
              <script>
                ${importFile("./preferences.js")};
              </script>
            </details>
          </header>

          ${children}
        </body>
      </html>
    `
  );
}
