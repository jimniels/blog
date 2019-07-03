/**
 * Image Container
 * Set images to full-width with captions
 */

var images = document.querySelectorAll('#js-post-content > p img');
// console.log(images);
for (var i = 0; i < images.length; i++) {
  var parentEl = images[i].parentNode; // not sure if we need to traverse all the way up for a <p> ?
  parentEl.classList.add('image-container');

  var caption = images[i].getAttribute('title');
  if (caption) {
    var captionSpan = document.createElement('SPAN');
    var captionText = document.createTextNode(caption);
    captionSpan.appendChild(captionText);
    parentEl.appendChild(captionSpan);
  }
}

/**
 * Remove CSS
 * Add a query param `?noCSS` to strip out the CSS and apply real basic styles
 * Really just a novel thing for me to use as I please.
 */
var urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('noCSS')) {
  var cssNodes = document.querySelectorAll('head link[rel="stylesheet"]');
  for (i = 0; i < cssNodes.length; ++i) {
    document.head.removeChild(cssNodes[i]);
  }

  document.body.style.maxWidth = "35rem";
  document.body.style.margin = "0 auto";
  document.body.style.lineHeight = "1.5"
}

/**
 * Theme Toolbar
 * Creates an input for toggling the dark theme
 *
 * Note: addThemeClass() is defined inline at start of document. This helps
 * prevent a 'theme' flicker between page loads.
 */
/*
var isDarkMode = localStorage.getItem('darkMode') === 'true' ? true : false;
var $ul = document.querySelector('header nav ul');
var $li = document.createElement('li');

$li.innerHTML = '<form>' +
  '<label for="theme">' +
    'dark mode' +
    '<input type="checkbox" id="theme" class="tgl tgl-light" />' +
    '<span class="tgl-btn"></span>' +
  '</label>' +
'</form>';

var $input = $li.querySelector('input');
$input.checked = isDarkMode;
$input.addEventListener('change', function(e) {
  localStorage.setItem('darkMode', e.target.checked);
  addThemeClass()
});

$ul.appendChild($li);
*/
