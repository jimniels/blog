// Only this small loader runs initially. Pagefind and its styles wait for input.
(() => {
  const form = document.querySelector(".home-search");
  if (!form) return;
  const input = form.querySelector("[name=q]");
  const results = document.querySelector("#home-search-results");
  const content = document.querySelector("#home-content");
  const status = document.querySelector(".home-search-status");
  const spinner = form.querySelector(".home-search-spinner");
  let loading;
  let ui;
  let failed = false;

  function loadAsset(tag, url) {
    return new Promise((resolve, reject) => {
      const asset = document.createElement(tag);
      if (tag === "link") {
        asset.rel = "stylesheet";
        asset.href = url;
      } else {
        asset.src = url;
      }
      asset.onload = resolve;
      asset.onerror = () => {
        asset.remove();
        reject(new Error(`Could not load ${url}`));
      };
      document.head.append(asset);
    });
  }

  function load() {
    loading ||= Promise.all([
      loadAsset("link", "/pagefind/pagefind-ui.css"),
      loadAsset("link", "/home-search-results.css"),
      loadAsset("script", "/pagefind/pagefind-ui.js"),
    ]).then(() => {
      ui = new window.PagefindUI({
        element: "#home-search-results",
        pageSize: 10,
        showImages: false,
        showSubResults: false,
      });
    });
    return loading;
  }

  function message(text) {
    status.textContent = text;
    status.hidden = !text;
  }

  async function search() {
    const hasQuery = !!input.value.trim();
    content.hidden = hasQuery;
    results.hidden = !hasQuery;
    if (!hasQuery) {
      message("");
      spinner.hidden = true;
      results.removeAttribute("aria-busy");
      ui?.triggerSearch("");
      return;
    }
    if (failed) {
      message("Search couldn’t load. Press Enter to search with DuckDuckGo.");
      return;
    }
    if (!ui) {
      spinner.hidden = false;
      results.setAttribute("aria-busy", "true");
      message("Loading search…");
    }
    try {
      await load();
      // Read the latest value: the user may have typed or cleared while loading.
      const query = input.value.trim();
      results.hidden = !query;
      ui.triggerSearch(query);
      message("");
    } catch {
      failed = true;
      results.hidden = true;
      message(input.value.trim()
        ? "Search couldn’t load. Press Enter to search with DuckDuckGo."
        : "");
    } finally {
      spinner.hidden = true;
      results.removeAttribute("aria-busy");
    }
  }

  input.addEventListener("input", search);
  // Native search-field clear buttons also emit "search" in some browsers.
  input.addEventListener("search", search);
  form.addEventListener("submit", (event) => {
    if (!failed) {
      event.preventDefault();
      search();
    }
  });
})();
