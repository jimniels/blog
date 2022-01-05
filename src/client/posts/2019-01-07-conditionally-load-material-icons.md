---
tags: engineering sagesure
---

# Conditionally Load Material Icons

If you want to use [Material Icons](https://google.github.io/material-design-icons/) on your webpage, it’s advised that you stick a `<link>` tag in your HTML like so:

```html
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>
```

But what if you want to check if Material Icons is already included on the page and then load it if it’s not? (all via JavaScript, of course)

Here’s an example use case: you provide a library which leverages Material Icons. Rather than instruct the consumer that they have to stick a `<link>` tag in their header _and then_ use the icon, just tell them to use the icon and under the hood you take care of whether the material icons dependency is loaded.

Here’s a basic implementation example (concept borrowed from [this post](https://allthingssmitty.com/2016/09/12/checking-if-font-awesome-loaded/)):

```js
// Create an element in the DOM for testing if Material Icons are present
let $span = document.createElement("span");
$span.className = "material-icons";
$span.style.display = "none";
document.body.insertBefore($span, document.body.firstChild);

// See if the computed font-family value is material icons
const needToLoadMaterialIcons =
  window.getComputedStyle($span, null).getPropertyValue("font-family") !==
  "Material Icons";

// If it's not, load the resource
if (needToLoadMaterialIcons) {
  let $link = document.createElement("link");
  $link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
  $link.rel = "stylesheet";
  document.head.appendChild($link);
}

// Cleanup the original <span> we stuck in the DOM
document.body.removeChild($span);
```

Let’s take it a step further. Say you’re creating a component library in React and you provide a component where consumers can pass you the name of the material icon they want to display, i.e. `<Icon name="calendar" />`. Rather than tell the consumer “hey, before you use this library, make sure you put a `<link>` in your app to load the Material Icons font family”, you could check to see if the font is already in the DOM by doing a check inside `componentDidMount()`.

Granted, using the code above in a `componentDidMount()` is less than ideal from a performance perspective. That’s a lot of code to execute every time an `<Icon />` component is mounted to the DOM. However, you could get around this by setting a boolean flag on the `window` so that the very first time any `<Icon />` component is used from your library, your library will ensure Material Icons has loaded. Then, after this first usage, every subsequent `<Icon />` component is only checking a boolean flag (which is more inexpensive from a performance perspective). Here’s a basic example:

```js
export default class Icon extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    if (window.I_HAVE_TRIED_TO_LOAD_MATERIAL_ICONS) {
      // If you've already tried running this once, we'll just stop right here.
      return;
    }
    window.I_HAVE_TRIED_TO_LOAD_MATERIAL_ICONS = true;

    // See if, by chance, Material Icons has already loaded on the page
    // (it's possible somebody already declared a <link> to it in the <head>)
    // If it hasn't loaded, we'll load it ourselves.
    if (
      window
        .getComputedStyle(this.iconRef.current, null)
        .getPropertyValue("font-family")
        .indexOf("Material Icons") === -1
    ) {
      let $link = document.createElement("link");
      $link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
      $link.rel = "stylesheet";
      document.head.appendChild($link);
    }
  }

  render() {
    return (
      <i className="material-icons" ref={this.myRef}>
        {this.props.name}
      </i>
    );
  }
}
```

There’s some more sophistication that could go into this, like avoiding [FOUT](https://www.paulirish.com/2009/fighting-the-font-face-fout/), but I think the general idea is here as a foundation if you wanted to give it a shot.
