import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import pt from "prop-types";
import { html, toDateUI, replyHtml, rssClubHtml } from "./utils.js";
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
    site: { origin, tags, name, isDevelopment },
    page: { layout, permalink, title, id },
  } = props;

  const nav = [
    {
      label: "Archive",
      id: "archive",
      details: "2012–" + new Date().getFullYear(),
    },
    {
      label: "Tags",
      id: "tags",
      details: "#" + tags.length,
    },
    {
      label: "About",
      id: "about",
      details: "Jim Nielsen",
    },
    {
      label: "Feeds",
      id: "feeds",
      details: "RSS, JSON",
    },
  ].map((item) => ({
    ...item,
    permalink: `/${item.id}/`,
  }));

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
          <link rel="canonical" href="${origin + permalink}" />

          <!-- Inline all our styles -->
          <style>
            ${[
              "../client/assets/css/modern-normalize.css",
              "../client/assets/css/base.css",
              "../client/assets/css/styles.css",
              "../client/assets/css/atom-one-light.css",
            ]
              .map(importFile)
              .join("")}

            @media screen and (prefers-color-scheme: dark) {
              ${importFile("../client/assets/css/atom-one-dark.css")}
            }
          </style>

          ${layout === "Post" &&
          html`
            <!-- If it’s a post page, we’ll include meta info and code styling -->
            <meta property="og:title" content="${title}" />
            <meta property="og:type" content="article" />
            <meta property="og:url" content="${origin + permalink}" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@jimniels" />
            <meta name="twitter:creator" content="@jimniels" />
            <meta name="twitter:title" content="${title}" />
            <meta
              name="twitter:image"
              content="https://blog.jim-nielsen.com/assets/img/twitter-card.png"
            />
            <meta
              name="twitter:image:alt"
              content="Jim Nielsen’s initials (JN) in a hand-written style."
            />
          `}
        </head>
        <body>
          <!-- Icon Sprite -->
          ${importFile("./icons.svg")}

          <nav class="nav">
            <a href="/">Jim Nielsen’s Blog</a>

            <!-- Progressively enhance the site navigation -->
            <site-nav>
              ${nav.map(
                ({ label, permalink, details }) => html`
                  <a href="${permalink}" data-details="${details}">${label}</a>
                `
              )}
            </site-nav>
            <script>
              ${importFile("./site-nav.js")};
            </script>
          </nav>

          ${children}
        </body>
      </html>
    `
  );
};

const Post = (props) => {
  const { site, page } = props;

  pt.checkPropTypes(
    {
      site: pt.shape({
        name: pt.string.isRequired,
        origin: pt.string.isRequired,
        isDevelopment: pt.bool.isRequired,
      }),
      page: pt.shape({
        title: pt.string.isRequired,
        date: pt.instanceOf(Date),
        contents: pt.oneOfType([pt.instanceOf(Buffer), pt.string]),
        tags: pt.arrayOf(pt.string),
      }),
    },
    props,
    "prop",
    "Post"
  );

  // prettier-ignore
  return Layout(props, html`
    <article class="h-entry">
      <header>
        <h1 class="p-name">
          ${page.title}
        </h1>
        <time class="dt-published" datetime="${page.date.toISOString()}" style="">
          ${toDateUI(page.date)}
        </time>
      </header>
      <div class="copy e-content">
        ${page?.tags.includes("rssClub") ? rssClubHtml() : ""}
        ${page.contents.toString()}
      </div>
      <footer class="copy">
        ${replyHtml({ postTags: page.tags, postLink: page.permalink, siteOrigin: site.origin })}
      </footer>
    </article>
  `);
};

// prettier-ignore
const PageCustom = (props, children) => Layout(props, children);

// prettier-ignore
const Page = (props) => Layout(props, html`
  <div class="copy">
    ${props.page.contents.toString()}
  </div>
`);

export { Post, Page, PageCustom };
