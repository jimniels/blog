import { Icon } from "./Icon.js";
import { html, readFile } from "./utils.js";

// Pulled from the CSS theme variables
const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  // "pink",
  "purple",
  // "none",
  // "orange",
  // not supported as UI themes—yet
  // "mint",
  // "teal",
  // "cyan",
  // "brown",
  // "indigo",
];

export default function ThemePicker() {
  return html`
    <theme-picker>
      <form class="theme-picker">
        <fieldset>
          <legend>Accent</legend>

          ${colors
            .map(
              (color) => /*html*/ `
              <input type="radio" name="color" value="${color}" id="color-${color}"  />
              <label for="color-${color}">
                <span><span style="background-color: hsl(var(--c-${color}-h) var(--c-${color}-s) var(--c-${color}-l))"></span></span>
                <span>${color}</span>
                <span>${Icon(`heroicon-check`)}</span>
              </label> 
            `
            )
            .join("")}
        </fieldset>
        <fieldset>
          <legend>Appearance</legend>

          ${["system", "light", "dark"]
            .map((theme) => {
              const label = theme.charAt(0).toUpperCase() + theme.slice(1);
              return /*html*/ `
                <input type="radio" name="appearance" value="${theme}" id="appearance-${theme}"  />
                <label for="appearance-${theme}" title="${label}">
                  <span>${Icon(`heroicon-${theme}`)}</span>
                  <span>${label}</span>
                  <span>${Icon(`heroicon-check`)}</span>
                </label>
              `;
            })
            .join("")}
        </fieldset>
      </form>
    </theme-picker>
    <script>
      ${readFile("./theme-picker.js")};
    </script>
  `;
}
