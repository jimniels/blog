import fs from "fs";
import path from "path";
import psl from "psl";
import parseMarkdown from "./parse-markdown.js";
import getTrendingPosts from "./get-trending-posts.js";
import getHackerNewsPosts from "./get-hacker-news-posts.js";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const POSTS_DIR = path.join(__dirname, "../posts");
const favs = [
  "/2017/the-analog-web/",
  "/2015/a-web-of-people/",
  "/2019/good-things/",
  "/2019/netlify-public-folder-part-i-what/",
  "/2022/a-web-for-all/",
  "/2016/redesigning-and-engineering-timshel-admin/",
  "/2019/thoughts-on-rich-harris-talk/",
  "/2019/designing-and-engineering-progressive-disclosure/",
  "/2019/how-to-create-a-macos-menu-bar-app-for-netlify/",
  "/2019/building-a-progressively-enhanced-site/",
  "/2017/creating-ios-icon-masks-in-the-browser/",
];

try {
  fs.mkdirSync(path.join(__dirname, "../.cache"), { recursive: true });
  fs.writeFileSync(
    path.join(__dirname, "../.cache/site.json"),
    JSON.stringify(await getSiteData(), null, 2)
  );
  fs.writeFileSync(
    path.join(__dirname, "../.cache/index.html"),
    "<!doctype html><h1>Hello WOrld</h1>"
  );
} catch (e) {
  console.error("Failed to cache site data", e);
  process.exit(1);
}

/**
 * Get global data available for the site.
 * @returns {import("../types").Site}
 */
async function getSiteData() {
  /** @type { import("../types").Site } */
  let site = {
    name: "Jim Nielsen’s Blog",
    origin: "https://blog.jim-nielsen.com",
    externalLinks: [],
    internalLinksByPath: {},
    posts: [],
    tags: [],
  };

  // Get the trending posts from Netlify & Hacker News.
  // We'll add info from these to our posts.
  const trendingPosts = await getTrendingPosts();
  const hackerNewsPosts = await getHackerNewsPosts();

  // All our post files
  const files = fs.readdirSync(POSTS_DIR).filter((file) => {
    if (!file.endsWith(".md")) {
      return false;
    }

    // An extra console to tell us if we've named a file wrong
    if (/[A-Z]/.test(file)) {
      console.warn("⚠️ You've got an uppercase slug ", file);
    }

    return true;
  });

  // Loop over each file and add it to our site data
  files.forEach((file) => {
    /** @type { import("../types").Post } */
    let post = {
      id: "",
      title: "",
      date: "",
      slug: "",
      path: "",
      permalink: "",
      tags: [],
      wordCount: 0,
      contents: "",
      isFav: false,
      // `pageviews` added dynamically where relevant
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
    const { html, externalLinks, internalLinks, footnotes } = parseMarkdown(
      markdownSansTagsAndTitle
    );
    post.wordCount = markdownSansTagsAndTitle.split(" ").length;
    post.contents = html;
    post.footnotes = footnotes ? footnotes : undefined;

    // "2019-06-12-my-post-slug.md" -> "2019-06-12-my-post-slug"
    const filename = file.replace(".md", "");
    const dateYYYYMMDD = filename.slice(0, 10);
    const year = dateYYYYMMDD.slice(0, 4);
    const slug = filename.slice(11);

    // Use the filename as the post id
    post.id = filename;

    // We need just the slug for old redirects
    post.slug = slug;
    post.path = `/${year}/${slug}/`;
    post.permalink = site.origin + post.path;
    if (favs.includes(post.path)) {
      post.isFav = true;
    }
    if (internalLinks.length) {
      site.internalLinksByPath[post.path] = internalLinks;
    }

    site.externalLinks.push(
      ...externalLinks.map((link) => ({
        sourceUrl: post.permalink,
        targetUrl: link,
      }))
    );

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

    const hackerNewsPost = hackerNewsPosts.find(({ url }) =>
      url.includes(post.path)
    );
    if (hackerNewsPost) {
      post.hackerNews = {
        url: `https://news.ycombinator.com/item?id=${hackerNewsPost.objectID}`,
        comments: hackerNewsPost.num_comments,
        points: hackerNewsPost.points,
      };
    }

    // Add it to our collection
    site.posts.push(post);
  });

  site.externalLinks = Object.entries(
    site.externalLinks.reduce((acc, { sourceUrl, targetUrl }) => {
      const hostname = new URL(targetUrl).hostname;
      const domain = psl.get(hostname);
      if (acc[domain]) {
        acc[domain].links.push({ sourceUrl, targetUrl });
        acc[domain].count += 1;
      } else {
        acc[domain] = {
          domain,
          count: 1,
          links: [{ sourceUrl, targetUrl }],
        };
      }
      return acc;
    }, {})
  )
    .map(([_, linkObj]) => linkObj)
    .sort((a, b) => {
      // Sort by count
      if (a.count < b.count) {
        return 1;
      }
      if (a.count > b.count) {
        return -1;
      }

      // Otherwise, alphabetically by domain name
      if (a.domain < b.domain) {
        return -1;
      }
      if (a.domain > b.domain) {
        return 1;
      }

      return 0;
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

  // By default, the collection of tags is sorted by occurence
  site.tags = Array.from(
    new Set(
      site.posts
        .filter((post) => post.tags)
        .map((post) => post.tags)
        .flat()
    )
  )
    .map((tag) => ({
      name: tag,
      count: site.posts.filter((post) => post.tags.includes(tag)).length,
    }))
    .sort((a, b) => (a.count < b.count ? 1 : a.count > b.count ? -1 : 0));

  site.internalLinksByPath = Object.entries(site.internalLinksByPath)
    .sort(([pathA, linksA], [pathB, linksB]) => {
      return linksA.length < linksB.length
        ? 1
        : linksA.length > linksB.length
        ? -1
        : 0;
    })
    .reduce((acc, [path, links]) => ({ ...acc, [path]: links }), {});

  return site;
}
