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
  const relatedPosts = [];
  // const relatedPosts = Object.entries(site.internalLinksByPath).reduce(
  //   (acc, [postPath, linkedPaths]) => {
  //     // If a post has this post’s path in it's list of links, add it's metadata
  //     // to our list of related posts
  //     if (linkedPaths.includes(post.path)) {
  //       acc.push(site.posts.find((p) => p.path === postPath));
  //     }
  //     return acc;
  //   },
  //   []
  // );
  // console.log(relatedPosts);

  return html`
    <hr />
    ${post.footnotes?.length > 0 && html` ${post.footnotes} `}

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
      >
      · <a href="https://mastodon.social/@jimniels">Mastodon</a> ·

      <a href="https://bsky.app/profile/jim-nielsen.com">Bluesky</a>
    </p>

    ${relatedPosts.length > 0 &&
    html`
      <p>
        Related posts linking here:
        ${relatedPosts
          .map(
            ({ title, path, date }) =>
              html`<a href="${path}">(${date.slice(0, 4)}) ${title}</a>`
          )
          .join(" · ")}
      </p>
    `}
  `;
}
