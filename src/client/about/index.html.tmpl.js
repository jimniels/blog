import { PageCustom } from "../../server/Layouts.js";
import { html } from "../../server/utils.js";

const page = {
  title: "About",
  permalink: "/about/",
};

export default function About(site) {
  const domains = Object.keys(site.linksByDomain).sort((domainA, domainB) => {
    // First sort by number of links under that domain
    const aCount = site.linksByDomain[domainA].length;
    const bCount = site.linksByDomain[domainB].length;
    if (aCount < bCount) {
      return 1;
    }
    if (aCount > bCount) {
      return -1;
    }

    // if counts match, sort alphabetically by domain
    if (domainA < domainB) {
      return -1;
    }
    if (domainA > domainB) {
      return 1;
    }
    return 0;
  });

  const domainsOfMoreThanOne = domains.filter(
    (domain) => site.linksByDomain[domain].length > 1
  );
  const domainsOfOnlyOne = domains.filter(
    (domain) => site.linksByDomain[domain].length === 1
  );

  return PageCustom(
    { site, page },
    // prettier-ignorez
    html` <div class="copy">
        <h1>About</h1>

        <p>Hello, I’m <a href="https://www.jim-nielsen.com">Jim Nielsen</a>.</p>

        <p>
          In the past, I put off writing because I was unable to do my best—“if
          you can’t do something right, don’t do it at all”.
        </p>
        <p>
          But lately I’ve found myself regretting not writing down at least
          <em>something</em>.
        </p>

        <p>
          So my current posture towards blogging is: something is better than
          nothing.
        </p>

        <p>
          <img
            src="https://cdn.jim-nielsen.com/shared/jim-nielsen-portrait.jpg"
            width="300"
            height="300"
            alt="Portrait of Jim Nielsen"
          />
        </p>

        <h2>Blog Links</h2>

        <p>
          I thought it would be interesting to
          <a href="/2020/indexing-my-blogs-links/"
            >index all the links on my blog</a
          >
          and keep it as a running list.
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
                <span class="count">${site.linksByDomain[domain].length}</span>
              </summary>
              <ol>
                ${site.linksByDomain[domain].map(
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
                  <a href="${site.linksByDomain[d][0]}"
                    >${site.linksByDomain[d][0]}</a
                  >
                </li>
              `
            )}
          </ol>
        </details>
      </div>
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
      </style>`
  );
}
