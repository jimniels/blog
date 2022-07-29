import fs from "fs";
import fetch from "node-fetch";
import { resolve, dirname } from "path";
import { Page } from "../../server/Layouts.js";
import { html } from "../../server/utils.js";
const __dirname = dirname(new URL(import.meta.url).pathname);

const page = {
  title: "About",
  path: "/about/",
  head: html`
    <style>
      /* Styles for our embedded SVGs */
      .copy svg {
        width: 100%;
        /* max-width: 42rem !important; */
        height: auto;
        display: block;
        margin-bottom: -1rem;
        margin-top: 4rem;
      }
      /* Change line graph line color */
      .copy svg path[style*="stroke-opacity:1"] {
        stroke: var(--c-theme) !important;
      }
      .copy svg path[style*="stroke-opacity:1"][style*="stroke-width:1"] {
        fill: var(--c-theme) !important;
        fill-opacity: 0.666;
      }
      /* Change bar graph bar fill */
      .copy svg path[style*="fill-opacity:1"]:not([style*="fill:rgb(40%"]) {
        fill: var(--c-theme) !important;
        fill-opacity: 0.666 !important;
      }
      /* Line graph key box outline */
      .copy
        svg
        path[style*="stroke-opacity:1"][style*="stroke-width:3"][style*="fill:rgb("] {
        fill: none !important;
      }

      .copy h3 {
        margin-top: 2rem;
      }
      .copy h3 a {
        font-weight: normal;
        font-size: 0.875rem;
        margin-left: 0.5rem;
      }
      @media screen and (min-width: 540px) {
        .two-col-list {
          column-count: 2;
          column-gap: 4rem;
        }
      }
      .two-col-list li {
        position: relative;
      }
      .two-col-list .left {
        display: block;
        width: 85%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .two-col-list .right {
        font-size: 0.77777rem;
        background: var(--c-fg);
        padding: 0px 0.5rem;
        border-radius: 20px;
        position: absolute;
        right: 0;
        top: 0.11111rem;
      }
    </style>
  `,
};

export default function About(site, loaderData) {
  return Page(
    { site, page },
    html`
      <main class="copy" style="margin-bottom: 6rem;">
        <p class="image-container">
          <img
            src="/assets/img/jimniels.jpg"
            width="800"
            height="419"
            alt="Portrait of Jim Nielsen"
          />
        </p>

        <h1>About</h1>

        <p>Hello, I’m <a href="https://www.jim-nielsen.com">Jim Nielsen</a>.</p>

        <p>
          In the past, I put off writing because I was unable to do my best—“if
          you can’t do something right, don’t do it at all”.
        </p>
        <p>
          But lately I’ve found myself regretting not writing down at least
          <em>something</em>.
        </p>

        <p>
          So my current posture towards blogging is: something is better than
          nothing.
        </p>

        <h2 id="stats">Stats</h2>
        <p>
          Some stats around my blog. They don’t mean anything — it’s just fun to
          output numbers from the dataset that is my blog. Read into this what
          you will, as Homer Simpson once said, “You can come up with statistics
          to prove anything. 40% of all people know that.”
        </p>

        ${StatSection({
          title: "Writing",
          listType: "ul",
          list: [
            [
              "Years Blogging",
              new Date().toISOString().slice(0, 4) -
                site.posts[site.posts.length - 1].date.slice(0, 4) +
                1,
            ],
            ["Posts", site.posts.length.toLocaleString()],
            [
              "Words",
              site.posts
                .reduce((acc, post) => acc + post.wordCount, 0)
                .toLocaleString(),
            ],
            ["Tags", site.tagIds.length.toLocaleString()],
            [
              "External Links",
              Object.entries(site.externalLinksByDomain)
                .reduce((acc, [domain, links]) => acc + links.length, 0)
                .toLocaleString(),
            ],
            [
              "Internal Links",
              Object.entries(site.internalLinksByPath)
                .reduce((acc, [domain, links]) => acc + links.length, 0)
                .toLocaleString(),
            ],
          ],
        })}
        ${loaderData.map(({ label, link, svg, id, list, listType }) =>
          StatSection({
            title: label + (link ? html` <a href="${link}">View all</a>` : ""),
            list,
            listType,
            svg: uniquezSvg(svg, id),
          })
        )}
      </main>
    `
  );
}

