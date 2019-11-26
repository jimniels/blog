import Metalsmith from "metalsmith";
import path from "path";
import { fileURLToPath } from "url";
import multimatch from "multimatch";
import hljs from "highlight.js";
import marked from "marked";
import * as layouts from "./src/server/Layouts.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

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
    name: "Jim Nielsen’s Weblog",
    origin: "https://blog.jim-nielsen.com",
    isDevelopment
  })
  .source("./src/client")
  .destination("./build")
  .clean(true)
  .use(async (files, metalsmith, done) => {
    /**
     * Handle Drafts
     * @TODO IF we are including drafts, move them to the "posts" folder
     * for now we are just going to delete them.
     */
    multimatch(Object.keys(files), ["posts/drafts/**"]).forEach(file => {
      delete files[file];
    });

    /**
     * Handle Markdown
     * Convert all .md files to .html files
     */
    multimatch(Object.keys(files), "**/*.md").forEach(file => {
      const markdown = marked(files[file].contents.toString());
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

    /**
     * Handle Templating
     * Render the templates and/or layouts for all applicable files
     *
     * Any files (.md) with front-matter in them that indicate a `layout` get
     * rendered with that layout with `site` AND `page` data.
     *   ({ site, page }) => {}
     * Any files marked as templates get passed ONLY the `site` data so they can
     * render themselves.
     *   (site) => CustomLayout({ site, page: {...} }, children)
     */
    const site = metalsmith.metadata();

    const getFilePath = filepath =>
      path.join(metalsmith._directory, metalsmith._source, filepath);

    await Promise.all(
      Object.keys(files).map(async file => {
        // Templates
        if (multimatch(file, "**/*.tmpl.js").length) {
          try {
            const fn = await import(getFilePath(file)).then(
              module => module.default
            );
            files[file].contents = fn(site);
            const newFilename = file.replace(".tmpl.js", "");
            files[newFilename] = files[file];
            delete files[file];
          } catch (e) {
            console.error("Failed to render template for", file);
            console.error(e);
          }

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
      })
    );

    done();
  })
  .build(err => {
    // build process
    if (err) throw err; // error handling is required
  });
