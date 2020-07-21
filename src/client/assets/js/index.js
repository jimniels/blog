import "https://cdn.jsdelivr.net/gh/jimniels/css-naked@0.1.0/css-naked.js";

// Blog post pages only!
if (location.pathname.startsWith("/20")) {
  import("./post-images.js");
}
