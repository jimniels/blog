import Layout from "../../server/Layout.js";
import { jim } from "../../server/utils.js";

// prettier-ignore
const Tags = ({ site, page }) => `
  <h1>All Tags Index</h1>
  <ul>
    ${site.tags.map(
      ({ name, count }) => `
        <li>
          <a href="#${name}">#${name}</a> (${count})
        </li>
      `)}
  </ul>


  ${site.tags.map(({ name, count }) => `
    <h2 id="${name}" style="margin-bottom: 1rem;">
      #${name}
      <span style="font-weight: normal">
        (${count})
      </span>
    </h2>

    <ul class="posts-list">
      ${site.posts.filter(post => post.tags && post.tags.includes(name)).map(post => `
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
`;

export default Layout(Tags, {
  title: "Tags",
  id: "tags"
});
