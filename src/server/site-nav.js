class SiteNav extends HTMLElement {
  constructor() {
    super();

    const links = Array.from(this.children);
    console.log(links);
    this.innerHTML = /*html*/ `
      <button aria-label="Menu">
        <svg class="icon">
          <use xlink:href="#menu"></use>
        </svg>
      </button>
      <ul hidden>
        ${links
          .map(
            ($a) => /*html*/ `
            <li>
              <a href="${$a.getAttribute("href")}">
                ${$a.textContent}
                  <svg class="icon">
                    <use xlink:href="#${$a.getAttribute("data-icon-id")}"></use>
                  </svg>
              </a>
            </li>`
          )
          .join("")}
      </ul>
    `;
  }

  connectedCallback() {
    const $dropdown = this.querySelector("site-nav ul");
    this.querySelector("button").addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if ($dropdown.hasAttribute("hidden")) {
        $dropdown.removeAttribute("hidden");
      } else {
        $dropdown.setAttribute("hidden", true);
      }
    });

    document.body.addEventListener("click", (e) => {
      const $visibleDropdown = this.querySelector("ul:not([hidden])");
      if ($visibleDropdown) {
        $visibleDropdown.setAttribute("hidden", true);
      }
    });
  }
}
customElements.define("site-nav", SiteNav);
