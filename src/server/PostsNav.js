import { html } from "./utils.js";

/** @type {readonly {label: string, href: string}[]} */
const NAV = [
  { label: "Latest", href: "/" },
  { label: "Trending", href: "/archive/trending/" },
  { label: "Hacker News Hits", href: "/archive/hacker-news/" },
  { label: "Personal Favs", href: "/archive/personal-favs/" },
  { label: "Archive", href: "/archive/" },
];

/**
 * @param {(typeof NAV)[number]['href']} activeHref
 * @returns {string} HTML string for the navigation
 */
export function PostsNav(activeHref) {
  return html`
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
