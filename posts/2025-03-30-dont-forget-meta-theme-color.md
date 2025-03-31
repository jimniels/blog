#darkMode

# Don’t Forget the Meta Theme-Color Tag

Ever used a website where you toggle from light mode to dark mode and the _web site_ changes but the chrome around the browser doesn’t?

To illustrate, take a look at this capture of my blog on an iPhone. When you toggle the theme from light to dark, note how the website turns white but status bar stays black.

<img src="https://cdn.jim-nielsen.com/blog/2025/meta-theme-fail.gif" width="373" height="480" alt="Animated gif of a dark-to-light toggle and transition on an iPhone where the entire website’s theme changes but not the status bar of the phone’s OS." />

Only once I refresh the page or navigate does the status bar then turn white.

When the user changes the theme on my site, I want it to propagate all the way to the surrounding context of the browser. In this case, to the status bar on the iPhone. Like this:

<img src="https://cdn.jim-nielsen.com/blog/2025/meta-theme-success.gif" width="418" height="480" alt="Animated gif of a dark-to-light toggle and transition on an iPhone where the entire website’s theme changes including the status bar of the phone’s OS." />

There we go! That’s what I want.

So what was wrong?

A popular way to indicate the active theme is to put a class on the root of the document, e.g.

```html
<html class="dark">
  <style>
    html { background: white }
    html.dark { background: black }
  </style>
</html>
```

Then we simply add/remove the `dark` class when the user toggles the theme.

But that will only change the in-page styles. It won’t tell the browser to update the color of whatever ambient user interface elements its drawing. For that, you’ll need [the meta theme-color tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color):

> The `theme-color` value for the `name` attribute of the `<meta>` element indicates a suggested color that user agents should use to customize the display of the page or of the surrounding user interface.

So when you respond to the user changing their theme, don’t forget to update the `<meta name='theme-color'>` tag _in addition to_ whatever you do to modify the in-page styles.

That’ll give you the effect you want in the surrounding browser UI (for browsers that support it).

Oh, and it’s worth pointing out: [don’t forget the color-scheme property](https://blog.jim-nielsen.com/2020/color-scheme-property/) either. That’s what will tell the browser to update other in-page UI elements it draws.

So, when responding to a user preference to update a website’s theme:

1. Toggle some global attribute that triggers style changes for all your custom, in-page elements.
2. Set the `color-scheme` property so the browser draws the things its responsible for correctly (form controls, scroll bars, etc.).
3. Set the `<meta name='theme-color'>` value appropriately so contextual browser UI can adapt to your site’s styles.

I wrote this post as a friendly reminder, because friends don’t let friends forget the meta theme-color tag.