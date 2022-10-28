import { html } from "./utils.js";

/**
 * The html that appears at the bottom of each post, both on the site
 * as well as in the RSS feed.
 * @param {import("../../types.js").Post} post
 * @param {import("../../types.js").Site} site
 */
export default function ReplyHtml({ post, site }) {
  const postTags = post.tags;
  const postPath = post.path;
  const siteOrigin = site.origin;
  const relatedPosts = Object.entries(site.internalLinksByPath).reduce(
    (acc, [postPath, linkedPaths]) => {
      // If a post has this post’s path in it's list of links, add it's metadata
      // to our list of related posts
      if (linkedPaths.includes(post.path)) {
        acc.push(site.posts.find((p) => p.path === postPath));
      }
      return acc;
    },
    []
  );

  return html`
    <hr />
    <ul>
      <li>
        Reply via:

        <a
          href="mailto:jimniels+blog@gmail.com?subject=Re:%20blog.jim-nielsen.com${postPath}"
          >Email</a
        >, <a href="https://twitter.com/jimniels">Twitter</a>
      </li>
      ${Array.isArray(postTags) &&
      postTags.length > 0 &&
      html`
        <li>
          Tagged in:
          ${postTags
            .map(
              (tag) => html`<a href="${siteOrigin}/tags/#${tag}">#${tag}</a>`
            )
            .join(", ")}
        </li>
      `}
      ${relatedPosts.length
        ? html`<li>
            Related posts linking here:
            ${relatedPosts
              .map(({ title, path }) => html`<a href="${path}">${title}</a>`)
              .join(", ")}
          </li>`
        : ""}
    </ul>
    <br />
  `;
}
