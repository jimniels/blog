const React = require("react");
const Page = require("../../server/templates/Page.jsx");
const { withContext } = require("../../server/templates/Context.jsx");
const { toDateForHumans, toDateForComputers } = require("../../server/utils/date.js");

function Tags({ context: { site } }) {
  const postsByTag = site.posts.reduce((acc, post) => {
    if (post.tags) {
      post.tags.forEach(tag => {
        if (acc[tag]) {
          acc[tag].push(post);
        } else {
          acc[tag] = [post];
        }
      })
    }
    return acc;

  }, {});

  const tagsSorted = Object.keys(postsByTag).sort();

  return (
    <Page title="Tags">
      <h1>All Tags Index</h1>
      <ul>
        {tagsSorted.map(tag =>
          <li key={tag}><a href={`#${tag}`}>#{tag}</a> ({postsByTag[tag].length})</li>
        )}
      </ul>

      {tagsSorted.map(tag =>
        <React.Fragment key={tag}>
          <h2 id={tag} style={{ marginBottom: "1rem" }}>
            #{tag}{" "}
            <span style={{ fontWeight: "normal" }}>
              ({postsByTag[tag].length})
            </span>
          </h2>

          <ul className="posts-list">
            {postsByTag[tag].map(post =>
              <li className="post-wrapper" key={post.permalink}>
                <a href={post.permalink}>
                  {post.title}
                </a>
                <time dateTime={toDateForComputers(post.date)} className="date post-date">
                  {toDateForHumans(post.date)}
                </time>
              </li>
            )}
          </ul>
        </React.Fragment>)}
    </Page>
  );
}

module.exports = withContext(Tags);
