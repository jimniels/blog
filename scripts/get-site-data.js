import fs from "fs";
import path from "path";
import marked, { linksByDomain } from "./marked.js";
import getTrendingPosts from "./get-trending-posts.js";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

/**
 * Reads in all data and writes out a cache file of site data
 * {
 *   linksByDomain: { <string>: Array.<string> }
 *   posts: Array.<Posts>
 * }
 */

// Get the rending posts from Netlify. We'll add info from this to our posts
const trendingPosts = await getTrendingPosts();

const files = fs
  .readdirSync(path.join(__dirname, "../posts"))
  .filter((file) => {
    // An extra console to tell us if we've named a file wrong
    if (/[A-Z]/.test(file)) {
      console.warn("⚠️ You've got an uppercase slug ", file);
    }

    return file.endsWith(".md");
  });

const posts = files
  .map((file) => {
    let post = {
      title: "",
      tags: [],
      contents: "",
      date: undefined, // Date
      slug: "",
      path: "",
      // pageviews added dynamically where relevant
      // permalink added at build time
    };

    // Extract `title` and `tags` from the markdown document
    // Then convert everything else to HTML
    //
    // `tags` will (optionally) start the document as a single line of hashtags
    //   #hashtag #myThing #design
    // `title` will be the first <h1> in the document
    //   # Title of my document
    const markdown = fs
      .readFileSync(path.join(__dirname, "../posts", file))
      .toString();
    let markdownByLine = markdown.split("\n");
    for (let i = 0; i < markdownByLine.length; i++) {
      let line = markdownByLine[i];
      // If there are tags, split the into an array without the `#`
      // #html #css #js -> ["html", "css", "js"]
      if (/#[a-z]/.test(line)) {
        post.tags = line.split(" ").map((tag) => tag.slice(1));
        // Remove the line
        markdownByLine.splice(i, 1);
      }
      // If it's the <h1>, extract it
      else if (line.startsWith("# ")) {
        post.title = line.replace("# ", "");
        // Remove the line
        markdownByLine.splice(i, 1);
        break;
      }
    }
    // If we didn't get a title, throw because that's bad data
    if (!post.title) {
      throw new Error("Could not find a `title` for:", file);
    }

    // Convert markdown to HTML
    const markdownSansTagsAndTitle = markdownByLine.join("\n");
    post.contents = marked(markdownSansTagsAndTitle);

    // "2019-06-12-my-post-slug.md" -> "2019-06-12-my-post-slug"
    const filename = file.replace(".md", "");
    const dateYYYYMMDD = filename.slice(0, 10);
    const year = dateYYYYMMDD.slice(0, 4);
    const slug = filename.slice(11);

    // We need just the slug for old redirects
    post.slug = slug;
    post.path = `/${year}/${slug}/`;

    // I don't store time information on my posts, so we'll make all posts
    // publish at the same time of day: noon mountain time.
    // Noon mountain time is UTC-7 (technically UTC-6 during daylight savings)
    // That's why we append T19 zulu time on to the end
    post.date = new Date(dateYYYYMMDD + "T19:00:00Z");

    // If the post is one of the trending ones, indicate its number of pageviews
    const trendingPost = trendingPosts.find(
      ({ resource }) => resource === post.path
    );
    if (trendingPost) {
      post.pageviews = trendingPost.count;
    }

    return post;
  })
  .sort((a, b) => {
    const formatForDateSort = (date) =>
      Number(date.toISOString().slice(0, 10).replace(/-/g, ""));
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
      if (aname < bname) {
        return -1;
      } else if (aname > bname) {
        return 1;
      } else {
        return 0;
      }
    }
  });

const data = {
  linksByDomain,
  posts,
};

fs.writeFileSync(
  path.join(__dirname, "../.cache/data.json"),
  JSON.stringify(data, null, 2)
);
