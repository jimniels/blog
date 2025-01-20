import { Page } from "../../server/Layouts.js";
import { html } from "../../server/utils.js";

export default function Page404(site) {
  const title = "Search";
  return Page(
    {
      site,
      page: {
        title,
        path: "/search/",
      },
    },
    html`
      <main class="copy">
        <div id="root"></div>
        <link href="/pagefind/pagefind-ui.css" rel="stylesheet" />
        <script
          src="/pagefind/pagefind-ui.js"
          defer
          id="pagefind-script"
        ></script>

        <script defer>
          console.log("script running");
          const pagefindScript = document.getElementById("pagefind-script");
          pagefindScript.addEventListener("load", (event) => {
            console.log("pagefindScript loaded");
            const result = new PagefindUI({
              element: "#root",
              pageSize: 10,
              showImages: false,
              showSubResults: true,
            });
            console.log("result", result);

            document
              .querySelector("#sidebar-search")
              .addEventListener("input", (event) => {
                const input = document.querySelector(
                  ".pagefind-ui__search-input"
                );
                const value = event.target.value;
                input.value = value;

                const main = document.querySelector("main");
                if (value === "") {
                  main.style.display = "block";
                } else {
                  main.style.display = "none";
                }

                const inputEvent = new Event("input", { bubbles: true });
                input.dispatchEvent(inputEvent);

                const changeEvent = new Event("change", { bubbles: true });
                input.dispatchEvent(changeEvent);
              });
          });
        </script>
      </main>
    `
  );
}
