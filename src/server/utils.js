export function html(strings, ...values) {
  let out = "";
  strings.forEach((string, i) => {
    const value = values[i];

    // Array
    if (Array.isArray(value)) {
      out += string + value.join("");
      // String
    } else if (typeof value === "string") {
      out += string + value;
      // Number
    } else if (typeof value === "number") {
      out += string + String(value);
      // object
    } else if (typeof value === "object") {
      out += string + value;
      console.warn(
        "Templating warning: failed to coerce an object in your template."
      );
      // undefined, null, boolean
    } else {
      out += string;
    }
  });
  return out;
}

/**
 * Takes a date and returns how we format dates in the UI
 * @param {Date} date
 * @returns {string} - 2012-10-20
 */
export function toDateUI(date) {
  return date.toISOString().slice(0, 10);
}

/**
 * The replyHtml that appears at the bottom of each post, both on the site
 * as well as in the RSS feed.
 * @param {Array<string>} postTags - ["rssClub", "design"]
 * @param {string} postPath - /2021/slug-to-post
 * @param {string} siteOrigin - https://blog.jim-nielsen.com
 */
export function replyHtml({ postTags, postPath, siteOrigin }) {
  // @TODO add a view random post feature
  return html`
    <hr />
    <ul>
      ${Array.isArray(postTags) &&
      postTags.length > 0 &&
      html`<li>
        Tagged in:
        ${postTags
          .map((tag) => `<a href="${siteOrigin}/tags/#${tag}">#${tag}</a>`)
          .join(", ")}
      </li>`}
      <li>
        <a
          href="mailto:spokes-probes.0w@icloud.com?subject=Re: blog.jim-nielsen.com${postPath}"
          >Reply via email</a
        >
      </li>
      <li><a href="https://twitter.com/jimniels">Reply on twitter</a></li>
    </ul>
  `;
}

/**
 * Preface to any post published as part of RSS Club.
 * @returns {string}
 */
export function rssClubHtml() {
  return `
    <p style="font-family:monospace;">
      This post is a secret to everyone! <a href="https://daverupert.com/rss-club/">Read more about RSS Club.</a>    
    <p>
  `;
}
