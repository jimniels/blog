require("@babel/register")({
  presets: ["@babel/preset-react"]
});
const Metalsmith = require("metalsmith");
const markdown = require("metalsmith-markdown");
const permalinks = require("metalsmith-permalinks");
const watch = require("metalsmith-watch");
const serve = require("metalsmith-serve");
const { dirname, join } = require("path");
const { fileURLToPath } = require("url");
const multimatch = require("multimatch");
const pretty = require("pretty");
const fs = require("fs");
const metadata = require("./plugins/metadata.js");
const renderReact = require("./plugins/render-react.js");

// const __dirname = dirname(fileURLToPath(import.meta.url));
const isDevelopment = process.env.NODE_ENV !== "production";

let App = Metalsmith(__dirname)
  .source("./src/client") // source directory
  .destination("./build") // destination directory
  .clean(true) // clean destination before
  .use(metadata())
  .use(markdown()) // transpile all md into html
  // .use(
  //   permalinks({
  //     // change URLs to permalink URLs
  //     relative: false // put css only in /css
  //   })
  // )
  // Render templates
  .use((files, metalsmith, done) => {
    // @TODO async import, or convert to a function right here inline;
    // try {
    //   const matchedFiles = multimatch(Object.keys(files), "404.tmpl.js");
    //   await Promise.all(
    //     matchedFiles.map(async file => {
    //       const filepath = join(
    //         metalsmith._directory,
    //         metalsmith._source,
    //         file
    //       );

    //       console.log(file);
    //       const fn = require(filepath);

    //       files[file].contents = pretty(
    //         fn({ ...metalsmith.metadata(), isDevelopment })
    //       );
    //       files[file.replace(".tmpl.js", ".html")] = files[file];
    //       delete files[file];
    //     })
    //   );
    // } catch (e) {
    //   console.error("==> Error rendering templates.", e);
    // }

    // multimatch(Object.keys(files), "404.template.html").forEach(file => {
    //   console.log("Rendering...", file);
    //   console.log(
    //     render(
    //       files[file].contents.toString(),
    //       { ...metalsmith.metadata(), isDevelopment },
    //       () => "TEST"
    //       // (includePath, includeProps) => {
    //       //   return "TEST";
    //       //   const templ = fs.readFileSync(
    //       //     join(__dirname, "src/server", includePath)
    //       //   );
    //       //   return render(templ, includeProps);
    //       // }
    //     )
    //   );
    // });

    done();
  })
  .use(renderReact());

function render(template, props, include) {
  const x = new Function(
    "template",
    "props",
    "include",
    `const output = \`${template}\`; return output;`
  );
  return x(template, props, include);
}

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
