import { Page } from "../../../server/Layouts.js";
import { html } from "../../../server/utils.js";

const page = {
  title: "External Links",
  path: "/about/external-links/",
  head: html`
    <style>
      .copy {
        margin-bottom: 4rem;
      }

      details {
        font-size: 0.8181rem;
      }
      details summary {
        background: var(--c-bg);
        padding: 4px 10px;
        overflow-wrap: break-word;
        word-wrap: break-word;
        -ms-word-break: break-all;
        position: sticky;
        top: 0;
        z-index: 1;
        border-bottom: 1px solid var(--c-fg);
      }
      details summary:hover {
        background: var(--c-fg);
        cursor: default;
      }
      details[open] summary {
        border-bottom: none;
        background: var(--c-fg);
      }
      summary img {
        position: relative;
        top: 2px;
        margin-right: 6px;
      }
      summary .count {
        float: right;
        opacity: 0.5;
      }

      details li {
        position: relative;
      }
      details li a[href*="blog.jim-nielsen.com"] {
        color: var(--c-text-light);

        float: right;
        max-width: 20%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: absolute;
        right: 0;
        top: 0;

        &:hover {
          color: var(--c-theme);
        }
      }
      details li a:not([href*="blog.jim-nielsen.com"]) {
        width: 78%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 80%;
        display: block;
      }
    </style>
  `,
};

/** @type {import("types").Route} */
export default function About(site) {
  /**
   * @param {string} str
   * @returns {string}
   */
  const format = (str) => {
    const url = new URL(str);
    return url.pathname;
  };

  return Page(
    { site, page },
    html`<main class="copy">
      <h1>${page.title}</h1>

      <p>
        I thought it would be interesting to
        <a href="/2020/indexing-my-blogs-links/"
          >index all the external links on my blog</a
        >
        and keep it as a running list.
      </p>

      <p>
        This is available as raw data at
        <a href="/.well-known/links"><code>/.well-known/links</code></a
        >. You can also read my post about the
        <a href="/2022/well-known-links-resource/"
          >the idea of public, raw link data</a
        >.
      </p>

      ${site.externalLinks
        .filter(({ count }) => count > 1)
        .map(
          ({ domain, count, links }, i) => html`
            <details>
              <summary>
                <img
                  src="https://www.google.com/s2/favicons?domain=${domain}&sz=32"
                  width="16"
                  height="16"
                  alt="Favicon for ${domain}"
                  loading="lazy"
                />
                <span class="domain">${domain}</span>
                <span class="count">${count}</span>
              </summary>
              <ol>
                ${links.map(
                  ({ targetUrl, sourceUrl }, i) =>
                    html`<li>
                      <a href="${targetUrl}">${domain}${format(targetUrl)}</a>
                      <a href="${sourceUrl}">${format(sourceUrl)}</a>
                      <ul hidden>
                        <li>
                          <a href="${sourceUrl}">${format(sourceUrl)}</a>
                        </li>
                      </ul>
                    </li> `
                )}
              </ol>
            </details>
          `
        )}
    </main>`
  );
}
