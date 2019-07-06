const React = require("react");
const { Page } = require("../server/Layout.jsx");

const HomePage = ({ site }) => {
  const postsByYear = site.posts.reduce((acc, post) => {
    const year = post.date.getFullYear();
    if (acc[year]) {
      acc[year].push(post);
    } else {
      acc[year] = [post];
    }
    return acc;
  }, {});

  return (
    <Page site={site} page={{ id: "home" }}>
      {Object.keys(postsByYear)
        .sort()
        .reverse()
        .map(year => (
          <React.Fragment>
            <h2 id={`y${year}`}>{year}</h2>
            <ul className="posts-list">
              {postsByYear[year].map(post => (
                <li>
                  <a href={post.pathname}>{post.title}</a>

                  <time datetime={post.date.toISOString().slice(0, 10)}>
                    post.date
                  </time>
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}
    </Page>
  );
};

module.exports = HomePage;
