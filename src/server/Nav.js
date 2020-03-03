import { html } from "./utils.js";

const navItems = [
  {
    id: "archive",
    label: "Archive",
    path: "/archive/"
  },
  {
    id: "tags",
    label: "Tags",
    path: "/tags/"
  },
  {
    id: "about",
    label: "About",
    path: "/about/"
  },
  {
    id: "feeds",
    label: "Feeds",
    path: "/feeds/"
  }
];

// prettier-ignore
export default function Nav({ site, page }) {
  return html`
    
      <a href="/" class="nav__img">
        <img
          src="/favicon.ico"
          alt="Photograph of Jim Nielsen"
          width="32"
          height="32"
        />
      </a> 

      <h1 class="nav__title">
        <a href="/">blog.jim-nielsen.com</a>
      </h1>

      <ul class="nav__links">
        ${navItems.map(navItem => html`
          <li class="${page.id == navItem.id ? "active" : ""}">
            ${page.id == navItem.id
              ? navItem.label
              : html`<a href="${navItem.path}">
                  ${navItem.label}
                </a>`}
          </li>
        `)}
      </ul>
      
    
  `;
}
