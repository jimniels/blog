import { Page } from "../../server/Layouts.js";
import { html, toDateUI } from "../../server/utils.js";

const page = {
  title: "Internal Links",
  path: "/about/internal-links/",
  head: html`<style>
    #root {
      display: block;
      margin-top: 1.618rem;
      padding-top: 1.618rem;
    }
    #root svg {
      width: 100%;
      height: auto;
    }
    #root svg [fill="#ffffff"] {
      fill: transparent;
    }
    #root svg [stroke="#000000"] {
      stroke: var(--c-theme);
    }
    #root svg [fill="#000000"] {
      fill: var(--c-text);
    }
    #root .loading {
      opacity: 0.5;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.618rem;
    }
    form label {
      font-weight: 700;
    }
    /* Thank you https://tobiasahlin.com/spinkit/ */
    .spinner {
      display: block;
      width: 40px;
      height: 40px;
      margin: 100px auto;
      background-color: var(--c-theme);
      border-radius: 100%;
      -webkit-animation: sk-scaleout 1s infinite ease-in-out;
      animation: sk-scaleout 1s infinite ease-in-out;
    }
    @-webkit-keyframes sk-scaleout {
      0% {
        -webkit-transform: scale(0);
      }
      100% {
        -webkit-transform: scale(1);
        opacity: 0;
      }
    }
    @keyframes sk-scaleout {
      0% {
        -webkit-transform: scale(0);
        transform: scale(0);
      }
      100% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 0;
      }
    }
  </style>`,
};

// https://quickchart.io/documentation/graphviz-api/
const graphLayoutEngines = [
  "twopi",
  "fdp",
  "neato",
  "osage",
  // These don't render very well
  // "dot",
  // "circo",
  // "patchwork",
];

export default function Index(site) {
  /*
    Query should look like `digraph { QUERY }` and takes the shape:
    "/path/to/post/" -> { "related/path", "another/related/path" }
  */
  const vizString = Object.entries(site.internalLinksByPath)
    .map(
      ([path, links]) =>
        `"${path}" -> { ${links.map((link) => `"${link}"`).join(", ")} }`
    )
    .join("\n");
  return Page(
    { site, page },
    html`
      <main>
        <div class="wrapper copy">
          <h1>${page.title}</h1>
          <p>
            A visual representation of the relationship between posts on my
            blog. It uses viz.js to draw the graph. You can learn more about how
            I did this in
            <a href="/2022/visualizing-my-blogs-links/">my blog post</a> (or
            <a href="/about#stats">check out my other stats</a>).
          </p>
          <p>
            <strong>FYI:</strong> I need to make this better and make it easy to
            pan/zoom on this content. An addition for another day.
          </p>
          <noscript style="color: red">
            You must have JavaScript enabled to use this chart.
          </noscript>
        </div>

        <div class="wrapper">
          <form>
            <label for="layout-engine">Layout engine: </label>
            <select id="layout-engine">
              ${graphLayoutEngines.map(
                (engine, i) =>
                  html`<option value="${engine}" ${i === 0 ? "selected" : ""}>
                    ${engine}
                  </option>`
              )}
            </select>
          </form>
        </div>
        <output id="root">
          <span class="spinner"></span>
        </output>
      </main>

      <script
        defer
        src="https://cdn.jsdelivr.net/npm/viz.js@2.1.2/viz.js"
      ></script>
      <script
        defer
        src="https://cdn.jsdelivr.net/npm/viz.js@2.1.2/full.render.js"
      ></script>
      <script>
        window.addEventListener("DOMContentLoaded", function () {
          // for some reason this helps safari
          setTimeout(() => {
            let viz = new Viz();
            const $root = document.querySelector("#root");
            const $select = document.querySelector("form select");

            const renderVizLayout = (engine) => {
              viz
                .renderSVGElement(
                  \`digraph { node [shape=box] ${vizString} }\`,
                  {
                    engine,
                  }
                )
                .then((element) => {
                  $root.innerHTML = "";
                  $root.appendChild(element);
                })
                .catch((error) => {
                  // Create a new Viz instance (@see Caveats page for more info)
                  viz = new Viz();
                  $root.innerHTML = \`
                <div class=wrapper style='text-align: center; color: red'>
                  Sorry, but the graph failed to draw appropriately. Try again later.
                </div>
              \`;

                  // Possibly display the error
                  console.error(error);
                });
            };

            // Support dynamically changing viz layout
            $select.addEventListener("change", (e) => {
              console.log("change layout to", e.target.value);
              renderVizLayout(e.target.value);
            });

            // Initial render
            renderVizLayout($select.value);
          }, 100);
        });
      </script>
    `
  );
}
