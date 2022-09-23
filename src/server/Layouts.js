import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { html } from "./utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const importFile = (filepath) =>
  fs.readFileSync(join(__dirname, filepath)).toString();

const fidelities = [
  {
    id: "high",
    title: "Default",
    description:
      "All the bells and whistles (yet still lean and mean). Custom theme color selection, styled motifs, and any extra flair — including JavaScript",
  },
  {
    id: "med",
    title: "Minimal",
    description:
      "Minimal enhancements for the core reading experience. HTML includes inline images, and a base stylesheet is included for improved layout, but otherwise nothing else. No JavaScript.",
  },
  {
    id: "low",
    title: "Text-Only",
    description:
      "Leanest experience possible. No styles, no interactivity, or inline images. Saves bandwidth, CPU, and battery.",
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
          <script>
            ${importFile("./theme-color.js")};
            document.write("<theme-color></theme-color>");
          </script>

          <nav>
            ${path === "/"
              ? html`<b>Jim Nielsen’s Blog</b>`
              : html`<a href="/"><b>Jim Nielsen’s Blog</b></a>`}
            <span
              >${nav.map(({ label, path: navItemPath }) =>
                navItemPath === path
                  ? html`<span>${label}</span> `
                  : html`<a href="${navItemPath}">${label}</a> `
              )}
            </span>
            <details class="prefs">
              <summary class="prefs__trigger">
                <span style="display: none"
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
                    usage. <a href="">Learn more</a>.
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
          </nav>

          ${children}
        </body>
      </html>
    `
  );
}
