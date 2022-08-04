#html

# Web Languages as Compile Targets

I recently read [an article by Eric Bailey](https://ericwbailey.design/writing/open-ui-and-implicit-parent-child-relationships-in-html/) where he calls attention to how libraries and frameworks create their own conventions and patterns that are distinct from their standardized equivalents. 

He references an example on Twitter where someone noted you can use the `<details>` element to “create a native HTML accordion,” to which someone responded: “this works without Bootstrap? 🤯”

What’s the problem here? From Eric:

> the problem that arises from this situation is that it teaches people to think and work framework-first. When that happens, the hard-won, baked-in interoperability and, importantly, accessibility of the [web] platform is thrown away. It’s a compounding problem, as well: The more people don’t use the elements made available to us, the more the notion exists that they’re irrelevant.

This is a great insight that I’d like to explore more.

Libraries and frameworks try to fix, or at least fill the gaps, where platform APIs are lacking. Because they fill gaps, that’s a kind of tacit acknowledgement that native web APIs aren’t sufficient. 

Having [modern browser APIs lag behind modern libraries and frameworks](https://blog.jim-nielsen.com/2019/yesterdays-questions-answered-in-todays-platform-apis/) is how we’ve chosen to build for the web. I think it’s worth explicitly acknowledging the downsides to that approach, one being: because web APIs don’t always provide what people need, they’re more likely to use a framework. This leads people to think “framework-first” as they build, which means they tend to think “platform-last”. 

Eric continues:

> This is a moment of weird friction on the web. The platform continues to shift from a document-based model to an application-based one...
> 
> In treating HTML like a compile target, I wonder if we’re turning people who are HTML-literate into the equivalent of engineers who can program in Assembly.

This resonates for more than HTML. It increasingly feels like all web languages—HTML, CSS, and JS—are compile targets.

HTML is a compile target from authoring in WYSIWYGs, Markdown, or some other raw data source compiled through templating.

CSS is a compile target from authoring in Sass or Less. Or it requires _some_ build tool or processing to work on your project, like PostCSS or Webpack. Or you can avoid cascading style sheets altogether and compose styles in JavaScript.

JS is a [compile target for almost anything](https://github.com/jashkenas/coffeescript/wiki/List-of-languages-that-compile-to-JS) these days. You can author in next generation ECMAScript and compile. Or author in a JS superset like TypeScript and compile. Or author in a different language altogether like Ruby and compile. And I haven’t even got to compiling framework-specific syntax yet, like JSX for React or SFCs (single file components) for Vue.

And we have’t even arrived at WASM yet.

It’s ironic that one of the early signals of pride and craft for building on the web was “handcrafted” HTML and CSS, something altogether now replaced by the cryptic output of machines.

Christian Heilman covers ground on this whole topic in his article about [teaching HTML and CSS](https://christianheilmann.com/2021/01/21/teaching-html-and-css/):

> The information [about] what an HTML document needs to even allow the browser do its thing isn’t exciting.
>
> But it is important. Not teaching HTML by explaining what it means and does results in people re-inventing it.
>
> We’ve all seen DIV/SPAN constructs that are, in essence, an anchor. And they fail to be keyboard accessible. Then people add some ARIA and a tabindex to make them accessible. Well, not really. It is more important to not flag an automated accessibility test fail than making it accessible.

His point being:

> We keep getting back into the “add whatever is needed to get to the result quickly” mode. The mode we learned when we got introduced to HTML/CSS as a technology stack to paint on the web.

HTML often gets written as part of a transaction: write something, anything, and _see_ a result. Use it to group words, hook into styles and interactions, or construct specific pieces of UI. This has almost nothing to do with communicating meaning and structure.

HTML often becomes scaffolding for building UI (for which few elements are needed) when it was designed to be markup for outlining the meaning and interactivity of content (for which many elements are needed). As [Yehuda Katz noted on twitter](https://twitter.com/wycats/status/1376963953054547970?s=20):

> HTML (especially when enhanced with ARIA) is humanity's best effort to create a single set of portable semantics for the interaction patterns in computing.

Since frameworks and libraries live in a space designed for discovering and vetting browser API candidates—implicitly if not explicitly—then it follows that having transparent [seams](https://adactio.com/journal/6786) to the abstractions upon which they are built (HTML, CSS, and JS) would be logical. That might help people think more platform-first and framework-second.
