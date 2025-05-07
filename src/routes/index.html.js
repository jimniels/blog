import { PostsList } from "../server/PostsList.js";

import { html, toDateUI } from "../server/utils.js";
import { PostsNav } from "../server/PostsNav.js";
import { Page } from "../server/Layouts.js";

const LIMIT = 8;
const page = {
  title: "",
  path: "/",
};

/** @type {import("types").Route} */
export default async function Index(site) {
  const posts = site.posts
    .filter((post) => !post?.tags.includes("rssClub"))
    .slice(0, LIMIT);
  const { Page } = await import("../server/Layouts.js");

  return Page(
    {
      site,
      page,
    },
    html` <main class="wrapper">
      <h1>Posts</h1>
      ${PostsNav(page.path)} ${PostsList(posts)}
    </main>`
  );
}

/**
 *
 * @param {{ name: string, className?: string }} param0
 * @returns
 */
export function NavPill({ name, className }) {
  const src =
    name === "Notes"
      ? "https://notes.jim-nielsen.com/favicon.ico"
      : name === "Home"
      ? "https://www.jim-nielsen.com/.well-known/avatar"
      : "/favicon.ico";
  return html`
    <a
      href="/"
      class="nav-pill__active ${className
        ? `nav-pill__active--${className}`
        : ""}"
    >
      <img src="${src}" alt="logo" width="40" height="40" />
      <span class="nav-pill__active__site">
        <span class="nav-pill__active__me">Jim Nielsen’s</span>
        <span class="nav-pill__active__name">${name}</span>
      </span>
    </a>
  `;
}
