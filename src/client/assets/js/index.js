import "./css-naked.js";

// Blog post pages only!
if (location.pathname.startsWith("/20")) {
  import("./post-images.js");
}
