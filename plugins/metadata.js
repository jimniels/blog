const multimatch = require("multimatch");
const path = require("path");
const marked = require("marked");
const hljs = require("highlight.js");

// Set options
// `highlight` example uses `highlight.js`
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: code => {
    return hljs.highlightAuto(code).value;
  },
  gfm: true, // github flavored markdown
  // breaks: false,
  smartLists: true,
  langPrefix: "language language-"
});

const metadata = isDevelopment => (files, metalsmith, done) => {
  // Delete all drafts
  // @TODO IF we are including drafts, move them to the "posts" folder
  multimatch(Object.keys(files), ["drafts/**", "draftz/**"]).forEach(file => {
    delete files[file];
  });

  // Convert markdown to HTML for all .md files
  multimatch(Object.keys(files), "**/*.md").forEach(file => {
    files[file].contents = marked(
      files[file].contents
        .toString()
        .replace(/{{\s*site.imageurl\s*}}/g, "/assets/img/") // @TODO
    );
    files[file.replace(".md", ".html")] = files[file];
    delete files[file];
  });

  // Do stuff with posts
  multimatch(Object.keys(files), "posts/**").forEach(file => {
    files[file].layout = "Post";
    const post = files[file];

    // @TODO rename anything that gets logged here
    if (/[A-Z]/.test(file)) {
      console.log("=====> You've got an uppercase slug ", file);
    }

    // Set the URL based on filename
    const slug = path
      .basename(file)
      .split(".")[0]
      .slice(11)
      .toLowerCase();
    const year = files[file].date.getFullYear(); // @TODO handle dates
    files[file].slug = slug;
    files[file].permalink = `/${year}/${slug}/`;

    // Tags: turn them into an array
    if (post.tags) {
      // A little extra warning
      if (post.tags !== post.tags.trim()) {
        console.warn(
          "Tag data is malformed. No extra spaces around tags for:",
          file
        );
      }

      // Tags will come space separated, i.e. "readingNotes design"
      // So turn them into an array
      post.tags = post.tags.trim().split(" ");
    }

    // Rename post to slug output
    files[`${year}/${slug}/index.html`] = files[file];
    delete files[file];
  });

  // May already exist, don't update @TODO
  const meta = metalsmith.metadata();
  if (!meta.posts) {
    meta.posts = Object.keys(files)
      .filter(file => files[file].layout === "Post")
      .map(file => files[file])
      .sort((a, b) => {
        const formatForDateSort = date =>
          Number(
            date
              .toISOString()
              .slice(0, 10)
              .replace(/-/g, "")
          );
        const adate = formatForDateSort(a.date);
        const bdate = formatForDateSort(b.date);
        // Sort by date, then alphabetically
        if (adate > bdate) {
          return -1;
        } else if (adate < bdate) {
          return 1;
        } else {
          const aname = a.title.toLowerCase();
          const bname = b.title.toLowerCase();
          if (aname > bname) {
            return -1;
          } else if (aname < bname) {
            return 1;
          } else {
            return 0;
          }
        }
      });
  }

  done();
};

module.exports = metadata;
