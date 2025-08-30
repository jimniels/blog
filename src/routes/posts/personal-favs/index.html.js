import { PostsList } from "../../../server/PostsList.js";
import { PostsNav } from "../../../server/PostsNav.js";
import { Page } from "../../../server/Layouts.js";
import { html, toDateUI } from "../../../server/utils.js";
import PageNav from "../../../server/PageNav.js";

const page = {
  title: "Personal Favs",
  path: "/posts/personal-favs/",
};

/**
 * @param {import("types").Site} site
 * return {import("types").Page}
 */
export default async function Index(site) {
  const posts = site.posts.filter((post) => post.isFav);

  return Page(
    {
      site,
      page,
    },
    html` ${PageNav("Posts")} ${PostsNav(page.path)} ${PostsList(posts)} `
  );
}
