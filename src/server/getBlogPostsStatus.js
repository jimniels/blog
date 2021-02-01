import fetch from "node-fetch";
import { html } from "./utils.js";

/**
 * Widget to display blog posts status message.
 *
 * NOTE: the image for this gets fetched inside metalsmith.js file. So if you
 * get rid of this, get rid of that.
 *
 * @param {Array} allPosts - an array of all blog posts
 * @param {number} goal - number of posts you want to publish
 * @param {string} goalUrl - URL to the post that describes the goal for the year
 * @param {Date} moment - the point in time at which we render this, i.e 2020-10-01T01...
 *
 * @returns {string}
 */
export default async function BlogPostsStatus({
  allPosts,
  goal,
  goalUrl,
  moment,
}) {
  const year = moment.getUTCFullYear();
  const currentMonth = moment.getUTCMonth() + 1;
  // Use this to compare dates when filtering down posts
  const d = moment.toISOString().slice(0, 10);
  const posts = allPosts.filter(
    // get everything from the moment's year (and before that month, which is
    // useful for when we want to draw a graph for a moment in the past)
    (post) =>
      post.date.getUTCFullYear() === year &&
      post.date.toISOString().slice(0, 10) <= d
  );

  // prettier-ignore
  const monthlyPosts =
    // [0,0,0] each month is 0
    Array(currentMonth).fill(0)
    // [2,1,0] # of posts in each month
    .map(
      (postCount, i) =>
        posts.filter((post) => post.date.getUTCMonth() === i).length
    )
    // [2,3,3] summation of posts over months
    .reduce((acc, postCount, i) => {
      acc[i] = i === 0 ? postCount : acc[i - 1] + postCount;
      return acc;
    }, []);

  // get the trajectory based on dividing the goal by 12 months
  // end up with an addition of each, i.e. 24 posts goal for the year would be
  // [2,4,6,8,10,12,14,16,18,20,22,24]
  const monthlyGoal = [goal / 12];
  const monthlyTrajectory = [...Array(12)].map(
    (item, i) => (i + 1) * monthlyGoal
  );

  const graphData = {
    type: "line",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: `Goal (${goal})`,
          data: monthlyTrajectory,
          fill: true,
          borderColor: "rgba(255,38,3,.2)",
          backgroundColor: "rgba(255,38,3,.1)",
        },
        {
          label: `Actual (${posts.length})`,
          data: monthlyPosts,
          fill: false,
          borderColor: "rgba(255,38,3,1)",
        },
      ],
    },
    options: {
      scales: {
        yAxes: [{ ticks: { fontSize: 18 } }],
        xAxes: [{ ticks: { fontSize: 18 } }],
      },
      legend: {
        labels: {
          fontSize: 18,
        },
      },
      devicePixelRatio: 2,
      title: {
        fontSize: 21,
        display: true,
        text: `Blog Posts in ${year}`,
      },
    },
  };

  // 500x300 is the default from the API, so 5:3 aspect ratio
  const w = 800;
  const h = 480;
  const c = JSON.stringify(graphData).replace(/"/g, "'");

  let img;
  try {
    await fetch(`https://quickchart.io/chart?w=${w}&h=${h}&c=${c}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Server did not return an appropriate image (no 200).");
        }
        return res.buffer();
      })
      .then((imgData) => {
        // write to disk?
        img = imgData.toString("base64");
      });
  } catch (e) {
    console.log("Failed to fetch <BlogPostsStatus> image.", e);
  }

  return html`
    <details id="bps">
      <summary>
        <strong
          >${posts.length} post${posts.length !== 1 && "s"} in ${year}.</strong
        >
        <a href="${goalUrl}">My goal is ${goal}</a>. I hope you, dear reader,
        will <a href="https://twitter.com/jimniels">hold me accountable</a>.
      </summary>
      <div>
        ${img &&
        html`<img
          src="data:image/png;base64, ${img}"
          alt="A graph showing that I’ve published ${posts.length} posts this year through ${currentMonth} months."
          width="${w}"
          height="${h}"
        />`}
        <p>
          Progress since my last published post.
          <a href="/2021/graphing-blog-post-goals/"
            >Read more on how I made this</a
          >.
        </p>
      </div>
    </details>
  `;
}
