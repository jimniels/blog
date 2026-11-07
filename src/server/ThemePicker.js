import { Icon } from "./Icon.js";
import { html, readFile } from "./utils.js";

// Available accent colors from the CSS theme variables.
const colors = ["red", "blue", "green", "yellow", "purple"];

export default function ThemePicker() {
  return html`
    <style>
      theme-pickers {
        display: flex;
        gap: var(--s-8);
        justify-content: end;
        padding-right: var(--s-16);
        margin-right: var(--s-8);
        border-right: 1px solid var(--c-border);
      }

      theme-pickers button {
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

      @media (hover: hover) and (pointer: fine) {
        theme-pickers button:hover {
          background: var(--c-bg-opaque);
        }
      }

      theme-pickers svg {
        width: 24px;
        height: 24px;
        display: block;
      }

      theme-pickers [data-toggle="appearance"] {
        display: grid;
        place-items: center;
      }
      theme-pickers .theme-sun,
      theme-pickers .theme-moon {
        grid-area: 1 / 1;
        transform-origin: center;
      }
      theme-pickers .theme-moon {
        opacity: 0;
        transform: rotate(-35deg) scale(0.65);
      }
      theme-pickers[data-appearance="dark"] .theme-sun {
        opacity: 0;
        transform: rotate(35deg) scale(0.65);
      }
      theme-pickers[data-appearance="dark"] .theme-moon {
        opacity: 1;
        transform: rotate(0deg) scale(1);
      }
      theme-pickers[data-ready] .theme-sun,
      theme-pickers[data-ready] .theme-moon {
        transition: transform 350ms ease-out, opacity 250ms ease-out;
      }
      theme-pickers [data-ink] {
        fill: var(--c-theme);
        opacity: 0;
      }
      theme-pickers [data-cycle="color"] svg {
        transform-origin: center;
      }
      @media (prefers-reduced-motion: reduce) {
        theme-pickers[data-ready] .theme-sun,
        theme-pickers[data-ready] .theme-moon {
          transition: none;
        }
      }
    </style>
    <theme-pickers data-colors="${colors.join(" ")}">
      <button type="button" data-cycle="color" aria-label="Color">
        ${Icon("water-drop").replace(
          "<path",
          '<path data-ink d="M12 4.65C9.03 7.38 6 10.5 6 13.8C6 17.4 8.4 20 12 20S18 17.4 18 13.8C18 10.5 14.98 7.38 12 4.65Z"/><path'
        )}
      </button>
      <button type="button" data-toggle="appearance" aria-label="Appearance">
        <span class="theme-sun" aria-hidden="true">${Icon("heroicon-light")}</span>
        <span class="theme-moon" aria-hidden="true">${Icon("heroicon-dark")}</span>
      </button>
    </theme-pickers>
    <script type="module">
      ${readFile("./theme-picker.js")};
    </script>
  `;
}
