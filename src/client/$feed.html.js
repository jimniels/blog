import { html } from "../server/utils.js";
import ReplyHtml from "../server/ReplyHtml.js";
import RssClub from "../server/RssClub.js";

// prettier-ignore
export default function HTMLFeed(site) {
  return html`<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>${site.name}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS: XML Feed"
        href="/feed.xml"
      />
      <link
        rel="alternate"
        type="application/json"
        title="RSS: JSON Feed"
        href="/feed.json"
      />
      <link
        rel="alternate"
        type="application/mf2+html"
        title="RSS: HTML Feed"
        href="/feed.html"
      />
      <!-- description, etc -->
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif;
          max-width: 35rem;
          margin: 0 auto;
          padding: 0 1rem;
          line-height: 1.5;
        }
        a {
          color: #ff0097;
        }
        time {
          font-size: 80%;
          opacity: .666;
        }
        h2 {
          margin-top: 3rem;
        }
        h3 {
          margin: 0;
          padding-right: 6rem;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        section {
          border-top: 1px solid #ddd;
          display: flex;
          flex-direction: column;
          gap: .25rem;
          padding: 2rem 0;
          position: relative;
        }
        summary {
          background: #f7f7f7;
          padding: 4px 0;
          width: 4.5rem;
          text-align: center;
          cursor: pointer;
          font-size: .875rem;
          border-radius: .25rem;
        }
        @media (min-width: 600px) {
          summary {
            position: absolute;
            right: 0;
            top: 2.5rem;
          }
        }
        @media (prefers-color-scheme: dark) {
          body {
            background: #000;
            color: #fff;
          }
          summary {
            background: #111;
          }
          section {
            border-color: #222;
          }
        }
      </style>
      
    </head>
    <body class="h-feed">
      <h1 class="p-name">${site.name}</h1>
      <p>You found my <a href="">HTML feed</a>! You can subscribe by copy-pasting this URL into your RSS reader.</p>
      <p><img src="/assets/img/love-html.gif" alt="I <3 HTML" width="88" height="31"></p>
      <p>I also have <a href="/feed.xml">XML</a> and <a href="feed.json">JSON</a> feeds available — but really, just copy-paste this URL into your feed reader.</p>
      
      <h2>Recent posts</h2>
        ${site.posts.slice(0, 10).map(post => html`
          <section class="h-entry" id="${post.permalink}" url="${post.permalink}" datetime="${new Date(post.date).toUTCString()}">
            <h3><a href="${post.permalink}" class="u-url">${post.title}</a></h3>
            <time class="dt-published" datetime="${new Date(post.date).toISOString()}">${new Date(post.date).toISOString().slice(0, 10)} (Mountain time)</time>
            <details>
              <summary>View</summary>
              <article class="e-content">${(post?.tags.includes("rssClub") ? RssClub() : "") + post.contents.toString() + ReplyHtml({ post, site })}</article>
            </details>
          </section>
        `)}
      
    </body>
  </html>`; 
}
