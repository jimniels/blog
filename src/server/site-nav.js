// Pulled from the CSS theme variables
const colors = [
  "blue",
  "red",
  "green",
  "yellow",
  // "pink",
  "purple",
  "none",
  // "orange",
  // not supported as UI themes—yet
  // "mint",
  // "teal",
  // "cyan",
  // "brown",
  // "indigo",
];

class SiteNav extends HTMLElement {
  constructor() {
    super();

    let initialColor = localStorage.getItem("theme-color") || "blue";
    this.setColor(initialColor);

    this.$form = document.createElement("form");
    this.$form.innerHTML = /*html*/ `
        ${colors
          .map(
            (color) => /*html*/ `
            <input
              id="color-${color}"
              type="radio"
              name="color"
              value="${color}"
              ${color === initialColor ? "checked" : ""}
            >
            <label
              title="${color}"
              for="color-${color}"
              style="background-color: hsl(var(--c-${color}-h) var(--c-${color}-s) var(--c-${color}-l))">
              ${color}
            </label>
        `
          )
          .join("")}
    `;
    this.appendChild(this.$form);
  }

  connectedCallback() {
    this.querySelector("form").addEventListener("change", (e) => {
      const color = e.target.value;
      this.setColor(color);
    });
  }

  setColor(color) {
    localStorage.setItem("theme-color", color);
    document.documentElement.style.setProperty(
      `--c-theme-h`,
      `var(--c-${color}-h)`
    );
    document.documentElement.style.setProperty(
      `--c-theme-s`,
      `var(--c-${color}-s)`
    );
    document.documentElement.style.setProperty(
      `--c-theme-l`,
      `var(--c-${color}-l)`
    );
  }
}

customElements.define("site-nav", SiteNav);
