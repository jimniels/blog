import multimatch from "multimatch";

export default function metadata() {
  return (files, metalsmith, done) => {
    // Create a list of our posts
    //   [{}, {}]
    // Create a mapping of tags to the number of their appearances, i.e.
    //   {engineering: 23, design: 14}
    let posts = [];
    let tags = {};
    Object.keys(files).forEach(file => {
      if (multimatch(file, "posts/*.md").length) {
        const post = files[file];

        // Add it as a post
        posts.push(post);

        // Add meta about it's tags if they exist
        if (post.tags) {
          // Tags will come space separated, i.e. "readingNotes design"
          post.tags
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
}
