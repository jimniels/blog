const React = require("react");
const { string } = require("prop-types");
const { withContext } = require("./Context.jsx");

Page.propTypes = {
  title: string,
  id: string
};

function Page({ context: { site, path }, title, children }) {
  return (
    <html id="top">
      <head>
        <title>
          {title ? title + " | " : ""}Jim Nielsen’s Blog
        </title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="alternate" type="application/rss+xml" title="RSS" href="/feed.xml" />
        <link rel="alternate" type="application/json" title="JSON Feed" href="/feed.json" />
        <link rel="stylesheet" href="/assets/css/normalize.css" />
        <link rel="stylesheet" href="/assets/css/base.css" />
        {/* @TODO only include these if it's a post page, as we don't need syntax highlighting on other pages
            Conditionally load styles for syntax highlighting based on the prefered
            color mode of the client. These are style sheets loaded from highlight.js
            https://highlightjs.org/ */}
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/atom-one-light.min.css"
          media="screen"
        />
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/atom-one-dark.min.css"
          media="screen and (prefers-color-scheme: dark)"
        />
      </head>
      <body>
        <nav className="nav">
          <div className="nav-wrapper">
            <div className="nav__img">
              <img src="https://www.jim-nielsen.com/assets/img/profile.jpg" alt="Photograph of Jim Nielsen" />
            </div>
            <ul>
              {site.navigation.map(item =>
                <li className={path === item.path ? "active" : ""} key={path}>
                  {path === item.path ? item.label : <a href={item.path}>{item.label}</a>}
                </li>
              )}
            </ul>
            <p>
              Hi, I’m <a href="http://jim-nielsen.com/">Jim Nielsen</a>. This is my blog, where I find clarity through writing. You’re welcome here anytime.
              </p>
          </div>
        </nav>

        <main className="main">
          {children}
        </main>

        <script type="text/javascript" src="/assets/js/scripts.js"></script>

        {site.isDevelopment && <script src="http://localhost:35729/livereload.js"></script>}
      </body>
    </html>
  )
}

module.exports = withContext(Page);
