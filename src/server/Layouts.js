import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import pt from "prop-types";
import { html, toDateUI } from "./utils.js";
import ReplyHtml from "./ReplyHtml.js";
import RssClub from "./RssClub.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const importFile = (filepath) =>
  fs.readFileSync(join(__dirname, filepath)).toString();

const comment = `
<!--



👋
Want to read the code behind this code?
It’s available on GitHub.
https://www.github.com/jimniels/blog/



-->
`;

const Layout = (props, children) => {
  const {
    site: { origin, tags, name },
    page: { head = "", path, title },
  } = props;

  const nav = [
    {
      label: "Archive",
      path: "/archive/",
    },
    {
      label: "Tags",
      path: "/tags/",
    },
    {
      label: "About",
      path: "/about/",
    },
    {
      label: "RSS",
      path: "/feed.xml",
    },
  ];

  return (
    comment +
    html`
      <!DOCTYPE html>
      <html lang="en-us" id="top">
        <head>
          <title>${title && `${title} - `}${name}</title>

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
              "./styles/modern-normalize.css",
              "./styles/styles.css",
              "./styles/atom-one-light.css",
            ]
              .map(importFile)
              .join("")}

            @media screen and (prefers-color-scheme: dark) {
              ${importFile("./styles/atom-one-dark.css")}
            }
          </style>

          <!-- Dynamic <head> content where applicable -->
          ${head}
        </head>
        <body>
          ${/* icon sprite importFile("./svgs/icons.svg") */ ""}

          <site-nav>
            <nav>
              <strong>
                ${path === "/"
                  ? `<span class="highlight">Jim Nielsen’s Blog</span>`
                  : `<a href="/" class="highlight">Jim Nielsen’s Blog</a>`}
              </strong>
              ${nav.map(({ label, path: navItemPath }) =>
                navItemPath === path
                  ? html`<span>${label}</span>`
                  : html`<a href="${navItemPath}">${label}</a>`
              )}
            </nav>
          </site-nav>

          <script>
            ${importFile("./site-nav.js")};
          </script>

          ${children}
        </body>
      </html>
    `
  );
};

// Takes the site data and the post data, then renders a page for it
const Post = (site, post) => {
  pt.checkPropTypes(
    {
      site: pt.shape({
        name: pt.string.isRequired,
        origin: pt.string.isRequired,
      }),
      post: pt.shape({
        title: pt.string.isRequired,
        date: pt.string.isRequired,
        contents: pt.oneOfType([pt.instanceOf(Buffer), pt.string]),
        tags: pt.arrayOf(pt.string),
      }),
    },
    { site, post },
    "prop",
    "Post"
  );

  return Layout(
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
      <article class="h-entry">
        <header class="wrapper">
          <h1 class="p-name">${post.title}</h1>
          <time class="dt-published" datetime="${post.date}" style="">
            ${toDateUI(post.date)}
          </time>
        </header>
        <div class="copy e-content">
          ${post?.tags.includes("rssClub") ? RssClub() : ""}
          ${post.contents.toString()}
        </div>
        <footer class="wrapper">
          ${ReplyHtml({
            postTags: post.tags,
            postPath: post.path,
            siteOrigin: site.origin,
          })}
        </footer>
      </article>
    `
  );
};

// Children will do: Page({}, html`<main {class="{wrapper|copy}"}?>...</main>`)
const Page = (props, children) => Layout(props, children);

export { Post, Page };
