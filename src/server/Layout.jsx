const React = require("react");
const Nav = require("./Nav.jsx");

const Layout = ({ site, page, children }) => {
  const { baseurl, isDevelopment } = site;
  const { title } = page;

  return (
    <html id="top">
      <head>
        <title>{title && `${title} | `}Jim Nielsen’s Blog</title>

        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href={`${baseurl}/feed.xml`}
        />
        <link
          rel="alternate"
          type="application/json"
          title="JSON Feed"
          href={`${baseurl}/feed.json`}
        />
        <link rel="stylesheet" href={`${baseurl}/assets/css/style.css`} />
      </head>
      <body>
        <nav class="nav">
          <Nav site={site} page={page} />
        </nav>

        <main class="main">{children}</main>

        <script type="text/javascript" src={`${baseurl}/assets/js/js.js`} />

        {isDevelopment && <script src="http://localhost:35729/livereload.js" />}
      </body>
    </html>
  );
};

const Page = ({ site, page, children }) => (
  <Layout site={site} page={page}>
    {page.content && (
      <div
        class="markdown"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    )}
    {children && <div class="markdown">{children}</div>}
  </Layout>
);

const Post = ({ site, post }) => (
  <Layout site={site} page={post}>
    <article
      className="markdown markdown-with-prefixed-headings"
      id="js-post-content"
    >
      <header>
        <time datetime={"" /* @TODO */}>post.date</time>
        <h1>
          <span>{post.title}</span>
        </h1>
      </header>

      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      {post.tags && (
        <footer
          className="max-width-wrapper"
          style={{ marginTop: "calc(1.618rem * 2)" }}
        >
          Tagged in:
          {/*post.tags.map(tag => (
            <a href={`${site.baseurl}/tags/#${tag}`} className="tag">
              #{tag}
            </a>
          ))*/}
        </footer>
      )}
    </article>
  </Layout>
);

module.exports = {
  Page,
  Post
};
