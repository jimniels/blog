import path from "path";
import multimatch from "multimatch";
import debg from "debug";
const debug = debg("plugin-render-templates");

/**
 * How this works:
 *
 * Any file you want to get picked up by the renderer should follow the pattern:
 *   `$file-name.ext.js`
 * The `$` indicates that this is a file we want to render dynamically
 * The `.ext.js` indicates that it's a `.js` file before being processed, and
 * a `.ext` file after being processed (you're responsible to supply the real
 * file suffix where applicable present).
 *
 *
 * There are two ways to render files:
 * 1. Static template rendering (1 file -> 1 page)
 * 2. Dynamic template rendering (1 file -> `n` pages)
 *
 * Example of how it works under the hood:
 *   1. Static, single page
 *      import { default: Component } from "path/to/$index.html.js"
 *      Component(model) -> index.html
 *
 *   2. Dynamic pages
 *      import { getPages } from "path/to/$posts.js"
 *      getPages(model) => Array.<{ path: string, contents: string }>
 *      Array.forEach(path, contents => files[path] = contents)
 *
 * 1. Static template rendering
 *
 * In this case, the default export is a "Component": a function that takes the
 * model data and renders a string representing a page.
 *
 * It can be async if you need to do network requests in the component. The
 * plugin will know how to handle that case.
 *
 *
 * 2. Dynamic template rendering
 *
 * We pass the model data, it returns `n` number of pages, each of which has
 * the file's 1) path and 2) contents.
 *
 * Note: We don't tie these to the `export default Component` because they
 * might need to vary in their output and putting a switch statement
 * in the component based on the `path` seems unnecessary. Just let each
 * render it's own thing.
 *
 * Note: leading slash should be absent for the path, e.g. `path/to/$index.html.js`
 *
 */
export default function renderTemplates() {
  return async (files, metalsmith, done) => {
    debug("start");
    const log = {
      "static templates": 0,
      "static async templates": 0,
      "dynamic templates": 0,
      "dynamic template pages": 0,
    };

    const model = metalsmith.metadata();
    const src = metalsmith.source();

    const getFilePath = (filepath) =>
      path.join(metalsmith._directory, metalsmith._source, filepath);

    const templateFiles = multimatch(Object.keys(files), [
      "**/$*.js",
      ".**/$*.js",
    ]);

    await Promise.all(
      templateFiles.map(async (file) => {
        const { default: Component, getPages } = await import(
          getFilePath(file)
        );

        // Dynamic templates
        if (getPages) {
          try {
            const pages = await getPages(model);
            log["dynamic templates"]++;

            // @TODO wrap this in a try{}
            pages.forEach(({ path, contents }) => {
              files[path] = {
                contents,
              };
              log["dynamic template pages"]++;
            });

            delete files[file];
            return;
          } catch (e) {
            console.error("Failed to render dynamic pages.", e);
          }
        }

        // Static template
        try {
          // @TODO components are responsible to `catch` their failiures and
          // supply backup data. Or maybe we make the build fail?

          // https://stackoverflow.com/questions/38508420/how-to-know-if-a-function-is-async
          if (Component[Symbol.toStringTag] === "AsyncFunction") {
            files[file].contents = await Component(model);
            log["static async templates"]++;
          } else {
            files[file].contents = Component(model);
            log["static templates"]++;
          }

          // Rename the file from `${filename.ext}.js` to `filename.ext`
          // @TODO maybe should use a regex here? i.e. \$(.*).js
          const newFilename = file.replace(/\$(.*)(.js)$/, "$1");
          files[newFilename] = files[file];

          // Delete the old file
          delete files[file];

          return;
        } catch (e) {
          console.error(`Failed to render template for \`${file}\``, e);
        }
      })
    );

    // @TODO some kind of logging for how many things we rendered.
    debug("finish");
    Object.entries(log).forEach(([key, value]) => {
      debug(`rendered: ${value.toLocaleString()} ${key}`);
    });

    done();
  };
}
