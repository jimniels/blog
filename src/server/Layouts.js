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
    // {
    //   label: "Jim Nielsen’s Blog",
    //   path: "/",
    // },
    {
      label: "Archive",
      path: "/archive/",
    },
    // {
    //   label: "Tags",
    //   path: "/tags/",
    // },
    {
      label: "Subscribe",
      path: "/feed.html",
    },
    {
      label: "About",
      path: "/about/",
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
          <!-- <script>
            ${importFile("./theme-color.js")};
            document.write("<theme-color></theme-color>");
          </script> -->

          <jim-navbar></jim-navbar>

          <nav class="navv wrapper">
            <a
              href="/"
              style="display: flex; align-items: center; gap: 8px; margin-right: auto;"
            >
              ${path !== "/" &&
              html` <svg
                style="width: 30px; height: 30px; margin: 0 -8px 0 -4px;"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>`}
              Jim Nielsen’s Blog
            </a>

            ${nav.map(({ label, path: navItemPath }) =>
              navItemPath === path
                ? html`<span>${label}</span> `
                : html`<a href="${navItemPath}">${label}</a> `
            )}

            <site-nav> </site-nav>

            <script>
              ${importFile("./site-nav.js")};
            </script>
          </nav>

          <!-- <site-nav>
            <nav>
              ${nav.map(({ label, path: navItemPath }) =>
            navItemPath === path
              ? html`<span>${label}</span> `
              : html`<a href="${navItemPath}">${label}</a> `
          )}
            </nav>
          </site-nav>
          <script>
            ${importFile("./site-nav.js")};
          </script> -->

          <header class="header" style="display: none;">
            <div class="header__brand">
              ${path !== "/" ? `<a href="/">` : ""}
              <span>Jim Nielsen’s Blog</span>
              ${path !== "/" ? `</a>` : ""}
              <a
                href="/2022/verified-personal-website/"
                aria-label="Read about my “verified” personal website"
                >${importFile("./svgs/check-mark.svg")}</a
              >
            </div>
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

              <form
                id="js-fidelity"
                action="/.netlify/functions/preferences"
                style="height: 8px; opacity: 0; visibility: hidden;"
              >
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
