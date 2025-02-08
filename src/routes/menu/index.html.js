import { Page } from "../../server/Layouts.js";
import { html, toDateUI } from "../../server/utils.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

/**
 * @param {import("types").Site} site
 * @returns {string}
 */
export default function Index(site) {
  return Page(
    {
      site,
      page: {
        title: "Menu",
        path: "/menu/",
      },
    },
    html`
      <ul class="posts-list">
        <li>
          <a href="/about/">About</a>
        </li>
        <li>
          <a href="/subscribe/">Subscribe</a>
        </li>
        <li>
          <a href="/tags/">Tags</a>
        </li>
        <li>
          <a href="/about/internal-links/">Internal links</a>
        </li>
        <li>
          <a href="/about/external-links/">External links</a>
        </li>
      </ul>
    `
  );
}
