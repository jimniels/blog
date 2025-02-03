// @ts-check
import ReplyHtml from "./ReplyHtml.js";
import RssClub from "./RssClub.js";
import { html, toDateUI } from "./utils.js";
import { Page } from "./Layouts.js";

/**
 * @param {Object} opts
 * @param {import("types").Site} opts.site
 * @param {import("types").Post} opts.post
 * @returns {Promise<string>}
 */
export default function Post({ site, post }) {
  const includeInSearch = !(
    post.tags &&
    (post.tags.includes("rssClub") || post.tags.includes("readingNotes"))
  );

  return Page(
    {
      site,
      page: {
        title: post.title,
        path: post.path,
        head: html`
          <link rel="canonical" href="${post.permalink}" />

          <meta property="og:title" content="${post.title}" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="${post.permalink}" />

          <meta
            property="fediverse:creator"
            content="@jimniels@mastodon.social"
          />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@jimniels" />
          <meta name="twitter:creator" content="@jimniels" />
          <meta name="twitter:title" content="${post.title}" />
          <meta
            name="twitter:image"
            content="https://blog.jim-nielsen.com/assets/img/twitter-card.png"
          />
          <meta
            name="twitter:image:alt"
            content="Jim Nielsen’s initials (JN) in a hand-written style."
          />
        `,
      },
    },
    html`
      <article class="h-entry" ${includeInSearch ? `data-pagefind-body` : ""}>
        <header
          style="view-transition-name: post-title-${post.id}"
        >
          <h1 class="p-name">${post.title}</h1>
          <ul>
            <li>
              <time class="dt-published" datetime="${post.date}">
                ${toDateUI(post.date)}
              </time>
            </li>
            ${
              post.tags.length
                ? html`<li>
                    ${post.tags
                      .map((tag) => html`<a href="/tags/#${tag}">#${tag}</a>`)
                      .join(", ")}
                  </li>`
                : ""
            }
            </li>
            ${
              post.hackerNews
                ? html` <li>
                    <a
                      href="${post.hackerNews.url}"
                      style="display: flex; align-items: center; gap: 4px;"
                    >
                      <!-- <img
                        src="https://news.ycombinator.com/favicon.ico"
                        width="16"
                        height="16"
                        alt="Hacker News"
                      /> -->
                      ${post.hackerNews.points.toLocaleString()} points,
                      ${post.hackerNews.comments} comments on HackerNews</a
                    >
                  </li>`
                : ""
            }
          </ul>
        </header>
        <div class="copy e-content">
          ${post.tags.includes("rssClub") ? RssClub() : ""}
          ${post.contents.toString()}
        </div>
        <footer>${ReplyHtml({ post, site })}</footer>
      </article>
    `
  );
}

export async function getPages(site) {
  return site.posts.map((post) => {
    return {
      // Ensure the leading slash is absent in the file name, i.e. `2019/slug/index.html`
      path: `${post.path.slice(1)}index.html`,
      contents: Post({ site, post }),
    };
  });
}
