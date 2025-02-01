import { PostsList } from "../server/PostsList.js";
import { PostsNav } from "../server/PostsNav.js";
// import { Page } from "../server/Layouts.js";
import { html, readFile, toDateUI } from "../server/utils.js";

/**
 * @param {import("types").Site} site
 * return {import("types").Page}
 */
export default async function Index(site) {
  const { Page } = await import("../server/Layouts.js?d=" + Date.now());
  const posts = site.posts
    .filter((post) => !post?.tags.includes("rssClub"))
    .slice(0, 12);

  return Page(
    {
      site,
      page: {
        title: "",
        path: "/",
      },
    },
    html`
      <h1>Posts</h1>
      ${PostsNav("/")} ${PostsList(posts)}
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
