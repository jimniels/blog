import { Page } from "../../server/Layouts.js";
import { html, readFile, toDateUI } from "../../server/utils.js";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import ThemePicker from "../../server/ThemePicker.js";
import { Icon } from "../../server/Icon.js";

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
          .kv-list svg {
            width: 16px;
            height: 16px;
          }
        </style>`,
      },
    },
    html` <main id="menu" class="wrapper">
      ${ThemePicker()}
      ${KvList([
        { href: "/", label: "Home", sublabel: "Home" },
        { href: "/archive/", label: "Archive", sublabel: site.posts.length },
        { href: "/tags/", label: "Tags", sublabel: site.tags.length },
        {
          href: "/about/external-links/",
          label: "External Links",
          sublabel: site.externalLinks.length,
        },
        {
          href: "/about/internal-links/",
          label: "Internal Links",
          sublabel: Object.keys(site.internalLinksByPath).length,
        },
        { href: "/about/", label: "About", sublabel: "Me" },
      ])}
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
            <span>${Icon("heroicon-chevron-right")}</span>
          </a>
        </li>`
    )}
  </ul>`;
}
