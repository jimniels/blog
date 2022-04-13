import { Page } from "../server/Layouts.js";
import { html, toDateUI } from "../server/utils.js";

const page = {
  path: "/",
};

const qs = [
  {
    blogLink: "https://blog.jim-nielsen.com/2021/css-system-colors/",
    title: "CSS System Colors",
    person: "Scott Jehl",
    link: "https://twitter.com/scottjehl/status/1403045035940139010?s=20&t=xulk0AxlwJ-FDvmo_s-NOg",
    quote:
      "This post about CSS system colors by @jimniels is very cool. Had no idea about these!",
  },
  {
    blogLink:
      "https://blog.jim-nielsen.com/2021/defining-basic-javascript-terms/",
    title: "Defining Basic JavaScript Terms: map, filter, and reduce",
    person: "Sara Soueidan",
    link: "https://twitter.com/scottjehl/status/1403045035940139010?s=20&t=xulk0AxlwJ-FDvmo_s-NOg",
    quote:
      "I can’t help but think how much easier JavaScript would have been to learn for beginners if all concepts were explained as friendly as ⁦@jimniels explains map, filter and reduce",
  },
  {
    blogLink: "",
    title: "The Optional Chaining Operator, “Modern” Browsers, and My Mom",
    person: "Eric Bailey",
    link: "",
    quote: "@jimniels is a great writer. Y'all should follow him.",
  },
  {
    blogLink: "",
    title: "Inspecting Web Views in macOS",
    person: "Guillermo Rauch",
    link: "",
    quote: "Wild! ⚛️",
  },
  {
    blogLink: "",
    title: "Codebase Collaboration Between Humans and Robots",
    person: "Dave Rupert",
    link: "",
    quote:
      "🧡 This post by @jimniels is everything! I love the distinction between code for humans and code for robots.",
  },
];

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
    html`
      <h1>Latest Posts</h1>
      ${PostList(recent)}
      ${trending.length > 0 &&
      html`
        <h1>
          Popular Posts This Month (<a
            href="/2020/using-netlify-analytics-to-build-list-of-popular-posts/"
            >According to the Data</a
          >)
        </h1>
        ${PostList(trending, true)}
      `}
      <h1>Posts With Endorsements</h1>
      <div class="copy">
        ${qs.map(
          (q) => html`
            <p>
              <a href="${q.link}">${q.person}</a> on
              <a href="${q.blogLink}">${q.title}</a>: “${q.quote}”
            </p>
          `
        )}
      </div>

      <!--
      <h1>Endorsing My Blog</h1>
      <div class="copy">
        <p><a href="">Jeremy Keith</a>:</p>
        <blockquote>
          damn, do I enjoy reading [Jim’s] blog. Last year alone, I ended up
          linking to [his] posts ten different times.
        </blockquote>

        <p><a href="">Sara Soueidan:</a></p>
        <blockquote>
          I, for one, love seeing [Jim’s] posts in my RSS reader.
        </blockquote>
      </div>-->
    `
  );
}

function PostList(posts, showPageviews = false) {
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
