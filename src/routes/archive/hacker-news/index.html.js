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
          html`${points.toLocaleString()} points, ${comments.toLocaleString()}
          comments`
      )}
      <p
        style="color: var(--c-text-light); font-size: 0.8rem; margin: var(--s-24) 0;"
      >
        As <a href="https://shoptalkshow.com/651/#t=03:13">Dave Rupert said</a>,
        “If you don’t get thrashed on whatever the HackerNews of the era is, you
        haven’t blogged enough.”
      </p>
    `
  );
}
