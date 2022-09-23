// Show/hide the stuff if JS is present
const $root = document.querySelector("#js-color-root");
const $theme = document.querySelector("theme-color");

$root.innerHTML = /*html*/ `
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
`;

// Check the active color in the UI
const $form = document.querySelector("form#js-color");
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

const $formFidelity = document.querySelector("form#js-fidelity");
$formFidelity.querySelector("button").style.display = "none";
$formFidelity.addEventListener("change", () => {
  $formFidelity.submit();
});
