import { html } from "./utils.js";
import fs from "fs";
import { fileURLToPath } from "url";
const importFile = (filepath) =>
  fs.readFileSync(fileURLToPath(import.meta.resolve(filepath))).toString();

// Pulled from the CSS theme variables
const colors = [
  "blue",
  "red",
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
      <form>
        <fieldset class="tp-colors">
          ${colors
            .map(
              (color) => /*html*/ `
        <input type="radio" name="color" value="${color}" id="color-${color}"  />
        <label
          id="color-${color}"
          for="color-${color}"
        ><span style="background-color: hsl(var(--c-${color}-h) var(--c-${color}-s) var(--c-${color}-l))">${color}</span></label> 
    `
            )
            .join("")}
        </fieldset>
        <fieldset class="tp-themes">
          ${["system", "light", "dark"]
            .map((theme) => {
              const label = theme.charAt(0).toUpperCase() + theme.slice(1);
              return /*html*/ `
        <input type="radio" name="appearance" value="${theme}" id="appearance-${theme}"  />
        <label for="appearance-${theme}" title="${label}">${importFile(
                `./svgs/appearance-${theme}.svg`
              )}</label>
        `;
            })
            .join("")}
        </fieldset>
      </form>
    </theme-picker>
    <!-- prettier-ignore -->
    <script>${importFile("./theme-picker.js")}</script>
  `;
}
