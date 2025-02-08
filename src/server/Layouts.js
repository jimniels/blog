import { html, readFile } from "./utils.js";
import ThemePicker from "./ThemePicker.js";

/** @type {import("types").PageLayout} */
export async function Page(props, children) {
  const {
    site: { origin, tags, name },
    page: { head = "", path, title },
  } = props;

  return (
    `<!DOCTYPE html><!--!


👋
Want to read the code behind this code?
It's available on GitHub.
https://www.github.com/jimniels/blog/


-->
` +
    html`
      <html
        lang="en-us"
        id="top"
        data-theme-appearance="light"
        data-path="${path}"
      >
        <head>
          <title>${title && `${title} - `}${name}</title>

          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="author" content="Jim Nielsen" />
          <meta
            name="description"
            content="Writing about the big beautiful mess that is making things for the world wide web."
          />
          <link rel="me" href="https://github.com/jimniels" />
          <link rel="me" href="https://twitter.com/jimniels" />
          <link rel="me" href="https://mastodon.social/@jimniels" />
          <link rel="me" href="https://dribbble.com/jimniels" />
          <link rel="preconnect" href="https://cdn.jim-nielsen.com" />

          <script
            type="module"
            src="https://www.jim-nielsen.com/jim-navbar.js"
          ></script>

          <!-- Feeds -->
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS: XML Feed"
            href="/feed.xml"
          />
          <link
            rel="alternate"
            type="application/json"
            title="RSS: JSON Feed"
            href="/feed.json"
          />
          <link
            rel="alternate"
            type="application/mf2+html"
            title="RSS: HTML Feed"
            href="/feed.html"
          />

          <!-- Inline all our styles -->
          <style>
            ${[
              "./styles/modern-normalize.css",
              "./styles/styles.css",
              //"./styles/atom-one-light.css",
            ]
              .map(readFile)
              .join("")}
              :root,
              :root[data-theme-appearance="light"] {
                ${readFile("./styles/atom-one-light.css")}
              }

            :root[data-theme-appearance="dark"] {
              ${readFile("./styles/atom-one-dark.css")}
            }

            @media screen and (prefers-color-scheme: dark) {
              ${readFile("./styles/atom-one-dark.css")}
            }
          </style>

          <!-- Dynamic <head> content where applicable -->
          ${head}
        </head>
        <body class="l-container">
          <script>
            /** @type {'light' | 'dark' | 'system' | null} value */
            let appearance = localStorage.getItem("theme-appearance");
            if (appearance === null) {
              localStorage.setItem("theme-appearance", "system");
            } else if (appearance !== "system") {
              document.documentElement.setAttribute(
                "data-theme-appearance",
                appearance
              );
            }
          </script>
          <jim-navbar></jim-navbar>

          <nav class="nav l-top">
            <a href="/" ${path === "/" && "aria-current='page'"}>
              ${false &&
              path !== "/" &&
              html`<svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>`}
              Jim Nielsen's Blog
            </a>

            <a
              href="/menu/"
              class="l-menu"
              ${path === "/menu/" && "aria-current='page'"}
              >Menu</a
            >
          </nav>

          <main class="main l-left">
            ${children}
            <output id="js-search-root"></output>
          </main>
          ${Sidebar(props.site)}
        </body>
      </html>
    `
  );
}

/**
 * @param {import("types").Site} site
 * @returns {string}
 */
function Sidebar(site) {
  return html`
    <aside class="sidebar l-right">
      <form class="sidebar-search" id="js-search-form">
        <input
          type="search"
          placeholder="Search"
          id="search-input"
          autocomplete="off"
        />
        <div class="lds-dual-ring"></div>
      </form>
      <script defer src="/assets/pagefind.js"></script>
      <div class="sidebar-module">
        <h3>About</h3>
        <p>
          I'm <a href="https://www.jim-nielsen.com">Jim Nielsen</a>: a web
          designer & developer. This is my blog, where I refine my thinking.
        </p>
      </div>
      <div class="sidebar-module">
        <h3>Subscribe</h3>
        <ul>
          <li>
            <a href="/feed.xml">
              <span>RSS</span>
              <span>${readFile("./svgs/rss.svg")}</span>
            </a>
          </li>
          <li>
            <a href="/feed.json">
              <span>JSON</span>
              <span>${readFile("./svgs/json.svg")}</span>
            </a>
          </li>
          <!-- TODO: something about this? <li><a href="/feed.html">HTML feed</a></li> -->
          <li>
            <a href="https://buttondown.com/jimniels">
              <span>Email</span>
              <span>${readFile("./svgs/email.svg")}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="sidebar-module">
        <h3>Stats</h3>
        <ul>
          <li>
            <a href="/archive/">
              <span>Years</span>
              <span
                >${Number(new Date().toISOString().slice(0, 4)) -
                Number(site.posts[site.posts.length - 1].date.slice(0, 4)) +
                1}</span
              >
            </a>
          </li>
          <li>
            <a href="/archive/">
              <span>Words</span>
              <span
                >${site.posts
                  .reduce((acc, post) => acc + post.wordCount, 0)
                  .toLocaleString()}</span
              >
            </a>
          </li>
          <li>
            <a href="/archive/">
              <span>Posts</span>
              <span>${site.posts.length.toLocaleString()}</span>
            </a>
          </li>
          <li>
            <a href="/tags/">
              <span>Tags</span>
              <span>${site.tags.length}</span>
            </a>
          </li>
          <li>
            <a href="/about/external-links/">
              <span>Outlinks</span>
              <span>${site.externalLinks.length}</span>
            </a>
          </li>
          <li>
            <a href="/about/internal-links/">
              <span>Inlinks</span>
              <span>${Object.keys(site.internalLinksByPath).length}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="sidebar-module">
        <h3>Theme</h3>
        ${ThemePicker()}
      </div>
      <div class="sidebar-module">
        <h3>Social</h3>
        <ul>
          <li>
            <a href="https://mastodon.social/@jimniels">
              <span>Mastodon</span>
              <span>@jimniels</span>
            </a>
          </li>
          <li>
            <a href="https://bsky.app/profile/jim-nielsen.com/">
              <span>Bluesky</span>
              <span>@jim-nielsen.com</span>
            </a>
          </li>
          <li>
            <a href="mailto:jimniels@gmail.com">
              <span>Email</span>
              <span>jimniels@gmail</span>
            </a>
          </li>
          <li>
            <a href="https://jim-nielsen.com/linkedin/">
              <span>LinkedIn</span>
              <span>jim.nielsen</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  `;
}
