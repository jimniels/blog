import { PageCustom } from "../server/Layouts.js";
import { html, toDateUI, toDateUIMin } from "../server/utils.js";

const page = {
  permalink: "/",
};

const nav = [
  {
    label: "Archive",
    permalink: "/archive/",
  },
  {
    label: "Tags",
    permalink: "/tags/",
  },
  {
    label: "About",
    permalink: "/about/",
  },
  {
    label: "Feeds",
    permalink: "/feeds/",
  },
];

const favIds = [
  "/2017/the-analog-web/",
  "/2015/a-web-of-people/",
  "/2019/good-things/",
  "/2019/netlify-public-folder-part-i-what/",
  "/2016/redesigning-and-engineering-timshel-admin/",
  "/2019/thoughts-on-rich-harris-talk/",
  "/2019/designing-and-engineering-progressive-disclosure/",
  "/2019/how-to-create-a-macos-menu-bar-app-for-netlify/",
  "/2019/building-a-progressively-enhanced-site/",
  "/2017/creating-ios-icon-masks-in-the-browser/",
];

export default function Index(site) {
  const postsByYear = site.posts.reduce((acc, post) => {
    const year = post.date.getFullYear();
    if (acc[year]) {
      acc[year].push(post);
    } else {
      acc[year] = [post];
    }
    return acc;
  }, {});

  const postList = Object.keys(postsByYear)
    .sort()
    .reverse()
    .map(
      (year) => html`
        <h2 id="y${year}">${year}</h2>
        <ul class="posts-list">
          ${postsByYear[year].map(
            (post) => html`
              <li>
                <a href="${post.permalink}"> ${post.title} </a>
                <time datetime="${post.date.toISOString()}">
                  ${toDateUIMin(post.date)}
                </time>
              </li>
            `
          )}
        </ul>
      `
    )
    .join("");

  const recent = site.posts.slice(0, 10);
  const favs = favIds.map((id) => {
    return site.posts.find((post) => post.permalink === id);
  });

  // prettier-ignore
  return PageCustom(
    { site, page },
    html`
      <h1>Jim<span> Nielsen</span>’s Blog</h1>

      <nav class="site-nav">
        <ul>
        ${nav.map(({ label, permalink }) => html`
          <li><a href="${permalink}">${label}</a></li>
        `)}
        </ul>
      </nav>
      
      ${BlogPostsStatus({ blogPosts: postsByYear[2021] && postsByYear[2021].length })}

      <h2>Latest</h2>
      ${PostList(recent)}

      <h2>Some Personal Favorites</h2>
      ${PostList(favs)}
      ${site.trendingPosts.length &&
        html`
          <h2>
            Popular This Month
            <small style="font-weight: normal">
              (<a
                href="/2020/using-netlify-analytics-to-build-list-of-popular-posts/"
                >According to Netlify Analytics</a
              >)</small
            >
          </h2>
          ${PostList(site.trendingPosts)}
        `}
    `
  );
}

function PostList(posts) {
  return html`
    <ul class="posts-list">
      ${posts.map(
        (post) => html`
          <li>
            <a href="${post.permalink}"> ${post.title} </a>
            <time datetime="${post.date.toISOString()}">
              ${toDateUI(post.date)}
            </time>
          </li>
        `
      )}
    </ul>
  `;
}
