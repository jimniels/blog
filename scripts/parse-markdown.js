import hljs from "highlight.js";
import { marked } from "marked";
import psl from "psl";

/**
 * @typedef {Array<string>} ExternalLinks - Fully qualified external URLs, i.e. https://twitter.com/...
 * @type {ExternalLinks}
 */
let externalLinks = [];
/**
 * @typedef {Array<string>} InternalLinks - Absolute paths for internal links, i.e. /2019/blog-post
 * @type {InternalLinks}
 */
let internalLinks = [];
/**
 * @typedef {string} Footnotes - An <ol> of footnotes
 * @type {string}
 */
let footnotes = "";

/**
 * Take a string of markdown and return the parsed HTML with an object
 * denoting the links in that markdown
 * @param {string} markdown
 * @returns {{
 *   html: string,
 *   externalLinks: ExternalLinks,
 *   internalLinks: InternalLinks,
 *   footnotes: Footnotes
 * }}
 */
export default function parseMarkdown(markdown) {
  // Reset the global each time you run this
  internalLinks = [];
  externalLinks = [];
  footnotes = "";

  const html = marked(markdown);

  return { html, externalLinks, internalLinks, footnotes };
}

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
      footnotes =
        "<ol class='footnotes'>" +
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
                `<li id="${footnotePrefix}:${ref}">${text} <a href="#${referencePrefix}:${ref}" title="Jump back to footnote ${ref} in the text.">⏎</a></li>`
            )
          )
          .join("") +
        "</ol>";
      return "";
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
      return `<p class="image-container">${html}</p>`;
    }
    return html;
  },

  // Purely to get links by domain
  link(href, title, text) {
    // Make sure we're only including links to other blog posts,
    // not internal links "/" or "/tags/"
    const isInternalBlogPostLink = (str) => {
      return /\/\d{4}\/*/.test(str);
    };

    // Relative links "." or anchor links "#" shouldn’t exist for us, so we'll
    // log in case I do that — yell at myself.
    if (href.startsWith(".") || href.startsWith("#")) {
      console.log(
        "Warning: you have a link that starts with `.` or `#`: ",
        href
      );
      // Otherwise, check for self-referential links
    } else if (href.startsWith("/")) {
      if (isInternalBlogPostLink(href)) {
        let hrefNormalized = href;
        if (hrefNormalized.substr(-1) != "/") {
          console.log(
            "Warning: there's no traililng slash on an internal link to `%s`",
            href
          );
          hrefNormalized += "/";
        }
        internalLinks.push(hrefNormalized);
      }
    } else if (href.includes("blog.jim-nielsen.com")) {
      if (isInternalBlogPostLink(href)) {
        const { pathname } = new URL(href);
        internalLinks.push(pathname);
      }
    } else if (href.includes("jim-nielsen.com") || href.includes("mailto:")) {
      // Do nothing
      // Otherwise we're dealing with outbound links
    } else {
      externalLinks.push(href);
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
