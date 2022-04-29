import { Page } from "../../../server/Layouts.js";
import { html } from "../../../server/utils.js";

const page = {
  title: "Posts tagged #readingNotes",
  path: "/tags/readingNotes/",
};

/*
[
  {
    page: ""
    notes: [
      {
        title: "",
        type: "",
        url: "",
        content: ""
      }
    ]
]

<select>Types: Article (57) | Talk (52) |</select>
<input>Reocurring Domain</input> Adactio (52) | Github (2) | </input>
*/

export default function Tags(site) {
  return Page(
    { site, page },
    html`
      <main class="wrapper">
        <style>
          hr {
            margin: calc(1.618rem * 2) auto;
            border-width: 4px;
          }
          .title {
            position: sticky;
            top: 0;
            background: var(--c-bg);
          }
          .url {
            opacity: .5;
            margin-top: calc(1.618rem * 2);
            display: block;
          }
          .copy h2 {
            margin-top: 0;
          }
        </style>
        ${site.posts
          .filter((post) => post.tags && post.tags.includes("readingNotes"))
          .map(
            (post) => html`
              <h1 class="title"><a href="${post.path}">${post.title}</a></h1>
              <div class="copy">${post.contents}</div>
              <hr />
            `
          )}
        <script>
          Array.from(document.querySelectorAll("main h2 a")).forEach($a => {
            const { host, hostname } = new URL($a.getAttribute("href"));
            $a.parentNode.insertAdjacentHTML("beforebegin", "<small class=url>" + hostname + "</small>");
          });
        </script>
      </main>
    `
  );
}
