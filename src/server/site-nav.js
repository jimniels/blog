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

console.log("fired");

class SiteNav extends HTMLElement {
  constructor() {
    super();

    let initialColor = localStorage.getItem("theme-color");
    if (!colors.includes(initialColor)) {
      initialColor = "blue";
    }
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
    // Handle clicking outside the color picker to collapse it
    document.documentElement.addEventListener("click", (e) => {
      if (this.$form.classList.contains("is-expanded")) {
        this.toggleVisibility();
      }
    });
    // Handle expanding/collapsing the color picker through the <form>
    this.$form.addEventListener("click", (e) => {
      e.stopPropagation();
      // If it's an <input>
      if (e.target.value) {
        // If we're setting a new value, set it
        if (e.target.value !== localStorage.getItem("theme-color")) {
          const color = e.target.value;
          this.setColor(color);
        }
        // Toggle visibility of options
        this.toggleVisibility();
      }
    });
  }

  toggleVisibility() {
    if (this.$form.classList.contains("is-expanded")) {
      this.$form.classList.remove("is-expanded");
    } else {
      this.$form.classList.add("is-expanded");
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

customElements.define("site-nav", SiteNav);
