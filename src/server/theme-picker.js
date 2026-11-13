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

      if (button.dataset.toggle === "settings") {
        this.toggleAttribute("data-open");
      }

      if (button.dataset.color) {
        window.theme.color.set(button.dataset.color);
      }
      this.render();
    });

    this.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !this.hasAttribute("data-open")) {
        return;
      }
      this.removeAttribute("data-open");
      this.render();
      this.querySelector("[data-toggle=settings]").focus();
    });
  }

  disconnectedCallback() {
    window.removeEventListener("themechange", this.onThemeChange);
  }

  render() {
    const resolved = window.theme.appearance.resolved();
    const next = resolved === "dark" ? "light" : "dark";
    const color = window.theme.color.get();
    const open = this.hasAttribute("data-open");

    this.dataset.appearance = resolved;

    const appearanceButton = this.querySelector("[data-toggle=appearance]");
    const nextLabel = labelFor(next);
    appearanceButton.title = `Switch to ${nextLabel}`;
    appearanceButton.setAttribute("aria-label", `Switch to ${nextLabel}`);

    const settingsButton = this.querySelector("[data-toggle=settings]");
    const settingsLabel = open ? "Close theme settings" : "Theme settings";
    settingsButton.title = settingsLabel;
    settingsButton.setAttribute("aria-label", settingsLabel);
    settingsButton.setAttribute("aria-expanded", String(open));
    this.querySelector(".theme-panel").inert = !open;

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
