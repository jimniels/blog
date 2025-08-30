import { html } from "./utils.js";

/** @type {readonly {label: string, href: string}[]} */
const NAV = [
  { label: "Latest", href: "/" },
  { label: "Trending", href: "/posts/trending/" },
  { label: "Hacker News", href: "/posts/hacker-news/" },
  { label: "All", href: "/archive/" },
  { label: "Search", href: "/posts/search/" },
  // { label: "Personal Favs", href: "/posts/personal-favs/" },
];

/**
 * @param {(typeof NAV)[number]['href']} activeHref
 * @returns {string} HTML string for the navigation
 */
export function PostsNav(activeHref) {
  return html`
    <form class="posts-nav-search" style="display: none;">
      <input type="search" placeholder="Search posts" />
    </form>
    <nav class="posts-nav">
      ${NAV.map(({ label, href }) => {
        const isActive = activeHref === href;
        return html`
          <a href="${href}" aria-current="${isActive ? "page" : "false"}"
            >${label}</a
          >
        `;
      })}
    </nav>
  `;
}
