export default function Redirects(site){
  return site.posts
    .filter(post => post.redirect_from)
    .map(post => `${post.redirect_from} ${post.permalink} 301`)
    .join("\n");
}
