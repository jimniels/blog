const { join } = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const multimatch = require("multimatch");

const render = () => (files, metalsmith, done) => {
  const { Context } = require("../templates/Context.jsx");
  const Post = require("../templates/Post.jsx");
  const { site } = metalsmith.metadata();


  Object.keys(files).forEach(file => {


    // const permalink = files[file].date + files[file].slug; // @TODO
    // you'll have to come up with `permalink` earlier for all posts, but you
    // can actually do the renaming right here
    // Test that you have a post by ensuring it starts with 

    if (files[file].permalink) {
      const { contents, mode, stats, permalink, ...props } = files[file];


      // trim off beginning /
      files[permalink.substring(1) + "index.html"] = {
        ...files[file],
        contents: "<!DOCTYPE html>" + ReactDOMServer.renderToStaticMarkup(
          <Context.Provider value={{ site, path: permalink }}>
            <Post post={{ ...props, permalink, markdown: contents.toString() }} />
          </Context.Provider>
        )
      }
      delete files[file];
    }
    else if (multimatch(file, "**/*.template.jsx").length) {
      const Component = require(join(metalsmith.directory(), "src/client", file));
      const path = file.replace(".template.jsx", "");

      files[path] = {
        ...files[file],
        contents: (file.includes(".html") ? "<!DOCTYPE html>" : "") + ReactDOMServer.renderToStaticMarkup(
          <Context.Provider value={{ site, path: "/" + file }}>
            <Component />
          </Context.Provider>
        )
      }
      delete files[file];
    }
    // else if (multimatch(file, "**/*.template.js").length) {
    //   const fn = require(files[file]);
    //   const path = file.replace(".template.js", "");
    //   files[path] = {
    //     ...files[file],
    //     contents: fn({ site, path })
    //   };
    //   delete files[file];
    // }
  });

  setImmediate(done);
}








module.exports = render;
