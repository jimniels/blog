import fs from "fs";
import path from "path";
import Metalsmith from "metalsmith";
import { fileURLToPath } from "url";
import multimatch from "multimatch";
// import cheerio from "cheerio";
// import getBlogPostsStatus from "./src/server/getBlogPostsStatus.js";
import * as layouts from "./src/server/Layouts.js";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

console.log("|-- build");
console.time("|-- build");

console.time("|-- build:setup");
let App = Metalsmith(__dirname)
  .metadata({
    name: "Jim Nielsen’s Blog",
    origin: "https://blog.jim-nielsen.com",
    isDevelopment: process.env.NODE_ENV !== "production",
  })
  .source("./src/client")
  .destination("./build")
  .clean(true)
  .use(async (files, metalsmith, done) => {
    console.timeEnd("|-- build:setup");

    const site = metalsmith.metadata();

    // const {posts, linksByDomain} = getSiteData();

    /**
     * Posts
     */
    console.time("|-- build:posts");
    const { linksByDomain, posts } = JSON.parse(
      fs.readFileSync(path.join(__dirname, "./.cache/data.json")).toString()
    );
    site.linksByDomain = linksByDomain;
    site.posts = posts.map((post) => ({
      ...post,
      // This is a string in JSON, so we make it a Date object because that's
      // what everything else expects.
      // @TODO fix this one day?
      date: new Date(post.date),
      layout: "Post",
      permalink: site.origin + post.path,
    }));
    site.posts.forEach((post) => {
      // Remove the leading slash in the path, i.e. `/2019/slug/` => `2019/slug/`
      files[`${post.path.slice(1)}index.html`] = post;
    });
    console.timeEnd("|-- build:posts");

    /**
     * Collections
     */
    console.time("|-- build:collections");
    // Add a postsByYear since it gets used in multiple places
    // And don't include rssClub posts
    site.postsByYear = site.posts
      .filter((post) => !post?.tags.includes("rssClub"))
      .reduce((acc, post) => {
        const year = post.date.getFullYear();
        if (acc[year]) {
          acc[year].push(post);
        } else {
          acc[year] = [post];
        }
        return acc;
      }, {});

    site.tags = Array.from(
      new Set(
        site.posts
          .filter((post) => post.tags)
          .map((post) => post.tags)
          .flat()
      )
    );
    console.timeEnd("|-- build:collections");

    /**
     * Handle blogPostsStatus generation
     * Given a goal against a point in time along with some posts, see where
     * my status is tracking.
     */
    // site.blogPostsStatus = await getBlogPostsStatus({
    //   goal: 0,
    //   goalUrl: "/2021/writing-in-2020-and-2021/",
    //   moment: new Date("2019-12-31"),
    //   allPosts: site.posts,
    // });

    /**
     * Templating
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

    /*
    let readingNotes = [];
    site.posts
      .filter((post) => post.tags && post.tags.includes("readingNotes"))
      .forEach((post, i) => {
        if (i < 3) {
          const $ = cheerio.load(post.contents);
          $("h2").each((i, h2) => {
            const $h2 = $(h2);
            const heading = $h2.text();

            let type = "";
            let title = "";
            try {
              const regex = /(.*?): (.*)/g;
              const res = regex.exec(heading);
              type = res[1];
              title = res[2];
            } catch (e) {
              console.log("Could not determine type for `%s`", title);
            }

            const url = $h2.find("a").attr("href");

            let content = $h2
              .nextUntil("h2")
              .toArray()
              .map((el) => $.html(el))
              .join("");

            readingNotes.push({ type, url, title, content });
          });
        }
      });
    files[`readingNotes.json`] = { contents: JSON.stringify(readingNotes) };
    */

    done();
  })

  .build((err) => {
    // build process
    if (err) throw err; // error handling is required
    console.timeEnd("|-- build");
  });

/**
 * @typedef {Object} Site
 *
 * @property {Array.<Post>} posts
 * @property {Object.<string,Array[Post]>} postsByYear
 * @property {Array.<string>} tags
 * @property {Object} page
 * @property {Object.<string,Array[string]>} linksByDomain
 * @property {string} blogPostsStatus
 */

/**
 * @typedef {Object} Post
 *
 * @property {string} title
 * @property {string} slug - Slug of post, i.e. `my-post`
 * @property {string} path - Path to the post, i.e. `/2019/my-post/`
 * @property {string} permalink - Fully qualified URL (site.origin + post.path)
 * @property {Date} date
 * @property {string} tags
 * @property {number} pageviews - Number of pageviews according to netlify analytics
 */

/**
 * @typedef {Object} Page
 *
 * @property {string} title
 * @property {string} path
 */
