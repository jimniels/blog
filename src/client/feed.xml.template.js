function FeedXML({ site }) {
  // @TODO XML escape?
  // @TODO post.date format
  return (`
    <?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
          <title>${site.name}</title>
          <description>${site.description}</description>
          <link>${site.url}</link>
          <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
          ${site.posts.slice(0, 10).map(post => `
            <item>
              <title>${post.title}</title>
              <description>${post.content}</description>
              <pubDate>{{ post.date | date: "%a, %d %b %Y %H:%M:%S %z" }}</pubDate>
              <link>${site.url + post.permalink}</link>
              <guid isPermaLink="true">${site.url + post.permalink}</guid>
          </item>
          `).join("")}
      </channel>
  </rss>
  `)
}



module.exports = FeedXML;