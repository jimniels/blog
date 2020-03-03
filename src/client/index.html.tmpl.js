import { PageCustom } from "../server/Layouts.js";
import BlogPostsStatus from "../server/BlogPostsStatus.js";
import { html, toDateUI, toDateUIMin } from "../server/utils.js";

const page = {
  id: "home"
};

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
  "/2017/creating-ios-icon-masks-in-the-browser/"
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
      year => html`
        <h2 id="y${year}">
          ${year}
        </h2>
        <ul class="posts-list">
          ${postsByYear[year].map(
            post => html`
              <li>
                <a href="${post.permalink}">
                  ${post.title}
                </a>
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
  const favs = favIds.map(id => {
    return site.posts.find(post => post.permalink === id);
  });

  return PageCustom(
    { site, page },
    html`
      ${BlogPostsStatus({ blogPosts: postsByYear[2020].length })}

      <h2>Latest</h2>
      ${PostList(recent)}

      <h2>Some Personal Favorites</h2>
      ${PostList(favs)}
    `
  );
}

function PostList(posts) {
  return html`
    <ul class="posts-list">
      ${posts.map(
        post => html`
          <li>
            <a href="${post.permalink}">
              ${post.title}
            </a>
            <time datetime="${post.date.toISOString()}">
              ${toDateUI(post.date)}
            </time>
          </li>
        `
      )}
    </ul>
  `;
}
