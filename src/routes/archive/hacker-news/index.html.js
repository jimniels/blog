import { PostsList } from "../../../server/PostsList.js";
import { PostsNav } from "../../../server/PostsNav.js";
// import { Page } from "../../../server/Layouts.js";
import { html, toDateUI } from "../../../server/utils.js";

/**
 * @param {import("../../../../types").Site} site
 * return {import("../../../../types").Page}
 */
export default async function Index(site) {
  const { Page } = await import(
    "../../../server/Layouts.js" + "?t=" + Date.now()
  );
  const recent = site.posts.filter((post) => !post?.tags.includes("rssClub"));

  const hackerNews = site.posts
    .filter((post) => post.hackerNews && post.hackerNews.points > 100)
    .sort((a, b) => (a.hackerNews.points > b.hackerNews.points ? -1 : 1));

  return Page(
    {
      site,
      page: {
        path: "/archive/hacker-news/",
      },
    },
    html`
      <h1>Posts</h1>
      ${PostsNav("/archive/hacker-news/")}
      ${PostsList(
        hackerNews,
        ({ hackerNews: { comments, points } }) =>
          html`${points.toLocaleString()} points · ${comments.toLocaleString()}
          comments`
      )}
    `
  );
}
