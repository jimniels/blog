import { PageCustom } from "../../../server/Layouts.js";
import { html, toDateUI } from "../../../server/utils.js";

const page = {
  title: "Posts tagged #readingNotes",
  permalink: "/tags/readingNotes/",
};

export default function Tags(site) {
  // prettier-ignore
  return PageCustom({ site, page }, html`
    <h1>Index of All Reading Notes</h1>

      <style>
        .div-link {
          position: relative;
          background: #fff;
          z-index: 1;
          padding-right: 10px;
          font-size: .85em;
        }
        .div-hr {
          position: relative;
          top: 1.5rem;
        }
      </style>
      ${site.posts
        .filter(post => post.tags && post.tags.includes("readingNotes"))
        .map(post => html`
          <hr class="div-hr" />
          <a class="div-link" href="${post.permalink}">${post.title}</a>
          <div class="markdown">${post.contents}</div>
        `)}
    
  `);
}
