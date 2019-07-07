const Nav = require("./Nav.js");
const { jim } = require("./utils.js");

const Layout = (props, children) => {
  const {
    site: { baseurl },
    page: { title }
  } = props;

  return jim`
    <!DOCTYPE html>
    <html id="top">
    <head>
      <title>
        ${title && `${title} | `}Jim Nielsen’s Blog
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
        href="${baseurl}/assets/css/style.css"
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
    </body>
  </html>`;
};

// prettier-ignore
const Post = (props, children) => {
  const { site, page } = props;
  
  return Layout(props, jim`
    <article
      class="markdown markdown-with-prefixed-headings"
      id="js-post-content">
    <header>
      <time datetime="${page.date}">
        ${page.date /* format */}
      </time>
      <h1>
        <span>${page.title}</span>
      </h1>
    </header>

    ${page.contents.toString()}

    ${page.tags && `
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
const Page = (props, children) => Layout(props, jim`
  <div class="markdown">
    ${children}
  </div>
`);

module.exports = {
  // Layout,
  Post,
  Page
};
