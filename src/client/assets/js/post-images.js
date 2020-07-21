/**
 * Image Captions
 * Find all the images in a post, grab their alt tags, and set it
 * as a caption to each image.
 */
const $style = document.createElement("style");
$style.innerHTML = `
.markdown .image-container {
  max-width: none;
}
.markdown .image-container span {
  font-size: 0.85rem;
  font-style: italic;
  opacity: 0.5;
  max-width: 35rem;
  display: block;
  margin-top: calc(2rem - 1.618rem);
}
`;
document.body.appendChild($style);

Array.from(document.querySelectorAll(".markdown img")).forEach(($img) => {
  // https://plainjs.com/javascript/manipulation/wrap-an-html-structure-around-an-element-28/
  const $parent = $img.parentNode;
  if ($parent.tagName === "P") {
    $parent.classList.add("image-container");
  }

  // const $caption = document.createElement("span");
  // $caption.textContent = $img.getAttribute("alt");
  // $caption.styles;
  // $wrapper.appendChild($caption);
});
