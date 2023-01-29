import fs from "fs";
import psl from "psl";

const files = fs
  .readdirSync("./posts")
  .filter(
    (file) =>
      file.endsWith(".md") &&
      file.includes("reading-notes") &&
      !file.includes("2021-03-25")
  )
  .reverse();

let jsonFeed = {
  version: "https://jsonfeed.org/version/1",
  title: "Jim Nielsen’s Blog Reading Notes",
  home_page_url: "https://blog.jim-nielsen.com/tags/readingsNotes",
  feed_url: "https://blog.jim-nielsen.com/feed.reading-notes.json",
  items: [],
};

if (!fs.existsSync("./links")) {
  fs.mkdirSync("./links");
}

let none = 0;
let f = [];

files.forEach((file) => {
  const contents = fs.readFileSync(`./posts/${file}`).toString();
  contents.split(/\n## /).forEach((section, i) => {
    if (section.startsWith("---") || section.startsWith("#")) {
      none += 1;
    } else {
      let id = file.slice(0, 10) + "T12:" + String(i).padStart(2, "0");
      const url = `https://notes.jim-nielsen.com/${id}/`;
      const content_text = "# " + section;
      let title = "";
      let external_url = "";

      // This is for trying to alter the raw content .md, which
      // we might do one day when we finally migrate
      try {
        const regex = /^.*: \[“(.*)”]\((.*)\)/g;
        const matches = regex.exec(section);
        title = matches[1];
        external_url = matches[2];

        //   const filename = file.slice(0, 10) + "T12:0" + i + ".md";
        //   // console.log(filename);
        //   // console.log(`  # [${title}](${url})`);

        //   // Catches stuff after main items, e.g.
        //   // ## Article: [...](...) this part here
        //   // const reg = /\)(.*)/g;
        //   // const match = reg.exec(section.split("\n")[0]);
        //   // if (match[1]) {
        //   //   console.log(match[1]);
        //   // }
      } catch (e) {
        // Lots here failing
        console.log(file.slice(0, 10), section.split("\n")[0]);
      }

      jsonFeed.items.push({
        id: `https://notes.jim-nielsen.com/2022-01-08T09-05`,
        content_text,
        date_published: new Date(id).toISOString(),
        title,
        url,
        external_url,
        // tags: ["type_article", "twitter", "rss"]
      });

      // fs.writeFileSync(
      //   `./links/${file.slice(0, 10)}T12-0${i}.md`,
      //   "# " + section
      // );
    }
  });
});

fs.writeFileSync(
  `./build/feed.reading-notes.json`,
  JSON.stringify(jsonFeed, null, 2)
);

console.log(
  "Reading notes: posts: %s, links: %s, none: %s",
  files.length,
  jsonFeed.items.length,
  none
);
