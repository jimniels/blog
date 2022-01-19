import { PageCustom } from "../server/Layouts.js";
import { html, toDateUI } from "../server/utils.js";

const page = {
  permalink: "/",
  head: html`
    <style>
      [hidden] {
        display: none !important;
      }
      #filters {
        display: flex;
        flex-wrap: wrap;
        gap: calc(1.618rem / 4);
        margin: 1.618rem 0;
      }
      #filters label {
        display: flex;
        align-items: center;
        padding: calc(1.618rem / 6) calc(1.618rem / 3);
        border-radius: var(--border-radius);
        color: var(--c-primary);
      }
      #filters label:hover {
        background-color: var(--c-gray-6);
      }
      #filters input[type="radio"] {
        display: none;
      }
      #filters input[type="radio"]:checked + label {
        background-color: var(--c-primary);
        color: white;
      }
      #filters input[type="text"] {
        background: var(--c-gray-6);
        border-radius: var(--border-radius);
        padding: calc(1.618rem / 6) calc(1.618rem / 3);
        border: none;
        width: 100%;
        max-width: 320px;
      }
    </style>
  `,
};

export default function Index(site) {
  const posts = site.posts.filter((post) => !post?.tags.includes("rssClub"));
  const trending = site.posts
    .filter((post) => post.hasOwnProperty("pageviews"))
    .sort((a, b) => (a.pageviews > b.pageviews ? -1 : 1));

  const tabs = ["All", "Popular"];

  return PageCustom(
    { site, page },
    html`
      <h1>Posts</h1>

      <form id="filters">
        ${tabs.map(
          (filter, i) => html`
            <input
              type="radio"
              name="tabs"
              id="tab-${i}"
              value="${filter.toLowerCase()}"
              ${i === 0 ? "checked" : ""}
            />
            <label for="tab-${i}">${filter}</label>
          `
        )}
        <input
          name="search"
          type="text"
          placeholder="Search…"
          list="search-tag-suggestions"
        />
        <datalist id="search-tag-suggestions">
          ${site.tags
            .sort()
            .map((tag) =>
              tag === "rssClub" ? "" : html`<option value="#${tag}"></option>`
            )}
        </datalist>
      </form>

      <div id="all" class="tab">${PostList(posts)}</div>
      <div id="popular" class="tab" hidden>
        ${PostList(trending)}
        <p>
          Stats are
          <a
            href="/2020/using-netlify-analytics-to-build-list-of-popular-posts/"
            >homebrewed from Netlify Analytics</a
          >.
        </p>
      </div>

      <script>
        // @TODO support query params that search inline
        const show = ($el) => $el.removeAttribute("hidden");
        const hide = ($el) => $el.setAttribute("hidden", true);

        const $search = document.querySelector("[name=search]");
        const $tabs = Array.from(document.querySelectorAll(".tab"));
        const $lis = Array.from(document.querySelectorAll(".posts-list li"));

        document.querySelector("#filters").addEventListener("input", (e) => {
          switch (e.target.name) {
            case "tabs":
              console.log("Toggle tab visibility");
              $tabs.forEach(($tab) => {
                if ($tab.id === e.target.value) {
                  show($tab);
                } else {
                  hide($tab);
                }
              });
              if (e.target.value === "all") {
                show($search);
              } else {
                hide($search);
              }

              break;
            case "search":
              console.log("Search");
              const value = e.target.value;
              $lis.forEach(($li) => {
                // @TODO do better string matching
                const title = $li.querySelector("a").textContent.toLowerCase();
                const date = $li.getAttribute("data-date");

                // If it's a tag search, look for that
                // Otherwise search by title
                switch (value[0]) {
                  case "#":
                    const tags = $li.getAttribute("data-tags");
                    const q = value.split("#")[1];

                    if (tags.indexOf(q) !== -1) {
                      $li.removeAttribute("hidden");
                    } else {
                      $li.setAttribute("hidden", true);
                    }
                    break;
                  default:
                    if (
                      title.indexOf(value.toLowerCase()) !== -1 ||
                      value.startsWith(date.slice(0, 4))
                    ) {
                      $li.removeAttribute("hidden");
                    } else {
                      $li.setAttribute("hidden", true);
                    }
                }
              });
              break;
            default:
              console.log("Not firing anything");
          }
        });
      </script>
    `
  );
}

function PostList(posts) {
  return html`
    <ul class="posts-list">
      ${posts.map(
        ({ permalink, title, pageviews, date, tags }) => html`
          <li
            data-date="${date.toISOString().slice(0, 10)}"
            ${tags && `data-tags="${tags.join(" ")}"`}
          >
            <a href="${permalink}">${title}</a>
            <time datetime="${date.toISOString()}">${toDateUI(date)}</time>
            ${pageviews &&
            html`<small
              >↗
              ${pageviews > 1000
                ? Math.round((pageviews / 1000) * 10) / 10 + "k"
                : pageviews}</small
            >`}
          </li>
        `
      )}
    </ul>
  `;
}