function StatSection(
  { title, list, listType, svg } = {
    title: "",
    list: "",
    listType: "ol",
    svg: "",
  }
) {
  return html`
    ${svg}
    <h3>${title}</h3>
    <${listType} class="two-col-list">
      ${list.map(
        ([key, value]) =>
          html`<li>
            <span class="left">${key}</span>
            <span class="right">${value}</span>
          </li>`
      )}
    </${listType}>   
  `;
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
 * @param {import("../../../types").Site} site
 * @returns
 */
export async function loader(site) {
  const pageLoaderData = [
    {
      label: "Posts / Words Per Year",
      link: "",
      id: "posts-per-year",
      listType: "ul",
      list: Object.entries(site.postsByYear).map(([year, posts]) => [
        year,
        posts.length +
          " / ~" +
          Math.ceil(
            posts.reduce((acc, post) => acc + post.wordCount, 0) / 1000
          ) +
          "k",
      ]),
      quickChartQuery: {
        type: "line",
        data: {
          labels: Object.keys(site.postsByYear),
          datasets: [
            {
              label: "Posts Per Year",
              data: Object.entries(site.postsByYear).map(
                ([year, posts]) => posts.length
              ),
              fill: false,
              // borderColor: "rgb(1,1,1)",
              // yAxisID: "posts-per-year",
            },
            {
              type: "bar",
              label: "Words Per Year (1,000’s)",
              data: Object.entries(site.postsByYear).map(
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
    {
      label: "Top Tags",
      link: "/tags",
      id: "chart-top-tags",
      listType: "ol",
      list: Object.entries(site.tagsById)
        .slice(0, 10)
        .map(([id, { count }]) => [id, count]),
      quickChartQuery: {
        type: "horizontalBar",
        data: {
          labels: site.tagIds.slice(0, 10),
          datasets: [
            {
              label: "Top Tags",
              data: Object.entries(site.tagsById).map(
                ([id, { count }]) => count
              ),
            },
          ],
        },
      },
    },
    {
      label: "Top External Links",
      link: "/about/external-links/",
      id: "chart-top-external-links",
      listType: "ol",
      list: Object.entries(site.externalLinksByDomain)
        .slice(0, 10)
        .map(([domain, links]) => [domain, links.length]),
      quickChartQuery: {
        type: "horizontalBar",
        data: {
          labels: Object.entries(site.externalLinksByDomain)
            .slice(0, 10)
            .map(([domain]) => domain),
          datasets: [
            {
              label: "Top External Links",
              data: Object.entries(site.externalLinksByDomain)
                .slice(0, 10)
                .map(([domain, links]) => links.length),
            },
          ],
        },
      },
    },
    {
      label: "Top Internal Links",
      link: "/about/internal-links/",
      id: "chart-top-internal-links",
      listType: "ol",
      list: Object.entries(site.internalLinksByPath)
        .slice(0, 10)
        .map(([path, internalLinks]) => [path, internalLinks.length]),
      // .map(([path, count]) => [
      //   site.posts.find((post) => post.path === path).title,
      //   count,
      // ]),
      quickChartQuery: {
        type: "horizontalBar",
        data: {
          labels: Object.entries(site.internalLinksByPath)
            .slice(0, 10)
            .map(([path, links]) => path.slice(0, 10) + "…"),
          datasets: [
            {
              label: "Top Internal Links",
              data: Object.entries(site.internalLinksByPath)
                .slice(0, 10)
                .map(([path, links]) => links.length),
            },
          ],
        },
      },
    },
  ];

  return await Promise.all(
    pageLoaderData.map(async (item) => {
      if (!item.quickChartQuery) {
        return { ...item, svg: "" };
      }
      const svg = await getQuickChart({
        query: item.quickChartQuery,
        options: item.quickChartOptions || {},
        id: item.id,
      });
      return {
        ...item,
        svg,
      };
    })
  );
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
  const file = resolve(__dirname, `../../../.cache/${id}.svg`);
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
    console.log(`Fetching chart: \`${id}\`\n%s`, url);
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
