import { html as xml, replyHtml, rssClubHtml } from "../server/utils.js";

// prettier-ignore
export default function XMLFeed(site) {
  return xml`<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" 
    xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${site.name}</title>
      <description></description>
      <link>${site.origin}</link>
      <atom:link href="${site.origin}/feed.xml" rel="self" type="application/rss+xml" />
      ${site.posts.slice(0, 10).map(post => xml`
        <item>
            <title>${escapeXml(post.title)}</title>
            <description>${escapeXml(post?.tags.includes("rssClub") ? rssClubHtml() : "" + post.contents.toString() + replyHtml({ postTags: post.tags, postLink: site.origin + post.permalink, siteOrigin: site.origin }))}</description>
            <pubDate>${post.date.toUTCString()}</pubDate>
            <link>${site.origin + post.permalink}</link>
            <guid isPermaLink="true">${site.origin + post.permalink}</guid>
        </item>
      `)}
    </channel>
  </rss>
  `;
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
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
