/**
 * Takes a date and returns how we format dates in the UI
 * @param {string} - ISO8601 date
 * @returns {string} - 2012-10-20
 */
export function toDateUI(date) {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("default", { month: "short" });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  return `${month} ${day}, ${year}`;
  return date.slice(0, 10);
}

/** Typical displayed length of a meta description in search results. */
export const META_DESCRIPTION_LENGTH = 160;

/**
 * Strip HTML to a plain-text excerpt for `<meta>` descriptions.
 * @param {string} html
 * @param {number} [maxLength]
 * @returns {string}
 */
export function excerptForMeta(html, maxLength = META_DESCRIPTION_LENGTH) {
  const text = String(html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

  let excerpt = text;
  if (text.length > maxLength) {
    excerpt = text.slice(0, maxLength);
    const lastSpace = excerpt.lastIndexOf(" ");
    if (lastSpace > maxLength * 0.6) {
      excerpt = excerpt.slice(0, lastSpace);
    }
    excerpt = excerpt.replace(/[\s.,;:!?–—-]+$/, "") + "…";
  }

  return excerpt
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Posts that link to the given post, newest-first by the order of site.posts.
 *
 * Lives here rather than in the template because Origami lambdas are async,
 * so `Array.prototype.find`/`filter` would test a promise and match everything.
 *
 * @param {import("types").Post} post
 * @param {import("types").Site} site
 * @returns {import("types").Post[]}
 */
export function relatedPosts(post, site) {
  const related = [];
  for (const [linkingPath, linkedPaths] of Object.entries(
    site.internalLinksByPath
  )) {
    if (!linkedPaths.includes(post.path)) continue;
    const result = site.posts.find((p) => p.path.startsWith(linkingPath));
    if (result) related.push(result);
  }
  return related;
}

/**
 * @param {string} unsafe
 * @returns {string}
 */
export function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
    }
  });
}
