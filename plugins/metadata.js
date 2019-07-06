const multimatch = require("multimatch");
const path = require("path");

function hasUpperCase(str) {
  return /[A-Z]/.test(str);
}

const metadata = () => (files, metalsmith, done) => {
  // Create a list of our posts
  //   [{}, {}]
  // Create a mapping of tags to the number of their appearances, i.e.
  //   {engineering: 23, design: 14}
  let posts = [];
  let tags = {};
  Object.keys(files).forEach(file => {
    // Append `pathname` to everything, so we can easily run globs
    files[file].srcFilepath = file;

    if (multimatch(file, ["drafts/**", "draftz/**"]).length) {
      // @TODO some argument
      delete files[file];
    }

    // Do posts related stuff
    if (multimatch(file, "posts/*.md").length) {
      const slug = path
        .basename(file)
        .split(".")[0]
        .slice(11)
        .toLowerCase();

      // @TODO rename anything that gets logged here
      if (hasUpperCase(file)) {
        console.log("=====> You've got an uppercase slug ", file);
      }

      // Set the URL
      const year = files[file].date.getFullYear(); // @TODO handle dates
      files[file].pathname = `/${year}/${slug}/`;

      // Add the post to our collection of posts
      posts.push(files[file]);

      // Add meta about it's tags if they exist
      if (files[file].tags) {
        // Tags will come space separated, i.e. "readingNotes design"
        files[file].tags
          .trim()
          .split(" ")
          .forEach(tag => {
            if (tags[tag]) {
              tags[tag] += 1;
            } else {
              tags[tag] = 1;
            }
          });
      }

      // Rename file in metalsmith based on the url
      files[files[file].pathname.slice(1) + "index.html"] = files[file];
      delete files[file];
    }
  });

  // Save the metadata each time
  metalsmith.metadata({
    origin: "https://blog.jim-nielsen.com",
    baseurl: "",
    posts,
    isDevelopment: process.env.NODE_ENV !== "production",
    // Turn tags into an array of items, i.e.
    // [{ name: "engineering", count: 12 }, { name: "design", count: 5 }]
    tags: Object.keys(tags)
      .sort()
      .map(tag => ({
        name: tag,
        count: tags[tag]
      }))
  });

  done();
};

module.exports = metadata;
