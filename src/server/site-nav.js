class SiteNav extends HTMLElement {
  constructor() {
    super();

    const links = Array.from(this.children);
    this.innerHTML = `
      <div class="dropdown">
        <button class="dropdown__trigger">
          <svg class="icon">
            <use xlink:href="#menu"></use>
          </svg>
        </button>
        <ul class="dropdown__overlay" hidden>
          ${links
            .map(
              ($a) => `
              <li>
                <a href="${$a.getAttribute("href")}">
                  ${$a.text}
                  <svg class="icon">
                    <use xlink:href="#${$a.getAttribute("data-svg-id")}"></use>
                  </svg>
                </a>
              </li>`
            )
            .join("")}
        </ul>
      </div>
    `;
  }

  connectedCallback() {
    const hideOpenDropdowns = () => {
      const $visibleOverlay = this.querySelector(
        ".dropdown__overlay:not([hidden])"
      );
      if ($visibleOverlay) {
        $visibleOverlay.setAttribute("hidden", true);
      }
    };

    const $overlay = this.querySelector(".dropdown__overlay");
    this.querySelector("button").addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if ($overlay.hasAttribute("hidden")) {
        hideOpenDropdowns();
        $overlay.removeAttribute("hidden");
      } else {
        $overlay.setAttribute("hidden", true);
      }
    });

    document.body.addEventListener("click", (e) => {
      hideOpenDropdowns();
    });
  }
}
customElements.define("site-nav", SiteNav);
