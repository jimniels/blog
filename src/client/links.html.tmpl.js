import { PageCustom } from "../server/Layouts.js";
import { html, toDateUI } from "../server/utils.js";

const page = {
  title: "Links",
  permalink: "/links/",
};

export default function Index(site) {
  return PageCustom(
    { site, page },
    html`
      <h1>Links</h1>

      <div class="copy">
        ${site.links.map(
          (link) => html`
            <article>
              <header>
                <span><a href="${link.href}">${link.domain}</a></span>
                <h1>${link.title} <a href="${link.permalink}">#</a></h1>
                <time>${link.date.toISOString().slice(0, 10)}</time>
              </header>
              ${link.contents}
              ${link.tags.length
                ? html`
                    <footer>
                      Tagged:
                      ${link.tags.map(
                        (tag) => html`<a href="/tags/#${tag}">#${tag}</a>`
                      )}
                    </footer>
                  `
                : ""}
            </article>
            <hr />
          `
        )}
      </div>
    `
  );
}
