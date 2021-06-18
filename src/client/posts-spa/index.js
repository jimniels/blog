import { React, ReactDOM, html } from "./deps.js";

const Article = ({ id }) => {
  const [articleHtml, setArticleHtml] = React.useState(undefined);

  React.useEffect(() => {
    fetch(id)
      .then((res) => res.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const article = doc.querySelector("article");

        setArticleHtml(article.outerHTML);
      });
  });

  return html`<div dangerouslySetInnerHTML=${{ __html: articleHtml }}></div>`;
};

const App = (props) => {
  const [filterId, setFilterId] = React.useState("all");
  const [articleId, setArticleId] = React.useState(undefined);
  const [search, setSearch] = React.useState(undefined);

  const nav = [
    { title: "All", id: "all", icon: "archive", count: window.DATA.length },
    { title: "Personal Favorites", id: "favorites", icon: "star", count: 0 },
    { title: "Popular", id: "popular", icon: "trending-up", count: 0 },
    ...window.TAGZ.sort((a, b) => b.count - a.count).map(({ name, count }) => ({
      title: name,
      id: "tag-" + name,
      count,
      icon: "tag",
    })),
  ];

  React.useEffect(() => {
    if (articleId) {
      var newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        `?postUrl=${articleId}`;
      window.history.pushState({ path: newurl }, "", newurl);
    }
  });

  const posts = window.DATA.filter((post) =>
    filterId.includes("tag-")
      ? post.tags && post.tags.includes(filterId.replace("tag-", ""))
      : true
  ).filter((post) =>
    search
      ? post.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
      : true
  );

  return html`
    <div class="pane-1">
      <h1>Filters</h1>
      <ul class="filter-list">
        ${nav.map(
          (item, i) => html` <li
            key="${i}"
            class="${filterId === item.id ? "active" : ""}"
          >
            <a
              href="#"
              id=${item.id}
              onClick=${(e) => {
                setArticleId("");
                setFilterId(e.currentTarget.id);
              }}
            >
              <svg class="icon">
                <use xlinkHref="#${item.icon}"></use>
              </svg>
              <span class="title">${item.title}</span>
              <span class="count">${item.count}</span>
            </a>
          </li>`
        )}
      </ul>
    </div>
    <div class="pane-2">
      <h1>Posts</h1>
      <div style=${{ marginTop: "8px", marginRight: "16px" }}>
        <input
          type="text"
          placeholder="Search..."
          value=${search}
          onChange=${(e) => setSearch(e.target.value)}
          style=${{
            width: "100%",
            padding: "8px",
            border: "none",
            background: "rgba(0,0,0,.1)",
            borderRadius: "8px",
          }}
        />
      </div>
      <ul class="post-list">
        ${posts.map(
          (post) => html`<li
            key="${post.permalink}"
            class="${post.permalink === articleId ? "active" : ""}"
          >
            <a
              href="#"
              id="${post.permalink}"
              onClick=${(e) => {
                console.log("set active article id:", e.currentTarget.id);
                setArticleId(
                  e.currentTarget.id === articleId ? "" : e.currentTarget.id
                );
              }}
            >
              ${post.title} <time>${post.date.slice(0, 10)}</time>
            </a>
          </li>`
        )}
      </ul>
    </div>
    <div class="pane-3">
      ${articleId
        ? html`<${Article} id="${articleId}" key="${articleId}" />`
        : "No ative article"}
    </div>
  `;
};

ReactDOM.render(html`<${App} foo=${"bar"} />`, document.getElementById("root"));
