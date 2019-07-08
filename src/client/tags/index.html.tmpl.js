const { PageCustom } = require("../../server/Layouts.js");
const { jim, toDateISO, toDateUI } = require("../../server/utils.js");

const Tags = ({ site, page }) => {
  const postsByTag = site.posts.reduce((acc, post) => {
    if (post.tags) {
      post.tags.forEach(tag => {
        if (acc[tag]) {
          acc[tag].push(post);
        } else {
          acc[tag] = [post];
        }
      });
    }
    return acc;
  }, {});

  const tags = Object.keys(postsByTag).sort();

  // prettier-ignore
  return PageCustom({ site, page }, jim`
    <h1>All Tags Index</h1>
    <ul>
      ${tags.map(
        tag => `
          <li>
            <a href="#${tag}">#${tag}</a> (${postsByTag[tag].length})
          </li>
        `)}
    </ul>

    ${tags.map(tag => jim`
      <h2 id="${tag}" style="margin-bottom: 1rem;">
        #${tag}
        <small style="font-weight: normal">
          (${postsByTag[tag].length})
        </small>
      </h2>

      <ul class="posts-list">
        ${postsByTag[tag].map(post => jim`
          <li class="post-wrapper">
            <a href="${post.permalink}">${post.title}</a>
            <time class="date post-date" datetime="${toDateISO(post.date)}">
              ${toDateUI(post.date)}
            </time>
          </li>
        `)}
      </ul>
    `)}
  `);
};

module.exports = {
  fn: Tags,
  props: {
    title: "Tags",
    id: "tags"
  }
};
