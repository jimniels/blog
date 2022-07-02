import { Page } from "../server/Layouts.js";
import { html, toDateUI } from "../server/utils.js";

const page = {
  path: "/",
};

export default function Index(site) {
  const recent = site.posts
    .filter((post) => !post?.tags.includes("rssClub"))
    .slice(0, 5);
  const trending = site.posts
    .filter((post) => post.hasOwnProperty("pageviews"))
    .sort((a, b) => (a.pageviews > b.pageviews ? -1 : 1))
    .slice(0, 5);

  return Page(
    { site, page },
    html` <main class="wrapper">
      <h1>Latest Posts</h1>
      ${PostList(recent, { showAllLink: true })}
      ${trending.length > 0 &&
      html`
        <h1>
          Recently Popular
          <a
            style="font-size: .875rem; font-weight: normal;"
            href="/2020/using-netlify-analytics-to-build-list-of-popular-posts/"
            >(Data courtesy of Netlify)</a
          >
        </h1>
        ${PostList(trending, { showPageviews: true })}
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

function PostList(posts, { showPageviews } = { showPageviews: false }) {
  return html`
    <ul class="posts-list">
      ${posts.map(
        ({ path, title, pageviews, date }) => html`
          <li>
            <a href="${path}">${title}</a>
            <small>
              <time datetime="${date}">${toDateUI(date)}</time>
              ${showPageviews
                ? pageviews > 1000
                  ? Math.round((pageviews / 1000) * 10) / 10 + "k"
                  : pageviews
                : ""}
            </small>
          </li>
        `
      )}
    </ul>
  `;
}
