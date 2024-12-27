import { Page } from "../../server/Layouts.js";
import { html, toDateUI } from "../../server/utils.js";

const page = {
  title: "Tags",
  path: "/tags/",
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

  return Page(
    { site, page },
    html` <main class="wrapper">
      <h1>Tags</h1>
      <!--<ul class="list-2col">
        ${tags.map(
        (tag) => html`
          <li>
            <a href="#${tag}">#${tag}</a>
            <small
              style="font-weight: 300; font-size: 1rem; color: var(--c-text-light)"
              >(${postsByTag[tag].length})</small
            >
          </li>
        `
      )}
      </ul>-->

      ${tags.map(
        (tag) => html`
          <h2 id="${tag}" style="margin: 2rem 0 .5rem;">
            #${tag}
            <small
              style="font-weight: 300; font-size: 1rem; color: var(--c-text-light)"
            >
              (${postsByTag[tag].length})
            </small>
          </h2>

          <ul class="posts-list">
            ${postsByTag[tag].map(
              (post) => html`
                <li class="post-wrapper">
                  <a href="${post.path}">
                    <span>${post.title}</span>
                    <span>
                      <time class="date post-date" datetime="${post.date}">
                        ${toDateUI(post.date)}
                      </time>
                    </span>
                  </a>
                </li>
              `
            )}
          </ul>
        `
      )}
    </main>`
  );
}
