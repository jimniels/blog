import "./remove-css.js";

// Blog post pages only!
if (location.pathname.startsWith("/20")) {
  import("./image-captions.js");
}
