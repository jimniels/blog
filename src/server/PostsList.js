import { toDateUI } from "./utils.js";
import { html } from "./utils.js";

/**
 * @param {import("types").Post[]} posts
 * @param {(post: import("types").Post) => string} fn
 * @param {boolean} grid
 */
export function PostsList(
  posts,
  fn = ({ date }) => html`<time datetime="${date}">${toDateUI(date)}</time>`,
  grid = false
) {
  return html`
    <ul class="posts-list ${grid ? "posts-list--grid" : ""}">
      ${posts.map(
        (post) => html`
          <li>
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
