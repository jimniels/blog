---
tags: engineering javascript
---

# Approaches to Using autosize.js to Automatically Resize a textarea on User Input

I was recently working on a side project and found myself wanting to automatically resize a `<textarea>` (vertically) as content was input by the user.

<img src="https://cdn.jim-nielsen.com/blog/2020/textarea-autoresize-antimation.gif" alt="Animated gif illustrating a textarea input in HTML automatically resizing vertically as new lines are added by the user." width="421" height="115" />

As I began looking into how to achieve this functionality, I found a great stand-alone script called [autosize](https://github.com/jackmoore/autosize) that’ll do this for you automatically with minimal fuss. The implementation was simple: include the script on your page, query select the `<textarea>`(s) on the page you want to automatically resize, and pass it to the `autosize` function. From the docs:

```js
// from a NodeList
autosize(document.querySelectorAll('textarea'));

// from a single Node
autosize(document.querySelector('textarea'));
```

Simple—and a simple JS implementation these days is, well, kind of refreshing. 

But I wanted a little bit more.

Part of my problem was that I needed to be able to easily specify both _which_ `<textarea>` elements I wanted to resize and _when_ I wanted them to resize. Some of my `<textarea>` elements were being dynamically added and removed from the DOM at different points in time, so just passing in a couple `<textarea>` elements when my script initialized wasn’t enough.

Wouldn’t it be nice if I could just specify _in the HTML_ which  `<textarea>` elements I wanted to automatically resize? What would that look like? How could you design and implement such a solution?

I sat with the idea and came up with two perspectives on implementation, both of which require JavaScript to work in terms of the auto resizing. However, in contrast to the example above, both of these options move the act of enabling any given `<textarea>` with this resizing behavior from imperative JavaScript to declarative HTML. The options are:

1. Use an HTML attribute
2. Use a web component

## Use an HTML Attribute

Imagine you could stick a simple boolean attribute on any given `<textarea>` in the DOM and it would then automatically resize on user input:

```html
<textarea autosize>My text here.</textarea>
```

That’d be awesome! Especially if there was no JavaScript required.

Unfortunately, this can’t be done natively in the browser today because it’s not part of the spec (maybe it should be?). However, you can do it with a little JavaScript. It’s a simple attribute in the HTML, so if JavaScript doesn’t load, no big deal. Nothing crashes and the `<textarea>` is still 100% functional. Plus (as long as you don’t disable it) the user is still provided a control to resize the `<textarea>` themselves if needed.

You can achieve this with JavaScript using a [Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver). This will watch the DOM and if any `<textarea>` gets injected with an `autosize` attribute, it’ll automatically apply the `autosize` function to that element, therefore attaching dynamic behavior so it resizes on user input. 

In essence, the setup script works like this: upon initialization, look in the DOM for `textarea[autosize]` and run every one of those nodes through the `autosize` function. Then setup your mutation observer so any subsequent additions of a `textarea[autosize]` to the DOM automatically get this functionality applied as well. 

```js
import autosize from "https://unpkg.com/autosize@4.0.2/src/autosize.js";

// Autosize anything in the DOM on page load
Array.from(document.querySelectorAll("textarea[autosize]"))
  .forEach(autosize);

// Setup observer to autosize anything after page load
new MutationObserver(mutations => {
  Array.from(mutations).forEach(mutation => {
    Array.from(mutation.addedNodes).forEach(node => {
      if (node.matches("textarea[autosize]")) {
        autosize(node);
      }
    });
  });
}).observe(document.body, { childList: true });
```

You can see an example of this on my Codepen: [Auto Resize a `<textarea>` with a Mutation Observer](https://codepen.io/jimniels/pen/NWNWKpr)

## Use a Web Component

Web components are popular, right? I bet you could make a textarea that resizes on user input using one of them. Let’s see, how could you do it?

```html
<textarea-autosize></textarea-autosize>
```

I suppose you could make that work, but unlike the HTML attribute solution described previously, this approach would break completely without JavaScript because there would be no input whatsoever. 

I honestly don’t know that much about web components (_update:  I proved this statement, see my update below_):, but I would suppose the proper way to do this would look something like:

```html
<textarea-autosize>
  <textarea>My text here.</textarea>
</textarea-autosize>
```

In this way, the browser will still render a regular `<textarea>` if JavaScript isn’t present, meaning you’d still have a completely functioning input for the user. What’s kind of neat about this as well is that, since you’re using a native `<textarea>` element, you get support for all [the  attributes of a `<textarea>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) like `cols`, `rows`, `minlength`, `maxlength`, `placeholder`, etc., for free. If you rolled your own custom `<textarea-autosize>` element without a child `<textarea>`, you’d have to reinvent the wheel to support any or all of those attributes.

Note that this approach, instead of initializing all `<textarea>` elements on page load _and then_ setting up an observer to watch for new ones, declares a single web component in JavaScript (using the `connectedCallback` to look for the nested `<textarea>` node and pass it to the `autosize` function) which means any and all instances get registered for you automatically on page load and thereafter. You don’t have to think about that part. Honestly, it’s a little bit less code than the attribute solution described previously:

```js
import autosize from "https://unpkg.com/autosize@4.0.2/src/autosize.js";

class TextareaAutosize extends HTMLElement {
  connectedCallback() {
    let textarea = this.querySelector("textarea");
    if (textarea) {
      autosize(textarea);
    } else {
      console.error("<textarea-autosize> requires a child <textarea>.");
    }
  }
}
    
customElements.define('textarea-autosize', TextareaAutosize);
```

You can see an example of this on my Codepen: [Auto Resize a `<textarea>` with a Web Component](https://codepen.io/jimniels/pen/GRZKVVL)

## Conclusion

Which is better? Honestly, I’m not here to judge. My implementation of this was about as simple as you can see in the codepens, so I went with the mutation observer mostly because it’s less HTML to write—but either could work.

What would be really neat is if this functionality was supported in the browser natively by just adding the appropriate attribute. Perhaps one day.

## Update: Using a Web Component (Oct. 12, 2020)

I received a [little tip on Twitter from @simevidas](https://twitter.com/simevidas/status/1315767829795401730?s=20) after posting this article:

> For adding functionality to existing elements via web components, the suggested approach is the `is` attribute, e.g.,
> 
> `<textarea is="auto-sized"></textarea>`
>
> (You only need a tiny polyfill for Safari.)
>
> https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example

This is pretty neat! I told you I don’t know how to use web components.

So what does the implementation look like? The HTML:

```html
<textarea is="auto-size"></textarea>
```

And the JavaScript:

```js
import autosize from "https://unpkg.com/autosize@4.0.2/src/autosize.js";

class AutoSize extends HTMLTextAreaElement {
  constructor() {
    super();
    autosize(this);
  }
}
    
customElements.define(
  "auto-size",
  AutoSize,
  { extends: "textarea" }
);
```

That’s it! Note, however, that it does require [a polyfill](https://github.com/ungap/custom-elements-builtin) for Safari.

You can see an example of this on my Codepen: [PROPERLY Auto Resize a `<textarea>` with a Web Component](https://codepen.io/jimniels/pen/MWeawPV).