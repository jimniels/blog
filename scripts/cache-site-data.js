import fs from "fs";
import path from "path";
import { marked } from "marked";
import parseMarkdown from "./parse-markdown.js";
import getTrendingPosts from "./get-trending-posts.js";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const POSTS_DIR = path.join(__dirname, "../posts");

try {
  fs.writeFileSync(
    path.join(__dirname, "../.site-data.cache.json"),
    JSON.stringify(await getSiteData(), null, 2)
  );
} catch (e) {
  console.error("Failed to cache site data", e);
  process.exit(1);
}

/**
 * Get global data available for the site.
 * @returns {Site}
 */
async function getSiteData() {
  let site = {
    name: "Jim Nielsen’s Blog",
    origin: "https://blog.jim-nielsen.com",
    linksByDomain: {},
    posts: [],
    postsByYear: {},
    readingNotes: [],
    tags: [],
  };

  // Get the rending posts from Netlify. We'll add info from this to our posts
  const trendingPosts = await getTrendingPosts();

  // All our post files
  const files = fs.readdirSync(POSTS_DIR).filter((file) => {
    // An extra console to tell us if we've named a file wrong
    if (/[A-Z]/.test(file)) {
      console.warn("⚠️ You've got an uppercase slug ", file);
    }

    return file.endsWith(".md");
  });

  // Loop over each file and add it to our site data
  files.forEach((file) => {
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
    const markdown = fs.readFileSync(path.join(POSTS_DIR, file)).toString();
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

    // Convert markdown to HTML & get links data
    const markdownSansTagsAndTitle = markdownByLine.join("\n");
    const { html, linksByDomain } = parseMarkdown(markdownSansTagsAndTitle);
    post.contents = html;
    site.linksByDomain = {
      ...site.linksByDomain,
      ...linksByDomain,
    };

    // "2019-06-12-my-post-slug.md" -> "2019-06-12-my-post-slug"
    const filename = file.replace(".md", "");
    const dateYYYYMMDD = filename.slice(0, 10);
    const year = dateYYYYMMDD.slice(0, 4);
    const slug = filename.slice(11);

    // We need just the slug for old redirects
    post.slug = slug;
    post.path = `/${year}/${slug}/`;
    post.permalink = site.origin + post.path;

    // I don't store time information on my posts, so we'll make all posts
    // publish at the same time of day: noon mountain time.
    // Noon mountain time is UTC-7 (technically UTC-6 during daylight savings)
    // That's why we append T19 zulu time on to the end
    post.date = dateYYYYMMDD + "T19:00:00Z";

    // If the post is one of the trending ones, indicate its number of pageviews
    const trendingPost = trendingPosts.find(
      ({ resource }) => resource === post.path
    );
    if (trendingPost) {
      post.pageviews = trendingPost.count;
    }

    // Add it to our collection
    site.posts.push(post);

    // If this is a note,
    if (post.tags.includes("readingNotes")) {
      let readingNote = {
        title: "",
        date: post.date,
        url: "",
        domain: "",
        content: "",
        type: "",
      };

      // markdownByLines.reduce((startNewNote, line) => {
      //   if (line.startsWith("## ")) {
      //     return acc;
      //   }
      // }, false)

      // const regex = /^## (.*)((.|\n|\r)*)## /gm;

      let startedCollecting = false;
      let getNote = () => ({ title: "", content: "" });
      let n = getNote();
      for (let i = 0; i < markdownByLine.length; i++) {
        if (markdownByLine[i].startsWith("## ")) {
          if (!startedCollecting) {
            startedCollecting = true;
          } else {
            site.readingNotes.push(n);
            n = getNote();
          }
          n.title = markdownByLine[i];
        } else if (!startedCollecting) {
          continue;
        } else if (markdownByLine[i]) {
          n.content += markdownByLine[i];
        }

        i++;
      }
      // const readingNotes = markdownSansTagsAndTitle.split("## ");
      // const out = parseCustomMd()

      /*
      const readingNotes = markdownSansTagsAndTitle.split("## ");

      readingNotes.forEach((note) => {
        try {
          const regex = /^## (.*?): (.*)/g;
          const res = regex.exec(note);
          console.log(res);
          readingNote.type = res[1];
          // readingNote.title = res[2];
          readingNote.title = marked.parseInline(res[2], {
            renderer: {
              link: (href, title, text) => {
                readingNote.url = href;
                readingNote.domain = psl.get(new URL(href).hostname);
                return text;
              },
              text: (string) => string,
              em: (string) => string,
              html: (string) => string,
            },
          });
        } catch (e) {
          console.log(
            "Could not derive readingNote data for post: `%s`",
            post.title,
            e
          );
        }
      });

      // markdown.split(/\n## /).forEach((section, i) => {
      //   if (section.startsWith("#")) {
      //   } else {
      //     readingNote.title = console.log(section);
      //     readingNote.title = marked.parseInline(section.split("\n")[0], {
      //       renderer: {
      //         link: (href, title, text) => {
      //           readingNote.url = href;
      //           readingNote.domain = psl.get(new URL(href).hostname);
      //           return text;
      //         },
      //         text: (string) => string,
      //         em: (string) => string,
      //         html: (string) => string,
      //       },
      //     });
      //   }
      // });
      */
    }
  });

  // Sort our collection of posts
  site.posts.sort((a, b) => {
    const formatForDateSort = (date) =>
      Number(date.slice(0, 10).replace(/-/g, ""));
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

  // Posts by year, since this is used in multiple places
  // (don't include rssClub posts)
  site.postsByYear = site.posts
    .filter((post) => !post?.tags.includes("rssClub"))
    .reduce((acc, post) => {
      const year = post.date.slice(0, 4);
      if (acc[year]) {
        acc[year].push(post);
      } else {
        acc[year] = [post];
      }
      return acc;
    }, {});

  // All site tags
  site.tags = Array.from(
    new Set(
      site.posts
        .filter((post) => post.tags)
        .map((post) => post.tags)
        .flat()
    )
  );

  return site;
}

/**
 * Data model for all data part of the site. This should be stingify-able
 * @typedef {Object} Site
 * @property {string} name
 * @property {string} origin
 * @property {Object.<string, Array.<string>>} linksByDomain
 * @property {Array.<Post>} posts
 * @property {Object.<string, Array.<Post>>} postsByYear
 * @property {Array.<string>} tags
 * @property {Array.<ReadingNote>} readingNotes
 */

/**
 * Model for collection of notes made from my 'reading notes' posts
 * @typedef {Object} ReadingNote
 * @property {string} type - enumerated set of values
 * @property {string} url
 * @property {string} domain
 * @property {string} title
 * @property {string} content
 * @property {string} date
 */

/**
 * The post created from raw markdown data and stringified to JSON
 * @typedef {Object} Post
 * @property {string} title
 * @property {string} date - ISO8601 datestring
 * @property {string} slug - Slug of post, i.e. `my-post`
 * @property {string} path - Path to the post, i.e. `/2019/my-post/`
 * @property {string} permalink - Fully qualified URL (site.origin + post.path)
 * @property {Array.<string>} tags
 * @property {number} pageviews? - Pageviews according to netlify analytics
 */

/**
 * @typedef {Object} Page
 *
 * @property {string} title
 * @property {string} path
 */

function parseCustomMd(markdown, opts = { heading: "# " }) {
  let out = {
    title: "",
    contents: "",
    tags: [],
  };

  let markdownByLine = markdown.split("\n");
  for (let i = 0; i < markdownByLine.length; i++) {
    let line = markdownByLine[i];
    // If there are tags, split the into an array without the `#`
    // #html #css #js -> ["html", "css", "js"]
    if (/#[a-z]/.test(line)) {
      out.tags = line.split(" ").map((tag) => tag.slice(1));
      // Remove the line
      markdownByLine.splice(i, 1);
    }
    // If it's the heading, extract it
    else if (line.startsWith(opts.heading)) {
      out.title = line.replace(opts.heading, "");
      // #@TODO parse it
      // Remove the line
      markdownByLine.splice(i, 1);
      break;
    }
  }
  out.contents = markdownByLine.join("\n");
  // If we didn't get a title, throw because that's bad data
  if (!out.title) {
    throw new Error("Could not find a `title` for:");
  }
  if (!out.contents) {
    throw new Error("Could not find `contents` for:");
  }

  return out;
}
