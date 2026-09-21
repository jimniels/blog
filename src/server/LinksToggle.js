import PageHeading from "./PageHeading.js";

/**
 * @param {"external" | "internal"} active
 */
export default function LinksToggle(active) {
  return PageHeading({
    title: "Links",
    navLabel: "Links view",
    active,
    tabs: [
      { id: "external", href: "/external-links/", label: "External" },
      { id: "internal", href: "/internal-links/", label: "Internal" },
    ],
  });
}
