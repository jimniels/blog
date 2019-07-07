const multimatch = require("multimatch");

const metadata = () => (files, metalsmith, done) => {
  // Create a list of our posts
  //   [{}, {}]
  // Create a mapping of tags to the number of their appearances, i.e.
  //   {engineering: 23, design: 14}
  let posts = [];
  let tags = {};
  Object.keys(files).forEach(file => {
    files[file].srcFilepath = file;

    if (multimatch(file, ["drafts/**", "draftz/**"]).length) {
      // @TODO include drafts
      delete files[file];
    }

    if (multimatch(file, "posts/*.md").length) {
      const post = files[file];

      // Turn the tags into an array
      if (post.tags) {
        const preTrim = post.tags;
        const postTrim = post.tags.trim();
        if (preTrim !== post.tags) {
          console.log("Extra space on tags for:", file);
        }
        // Tags will come space separated, i.e. "readingNotes design"
        // So turn them into an array
        post.tags = post.tags.trim().split(" ");
        // Create a collection of tags
        post.tags.forEach(tag => {
          if (tags[tag]) {
            tags[tag] += 1;
          } else {
            tags[tag] = 1;
          }
        });
      }

      files[file].ZZZ = ["TEST"];

      // Add it as a post
      posts.push(post);
    }
  });

  // Set the metadata each time
  metalsmith.metadata({
    baseurl: "",
    posts,
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
