import { PageCustom } from "../../server/Layouts.js";
import { html, toDateUI } from "../../server/utils.js";

const page = {
  title: "Tags",
  permalink: "/tags/",
};

export default function Tags(site) {
  const postsByTag = site.posts.reduce((acc, post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        if (acc[tag]) {
          acc[tag].push(post);
        } else {
          acc[tag] = [post];
        }
      });
    }
    return acc;
  }, {});

  let tags = Object.keys(postsByTag)
    .sort()
    .filter((tag) => tag !== "rssClub");

  // prettier-ignore
  return PageCustom({ site, page }, html`
    <h1>Tags <small>(${tags.length})</small></h1>
    <style>
      @media screen and (min-width: 50rem) {
        #post-tags { column-count: 2; max-width: 40rem;}
      }
    </style>
    <ul id="post-tags">
      ${tags.map(
        tag => html`
          <li>
            <a href="#${tag}">#${tag}</a> (${postsByTag[tag].length})
          </li>
        `)}
    </ul>

    ${tags.map(tag => html`
      <h2 id="${tag}" style="margin-bottom: 1rem;">
        #${tag}
        <small style="font-weight: normal">
          (${postsByTag[tag].length})
        </small>
      </h2>

      <ul class="posts-list">
        ${postsByTag[tag].map(post => html`
          <li class="post-wrapper">
            <a href="${post.permalink}">${post.title}</a>
            <time class="date post-date" datetime="${post.date.toISOString()}">
              ${toDateUI(post.date)}
            </time>
          </li>
        `)}
      </ul>
    `)}
  `);
}
