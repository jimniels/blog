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
     * Light or dark value actually painted, resolving "system" against the OS.
     * @returns {"light" | "dark"}
     */
    resolved: () => {
      const appearance = window.theme.appearance.get();
      if (appearance === "light" || appearance === "dark") return appearance;
      return systemAppearance();
    },
    /**
     * Flip whatever is on screen. If that matches the OS, drop the override
     * and follow the system again. That comparison happens only on click.
     */
    toggle: () => {
      const next = window.theme.appearance.resolved() === "dark" ? "light" : "dark";
      window.theme.appearance.set(next === systemAppearance() ? "system" : next);
    },
    /**
     * @param {string} value
     */
    set: (value) => {
      localStorage.setItem("theme-appearance", value);
      applyAppearance(value);
    },
  },
  color: {
    get: () => {
      let color = localStorage.getItem("theme-color") || "";
      if (!color) {
        color = "red";
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
      emitThemeChange();
    },
  },
};

function emitThemeChange() {
  window.dispatchEvent(new Event("themechange"));
}

/** @returns {"light" | "dark"} */
function systemAppearance() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * @param {string} value
 */
function applyAppearance(value) {
  document.documentElement.setAttribute(
    "data-theme-appearance",
    value === "system" ? systemAppearance() : value
  );
  updateMeta();
  emitThemeChange();
}

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
  .addEventListener("change", () => {
    // An explicit light/dark choice stays put when the OS changes,
    // even if it now matches the system.
    if (window.theme.appearance.get() === "system") {
      applyAppearance("system");
    }
  });

// Handle 'back' button if you came from the menu and changed something
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    // Page loaded from bfcache (back/forward button)
    window.theme.appearance.set(window.theme.appearance.get());
    window.theme.color.set(window.theme.color.get());
  }
});
