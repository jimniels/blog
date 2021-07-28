import { PageCustom } from "../server/Layouts.js";
import { html, toDateUI, toDateUIMin } from "../server/utils.js";

const page = {
  permalink: "/",
};

export default function Index(site) {
  const recent = site.posts.slice(0, 10);
  const favorites = site.posts
    .filter((post) => post.hasOwnProperty("favorites_index"))
    .sort((a, b) => (a.favorites_index > b.favorites_index ? 1 : -1));
  const trending = site.posts
    .filter((post) => post.hasOwnProperty("pageviews"))
    .sort((a, b) => (a.pageviews > b.pageviews ? -1 : 1));

  const filters = [
    {
      label: "All",
      icon: "archive",
      description: "Every post I’ve ever written, from most recent",
    },
    {
      label: "Favorites",
      icon: "star",
      description: "My own personal favorites through time.",
    },
    {
      label: "Popular",
      icon: "trending",
      description: "Most popular this month according to Netlify analytics.",
    },
  ];

  return PageCustom(
    { site, page },
    html`
      <h1>Posts</h1>

      ${site.blogPostsStatus}
      ${trending.length > 0 &&
      html`
        <!--<small style="font-weight: normal">
          (<a
            href="/2020/using-netlify-analytics-to-build-list-of-popular-posts/"
            >According to Netlify Analytics</a
          >)</small
        >-->
      `}

      <style>
        [hidden] {
          display: none !important;
        }
        form {
          display: flex;
          align-items: center;
          margin: 1.618rem 0;
          color: var(--c-primary);
          gap: calc(1.618rem / 6);
        }
        form label {
          display: flex;
          align-items: center;
          padding: calc(1.618rem / 6) calc(1.618rem / 3);
          border-radius: var(--border-radius);
        }
        form label:hover {
          background-color: var(--c-gray-6);
        }
        form input {
          display: none;
        }
        form label svg {
          margin-right: calc(1.618rem / 6);
        }
        form input:checked + label {
          background-color: var(--c-primary);
          color: white;
        }
      </style>
      <form>
        ${filters.map(
          ({ label, icon }, i) => html`
            <input
              type="radio"
              name="filters"
              id="${i}"
              value="${i}"
              ${i === 0 ? "checked" : ""}
            />
            <label for="${i}"
              ><!--<svg class="icon">
                <use xlink:href="#${icon}"></use></svg
              >-->${label}</label
            >
          `
        )}
      </form>

      ${PostList(site.posts)}

      <script>
        const $lis = Array.from(document.querySelectorAll(".posts-list li"));
        document.querySelector("form").addEventListener("change", (e) => {
          switch (e.target.value) {
            case "0":
              console.log("Show all");
              $lis.forEach(($li) => {
                $li.removeAttribute("hidden");
              });
              sortList("data-date");
              break;
            case "1":
              console.log("Show favorites", $lis);
              $lis.forEach(($li) => {
                if ($li.hasAttribute("data-favorites")) {
                  $li.removeAttribute("hidden");
                } else {
                  $li.setAttribute("hidden", true);
                }
              });
              sortList("data-favorites");
              break;
            case "2":
              console.log("Show popular");
              $lis.forEach(($li) => {
                if ($li.hasAttribute("data-pageviews")) {
                  $li.removeAttribute("hidden");
                } else {
                  $li.setAttribute("hidden", true);
                }
              });
              sortList("data-pageviews");
              break;
            default:
          }
        });

        function sortList(attr) {
          var ul = document.querySelector(".posts-list");

          Array.from(ul.getElementsByTagName("LI"))
            .sort(
              (a, b) =>
                Number(a.getAttribute(attr)) < Number(b.getAttribute(attr))
            )
            .forEach((li) => ul.appendChild(li));
        }
      </script>
    `
  );
}

function PostList(posts) {
  return html`
    <ul class="posts-list">
      ${posts.map(
        ({ favorites_index, permalink, title, pageviews, date }) => html`
          <li
            data-date="${date.toISOString().slice(0, 10).replace(/-/g, "")}"
            ${favorites_index >= 0 && `data-favorites='${favorites_index}'`}
            ${pageviews && `data-pageviews='${pageviews}'`}
          >
            <time datetime="${date.toISOString()}">${toDateUI(date)}</time>
            ${pageviews &&
            html`<small
              >${pageviews > 1000
                ? Math.round((pageviews / 1000) * 10) / 10 + "k"
                : pageviews}</small
            >`}
            <a href="${permalink}">${title}</a>
          </li>
        `
      )}
    </ul>
  `;
}
