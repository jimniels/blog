const Metalsmith = require("metalsmith");
const markdown = require("metalsmith-markdown");
const permalinks = require("metalsmith-permalinks");
const { dirname, join } = require("path");
const { fileURLToPath } = require("url");
const multimatch = require("multimatch");
const pretty = require("pretty");
const metadata = require("./plugins/metadata.js");

Metalsmith(__dirname)
  .source("./src/client") // source directory
  .destination("./build") // destination directory
  .clean(true) // clean destination before
  .use(metadata())
  .use(markdown()) // transpile all md into html
  .use(
    permalinks({
      // change URLs to permalink URLs
      relative: false // put css only in /css
    })
  )
  // Render templates
  .use((files, metalsmith, done) => {
    const { Post } = require("./src/server/Layout.js");
    const site = metalsmith.metadata();

    Object.keys(files).forEach(file => {
      // <Page> templates
      if (multimatch(file, "**/*.tmpl.js").length) {
        const Component = require(join(
          metalsmith._directory,
          metalsmith._source,
          file
        ));

        files[file].contents = pretty(Component(site));
        files[file.replace(".tmpl.js", "")] = files[file];
        delete files[file];
        // Posts
      } else if (multimatch(files[file].srcFilepath, "posts/**").length) {
        // @TODO
        files[file].contents = Post({ site, page: files[file] });
        // console.log(out);
      } else {
        // regular <Page> .md files
      }
    });

    done();
  })
  .build(err => {
    // build process
    if (err) throw err; // error handling is required
  });
