// Show/hide the stuff if JS is present
const $root = document.querySelector("#theme-root");
const $theme = document.querySelector("theme-color");

$root.innerHTML = /*html*/ `
  <form id="color">
  ${$theme
    .getAttribute("supported-values")
    .split(" ")
    .map(
      (color) => /*html*/ `
        <label>
          <input type="radio" name="color" value="${color}" />
          <span
            style="background-color: hsl(var(--c-${color}-h) var(--c-${color}-s) var(--c-${color}-l))"
            >${color}</span
          >
        </label>
      `
    )
    .join("")}
  </form>
`;

// Check the active color in the UI
const $form = document.querySelector("form#color");
$form.querySelector(
  "input[value=" + $theme.getAttribute("value") + "]"
).checked = true;

// Listen for changes
$form.addEventListener("click", (e) => {
  e.stopPropagation();
  // If it's an <input>
  if (e.target.value) {
    // If we're setting a new value, set it
    if (e.target.value !== localStorage.getItem("theme-color")) {
      const color = e.target.value;
      $theme.setAttribute("value", color);
    }
  }
});
