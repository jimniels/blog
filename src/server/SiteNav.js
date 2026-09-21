import { html } from "./utils.js";
import { Icon } from "./Icon.js";

/**
 * Persistent site nav: sidebar on large screens, page footer on small ones.
 *
 * @param {{ path: string, name: string }} props
 */
export default function SiteNav({ path, name }) {
  const items = [
    {
      href: "/archive/",
      label: "Archive",
      current: path.startsWith("/archive/"),
    },
    {
      href: "/external-links/",
      label: "Links",
      current: path === "/external-links/" || path === "/internal-links/",
    },
    { href: "/tags/", label: "Tags", current: path.startsWith("/tags/") },
    { href: "/about/", label: "Stats", current: false },
    { href: "/about/", label: "About", current: path.startsWith("/about/") },
  ];

  return html`
    <nav id="site-nav" class="site-nav" aria-label="Primary">
      <a
        href="/"
        class="site-nav__brand"
        ${path === "/" ? `aria-current="page"` : ""}
        >${name}</a
      >
      <a
        href="/subscribe/"
        class="site-nav__subscribe"
        ${path === "/subscribe/" ? `aria-current="page"` : ""}
      >
        ${Icon("heroicon-rss")}
        Subscribe
      </a>
      <ul class="site-nav__links">
        ${items.map(
          (item) => html`
            <li>
              <a
                href="${item.href}"
                ${item.current ? `aria-current="page"` : ""}
                >${item.label}</a
              >
            </li>
          `
        )}
      </ul>
    </nav>
  `;
}
