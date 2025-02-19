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

class ThemePicker extends HTMLElement {
  constructor() {
    super();

    this.details = this.querySelector("details");
    if (!this.details) {
      throw new Error("Theme picker must have a details element");
    }

    // This gets set in Layout.js
    let initialAppearance = localStorage.getItem("theme-appearance");
    if (!["system", "light", "dark"].includes(initialAppearance)) {
      initialAppearance = "system";
    }
    document
      .querySelector(`input[name=appearance][value=${initialAppearance}]`)
      .setAttribute("checked", "");
    this.setTheme(initialAppearance);

    let initialColor = localStorage.getItem("theme-color");
    if (!colors.includes(initialColor)) {
      initialColor = "blue";
    }
    this.setColor(initialColor);
    document
      .querySelector(`input[name=color][value=${initialColor}]`)
      .setAttribute("checked", "");
  }

  connectedCallback() {
    // Handle clicking outside the color picker to collapse it
    document.documentElement.addEventListener("click", (e) => {
      if (this.details.open) {
        this.toggleVisibility();
      }
    });
    // Handle expanding/collapsing the color picker through the <form>
    this.addEventListener("click", (e) => {
      e.stopPropagation();

      if (e.target.name === "color") {
        // If we're setting a new value, set it
        if (e.target.value !== localStorage.getItem("theme-color")) {
          const color = e.target.value;
          this.setColor(color);
        }
      }

      if (e.target.name === "appearance") {
        const appearance = e.target.value;
        this.setTheme(appearance);
      }
    });
  }

  toggleVisibility() {
    if (this.details.open) {
      this.details.open = false;
    } else {
      this.details.open = true;
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

  setTheme(theme) {
    console.log("setTheme", theme);
    localStorage.setItem("theme-appearance", theme);
    // const isSystemDarkMode = window.matchMedia(
    //   "(prefers-color-scheme: dark)"
    // ).matches;

    if (theme === "system") {
      // TODO remove

      document.documentElement.removeAttribute("data-theme-appearance");
    } else {
      document.documentElement.setAttribute("data-theme-appearance", theme);
    }
    // document.documentElement.setAttribute(
    //   "data-dark-mode",
    // theme === "dark" || (theme === "system" && isSystemDarkMode)
    //   ? "true"
    //   : "false"
    // );
  }
}

customElements.define("theme-picker", ThemePicker);
