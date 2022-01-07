// Pulled from the CSS theme variables
const colors = [
  "blue",
  "red",
  "green",
  "yellow",
  "pink",
  "purple",
  "orange",
  // not supported as UI themes—yet
  // "mint",
  // "teal",
  // "cyan",
  // "brown",
  // "indigo",
];

class SiteNav extends HTMLElement {
  constructor() {
    super();

    let initialColor = localStorage.getItem("theme-color") || "blue";
    this.setColor(initialColor);

    const links = Array.from(this.children);
    const homeLink = links.filter((el) => el.getAttribute("href") === "/")[0];
    const otherLinks = links.filter((el) => el.getAttribute("href") !== "/");

    this.setAttribute("has-js", true);

    this.innerHTML = /*html*/ `
      <div class="sn-top">
        ${homeLink.outerHTML}
        <button aria-label="Menu">
          <svg class="icon">
            <use xlink:href="#menu"></use>
          </svg>
        </button>
      </div>
      <div class="sn-bottom">
        <div class="sn-bottom-section">
          <h5>Menu</h5>
          <ul>
            ${otherLinks
              .map(($a) => /*html*/ `<li>${$a.outerHTML}</li>`)
              .join("")}
          </ul>
        </div>
        <div class="sn-bottom-section">
          <h5>Theme</h5>
          <form class="sn-color-picker">
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
                  for="color-${color}"
                  style="background-color: hsl(var(--c-theme-${color}))">
                  ${color}
                </label>
            `
              )
              .join("")}
          </form>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    const $button = this.querySelector('button[aria-label="Menu"]');
    const $use = $button.querySelector("svg use");
    $button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (this.hasAttribute("open")) {
        this.removeAttribute("open");
        $use.setAttribute("xlink:href", "#menu");
      } else {
        this.setAttribute("open", true);
        $use.setAttribute("xlink:href", "#menu-close");
      }
    });

    document
      .querySelector(".sn-color-picker")
      .addEventListener("change", (e) => {
        const color = e.target.value;
        this.setColor(color);
      });
  }

  setColor(color) {
    localStorage.setItem("theme-color", color);
    document.documentElement.style.setProperty(
      `--c-primary`,
      `hsl(var(--c-theme-${color}))`
    );
  }
}

customElements.define("site-nav", SiteNav);
