/**
 * CSS Naked
 * Add a query param `?css-naked` to strip out any stylesheets linked in the
 * <head> of the document. Really just a novel thing for me to use as I please.
 */

let cssNaked = window.localStorage.getItem("css-naked") === "true";
if (new URLSearchParams(window.location.search).has("css-naked")) {
  cssNaked = true;
  window.localStorage.setItem("css-naked", "true");
}

if (cssNaked) {
  Array.from(document.querySelectorAll('head link[rel="stylesheet"]')).forEach(
    ($node) => {
      document.head.removeChild($node);
    }
  );

  const $alert = document.createElement("div");
  $alert.innerHTML = [
    "You are viewing this site without any CSS.",
    "Any day can be <a href='https://css-naked-day.github.io/'>CSS naked day</a>!",
    "Want to flip back to the normal view?",
    "<a href='./' id='naked-css-toggle'>Click here</a>.",
  ].join(" ");
  $alert.style.cssText = `
    background: lightyellow;
    padding: 5px;
    margin: 15px 0;
  `;
  $alert.querySelector("#naked-css-toggle").addEventListener("click", (e) => {
    e.preventDefault();
    window.localStorage.setItem("css-naked", "false");
    window.location.href = window.location.href.split("?")[0];
  });
  document.body.prepend($alert);
}
