import Metalsmith from "metalsmith";
import path from "path";
import { fileURLToPath } from "url";
import multimatch from "multimatch";
import hljs from "highlight.js";
import marked from "marked";
import fetch from "node-fetch";
import psl from "psl";
import getBlogPostsStatus from "./src/server/blogPostsStatus.js";
import getTrendingPosts from "./scripts/getTrendingPosts.js";
import * as layouts from "./src/server/Layouts.js";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

console.log("build");
console.time("build");

// Old posts use markdown for images `![]()` which nests them as <p><img></p>
// in the output. Some of the newer posts just manually specify the `<img>`
// on a new line. These don’t get parsed into images wrapped in <p>s, which is
// what I need for a client-side script (and is semantically more correct
// I suppose). So that’s what this is doing here.
let renderer = new marked.Renderer();
renderer.html = (html) => {
  if (html.startsWith("<img")) {
    return `<p>${html}</p>`;
  }
  return html;
};
let linksByDomain = {};
renderer.link = (href, title, text) => {
  let hostname;

  if (href.startsWith(".") || href.startsWith("/")) {
    hostname = "blog.jim-nielsen.com";
  } else {
    hostname = new URL(href).hostname;
  }

  let domain = psl.get(hostname);

  if (linksByDomain[domain]) {
    linksByDomain[domain].push(href);
  } else {
    linksByDomain[domain] = [href];
  }

  return `<a href="${href}" ${title ? `title="${title}"` : ""}>${text}</a>`;
};

marked.setOptions({
  renderer,
  highlight: (code, language) => {
    const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
    // https://github.com/markedjs/marked/blob/master/docs/USING_ADVANCED.md
    return hljs.highlight(validLanguage, code).value;
  },
  gfm: true, // github flavored markdown
  // breaks: false,
  smartLists: true,
  langPrefix: "language language-",
});
const isDevelopment = process.env.NODE_ENV !== "production";

console.time("|-- build:setup");
let App = Metalsmith(__dirname)
  .metadata({
    name: "Jim Nielsen’s Weblog",
    origin: "https://blog.jim-nielsen.com",
    isDevelopment,
  })
  .source("./src/client")
  .destination("./build")
  .clean(true)
  .use(async (files, metalsmith, done) => {
    console.timeEnd("|-- build:setup");

    // Setup data
    const site = metalsmith.metadata();

    /**
     * Handle Markdown
     * Convert all .md files to .html files
     */
    console.time("|-- build:markdown");
    multimatch(Object.keys(files), "**/*.md").forEach((file) => {
      let fileContentsByLine = files[file].contents.toString().split("\n");

      // YAML front-matter is handled by Metalsmith, so we should have it at
      // this point in time. In some cases, we add the `title` of the post
      // as the first <h1> in the document, instead of in the YAML front-matter
      // In those cases, we need to pull that out and add it as a meta item.
      if (!files[file].title) {
        // capture the line the title is on
        for (let i = 0; i < fileContentsByLine.length; i++) {
          let line = fileContentsByLine[i];
          if (line.startsWith("# ")) {
            // get the title
            let title = line.replace("# ", "");
            files[file].title = title;
            // remove the title from our array
            fileContentsByLine.splice(i, 1);
            break;
          }
        }
      }

      // We'll save markdown, so we can access just that if we want,
      // but we'll also save the `.contents` because that's what gets output to
      // a file. Useful for cases like
      const fileContents = fileContentsByLine.join("\n");
      const markdown = marked(fileContents);
      files[file].markdown = fileContents;
      files[file].contents = markdown;
      files[file.replace(".md", ".html")] = files[file];
      delete files[file];
    });
    console.timeEnd("|-- build:markdown");

    /**
     * Posts
     * Do stuff that we want to do with each post file
     */
    console.time("|-- build:posts");
    multimatch(Object.keys(files), "posts/**").forEach((file) => {
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
    console.timeEnd("|-- build:posts");

    /**
     * Handle Collections
     * Remember that anything happening here could be the first _or_ second
     * pass (so all the files or only one)
     */
    console.time("|-- build:collections");
    const meta = metalsmith.metadata();
    // Doesn't exist yet, so all files are available
    meta.posts = Object.keys(files)
      .filter((file) => files[file].layout === "Post")
      .map((file) => files[file])
      .sort((a, b) => {
        const formatForDateSort = (date) =>
          Number(date.toISOString().slice(0, 10).replace(/-/g, ""));
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
    // Add a postsByYear since it gets used in multiple places
    meta.postsByYear = meta.posts.reduce((acc, post) => {
      const year = post.date.getFullYear();
      if (acc[year]) {
        acc[year].push(post);
      } else {
        acc[year] = [post];
      }
      return acc;
    }, {});

    const trendingPostPermalinks = await getTrendingPosts();
    meta.trendingPosts = trendingPostPermalinks.map((permalink) =>
      meta.posts.find((post) => post.permalink === permalink)
    );
    console.timeEnd("|-- build:collections");

    /**
     * Handle blogPostsStatus generation
     * Given a goal against a point in time along with some posts, see where
     * my status is tracking.
     */
    site.blogPostsStatus = await getBlogPostsStatus({
      goal: 78,
      goalUrl: "#",
      moment: new Date(),
      allPosts: site.posts,
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
    console.time("|-- build:templates");
    site.linksByDomain = linksByDomain;

    // Render templates first
    // We run our templating on the `.tmpl.js` files first because some of them
    // depend on getting *ONLY* the content of a post. So we want to render our
    // post templates last (otherwise our feeds will contain the entire HTML of
    // an individual post, including the <!DOCTYPE> )
    const getFilePath = (filepath) =>
      path.join(metalsmith._directory, metalsmith._source, filepath);
    const templateFiles = multimatch(Object.keys(files), "**/*.tmpl.js");
    await Promise.all(
      templateFiles.map(async (file) => {
        try {
          const fn = await import(getFilePath(file)).then(
            (module) => module.default
          );
          files[file].contents = fn(site);
          const newFilename = file.replace(".tmpl.js", "");
          files[newFilename] = files[file];
          delete files[file];
        } catch (e) {
          console.error("Failed to render template for", file);
          console.error(e);
        }
      })
    );

    // Render layouts last of all
    const layoutFiles = Object.keys(files).filter((file) => files[file].layout);
    await Promise.all(
      layoutFiles.map(async (file) => {
        const fn = layouts[files[file].layout];
        if (fn) {
          files[file].contents = fn({
            site,
            page: files[file],
          });
        }
      })
    );
    console.timeEnd("|-- build:templates");

    done();
  })
  .build((err) => {
    // build process
    if (err) throw err; // error handling is required
    console.timeEnd("build");
  });

/**
 * @typedef {Object} Site
 * @property {Array.<Post>} posts
 * @property {Object.<string,Post>} postsByYear
 * @property {Array.<Post>} trendingPosts
 * @property {Object} page
 * @property {Object.<string,Array[string]>} linksByDomain
 * @property {string} blogPostsStatus
 */

/**
 * @typedef {Object} Post
 * @property {string} title
 * @property {string} slug
 * @property {string} permalink
 * @property {Date} date
 * @property {string} tags
 * @property {string} redirect_from
 */

/**
 * @typedef {Object} Page
 * @property {string} id
 * @property {string} title
 */
