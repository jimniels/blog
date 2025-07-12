import { Page } from "../../server/Layouts.js";
import { PostsList } from "../../server/PostsList.js";
import { PostsNav } from "../../server/PostsNav.js";
import { html } from "../../server/utils.js";

const page = {
  title: "Archive",
  path: "/archive/",
  head: html`
    <style>
      @view-transition {
        navigation: none;
      }
      main h2 {
        position: sticky;
        top: 0px;
        background: var(--c-bg);
        z-index: 10;
        font-size: 1rem;
        font-weight: 800;
      }

      .archive-chart {
        display: flex;
        flex-direction: column;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: var(--s-2);
        font-size: 0.875rem;
      }

      .archive-chart li {
        position: relative;
      }

      .archive-chart li a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--s-6) var(--s-6);
        position: relative;
        z-index: 2;
        text-decoration: none;
      }
      .archive-chart li a span:last-child {
        color: var(--c-text-light);
        font-size: 0.77777rem;
      }
      .archive-chart li a:hover span:first-child {
        text-decoration: underline;
      }
      .archive-chart-bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: var(--c-fg);
        pointer-events: none;
        z-index: 1;
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

  const yearsSorted = Object.keys(postsByYear).sort().reverse();

  const maxPosts = Math.max(
    ...Object.values(postsByYear).map((posts) => posts.length)
  );

  return Page(
    { site, page },
    html` <main>
      <div class="wrapper">
        <h1>Archive</h1>
        <ol class="archive-chart">
          ${yearsSorted.map(
            (year) => html`
              <li>
                <a href="#${year}">
                  <span>${year}</span>
                  <span>${postsByYear[year].length}</span>
                </a>
                <span
                  class="archive-chart-bar"
                  style="width: ${(postsByYear[year].length / maxPosts) * 100}%"
                ></span>
              </li>
            `
          )}
        </ol>
      </div>
      <div class="wrapper-grid">
        ${yearsSorted.map(
          (year) => html`
            <h2 id="${year}" style="margin: 2rem 0 .5rem;">${year}</h2>
            ${PostsList(postsByYear[year], undefined, true)}
          `
        )}
      </div>
    </main>`
  );
}
