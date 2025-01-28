import { PostsList } from "../server/PostsList.js";
import { PostsNav } from "../server/PostsNav.js";
// import { Page } from "../server/Layouts.js";
import { html, toDateUI } from "../server/utils.js";

/**
 * @param {import("types").Site} site
 * return {import("types").Page}
 */
export default async function Index(site) {
  const { Page } = await import("../server/Layouts.js" + "?t=" + Date.now());
  const recent = site.posts
    .filter((post) => !post?.tags.includes("rssClub"))
    .slice(0, 12);
  const trending = site.posts
    .filter((post) => post.hasOwnProperty("pageviews"))
    .sort((a, b) => (a.pageviews > b.pageviews ? -1 : 1));
  const hackerNews = site.posts
    .filter((post) => post.hackerNews && post.hackerNews.points > 100)
    .sort((a, b) => (a.hackerNews.points > b.hackerNews.points ? -1 : 1));

  return Page(
    {
      site,
      page: {
        path: "/",
      },
    },
    html`
      <h1>Posts</h1>
      ${PostsNav("/")} ${PostsList(recent)}
      ${
        /*trending.length > 0 &&
      html`
        <h1>Popular Now</h1>

        ${PostsList(
          trending.slice(0, 3),
          ({ pageviews }) =>
            (pageviews > 1000
              ? Math.round((pageviews / 1000) * 10) / 10 + "k"
              : pageviews) + " pageviews"
        )}
        ${PostMore(
          PostsList(
            trending.slice(3, 9),
            ({ pageviews }) =>
              (pageviews > 1000
                ? Math.round((pageviews / 1000) * 10) / 10 + "k"
                : pageviews) + " pageviews"
          )
        )}
      `}
      ${hackerNews.length > 0 &&
      html`
        <h1>Hacker News Hits</h1>
        ${PostsList(
          hackerNews.slice(0, 3),
          ({ hackerNews: { comments, points } }) =>
            html`${points.toLocaleString()} points ·
            ${comments.toLocaleString()} comments`
        )}
        ${PostMore(
          PostsList(
            hackerNews.slice(3, 9),
            ({ hackerNews: { comments, points } }) =>
              html`${points.toLocaleString()} points ·
              ${comments.toLocaleString()} comments`
          )
        )}
      `*/ ""
      }
      ${
        /*
      <h1>Praise For My Blog</h1>
      <div class="copy">
        <blockquote>
          <p>
            <a href="">Jeremy Keith</a>: “damn, do I enjoy reading [Jim’s] blog.
            Last year alone, I ended up linking to [his] posts ten different
            times.”
          </p>
        </blockquote>
        <blockquote>
          <p>
            <a href="">Sara Soueidan:</a>: “I, for one, love seeing [Jim’s]
            posts in my RSS reader.”
          </p>
        </blockquote>
      </div>
      */ ""
      }
    `
  );
}

function PostMore(children) {
  return html`
    <details style="margin-bottom: 2rem;">
      <summary
        style="margin: .5rem 0; color: var(--c-text-light); font-size: .875rem; cursor: pointer;"
      >
        Show more…
      </summary>
      ${children}
    </details>
  `;
}
