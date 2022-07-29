// @ts-check
import fs from "fs";
import path from "path";
import Metalsmith from "metalsmith";
import multimatch from "multimatch";
import fetch from "node-fetch";
// import cheerio from "cheerio";
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

    /** @type { import("./types").Site } */
    const site = JSON.parse(
      fs.readFileSync(path.join(__dirname, ".cache/site.json")).toString()
    );
    console.timeEnd("|-- build:setup");

    /**
     * Pages
     * Render the templates for all "pages" (files with `.tmpl.js` in them)
     *
     * Note: posts get `site` AND `page` data.
     *   ({ site, page }) => {}
     * Pages ONLY get `site` data, so they can render themselves.
     *   (site) => CustomLayout({ site, page: {...} }, children)
     */
    console.time("|-- build:pages");
    const getFilePath = (filepath) =>
      path.join(metalsmith._directory, metalsmith._source, filepath);
    const templateFiles = multimatch(Object.keys(files), "**/*.tmpl.js");
    await Promise.all(
      templateFiles.map(async (file) => {
        try {
          // If there's a `loader` function, we'll execute it and pass in the
          // async data as the second parameter to the Component.
          // Note: each loader should be responsible for supply it's own `catch`
          // and data in the case of a failure.
          const { default: Component, loader } = await import(
            getFilePath(file)
          );
          let loaderData = undefined;
          if (loader) {
            try {
              loaderData = await loader(site);
            } catch (e) {
              console.error(
                `Uncaught error: failed to fetch loader data for \`${file}\`. You should catch your own errors and supply fallback data for a failed loader.`,
                e
              );
            }
          }
          files[file].contents = Component(site, loaderData);
          const newFilename = file.replace(".tmpl.js", "");
          files[newFilename] = files[file];
          delete files[file];
        } catch (e) {
          console.error("Failed to render template for", file);
          console.error(e);
        }
      })
    );
    console.timeEnd("|-- build:pages");

    /**
     * Posts
     *
     */
    console.time("|-- build:posts");
    site.posts.forEach((post) => {
      // Create a new entry in metalsmith for each post.
      // Ensure the leading slash is absent in the file name, i.e. `2019/slug/index.html`
      const file = `${post.path.slice(1)}index.html`;
      files[file] = {
        ...post,
        contents: layouts.Post(site, post),
      };
    });
    console.timeEnd("|-- build:posts");

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
