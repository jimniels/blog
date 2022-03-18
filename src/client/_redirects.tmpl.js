export default function Redirects(site) {
  const { postsByYear } = site;
  const years = Object.keys(postsByYear);

  // Whereas everything now does: /:year/:slug
  // Maybe someday we switch everything back to being under the noun `posts`

  /*
    /archive/ -> /posts/ (/posts/#2015)
    /tags/ -> /posts/tags/

    /posts/a-web-of-people-20120629
    /posts/a-web-of-people-2012-06-29
    /posts/2012-06-29-a-web-of-people
    /posts/20120629-a-web-of-people
    /posts/a-web-of-people-120629

    /links/2205010915
    /links/220501T0915
    /links/20220501T0915
    /links/2022-05-01T09-15
    /links/2022-05-01-09-15
    /links/2022-05-01-theverge.com
    THIS DOESN'T WORK
    /links/2022-05-01-youtube.com
    /links/2022-05-01-youtube.com
  */
  // return site.posts
  //   .filter((post) => post.redirect_from)
  //   .map((post) => `${post.redirect_from} ${post.permalink} 301`)
  //   .concat(years.map((year) => `/${year}/ /archive/#${year} 301`))
  //   .join("\n");

  // @TODO RSS feed item IDs will change if you change the path, be aware of that!!

  // Everything at 2015-06-29-a-web-of-people.md and before
  // used the pattern `/posts/:slug/`
  // which at one point in time redirected to `/:year/:slug`
  // But we changed to `/posts/:slug-:date`
  const oldRedirects = site.posts
    .filter((post) => post.date.toISOString().slice(0, 10) < "2015-06-29")
    .map((post) => {
      const { date, slug } = post;
      const dateStr = date.toISOString().slice(0, 10);
      // /posts/:slug/ -> /posts/:slug-:date
      return `/posts/${slug}/ /posts/${slug}-${dateStr}/ 301`;
    })
    .join("\n");

  // site.posts.reduce((acc, post) => {
  //   const id = post.slug + "-" + post.date.toISOString().slice(0, 10);
  //   if (acc[post.slug]) {
  //     console.log("Already exists", post.slug, id);
  //     acc[post.slug] = id;
  //   } else {
  //     acc[post.slug] = id;
  //   }
  //   return acc;
  // }, {});

  // /posts/:id
  // /links/:id

  // Everything at X date forward
  // Used to be `/:year/:slug`
  // But we changed it to `/posts/:slug-:date`
  const newRedirects = site.posts
    // Figure out at what point forwad this is true
    // .filter((post) => post.date.toISOString().slice(0, 10) < "2015-06-29")
    .map((post) => {
      const { slug, date } = post;
      const dateStr = date.toISOString().slice(0, 10);
      const year = dateStr.slice(0, 4);
      return `/${year}/${slug}/ /posts/${slug}-${dateStr}/ 301`;
    })
    .join("\n");

  return oldRedirects + newRedirects;
}
