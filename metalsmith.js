import fs from "fs";
import path from "path";
import Metalsmith from "metalsmith";
import multimatch from "multimatch";
// import cheerio from "cheerio";
// import getBlogPostsStatus from "./src/server/getBlogPostsStatus.js";
import * as layouts from "./src/server/Layouts.js";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

console.time("|-- build");
console.time("|-- build:setup");
let App = Metalsmith(__dirname)
  .source("./src/client")
  .destination("./build")
  .clean(true)
  .use(async (files, metalsmith, done) => {
    /**
     * Site data
     * Get the data for the site and stick it in metalsmith's global metadata
     * This data is cached. Rather than parsing/creating it upon each build,
     * it is parsed/created once upon "prebuild" and then used on each
     * subsequent build.
     */

    /** @type {Site} */
    const site = JSON.parse(
      fs
        .readFileSync(path.join(__dirname, "./.site-data.cache.json"))
        .toString()
    );

    // We have to modify this data just slight to make our templates work right
    // @TODO fix this one day?
    site.posts = site.posts.map((post) => ({
      ...post,
      layout: "Post",
    }));

    console.timeEnd("|-- build:setup");

    /**
     * Posts
     */
    console.time("|-- build:posts");
    site.posts.forEach((post) => {
      // Remove the leading slash in the path, i.e. `/2019/slug/` => `2019/slug/`
      files[`${post.path.slice(1)}index.html`] = post;
    });
    console.timeEnd("|-- build:posts");

    /**
     * Handle Links
     */
    console.time("|-- build:links");
    site.links = [];
    multimatch(Object.keys(files), "links/**").forEach((file, i) => {
      const filename = path.basename(file, path.extname(file));
      // if (i === 0) {
      files[file].layout = "Post";
      files[file].date = new Date(file.slice(0, 10));
      files[file].tags = [];
      files[file].permalink = `/links/${filename}/`;
      let title = marked.parseInline(files[file].title, {
        renderer: {
          link: (href, title, text) => {
            files[file].href = href;
            files[file].domain = psl.get(new URL(href).hostname);
            return text;
          },
          text: (string) => string,
          em: (string) => string,
          html: (string) => string,
        },
      });
      files[file].title = title;

      files[`links/${filename}/index.html`] = files[file];
      site.links.push({ ...files[file] });
      delete files[file];
      // }
    });
    console.timeEnd("|-- build:links");

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
    // Looks at file metadata for `layout` key and matches that to a
    // corresponding component from Layouts.js, i.e. "Post", "Page", etc.
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
