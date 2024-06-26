import { Page } from "../server/Layouts.js";
import { html, toDateUI } from "../server/utils.js";

export default function Index(site) {
  const recent = site.posts.filter((post) => !post?.tags.includes("rssClub"));
  const trending = site.posts
    .filter((post) => post.hasOwnProperty("pageviews"))
    .sort((a, b) => (a.pageviews > b.pageviews ? -1 : 1));
  const hackerNews = site.posts
    .filter((post) => post.hackerNewsUrl && post.hackerNewsComments > 100)
    .sort((a, b) => (a.hackerNewsComments > b.hackerNewsComments ? -1 : 1));

  return Page(
    {
      site,
      page: {
        path: "/",
      },
    },
    html` <main class="wrapper">
      <h1>Latest</h1>
      ${PostList(recent.slice(0, 3))} ${PostMore(PostList(recent.slice(3, 9)))}
      ${trending.length > 0 &&
      html`
        <h1>
          Popular This Month
          <a
            style="font-size: .875rem; font-weight: normal;"
            href="/2020/using-netlify-analytics-to-build-list-of-popular-posts/"
            >(Courtesy of Netlify)</a
          >
        </h1>
        ${PostList(
          trending.slice(0, 3),
          ({ pageviews }) =>
            (pageviews > 1000
              ? Math.round((pageviews / 1000) * 10) / 10 + "k"
              : pageviews) + " pageviews"
        )}
        ${PostMore(
          PostList(
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
        ${PostList(
          hackerNews.slice(0, 3),
          ({ hackerNewsUrl, hackerNewsComments }) => html`<a
            href="${hackerNewsUrl}"
            >${hackerNewsComments} comments ↗</a
          >`
        )}
        ${PostMore(
          PostList(
            hackerNews.slice(3, 9),
            ({ hackerNewsUrl, hackerNewsComments }) => html`<a
              href="${hackerNewsUrl}"
              >${hackerNewsComments} comments ↗</a
            >`
          )
        )}
      `}
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
    </main>`
  );
}

function PostList(
  posts,
  fn = ({ date }) => html`<time datetime="${date}">${toDateUI(date)}</time>`
) {
  return html`
    <ul class="posts-list">
      ${posts.map(
        (post) => html`
          <li>
            <a href="${post.path}">${post.title}</a>
            <small>${fn(post)}</small>
          </li>
        `
      )}
    </ul>
  `;
}

function PostMore(children) {
  return html`
    <details style="margin: -1rem 0 3rem">
      <summary
        style="margin: 0 0 1rem; opacity: .5; font-size: .875rem; cursor: pointer;"
      >
        Show more…
      </summary>
      ${children}
    </details>
  `;
}
