import { readFile } from "../server/utils.js";

export default function () {
  return `${[
    "../server/styles/modern-normalize.css",
    "../server/styles/styles.css",
  ]
    .map(readFile)
    .join("")}
  :root,
   :root[data-theme-appearance="light"] {
     ${readFile("../server/styles/atom-one-light.css")}
   }
 :root[data-theme-appearance="dark"] {
   ${readFile("../server/styles/atom-one-dark.css")}
 }`;
}
