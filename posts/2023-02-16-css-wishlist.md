# My CSS Wishlist

There are lots of CSS wishlists going around. This one is mine.

Or at least, partly mine. A lot of what I would wish for has already been mentioned by others. I’ll start by echoing what they’ve said, then I’ll add a few wild ideas of my own.

## Ahmad: Sticky, Stuck

[Ahmad asks for](http://ishadeed.com/article/css-wishlist-2023/) the ability to detect when a `position: sticky` element is stuck and I couldn’t agree more.

A common example is a site header. You don’t want the box shadow giving the illusion of depth when the user first loads the page. However, once they start scrolling you want to 🎵 Put a Box Shadow On It 🎵

```
.site-header {
  position: sticky;
  top: 0;
}

.site-header:sticky {
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
}
```

I love position sticky. It’s a great feature in CSS that was previously only achievable with JS. But honestly, it only feels like half an implementation of the JS feature without the ability to detect and style the stuck state.

## Dave: It’s All Relative

[Dave casts a wish](https://daverupert.com/2023/01/css-wishlist-2023/) for relative color syntax and I’m boarding that train. I mean c’mon, coerce color values from one color type to another and destructure their individual values for manipulation? It’s pure magic!

```css
:root {
  /* Define one type of color */
  --color: red;
}
.selector {
  /* Coerce it to another type, destructure its individual
     parts, and manipulate them as you please */
  color: hsl(from var(--color) h calc(s - 10%) l / .5);
}
```

I’m super excited for this feature — [here’s my reasons why](https://blog.jim-nielsen.com/2021/css-relative-colors/) — and it’ll be on my wishlist every year until it ships.

## Eric: All The Things

[Eric’s wishes](https://meyerweb.com/eric/thoughts/2023/02/08/css-wish-list-2023/) are so precisely aligned with my own, I can’t help but feel he has some real estate in my head.

Variables in media queries? Yes, plz.

More and better `:has()`? Uh-huh ([there’s so much there](https://blog.jim-nielsen.com/2022/unlocked-possibilities-of-has-selector/)).

Scoped styling? Amazing! Eric gives this example, asking: “only apply these styles to this element and its descendents”.

```html
<div style="@import(styles.css);">
```

I actually had something like this in mind:

```html
<div>
  <h1>This is not red</h1>
</div>

<div id="globally-unique-id">
  <h1>This is red</h1>
</div>

<style scoped="#globally-unique-id">
  h1 {
    color: red;
  }
</style>
```

But they’re getting at the same thing. In essence, something that gives you some of the benefits of [CSS modules](https://github.com/css-modules/css-modules) (names and selectors scoped by default) without all the tooling.[^1]

Oh, and I’m not done with Eric yet. Also I’d love to be able to include SVGs for stylistic concerns (hence inclusion in the _stylesheet_) and still be able to style the fill color of the SVG. Here’s Eric:

> Every time I have to embed an entire inline SVG into a template just so I can change the fill color of a logo based on its page context, I grit my teeth just that little bit harder.

I’m gonna get lock jaw from all my gritting.

Wait! I’m still not done with Eric. Last one, I promise. His request for `attr()` but that applies to any CSS property is a need I encountered just yesterday. Something that allows you to stick values in HTML `data-` attributes, then reference them in CSS, e.g.

```html
<ul>
  <li data-color="#abc123">Red</li>
  <li data-color="#def456">Blue</li>
  <li data-color="#def456">Blue</li>
</ul>

<style>
  li[data-color] {
    bacgkround-color: attr(data-color)
  }
</style>
```

I know, I know, you can do `style="..."` instead of `data-color="..."` but _sometimes_ that’s just not the case. The constraints for building things on the web are vast and diverse. You can already use [`attr()`](https://developer.mozilla.org/en-US/docs/Web/CSS/attr) for the `content: "..."` property, which is awesome, but it’s also just a tease when I can’t use it for other properties too.

## Me: Unlimited Pseudo Elements

The `::before` and `::after` pseudo elements are amazing. They help me to style things however I want without having to create empty HTML nodes solely for styling purposes.

But sometimes you just need more pseudo elements than two.

```html
<style>
  #thing::before {
    /* Style a box upper left */
  }
  #thing::after {
    /* Style a box upper right */
  }
  
  /* I need more boxes! Will have to add an empty element */
  
  #thing2::before {
    /* Style a box lower left */
  }
  #thing2::after {
    /* Style a box lower right */
  }
</style>

<div id="thing">
  <span id="thing2"></span>
</div>
```

I want to create more pseudo elements without having to add more empty HTML elements. What if you could create unlimited pseudo elements on any given node? (I know “unlimited” is probably a performance concern so, idk, cap it at some reasonable number like 1,000 or something.)

```html
<style>
  #thing::before {
    /* Style a box upper left */
  }
  #thing::before:nth-of-type(2) {
    /* Style a box upper right */
  }  
  #thing::before:nth-of-type(3) {
    /* Style a box lower left */
  }
  #thing::before:nth-of-type(4) {
    /* Style a box lower right */
  }
</style>

<div id="thing"></div>
```

Once you add `content: ""` to any before or after `nth-of-type()`, it creates the element. Boom! This would be awesome, as I constantly find myself needing more than just `::before` and `::after`.

## Me: Reference URLs and HTTP in CSS

This probably isn’t feasible and is a silly ask, but I still want it. This is a **wish**list so I don’t have to be reasonable.

Lemme style things based on the URL state, e.g.

```html
/* URL contains these query params somewhere */
@document[url*="foo=bar"] {…}
```

And give me access to HTTP headers too!

```
/* A cookie for theme preference  */
:http([set-cookie*="THEME=dark"]) {
  :root { background: #000 }
}
```

[I wrote more about why I want this](https://blog.jim-nielsen.com/2022/css-for-urls-and-http-headers/), if you’re interested.

## The End

That’s it. That’s my CSS wishlist-on-a-whim. Ask me again in a couple weeks and I’ll probably have a different list.

I think maybe what I’ll do is start a blog post draft like “CSS Wishlist 2024" and, as I work in CSS throughout this year and find reoccurring features I want/need, I’ll add them to that draft. Then come January 2024, I’ll have a nice, thoughtful, based-in-practice list.

Anyway that’s a nice theory. Let’s see if I have the discipline for it ha :)


[^1]: Scoping is a useful feature in lots of [different ways](https://blog.jim-nielsen.com/2022/multiple-inline-svgs/), and I know there are various ways you can achieve it today, like repeatedly prefixing every selector with a unique ID, e.g. `#unique-id .foo {...}`. There’s also web components and shadow DOM. Declarative shadow DOM in particular [looks promising](https://twitter.com/simevidas/status/1620440940375851008?s=20) and [webkit just shipped support](https://webkit.org/blog/13851/declarative-shadow-dom/)). I just want something even more inline.
