---
tags: engineering darkMode css iconGalleries
---

# Bringing “Dark Mode” to My Icon Galleries Sites

About two months ago, [I wrote about how creating a dark mode on my personal blog](https://blog.jim-nielsen.com/2018/dark-mode-on-the-web/). This particular “dark mode” was engineered so that it could _only_ be enabled by the user via a system-level setting (which CSS could tap into via a media query – `@media (prefers-color-scheme: dark)`). In essence, my website supported dark mode but only when “dark mode” was enabled at the OS level. There was no user-facing ability _from my blog’s website_ to trigger dark mode.

Building on that, I decided I wanted to extend the idea of a “dark mode” to my [icon](https://www.iosicongallery.com/) [galleries](https://www.watchosicongallery.com/) [sites](https://www.macosicongallery.com/) but I wanted the “dark mode” to be something the user could trigger via an OS-level setting (like on my blog) _or_ via a toggle in the UI _on my blog’s website_.

![GIF depicting the new dark mode toggle on my site](https://cdn.jim-nielsen.com/blog/2018/dark-mode-galleries-example.gif "Final result of my “dark mode” toggle.")

## First: Color Schemes and CSS Variables

The first thing I had to do was create a color scheme for black. After noodling with colors via the developer tools, I found some colors I liked. Then I had to transform my site’s `.css` file to use custom properties (a.k.a. variables) instead of hard-coded values. This actually wasn’t that difficult because I declared all my color values at the top of my CSS file:

![Screenshot of the top of my CSS file showing an index of colors available for use](https://cdn.jim-nielsen.com/blog/2018/dark-mode-galleries-css-vars.png)

This made doing a find/replace simple enough:

![Screenshot of the git diff on my find/replace of CSS color values selector CSS colors](https://cdn.jim-nielsen.com/blog/2018/dark-mode-galleries-find-replace.png)

And all my color variables for my “light” and “dark” mode palettes lived under the `:root` selector:

![Screenshot of the :root selector CSS colors](https://cdn.jim-nielsen.com/blog/2018/dark-mode-galleries-root-selectors.png)

Note the difference here: on my blog, [I toggled dark mode via a media query](https://blog.jim-nielsen.com/2018/dark-mode-on-the-web/):

```css
:root {
  --color-bg: #fff;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #000;
  }
}
```

On my icon galleries site, I needed to apply dark mode dynamically via JavaScript, so I add/remove a class on the `:root` element which (due to the specificity in CSS) overrides my default “light mode” variables to now be “dark mode” color variables.

```css
:root {
  --color-bg: #fff;
}
:root.is-dark-mode {
  --color-bg: #000;
}
```

This allows me to trigger dark mode by adding/removing a class from the root element because either A) the user clicked a button in the UI, or B) the user’s system-level settings are set to “dark mode”. I do that by essentially using the same media query as before, except I listen for it via JavaScript rather than declaring it in my CSS.

## Second: Persisting Dark Mode

Because my sites are static `.html` pages with no server, I had to persist the state of whether a user was in “dark mode” or not on the client. This meant using the `window.localStorage` API. But first, some progressive enhancement.

In my global JavaScript file that gets loaded on every page, I do a simple check for whether the browser supports CSS variables. Why CSS variables?
Because this functionality is implemented almost entirely via CSS variables. Therefore, I only want to add the UI toggle _if_ the client supports them.

So I check for support first, and if it exists, I have a function that creates the markup for a UI toggle, sticks it in the DOM, and listens for changes. If the user clicks the button to toggle in/out of “dark mode”, I toggle the CSS class on the root `<html>` element and then toggle the state in local storage (which is what allows me to persist the “dark mode” between page loads). If, by chance, JS is disabled or CSS variables aren’t supported, the user will never even know a “dark mode” existed.

![Screenshot of the :root selector CSS colors](https://cdn.jim-nielsen.com/blog/2018/dark-mode-galleries-js-toggle.png)

Now here was the tricky part: I needed to do an initial check when the page loaded to see if the user was in “dark mode”, either via a system-level setting or because they clicked the toggle in my UI. But if I put that check in my global JS file, it wouldn’t run until the page loaded because the browser would load everything, _then_ add my class to the `<html>` element, resulting in a weird flash every time you loaded the page.

![GIF depicting how site would flash between page loads](https://cdn.jim-nielsen.com/blog/2018/dark-mode-galleries-flashing.gif)

If it’s not clear why this is happening, allow me to explain: every time the user clicks a link and opens a new page of my site, the “default” mode is light mode. Every static `.html` file has a root `<html>` node with no class indicating whether we’re in “dark mode” or not (i.e. it’s not persisted on the server). The client has to check local storage for some flag that we put in there, and if it finds it, only then does it apply a class to the `<html>` and then change the appearance of the site. So by the time the browser knows we’re in dark mode, a bunch of the content on the page has already loaded.

The best way, I found, to get around this was to go into my static site’s template files and add a blocking `<script>` tag _for every single page_ that executes right after the root `<html>` element. This script conditionally adds our “dark mode” class based on the state of the client. This allows me to check if we’re in dark mode by running some JavaScript _before_ any content has loaded, which is beneficial because all the other JavaScript for my site (even conditionally adding the UI toggle) is dependent on their being a DOM to query!

![Illustration of how placement of script tag in DOM matters](https://cdn.jim-nielsen.com/blog/2018/dark-mode-galleries-rendering-dom.png)

Here’s what the code looks like:

![Screenshot of the code which checks for whether the user is in dark mode](https://cdn.jim-nielsen.com/blog/2018/dark-mode-galleries-blocking-script.png)

Note how the first thing we do is check whether our local storage key is `null`. If it is, that means the user hasn’t interacted with our UI toggle at all, in which case we'll check to see if their system-level setting is “dark mode” and, if it is, we save that to local storage and then add our root class. This accounts for the case where a user might be browsing the web in “dark mode” and has never visited the site. When they land on it, I want the theme to be dark so it matches the experience of their device and OS. It’s like checking for the default state of the toggle.

## Conclusion

Honestly, I have no conclusion. Adding a header that said “Conclusion” just seemed like the right way to wrap up this post.

This is just one way you could go about implementing dark mode on a static site with no server to persist local state.
