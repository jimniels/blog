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
 * The replyHtml that appears at the bottom of each post, both in feeds and in RSS
 * @param {Array<string>} postTags
 * @param {string} postLink
 * @param {string} siteOrigin
 */
const replyHtml = ({ postTags, postLink, siteOrigin }) =>
  html`
    <hr />
    ${Array.isArray(postTags) &&
    html`<p>
      Tagged in:
      ${postTags
        .map((tag) => `<a href="${siteOrigin}/tags/#${tag}">#${tag}</a>`)
        .join(",&nbsp;")}
    </p>`}

    <p>
      Comment? Feedback? I like hearing your thoughts:
      <a href="https://twitter.com/jimniels">@jimniels</a> on twitter, or
      <a
        href="mailto:jimniels@gmail.com?subject=Reply on blog.jim-nielsen.com&body=Source article ${postLink}"
        >jimniels@gmail</a
      >
      on email.
    </p>
  `;

export { html, toDateUI, toDateUIMin, replyHtml };
