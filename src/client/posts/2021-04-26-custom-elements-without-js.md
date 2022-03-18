#html #webComponents

# Custom Elements Without JavaScript?

Let’s get a couple semantics out of the way first, so I know we’re all talking about the same things.

Custom elements != web components.

Custom elements + other things = web components.

Web components is [“a suite of different technologies”](https://developer.mozilla.org/en-US/docs/Web/Web_Components) such as [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements), [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM), and [HTML templates](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots).

Additionally, its worth noting that the [spec differentiates between types of “custom elements”](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-core-concepts) which fall under the umbrella of “web components”:

- `<my-button>` is an “autonomous custom element”
- `<button is="my-button">` is a “customized built-in element”

These elements are different. They behave different and they have different rules that govern them. So be aware.

Now that we have these definitions in place, the question I’m asking is this: is there any value to be had in using autonomous custom elements on their own?

In other words, create an element like `<my-button>` but don’t register it with `customElements.define("my-button", ...)`. In fact, don’t write any JavaScript for it at all.

You might ask, “what would you use it for?” Great question. Let me give an example from my [icon](https://www.iosicongallery.com) [gallery](https://www.macosicongallery.com) [sites](https://www.watchosicongallery.com).

To display icons on each of these sites, I mark up a list (`<ul>`) of images (`<img>`).

<img src="https://cdn.jim-nielsen.com/blog/2021/no-js-elements-macos.png" width="1068" height="983" alt="Screenshot of macOS Icon Gallery with the dev tools open showing HTML markup for the list of icons." /> 

While the markup for each icon is the same, the styling applied to each icon’s `<img>` tag changes depending on its type:

- iOS icons get [a custom image mask](https://blog.jim-nielsen.com/2017/creating-ios-icon-masks-in-the-browser/).
- macOS icons get no styling at all. 
- watchOS icons get a border radius and box shadow (the edges are masked due to the application of the border radius).

Using a BEM-like class structure, this can be illustrated like so:

```html
<ul class="icon-list">
  <li class="icon icon--ios">
    <img src="..." />
  </li>
  <li class="icon icon--macos">
    <img src="..." />
  </li>
  <li class="icon icon--watchos">
    <img src="..." />
  </li>
</ul>
<style>
  .icon {
    /* All shared styling here */
  }
  .icon--ios {
    /* iOS-specific styling here */
  }
  .icon--watchos {
    /* watchOS-specific styling here */
  }
</style>
```

What if, rather than using `<ul>` and `<li>`, I created my own markup for a list of icons (`<i-con-list>`) and an icon (`<i-con>`)? For example:

```html
<i-con-list>
  <i-con type="ios">
    <img src="..." />
  </i-con>
  <i-con type="macos">
    <img src="..." />
  </i-con>
  <i-con type="watchos">
    <img src="..." />
  </i-con>
</i-con-list>
<style>
  i-con {
    /* All shared styling here */
  }
  i-con[type="ios"] {
    /* iOS-specific styling here */
  }
  i-con[type="watchos"] {
    /* watchOS-specific styling here */
  }
</style>
```

I don’t need any interactivity added to these autonomous custom elements. However, I am thinking about the possibility in the future.

For example, what if I wanted to make my icon list change dynamically? I could add an attribute to the list, i.e. `<i-con-list filter="value">`, then add some JavaScript that defines that custom element, watches for the `filter` attribute to change, and redraws the UI.

Would it be weird or confusing to use autonomous custom elements in this way? As another example, instead of:

```html
<div class=“my-widget my-widget--size-100”>
  <img src=“...” />
</div>
```

I do the markup in a way that makes sense to me:

```html
<my-widget size=“100”>
  <img src=“” />
</my-widget>
```

And I don’t write any JavaScript because I don’t need any interactivity on these elements. Instead, it’s for my own semantics and styles. For example, in CSS instead of classes:

```css
.my-widget {…}
.my-widget--size-100 {…}
```

I use the actual elements along with my custom attributes for styling:

```css
my-widget {…}
my-widget[size=“100”] {…}
```

Is this considered bad practice?

[I asked this on twitter](https://twitter.com/jimniels/status/1379190180792430594?s=20) and [@tommygeorge responded](https://twitter.com/tommygeorge/status/1379223423772151809?s=20) with where my brain was at: “I don’t know that it’s bad, but also it’s not *neutral*.”

He also asks what [the spec says on the matter](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-core-concepts):

> An autonomous custom element does not have any special meaning: it represents its children.

What does “represents” mean in the sentence “it represents its children”? Again [from the spec](https://html.spec.whatwg.org/multipage/dom.html#represents):

> Elements in the DOM represent things; that is, they have intrinsic meaning, also known as semantics.

In the case of autonomous custom elements which don’t have any intrinsic meaning as defined by the spec, the phrase “it represents its children” seems to mean it _is_ its children. The name of the element might have meaning a human could deduce (perhaps incorrectly at that) but to a computer it has no semantics. The parent is the child. In the case I used above:

```html
<i-con>
  <img src="" alt="" width="" height="" />
</i-con>
```

A developer might read `<i-con>` as “oh, it’s an icon, which is an image, and they spelled it out as i-hyphen-con because you have to use a hyphen in custom elements.”  To the computer, the semantics of an `<i-con>` is that its an image because that is its child.

In my original example, the markup semantics in HTML denote that you’re dealing with a list of images.

```html
<ul class="icon-list">
  <li class="icon icon--ios">
    <img src="..." />
  </li>
  <li class="icon icon--macos">
    <img src="..." />
  </li>
  <li class="icon icon--watchos">
    <img src="..." />
  </li>
</ul>
```

When I switch that to autonomous custom elements, those HTML semantics get lost:

```html
<i-con-list>
  <i-con type="ios">
    <img src="" />
  </i-con>
  <i-con type="macos">
    <img src="" />
  </i-con>
  <i-con type="watchos">
    <img src="" />
  </i-con>
</i-con-list>
```

To a developer, you might be able to glean more from this by reading the names of the custom elements, i.e. “ok I see, I have a list of icons, each of which are an image and they can have a custom `type`”. But in general, the time-tested semantics provided by HTML that this is “a list of images” gets lost.

To [quote myself in another tweet](https://twitter.com/jimniels/status/1379251591233015810?s=20), if I’m using custom elements purely for _my own_ semantics and styles (with no JavaScript interactivity), at that point I’m basically reinventing XML that’s supported in the browser.

Given all the above, I’m not sure it’s worth it? However, the tricky part is that _in some cases_ I want to have the interactive, dynamic aspect of web components. But in other cases, I only need the static elements. It seems like such a shame to have to provide two different sets of markup (and styles) for what is, at its core, the exact same thing: a list of images.

```html
<!-- Pages with dynamic lists of icons get this
     (the custom JS for this is defined elsewhere) -->
<i-con-list>
  <i-con type="ios">
    <img src="" />
  </i-con>
  <i-con type="macos">
    <img src="" />
  </i-con>
  <i-con type="macos">
    <img src="" />
  </i-con>
</i-con-list>

<!-- Pages with static lists of icons get this -->
<ul class="icon-list">
  <li class="icon icon--ios">
    <img src="" />
  </li>
  <li class="icon icon--macos">
    <img src="" />
  </li>
  <li class="icon icon--watchos">
    <img src="" />
  </li>
</ul>

<!-- And this requires two sets of styles written for them -->
.icon-list,
i-con-list {
  /* Generic styles for all icons */
}

<!-- Or, to save yourself from typing everything twice, 
     just put classes on both sets of elements, i.e.
     <ul class="icon-list">...</ul>
     <i-con-list class="icon-list">...</i-con-list> -->
```

Typing this all out helped me think through this all a bit more. Thanks for ~~listening to~~ reading me ramble.
