const { toDateISO } = require("../server/utils.js");
const JSONFeed = ({ site }) => {
  return JSON.stringify({
    version: "https://jsonfeed.org/version/1",
    title: site.name,
    home_page_url: site.origin,
    feed_url: `${site.origin}/feed.json`,
    author: {
      name: "Jim Nielsen",
      url: "https://jim-nielsen.com/"
    },
    items: site.posts.slice(0, 10).map(post => ({
      // You can phase this out once you have at least 10 posts newer than
      // the date below (as that was the old ID)
      id:
        toDateISO(post.date) > "2019-07-03"
          ? post.permalink
          : toDateISO(post.date),
      date_published: toDateISO(post.date),
      title: post.title,
      url: site.origin + post.permalink,
      tags: post.tags,
      content_html: post.contents.toString()
    }))
  });
};

module.exports = {
  fn: JSONFeed
};
