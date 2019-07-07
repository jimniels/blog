import Layout from "../server/Layout.js";

const Index = ({ site }) => {
  const postsByYear = site.posts.reduce((acc, post) => {
    const year = post.date.getFullYear();
    if (acc[year]) {
      acc[year].push(post);
    } else {
      acc[year] = [post];
    }
    return acc;
  }, {});

  return Object.keys(postsByYear).map(
    year => `
      <h2 id="y${year}">
        ${year}
      </h2>
      <ul class="posts-list">
        ${postsByYear[year].map(
          post => `
          <li>
            <a href="${site.baseurl}${post.url}">
              ${post.title}
            </a>
            <time datetime="${post.date.toISOString().slice(0, 10)}">
              ${post.date}
            </time>
          </li>
        `
        )}
      </ul>
    `
  );
};

export default Layout(Index, {
  id: "home"
});
