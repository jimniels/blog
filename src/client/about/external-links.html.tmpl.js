import { Page } from "../../server/Layouts.js";
import { html } from "../../server/utils.js";

const page = {
  title: "External Links",
  path: "/about/links/",
};

/**
 * @param {import("../../../types").Site} site
 * @returns {string}
 */
export default function About(site) {
  const format = (str) => {
    // return str.replace(/https?:\/\/(www.)?/, "");
    const url = new URL(str);
    return url.pathname;
  };

  const allOthers = site.externalLinks.filter(({ count }) => count === 1);

  return Page(
    { site, page },
    html` <main class="copy">
      <h1>External Links From My Blog</h1>

      <p>
        I thought it would be interesting to
        <a href="/2020/indexing-my-blogs-links/"
          >index all the external links on my blog</a
        >
        and keep it as a running list (<a href="/about#stats"
          >see my other stats</a
        >).
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
              <table>
                <thead>
                  <th></th>
                  <th>blog.jim-nielsen.com</th>
                  <th></th>
                  <th>${domain}</th>
                </thead>
                <tbody>
                  ${links.map(
                    ({ targetUrl, sourceUrl }, i) =>
                      html`<tr>
                        <td>${i + 1}.</td>
                        <td><a href="${sourceUrl}">${format(sourceUrl)}</a></td>
                        <td style="opacity: .25">→</td>
                        <td><a href="${targetUrl}">${format(targetUrl)}</a></td>
                      </tr>`
                  )}
                </tbody>
              </table>
            </details>
          `
        )}

      <details>
        <summary>...others with only one occurence</summary>
        <table>
          <thead>
            <th></th>
            <th>blog.jim-nielsen.com</th>
            <th>Target</th>
          </thead>
          <tbody>
            ${allOthers.map(
              ({ links }, i) => html`<tr>
                <td>${i + 1}.</td>
                <td>
                  <a href="${links[0].sourceUrl}"
                    >${format(links[0].sourceUrl)}</a
                  >
                </td>
                <td>
                  <a href="${links[0].targetUrl}"
                    >${links[0].targetUrl.replace(/https?:\/\/(www.)?/, "")}</a
                  >
                </td>
              </tr>`
            )}
          </tbody>
        </table>
      </details>

      <style>
        .copy {
          margin-bottom: 4rem;
        }

        details summary {
          font-size: 0.8181rem;
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
        }
        details[open] summary {
          border-bottom: none;
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

        details table {
          font-size: 0.6363rem;
        }

        table tbody td:first-child {
          text-align: right;
        }
      </style>
    </main>`
  );
}
