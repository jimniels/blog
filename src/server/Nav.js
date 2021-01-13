import fs from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { html } from "./utils.js";

const svg = fs
  .readFileSync(
    join(
      dirname(fileURLToPath(import.meta.url)),
      "../client/assets/img/favicon.svg"
    )
  )
  .toString();

const navItems = [
  {
    label: "Archive",
    permalink: "/archive/",
  },
  {
    label: "Tags",
    permalink: "/tags/",
  },
  {
    label: "About",
    permalink: "/about/",
  },
  {
    label: "Feeds",
    permalink: "/feeds/",
  },
];

// prettier-ignore
export default function Nav({ site, page }) {
  const titleTag = page.permalink === "/" ? "strong" : "a";
  return html`
    <${titleTag} ${titleTag === "a" && "href='/'"} class="nav__site-name">
      ${site.name}
    </${titleTag}>
    
    ${page.permalink === "/" && html`
      <ul class="nav__links">
        ${navItems.map(navItem => html`
          <li class="${page.permalink == navItem.permalink ? "active" : ""}">
            ${page.permalink == navItem.permalink
              ? navItem.label
              : html`<a href="${navItem.permalink}">
                  ${navItem.label}
                </a>`}
          </li>
        `)}
      </ul>`}
  `;
}
