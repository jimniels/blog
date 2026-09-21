import { html } from "./utils.js";
import PageHeading from "./PageHeading.js";

/**
 * @param {"list" | "calendar"} active
 * @param {import("../types.js").Site} site
 */
export default function ArchiveToggle(active, site) {
  return html`
    <style>
      .archive-year {
        margin: 0 0 var(--s-24) 0;
        padding: var(--s-16) 0 var(--s-8);
        background: var(--c-bg);
        position: sticky;
        top: 0;
        z-index: 1;
        border-bottom: 1px solid var(--c-border);
      }
    </style>
    ${PageHeading({
      title: "Archive",
      navLabel: "Archive view",
      active,
      tabs: [
        { id: "list", href: "/archive/", label: "List" },
        { id: "calendar", href: "/archive/calendar/", label: "Calendar" },
      ],
    })}
    <p>
      This is all of it — ${site.posts.length} posts across
      ${new Date().getFullYear() - 2012} years. All available for free (you get
      what you pay for).
    </p>
  `;
}
