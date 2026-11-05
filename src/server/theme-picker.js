class ThemePicker extends HTMLElement {
  constructor() {
    super();

    let initialAppearance = window.theme.appearance.get();
    document
      .querySelector(`input[name=appearance][value=${initialAppearance}]`)
      ?.setAttribute("checked", "");

    let initialColor = window.theme.color.get();
    document
      .querySelector(`input[name=color][value=${initialColor}]`)
      ?.setAttribute("checked", "");
  }

  connectedCallback() {
    this.onThemeChange = () => {
      const appearance = window.theme.appearance.get();
      const color = window.theme.color.get();
      const appearanceInput = this.querySelector(
        `input[name=appearance][value="${appearance}"]`
      );
      const colorInput = this.querySelector(
        `input[name=color][value="${color}"]`
      );
      if (appearanceInput) appearanceInput.checked = true;
      if (colorInput) colorInput.checked = true;
    };
    window.addEventListener("themechange", this.onThemeChange);

    // Handle expanding/collapsing the color picker through the <form>
    this.addEventListener("click", (e) => {
      e.stopPropagation();

      if (e.target.name === "color") {
        const value = e.target.value;
        if (value !== window.theme.color.get()) {
          window.theme.color.set(value);
        }
      }

      if (e.target.name === "appearance") {
        const value = e.target.value;
        if (value !== window.theme.appearance.get()) {
          window.theme.appearance.set(value);
        }
      }
    });
  }

  disconnectedCallback() {
    window.removeEventListener("themechange", this.onThemeChange);
  }
}

customElements.define("theme-picker", ThemePicker);
