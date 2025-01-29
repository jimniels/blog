import { PostsList } from "../../../server/PostsList.js";
import { PostsNav } from "../../../server/PostsNav.js";
import { Page } from "../../../server/Layouts.js";
import { html, toDateUI } from "../../../server/utils.js";

const PAGE_PATH = "/archive/trending/";

/**
 * @param {import("types").Site} site
 * return {string}
 */
export default async function Index(site) {
  const posts = site.posts
    .filter((post) => post.hasOwnProperty("pageviews"))
    // @ts-expect-error
    .sort((a, b) => (a.pageviews > b.pageviews ? -1 : 1));

  return Page(
    {
      site,
      page: {
        title: "Trending Posts",
        path: PAGE_PATH,
      },
    },
    html`
      <h1>Posts</h1>
      ${PostsNav(PAGE_PATH)}
      ${PostsList(
        posts,
        ({ pageviews, date }) =>
          html` ${pageviews > 1000
            ? Math.round((pageviews / 1000) * 10) / 10 + "k"
            : pageviews}
          pageviews`
      )}
      <p
        style="color: var(--c-text-light); font-size: 0.8rem; margin: var(--s-24) 0;"
      >
        FYI: pageviews are based on the last 30 days of
        <a
          href="/2020/using-netlify-analytics-to-build-list-of-popular-posts/"
          style=" text-decoration: underline; color: inherit;"
          >analytics data I get from Netlify</a
        >.
      </p>
    `
  );
}
