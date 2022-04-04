import { html } from "./utils.js";

/**
 * The html that appears at the bottom of each post, both on the site
 * as well as in the RSS feed.
 * @param {Array<string>} postTags - ["rssClub", "design"]
 * @param {string} postPath - /2021/slug-to-post
 * @param {string} siteOrigin - https://blog.jim-nielsen.com
 */
export default function ReplyHtml({ postTags, postPath, siteOrigin }) {
  // @TODO add a view random post feature
  return html`
    <br />
    <br />
    <p>&lt;/&gt;</p>
    <p>
      Reply via:
      <a
        href="mailto:spokes-probes.0w@icloud.com?subject=Re: blog.jim-nielsen.com${postPath}"
        >Email</a
      >,
      <a href="https://twitter.com/jimniels">Twitter</a>
    </p>
    ${Array.isArray(postTags) &&
    postTags.length > 0 &&
    html`
      <p>
        Tagged:
        ${postTags
          .map((tag) => html`<a href="${siteOrigin}/tags/#${tag}">#${tag}</a>`)
          .join(", ")}
      </p>
    `}
  `;
}
