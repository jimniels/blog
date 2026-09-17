import { html } from "./utils.js";

/**
 * Page title with a compact tab switcher, shared by Archive and Links.
 *
 * @param {{
 *   title: string,
 *   navLabel: string,
 *   active: string,
 *   tabs: Array<{ id: string, href: string, label: string }>
 * }} props
 */
export default function PageHeading({ title, navLabel, active, tabs }) {
  return html`
    <div class="page-heading">
      <h1>${title}</h1>
      <nav class="page-toggle" aria-label="${navLabel}">
        ${tabs.map(
          (tab) => html`
            <a
              href="${tab.href}"
              ${tab.id === active ? `aria-current="page"` : ""}
              >${tab.label}</a
            >
          `
        )}
      </nav>
    </div>
  `;
}
