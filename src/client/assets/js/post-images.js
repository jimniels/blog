/**
 * Image Captions
 * Find all the images in a post, grab their alt tags, and set it
 * as a caption to each image.
 */
Array.from(document.querySelectorAll(".markdown img")).forEach(($img) => {
  // https://plainjs.com/javascript/manipulation/wrap-an-html-structure-around-an-element-28/
  const $parent = $img.parentNode;
  if ($parent.tagName === "P") {
    $parent.classList.add("image-container");
  }

  const $caption = document.createElement("span");
  $caption.textContent = $img.getAttribute("alt");
  $caption.styles;
  $parent.appendChild($caption);
});
