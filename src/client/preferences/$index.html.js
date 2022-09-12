import { Page } from "../../server/Layouts.js";
import { html } from "../../server/utils.js";
import fs from "fs";
import path from "path";
import url from "url";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const importFile = (filepath) =>
  fs.readFileSync(path.join(__dirname, filepath)).toString();

export default function Preferences(site) {
  const title = "Site Preferences";
  return Page(
    {
      site,
      page: {
        title,
        path: "/preferences/",
        head: html`
          <style>
            #color {
              display: flex;
              gap: var(--s-12);
            }
            #color label {
              width: 20%;
            }
            #color span {
              display: block;
              height: var(--s-40);
              border-radius: var(--border-radius);
              text-indent: -9999px;
            }
            #color input {
              display: none;
            }
            #color input:checked ~ span {
              box-shadow: 0 0 0 3px var(--c-bg), 0 0 0 6px var(--c-theme);
            }

            #fidelity {
              display: flex;
              gap: var(--s-16);
              text-align: center;
            }
            #fidelity > a {
              width: 33.3333%;
              color: inherit;
              text-decoration: none;
            }
            #fidelity > a:hover {
              filter: none;
            }

            #fidelity > a:before {
              content: "";
              background-color: white;
              background-position: 50% 0;
              background-repeat: no-repeat;
              border: 1px solid var(--c-fg);
              border-radius: var(--border-radius);
              height: 98px;
              display: flex;
              justify-content: center;
              margin-bottom: var(--s-4);
            }
            #fidelity > a:hover:before {
              box-shadow: 0 0 0 3px var(--c-bg), 0 0 0 6px var(--c-fg);
            }
            /* Putting active here only applies styles to 
               the default theme, as its the only one that gets styles */
            #fidelity > a#high:before {
              box-shadow: 0 0 0 3px var(--c-bg), 0 0 0 6px var(--c-theme);
            }

            #fidelity > a#high:before {
              background-image: url(/preferences/fidelity-high.svg);
            }
            #fidelity > a#med:before {
              background-image: url(/preferences/fidelity-med.svg);
            }
            #fidelity > a#low:before {
              background-image: url(/preferences/fidelity-low.svg);
            }
          </style>
        `,
      },
    },
    html`
      <main class="copy">
        <h1>${title}</h1>

        <h2>Theme</h2>
        <div id="theme-root">This feature requires JavaScript.</div>
        <!-- prettier-ignore -->
        <script>${importFile("./index.js")}</script>

        <h2>Fidelity</h2>
        <div id="fidelity">
          ${[
            { id: "high", title: "Default" },
            { id: "med", title: "Minimal" },
            { id: "low", title: "Text-Only" },
          ].map(
            ({ id, title }) => html`
              <a
                href="/.netlify/functions/preferences?fidelity=${id}"
                id="${id}"
              >
                ${title}
              </a>
            `
          )}
        </div>
        <p>
          This is a concept whose implemenation I explain in
          <a href="">this post.</a> Here’s a more technical explanation of what
          these preferences mean:
        </p>

        <p>
          <em>Default:</em> all the bells and whistles (yet still lean and
          mean). Custom theme color selection, styled motifs, and any extra
          flair — including JavaScript.
        </p>
        <p>
          <em>Basic:</em> minimal enhancements for the core reading experience.
          HTML includes inline images, and a base stylesheet is included for
          improved layout, but otherwise nothing else. No JavaScript.
        </p>
        <p>
          <em>Minimal:</em> leanest experience possible. No styles, no
          interactivity, or inline images. Saves bandwidth, CPU, and battery.
        </p>
      </main>
    `
  );
}
