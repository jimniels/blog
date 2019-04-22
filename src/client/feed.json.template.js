const { toDateForComputers } = require("../server/utils/date.js");

function FeedJSON({ site }) {
  return JSON.stringify({
    version: "https://jsonfeed.org/version/1",
    title: site.name,
    home_page_url: site.url,
    feed_url: `${site.url}/feed.json`,
    author: {
      name: "Jim Nielsen",
      url: "https://jim-nielsen.com/"
    },
    items: site.post.slice(0, 10).map(post => ({
      id: post.permalink,
      date_published: toDateForComputers(post.date),
      title: post.title,
      url: post.permalink,
      tags: post.tags ? post.tags : [],
      content_html: post.content
    }))
  });
}

module.exports = FeedJSON;
