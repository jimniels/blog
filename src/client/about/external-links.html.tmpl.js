import { Page } from "../../server/Layouts.js";
import { html } from "../../server/utils.js";

const page = {
  title: "External Links",
  path: "/about/links/",
};

export default function About(site) {
  const domains = Object.keys(site.externalLinksByDomain);

  const domainsOfMoreThanOne = domains.filter(
    (domain) => site.externalLinksByDomain[domain].length > 1
  );
  const domainsOfOnlyOne = domains.filter(
    (domain) => site.externalLinksByDomain[domain].length === 1
  );

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

      ${domainsOfMoreThanOne.map(
        (domain) => html`
          <details>
            <summary>
              <img
                src="https://www.google.com/s2/favicons?domain=${domain}&sz=32"
                width="16"
                height="16"
                alt="Favicon for ${domain}"
              />
              <span class="domain">${domain}</span>
              <span class="count"
                >${site.externalLinksByDomain[domain].length}</span
              >
            </summary>
            <ol>
              ${site.externalLinksByDomain[domain].map(
                (link) => html` <li><a href="${link}">${link}</a></li> `
              )}
            </ol>
          </details>
        `
      )}

      <details>
        <summary>...all others with only one occurence</summary>
        <ol>
          ${domainsOfOnlyOne.map(
            (d) => html`
              <li>
                <a href="${site.externalLinksByDomain[d][0]}"
                  >${site.externalLinksByDomain[d][0]}</a
                >
              </li>
            `
          )}
        </ol>
      </details>

      <style>
        details {
          border: 1px solid transparent;
          border-radius: calc(var(--border-radius) + 1px);
        }
        details[open] {
          border-color: var(--c-fg);
        }
        details[open] summary {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
        details summary {
          font-size: 0.8181rem;
          background: var(--c-fg);
          padding: 2px 10px;
          border-radius: var(--border-radius);
          overflow-wrap: break-word;
          word-wrap: break-word;
          -ms-word-break: break-all;
        }
        details ol {
          font-size: 0.6363rem;
        }
        details ol a {
          overflow-wrap: break-word;
          word-wrap: break-word;
          -ms-word-break: break-all;
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
        summary .domain {
        }
      </style>
    </main>`
  );
}
