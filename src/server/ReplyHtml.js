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
    <span class="highlight">&lt;/the-end&gt;</span>&nbsp;&nbsp; Reply via
    <a
      href="mailto:jimniels+blog@gmail.com?subject=Re: blog.jim-nielsen.com${postPath}"
      >email</a
    >
    or <a href="https://twitter.com/jimniels">twitter</a>.
    ${Array.isArray(postTags) &&
    postTags.length > 0 &&
    html`
      Tagged in
      ${postTags
        .map((tag) => html`<a href="${siteOrigin}/tags/#${tag}">#${tag}</a>`)
        .join(", ")}.
    `}
  `;
}
