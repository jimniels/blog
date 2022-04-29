import fs from "fs";

const files = fs
  .readdirSync("./src/client/posts")
  .filter(
    (file) =>
      file.endsWith(".md") &&
      file.includes("reading-notes") &&
      !file.includes("2021-03-25")
  );

let posts = [];
let notes = 0;
let none = 0;
files.forEach((file) => {
  const contents = fs.readFileSync(`./src/client/posts/${file}`).toString();
  contents.split(/\n## /).forEach((section, i) => {
    if (section.startsWith("---") || section.startsWith("#")) {
      none += 1;
    } else {
      notes += 1;
      fs.writeFileSync(
        `./src/client/links/${file.slice(0, 10)}-${i}.md`,
        "# " + section
      );
    }
  });
});

console.log("Reading notes %s Notes %s None %s", posts.length, notes, none);
