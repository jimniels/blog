const items = [
  {
    title: "Posts",
    href: "/",
  },
  {
    title: "Tags",
    href: "/tags/",
  },

  {
    title: "About",
    href: "/about/",
  },

  {
    title: "Archive",
    href: "/archive/",
  },
  {
    title: "External Links",
    href: "/about/external-links/",
  },
  {
    title: "Internal Links",
    href: "/about/internal-links/",
  },
];

export default function PageNav(_) {
  return `<details class="page-nav">
  <summary class="h1">${_}</summary>
  <div style="display: inline-flex; flex-direction: column; gap: 4px">
    ${items
      .filter((item) => item.title !== _)
      .map(
        (item) =>
          `<a href="${item.href}" class="h1" aria-current="${
            item.title === _ ? "page" : "false"
          }">${item.title}</a>`
      )
      .join("")}
    
  </div>
</details>`;
}
