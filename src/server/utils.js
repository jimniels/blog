const html = (strings, ...values) => {
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
};

const toDateUI = (date) => {
  return date.toISOString().slice(0, 10);
};
const toDateUIMin = (date) => toDateUI(date).split(",")[0];

/**
 * The replyHtml that appears at the bottom of each post, both on the site
 * as well as in the RSS feed
 * @param {Array<string>} postTags
 * @param {string} postLink
 * @param {string} siteOrigin
 */
const replyHtml = ({ postTags, postLink, siteOrigin }) =>
  // @TODO add a view random post feature
  html`
    <hr />
    <ul>
      ${Array.isArray(postTags) &&
      html`<li>
        Tagged in:
        ${postTags
          .map((tag) => `<a href="${siteOrigin}/tags/#${tag}">#${tag}</a>`)
          .join(", ")}
      </li>`}
      <li>
        <a
          href="mailto:spokes-probes.0w@icloud.com?subject=Re: blog.jim-nielsen.com${postLink}"
          >Reply via email</a
        >
      </li>
      <li><a href="https://twitter.com/jimniels">Reply on twitter</a></li>
    </ul>
  `;

const rssClubHtml = () => `
  <pre style="font-size: 12px; font-family:monospace; line-height: 1.2; margin: 0;">
_______________________    ______________ _____  _________ 
___  __ \_  ___/_  ___/    __  ____/__  / __  / / /__  __ )
__  /_/ /____ \_____ \     _  /    __  /  _  / / /__  __  |
_  _, _/____/ /____/ /     / /___  _  /___/ /_/ / _  /_/ / 
/_/ |_| /____/ /____/      \____/  /_____/\____/  /_____/                      
  </pre>
  <p style="font-size: 12px; font-family:monospace;">
    It’s a secret to everyone! <a href="https://daverupert.com/rss-club/">Read more about RSS Club.</a>    
  <p>
`;

export { html, toDateUI, toDateUIMin, replyHtml, rssClubHtml };
