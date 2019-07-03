import Layout from "../../server/Layout.js";

const Tags = ({ site, page }) => `
${JSON.stringify(site)}
${JSON.stringify(page)}
<h1>All Tags Index</h1>
<ul>
  <!-- @TODO something here that groups tags by id 
  /*site.tagById.map(
    tag => 
    <li>
      <a href="#{tag.id}}">#{tag.id}</a> ({tag.count})
    </li>
  
  )
  -->
</ul>


{% for tag in sortedTags %}
  <h2 id="{{tag.first}}" style="margin-bottom: 1rem;">
    #{{tag.first}}
    <span style="font-weight: normal">
      ({{tag[1] | size}})
    </span>
  </h2>

  <ul class="posts-list">
    {% for post in site.posts %}
      {% if post.tags contains tag.first %}
        <li class="post-wrapper">
          <a href="{{ site.baseurl }}{{ post.url }}">{{post.title}}</a>
          <time class="date post-date">
            {{ post.date | date: "%b %e, %Y" }}
          </time>
        </li>
      {% endif %}
    {% endfor %}
  </ul>
{% endfor %}
`;

export default Layout(Tags, {
  // title: "Tags",
  id: "tags"
});
