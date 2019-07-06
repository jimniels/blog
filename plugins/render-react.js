const React = require("react");
const ReactDOMServer = require("react-dom/server");
const multimatch = require("multimatch");
const path = require("path");

function renderReact() {
  return (files, metalsmith, done) => {
    const { Page, Post } = require("../src/server/Layout.jsx");
    const site = metalsmith.metadata();
    const pathPrefix = path.join(metalsmith._directory, metalsmith._source);

    Object.keys(files).forEach(file => {
      const { srcFilepath } = files[file];
      // Render <Posts>
      if (multimatch(srcFilepath, "posts/**").length) {
        files[file].contents = ReactDOMServer.renderToString(
          <Post
            site={site}
            post={{ ...files[file], content: files[file].contents.toString() }}
          />
        );
      } else if (multimatch(srcFilepath, ["**/*.md", "!posts"]).length) {
        // Render <Page>
        console.log("matching", file);
        files[file].contents = ReactDOMServer.renderToString(
          <Page
            site={site}
            page={{ ...files[file], content: files[file].contents.toString() }}
          />
        );

        // Render <Template>
      } else if (multimatch(file, "**/*.template.jsx").length) {
        console.log(file);
        const Template = require(path.join(pathPrefix, file));
        files[file].contents = ReactDOMServer.renderToString(
          <Template site={site} />
        );
        files[file.replace(".template.jsx", ".html")] = files[file];
        delete files[file];
      }
    });
    //
    // if isPost
    // <Site><Post></Site>
    // else
    // <Site><Page></Site>
    done();
  };
}

function render(componentPath, props) {
  let out = "";
  try {
    const Component = require(componentPath);
    out =
      "<!DOCTYPE html>" +
      ReactDOMServer.renderToString(React.createElement(Component, props));
  } catch (e) {
    console.log("Error rendering JSX.", e);
  }
  return out;
}

module.exports = renderReact;
