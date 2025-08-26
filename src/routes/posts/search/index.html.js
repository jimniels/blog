import { PostsList } from "../../../server/PostsList.js";
import { PostsNav } from "../../../server/PostsNav.js";
import { Page } from "../../../server/Layouts.js";
import { html, toDateUI } from "../../../server/utils.js";
import PageNav from "../../../server/PageNav.js";
import { Icon } from "../../../server/Icon.js";

const page = {
  title: "Search",
  path: "/posts/search/",
  head: `
      
      `,
};

/** @type {import("types").Route} */
export default async function Index(site) {
  return Page(
    {
      site,
      page,
    },
    html`<main class="wrapper">
      ${PageNav("Posts")} ${PostsNav(page.path)}

      <form action="https://duckduckgo.com" class="search" id="js-search-form">
        <input
          type="text"
          name="q"
          autocomplete="off"
          spellcheck="false"
          placeholder="Search"
          autofocus
          id="search-input"
        />
        <button type="reset">${Icon("heroicon-x-circle")}</button>
        <input type="hidden" name="sites" value="blog.jim-nielsen.com" />
        ${Icon("heroicon-search")}
      </form>
      <output id="js-search-root"></output>
      <style>
        .search {
          position: relative;
        }
        .search input {
          width: 100%;
          height: var(--s-40);
          border: 1px solid var(--c-fg);
          border-radius: var(--border-radius);
          padding-left: var(--s-40);
          background: transparent;
        }

        .search svg {
          width: 20px;
          height: 20px;
        }
        .search > svg {
          position: absolute;
          left: var(--s-12);
          top: 0.5555rem;
        }
        .search button {
          position: absolute;
          right: var(--s-12);
          top: 0.5555rem;
          width: 20px;
          height: 20px;
          background: none;
          border: none;
          padding: 0;
          margin: 0;
        }

        .search input:placeholder-shown + button {
          display: none;
        }
        .search input:not(:placeholder-shown) + button {
          display: block;
        }

        /* ==========================================================================
            * Pagefind
            * ========================================================================== */

        :root {
          /* pagefind */
          --pagefind-ui-scale: 1 !important;
          --pagefind-ui-primary: var(--c-theme) !important;
          --pagefind-ui-text: var(--c-text) !important;
          --pagefind-ui-background: var(--c-bg) !important;
          --pagefind-ui-border: var(--c-border) !important;
          --pagefind-ui-tag: var(--c-border) !important;
          --pagefind-ui-border-width: 2px;
          --pagefind-ui-border-radius: 8px;
          --pagefind-ui-image-border-radius: 8px;
          --pagefind-ui-image-box-ratio: 3 / 2;
          --pagefind-ui-font: inherit;
        }
        .pagefind-ui__message {
          font-weight: 400 !important;
          color: var(--c-text-light) !important;
          padding-top: 0 !important;
        }
        .pagefind-ui__result {
          padding: calc(12px * var(--pagefind-ui-scale)) 0
            calc(16px * var(--pagefind-ui-scale)) !important;
        }
        .pagefind-ui__result:last-child {
          border-bottom: none !important;
        }
        .pagefind-ui__result-title {
          line-height: 1.3 !important;
          font-size: 1rem !important;
        }
        .pagefind-ui__result-excerpt {
          color: var(--c-text-light) !important;
          font-size: 0.888rem !important;
        }
        .pagefind-ui__result-title,
        .pagefind-ui__result-link {
          font-weight: 400 !important;
          color: var(--c-theme) !important;
        }

        .pagefind-ui mark {
          color: var(--c-text) !important;
          font-weight: 600 !important;
          background-color: transparent !important;
        }
        .pagefind-ui__result-link:before {
          display: none !important;
        }
        .pagefind-ui__result-nested .pagefind-ui__result-link {
          font-size: 1rem !important;
        }

        #js-search-root {
          overflow: hidden;
        }
        .pagefind-ui__search-input,
        .pagefind-ui__search-clear,
        .pagefind-ui__form:before {
          display: none !important;
        }
      </style>

      <!-- Pagefind deps -->
      <link href="/pagefind/pagefind-ui.css" rel="stylesheet" async />
      <script src="/pagefind/pagefind-ui.js" async></script>

      <!-- Our custom pagefind override script -->
      <script src="/pagefind.js" async></script>
    </main>`
  );
}
