const fs = require("fs");
const path = require("path");
const { jim } = require("../src/server/utils.js");
const jsx = jim;
const context = {
  escapeXml: escapeXml
};

function include(filepath, props) {
  const template = fs.readFileSync(path.join(__dirname, filepath));
  return render(template, props, include, ...Object.values(context));
}

function render(template, props) {
  const x = new Function(
    "template",
    "props",
    "include",
    ...Object.keys(context), // ...helpers // "jsx",
    `const output = \`${template}\`; return output;`
  );
  return x(template, props, include, ...Object.values(context));
}

let out = "";
try {
  let site = {
    title: "Jim Nielsen’s Blog",
    posts: [
      {
        title: "June 2019",
        date: new Date("2019-06-01"),
        tags: ["engineering"]
      },
      {
        title: "May 2019",
        date: new Date("2019-05-01"),
        tags: ["design", "engineering"]
      },
      { title: "Apr 2018", date: new Date("2018-04-01"), tags: ["quality"] }
    ]
  };
  let page = {
    title: "Creating iOS Icon Masks in the Browser",
    content:
      "Something here that is the content of the page and it would be embedded HTML."
  };

  // render the file in place first
  let out = render(fs.readFileSync(path.join(__dirname, "index.html")), {
    site,
    page
  });

  // then the layout, if applicable
  // if it has a layout, import render(Layout) with file inside
  // out = render(fs.readFileSync(path.join(__dirname, "./layouts/Layout.html")), {
  //   site,
  //   page: { ...page, content: out }
  // });

  // then set it's contents
  console.log(out);
} catch (e) {
  console.error(
    "Error: could not render tagged template literal because of the following"
  );
  console.log(e);
}

function escapeXml(unsafe = "") {
  return unsafe.replace(/[<>&'"]/g, function(c) {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
    }
  });
}
