import { html, readFile } from "./utils.js";

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
    <style>
      .theme-picker {
        position: relative;

        display: grid;
        grid-template-columns: 0.6fr 0.4fr;

        gap: var(--s-24);
      }

      .theme-picker fieldset {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: var(--border-radius);
        border: 1px solid var(--c-fg);
        padding: 0;
        margin: 0;
      }

      .theme-picker input {
        position: absolute;
        opacity: 0;
      }
      .theme-picker input:checked + label {
        background: var(--c-fg);
      }
      .theme-picker label {
        height: 100%;
        text-indent: -9999px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: var(--s-40);
      }
      .theme-picker input:focus-visible + label {
        outline: 2px solid var(--c-theme);
      }
      .theme-picker label[for^="appearance"] svg {
        width: 20px;
        height: 20px;
      }

      .theme-picker label[for^="appearance"] {
        width: 33.33333%;
      }
      .theme-picker label[for^="appearance"] > span:first-child {
        display: none;
      }

      .theme-picker label[for^="color"] {
        width: 20%;
      }
      .theme-picker label[for^="color"] span {
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
    </style>

    <theme-picker>
      <form class="theme-picker">
        <fieldset>
          <!-- <legend>Accent</legend> -->

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
        </fieldset>
        <fieldset>
          <!-- <legend>Appearance</legend> -->

          ${["system", "light", "dark"]
            .map((theme) => {
              const label = theme.charAt(0).toUpperCase() + theme.slice(1);
              return /*html*/ `
         <input type="radio" name="appearance" value="${theme}" id="appearance-${theme}"  />
         <label for="appearance-${theme}" title="${label}"><span>${label}</span>
         ${readFile(`./svgs/heroicon-${theme}.svg`)}</label>
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
