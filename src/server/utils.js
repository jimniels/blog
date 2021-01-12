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

const replyHtml = (postLink) =>
  // prettier-ignore
  html`<hr /><p><a href="mailto:jimniels@gmail.com?subject=RSS Reply&body=Source article ${postLink}">Reply via email</a></p>`;

export { html, toDateUI, toDateUIMin, replyHtml };
