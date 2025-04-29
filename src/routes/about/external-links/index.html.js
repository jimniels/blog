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

      .archive-chart {
        display: flex;
        flex-direction: column;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: var(--s-2);
      }

      .archive-chart li {
        position: relative;
      }

      .archive-chart li div {
        display: flex;
        gap: var(--s-8);
        align-items: center;
        padding: var(--s-6) var(--s-6);
        position: relative;
        z-index: 2;
        text-decoration: none;
        font-size: 0.875rem;
      }
      .archive-chart li div span:last-child {
        color: var(--c-text-light);
        font-size: 0.77777rem;
      }

      .archive-chart-bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: var(--c-fg);
        pointer-events: none;
        z-index: 1;
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

      <ol class="archive-chart">
        ${site.externalLinks
          .filter((item) => item.count > 2)
          .map(
            ({ domain, count, links }, i) => html`
              <li>
                <div>
                  <img
                    src="https://www.google.com/s2/favicons?domain=${domain}&sz=32"
                    width="16"
                    height="16"
                    alt="Favicon for ${domain}"
                    loading="lazy"
                  />
                  <span class="domain">${domain}</span>
                  <span class="count" style="margin-left: auto;">${count}</span>
                </div>
                <span
                  class="archive-chart-bar"
                  style="width: ${(count / site.externalLinks[0].count) * 100}%"
                ></span>
              </li>
            `
          )}
      </ol>
    </main>`
  );
}
