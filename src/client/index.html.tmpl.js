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
  const recent = posts.slice(0, 5);
  const favorites = posts
    .filter((post) => post.hasOwnProperty("favorites_index"))
    .sort((a, b) => (a.favorites_index > b.favorites_index ? 1 : -1))
    .slice(0, 5);
  const trending = posts
    .filter((post) => post.hasOwnProperty("pageviews"))
    .sort((a, b) => (a.pageviews > b.pageviews ? -1 : 1))
    .slice(0, 5);

  return PageCustom(
    { site, page },
    html`
      <h1>Posts</h1>

      <h2>Latest</h2>
      ${PostList(recent)}

      <h2>Select Personal Favorites</h2>
      ${PostList(favorites)}
      ${trending.length > 0 &&
      html`
        <h2>Popular This Month</h2>
        ${PostList(trending, { showPageviews: true })}
        <p style="font-size: 0.7777rem">
          Stats are
          <a
            href="/2020/using-netlify-analytics-to-build-list-of-popular-posts/"
            >homebrewed from Netlify Analytics</a
          >.
        </p>
      `}

      <h2>All</h2>
      <form id="filters">
        <input
          name="search"
          type="text"
          placeholder="Search post titles…"
          autocomplete="off"
        />
      </form>
      <output>${PostList(posts, { hide: true })}</output>
      <script type="module">
        // @TODO support query params that search inline
        const show = ($el) => $el.removeAttribute("hidden");
        const hide = ($el) => $el.setAttribute("hidden", true);

        const $search = document.querySelector("[name=search]");
        const $lis = Array.from(
          document.querySelectorAll("#all.posts-list li")
        );

        document.querySelector("#filters").addEventListener("input", (e) => {
          const value = e.target.value;

          $lis.forEach(($li) => {
            if (value === "") {
              $li.setAttribute("hidden", true);
            } else {
              // @TODO do better string matching
              const title = $li.querySelector("a").textContent.toLowerCase();
              const date = $li.querySelector("time").textContent;

              // If it's a tag search, look for that
              // Otherwise search by title
              if (
                title.indexOf(value.toLowerCase()) >= 0 ||
                value.startsWith(date.slice(0, 4))
              ) {
                $li.removeAttribute("hidden");
              } else {
                $li.setAttribute("hidden", true);
              }
            }
          });
        });
      </script>
    `
  );
}

function PostList(
  posts,
  { showPageviews, hide } = { showPageviews: false, hide: false }
) {
  return html`
    <ul class="posts-list" ${hide ? "id=all" : ""}>
      ${posts.map(
        ({ permalink, title, pageviews, date, tags = "" }) => html`
          <li ${hide ? "hidden" : ""} data-tags="${tags}">
            <a href="${permalink}">${title}</a>
            <time datetime="${date.toISOString()}">${toDateUI(date)}</time>
            ${showPageviews &&
            html`<small
              >${pageviews > 1000
                ? Math.round((pageviews / 1000) * 10) / 10 + "k"
                : pageviews}</small
            >`}
          </li>
        `
      )}
    </ul>
  `;
}
