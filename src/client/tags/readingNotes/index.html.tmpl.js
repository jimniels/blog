import { Page } from "../../../server/Layouts.js";
import { html } from "../../../server/utils.js";

const page = {
  title: "Posts tagged #readingNotes",
  path: "/tags/readingNotes/",
};

export default function Tags(site) {
  return Page(
    { site, page },
    html`
      <main class="wrapper">
        <h1>Index of All Reading Notes</h1>
        <style>
          .div-link {
            position: relative;
            background: #fff;
            z-index: 1;
            padding-right: 10px;
            font-size: 0.85em;
          }
          .div-hr {
            position: relative;
            top: 1.5rem;
          }
        </style>
        ${site.posts
          .filter((post) => post.tags && post.tags.includes("readingNotes"))
          .map(
            (post) => html`
              <hr class="div-hr" />
              <a class="div-link" href="${post.path}">${post.title}</a>
              <div class="copy">${post.contents}</div>
            `
          )}
      </main>
    `
  );
}
