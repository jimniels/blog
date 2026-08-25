import { html } from "./utils.js";

/**
 * @param {"list" | "calendar"} active
 * @param {import("../types.js").Site} site
 */
export default function ArchiveToggle(active, site) {
  return html`
    <style>
      .archive-heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--s-16);
        margin-bottom: var(--s-16);
      }
      .archive-heading h1 {
        margin: 0;
      }
      .archive-year {
        margin: 0 0 var(--s-24) 0;
        padding: var(--s-16) 0 var(--s-8);
        background: var(--c-bg);
        position: sticky;
        top: 0;
        z-index: 1;
        border-bottom: 1px solid var(--c-border);
      }
      .archive-toggle {
        display: flex;
        flex-shrink: 0;
        font-size: 0.777rem;
      }
      .archive-toggle a {
        text-decoration: none;
        padding: var(--s-4) var(--s-12);
        border-radius: calc(var(--border-radius) - var(--s-2));
      }
      .archive-toggle a:hover,
      .archive-toggle a:active {
        text-decoration: underline;
      }
      .archive-toggle a[aria-current="page"] {
        background: var(--c-fg);
        color: var(--c-text);
        pointer-events: none;
        text-decoration: none;
      }
    </style>
    <div class="archive-heading">
      <h1>Archive</h1>
      <nav class="archive-toggle" aria-label="Archive view">
        <a href="/archive/" ${active === "list" ? `aria-current="page"` : ""}
          >List</a
        >
        <a
          href="/archive/calendar/"
          ${active === "calendar" ? `aria-current="page"` : ""}
          >Calendar</a
        >
      </nav>
    </div>
    <p>
      This is all of it — ${site.posts.length} posts across
      ${new Date().getFullYear() - 2012} years. All available for free (you get
      what you pay for).
    </p>
  `;
}
