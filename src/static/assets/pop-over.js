// template for a web component name pop-over

class PopOver extends HTMLElement {
  static get observedAttributes() {
    return ["open"];
  }

  constructor() {
    super();
    this.$button = null;
    this.$root = null;
  }

  connectedCallback() {
    console.log("fired");
    this.$button = this.querySelector("button");
    this.$root = this.querySelector("div");
    this.$button.addEventListener("click", () => {
      console.log("click", this.open);
      this.open = !this.open;
      // this.dispatchEvent(new CustomEvent("open", { detail: this.open }));
    });

    document.body.addEventListener("click", (event) => {
      if (!this.contains(event.target)) {
        this.open = false;
      }
    });

    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(
      "attributeChangedCallback: name %s old %s new %s",
      name,
      oldValue,
      newValue
    );
    if (name === "open" && oldValue !== newValue) {
      this.open = newValue !== null;
    }
  }

  render() {
    this.$root.innerHTML = `<div>content</div>`;
  }

  get open() {
    return this.hasAttribute("open");
  }

  set open(open) {
    if (open) {
      this.setAttribute("open", "");
    } else {
      this.removeAttribute("open");
    }
  }
}

customElements.define("pop-over", PopOver);
