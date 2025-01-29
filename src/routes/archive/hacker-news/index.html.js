import { PostsList } from "../../../server/PostsList.js";
import { PostsNav } from "../../../server/PostsNav.js";
import { Page } from "../../../server/Layouts.js";
import { html, toDateUI } from "../../../server/utils.js";

/**
 * @param {import("types").Site} site
 * return {import("types").Page}
 */
export default async function Index(site) {
  const hackerNews = site.posts
    .filter((post) => post.hackerNews && post.hackerNews.points > 100)
    // @ts-expect-error
    .sort((a, b) => (a.hackerNews.points > b.hackerNews.points ? -1 : 1));

  return Page(
    {
      site,
      page: {
        title: "Hacker News Hits",
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
