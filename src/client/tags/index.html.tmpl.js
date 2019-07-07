const { Page } = require("../../server/Layout.js");
const { jim } = require("../../server/utils.js");

const page = {
  title: "Tags",
  id: "tags"
};

// prettier-ignore
const Tags = (site) => Page({ site, page }, jim`
  <h1>All Tags Index</h1>
  <ul>
    ${site.tags.map(
      ({ name, count }) => `
        <li>
          <a href="#${name}">#${name}</a> (${count})
        </li>
      `)}
  </ul>

  ${site.tags.map(({ name, count }) => jim`
    <h2 id="${name}" style="margin-bottom: 1rem;">
      #${name}
      <span style="font-weight: normal">
        (${count})
      </span>
    </h2>

    <ul class="posts-list">
      ${site.posts
        .filter(post => post.tags && post.tags.includes(name))
        .map(post => jim`
          <li class="post-wrapper">
            <a href="${site.baseurl}${post.url}">
              ${post.title}
            </a>
            <time class="date post-date">
              ${post.date}
            </time>
          </li>
      `)}
    </ul>
  `)}
`);

module.exports = Tags;
