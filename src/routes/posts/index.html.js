import { Page } from "../../server/Layouts.js";
import { PostsList } from "../../server/PostsList.js";
import { PostsNav } from "../../server/PostsNav.js";
import { html } from "../../server/utils.js";

const page = {
  title: "Posts",
  path: "/posts/",
};

/**
 * @type {import("types").Route}
 */
export default function Archive(site) {
  return Page(
    { site, page },
    html` <main class="wrapper">
      <h1>Posts</h1>
      ${PostsNav(page.path)} ${PostsList(site.posts)}
    </main>`
  );
}
