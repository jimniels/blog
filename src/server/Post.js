import Layout from "./Layout.js";

// prettier-ignore
const Post = ({ site, page }) => `
  <article class="markdown markdown-with-prefixed-headings" id="js-post-content">
    <header>
      <time datetime="${page.date}">
        ${page.date /* format */}
      </time>
      <h1>
        <span>${page.title}</span>
      </h1>
    </header>

    ${page.content}
    
    ${page.tags 
      ? `<footer class="max-width-wrapper" style="margin-top: calc(1.618rem * 2)">
          Tagged in: 
          ${page.tags.map(tag => `
            <a href="${site.baseurl}/tags/#${tag}}" class="tag">
              #${tag}
            </a>
          `).join(",&nbsp;")}
        </footer>`
      : ""}
  </article>
`;

export default Layout(Post);
