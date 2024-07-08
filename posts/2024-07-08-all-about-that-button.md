# All About That Button, ’Bout That Button

In modern SPAs it’s common to immediately escape baked-in browser behaviors. For example, using `<button>` often looks like this: 

```jsx
<div>
  <input type="text" name="q" />
  <button
    type="submit"
    onClick={(e) => {
      // Stop the baked-in behavior
      e.preventDefault();

      // Do something with the input's value
    }}
  >
    Search
  </button>
</div>
```

But a framework like [Remix](https://remix.run/) encourages  writing mutations as declarative HTML that works without — or, perhaps better stated, _before_ — JavaScript, using semantic elements like `<form>` and `<button type="submit">`.

```html
<form action="/search">
  <input type="text" name="q" />
  <button type="submit">Search</button>
</form>
```

From this starting point of HTML — which functions before JavaScript loads & executes — you can then begin to progressively enhance your `<form>` with JavaScript that intercepts default browser behavior (e.g. `<form onSubmit={...}>`) and enhances the experience however you prefer.

As I‘ve worked more closely with forms and buttons, I’ve learned a few things.

For example, did you know you can submit a form with a button that lives _outside_ of the form it submits? Use [the `form` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-form):

```html
<form id="my-search-form" action="/search">
  <input type="text" name="q" />
</form>

<!-- Somewhere else in the DOM -->
<button type="submit" form="my-search-form">
  Search!
</button>
```

Or, when a form submits you can open the result in a new tab (you can [stick `target` on the `<form>` itself](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-target) too and it’ll do the same thing):

```html
<form action="https://google.com/">
  <input type="text" name="q" />
  <input type="hidden" name="site" value="my-blog.com" />
  <button type="submit" formtarget="_blank">Search</button>
</form>
```

That’s a neat progressive enhancement trick because it allows the user to input a query right there on your website and then, if JavaScript is enabled/working, you `e.preventDefault()` and take over the interaction there on the page. But if JS is disabled or fails to load, the interaction still works and submitting the form opens a new tab on the user’s device with results for their query.

There’s a bunch of [other button attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) for overriding parent form behaviours, such as: `formmethod`, `formenctype`, `formaction`, and `formnovalidate`.

If you’ve worked in a Remix app where you’re trying to build user interactions that work both with and without (or before and after) JavaScript, you’ve likely encountered many of these. They are _very_ useful mechanisms.

“But why”, you might ask, as an example, “would you want to have two buttons on a form, one that traditionally submits the form with validation and one that uses `formnovalidate` to submit the form and bypass validation?”

I could go into detail describing one such use-case in a recent codebase, but it will suffice to rather [quote the imitable  Chris Coyier](https://css-tricks.com/separate-form-submit-buttons-go-different-urls/) who had a similar issue years ago:

> When you submit [`<form action="/submit">`], it’s going to go to the URL `/submit`. Say you need another submit button that submits to a different URL. It doesn’t matter why. There is always a reason for things. The web is a big place

A big place indeed.