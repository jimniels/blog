import { PostsList } from "../../../server/PostsList.js";
import { PostsNav } from "../../../server/PostsNav.js";
import { Page } from "../../../server/Layouts.js";
import { html, toDateUI } from "../../../server/utils.js";

/**
 * @param {import("types").Site} site
 * return {import("types").Page}
 */
export default async function Index(site) {
  const posts = site.posts.filter((post) => post.isFav);

  return Page(
    {
      site,
      page: {
        title: "Personal Favs",
        path: "/archive/personal-favs/",
      },
    },
    html`
      <h1>Posts</h1>
      ${PostsNav("/archive/personal-favs/")} ${PostsList(posts)}
    `
  );
}
