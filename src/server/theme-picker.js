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

    this.setAttribute("role", "group");
    this.setAttribute("aria-label", "Toggle buttons");

    let initialColor = localStorage.getItem("theme-color");
    if (!colors.includes(initialColor)) {
      initialColor = "blue";
    }
    this.setColor(initialColor);

    this.innerHTML = /*html*/ `
        ${colors
          .map(
            (color) => /*html*/ `
            <button
              id="color-${color}"
              value="${color}"
              aria-label="${color}"
              aria-pressed="${color === initialColor}"
              style="background-color: hsl(var(--c-${color}-h) var(--c-${color}-s) var(--c-${color}-l))"
            >${color}</button> 
        `
          )
          .join("")}
    `;
  }

  connectedCallback() {
    // Handle clicking outside the color picker to collapse it
    document.documentElement.addEventListener("click", (e) => {
      if (this.classList.contains("is-expanded")) {
        this.toggleVisibility();
      }
    });
    // Handle expanding/collapsing the color picker through the <form>
    this.addEventListener("click", (e) => {
      e.stopPropagation();
      // If it's an <button>
      if (e.target.value) {
        // If we're setting a new value, set it
        if (e.target.value !== localStorage.getItem("theme-color")) {
          const color = e.target.value;
          this.setColor(color);
          Array.from(this.querySelectorAll(`button`)).forEach((button) => {
            button.setAttribute("aria-pressed", button.value === color);
          });
        }
        // Toggle visibility of options
        this.toggleVisibility();
      }
    });
  }

  toggleVisibility() {
    if (this.classList.contains("is-expanded")) {
      this.classList.remove("is-expanded");
    } else {
      this.classList.add("is-expanded");
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

customElements.define("theme-picker", ThemePicker);
