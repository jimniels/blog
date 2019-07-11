const { PageCustom } = require("../server/Layouts.js");
const { jim, toDateUI, toDateUIMin } = require("../server/utils.js");

const Index = ({ site, page }) => {
  const postsByYear = site.posts.reduce((acc, post) => {
    const year = post.date.getFullYear();
    if (acc[year]) {
      acc[year].push(post);
    } else {
      acc[year] = [post];
    }
    return acc;
  }, {});

  return PageCustom(
    { site, page },
    Object.keys(postsByYear)
      .sort()
      .reverse()
      .map(
        year => jim`
        <h2 id="y${year}">
          ${year}
        </h2>
        <ul class="posts-list">
          ${postsByYear[year].map(
            post => `
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
  );
};

module.exports = {
  fn: Index,
  props: {
    id: "home"
  }
};
