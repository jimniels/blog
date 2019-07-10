const Metalsmith = require("metalsmith");
const watch = require("metalsmith-watch");
const serve = require("metalsmith-serve");
const path = require("path");
const { fileURLToPath } = require("url");
const multimatch = require("multimatch");
const hljs = require("highlight.js");
const marked = require("marked");

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: code => {
    return hljs.highlightAuto(code).value;
  },
  gfm: true, // github flavored markdown
  // breaks: false,
  smartLists: true,
  langPrefix: "language language-"
});
const isDevelopment = process.env.NODE_ENV !== "production";

let App = Metalsmith(__dirname)
  .metadata({
    name: "Jim Nielsen’s Blog",
    origin: "https://blog.jim-nielsen.com",
    isDevelopment
  })
  .source("./src/client")
  .destination("./build")
  .clean(true)
  .use((files, metalsmith, done) => {
    /**
     * Handle Drafts
     * @TODO IF we are including drafts, move them to the "posts" folder
     * for now we are just going to delete them.
     */
    multimatch(Object.keys(files), ["drafts/**", "draftz/**"]).forEach(file => {
      delete files[file];
    });

    /**
     * Handle Markdown
     * Convert all .md files to .html files
     */
    multimatch(Object.keys(files), "**/*.md").forEach(file => {
      const markdown = marked(
        files[file].contents
          .toString()
          // @TODO all the old posts prefixed where you could find the content
          // using this syntax
          .replace(
            /{{\s*site.imageurl\s*}}/g,
            // no relative URLs in the content, as the feeds won't work
            metalsmith.metadata().origin + "/assets/img/"
          )
      );
      // We'll save markdown, so we can access just that if we want,
      // but we'll also save the `.contents` because that's what gets output to
      // a file. Useful for cases like
      files[file].markdown = markdown;
      files[file].contents = markdown;
      files[file.replace(".md", ".html")] = files[file];
      delete files[file];
    });

    /**
     * Posts
     * Do stuff that we want to do with each post file
     */
    multimatch(Object.keys(files), "posts/**").forEach(file => {
      // An extra console to tell us if we've named a file wrong
      if (/[A-Z]/.test(file)) {
        console.log("=====> You've got an uppercase slug ", file);
      }

      // Set the layout
      files[file].layout = "Post";

      // Derive data from the filename
      // Get the filename, i.e. for "2019-06-12-my-post-slug.html" get "2019-06-12-my-post-slug"
      const filename = path.basename(file, path.extname(file));
      // Get just the date, i.e. "2019-06-12"
      const dateISO = filename.slice(0, 10);
      // Get the year, i.e. "2019"
      const year = dateISO.slice(0, 4);
      // Get the slug, i.e. "my-post-slug.md"
      const slug = filename.slice(11);

      // Store some of the filename-derived data with the post
      files[file].slug = slug;
      files[file].permalink = `/${year}/${slug}/`;
      // I don't store time information on my posts, so we'll make all posts
      // publish at the same time of day: noon mountain time.
      // Noon mountain time is UTC-7 (technically UTC-6 during daylight savings)
      // That's why we append T19 zulu time on to the end
      files[file].date = new Date(dateISO + "T19:00:00Z");

      // Tags: turn them into an array
      const { tags } = files[file];
      if (tags) {
        // A little extra warning
        if (tags !== tags.trim()) {
          console.warn(
            "Tag data is malformed. No extra spaces around tags for:",
            file
          );
        }

        // Tags will come space separated, i.e. "readingNotes design"
        // So turn them into an array
        files[file].tags = tags.trim().split(" ");
      }

      // Rename all posts to their appropriate permalinks to slug output
      files[`${year}/${slug}/index.html`] = files[file];
      delete files[file];
    });

    /**
     * Handle Collections
     * Remember that anything happening here could be the first _or_ second
     * pass (so all the files or only one)
     */
    const meta = metalsmith.metadata();
    if (meta.posts) {
      // @TODO
      // Updating can make access the .contents be the full html file and not
      // just the markdown. This can get weird. PROCEED WITH CAUTION
      // Object.keys(files).forEach(file => {
      //   const index = meta.posts.findIndex(
      //     post => post.slug === files[file].slug
      //   );
      //   if (index !== -1) {
      //     meta.posts[index] = files[file];
      //   }
      // });
    } else {
      // Doesn't exist yet, so all files are available
      meta.posts = Object.keys(files)
        .filter(file => files[file].layout === "Post")
        .map(file => files[file])
        .sort((a, b) => {
          const formatForDateSort = date =>
            Number(
              date
                .toISOString()
                .slice(0, 10)
                .replace(/-/g, "")
            );
          const adate = formatForDateSort(a.date);
          const bdate = formatForDateSort(b.date);
          // Sort by date, then alphabetically
          if (adate > bdate) {
            return -1;
          } else if (adate < bdate) {
            return 1;
          } else {
            const aname = a.title.toLowerCase();
            const bname = b.title.toLowerCase();
            if (aname > bname) {
              return -1;
            } else if (aname < bname) {
              return 1;
            } else {
              return 0;
            }
          }
        });
    }

    /**
     * Handle Templating
     * Render the templates and/or layouts for all applicable files
     */
    const layouts = require("./src/server/Layouts.js");
    const site = metalsmith.metadata();

    const getFilePath = filepath =>
      path.join(metalsmith._directory, metalsmith._source, filepath);

    Object.keys(files).forEach(file => {
      // Templates
      if (multimatch(file, "**/*.tmpl.js").length) {
        const { fn, props = {} } = require(getFilePath(file));
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

/**
 * Development
 * If this is development mode, start up the server and watch files.
 */
if (isDevelopment) {
  App.use(
    watch({
      paths: {
        "${source}/**/*": true,
        "${source}/posts/*.md": "**/*.tmpl.js",
        "src/server/**/*": "**/*"
      },
      livereload: true,
      invalidateCache: true
      // log: () => {} // silence the log
    })
  ).use(
    serve({
      http_error_files: {
        404: "/404.html" // @TODO
      }
    })
  );
}

/**
 * Build the app
 */
App.build(err => {
  // build process
  if (err) throw err; // error handling is required
});
