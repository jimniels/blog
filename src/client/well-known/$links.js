/**
 * Render a page for each (make sure you have the redirects setup properly in
 * the _redirects file, that's the only way this works)
 * @param {import("../../../types").Site} site
 * @returns {Array<import("../../../types").DynamicPage>}
 */
export function getPages(site) {
  return [
    // These path to `/well-known/...` in the build output and then we do a
    // rewrite because netlify is apparently weird about hidden files
    // https://answers.netlify.com/t/hidden-files-removed-in-zip-deploy/8997
    {
      path: "well-known/links/404.json",
      contents: JSON.stringify({ error: "Domain not found" }),
    },
    {
      path: "well-known/links/index.json",
      contents: JSON.stringify(site.externalLinks),
    },
    ...site.externalLinks.map((item) => ({
      path: `well-known/links/${item.domain}.json`,
      contents: JSON.stringify(item),
    })),
  ];
}
