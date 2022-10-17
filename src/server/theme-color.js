// Pulled from the CSS theme variables
const colors = [
  "blue",
  "red",
  "green",
  "yellow",
  "purple",
  // "pink",
  // "none",
  // "orange",
  // not supported as UI themes—yet
  // "mint",
  // "teal",
  // "cyan",
  // "brown",
  // "indigo",
];

/*
 * This is present on every page where the theme is supported. If you want to
 * change the theme of the page you're on, change the `color` attribute
 * to one of the supported colors.
 */
class ThemeColor extends HTMLElement {
  connectedCallback() {
    let initialColor = localStorage.getItem("theme-color");
    console.log("Initial theme color in memory:", initialColor);
    this.setAttribute("value", initialColor);

    this.setAttribute("supported-values", colors.join(" "));
    // this.setColor(initialColor);
  }

  static get observedAttributes() {
    return ["value"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "value") {
      if (colors.includes(newValue)) {
        console.log("Change theme color to:", newValue);
        this.setColor(newValue);
      } else {
        this.setAttribute("value", "blue");
      }
    }
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

customElements.define("theme-color", ThemeColor);
