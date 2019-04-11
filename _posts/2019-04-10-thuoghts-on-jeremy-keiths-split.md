---
title: Thoughts on Jeremy Keith’s “Split”
date: 2019-04-10
---

Jeremy recently wrote an article called [“Split”](https://adactio.com/journal/15050) that caught my attention (to be honest, Jeremy’s writing always catches my attention, you should [follow him](https://adactio.com/) if you’re not already).

> On the one hand, you’ve got the raw materials of the web: HTML, CSS, and JavaScript. This is what users will ultimately interact with.

This is what [Brad](https://adactio.com/journal/14891%23Brad%2520says) called the “front of the front-end”. So what is the “back of the front-end”?

> On the other hand, you’ve got all the tools and technologies that help you produce the HTML, CSS, and JavaScript: pre-processors, post-processors, transpilers, bundlers, and other build tools.

And where does Jeremy find himself in this mix?

> I’m definitely more of a front-of-the-front-end kind of developer. I have opinions on the quality of the materials that get served up to users; the output should be accessible and performant. But I don’t particularly care about the tools that produced those materials on the back of the front end. Use whatever works for you (or whatever works for your team).

Then he references a recent post by the team at The Guardian about how they changed their “rendering tier” to render HTML on the server using modern technologies (react) and techniques (CSS-in-JS). Jeremy made this interesting observation, which I had never considered or heard before:

> [The Guardian is] choosing to use CSS-in-JS (although, to be pedantic, there’s no C anymore so technically it’s SS-in-JS). 

Woah. That’s interesting. I’d never thought of that before, but it’s true. Although I think it’s worth pointing out that is not a blanket statement. I think there’s some nuance in there. From my experience, [some](https://reactjs.org/docs/dom-elements.html#style) “CSS-in-JS” techniques result in your styles being applied directly to an HTML element via its style attribute, i.e. `<div style="color:red">` whereas [other](https://www.styled-components.com/) “CSS-in-JS” techniques result in CSS rulesets being written into the HTML via a `<style>` element (thus resulting in true “CSS” rules that cascade). My point being, some “CSS-in-JS” techniques rob you of the “C” whereas others preserve the power of  the “C”; not all “CSS-in-JS” techniques are created equal. That said, I really like Jeremy’s pedantic point as it gives me new insight into how I might go about explaining the differences between the two approaches (even though it might not be as simple as saying “CSS-in-JS” is actually just “SS-in-JS”).

Which brings me to Jeremy’s next point:

> As long as the “JS” part [of “CSS-in-JS”] is JavaScript on a server, then it makes no difference to the end user, and therefore no difference to me. Not my circus, not my monkeys. For users, the end result is the same whether styling is applied via a selector in an external stylesheet or, for example, via an inline style declaration (and in some situations, a server-rendered CSS-in-JS solution might be better for performance).

I think there’s some more nuance in this as well. Depending on the “CSS-in-JS” technique being used, it _could_ make a difference to the end user (and therefore _should_ possibly make a difference to us). 

For example, if the end result is a sever-rendered page of HTML with a bunch of styles applied inline to various HTML elements, you have to ship those styles with every single page of HTML that you serve where elements are styled identically. In contrast, if you had an external stylesheet of CSS referenced via a `<link>` tag in all your HTML pages, then that resource gets cached the first time your page loads, and therefore the browser doesn’t have to load the styles for your elements which share identical styles every time a page loads. In other words, if you wanted every `<h1>` element to be red, you could write `h1 { color: red }` in a stylesheet and link to it on every HTML page (browser caches that stylesheet resource and only has to load it once across all your pages). Or, your HTML could contain `<h1 style="color:red"></h1>` every single time you use an h1 across every single page. Granted this is a simplistic example, but you can imagine how in the second example (inline styles), as your usage of styles compounds, you’re going to end up shipping a lot more bytes to the client because you’re styles have to be declared inline on every element to which they are applicable, whereas the stylesheet approach results in one declaration applied everywhere and fetched once.

I guess my point here is that I don’t think it “is the same whether styling is applied via a selector in an external stylesheet or…via an inline style declaration”. As Jeremy points out, “in some situations, a server-rendered CSS-in-JS solution might be better for performance” and I think the reverse would also be true: in some situations, a stylesheet solution might be better for performance.

So which should you use? The answer, my friend, is blowing in the wind.
