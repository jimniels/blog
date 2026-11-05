import { Icon } from "./Icon.js";
import { html, readFile } from "./utils.js";

// Same color options as ThemePicker.js
const colors = ["red", "blue", "green", "yellow", "purple"];

export default function FooterTheme() {
  return html`
    <style>
      footer-theme {
        display: flex;
        gap: var(--s-8);
        justify-content: end;
      }

      footer-theme button {
        appearance: none;
        margin: 0;
        border: none;
        background: transparent;
        color: var(--c-text);
        border-radius: var(--border-radius);
        width: var(--s-40);
        height: var(--s-40);
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      footer-theme button:hover {
        background: var(--c-fg);
      }

      footer-theme svg {
        width: 18px;
        height: 18px;
        display: block;
      }

      footer-theme [data-swatch] {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: hsl(var(--c-red-h) var(--c-red-s) var(--c-red-l));
      }
    </style>
    <footer-theme data-colors="${colors.join(" ")}">
      <button type="button" data-toggle="appearance" aria-label="Appearance">
        ${["light", "dark"]
          .map((theme, i) => {
            return /*html*/ `
              <span data-icon="${theme}" ${i === 0 ? "" : "hidden"}>
                ${Icon(`heroicon-${theme}`)}
              </span>
            `;
          })
          .join("")}
      </button>
      <button type="button" data-cycle="color" aria-label="Color">
        <span data-swatch></span>
      </button>
    </footer-theme>
    <script>
      ${readFile("./footer-theme.js")};
    </script>
  `;
}
