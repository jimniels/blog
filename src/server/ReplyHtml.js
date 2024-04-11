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
    ${post.footnotes.length > 0 &&
    html`
      <h5>Footnotes</h5>
      ${post.footnotes}
    `}

    <h5>Reply</h5>
    <ul>
      ${
        /* Trippy: we gotta encode the "+" or we get bit by outlook
             https://webmasters.stackexchange.com/questions/15920/should-plus-be-encoded-in-mailto-hyperlinks */
        ""
      }
      <li>
        <a
          href="mailto:jimniels%2Bblog@gmail.com?subject=Re:%20blog.jim-nielsen.com${postPath}"
          >Email</a
        >
      </li>
      <li><a href="https://mastodon.social/@jimniels">Mastodon</a></li>
      <li>
        <a href="https://twitter.com/jimniels">Twitter</a>
      </li>
    </ul>

    ${Array.isArray(postTags) &&
    postTags.length > 0 &&
    html`
      <h5>Tags</h5>
      <ul>
        ${postTags.map(
          (tag) => html`<li><a href="/tags/#${tag}">#${tag}</a></li>`
        )}
      </ul>
    `}
    ${relatedPosts.length > 0 &&
    html`
      <h5>Other posts that link here</h5>
      <ul>
        ${relatedPosts.map(
          ({ title, path, date }) =>
            html`<li><a href="${path}">(${date.slice(0, 4)}) ${title}</a></li>`
        )}
      </ul>
    `}
  `;
}
