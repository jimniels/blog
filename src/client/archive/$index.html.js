import { Page } from "../../server/Layouts.js";
import { html } from "../../server/utils.js";

const page = {
  title: "Archive",
  path: "/archive/",
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
      <p>
        Tags (i.e. things I’ve written about more than once):
        ${site.tags
          .map(({ name }) => name)
          .sort()
          .map((name) => html`<a href="/tags#${name}">${name}</a>`)
          .join(", ")}
      </p>
      <p>
        Years:
        ${Object.keys(postsByYear)
          .sort()
          .reverse()
          .map((year) => html`<a href="#${year}">${year}</a>`)
          .join(", ")}
      </p>

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
            </h2>
            <ul class="posts-list">
              ${postsByYear[year].map(
                (post) => html`
                  <li>
                    <a href="${post.path}"> ${post.title} </a>
                    <small
                      ><time datetime="${post.date}">
                        ${post.date.slice(5, 10)}
                      </time></small
                    >
                  </li>
                `
              )}
            </ul>
          `
        )}
    </main>`
  );
}
