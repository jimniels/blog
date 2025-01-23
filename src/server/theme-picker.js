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

    // This gets set in Layout.js
    let initialAppearance = localStorage.getItem("theme-appearance");

    let initialColor = localStorage.getItem("theme-color");
    if (!colors.includes(initialColor)) {
      initialColor = "blue";
    }
    this.setColor(initialColor);

    // this.innerHTML = /*html*/ `

    //   <form>
    //     <fieldset class="tp-colors">
    //     ${colors
    //       .map(
    //         (color) => /*html*/ `
    //         <input type="radio" name="color" value="${color}" id="color-${color}" ${
    //           color === initialColor ? "checked" : ""
    //         } />
    //         <label
    //           id="color-${color}"
    //           for="color-${color}"
    //         ><span style="background-color: hsl(var(--c-${color}-h) var(--c-${color}-s) var(--c-${color}-l))">${color}</span></label>
    //     `
    //       )
    //       .join("")}
    //     </fieldset>
    //     <fieldset class="tp-themes">
    //     ${["system", "light", "dark"]
    //       .map((theme) => {
    //         const label = theme.charAt(0).toUpperCase() + theme.slice(1);
    //         return /*html*/ `
    //         <input type="radio" name="appearance" value="${theme}" id="appearance-${theme}" ${
    //           initialAppearance === theme ? "checked" : ""
    //         } />
    //         <label for="appearance-${theme}" title="${label}"><span>${label}</span></label>
    //         `;
    //       })
    //       .join("")}
    //     </fieldset>
    //   </form>

    // `;
  }

  connectedCallback() {
    // Handle clicking outside the color picker to collapse it
    // document.documentElement.addEventListener("click", (e) => {
    //   if (this.hasAttribute("open")) {
    //     this.toggleVisibility();
    //   }
    // });
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
    if (this.hasAttribute("open")) {
      this.removeAttribute("open");
    } else {
      this.setAttribute("open", "");
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

// add event listener when system theme changes
// window
//   .matchMedia("(prefers-color-scheme: dark)")
//   .addEventListener("change", (e) => {
//     const theme = localStorage.getItem("theme-appearance");
//     if (theme === "system") {
//       document.documentElement.setAttribute(
//         "data-dark-mode",
//         e.matches ? "true" : "false"
//       );
//     }
//   });
