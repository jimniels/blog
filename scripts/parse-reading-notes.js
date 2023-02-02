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

// if (!fs.existsSync("./links")) {
//   fs.mkdirSync("./links");
// }

let none = 0;

const reg = /^(.+?): .*(?:“|\*)?\[“?(.+?)”?](?:“|\*)?.?\((.+?)\)\*?(.*)/;

files.forEach((file) => {
  const contents = fs.readFileSync(`./posts/${file}`).toString();

  contents.split(/\n## /).forEach((section, i) => {
    if (section.startsWith("---") || section.startsWith("#")) {
      none += 1;
    } else {
      let id = file.slice(0, 10) + "T12:" + String(i).padStart(2, "0");
      const url = `https://notes.jim-nielsen.com/${id}/`;
      const [firstLine, ...contents] = section.split("\n");

      try {
        const matches = firstLine.match(reg);
        const [_, type, title, external_url, rest = ""] = matches;

        jsonFeed.items.push({
          id: url,
          content_text: `# [${title}](${external_url})${rest}\n${contents.join(
            "\n"
          )}`,
          date_published: new Date(id).toISOString(),
          title,
          url,
          external_url,
          tags: [`n_${type.toLowerCase()}`],
        });
      } catch (e) {
        console.log("ERROR", firstLine);
      }

      // filecontent should be:
      //    #n_${type}
      //
      //    # [${title}]${rest}
      //
      //    content...

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

/*



  'Article',
  'Reddit',
  'Video',
  'Tweet',
  'Speech',
  'Podcast',
  'Talk',
  'Quote',
  ' Website',
  'Website',
  'eBook',
  'Tool',
  'Song',
  'eCourse',
  'Book',


*/
