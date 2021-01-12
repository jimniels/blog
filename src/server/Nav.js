import { html } from "./utils.js";

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
  return html`
    <a href="/" class="nav__img">
      <img
        src="/favicon.ico"
        alt="Jim Nielsen favicon"
        width="24"
        height="24"
      />
    </a> 

    <a href="/">blog.jim-nielsen.com</a>

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
    </ul>
  `;
}
