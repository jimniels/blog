class ThemePicker extends HTMLElement {
  connectedCallback() {
    this.colors = this.dataset.colors.split(" ");
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

      if (button.dataset.cycle === "color") {
        window.theme.color.set(
          nextValue(this.colors, window.theme.color.get())
        );
        this.animateColor();
      }
      this.render();
    });
  }

  disconnectedCallback() {
    window.removeEventListener("themechange", this.onThemeChange);
    this.colorAnimations?.forEach((animation) => animation.cancel());
  }

  animateColor() {
    this.colorAnimations?.forEach((animation) => animation.cancel());
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const svg = this.querySelector("[data-cycle=color] svg");
    const ink = this.querySelector("[data-ink]");
    const accent = getComputedStyle(ink).fill;
    const neutral = getComputedStyle(svg).color;
    const timing = { duration: 900, easing: "linear" };
    this.colorAnimations = [
      svg.animate(
        [
          { transform: "translateY(0) scale(1)", opacity: 1, offset: 0, easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" },
          { transform: "translateY(-2px) scale(1.06, 0.96)", opacity: 1, offset: 0.2, easing: "cubic-bezier(0.55, 0, 1, 0.45)" },
          { transform: "translateY(7px) scale(0.94, 1.08)", opacity: 1, offset: 0.34, easing: "cubic-bezier(0.4, 0, 1, 1)" },
          { transform: "translateY(18px) scale(0.9, 1.12)", opacity: 0, offset: 0.43 },
          { transform: "translateY(-2px) scale(0.88, 0.94)", opacity: 0, offset: 0.49, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
          { transform: "translateY(0) scale(1.015, 0.99)", opacity: 1, offset: 0.79, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
          { transform: "translateY(0) scale(1)", opacity: 1, offset: 1 },
        ],
        timing
      ),
      svg.animate(
        [
          { color: neutral, offset: 0 },
          { color: neutral, offset: 0.43 },
          { color: accent, offset: 0.49 },
          { color: accent, offset: 0.78, easing: "ease-out" },
          { color: neutral, offset: 1 },
        ],
        timing
      ),
      ink.animate(
        [
          { opacity: 0, offset: 0 },
          { opacity: 0, offset: 0.43 },
          { opacity: 0.7, offset: 0.49 },
          { opacity: 0.45, offset: 0.7, easing: "ease-out" },
          { opacity: 0, offset: 1 },
        ],
        timing
      ),
    ];
  }

  render() {
    const resolved = window.theme.appearance.resolved();
    const next = resolved === "dark" ? "light" : "dark";
    const color = window.theme.color.get();

    this.dataset.appearance = resolved;

    const appearanceButton = this.querySelector("[data-toggle=appearance]");
    const nextLabel = labelFor(next);
    appearanceButton.title = `Switch to ${nextLabel}`;
    appearanceButton.setAttribute("aria-label", `Switch to ${nextLabel}`);

    const colorButton = this.querySelector("[data-cycle=color]");
    const colorLabel = labelFor(color);
    colorButton.title = colorLabel;
    colorButton.setAttribute("aria-label", `Color: ${colorLabel}`);

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

customElements.define("theme-pickers", ThemePicker);
