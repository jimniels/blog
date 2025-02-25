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
}

customElements.define("theme-picker", ThemePicker);
