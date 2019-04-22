const React = require("react");
const { arrayOf, instanceOf, object, shape, string } = require("prop-types");
const Page = require("./Page.jsx");
const { withContext } = require("./Context.jsx");
const { toDateForHumans, toDateForComputers } = require("../utils/date.js");
// @TODO markdown parser here

Post.propTypes = {
  site: object,
  post: shape({
    markdown: string.isRequired, // markdown string
    title: string.isRequired,
    tags: arrayOf(string),
    date: instanceOf(Date)
  })
};

function Post({
  context: { site, path },
  post: { title, markdown, tags, permalink, date } }) {

  // @TODO rename path to permalink

  return (
    <Page title={title} path={permalink}>
      <article id="js-post-content">
        <header>
          <time dateTime={toDateForComputers(date)}>
            {toDateForHumans(date)}
          </time>
          <h1>
            <span>{title}</span>
          </h1>
        </header>

        <div className="markdown" dangerouslySetInnerHTML={{ __html: markdown }} />

        {tags &&
          <footer className="max-width-wrapper" style={{ marginTop: "calc(1.618rem * 2)" }}>
            Tagged in:{" "}
            {tags.map((tag, i) =>
              <React.Fragment key={i}>
                <a href={`/tags/#${tag}`} className="tag">
                  #{tag}
                </a>
                {tags.length < i ? ",&nbsp;" : ""}
              </React.Fragment>
            )}
          </footer>}
      </article>
    </Page>
  )
}

module.exports = withContext(Post);
