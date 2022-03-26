#css #darkMode

# Conditional Style Loading? Not So Fast

I wrote a post a while back about [conditionally loading styles using media queries](https://blog.jim-nielsen.com/2019/conditional-syntax-highlighting-in-dark-mode-with-css-imports/). 

The main idea is: only load the styles necessary, given the user’s preferences which you detect via media queries. For example: user is in dark mode? Only load dark mode styles. You could do it using `@import` syntax:

```css
@import url("light-mode.css") (prefers-color-scheme: light);
@import url("dark-mode.css") (prefers-color-scheme: dark);
```

Or using the `media` attribute of the `<link>` element:

```html
<link
  rel="stylesheet"
  href="light-mode.css"
  media="(prefers-color-scheme: light)"
/>
<link
  rel="stylesheet"
  href="dark-mode.css"
  media="(prefers-color-scheme: dark)"
/>
```

I assumed that the browser would only _load_ the styles it needed, which was a neat idea given the simplistic, declarative nature of it all.

About two years later, [@marvindanig hit me up on twitter](https://twitter.com/marvindanig/status/1414800006830247938?s=21) asking if that code actually works.

> hi @jimniels! 
>
> I have a question about your post on 'Using @import in CSS to Conditionally Load Syntax Highlighting':
>
> In your browser's console > resources, does the browser request & load css for both light and dark modes ignoring the (prefers-color-scheme: dark) conditional?

My first thought was “umm…I think it works? That’s why I wrote about it.” But when I re-tested the idea, [it wasn’t working](https://twitter.com/jimniels/status/1414828621068443649?s=20)!

It’s very possible (and likely) that my memory is bad and this never actually worked. Long story short: if you use media queries with `@import` the referenced stylesheet will _always_ load over the network.

```css
/* Both of these will load over the network */
@import url("some-styles.css") (min-width: 1px);
@import url("some-other-styles.css") (min-width: 1000000px);
```

Same for the `<link>` element:

```html
<!-- Both of these will download over the network -->
<link
  rel="stylesheet"
  href="some-styles.css"
  media="(min-width: 1px)"
/>
<link
  rel="stylesheet"
  href="some-other-styles.css"
  media="(min-width: 1000000000px)"
/>
```

In hindsight, this kind of makes sense. Imagine, for example, you have two stylesheets: one for light mode, one for dark. If the user agent is currently in light mode the browser would only download the light mode stylesheet. Then, if the user were to switch to dark mode, the browser would have to go fetch the dark mode stylesheet. This would (I imagine) result in a strange flash or lag in style re-painting, since the new styles would have to be fetched over the network, parsed, and then applied.

As another example, imagine you resized your browser from 1200px to 800px, and somewhere along the way you passed a breakpoint which required loading a conditional stylesheet with alternate layout rules. It wouldn’t feel very responsive if those rules had to be retrieved over the network, parsed, and then applied to the document.

In other words: all styles—regardless of the specified media queries—are loaded over the network. The specified media queries appear to help the browser determine 1) whether or not to apply the styles, and 2) the priority in which to fetch the styles (media queries that don’t match the current user agent get a lower load priority).

## The Confusing Part

I think the most confusing part of this for me was that the docs I read made me think the styles were conditionally loaded and applied, not solely conditionally loaded.

For example, [MDN says of `@import` with a media query](https://developer.mozilla.org/en-US/docs/Web/CSS/@import):

> If the browser does not support any these queries, it does not load the linked resource.

And for `<link media="...">`, [MDN says](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link):

> You can also provide a media type or query inside a media attribute; this resource will then only be loaded if the media condition is true.

From what I can tell, both of those statements are untrue. The browser _loads_ the styles regardless of the media query (though with a different priority) but doesn’t _apply_ them unless the media query matches.

What’s even more interesting here is [what the spec says on the matter](https://drafts.csswg.org/css-cascade/#at-import):

> The import conditions allow the import to be media– or feature-support–dependent. In the absence of any import conditions, the import is unconditional…If the import conditions do not match, the rules in the imported stylesheet do not apply, exactly as if the imported stylesheet were wrapped in @media and/or @supports blocks with the given conditions.

I interpret that to mean exactly what I’m seeing in terms of browser implementation: if media queries are applied to a stylesheet import, the styles in that import will not apply. They still get loaded, but they don’t apply—“exactly as if the imported stylesheet were wrapped in @media”.

However, the spec does seem to leave the implementation detail of loading or not loading a stylesheet up to browsers.

> User agents may therefore avoid fetching a conditional import as long as the import conditions do not match. 

That said, the spec goes on to be more exacting of imports using the @supports syntax (emphasis mine):

> if a &lt;supports-condition&gt; blocks the application of the imported style sheet, **the UA must not fetch the style sheet** (unless it is loaded through some other link) and must return null for the import rule’s CSSImportRule.styleSheet value (even if it is loaded through some other link).

The spec points to this rule as an example of how a developer can provide fallback rules for legacy browsers without impacting network performance for newer browsers.

```css
@import url("fallback-layout.css") supports(not (display: flex));
@supports (display: flex) {
  /* some rules here */
}
```

After reading the spec, here’s how I now understand all of this:

- Your media queries _cannot_ control whether an imported stylesheet loads over the network. That is left up to the browser to decide.
- Your media queries _can_ control whether an imported stylesheet applies to the document.
- Support rules _can_ control whether an imported stylesheet loads over the network _in addition to_ whether its styles apply to the document.

I’m still not sure I find these rules to match with how browsers work today. Check out [my codepen testing these ideas](https://codepen.io/jimniels/pen/VwbPaVa). It seems like specifying a @supports condition still loads a file over the network. But maybe I’m missing something?

Either way, this has the concept of media queries with `@import` and `<link>` syntax more clear in my head. Now my mental model is probably only 20% wrong instead of totally wrong like it was before.

