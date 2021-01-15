import { PageCustom } from "../../server/Layouts.js";
import { html, toDateUIMin } from "../../server/utils.js";

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
    html` <div class="markdown">
        <h1>About Me and This Blog</h1>

        <p>Hello, I’m <a href="https://www.jim-nielsen.com">Jim Nielsen</a>.</p>

        <p>
          Let me tell you a bit about my approach to blogging at the moment. In
          the past, I frequently put off writing blog posts because I found
          myself unable to put forth my best effort in writing—that attitude of
          “if you can’t do something right, don’t do it at all”—but lately I’ve
          found myself regretting not writing at least <em>something</em>.
        </p>

        <p>
          This is the lens through which I’ve come to view my blog posts these
          days, like a lax journal.
        </p>

        <p>
          I have all these ambitions to write but then I don’t. Now I’ve arrived
          at this point of thinking “well something is better than nothing”. So,
          many of the posts on my blog are me just trying to write something
          down before I forget it all. I’ve found I enjoy the nostalgia of going
          back after a year and being like “oh yeah, that thing”. Like a
          nostalgic photograph.
        </p>

        <p>
          On this blog, I sometimes don’t take the effort I should to craft what
          I’m writing so by the end of the post I feel like “well I’ll just
          publish it and maybe come back and do more proof reads” but at that
          point I know I’m just lying to myself by saying that.
        </p>

        <p>
          But hey, like I said, these days I’m aiming for my some of my posts to
          merely be like a bad journal entry.
        </p>

        <p>
          Note: the thoughts and opinions herein are my own. Although a few of
          my writings are original, mostly I feel responsible for the ways in
          which I misunderstand and mangle the ideas of other people far smarter
          than I.
        </p>

        <p>— Jim (version of myself on April 16, 2018)</p>

        <p>
          <img
            src="https://cdn.jim-nielsen.com/shared/jim-nielsen-portrait.jpg"
            width="300"
            height="300"
            alt="Portrait of Jim Nielsen"
          />
        </p>

        <h1>Links in This Blog</h1>

        <p>
          I thought it would be interesting to
          <a href="https://blog.jim-nielsen.com/2020/indexing-my-blogs-links/"
            >index all the links on my blog</a
          >
          and keep it as a running list.
        </p>

        ${domainsOfMoreThanOne.map(
          (domain) => html`
            <details>
              <summary>
                ${domain}
                <span style="float: right"
                  >${site.linksByDomain[domain].length}</span
                >
              </summary>
              <ul>
                ${site.linksByDomain[domain].map(
                  (link) => html` <li><a href="${link}">${link}</a></li> `
                )}
              </ul>
            </details>
          `
        )}

        <details>
          <summary>...all others with only one occurence</summary>
          <ul>
            ${domainsOfOnlyOne.map(
              (d) => html`
                <li>
                  <a href="${site.linksByDomain[d][0]}"
                    >${site.linksByDomain[d][0]}</a
                  >
                </li>
              `
            )}
          </ul>
        </details>
      </div>
      <style>
        .markdown details {
          margin-bottom: 0;
        }
        details summary {
          background: var(--color-bg-sidebar);
          padding: 2px 10px;
          margin-bottom: 2px;
          border-radius: var(--border-radius);
          overflow-wrap: break-word;
          word-wrap: break-word;
          -ms-word-break: break-all;
        }
        details summary:hover {
          background: var(--color-border);
        }
        details ul {
          font-size: 14px;
        }
      </style>`
  );
}
