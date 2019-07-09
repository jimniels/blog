const pt = require("prop-types");
const Nav = require("./Nav.js");
const { jim, toDateISO, toDateUI } = require("./utils.js");

const Layout = (props, children) => {
  const {
    site: { name, baseurl, isDevelopment },
    page: { title }
  } = props;

  return jim`
    <!DOCTYPE html>
    <html id="top">
    <head>
      <title>
        ${title && `${title} | `}${name}
      </title>

      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS"
        href="${baseurl}/feed.xml"
      >
      <link
        rel="alternate"
        type="application/json"
        title="JSON Feed"
        href="${baseurl}/feed.json"
      >
      <link
        rel="stylesheet"
        href="${baseurl}/assets/css/normalize.css"
      >
      <link
        rel="stylesheet"
        href="${baseurl}/assets/css/styles.css"
      >
    </head>
    <body>
      <nav class="nav">
        ${Nav(props)}
      </nav>

      <main class="main">    
        ${children}
      </main>

      <script
        type="text/javascript"
        src="${baseurl}/assets/js/js.js">
      </script>

      ${isDevelopment &&
        `<script src="http://localhost:35729/livereload.js"></script>`}
    </body>
  </html>`;
};

const Post = props => {
  const { site, page } = props;

  pt.checkPropTypes(
    {
      site: pt.shape({
        baseurl: pt.string.isRequired,
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
  return Layout(props, jim`
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
        <time datetime="${toDateISO(page.date)}">
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
          ${page.tags.map(tag => `
            <a href="${site.baseurl}/tags/#${tag}}" class="tag">
              #${tag}
            </a>
          `).join(",&nbsp;")}
        </footer>`}
    </article>
  `);
};

// prettier-ignore
const PageCustom = (props, children) => Layout(props, children);

// prettier-ignore
const Page = (props) => Layout(props, jim`
  <div class="markdown">
    ${props.page.contents.toString()}
  </div>
`);

module.exports = {
  Post,
  Page,
  PageCustom
};
