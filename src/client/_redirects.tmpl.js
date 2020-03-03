export default function Redirects(site) {
  const { postsByYear } = site;
  const years = Object.keys(postsByYear);

  return site.posts
    .filter(post => post.redirect_from)
    .map(post => `${post.redirect_from} ${post.permalink} 301`)
    .concat(years.map(year => `/${year}/ /archive/#${year} 301`))
    .join("\n");
}
