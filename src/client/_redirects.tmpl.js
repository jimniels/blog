export default function Redirects(site) {
  // Every post from `2015-06-29-a-web-of-people.md` on back needs this redirect rule
  // These used to live on every post as `redirect_from` but we can apply in batch here
  // Previous pattern: `/posts/:slug/`
  // New pattern: `/:year/:slug/`
  const oldRedirects = site.posts
    .filter((post) => post.date.slice(0, 10) <= "2015-06-29")
    .map((post) => {
      const { date, slug } = post;
      const year = date.slice(0, 4);
      // /posts/:slug/ -> /posts/:slug-:date
      return `/posts/${slug}/ /${year}/${slug}/ 301`;
    })
    .join("\n");
  // One-off redirects for old posts
  // These were mispelled or didn’t match the pattern of the initial redirects
  // transformation, so they have to be manually hard-coded here (rather than)
  // in the individual file
  const oneOffOldRedirects = [
    "/2019/thuoghts-on-jeremy-keiths-split/ /2019/thoughts-on-jeremy-keiths-split/ 301",
    // Technically, these ones are replacements for the "oldRedirects" above,
    // as they got fixed when we did this set of redirects. But we'll just add
    // them here for convenience's sake.
    "/posts/evoluation-of-creativity/ /2013/evolution-of-creativity/ 301",
    "/posts/preserving-CSS-comments-during-compression/ /2013/preserving-css-comments-during-compression/ 301",
    "/posts/scriptogram-posts-in-JSON-with-php/ /2013/scriptogram-posts-in-json-with-php/ 301",
    "/posts/an-analysis-of-infinite-scrolling/ /2013/an-analysis-of-infinite-scroll/ 301",
    "/posts/ios-border-radius/ /2012/calculate-the-ios-border-radius/ 301",
  ].join("\n");

  return [
    oneOffOldRedirects,
    oldRedirects,
    "/about/outbound-links/ /about/external-links/ 301",
  ].join("\n");

  /*
  // FUTURE REDIRECTS
  //
  // How many unique /posts/:id exist?
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
  //
  // @TODO RSS feed item IDs will change if you change the path, be aware of that!!
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
  */
}
