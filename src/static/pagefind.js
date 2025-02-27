// @ts-expect-error
const result = new PagefindUI({
  element: "#js-search-root",
  pageSize: 10,
  showImages: false,
  showSubResults: false,
});

const $form = document.querySelector("#js-search-form");
if (!$form) {
  throw new Error("Form not found");
}
const $myInput = $form.querySelector("input");
if (!$myInput) {
  throw new Error("Input not found");
}

// Handle form clear
$form.addEventListener("reset", (event) => {
  updatePagefindInput("");
  $myInput.focus();
});

// Prevent default no-JS submission
$form.addEventListener("submit", (event) => {
  event.preventDefault();
});

// Sync our custom input with the pagefind component
/** @type {HTMLInputElement} */
$myInput.addEventListener("input", async (event) => {
  // @ts-expect-error
  const value = event.target.value;
  if (typeof value === "string") {
    updatePagefindInput(value);
  }
});

/**
 *
 * @param {string} value
 */
function updatePagefindInput(value) {
  /** @type {HTMLInputElement | null} */
  const $pagefindInput = document.querySelector(".pagefind-ui__search-input");
  if (!$pagefindInput) {
    throw new Error("Pagefind input not found");
  }
  $pagefindInput.value = value;
  const inputEvent = new Event("input", { bubbles: true });
  $pagefindInput.dispatchEvent(inputEvent);
  const changeEvent = new Event("change", { bubbles: true });
  $pagefindInput.dispatchEvent(changeEvent);
}
