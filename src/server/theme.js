// Create on the global for use by the theme picker
window.theme = {
  appearance: {
    /**
     * @returns {string}
     */
    get: () => {
      let appearance = localStorage.getItem("theme-appearance") || "";
      if (!["system", "light", "dark"].includes(appearance)) {
        appearance = "system";
      }
      return appearance;
    },
    /**
     * @param {string} value
     */
    set: (value) => {
      localStorage.setItem("theme-appearance", value);
      if (value === "system") {
        // TODO remove

        document.documentElement.setAttribute(
          "data-theme-appearance",
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
        );
      } else {
        document.documentElement.setAttribute("data-theme-appearance", value);
      }

      updateMeta();
    },
  },
  color: {
    get: () => {
      let color = localStorage.getItem("theme-color") || "";
      if (!color) {
        color = "blue";
      }
      return color;
    },
    /**
     * @param {string} color
     */
    set: (color) => {
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
      updateMeta();
    },
  },
};

// create this <meta name="theme-color" content="#4285f4" />
function updateMeta() {
  /** @type {HTMLMetaElement | null} */
  let $el = document.querySelector("meta[name=theme-color]");

  // Use the root element's background color
  const themeBgColor = getComputedStyle(
    document.documentElement
  ).backgroundColor;

  // If it's already in the DOM, update it. Otherwise create and insert it.
  if ($el) {
    $el.content = themeBgColor;
  } else {
    $el = document.createElement("meta");
    $el.name = "theme-color";
    $el.content = themeBgColor;
    document.head.appendChild($el);
  }
}

// Initialization

// Set the initial theme
window.theme.appearance.set(window.theme.appearance.get());
window.theme.color.set(window.theme.color.get());

// Watch for system changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (window.theme.appearance.get() === "system") {
      document.documentElement.setAttribute(
        "data-theme-appearance",
        e.matches ? "dark" : "light"
      );
    }
  });
