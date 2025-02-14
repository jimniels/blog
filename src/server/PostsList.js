// @ts-check
import { toDateUI } from "./utils.js";
import { html } from "./utils.js";

/**
 * @param {import("types").Post[]} posts
 * @param {(post: import("types").Post) => string} fn
 * @returns {string}
 */
export function PostsList(
  posts,
  fn = (post) =>
    html`<time datetime="${post.date}">${toDateUI(post.date)}</time>`
) {
  return html`
    <ul class="posts-list">
      ${posts.map(
        (post) => html`
          <li
            ${post.hackerNews ? "data-hacker-news" : ""}
            ${post.pageviews ? "data-trending" : ""}
          >
            <a
              href="${post.path}"
              style="view-transition-name: post-title-${post.id}"
            >
              <span>${post.title}</span>
              <span>${fn(post)}</span>
            </a>
          </li>
        `
      )}
    </ul>
  `;
}
