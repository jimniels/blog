class ThemePicker extends HTMLElement {
  connectedCallback() {
    this.render();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => this.setAttribute("data-ready", ""));
    });

    this.onThemeChange ||= () => this.render();
    window.addEventListener("themechange", this.onThemeChange);
    if (this.bound) return;
    this.bound = true;

    this.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;

      if (button.dataset.toggle === "appearance") {
        window.theme.appearance.toggle();
      }

      if (button.dataset.toggle === "colors") {
        this.toggleAttribute("data-colors-open");
      }

      if (button.dataset.color) {
        window.theme.color.set(button.dataset.color);
      }
      this.render();
    });

    this.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !this.hasAttribute("data-colors-open")) {
        return;
      }
      this.removeAttribute("data-colors-open");
      this.render();
      this.querySelector("[data-toggle=colors]").focus();
    });
  }

  disconnectedCallback() {
    window.removeEventListener("themechange", this.onThemeChange);
  }

  render() {
    const resolved = window.theme.appearance.resolved();
    const next = resolved === "dark" ? "light" : "dark";
    const color = window.theme.color.get();
    const colorsOpen = this.hasAttribute("data-colors-open");

    this.dataset.appearance = resolved;

    const appearanceButton = this.querySelector("[data-toggle=appearance]");
    const nextLabel = labelFor(next);
    appearanceButton.title = `Switch to ${nextLabel}`;
    appearanceButton.setAttribute("aria-label", `Switch to ${nextLabel}`);

    const colorsButton = this.querySelector("[data-toggle=colors]");
    const colorsLabel = colorsOpen ? "Close color picker" : "Change color";
    colorsButton.title = colorsLabel;
    colorsButton.setAttribute("aria-label", colorsLabel);
    colorsButton.setAttribute("aria-expanded", String(colorsOpen));
    this.querySelector(".theme-swatches").inert = !colorsOpen;

    this.querySelectorAll("[data-color]").forEach((swatch) => {
      swatch.setAttribute("aria-pressed", String(swatch.dataset.color === color));
    });
  }
}

/**
 * @param {string} value
 */
function labelFor(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

customElements.define("theme-pickers", ThemePicker);
