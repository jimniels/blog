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

    // This gets set in Layout.js
    let initialAppearance = localStorage.getItem("theme-appearance");

    this.innerHTML = /*html*/ `
    
        <button class="trigger">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="pointer-events: none;">
            <path d="M11.998 2C17.515 2 21.995 6.48 21.995 11.998C21.995 17.515 17.515 21.995 11.998 21.995C6.48 21.995 2 17.515 2 11.998C2 6.48 6.48 2 11.998 2ZM11.998 3.5C7.308 3.5 3.5 7.308 3.5 11.998C3.5 16.688 7.308 20.495 11.998 20.495V3.5Z" fill="currentColor"/>
          </svg>
        </button>
        <div class="options">
        <form>
        <div>
        ${colors
          .map(
            (color) => /*html*/ `
            
            <input type="radio" name="color" value="${color}" id="color-${color}" ${
              color === initialColor ? "checked" : ""
            } />
            <label
              id="color-${color}"
              for="color-${color}"
              style="background-color: hsl(var(--c-${color}-h) var(--c-${color}-s) var(--c-${color}-l))"
            >${color}</label> 
        `
          )
          .join("")}
          </div>
          <div>
            <input type="radio" name="appearance" value="light" id="appearance-light" ${
              initialAppearance === "light" ? "checked" : ""
            } />
            <label for="appearance-light">Light</label>

            <input type="radio" name="appearance" value="dark" id="appearance-dark" ${
              initialAppearance === "dark" ? "checked" : ""
            } />
            <label for="appearance-dark">Dark</label>

            <input type="radio" name="appearance" value="system" id="appearance-system" ${
              initialAppearance === "system" ? "checked" : ""
            } />
            <label for="appearance-system">System</label>
            
          </div>
          </form>
        </div>
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

      if (e.target.classList.contains("trigger")) {
        console.log("trigger");
        this.toggleVisibility();
      }
      // If it's an <button>
      if (e.target.name === "color") {
        // If we're setting a new value, set it
        if (e.target.value !== localStorage.getItem("theme-color")) {
          const color = e.target.value;
          this.setColor(color);
          Array.from(this.querySelectorAll(`button`)).forEach((button) => {
            button.setAttribute("aria-pressed", button.value === color);
          });
        }
        // Toggle visibility of options
        // this.toggleVisibility();
      }
      if (e.target.name === "appearance") {
        const appearance = e.target.value;
        this.setTheme(appearance);
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

  setTheme(theme) {
    localStorage.setItem("theme-appearance", theme);
    const isSystemDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    document.documentElement.setAttribute(
      "data-dark-mode",
      theme === "dark" || (theme === "system" && isSystemDarkMode)
        ? "true"
        : "false"
    );
  }
}

customElements.define("theme-picker", ThemePicker);

// add event listener when system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    const theme = localStorage.getItem("theme-appearance");
    if (theme === "system") {
      document.documentElement.setAttribute(
        "data-dark-mode",
        e.matches ? "true" : "false"
      );
    }
  });
