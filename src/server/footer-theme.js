class FooterTheme extends HTMLElement {
  connectedCallback() {
    this.colors = this.dataset.colors.split(" ");
    this.render();

    if (this.bound) return;
    this.bound = true;

    this.onThemeChange = () => this.render();
    window.addEventListener("themechange", this.onThemeChange);

    this.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;

      if (button.dataset.toggle === "appearance") {
        window.theme.appearance.toggle();
      }

      if (button.dataset.cycle === "color") {
        window.theme.color.set(
          nextValue(this.colors, window.theme.color.get())
        );
      }
    });
  }

  disconnectedCallback() {
    window.removeEventListener("themechange", this.onThemeChange);
  }

  render() {
    const resolved = window.theme.appearance.resolved();
    const next = resolved === "dark" ? "light" : "dark";
    const color = window.theme.color.get();

    this.querySelectorAll("[data-icon]").forEach((icon) => {
      icon.toggleAttribute("hidden", icon.dataset.icon !== resolved);
    });

    const appearanceButton = this.querySelector("[data-toggle=appearance]");
    const nextLabel = labelFor(next);
    appearanceButton.title = `Switch to ${nextLabel}`;
    appearanceButton.setAttribute("aria-label", `Switch to ${nextLabel}`);

    const colorButton = this.querySelector("[data-cycle=color]");
    const colorLabel = labelFor(color);
    colorButton.title = colorLabel;
    colorButton.setAttribute("aria-label", `Color: ${colorLabel}`);

    this.querySelector("[data-swatch]").style.backgroundColor =
      `hsl(var(--c-${color}-h) var(--c-${color}-s) var(--c-${color}-l))`;
  }
}

/**
 * @param {string[]} values
 * @param {string} current
 */
function nextValue(values, current) {
  const index = values.indexOf(current);
  return values[(index + 1) % values.length];
}

/**
 * @param {string} value
 */
function labelFor(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

customElements.define("footer-theme", FooterTheme);
