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

      theme-pickers [data-toggle] {
        display: grid;
        place-items: center;
      }
      theme-pickers [data-toggle] > span {
        grid-area: 1 / 1;
        transform-origin: center;
      }
      theme-pickers .theme-moon,
      theme-pickers .theme-close {
        opacity: 0;
        transform: rotate(-35deg) scale(0.65);
      }
      theme-pickers[data-appearance="dark"] .theme-sun,
      theme-pickers[data-colors-open] .theme-eyedropper {
        opacity: 0;
        transform: rotate(35deg) scale(0.65);
      }
      theme-pickers[data-appearance="dark"] .theme-moon,
      theme-pickers[data-colors-open] .theme-close {
        opacity: 1;
        transform: rotate(0deg) scale(1);
      }
      theme-pickers[data-ready] [data-toggle] > span {
        transition: transform 350ms ease-out, opacity 250ms ease-out;
      }

      /* Toggle sits on the right, swatches grow out to its left */
      theme-pickers .theme-colors {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
      }
      theme-pickers .theme-swatches {
        display: grid;
        grid-template-columns: 0fr;
        opacity: 0;
      }
      theme-pickers[data-colors-open] .theme-swatches {
        grid-template-columns: 1fr;
        opacity: 1;
      }
      theme-pickers[data-ready] .theme-swatches {
        transition: grid-template-columns 300ms ease-out, opacity 250ms ease-out;
      }
      theme-pickers .theme-swatches > div {
        display: flex;
        min-width: 0;
        overflow: hidden;
      }
      theme-pickers button[data-color] {
        flex-shrink: 0;
        width: var(--s-32);
      }
      theme-pickers button[data-color]:focus-visible {
        outline-offset: -2px;
      }
      theme-pickers button[data-color] span {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: var(--swatch);
      }
      theme-pickers button[data-color][aria-pressed="true"] span {
        box-shadow: 0 0 0 2px var(--c-bg), 0 0 0 4px var(--swatch);
      }

      @media (prefers-reduced-motion: reduce) {
        theme-pickers[data-ready] [data-toggle] > span,
        theme-pickers[data-ready] .theme-swatches {
          transition: none;
        }
      }
    </style>
    <theme-pickers>
      <div class="theme-colors">
        <button
          type="button"
          data-toggle="colors"
          aria-expanded="false"
          aria-controls="theme-swatches"
          aria-label="Change color"
          title="Change color"
        >
          <span class="theme-eyedropper" aria-hidden="true">${Icon("heroicon-eyedropper")}</span>
          <span class="theme-close" aria-hidden="true">${Icon("heroicon-close")}</span>
        </button>
        <div class="theme-swatches" id="theme-swatches" inert>
          <div>
            ${colors.map(
              (color) => html`
                <button
                  type="button"
                  data-color="${color}"
                  aria-pressed="false"
                  aria-label="${labelFor(color)}"
                  title="${labelFor(color)}"
                  style="--swatch: hsl(var(--c-${color}-h) var(--c-${color}-s) var(--c-${color}-l))"
                >
                  <span></span>
                </button>
              `
            )}
          </div>
        </div>
      </div>
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

/**
 * @param {string} value
 */
function labelFor(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
