// @ts-check
import fs from "fs";
import path from "path";
import Metalsmith from "metalsmith";
import multimatch from "multimatch";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
// import cheerio from "cheerio";
import renderTemplates from "./src/plugin-render-templates.js";
import * as layouts from "./src/server/Layouts.js";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

console.time("Build time");
let App = Metalsmith(__dirname)
  .source("./src/client")
  .destination("./build")
  /**
   * Site data
   * Get the data for the site and stick it in metalsmith's global metadata
   * This data is cached. Rather than parsing/creating it upon each build,
   * it is parsed/created once upon "prebuild" and then used on each
   * subsequent build.
   */
  .metadata(
    JSON.parse(
      fs.readFileSync(path.join(__dirname, ".cache/site.json")).toString()
    )
  )
  .clean(true)
  .use(renderTemplates())
  .use((files, metalsmith, done) => {
    multimatch(Object.keys(files), "**/*.html")
      // .slice(0, 2)
      .forEach((file) => {
        const dom = new JSDOM(files[file].contents);
        const document = dom.window.document;

        /**
         * Generated the `fidelity/med/*` files
         */
        // Remove all inline <script> and <style> tags from the default fidelity
        Array.from(document.querySelectorAll("script, style")).forEach((el) => {
          el.remove();
        });

        // Add a back a basic set of styles
        let $basicStyles = document.createElement("style");
        $basicStyles.innerHTML = fs
          .readFileSync(path.join(__dirname, "./src/server/styles/basic.css"))
          .toString();
        document.querySelector("head").appendChild($basicStyles);

        files[`fidelity-med/${file}`] = {
          contents: dom.serialize(),
        };

        /**
         * Generated the `fidelity/low/*` files
         */

        // Rip out the <style> tag again
        document.querySelector("style").remove();

        // Make images available as links
        Array.from(document.querySelectorAll("img")).forEach((img) => {
          let a = document.createElement("a");
          a.href = img.src;
          a.text = `[Image: ${img.alt}]`;
          img.insertAdjacentElement("beforebegin", a);
          img.remove();
        });

        // Remove inline SVGs entirely (shouldn't be relying on these)
        Array.from(document.querySelectorAll("svg")).forEach((svg) => {
          svg.remove();
        });

        files[`fidelity-low/${file}`] = {
          contents: dom.serialize(),
        };
      });
    done();
  })
  .build((err, files) => {
    // build process
    if (err) throw err; // error handling is required
    console.timeEnd("Build time");
  });

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
