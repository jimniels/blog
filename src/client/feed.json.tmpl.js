import RssClub from "../server/RssClub.js";
import ReplyHtml from "../server/ReplyHtml.js";

export default function JSONFeed(site) {
  return JSON.stringify({
    version: "https://jsonfeed.org/version/1",
    title: site.name,
    home_page_url: site.origin,
    feed_url: `${site.origin}/feed.json`,
    author: {
      name: "Jim Nielsen",
      url: "https://jim-nielsen.com/",
    },
    items: site.posts.slice(0, 10).map((post) => {
      return {
        id: post.path,
        date_published: post.date,
        title: post.title,
        url: post.permalink,
        tags: post.tags,
        content_html: post?.tags.includes("rssClub")
          ? RssClub()
          : "" +
            post.contents.toString() +
            ReplyHtml({
              postTags: post.tags,
              postPath: post.path,
              siteOrigin: site.origin,
            }),
      };
    }),
  });
}
