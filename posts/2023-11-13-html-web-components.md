# HTML Web Components

I think the word “component” in “web components” confused a lot of people — at least it did me.

“Web components” sounded like the web platform’s equivalent to “React components”. JSX had `<MyComponent>` and now the web had `<my-component>`.

But when you try building web components the same way you build React components, it’s easy to get frustrated and give up because web components don’t work like React components — I know I gave up a few times.

[The grain](https://frankchimero.com/blog/2015/the-webs-grain/) of a React component is not the grain of a web component. Their design prioritize different functionality and forms of use. If you try to use one like the other, you’ll fight the direction of their natural grain.

Web components have their own grain and it favors enhancement over replacement. What do I mean by this?

A typical React component might look like this[^1]:

```jsx
<UserAvatar
  src="https://example.com/path/to/img.jpg"
  alt="..."
/>
```

You could write a web component this same way, e.g.

```html
<user-avatar
  src="https://example.com/path/to/img.jpg"
  alt="..."
></user-avatar>
```

But the unique power of web components (in the browser) is that they can render _before_ JavaScript. React components cannot do this — full stop.

This feature of web components [encourages a design of composability](https://blog.jim-nielsen.com/2023/as-good-as-html/). Rather than an empty “shell component” that takes data and (using JavaScript exclusively) renders the entirety of its contents, web components encourage an approach of composing core content with HTML and then wrapping it in a custom element that enhances its contents with additional functionality.

```html
<user-avatar>
  <img src="https://example.com/path/to/img.jpg" alt="..." />
</user-avatar>
```

This specific flavor of componentization is what Jeremy calls [“HTML web components”](https://adactio.com/journal/20618):

> If your custom element is empty, it’s not an HTML web component. But if you’re using a custom element to extend existing markup, that’s an HTML web component.
>
> React encouraged a mindset of replacement: “forgot what browsers can do; do everything in a React component instead, even if you’re reinventing the wheel.”
>
> HTML web components encourage a mindset of augmentation instead.

I like that term “HTML web component”. It stands in contrast to a “JavaScript web components” which would be an empty element whose functionality and contents rely exclusively on JavaScript.

Per my earlier example, this would be a JavaScript web component:

```html
<user-avatar
  src="https://example.com/path/to/img.jpg"
  alt="..."
></user-avatar>
```

It relies exclusively on the presence of JavaScript and is meaningless to the end user without it.

Whereas this would be an HTML web component:

```html
<user-avatar>
  <img src="https://example.com/path/to/img.jpg" alt="..." />
</user-avatar>
```

It has meaning and content without JavaScript — then is enhanced by its presence.

This idea of augmentation/enhancement over replacement is intriguing.

## On The Web, Augmentation Wins in the Long Run

Augmentative approaches work best on the web because 1) the web’s grain encourages enhancement to improve resilience, and 2) that’s really the best way to iteratively change something as big as the web.

Eventually all the best ideas of web-adjacent frameworks are subsumed into the platform to work in ways that augment the existing technology rather than replace it wholesale.

XHTML wanted to replace HTML4, but HTML5 wanted to augment it. HTML5 won.

Networking libraries wanted to replace `XMLHttpRequest` and their best ideas were eventually ported into the `fetch`  standard — which exists in more places than just the browser these days!

The best ideas of Sass and jQuery were ported to the browser.

[Typescript’s best ideas are going to the browser](https://blog.jim-nielsen.com/2023/the-flavors-of-typescript/), but in a way that works to enhance not replace what exists.

With web components, you might even say React’s component model is being ported to the browser. But it’s being done in a way that works to enhance how the web already works, not replace it.

My takeaway is: if you’re looking for longevity, opt for a technical approach of augmentation and enhancement over replacement. The web’s grain is arranged in that direction.


[^1]: I think React is trending towards becoming more like HTML over the years. Dan Abramov notes how [component composition over prop drilling](https://x.com/dan_abramov/status/1623771055943831553?s=20) is a “top react skill to learn in 2023”. Even [the react docs](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) specifically call out the composability of HTML and how you might want to [follow HTML’s example in your JSX](https://cdn.jim-nielsen.com/blog/2023/react-docs-composable-jsx.png).