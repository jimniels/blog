import hljs from "highlight.js";
import { marked } from "marked";
import psl from "psl";

let linksByDomain = {};

// Footnotes
//
// Rules of footnotes for my custom implementation:
//   A paragraph of text[^1] with a footnote[^2].
//
//   [^1]: This is my footnote _with_ markdown.
//   [^2]: No extra line between footnotes at bottom. Must be 1 paragraph.
//
// Initially borrowed from: https://github.com/markedjs/marked/issues/1562#issuecomment-643171344
const footnoteMatch = /^\[\^([^\]]+)\]: ([\s\S]*)$/;
const referenceMatch = /\[\^([^\]]+)\](?!\()/g;
const referencePrefix = "fnref";
const footnotePrefix = "fn";

// Old posts use markdown for images `![]()` which nests them as <p><img></p>
// in the output. Some of the newer posts just manually specify the `<img>`
// on a new line. These don’t get parsed into images wrapped in <p>s, which is
// what I need for a client-side script (and is semantically more correct
// I suppose). So that’s what this is doing here.
const renderer = {
  // Footnotes
  paragraph(text) {
    if (text.match(footnoteMatch)) {
      return (
        "<hr><ol class='footnotes'>" +
        // The no extra line between footnotes allows us to match this paragraph
        // as a footnote but with all the footnotes in it.
        // [^1]: ...
        // [^2]: ...
        // We then split them by line (NO NEW LINES IN FOOTNOTES OR YOU BREAK THIS)
        text
          .split("\n")
          .map((paragraph) =>
            paragraph.replace(
              footnoteMatch,
              /*
              _: "[^1]: ..."
              ref: "1"
              text: "..."
            */
              (_, ref, text) =>
                `<li id="${footnotePrefix}:${ref}">${text} <a href="#${referencePrefix}:${ref}" title="Jump back to footnote ${ref} in the text.">↩</a></li>`
            )
          )
          .join("") +
        "</ol>"
      );
    }
    return false;
  },
  text(text) {
    // Skip doing anything if it's the paragraph of footnotes
    if (text.split("\n").some((line) => line.match(footnoteMatch))) {
      return false;
    }
    if (text.match(referenceMatch)) {
      // A paragraph of text that somewhere has[^1] a footnote in it.
      return text.replace(
        referenceMatch,
        // _: A paragraph of text...
        // ref: 1
        (_, ref) =>
          `<sup id="${referencePrefix}:${ref}"><a href="#${footnotePrefix}:${ref}">[${ref}]</a></sup>`
      );
    }
    return false;
  },

  // Images
  html(html) {
    if (html.startsWith("<img")) {
      return `<p>${html}</p>`;
    }
    return html;
  },

  // Links by domain
  link(href, title, text) {
    let hostname;

    if (href.startsWith(".") || href.startsWith("/") || href.startsWith("#")) {
      hostname = "blog.jim-nielsen.com";
    } else {
      hostname = new URL(href).hostname;
    }

    let domain = psl.get(hostname);

    if (linksByDomain[domain]) {
      linksByDomain[domain].push(href);
    } else {
      linksByDomain[domain] = [href];
    }

    return `<a href="${href}" ${title ? `title="${title}"` : ""}>${text}</a>`;
  },
};

marked.use({
  renderer,
  highlight: (code, language) => {
    // https://github.com/markedjs/marked/blob/master/docs/USING_ADVANCED.md
    return hljs.highlight(code, {
      language: hljs.getLanguage(language) ? language : "plaintext",
    }).value;
  },
  gfm: true,
  smartLists: true,
  langPrefix: "language language-",
  // FYI: if you want, you could disable autolinks in MD
  // https://github.com/markedjs/marked/issues/882
});

/**
 * Take a string of markdown and return the parsed HTML with an object
 * denoting the links in that markdown
 * @param {string} markdown
 * @returns {{ html: string, linksByDomain: LinksByDomain }}
 */
export default function parseMarkdown(markdown) {
  // Reset the global each time you run this
  linksByDomain = {};

  const html = marked(markdown);

  return { html, linksByDomain };
}
