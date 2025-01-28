import { Page } from "../../server/Layouts.js";
import { PostsList } from "../../server/PostsList.js";
import { PostsNav } from "../../server/PostsNav.js";
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
    html`
      <h1>Posts</h1>
      ${PostsNav("/archive/")}
      ${Object.keys(postsByYear)
        .sort()
        .reverse()
        .map(
          (year) => html`
            <h2 id="${year}" style="margin: 2rem 0 .5rem;">${year}</h2>
            ${PostsList(postsByYear[year])}
          `
        )}

      <!--
      <input type="text" placeholder="Search" id="search" list="tags" />
      <datalist id="tags">
        ${site.tags
        .map(({ name }) => html`<option value="#${name}"></option>`)
        .join("")}
      </datalist>
      <script>
        document.addEventListener("DOMContentLoaded", () => {
          const h2s = Array.from(document.querySelectorAll("main h2"));
          const posts = Array.from(document.querySelectorAll(".posts-list li"));
          const search = document.querySelector("#search");
          search.addEventListener("input", (e) => {
            const value = e.target.value.toLowerCase();

            // Show/hide H2s
            if (value.length > 0) {
              h2s.forEach((h2) => {
                h2.setAttribute("hidden", true);
              });
            } else {
              h2s.forEach((h2) => {
                h2.removeAttribute("hidden");
              });
            }

            // Show/hide posts
            posts.forEach((post) => {
              const title = post
                .querySelector("a span:first-child")
                .textContent.toLowerCase();

              if (title.includes(value)) {
                post.removeAttribute("hidden");
              } else {
                post.setAttribute("hidden", true);
              }
            });
          });
        });
      </script> -->
    `
  );
}
