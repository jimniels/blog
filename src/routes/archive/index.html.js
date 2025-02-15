import { Page } from "../../server/Layouts.js";
import { PostsList } from "../../server/PostsList.js";
import { PostsNav } from "../../server/PostsNav.js";
import { html } from "../../server/utils.js";

const page = {
  title: "Archive",
  path: "/archive/",
  head: html`
    <style>
      main h2 {
        position: sticky;
        top: 0px;
        background: var(--c-bg);
        z-index: 10;
      }
    </style>
  `,
};

/**
 * @type {import("types").Route}
 */
export default function Archive(site) {
  const postsByYear = site.posts
    .filter((post) => !post?.tags.includes("rssClub"))
    .reduce((acc, post) => {
      const year = post.date.slice(0, 4);
      if (acc[year]) {
        acc[year].push(post);
      } else {
        acc[year] = [post];
      }
      return acc;
    }, /** @type {{ [key: string]: import('types').Post[] }} */ ({}));

  return Page(
    { site, page },
    html` <main class="wrapper">
      <h1>Posts</h1>
      ${PostsNav(page.path)}
      ${Object.keys(postsByYear)
        .sort()
        .reverse()
        .map(
          (year) => html`
            <h2 id="${year}" style="margin: 2rem 0 .5rem;">${year}</h2>
            ${PostsList(postsByYear[year])}
          `
        )}
    </main>`
  );
}
