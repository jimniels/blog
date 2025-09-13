import fs from "fs";
import { resolve, dirname } from "path";
import site from "../cache/site.json" with { type: 'json' };
const __dirname = dirname(new URL(import.meta.url).pathname);
const CACHE_DIR = resolve(__dirname, "../cache");

// Fetches quick charts (if they're not already on disk)and writes them to the cache directory
main();

async function main() {
  // Posts by year (don't include rssClub posts)
  const postsByYear = site.posts.reduce((acc, post) => {
    const year = post.date.slice(0, 4);
    if (acc[year]) {
      acc[year].push(post);
    } else {
      acc[year] = [post];
    }
    return acc;
  }, {});

  const charts = [
    {
      id: "posts-per-year",
      quickChartQuery: {
        type: "line",
        data: {
          labels: Object.keys(postsByYear),
          datasets: [
            {
              label: "Posts Per Year",
              data: Object.entries(postsByYear).map(
                ([year, posts]) => posts.length
              ),
              fill: false,
              // borderColor: "rgb(1,1,1)",
              // yAxisID: "posts-per-year",
            },
            {
              type: "bar",
              label: "Words Per Year (1,000’s)",
              data: Object.entries(postsByYear).map(
                ([year, posts]) =>
                  Math.ceil(
                    posts.reduce((acc, post) => acc + post.wordCount, 0)
                  ) / 1000
              ),
              fill: false,
              // backgroundColor: "rgba(1,1,1,0.2)",
              // yAxisID: "words-per-year",
            },
          ],
        },
      },
    },
  ];

  return await Promise.all(
    charts.map(async (item) => {
      await getQuickChart({
        query: item.quickChartQuery,
        options: {},
        id: item.id,
      });
    })
  );
}

/**
 * Each SVG we get back from quickchart.io has generic clip-path IDs
 * This means embedding multiple <svg>s into the HTML document results in
 * clip-path ID clashing and they don't render properly.
 *
 * So here we namespace each clip-path ID that's in each svg, i.e.
 *
 * <defs>
 *   <clipPath id="clip1">...</clipPath>
 * </defs>
 * <g clip-path="url(#clip1)">
 *
 * When used with this function `stylizeSvg(str, "my-unique-id")` it transforms to:
 *
 * <defs>
 *   <clipPath id="my-unique-id__clip1">...</clipPath>
 * </defs>
 * <g clip-path="url(#my-unique-id__clip1)">
 *
 * This lets us embed the SVG directly so it can inherit the styles of the document
 *
 * @param {string} svg
 * @param {string} id
 * @returns
 */
function uniquezSvg(svg = "", id) {
  return svg
    .replace(/id="clip/g, `id="${id}__clip`)
    .replace(/clip-path="url\(#clip/g, `clip-path="url(#${id}__clip`);
}

/**
 *
 * query: {
 *   type: "",
 *   data: {
 *     labels: [],
 *     datasets: [{label: "", data: []}]
 *   }
 * }
 */
async function getQuickChart({ query, options, id }) {
  const file = resolve(CACHE_DIR, `${id}.svg`);
  if (fs.existsSync(file)) {
    return fs.readFileSync(file).toString();
  }

  const graphData = {
    ...query,
    // Generally graphs are the same, so pass the same options
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
      ...options,
      // title: {
      //   fontSize: 21,
      //   display: true,
      //   text: `Posts Per Year`,
      // },
    },
  };

  // 500x300 is the default from the API, so 5:3 aspect ratio
  const w = 800;
  const h = 480;
  const c = JSON.stringify(graphData).replace(/"/g, "'");
  const url = `https://quickchart.io/chart?w=${w}&h=${h}&c=${c}&format=svg`;

  let img;
  try {
    console.log(`Fetching chart: \`${id}\`.svg`);
    const res = await fetch(url);
    // const data = await res.buffer();
    const data = await res.text();
    const svg = data.toString();
    fs.writeFileSync(file, svg);
    return svg;
  } catch (e) {
    console.log("Failed to fetch QuickChart.io image.", e);
    return "";
  }
}
