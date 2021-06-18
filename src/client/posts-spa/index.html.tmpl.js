import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import pt from "prop-types";
import { html } from "../../server/utils.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const importFile = (filepath) =>
  fs.readFileSync(join(__dirname, filepath)).toString();

export default function spa(props) {
  const { posts, tagz } = props;

  const data = posts.map(({ contents, markdown, stats, ...rest }) => rest);
  const dataString = JSON.stringify(data);

  return html`<!DOCTYPE html>
    <html lang="en-us" id="top">
      <head>
        <title>Jim’s Blog</title>

        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="p-author" />
        <link rel="preconnect" href="https://cdn.jim-nielsen.com" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
        <link
          rel="alternate"
          type="application/json"
          title="JSON Feed"
          href="/feed.json"
        />

        <!-- Inline all our styles -->
        <style>
          ${[
            "../assets/css/modern-normalize.css",
            "../assets/css/base.css",
            "../assets/css/styles.css",
            "../assets/css/atom-one-light.css",
          ]
            .map(importFile)
            .join("")}

          @media screen and (prefers-color-scheme: dark) {
            ${importFile("../assets/css/atom-one-dark.css")}
          }

          html, body, .app {
            margin: 0;
            height: 100%;
          }

          .app {
            display: flex;
          }
          .pane-1 h1, .pane-2 h1 {
            margin-top: 0;
            margin-bottom: 8px;
          }
          .pane-3 h1 {
            margin-top: 0;
          }
          .pane-1,
          .pane-2,
          .pane-3 {
            padding: 16px;
            overflow: scroll;
          }
          .pane-1,
          .pane-2 {
            background: rgba(0,0,0,.1);
            border-right: 1px solid rgba(0,0,0,.2);
            flex-shrink: 0;
            padding-right: 0;
          }
          .pane-1 {
            width: 20%;
            max-width: 300px;
          }
          .pane-2 {
            width: 30%;
            max-width: 400px;
            padding-right:0;
          }
          .pane-3 {
            flex-grow: 1;

          }

          .pane-3 > div {
            max-width: 90%;
            margin: 0 auto;
          }
          .post-list {
            list-style-type: none;
            padding: 0;
            border-radius: 8px;
          }
          .post-list .active {
            background: var(--c-primary);
            border-radius: var(--border-radius) 0 0 var(--border-radius);
          }
          .post-list .active a {
            color: white;
          }
          .post-list a {
            padding: 8px 16px 8px 0px;
            display: flex;
            flex-direction: column;
            margin-left: 16px;
            border-bottom: 1px solid rgba(0,0,0,.1);
            line-height: 1.3;
          }
          .post-list a time {
            font-size: .75rem;
            color: #aaa;
            margin-top: 4px;
          }
          .filter-list {
            list-style-type: none;
            margin: 0;
            padding: 0;
          }
          .filter-list a {
            padding: 8px 16px 8px 8px;
            display: flex;
            align-items: center;
          }
          .filter-list .active {
            background: var(--c-primary);
            border-radius: var(--border-radius) 0 0 var(--border-radius);
          }
          .filter-list .active a {
            color: white;
          }
          .filter-list .icon {
            margin-right: 16px;
          }
          .filter-list .count {
            font-size: .7rem;
            color: #333;
            background: rgba(0,0,0,.1);
            border-radius: 8px;
            padding: 0px 8px;
          }
          .filter-list .title {
            flex-grow: 1;
            display: block;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: pre;
          }
        </style>
      </head>
      <body>
        <!-- Icon Sprite -->
        ${importFile("../../server/icons.svg")}

        <div id="root" class="app">
          Loading...
          <noscript>JavaScript is required.</noscript>
        </div>
        <script type="module" src="./index.js"></script>
        <script>
          window.DATA = JSON.parse(\`${dataString}\`);
          window.TAGZ = JSON.parse(\`${JSON.stringify(tagz)}\`);
          console.log(window.DATA);
        </script>
      </body>
    </html>`;
}
