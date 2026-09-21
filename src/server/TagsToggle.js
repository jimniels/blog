import { html } from "./utils.js";
import PageHeading from "./PageHeading.js";

/**
 * @param {"az" | "count"} active
 * @param {number} tagCount
 */
export default function TagsToggle(active, tagCount) {
  return html`
    ${PageHeading({
      title: "Tags",
      navLabel: "Tag sort",
      active,
      tabs: [
        { id: "az", href: "/tags/", label: "A–Z" },
        { id: "count", href: "/tags/by-count/", label: "9–0" },
      ],
    })}
    <p>
      ${tagCount} tags — most of which are for me to keep track of posts I
      continually write about, so I retroactively apply tags.
    </p>
  `;
}
