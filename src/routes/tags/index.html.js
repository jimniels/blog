import { Page } from "../../server/Layouts.js";
import { PostsList } from "../../server/PostsList.js";
import { html, toDateUI } from "../../server/utils.js";

/**
 * @type {import("types").Page}
 */
const page = {
  title: "Tags",
  path: "/tags/",
  head: html`
    <style>
      .tags-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 0.88888rem;
      }
      .tags-list li {
        display: flex;
        align-items: center;
        gap: 2px;
      }
      .tags-list a {
      }
      .tags-list small {
        color: var(--c-text-light);
      }
    </style>
  `,
};

/**
 *
 * @param {import("types").Site} site
 * @returns {Promise<string>}
 */
export default function Tags(site) {
  /** @type {Record<string, import("types").Post[]>} */
  const postsByTag = site.posts.reduce((acc, post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        if (acc[tag]) {
          acc[tag].push(post);
        } else {
          acc[tag] = [post];
        }
      });
    }
    return acc;
  }, {});

  let tags = Object.keys(postsByTag)
    .sort()
    .filter((tag) => tag !== "rssClub");

  return Page(
    { site, page },
    html` <main class="wrapper">
      <h1>Tags</h1>
      <ul class="tags-list">
        ${tags.map(
          (tag) => html`
            <li>
              <a href="#${tag}">#${tag}</a>
              <small>(${postsByTag[tag].length})</small>
            </li>
          `
        )}
      </ul>

      ${tags.map(
        (tag) => html`
          <h2 id="${tag}" style="margin: 2rem 0 .5rem;">
            #${tag}
            <small
              style="font-weight: 300; font-size: 1rem; color: var(--c-text-light)"
            >
              (${postsByTag[tag].length})
            </small>
          </h2>

          ${PostsList(postsByTag[tag])}
        `
      )}
    </main>`
  );
}
