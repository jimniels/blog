/**
 * Remove CSS
 * Add a query param `?noCSS` to strip out the CSS and apply real basic styles
 * Really just a novel thing for me to use as I please.
 */
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("noCSS")) {
  var cssNodes = document.querySelectorAll('head link[rel="stylesheet"]');
  for (i = 0; i < cssNodes.length; ++i) {
    document.head.removeChild(cssNodes[i]);
  }

  document.body.style.maxWidth = "35rem";
  document.body.style.margin = "0 auto";
  document.body.style.lineHeight = "1.5";
}
