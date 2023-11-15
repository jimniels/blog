#webComponents

# HTML Web Components: An Example

In [my article on HTML web components](https://blog.jim-nielsen.com/2023/html-web-components/), I said:

> But the unique power of web components (in the browser) is that they can render before JavaScript. React components cannot do this — full stop.

There’s a lot in there I wanted to explain more in-depth, but I just never go to it.

Then a reader kindly emailed me and asked:

> what do you mean? As far as I know, web components need a JS API to be defined. How can they run before JS?

That is a great question. Allow me to explain my thinking.

There are different ways to use web components.

One way of using them requires JavaScript in order for them to “run” and display anything in the browser.

An alternate way of using them allows you to display information/content in the browser before any JavaScript executes, and then you use web component structured JavaScript[^1] to enhance what’s already on display.

In an attempt to explain this more, let’s use an simplified example.

Imagine we want to build a component for displaying a user’s avatar. It will be an image and, when hovered, it will display a tooltip that shows their full name.

<img src="https://cdn.jim-nielsen.com/blog/2023/user-avatar-end-result.png" width="220" height="220" alt="Screenshot of a profile photo with a mouse cursor hovering over it and dispaying a name." />

If you were building this in React, you could imagine a typical implementation looking something like this:

```jsx
import Tooltip from "3rd-party-tooltip-on-npm";

function UserAvatar({ src, name }) {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div>
      <img
        src={src}
        alt={`Profile photo of ${name}`}
        width="32"
        height="32"
      />
      {showTooltip && <Tooltip>{name}</Tooltip>}
    </div>
  )
}

/**
 * Example usage:
 *
 * <UserAvatar
 *   src="https://www.jim-nielsen.com/.well-known/avatar"
 *   name="Jim Nielsen"
 * />
 */
```

This is nice enough. But the point is: it requires JavaScript (React, `3rd-party-tooltip-on-npm`, your JS code) before _anything_ will render in the browser. It’s an all-or-nothing approach. If any JavaScript fails to download, parse, and run, the end user will see absolutely nothing. This is what it will look like:

<img src="https://cdn.jim-nielsen.com/blog/2023/user-avatar-blank.png" width="220" height="220" alt="Screenshot of a mouse cursor on a blank white screen." />

Now, since this is a “component” and the web has components, couldn’t you port it to a web component and remove the dependency on React? Yes, you could. (Note: this code is not meant to be production ready, but illustrative.)

```html
<user-avatar
  src="https://www.jim-nielsen.com/.well-known/avatar"
  name="Jim Nielsen"
></user-avatar>

<script>
  class UserAvatar extends HTMLElement {
    connectedCallback() {
      const src = this.getAttribute("src");
      const name = this.getAttribute("name");
      this.innerHTML = `
        <div>
          <img
            src="${src}"
            alt="Profile photo of ${name}"
            width="32"
            height="32"
          />
          <!-- Markup/code for the tooltip -->
        </div>
      `;
    }
  }
  customElements.define('user-avatar', UserAvatar);
</script>
```

You can see we have a web component that does something very similar to the React component but it doesn’t require React.

It does, however, still require JavaScript. If the user’s browser fails to download, parse, and run any JavaScript, nothing will display on screen. This is what they’ll see:

<img src="https://cdn.jim-nielsen.com/blog/2023/user-avatar-blank.png" width="220" height="220" alt="Screenshot of a mouse cursor on a blank white screen." />

This kind of approach to building web components, per the original question, has a dependence on JavaScript. This web component cannot display anything on screen without JavaScript. It is what I meant in [my original article](https://blog.jim-nielsen.com/2023/html-web-components/) when I said “JavaScript web components”.

But there’s another approach to building web components.

This approach is what Jeremy called [“HTML web components”](https://adactio.com/journal/20618). It does not require JavaScript in order to provide basic functionality. But it does require the author of the component to step back and ask, “What am I trying to build here and how can I do it in a way that progressively enhances the end user’s experience?”

What we want to show to is a profile picture of the user. That shouldn’t require JavaScript, it’s just an `<img>`.

Is there a way for us to provide the basic functionality of `<user-avatar>` so that, before JavaScript loads (if it loads at all), the user still sees something?

With an approach that considers the idea of HTML web components, you can! Starting with the HTML, you could write something like this:

```html
<img
  src="https://www.jim-nielsen.com/.well-known/avatar"
  alt="Profile photo of Jim Nielsen"
  width="32"
  height="32"
  title="Jim Nielsen"
/>
```

Given this HTML, we have a profile photo with some meta information. Note the `title` attribute: this will display a tooltip on hover (in browsers that support it). So before any JavaScript has been downloaded, parsed, and run, a desktop browser could display something like:

<img src="https://cdn.jim-nielsen.com/blog/2023/user-avatar-base.png" width="220" height="220" alt="Screenshot of a profile photo with a mouse cursor hovering over it displaying a browser-native tooltip." />

Is it what we want our end result to look like? No. Will that tooltip work everywhere? No. Is this The Best Thing Ever™️? No.

But that’s not the point. The point is we’re starting with a baseline, core experience that will provide basic functionality and content to a wide array of user agents before any JavaScript is required.

Once you’ve done everything you can in vanilla HTML to provide core elements of your baseline experience, you can begin enhancing the existing markup with additional functionality.

This is where HTML web components shine. You can wrap that basic functionality in a custom element and then, [using the JavaScript APIs of web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements), enhance the markup.

```html
<user-avatar>
  <img
    src="https://www.jim-nielsen.com/.well-known/avatar"
    alt="Profile photo of Jim Nielsen"
    width="32"
    height="32"
    title="Jim Nielsen"
  />
</user-avatar>
<script>
  class UserAvatar extends HTMLElement {
    connectedCallback() {
      // Get the data for the component from exisiting markup
      const $img = this.querySelector("img");
      const src = $img.getAttribute("src");
      const name = $img.getAttribute("title");

      // Create the markup and event listeners for tooltip...

      // Append it to the DOM
      this.insertAdjacentHTML(
        'beforeend', 
        '<!-- code for tooltip here -->'
      );
    }
  }
  customElements.define('user-avatar', UserAvatar);
</script>
```

Again, this code is for illustration purposes, but it shows how you can leverage HTML to provide the basic functionality of a component and then you enhance it with JavaScript.

Now you have something that works pretty decent. It displays _something_ before JavaScript without any layout shift[^2]. And if/when JavaScript loads, you get that nice experience we wanted from the get go.

<img src="https://cdn.jim-nielsen.com/blog/2023/user-avatar-both.png" width="520" height="220" alt="Screenshot of a basic HTML profile photo with a `title` tooltip on the left, and an enhanced tooltip with a profile photo on the right." />

Hopefully this answers the question of, “I thought web components required JavaScript? How can they run before JavaScript?”

It’s all about approach. Web components give you an approach of augmentation, where you can provide basic functionality and then progressively enhance the experience depending on the end user’s capabilities.

Endnote: I know, I know, there’s a whole lot more that could be said about all the above. For example, a JS framework like [Remix](https://remix.run/) allows you to do something very similar to the above: provide basic HTML over the wire and then enhance (i.e. hydrate) that experience with JavaScript (i.e. React). RSC looks like it’ll do something similar — but that’s all a discussion for another day.

[^1]: I wrote about [how I used custom elements to structure my JavaScript and enhance markup](https://blog.jim-nielsen.com/2023/web-components-icon-galleries/). Then Eric wrote [a thoughtful, lengthy post](https://meyerweb.com/eric/thoughts/2023/11/01/blinded-by-the-light-dom/) on the same idea, but going way, way deeper into how web components can serve to structure and enhance your HTML, CSS, and JS.
[^2]: [Zach’s talk](https://www.youtube.com/watch?v=R4Ri4ft7bXY) is a great introduction to this idea of building web components in a way that delivers something useful in the initial HTML while also preventing layout shift as JavaScript enhances the markup with additional functionality — a very important UX detail IMO.