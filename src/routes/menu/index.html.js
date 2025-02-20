import { Page } from "../../server/Layouts.js";
import { html, toDateUI } from "../../server/utils.js";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import ThemePicker from "../../server/ThemePicker.js";

/** @type {import('types').Route} */
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
      ${ThemePicker()}
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
    </main>`
  );
}
