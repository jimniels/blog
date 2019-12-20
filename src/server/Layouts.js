import pt from "prop-types";
import Nav from "./Nav.js";
import { html, toDateUI } from "./utils.js";

const Layout = (props, children) => {
  const {
    site: { origin, name, isDevelopment },
    page: { layout, permalink, title }
  } = props;

  return html`
    <!DOCTYPE html>
    <html id="top">
      <head>
        <title>
          ${title && `${title} | `}${name}
        </title>

        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <link rel="stylesheet" href="/assets/css/normalize.css" />
        <link rel="stylesheet" href="/assets/css/styles.css" />
        ${layout === "Post" &&
          `
          <meta property="og:title" content="${title}" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="${origin + permalink}" />

          <meta name="twitter:card" content="summary_large_image">
          <meta name="twitter:site" content="@jimniels">
          <meta name="twitter:creator" content="@jimniels">
          <meta name="twitter:title" content="${title}">
          <meta name="twitter:image" content="https://cdn.jim-nielsen.com/shared/twitter-card.jpg">
        `}
      </head>
      <body>
        <nav class="nav">
          ${Nav(props)}
        </nav>

        <main class="main">
          ${children}
        </main>

        <script type="text/javascript" src="/assets/js/js.js"></script>
      </body>
    </html>
  `;
};

const Post = props => {
  const { site, page } = props;

  pt.checkPropTypes(
    {
      site: pt.shape({
        name: pt.string.isRequired,
        origin: pt.string.isRequired,
        isDevelopment: pt.bool.isRequired
      }),
      page: pt.shape({
        title: pt.string.isRequired,
        date: pt.instanceOf(Date),
        contents: pt.oneOfType([pt.instanceOf(Buffer), pt.string]),
        tags: pt.arrayOf(pt.string)
      })
    },
    props,
    "prop",
    "Post"
  );

  // prettier-ignore
  return Layout(props, html`
    <link
      rel="stylesheet"
      href="/assets/css/atom-one-light.css"
    />
    <link
      rel="stylesheet"
      href="/assets/css/atom-one-dark.css"
      media="screen and (prefers-color-scheme: dark)"
    />
    <article
      class="markdown markdown-with-prefixed-headings"
      id="js-post-content">

      <header>
        <time datetime="${page.date.toISOString()}">
          ${toDateUI(page.date)}
        </time>
        <h1>
          <span>${page.title}</span>
        </h1>
      </header>

      ${page.contents.toString()}

      ${Array.isArray(page.tags) && `
        <footer class="max-width-wrapper" style="margin-top: calc(1.618rem * 2)">
          Tagged in: 
          ${page.tags.map(tag => 
            `<a href="/tags/#${tag}" class="tag">#${tag}</a>`
          ).join(",&nbsp;")}
        </footer>`}
    </article>
  `);
};

// prettier-ignore
const PageCustom = (props, children) => Layout(props, children);

// prettier-ignore
const Page = (props) => Layout(props, html`
  <div class="markdown">
    ${props.page.contents.toString()}
  </div>
`);

export { Post, Page, PageCustom };
