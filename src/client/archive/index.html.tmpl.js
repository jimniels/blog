import { PageCustom } from "../../server/Layouts.js";
import { html } from "../../server/utils.js";

const page = {
  title: "Archive",
  permalink: "/archive/",
};

export default function Archive(site) {
  const { postsByYear } = site;

  return PageCustom(
    { site, page },
    html`
      <h1>Archive</h1>
      <ul>
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
            <h2 id="${year}">
              ${year}
              <small style="font-weight: normal">
                (${postsByYear[year].length})
              </small>
            </h2>
            <ul class="posts-list">
              ${postsByYear[year].map(
                (post) => html`
                  <li>
                    <a href="${post.permalink}"> ${post.title} </a>
                    <time datetime="${post.date.toISOString()}">
                      ${post.date.toISOString().slice(5, 10)}
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
