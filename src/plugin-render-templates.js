import PropTypes from "prop-types";
import path from "path";
import multimatch from "multimatch";

export default function renderTemplates() {
  return async (files, metalsmith, done) => {
    const log = {
      "Static Templates": 0,
      "Static Async Templates": 0,
      "Dynamic Templates": 0,
      "Dynamic Template Pages": 0,
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

        // Dynamic page rendering (multiple pages per template)
        // getPages: (model) => Array.<{ path: string, component: () => string }>
        // We pass the model data, it is responsible for giving back a path
        // and a component for rendering. Function is async in case needed.
        //
        // We don't tie these to the `export default Component` because they
        // might need to vary in their output and putting a switch statement
        // in the component based on the `path` seems unnecessary. Just let each
        // render it's own thing.
        if (getPages) {
          try {
            const pages = await getPages(model);
            log["Dynamic Templates"]++;

            // Each entry from `getPages` is responsible to supply the model
            // to any of its sub-components. We just call it here
            // @TODO wrap this in a try{}
            pages.forEach(({ path, contents }) => {
              files[path] = {
                contents,
              };
              log["Dynamic Template Pages"]++;
            });

            delete files[file];
            return;
          } catch (e) {
            console.error("Failed to render dynamic pages.", e);
          }
        }

        // Otherwise, it's a 1:1 relationship: 1 component, 1 page
        // Anything with `$` in the filename gets templated,
        // But you're responsible to supply it's real file suffix (if present)
        // e.g. `$filename.html.js`.
        //
        // Note: leading slash should be abset, e.g. `path/to/$index.html.js`
        //
        // Component(metadata, [loaderData])
        //
        // Examples:
        //   Single page
        //     import { default: Component } from "$index.html.js"
        //     Component(model) -> index.html
        //
        //   Single page that fetches its own data at build time
        //     import { default: Component, loader } from "$index.html.js";
        //     Component(model, loaderData) -> index.html

        try {
          // Overwrite the exisiting file's contents
          // Note: components are responsible to `catch` their failiures and
          // supply backup data. Or maybe we make the build fail?

          // https://stackoverflow.com/questions/38508420/how-to-know-if-a-function-is-async
          if (Component[Symbol.toStringTag] === "AsyncFunction") {
            files[file].contents = await Component(model);
            log["Static Async Templates"]++;
          } else {
            files[file].contents = Component(model);
            log["Static Templates"]++;
          }

          // Rename the file from `${filename.ext}.js` to `filename.ext`
          // @TODO maybe should use a regex here? i.e. \$(.*).js
          const newFilename = file.replace("$", "").replace(".js", "");
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
    console.log("Templating stats:");
    Object.entries(log).forEach(([key, value]) => {
      console.log("  " + key + ": " + value);
    });

    done();
  };
}
