// @ts-check
let initialized = false;
main();

let $main = document.querySelector("main");

async function main() {
  const $form = document.querySelector("#js-search-form");
  const $input = $form.querySelector("input");

  $input.addEventListener("input", async (event) => {
    const value = event.target.value;

    // Show/hide main content area
    if (value === "") {
      $main.removeAttribute("data-has-search-results");
    } else {
      $main.setAttribute("data-has-search-results", "");
    }

    // Load the assets
    if (!initialized) {
      $form.setAttribute("data-loading", "");
      await Promise.all([loadJS(), loadCSS()]);
      $form.removeAttribute("data-loading");
      console.log("Assets loaded. Running script.");
      // Setup pagefind UI
      const result = new window.PagefindUI({
        element: "#js-search-root",
        pageSize: 10,
        showImages: false,
        showSubResults: false,
      });
      initialized = true;
    }

    // Set value in the pagefind component
    const input = document.querySelector(".pagefind-ui__search-input");
    input.value = value;
    const inputEvent = new Event("input", { bubbles: true });
    input.dispatchEvent(inputEvent);
    const changeEvent = new Event("change", { bubbles: true });
    input.dispatchEvent(changeEvent);
  });
}

function loadJS() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "/pagefind/pagefind-ui.js";
    script.onload = () => {
      console.log("Pagefind UI script loaded");
      // Use the script's functionality here
      resolve();
    };
    script.onerror = () => {
      console.error("Failed to load the script");
      reject();
    };
    document.head.appendChild(script);
  });
}

function loadCSS() {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.href = "/pagefind/pagefind-ui.css";
    link.rel = "stylesheet";
    link.type = "text/css";
    link.onload = () => {
      console.log("CSS file loaded successfully");
      resolve();
    };
    link.onerror = () => {
      console.error("Failed to load the CSS file");
      reject();
    };
    document.head.appendChild(link);
  });
}
