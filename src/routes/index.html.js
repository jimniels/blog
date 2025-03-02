import { PostsList } from "../server/PostsList.js";
import { Page } from "../server/Layouts.js";
import { html, toDateUI } from "../server/utils.js";
import { PostsNav } from "../server/PostsNav.js";

const LIMIT = 8;
const page = {
  title: "",
  path: "/",
};

/** @type {import("types").Route} */
export default function Index(site) {
  const posts = site.posts
    .filter((post) => !post?.tags.includes("rssClub"))
    .slice(0, LIMIT);

  return Page(
    {
      site,
      page,
    },
    html` <main class="wrapper">
      <h1>Posts</h1>
      ${PostsNav(page.path)} ${PostsList(posts)}
    </main>`
  );
}
