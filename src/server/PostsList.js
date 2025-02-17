import { toDateUI } from "./utils.js";
import { html } from "./utils.js";

/**
 * @param {import("types").Post[]} posts
 * @param {(post: import("types").Post) => string} fn
 */
export function PostsList(
  posts,
  fn = ({ date }) => html`<time datetime="${date}">${toDateUI(date)}</time>`
) {
  return html`
    <ul class="posts-list">
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
