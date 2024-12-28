import { Page } from "../../server/Layouts.js";
import { html } from "../../server/utils.js";

const page = {
  title: "Archive",
  path: "/archive/",
  head: html`
    <style>
      main h2 {
        position: sticky;
        top: 0px;
        background: var(--c-bg);
        z-index: 10;
      }
    </style>
  `,
};

export default function Archive(site) {
  const postsByYear = site.posts
    .filter((post) => !post?.tags.includes("rssClub"))
    .reduce((acc, post) => {
      const year = post.date.slice(0, 4);
      if (acc[year]) {
        acc[year].push(post);
      } else {
        acc[year] = [post];
      }
      return acc;
    }, {});

  return Page(
    { site, page },
    html` <main class="wrapper">
      <h1>Archive</h1>
      <p style="font-size: 0.875rem; line-height: 1.75;">
        Top tags:
        ${site.tags
          // .map(({ name }) => name)
          .filter(({ name }) => name !== "readingNotes")
          .sort((a, b) => b.count < a.count)
          .slice(0, 10)
          .map(
            ({ name }) =>
              html`<a href="/tags#${name}" class="tag">#${name}</a> `
          )}
        <a href="/tags/">${site.tags.length - 10} more…</a>
      </p>

      ${Object.keys(postsByYear)
        .sort()
        .reverse()
        .map(
          (year) => html`
            <h2 id="${year}" style="margin: 2rem 0 .5rem;">${year}</h2>
            <ul class="posts-list">
              ${postsByYear[year].map(
                (post) => html`
                  <li>
                    <a href="${post.path}">
                      <span>${post.title}</span>
                      <span
                        ><time datetime="${post.date}">
                          ${post.date.slice(0, 10)}
                        </time></span
                      >
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
