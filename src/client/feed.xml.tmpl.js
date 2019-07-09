const { jim, toDateISO } = require("../server/utils.js");

// prettier-ignore
const XMLFeed = ({ site }) => jim`<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" 
    xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${site.name}</title>
      <description></description>
      <link>${site.origin}</link>
      <atom:link href="${site.origin}/feed.xml" rel="self" type="application/rss+xml" />
      ${site.posts.slice(0, 10).map(post => jim`
        <item>
            <title>${escapeXml(post.title)}</title>
            <description>${escapeXml(post.contents.toString())}</description>
            <pubDate>${post.date.toUTCString()}</pubDate>
            <link>${site.origin + post.permalink}</link>
            <guid isPermaLink="true">${site.origin + post.permalink}</guid>
        </item>
      `)}
    </channel>
  </rss>
`;

module.exports = {
  fn: XMLFeed
};

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function(c) {
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
