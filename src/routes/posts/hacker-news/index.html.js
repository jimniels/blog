import { PostsList } from "../../../server/PostsList.js";
import { PostsNav } from "../../../server/PostsNav.js";
import { Page } from "../../../server/Layouts.js";
import { html, toDateUI } from "../../../server/utils.js";
import PageNav from "../../../server/PageNav.js";

const page = {
  title: "Hacker News Hits",
  path: "/posts/hacker-news/",
};

/** @type {import("types").Route} */
export default async function Index(site) {
  const hackerNews = site.posts
    .filter((post) => post.hackerNews && post.hackerNews.points > 100)
    // @ts-expect-error
    .sort((a, b) => (a.hackerNews.points > b.hackerNews.points ? -1 : 1));

  return Page(
    {
      site,
      page,
    },
    html`<main class="wrapper">
      ${PageNav("Posts")} ${PostsNav(page.path)}
      ${PostsList(
        hackerNews,
        // @ts-expect-error
        ({ hackerNews: { comments, points } }) =>
          html`${points.toLocaleString()} points, ${comments.toLocaleString()}
          comments`
      )}
      <p class="posts-nav-note">
        “If you don’t get thrashed on whatever the HackerNews of the era is, you
        haven’t blogged enough.” —
        <a
          href="https://notes.jim-nielsen.com/#2025-02-12T0852"
          style="color: inherit; text-decoration: underline;"
          >Dave Rupert</a
        >
      </p>
    </main>`
  );
}
