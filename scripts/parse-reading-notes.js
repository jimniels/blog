import fs from "fs";

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
  items: [],
};

let none = 0;

const reg = /^(.+?): .*(?:“|\*)?\[“?(.+?)”?](?:“|\*)?.?\((.+?)\)\*?(.*)/;

files.forEach((file) => {
  const contents = fs.readFileSync(`./posts/${file}`).toString();

  contents.split(/\n## /).forEach((section, i) => {
    if (section.startsWith("---") || section.startsWith("#")) {
      none += 1;
    } else {
      let id = file.slice(0, 10) + "T12-" + String(31 - i); // String(i).padStart(2, "0");
      const [firstLine, ...contents] = section.split("\n");

      try {
        const matches = firstLine.match(reg);
        const [_, type, title, external_url, rest = ""] = matches;
        const tag = `#_${type.toLowerCase()}`;
        // prettier-ignore
        const content_text = `${tag}\n\n# [${title}${rest}](${external_url})\n${contents.join("\n")}`

        jsonFeed.items.push({ id, content_text });
      } catch (e) {
        console.log("ERROR", firstLine);
      }
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



  Strings to test the regex against:


Article: [“Creating a Thriving Developer Culture”](http://blog.arc90.com/2012/11/19/creating-a-thriving-developer-culture/)
Article: [“Creating a Thriving Developer Culture”](http://blog.arc90.com/2012/11/19/creating-a-thriving-developer-culture/) by Nicholas Carr on the blog
Book: [The Complete Far Side Vol 1](http://www.amazon.com/gp/product/1449460046/)
Article: “[Some Lessons I Learned in 2013](https://www.frankchimero.com/archive/2014/2013-lessons/)” by Frank Chimero
Book: *[A Designer's Art](http://www.amazon.com/Paul-Rand-A-Designer%60s-Art/dp/0300082827)* by Paul Rand
Article: Nicholas Carr’s [These are not the robots we were promised](https://mobile.nytimes.com/2017/09/09/opinion/sunday/household-robots-alexa-homepod.html) via nytimes.com
Article: [“UHX”](https://manuelmoreale.com/thoughts/uhx)
Article: [“Re: AI for content creation”](https://hidde.blog/re-ai-content/)
Website: [Ephemeralist](https://ephemeralist-ixz4p7lmaq-ue.a.run.app) by Paul Ford
## Video: [“The web we left behind”](https://www.youtube.com/watch?v=rvoZKQn2Go8) by Kyle Jacobson (ESNEXT 2020)


*/
