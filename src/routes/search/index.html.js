import { Page } from "../../server/Layouts.js";
import { html, readFile, toDateUI } from "../../server/utils.js";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import ThemePicker from "../../server/ThemePicker.js";

/** @type {import('types').Route} */
export default function Index(site) {
  return Page(
    {
      site,
      page: {
        title: "Menu",
        path: "/menu/",
        head: html`<style>
          #menu {
            display: flex;
            flex-direction: column;
            gap: var(--s-48);
          }
          #menu h3 {
            font-size: 1rem;
            margin: 0 0 calc(var(--s-40) * -1) 0;
          }
          .kv-list {
            display: flex;
            flex-direction: column;
            padding: 0;
            margin: 0;
            list-style: none;
          }
          .kv-list li:not(:last-child) {
            border-bottom: 1px solid var(--c-border);
          }
          .kv-list li a {
            padding: var(--s-8) 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: var(--s-10);
            text-decoration: none;
          }
          .kv-list li a:hover span:first-child {
            text-decoration: underline;
          }
          .kv-list li a span:last-child {
            font-size: 0.8rem;
            color: var(--c-text-light);
          }
          .kv-list li a[href^="https://"] span:last-child:after
          {
            display: inline-block;
            content: "→";
            transform: rotate(-45deg);
            margin-left: var(--s-4);
          }
          .search {
            position: relative;
          }
          .search input {
            width: 100%;
            height: var(--s-40);
            border: 1px solid var(--c-fg);
            border-radius: var(--border-radius);
            padding-left: var(--s-40);
            background: transparent;
          }

          .search svg {
            width: 20px;
            height: 20px;
            fill: var(--c-text-light);
          }
          .search > svg {
            position: absolute;
            left: var(--s-12);
            top: 0.5555rem;
          }
          .search button {
            position: absolute;
            right: var(--s-12);
            top: 0.5555rem;
            width: 20px;
            height: 20px;
            background: none;
            border: none;
            padding: 0;
            margin: 0;
          }

          .search input:placeholder-shown + button {
            display: none;
          }
          .search input:not(:placeholder-shown) + button {
            display: block;
          }

          /* ==========================================================================
  * Pagefind
  * ========================================================================== */

          :root {
            /* pagefind */
            --pagefind-ui-scale: 1 !important;
            --pagefind-ui-primary: var(--c-theme) !important;
            --pagefind-ui-text: var(--c-text) !important;
            --pagefind-ui-background: var(--c-bg) !important;
            --pagefind-ui-border: var(--c-border) !important;
            --pagefind-ui-tag: var(--c-border) !important;
            --pagefind-ui-border-width: 2px;
            --pagefind-ui-border-radius: 8px;
            --pagefind-ui-image-border-radius: 8px;
            --pagefind-ui-image-box-ratio: 3 / 2;
            --pagefind-ui-font: inherit;
          }
          .pagefind-ui__message {
            font-weight: 400 !important;
            color: var(--c-text-light) !important;
            padding-top: 0 !important;
          }
          .pagefind-ui__result {
            padding: calc(12px * var(--pagefind-ui-scale)) 0
              calc(16px * var(--pagefind-ui-scale)) !important;
          }
          .pagefind-ui__result-title {
            line-height: 1.3 !important;
            font-size: 1rem !important;
          }
          .pagefind-ui__result-excerpt {
            color: var(--c-text-light) !important;
            font-size: 0.888rem !important;
          }
          .pagefind-ui__result-title,
          .pagefind-ui__result-link {
            font-weight: 400 !important;
            color: var(--c-theme) !important;
          }

          .pagefind-ui mark {
            /* background-color: hsl(
     var(--c-theme-h) var(--c-theme-s) var(--c-theme-l) / 0.25
   ) !important; */
            color: var(--c-text) !important;
            font-weight: 600 !important;
            background-color: transparent !important;
          }
          .pagefind-ui__result-link:before {
            display: none !important;
          }
          .pagefind-ui__result-nested .pagefind-ui__result-link {
            font-size: 1rem !important;
          }

          #js-search-root {
            overflow: hidden;
          }
          .pagefind-ui__search-input,
          .pagefind-ui__search-clear,
          .pagefind-ui__form:before {
            display: none !important;
          }
        </style>`,
      },
    },
    html` <main id="menu" class="wrapper">
      <form action="https://duckduckgo.com" class="search" id="js-search-form">
        <input
          type="text"
          name="q"
          autocomplete="off"
          spellcheck="false"
          placeholder="Search"
          autofocus
          id="search-input"
        />
        <button type="reset">
          ${readFile("../server/svgs/heroicon-x-circle.svg")}
        </button>
        <input type="hidden" name="sites" value="blog.jim-nielsen.com" />
        ${readFile("../server/svgs/heroicon-search.svg")}
      </form>
      <output id="js-search-root"></output>
      <script defer src="/pagefind.js"></script>
      <script>
        const btn = document.querySelector(".search button[type='reset']");

        document.querySelector(".search").addEventListener("submit", (e) => {
          // e.preventDefault();
          // Do my client-side search stuff here
          // and stay on the current page
        });
      </script>
    </main>`
  );
}

/**
 * @param {Array<{href: string, label: string, sublabel: string | number}>} items
 */
function KvList(items) {
  return html`<ul class="kv-list">
    ${items.map(
      (item) =>
        html`<li>
          <a href="${item.href}">
            <span>${item.label}</span>
            <span>${item.sublabel}</span>
          </a>
        </li>`
    )}
  </ul>`;
}
