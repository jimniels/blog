/**
 * Header links
 * Animate a smooth scroll on anchor links
 */
var navItems = document.querySelectorAll('.js-animate-scroll');
for (var i = 0; i < navItems.length; i++) {
  navItems[i].addEventListener('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    jump(e.target.hash, {
      duration: 666,
      callback: function() {
        window.location.hash = e.target.hash;
      }
    });
  });
}

// https://github.com/sitepoint-editors/smooth-scrolling/blob/gh-pages/jump.js
function jump(target, options) {
  var start = window.pageYOffset,
      opt = {
        duration: options.duration || 1000,
        offset: options.offset || 0,
        callback: options.callback,
        easing: options.easing || easeInOutQuad
      },
      distance = typeof target === 'string'
        ? opt.offset + document.querySelector(target).getBoundingClientRect().top
        : target,
      duration = typeof opt.duration === 'function'
        ? opt.duration(distance)
        : opt.duration,
      timeStart,
      timeElapsed;

  requestAnimationFrame(function(time) { timeStart = time; loop(time); });

  function loop(time) {
    timeElapsed = time - timeStart;

    window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

    if (timeElapsed < duration)
    requestAnimationFrame(loop)
    else
    end();
  }

  function end() {
    window.scrollTo(0, start + distance);

    if (typeof opt.callback === 'function')
    opt.callback();
  }

  // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
  function easeInOutQuad(t, b, c, d)  {
    t /= d / 2
    if(t < 1) return c / 2 * t * t + b
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
  }
}

/**
 * Image Container
 * Set images to full-width with captions
 */
var images = document.querySelectorAll('.content > p img');
console.log(images);
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
 * Theme Toolbar
 * Creates a <ul> based off themeColors array where each item represents an <li>
 *
 * Markup output:
 *  <p class="header__nav__theme-control">
 *    <a href='#'>Light</a>
 *    <a href='#'>Dark</a>
 *  </p>
 *
 * Note: addThemeClass() is defined inline at start of document. This helps
 * prevent a 'theme' flicker between page loads.
 */

var themeColors = ['light', 'dark'];
var currentlyActiveTheme = localStorage.getItem('theme')
  ? localStorage.getItem('theme')
  : 'light';

var p = document.createElement('p');
p.classList.add('header__nav__theme-control');

// Create and append <a> links in <dd>
for (var i = 0; i < themeColors.length; i++) {
  (function () {

    var themeColor = themeColors[i];

    // Create text node
    var text = document.createTextNode(themeColor);

    // Create <a> element, append text
    var a = document.createElement('a');

    a.setAttribute('href', '#');
    a.setAttribute('title', themeColor + ' theme');
    a.appendChild(text);

    // Bind event listener to the current theme
    a.addEventListener('click', function(){
      // Classes for indicating active theme
      var activeNode = document.querySelector('.header__nav__theme-control a[disabled]');
      if (activeNode) {
        activeNode.removeAttribute('disabled');
      }
      this.setAttribute('disabled', true);

      // Set localstorage for keeping track of active theme
      localStorage.setItem('theme', themeColor);

      // Add document class indicating active theme (defined inline at beginning of document)
      addThemeClass();
    });

    // Set the active class on whichever element is active
    if (themeColor === currentlyActiveTheme) {
      a.setAttribute('disabled', true);
    }

    // Append <a> to <p>
    p.appendChild(a);
  }());
}

// Append <dd> to <dl>
// dl.appendChild(dd);

// Add <dl> to DOM
document.querySelector('.header__nav').appendChild(p);
