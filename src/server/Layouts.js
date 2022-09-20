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
          ${/* icon sprite importFile("./svgs/icons.svg") */ ""}
          <script>
            ${importFile("./theme-color.js")};
            document.write("<theme-color></theme-color>");
          </script>

          <nav>
            ${path === "/"
              ? html`<b class="highlight">Jim Nielsen’s Blog</b>`
              : html`<a href="/" class="highlight"
                  ><b>Jim Nielsen’s Blog</b></a
                >`}
            ${nav.map(({ label, path: navItemPath }) =>
              navItemPath === path
                ? html`<span>${label}</span> `
                : html`<a href="${navItemPath}">${label}</a> `
            )}
            <details open>
              <summary>Site Preferences</summary>
              <div>
                <form id="color">
                  <fieldset>
                    <legend>Theme:</legend>
                    <span id="theme-root">
                      This feature requires the default site fidelity (see
                      below) as well as JavaScript.
                    </span>
                  </fieldset>
                </form>
                <!-- prettier-ignore -->
                <script>${importFile("../client/preferences/index.js")}</script>
                <form id="fidelity" action="/.netlify/functions/preferences">
                  <fieldset>
                    <legend>Fidelity: (<a href="">What is this?</a>)</legend>

                    <span>
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
                  const $fidelityForm = document.querySelector("form#fidelity");
                  $fidelityForm.addEventListener("change", (e) => {
                    $fidelityForm.submit();
                  });
                  $fidelityForm.querySelector("button").style.display = "none";
                </script>
              </div>
            </details>
          </nav>

          ${children}
        </body>
      </html>
    `
  );
}
