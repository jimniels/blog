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
