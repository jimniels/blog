import * as fs from "fs";
import { fileURLToPath } from "url";

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
 * @param {string} - ISO8601 date
 * @returns {string} - 2012-10-20
 */
export function toDateUI(date) {
  return date.slice(0, 10);
}

/** Typical displayed length of a meta description in search results. */
export const META_DESCRIPTION_LENGTH = 160;

/**
 * Strip HTML to a plain-text excerpt for `<meta>` descriptions.
 * @param {string} html
 * @param {number} [maxLength]
 * @returns {string}
 */
export function excerptForMeta(html, maxLength = META_DESCRIPTION_LENGTH) {
  const text = String(html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

  let excerpt = text;
  if (text.length > maxLength) {
    excerpt = text.slice(0, maxLength);
    const lastSpace = excerpt.lastIndexOf(" ");
    if (lastSpace > maxLength * 0.6) {
      excerpt = excerpt.slice(0, lastSpace);
    }
    excerpt = excerpt.replace(/[\s.,;:!?–—-]+$/, "") + "…";
  }

  return excerpt
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 *
 * @param {string} relativeFilePath
 * @returns {string}
 */
export function readFile(relativeFilePath) {
  const fileUrl = import.meta.resolve(relativeFilePath);
  const filePath = fileURLToPath(fileUrl);
  return fs.readFileSync(filePath).toString();
}
