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

    <p>
      Reply via:
      ${
        /* Trippy: we gotta encode the "+" or we get bit by outlook
             https://webmasters.stackexchange.com/questions/15920/should-plus-be-encoded-in-mailto-hyperlinks */
        ""
      }
      <a
        href="mailto:jimniels%2Bblog@gmail.com?subject=Re:%20blog.jim-nielsen.com${postPath}"
        >Email</a
      >, <a href="https://mastodon.social/@jimniels">Mastodon</a>, or
      <a href="https://twitter.com/jimniels">Twitter</a>.
    </p>
    ${Array.isArray(postTags) &&
    postTags.length > 0 &&
    html`
      <p>
        Tagged in:
        ${postTags
          .map((tag) => html`<a href="${siteOrigin}/tags/#${tag}">#${tag}</a>`)
          .join(", ")}
      </p>
    `}
    ${relatedPosts.length
      ? html`<p>
          Other posts that link here:
          ${relatedPosts
            .map(({ title, path }) => html`<a href="${path}">${title}</a>`)
            .join(", ")}
        </p>`
      : ""}

    <br />
  `;
}
