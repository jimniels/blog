import Nav from "./Nav.js";
import { jim } from "./utils.js";

const Layout = (ComponentFn, pageProps) => siteProps => {
  const { baseurl } = siteProps;
  const { title } = pageProps;
  const props = { page: pageProps, site: siteProps };

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
        ${ComponentFn(props)}
      </main>

      <script type="text/javascript" src="${baseurl}/assets/js/js.js"></script>
    </body>
  </html>`;
};

export default Layout;
