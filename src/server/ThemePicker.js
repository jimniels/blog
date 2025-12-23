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
          <div>
            <legend>Accent</legend>

            <div>
              ${colors
                .map(
                  (color) => /*html*/ `
              <input type="radio" name="color" value="${color}" id="color-${color}"  />
              <label for="color-${color}">
                ${color} <span style="background-color: hsl(var(--c-${color}-h) var(--c-${color}-s) var(--c-${color}-l))"></span>
              </label> 
            `
                )
                .join("")}
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div>
            <legend>Appearance</legend>

            <div>
              ${["system", "light", "dark"]
                .map((theme) => {
                  const label = theme.charAt(0).toUpperCase() + theme.slice(1);
                  return /*html*/ `
                <input type="radio" name="appearance" value="${theme}" id="appearance-${theme}"  />
                <label for="appearance-${theme}" title="${label}"><span>${label}</span>
                  ${Icon(`heroicon-${theme}`)}
                </label>
              `;
                })
                .join("")}
            </div>
          </div>
        </fieldset>
      </form>
    </theme-picker>
    <script>
      ${readFile("./theme-picker.js")};
    </script>
  `;
}
