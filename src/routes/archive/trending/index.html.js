import { PostsList } from "../../../server/PostsList.js";
import { PostsNav } from "../../../server/PostsNav.js";
import { Page } from "../../../server/Layouts.js";
import { html, toDateUI } from "../../../server/utils.js";

const page = {
  title: "Trending Posts",
  path: "/archive/trending/",
};

/** @type {import("types").Route} */
export default async function Index(site) {
  const posts = site.posts
    .filter((post) => post.hasOwnProperty("pageviews"))
    // @ts-expect-error
    .sort((a, b) => (a.pageviews > b.pageviews ? -1 : 1));

  return Page(
    {
      site,
      page,
    },
    html`<main class="wrapper">
      <h1>Posts</h1>
      ${PostsNav(page.path)}
      ${PostsList(
        posts,
        ({ pageviews, date }) =>
          // @ts-expect-error
          html` ${pageviews > 1000
            ? // @ts-expect-error
              Math.round((pageviews / 1000) * 10) / 10 + "k"
            : pageviews}
          pageviews`
      )}
      <p class="posts-nav-note">
        FYI: pageviews are based on the last 30 days of
        <a
          href="/2020/using-netlify-analytics-to-build-list-of-popular-posts/"
          style=" text-decoration: underline; color: inherit;"
          >analytics data I get from Netlify</a
        >.
      </p>
    </main>`
  );
}
