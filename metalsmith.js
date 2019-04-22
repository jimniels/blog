require("@babel/register")({
  presets: ["@babel/preset-react"]
});

const path = require("path");
const multimatch = require('multimatch');
const Metalsmith = require('metalsmith');
const permalinks = require("metalsmith-permalinks");
const watch = require('metalsmith-watch');
const serve = require('metalsmith-serve');
const { report } = require("metalsmith-debug-ui");
const render = require("./src/server/plugins/render");
var hljs = require('highlight.js');
const md = require("markdown-it")({
  // Syntax highlighting
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) { }
    }

    return ''; // use external default escaping
  }
});

const IS_DEVELOPMENT = process.env.NODE_ENV !== "production";

let app = Metalsmith(__dirname)
  .metadata({
    site: {
      ...require("./metalsmith-config.json"),
      isDevelopment: IS_DEVELOPMENT
    }
  })
  .source('./src/client')
  .destination('../build')
  .clean(true)
  .use((files, metalsmith, done) => {
    const metadata = metalsmith.metadata();

    // If we've already run this function, don't run again
    // @TODO this should be an incremental upgrade, as sometimes only
    // one file is running through here, not the entire site
    if (metadata.site.posts) {
      setImmediate(done);
      return;
    }

    // Posts metadata
    Object.keys(files).forEach(file => {
      if (multimatch(file, "posts/*").length) {
        // Permalink
        const slug = file.substring(17, file.length - 5).toLowerCase();
        const year = files[file].date.getFullYear()
        files[file].permalink = `/${year}/${slug}/`;

        // Tags
        if (files[file].tags && files[file].tags.length > 0) {
          files[file].tags = files[file].tags.split(" ");
        }

        // Markdown
        files[file].contents = md.render(files[file].contents.toString());

      }
    });

    // Site collection
    metadata.site.posts = Object.keys(files)
      .filter(file => multimatch(file, "posts/*").length)
      .map(file => files[file])
      .sort((a, b) => {
        // Turns a date object into a number representing YYYYMMDD
        const getDate = (d) => Number(d.toISOString().substring(0, 10).replace(/-/g, ""))
        const aDate = getDate(a.date);
        const bDate = getDate(b.date);

        // If dates are equal, sort by post alphabetically. Otherwise, reverse
        // chronological
        if (aDate === bDate) {
          return a.permalink > b.permalink ? 1 : -1;
        } else if (aDate < bDate) {
          return 1;
        } else {
          return -1;
        }
      })

    setImmediate(done);
  })
  .use(render());

if (IS_DEVELOPMENT) {
  app
    .use(serve())
    .use(
      watch({
        paths: {
          "${source}/**/*": true,
          "src/templates/**/*": "**/*.md",
        },
        livereload: true
      })
    )
    .use(report("build"))
}

app.build(function (err) {
  if (err) throw err;
});
