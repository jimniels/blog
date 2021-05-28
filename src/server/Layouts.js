import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import pt from "prop-types";
import { html, toDateUI, replyHtml } from "./utils.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const importFile = (filepath) =>
  fs.readFileSync(join(__dirname, filepath)).toString();

const nav = [
  {
    label: "Archive",
    id: "archive",
  },
  {
    label: "Tags",
    id: "tags",
  },
  {
    label: "About",
    id: "about",
  },
  {
    label: "Feeds",
    id: "feeds",
  },
].map((item) => ({
  ...item,
  permalink: `/${item.id}/`,
}));

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
    site: { origin, name, isDevelopment },
    page: { layout, permalink, title, id },
  } = props;

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
          <link rel="stylesheet" href="/assets/css/modern-normalize.css" />
          <link rel="stylesheet" href="/assets/css/base.css" />
          <link rel="stylesheet" href="/assets/css/styles.css" />

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
            ${
              "" /*
              <meta name="twitter:image" content="https://blog.jim-nielsen.com/assets/img/twitter-card.png">
              <meta name="twitter:image:alt" content="Photo of Jim Nielsen saying stuff">
              */
            }

            <link rel="stylesheet" href="/assets/css/atom-one-light.css" />
            <link
              rel="stylesheet"
              href="/assets/css/atom-one-dark.css"
              media="screen and (prefers-color-scheme: dark)"
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
                ({ label, permalink, id }) => html`
                  <a href="${permalink}" data-svg-id="${id}">${label}</a>
                `
              )}
            </site-nav>
            <script>
              ${importFile("./site-nav.js")};
            </script>
          </nav>

          ${children}

          <script src="/assets/js/index.js" type="module"></script>
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
