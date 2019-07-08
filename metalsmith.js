const Metalsmith = require("metalsmith");
const watch = require("metalsmith-watch");
const serve = require("metalsmith-serve");
const { dirname, join } = require("path");
const { fileURLToPath } = require("url");
const multimatch = require("multimatch");
const metadata = require("./plugins/metadata.js");

const isDevelopment = process.env.NODE_ENV !== "production";

let App = Metalsmith(__dirname)
  .metadata({
    baseurl: "",
    isDevelopment
  })
  .source("./src/client") // source directory
  .destination("./build") // destination directory
  .clean(true) // clean destination before
  .use(metadata())
  .use((files, metalsmith, done) => {
    const layouts = require("./src/server/Layouts.js");
    const site = metalsmith.metadata();

    const getFilePath = filepath =>
      join(metalsmith._directory, metalsmith._source, filepath);

    Object.keys(files).forEach(file => {
      // Templates
      if (multimatch(file, "**/*.tmpl.js").length) {
        const { fn, props } = require(getFilePath(file));
        files[file].contents = fn({
          site,
          page: {
            ...files[file],
            ...props
          }
        });
        files[file.replace(".tmpl.js", "")] = files[file];
        delete files[file];
        // Files with a layout
      } else if (files[file].layout) {
        const fn = layouts[files[file].layout];
        if (fn) {
          files[file].contents = fn({
            site,
            page: files[file]
          });
        }
      }
    });

    done();
  });
if (isDevelopment) {
  App.use(
    watch({
      paths: {
        "${source}/**/*": true,
        "src/server/**/*": "**/*"
      },
      livereload: true,
      invalidateCache: true
    })
  ).use(
    serve({
      http_error_files: {
        404: "/404.html" // @TODO
      }
    })
  );
}

App.build(err => {
  // build process
  if (err) throw err; // error handling is required
});

function getPropsFromFile(file) {
  const { mode, stats, ...props } = file;
  return props;
}
