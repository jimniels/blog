const React = require("react");
const { arrayOf, instanceOf, shape, string } = require("prop-types");
const Page = require("../server/templates/Page.jsx");
const { withContext } = require("../server/templates/Context.jsx");
const { toDateForHumans, toDateForComputers } = require("../server/utils/date.js");

Index.propTypes = {
  context: shape({
    site: shape({
      posts: arrayOf(shape({
        date: instanceOf(Date).isRequired,
        permalink: string.isRequired,
        title: string.isRequired
      }))
    }),
    path: string.isRequired
  })
}

function Index({ context: { site } }) {
  const postsByYear = site.posts.reduce((acc, post) => {
    const year = post.date.getFullYear();
    if (acc[year]) {
      acc[year].push(post);
    } else {
      acc[year] = [post]
    }
    return acc;
  }, {});

  const years = Object.keys(postsByYear).sort().reverse();

  return (
    <Page path="/">{years.map(year =>
      <React.Fragment key={year}>
        <h2 id={`y${year}`}>{year}</h2>
        <ul className="posts-list">
          {postsByYear[year].map(post =>
            <li key={post.permalink}>
              <a href={post.permalink}>
                {post.title}
              </a>
              <time dateTime={toDateForComputers(post.date)}>
                {toDateForHumans(post.date, { year: undefined })}
              </time>
            </li>
          )}
        </ul>
      </React.Fragment>)}
    </Page>
  )
}

module.exports = withContext(Index);



/*
{% for post in site.posts %}
{% assign currentdate = post.date | date: "%Y" %}
{% if currentdate != date %}
{% unless forloop.first %}</ul > {% endunless %}
<h2 id="y{{post.date | date: "% Y"}}" > {{ currentdate }}</h2 >
  <ul class="posts-list">
    {% assign date = currentdate %}
  {% endif %}
    <li>
      <a href="{{ site.baseurl }}{{ post.url }}">
        {{ post.title }}
      </a>
      <time datetime="{{ post.date | date: '%Y-%m-%d' }}">
        {{ post.date | date: "%b %e" }}
        </time>
    </li>
    {% if forloop.last %}</ul>{% endif %}
{% endfor %}
*/
