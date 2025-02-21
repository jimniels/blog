import { html } from "./utils.js";

/** @type {readonly {label: string, href: string}[]} */
const NAV = [
  { label: "Latest", href: "/" },
  { label: "Trending", href: "/posts/trending/" },
  { label: "Hacker News Hits", href: "/posts/hacker-news/" },
  // { label: "Personal Favs", href: "/posts/personal-favs/" },
  // { label: "All →", href: "/archive/" },
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
