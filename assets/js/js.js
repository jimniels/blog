/**
 * Responsive Menu Button
 * Animate scroll when clicking 'Menu'
 */
document.querySelector('.header__nav-link').addEventListener('click', function(e){
  e.preventDefault();
  var footer = document.getElementById('nav-footer');
  var offset = footer.offsetTop;
  scrollTo(document.body, offset, 500);
});

function scrollTo(element, to, duration) {
    if (duration < 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

/**
 * Image Container
 * Set images to full-width with captions
 */
var images = document.querySelectorAll('.content__body p img');
for (var i = 0; i < images.length; i++) {
  var parentEl = images[i].parentNode; // not sure if we need to traverse all the way up for a <p> ?
  parentEl.classList.add('image-container');

  var caption = images[i].getAttribute('title');
  if (caption) {
    var textnode = document.createTextNode(caption);
    parentEl.appendChild(textnode);
  }
}

/**
 * Fixed Sidebar Scroll
 * Handle scrolling behaviour correction for the fixed sidebar on desktop
 */
var header = document.getElementById('header');
var body = document.body;
header.addEventListener('mouseenter', function(){
  body.style.overflow = 'hidden';
});
header.addEventListener('mouseleave', function(){
  body.style.overflow = 'initial';
});


/**
 * Theme Toolbar
 * Creates a <ul> based off themeColors array where each item represents an <li>
 *
 * Markup output:
 *  <ul>
 *    <li title="Theme: light"></li>
 *    <li title="Theme: regular"></li>
 *    <li title="Theme: dark"></li>
 *  </ul>
 *
 * Note: addThemeClass() is defined inline at start of document. This helps
 * prevent a 'theme' flicker between page loads.
 */
var themeColors = ['light', 'regular', 'dark'];
var ul = document.createElement('ul');
ul.classList.add('theme-toolbar');
var currentlyActiveTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'regular';

for (var i = 0; i < themeColors.length; i++) {
  (function () {

    var themeColor = themeColors[i];

    // Create <li> element
    var li = document.createElement('li');
    li.innerHTML = themeColor;
    li.setAttribute('title', 'Theme: ' + themeColor);

    // Bind event listener to the current theme
    li.addEventListener('click', function(){
      // Classes for indicating active theme
      document.querySelector('.theme-toolbar .active').classList.remove('active');
      this.classList.add('active');

      // Set localstorage for keeping track of active theme
      localStorage.setItem('theme', themeColor);

      // Add document class indicating active theme (defined inline at beginning of document)
      addThemeClass();
    });

    // Set the active class on whichever element is active
    console.log(themeColor, currentlyActiveTheme);
    if (themeColor === currentlyActiveTheme) {
      li.classList.add('active');
    }

    // Append to <ul>
    ul.appendChild(li);
  }())
}

// Insert <ul> toolbar
var header = document.getElementById('header');
header.insertBefore(ul, header.firstChild);
