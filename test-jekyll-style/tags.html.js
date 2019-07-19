---
title: Tags
slug: /tags/index.html
layout: PageCustom
---

<h1>All Tags Index</h1>
<ul>
  ${Object.entries(props.site.posts.reduce((acc, post) => {
    if (post.tags.length > 0) {
      post.tags.forEach(tag => {
        if (acc[tag]) {
          acc[tag] = acc[tag] + 1;
        } else {
          acc[tag] = 1;
        }
      });
    }
    return acc;
  }, {}))
  .map(([tag, count]) => `
    <li>
      <a href="#${tag}">#${tag}</a> (${count})
    </li>
  `).join("")}
</ul>

  