import { Page } from "../../server/Layouts.js";
import { html, toDateUI } from "../../server/utils.js";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Icon } from "../../server/Icon.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const importFile = (filepath) =>
  fs.readFileSync(join(__dirname, filepath)).toString();

export default function Index(site) {
  return Page(
    {
      site,
      page: {
        title: "Subscribe",
        path: "/subscribe/",
        head: html`
          <style>
            .feeds {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              list-style: none;
              padding: 0;
              margin: 0;
              width: 100%;
              gap: var(--s-8);
              flex-wrap: wrap;
            }
            .feeds a {
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: var(--s-8);
              background: var(--c-bg-opaque);
              padding: var(--s-6) var(--s-12);
              border-radius: 5px;
              justify-content: center;
            }
            .feeds a svg {
              width: 20px;
              height: 20px;
            }
            details summary {
              colorz: var(--c-text-light);
              cursor: default;
            }
            details[open] summary {
              color: var(--c-text);
            }
            .embeddable-buttondown-form {
              margin-top: var(--s-64);
              font-size: 0.8888rem;
              color: var(--c-text-light);
            }
            .embeddable-buttondown-form input[type="email"] {
              width: 300px;
              margin: 0 0 var(--s-8);
              padding: var(--s-8);
              background: var(--c-fg);
              border: 1px solid var(--c-bg-opaque);
              border-radius: 5px;
            }
            .embeddable-buttondown-form input[type="submit"] {
              appearance: none;
              background: transparent;
              border: none;
              padding: 0;
              color: var(--c-theme);
              border: 1px solid;
              padding: var(--s-4) var(--s-12);
              border-radius: 5px;
              line-height: inherit;
            }
            .embeddable-buttondown-form a {
              color: inherit;
              text-decoration: underline;
            }
          </style>
        `,
      },
    },
    html` <main class="wrapper">
      <ul class="feeds">
        <li>
          <a href="/feed.xml">${Icon("heroicon-rss")} RSS</a>
        </li>
        <li>
          <a href="/feed.json"> ${Icon("feed-json")} JSON</a>
        </li>
        <li>
          <a href="https://buttondown.com/jimniels">
            ${Icon("heroicon-email")} Email</a
          >
        </li>
      </ul>

      <p>
        Or simply copy/paste this page’s URL into your feed reader for
        <a href="/2021/automatically-discoverable-rss-feeds/"
          >automatic feed discovery</a
        >.
      </p>

      <details>
        <summary>What’s a feed?</summary>
        <div>
          <p>
            Oh wow, I’m <em>so excited</em> to tell you! You’re about to
            discover one of my absolute favorite things about the internet!
            There’s a bit of a learning curve, but you know what they say:
            nothing worth having comes easy.
          </p>
          <p>
            <a href="https://aboutfeeds.com/"
              >Visit aboutfeeds.com to learn more.</a
            >
          </p>
        </div>
      </details>
    </main>`
  );
}
