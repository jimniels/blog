import Metalsmith from "metalsmith";
import markdown from "metalsmith-markdown";
import permalinks from "metalsmith-permalinks";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import multimatch from "multimatch";
import pretty from "pretty";

const __dirname = dirname(fileURLToPath(import.meta.url));

Metalsmith(__dirname)
  // name of current working directory
  .metadata({
    baseurl: ""

    // add any variable you want
    // use them in layout-files
    // sitename: "My Static Site & Blog",
    // siteurl: "http://example.com/",
    // description: "It's about saying »Hello« to the world.",
    // generatorname: "Metalsmith",
    // generatorurl: "http://metalsmith.io/"
  })
  .source("./src/client") // source directory
  .destination("./build") // destination directory
  .clean(true) // clean destination before
  // .use(
  //   collections({
  //     // group all blog posts by internally
  //     posts: "posts/*.md" // adding key 'collections':'posts'
  //   })
  // ) // use `collections.posts` in layouts
  .use(markdown()) // transpile all md into html
  .use(
    permalinks({
      // change URLs to permalink URLs
      relative: false // put css only in /css
    })
  )
  // Render templates
  .use(async (files, metalsmith, done) => {
    const matchedFiles = multimatch(Object.keys(files), "**/*.tmpl.js");
    console.log(matchedFiles);
    // @TODO async import, or convert to a function right here inline;
    console.log("Rendering templates....");
    await Promise.all(
      matchedFiles.map(async file => {
        console.log("  " + file);
        const fn = await import(
          join(metalsmith._directory, metalsmith._source, file)
        ).then(module => module.default);

        files[file].contents = pretty(fn(metalsmith.metadata()));
        files[file.replace(".tmpl.js", ".html")] = files[file];
        delete files[file];
      })
    );
    console.log("Done rendering templates!");

    done();
  })
  .build(err => {
    // build process
    if (err) throw err; // error handling is required
  });
