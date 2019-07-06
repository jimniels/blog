const Layout = require("../server/Layout.js");

const page = {
  title: "404 Page Not Found",
  id: "404"
};

const PageNotFound = () => {
  // const Layout = await import("../server/Layout.js").then(
  //   module => module.default
  // );

  return `<h1>Page Not Found</h1>`;
};

// export default PageNotFound;
module.exports = Layout(PageNotFound, { title: "Page Not Found", id: "404" });
