import { html } from "./utils.js";
const GOAL = 78;

/**
 * Widget to display blog posts status message.
 * @param {Number} blogPosts - Number of blog posts
 */
const BlogPostsStatus = ({ blogPosts }) => html`
  <style>
    .blog-posts {
      background: var(--color-bg-sidebar);
      padding: 15px;
      border-radius: var(--border-radius);
      display: flex;
      align-items: flex-start;
      font-size: 0.7777rem;
      max-width: 50em;
    }
    @media screen and (max-width: 520px) {
      .blog-posts {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
    }
    .blog-posts:before {
      font-size: 1.5rem;
      margin-right: 15px;
    }
    .blog-posts--complete:before {
      content: "🎉";
    }
    .blog-posts--good:before {
      content: "👍";
    }
    .blog-posts--bad:before {
      content: "👎";
    }
    .blog-posts p {
      margin: 0;
    }
  </style>

  <div class="blog-posts">
    <p>
      <strong data-blog-posts="${blogPosts}">${blogPosts} blog posts.</strong>

      I’m trying to write ${GOAL} blog posts this year (~1.5 per week). I expect
      you, dear reader, to
      <a href="https://twitter.com/jimniels" title="@jimniels on Twitter"
        >hold me accountable</a
      >
      to it.
    </p>
  </div>

  <script>
    const $el = document.querySelector("[data-blog-posts]");
    const blogPosts = Number($el.dataset.blogPosts);
    const weekNumber = getWeekNumber();
    const goal = ${GOAL};

    const metGoal = blogPosts >= goal;
    const onPace = blogPosts >= weekNumber * 1.5;

    $el.innerHTML =
      (metGoal
        ? "Mission accomplished: "
        : onPace
        ? "On pace: "
        : "Falling behind: ") +
      blogPosts +
      " posts in " +
      weekNumber +
      " week" +
      (weekNumber !== 1 ? "s" : "") +
      ".";

    document
      .querySelector(".blog-posts")
      .classList.add(
        metGoal
          ? "blog-posts--complete"
          : onPace
          ? "blog-posts--good"
          : "blog-posts--bad"
      );

    // https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
    function getWeekNumber() {
      let d = new Date();
      // Copy date so don't modify original
      d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      // Set to nearest Thursday: current date + 4 - current day number
      // Make Sunday's day number 7
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
      // Get first day of year
      var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      // Calculate full weeks to nearest Thursday
      var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
      // Return array of year and week number
      return weekNo;
    }
  </script>
`;

export default BlogPostsStatus;
