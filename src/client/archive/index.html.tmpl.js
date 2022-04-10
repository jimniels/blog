import { Page } from "../../server/Layouts.js";
import { html } from "../../server/utils.js";

const page = {
  title: "Archive",
  path: "/archive/",
};

export default function Archive(site) {
  const { postsByYear } = site;

  return Page(
    { site, page },
    html`
      <h1>Archive</h1>
      <ul class="list-2col">
        ${Object.keys(postsByYear)
          .sort()
          .reverse()
          .map(
            (year) => html`
              <li>
                <a href="#${year}">${year}</a>
                <small>(${postsByYear[year].length})</small>
              </li>
            `
          )}
      </ul>

      ${Object.keys(postsByYear)
        .sort()
        .reverse()
        .map(
          (year) => html`
            <h2
              id="${year}"
              style="position: sticky; top: 0px; background: var(--c-bg); z-index: 10;"
            >
              ${year}
              <small style="font-weight: normal">
                (${postsByYear[year].length})
              </small>
            </h2>
            <ul class="posts-list">
              ${postsByYear[year].map(
                (post) => html`
                  <li>
                    <a href="${post.path}"> ${post.title} </a>
                    <time datetime="${post.date}">
                      ${post.date.slice(5, 10)}
                    </time>
                  </li>
                `
              )}
            </ul>
          `
        )}
    `
  );
}
