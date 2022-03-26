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
    site: { origin, tags, name },
    page: { layout, path, title },
  } = props;
  const permalink = origin + path;

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
          <link rel="canonical" href="${permalink}" />

          <!-- Inline all our styles -->
          <style>
            ${[
              "./styles/modern-normalize.css",
              "./styles/base.css",
              "./styles/styles.css",
              "./styles/atom-one-light.css",
            ]
              .map(importFile)
              .join("")}

            @media screen and (prefers-color-scheme: dark) {
              ${importFile("./styles/atom-one-dark.css")}
            }
          </style>

          ${layout === "Post" &&
          html`
            <!-- If it’s a post page, we’ll include meta info and code styling -->
            <meta property="og:title" content="${title}" />
            <meta property="og:type" content="article" />
            <meta property="og:url" content="${permalink}" />

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
          ${importFile("./svgs/icons.svg")}

          <site-nav>
            <a href="/">Jim Nielsen’s Blog</a>
            ${nav.map(
              ({ label, path }) => html`<a href="${path}">${label}</a>`
            )}
            <a href="/feed.xml" title="RSS Feed"
              >${importFile("./svgs/feed-rss.svg")}</a
            >
            <a href="/feed.json" title="JSON Feed"
              >${importFile("./svgs/feed-json.svg")}</a
            >
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

const Post = (props) => {
  const { site, page } = props;

  pt.checkPropTypes(
    {
      site: pt.shape({
        name: pt.string.isRequired,
        origin: pt.string.isRequired,
      }),
      page: pt.shape({
        title: pt.string.isRequired,
        date: pt.string.isRequired,
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
        <time class="dt-published" datetime="${page.date}" style="">
          ${toDateUI(page.date)}
        </time>
      </header>
      <div class="copy e-content">
        ${page?.tags.includes("rssClub") ? rssClubHtml() : ""}
        ${page.contents.toString()}
      </div>
      <footer>
        ${replyHtml({ postTags: page.tags, postPath: page.path, siteOrigin: site.origin })}
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
