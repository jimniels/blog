#css #darkMode

# CSS Space Toggles

I’ve been working on a transition to using [`light-dark()` function in CSS](https://web.dev/articles/light-dark).

What this boils down to is, rather than CSS that looks like this:

```css
:root {
  color-scheme: light;
  --text: #000;
}

@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
    --text: #fff;
  }
}
```

I now have this:

```css
:root {
  color-scheme: light;
  --text: light-dark(#000, #fff);
}

@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
}
```

That probably doesn’t look that interesting. That’s what I thought when I first learned about `light-dark()` — “Oh hey, that’s cool, but it’s just different syntax. Six of one, half dozen of another kind of thing.”

But it does unlock some interesting ways to handling themeing which I will have to cover in another post. Suffice it to say, I think I’m starting to drink the `light-dark()` koolaid.

Anyhow, using the above pattern, I want to compose CSS variables to make a light/dark theme based on a configurable hue. Something like this:

```css
:root {
  color-scheme: light;
  
  /* configurable via JS */
  --accent-hue: 56; 
  
  /* which then cascades to other derivations */
  --accent: light-dark(
    hsl(var(--accent-hue) 50% 100%),
    hsl(var(--accent-hue) 50% 0%),
  );
}

@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
}
```

The problem is that `--accent-hue` value doesn’t quite look right in dark mode. It needs more contrast. I need a slightly different hue for dark mode. So my thought is: I’ll put that value in a `light-dark()` function.

```css
:root {
  --accent-hue: light-dark(56, 47);
  --my-color: light-dark(
    hsl(var(--accent-hue) 50% 100%),
    hsl(var(--accent-hue) 50% 0%),
  );
}
```

Unfortunately, that doesn’t work. You can’t put arbitrary values in `light-dark()`. It only accepts color values.

[I asked what you could do instead and Roma Komarov told me about CSS “space toggles”](https://mastodon.social/@jimniels/113848057658992957). I’d never heard about these, so I looked them up.

First I found [Chris Coyier’s article](https://css-tricks.com/the-css-custom-property-toggle-trick/) which made me feel good because even Chris admits  he didn’t fully understand them.

Then [Christopher Kirk-Nielsen linked me to his article](https://css-tricks.com/a-dry-approach-to-color-themes-in-css/) which helped me understand this idea of “space toggles” even more.

I ended up following the pattern Christopher mentions in his article and it works like a charm in my implementation! The gist of the code works like this:

1. When the user hasn’t specified a theme, default to “system” which is light by default, or dark if they’re on a device that supports `prefers-color-scheme`.
2. When a user explicitly sets the color theme, set an attribute on the root element to denote that.

```css
/* Default preferences when "unset" or "system" */
:root {
  --LIGHT: initial;
  --DARK: ;
  color-scheme: light;
}
@media (prefers-color-scheme: dark) {
  :root {
    --LIGHT: ;
    --DARK: initial;
    color-scheme: dark;
  }
}

/* Handle explicit user overrides */
:root[data-theme-appearance="light"] {
  --LIGHT: initial;
  --DARK: ;
  color-scheme: light;
}
:root[data-theme-appearance="dark"] {
  --LIGHT: ;
  --DARK: initial;
  color-scheme: dark;
}

/* Now set my variables */
:root {
  /* Set the “space toggles’ */
  --accent-hue: var(--LIGHT, 56) var(--DARK, 47);
  
  /* Then use them */
  --my-color: light-dark(
    hsl(var(--accent-hue) 50% 90%),
    hsl(var(--accent-hue) 50% 10%),
  );
}
```

So what is the value of `--accent-hue`? That line sort of reads like this:

- If --LIGHT has a value, return 56
- else if --DARK has a value, return 47

And it works like a charm! Now I can set arbitrary values for things like accent color hue, saturation, and lightness, then leverage them elsewhere. And when the color scheme or accent color change, all these values recalculate and cascade through the entire website — cool!

## A Note on Minification

A quick tip: if you’re [minifying your HTML](https://blog.jim-nielsen.com/2025/html-minification/) and you’re using this space toggle trick, beware of minifying your CSS! Stuff like this:

```css
selector {
  --ON: ;
  --OFF: initial;
}
```

Could get minified to:

```css
selector{--OFF:initial}
```

And this “space toggles trick” won’t work at all.

Trust me, I learned from experience.