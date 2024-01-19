import { html } from "../server/utils.js";
import ReplyHtml from "../server/ReplyHtml.js";
import RssClub from "../server/RssClub.js";
import { Page } from "../server/Layouts.js";

export default function HTMLFeed(site) {
  const page = {
    title: "RSS",
    path: "/feed.html",
    head: html`
      <style>
        .h-feed time {
          font-size: 80%;
          opacity: 0.666;
        }
        .h-feed h2 {
          margin-top: 3rem;
        }
        .h-feed h3 {
          margin: 0;
          padding-right: 6rem;
        }
        .h-entry {
          border-top: 1px solid var(--c-fg);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 2rem 0;
          position: relative;
        }
        .h-entry summary {
          background: var(--c-fg);
          padding: 4px 0;
          width: 4.5rem;
          text-align: center;
          cursor: pointer;
          font-size: 0.875rem;
          border-radius: 0.25rem;
        }
        @media (min-width: 600px) {
          .h-entry summary {
            position: absolute;
            right: 0;
            top: 2.5rem;
          }
        }
        .love-html {
          border: 1px solid var(--c-theme);
          color: var(--c-theme);
          font-family: ui-monospace, Menlo, Monaco, "Cascadia Mono",
            "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace",
            "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New",
            monospace;
          font-weight: 700;
          font-size: 1rem;
          padding: 0.25rem 0.5rem;
        }
        .love-html span {
          animation: 0.75s infinite steps(5, start) blink;
        }
        @keyframes blink {
          to {
            visibility: hidden;
          }
        }
      </style>
    `,
  };

  return Page(
    { site, page },
    html`
      <main class="copy h-feed">
        <h1 class="p-name">${site.name}</h1>
        <p>
          You found my <a href="">HTML feed</a> — I also have an
          <a href="/feed.xml">XML feed</a> and a
          <a href="feed.json">JSON feed</a>.
        </p>
        <p>
          <span class="love-html">I <span>♥</span> HTML</span>
        </p>
        <p>
          Subscribe to my blog by copy-pasting this URL into your RSS reader.
        </p>
        <p style="font-size: .875rem; opacity: .5">
          (Learn more about RSS and subscribing to content on the web at
          <a href="https://aboutfeeds.com/">aboutfeeds</a>.)
        </p>

        <h2>Recent posts</h2>
        ${site.posts.slice(0, 10).map(
          (post) => html`
            <div class="h-entry" id="${post.permalink}">
              <h3>
                <a href="${post.permalink}" class="u-url">${post.title}</a>
              </h3>
              <time
                class="dt-published"
                datetime="${new Date(post.date).toISOString()}"
                >${new Date(post.date).toISOString().slice(0, 10)} (Mountain
                time)</time
              >
              <details>
                <summary>View</summary>
                <article class="e-content">
                  ${(post?.tags.includes("rssClub") ? RssClub() : "") +
                  post.contents.toString() +
                  ReplyHtml({ post, site })}
                </article>
              </details>
            </div>
          `
        )}
        <main></main>
      </main>
    `
  );
}
