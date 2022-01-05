import { PageCustom } from "../server/Layouts.js";
import { html, toDateUI } from "../server/utils.js";

const page = {
  permalink: "/",
};

export default function Index(site) {
  const recent = site.posts
    .filter((post) => !post?.tags.includes("rssClub"))
    .slice(0, 5);
  const favorites = site.posts
    .filter((post) => post.hasOwnProperty("favorites_index"))
    .sort((a, b) => (a.favorites_index > b.favorites_index ? 1 : -1))
    .slice(0, 5);
  const trending = site.posts
    .filter((post) => post.hasOwnProperty("pageviews"))
    .sort((a, b) => (a.pageviews > b.pageviews ? -1 : 1))
    .slice(0, 5);

  const filters = [
    {
      label: "All",
      icon: "archive",
      description: "Every post I’ve ever written, from most recent",
    },
    {
      label: "★ Favorites",
      icon: "star",
      description: "My own personal favorites through time.",
    },
    {
      label: "↗ Popular",
      icon: "trending",
      description: "Most popular this month according to Netlify analytics.",
    },
  ];

  return PageCustom(
    { site, page },
    html`
      <h1>Posts</h1>

      <!-- <h2>Latest</h2>
      ${PostList(recent)}

      <h2>Personal Favorites</h2>
      ${PostList(favorites)}

      <h2>Popular</h2>
      ${PostList(trending, true)} -->
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
          flex-wrap: wrap;
          gap: calc(1.618rem / 2);
          margin: 1.618rem 0;
        }
        form div {
          display: flex;
          align-items: center;
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
        form input[type="radio"] {
          display: none;
        }
        form label svg {
          margin-right: calc(1.618rem / 6);
        }
        form input:checked + label {
          background-color: var(--c-primary);
          color: white;
        }
        form input[type="text"] {
          background: var(--c-gray-6);
          border-radius: var(--border-radius);
          padding: calc(1.618rem / 6) calc(1.618rem / 3);
          border: none;
          width: 100%;
          max-width: 320px;
        }
      </style>
      <form>
        <div>
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
        </div>
        <input
          id="search"
          type="text"
          placeholder="Search…"
          list="tag-suggestions"
        />
      </form>

      <datalist id="tag-suggestions">
        ${site.tags.map((tag) => html`<option value="#${tag}"></option>`)}
      </datalist>

      ${PostList(site.posts, true)}

      <script>
        // @TODO support query params that search inline

        const $search = document.querySelector("#search");
        const $lis = Array.from(document.querySelectorAll(".posts-list li"));
        document.querySelector("form").addEventListener("change", (e) => {
          switch (e.target.value) {
            case "0":
              console.log("Show all");
              $lis.forEach(($li) => {
                $li.removeAttribute("hidden");
              });
              sortList("data-date");
              $search.removeAttribute("hidden");
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
              $search.setAttribute("hidden", true);
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
              $search.setAttribute("hidden", true);
              break;
            default:
          }
        });

        document
          .querySelector("form input[type=text]")
          .addEventListener("input", (e) => {
            console.log("Filter");
            $lis.forEach(($li) => {
              // @TODO <datalist> of tags to match
              // @TODO do better string matching
              const title = $li.querySelector("a").textContent.toLowerCase();
              const date = $li.getAttribute("data-date");

              // @TODO fix logic handling
              if (e.target.value.startsWith("#")) {
                const tags = $li.getAttribute("data-tags");
                const q = e.target.value.split("#")[1];
                console.log(q, tags);
                if (tags.indexOf(q) !== -1) {
                  $li.removeAttribute("hidden");
                } else {
                  $li.setAttribute("hidden", true);
                }
              } else if (
                title.indexOf(e.target.value.toLowerCase()) !== -1 ||
                e.target.value.startsWith(date.slice(0, 4))
              ) {
                $li.removeAttribute("hidden");
              } else {
                $li.setAttribute("hidden", true);
              }
            });
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

function PostList(posts, showPageviews = false) {
  return html`
    <ul class="posts-list">
      ${posts.map(
        ({ favorites_index, permalink, title, pageviews, date, tags }) => html`
          <li
            data-date="${date.toISOString().slice(0, 10).replace(/-/g, "")}"
            ${favorites_index >= 0 && `data-favorites='${favorites_index}'`}
            ${pageviews && `data-pageviews='${pageviews}'`}
            ${tags && `data-tags="${tags.join(" ")}"`}
          >
            <time datetime="${date.toISOString()}">${toDateUI(date)}</time>
            ${showPageviews && pageviews
              ? html`<small
                  >↗
                  ${pageviews > 1000
                    ? Math.round((pageviews / 1000) * 10) / 10 + "k"
                    : pageviews}</small
                >`
              : ""}
            ${favorites_index &&
            html`<small title="Personal favorite">★</small>`}
            <a href="${permalink}">${title}</a>
          </li>
        `
      )}
    </ul>
  `;
}
