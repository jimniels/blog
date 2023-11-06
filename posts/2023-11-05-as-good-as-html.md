# As Good as HTML

Jan Miksovsky has a talk titled [“Delivering Universal UI Patterns as Web Components”](https://www.youtube.com/watch?v=mtHf7crZZIQ&t=1696s) that speaks on the incredible opportunity that is web components:

> That HTML tag that you create [for a web component] that’s just HTML. You can use that anywhere you use HTML. That means the addressable market for your custom element is the size of the web [gestures with both hands stretched out]. That’s a massive, massive scale. Maybe at that scale the network effects are such that a standards-based solution will succeed in an area where proprietary solutions, to date, haven’t succeeded.

That’s a compelling argument in favor of web components!

Jan goes on to talk about the compositional approach he’s taking to building web components. For example: two components might look different on the surface, but under the hood they’re likely more similar than different. As an illustrative example, he shows a listbox and a carousel. 

<img src="https://cdn.jim-nielsen.com/blog/2023/web-components-listbox-carousel.png" width="700" height="262" alt="Screenshot of a listbox with a selected option on the left and an image carousel on the right." />

They don’t _look_ anything alike but they share a lot of behavior (directional navigation with the keyboard, ARIA, selection interaction, etc.). According to Jan, the listbox shares approximately 85% of its code with with the carousel! 

He jokingly notes how this is akin to those statements of genetic similarly, like “You share 85% of your DNA with a gerbil”. It seems impossible because they appear so different — and yet, we’re all not so different.

So it is with many of the components we’re building on the web.

Jan mentions [the open source project of web components](https://component.kitchen/elix) he’s worked on that tries to prove out this idea of composing seemingly different components from the same underlying materials.

What struck me was the compositional nature of their final approach. You can see from one of his slides how similar a listbox and a menu are in their behavioral DNA:

<img src="https://cdn.jim-nielsen.com/blog/2023/web-components-code.png" width="700" height="435" alt="Screenshot of two long lists of nested functions." />

And the source of inspiration for their approach to building these web components? HTML! Here’s Jan:

> Adopting a quality bar of being as good as HTML is pretty hard.

Love it! As I noted, [HTML is a masterclass in composability](https://mastodon.social/@jimniels/111211775055714495). You don’t have a bunch of bespoke attributes for every element, e.g.

```jsx
<section
  list={<ul><li>Item</li></ul>}
  listButton={<button>Delete</button>}
/>
```

Instead, HTML is a bunch of generic components that compose with each other.

```html
<section>
  <ul>
    <li>
      <button>Delete</button>
    </li>
  </ul>
</section>
```

Slide a few more in there if you need to, no problem!

```html
<section>
	<div>
	  <ul>
	    <li>
	      <button>
	        <span>
	          <em></em>
	        </span>
	      </button>
	    </li>
	  </ul>
	</div>
</section>
```

As Jan notes, being “as good as HTML” is no trivial matter. It’s a high bar!

[Robin also pointed out](https://sfba.social/@fonts/111211813228079834) that HTML is a great model for guiding decision making when he suggests asking, “What would HTML do?”

> Last time I worked on design systems stuff I would always ask “what would html do?” Helped me make a lot of decisions about how components should interact with one another.

A simple but recent example of this is [the new dividers in `<select>` menus](https://developer.chrome.com/en/blog/hr-in-select/).

If you’re going to allow authors to put a divider between options in a `<select>` element, what’s the best way to do that?

Maybe you create a new element, like `<option-divider>`:

```html
<label>
  Preferred candy
  <select>
    <option>Reeses</option>
    <option>KitKat</option>
    <option>Snickers</option>
    
    <option-divider>
    
    <option>Gummy bears</option>
    <option>Peach rings</option>
    <option>Brite crawlers</option>
  </select>
</label>
```

But HTML is composable, so it simply re-uses an element that already exists with the same semantic meaning: the humble horizontal rule `<hr>`.

```html
<label>
  Preferred candy
  <select>
    <option>Reeses</option>
    <option>KitKat</option>
    <option>Snickers</option>
    
    <hr>
    
    <option>Gummy bears</option>
    <option>Peach rings</option>
    <option>Brite crawlers</option>
  </select>
</label>
```

What would HTML do? Can I make this as good? Maybe I’ll get myself a shirt.

<img src="https://cdn.jim-nielsen.com/blog/2023/wwhtmld.jpg" width="656" height="735" alt="Photo of a plain white tshirt with big bold letters that say 'WEHTMLD'" />

