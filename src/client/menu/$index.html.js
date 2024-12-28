import { Page } from "../../server/Layouts.js";
import { html, toDateUI } from "../../server/utils.js";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const importFile = (filepath) =>
  fs.readFileSync(join(__dirname, filepath)).toString();

export default function Index(site) {
  return Page(
    {
      site,
      page: {
        title: "Menu",
        path: "/menu/",
      },
    },
    html` <main class="wrapper">
      <ul class="posts-list">
        <li>
          <a href="/archive/">Archive</a>
        </li>
        <li>
          <a href="/tags/">Tags</a>
        </li>
        <li>
          <a href="/feed.html">Subscribe</a>
        </li>
        <li>
          <a href="/about/">About</a>
        </li>
        <li>
          <a href="/about/internal-links/">Internal links</a>
        </li>
        <li>
          <a href="/about/external-links/">External links</a>
        </li>
      </ul>
    </main>`
  );
}
