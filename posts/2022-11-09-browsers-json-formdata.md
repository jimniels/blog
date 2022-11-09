# Browsers, JSON, and FormData

[Jeremy wrote](https://adactio.com/journal/19573) about what a boon the new view transitions API could be for the web:

> If we get a View Transitions API that works across page navigations, it could potentially turbo-charge the web. It will act as a disincentive to building single page apps—you’d be able to provide swish transitions without sacrificing performance or resilience at the alter of a heavy-handed JavaScript-only architecture.

While getting browser-native support for transitions could act as an antidote to the JavaScript-heavy SPA experiences common today, I think there’s another equally significant change that could decrease the amount of JavaScript shipped to modern websites: we need either 1) more APIs that speak [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData), or 2) browsers that speak JSON.

Allow me to try and explain.

## JSON Requires JavaScript

A big impediment to moving away from SPAs is that we’ve collectively spent years building up an entire infrastructure of backend services which power the internet by communicating with browsers in JSON — a format that is _not_ the default method of communication for web browsers. Browsers cannot communicate user actions over the network as JSON _without_ the use of JavaScript. It’s impossible.

What do I mean by this?

By default, browsers make requests via HTTP methods (GET, POST). If a server responds with HTML, the browser knows how to render a UI from that response. If a server responds with JSON, the browser can’t render any UI unless it has some corresponding JavaScript instructions telling it how. JSON _requires_ JavaScript to render any kind of user interface. HTML does not. Browsers know how to turn HTML into human-readable, user-actionable interfaces with or without JavaScript.

In this way, browsers communicate and render GUIs at their most basic level in HTML via HTTP. 

- `<a>` element clicked? That’s an HTTP GET for another resource whose response, if HTML, will render something new in the browser.
- `<form>` element submitted? That’s an HTTP [GET or POST](https://stackoverflow.com/questions/8054165/using-put-method-in-html-form) _with user-supplied data_ for another resource whose response, if HTML, will render something new in the browser.

The `<form>` element in HTML allows users to supply data to the browser and send it to a server without the use of JavaScript. Browsers do this on their own by sending a request, _not_ as `application/json`, but as `application/x-www-form-urlencoded` ([the default MIME type of a form submission](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-enctype)). To send an HTTP request as JSON requires that the client have JavaScript enabled and working (bug free).

To reiterate: **every request a browser makes with a JSON payload requires functioning JavaScript** — every newsletter signup, every contact inquiry, every account creation request, every e-commerce purchase, every _you name it_. No exceptions.

That’s pretty wild when you think about it. Why are there _so many_ APIs that communicate solely in JSON on the web when browsers can’t even POST in JSON without JavaScript? Granted, many APIs probably aren’t designed to communicate directly with browsers — but many are and yet they only speak JSON! In those cases, that is assuming a lot by not even communicating in the lingua franca of the browser.

I can’t help but think: only once we start building web APIs that speak in the default communication idiom of browsers will be able to break out of a complete reliance on JavaScript.

To put in bluntly: there’s no progressive enhancement if all your APIs only accept JSON payloads directly from the browser.

If you stopped shipping all JavaScript to the client tomorrow, would the backend services you depend on support receiving information via the browser’s default mechanism for sending user data?

## A Simple Example

Imagine I have a simple static site with a call to action to sign up for my newsletter. I drop a static HTML file on a web server with some `<form>` markup which the browser will use to render a GUI where the user can enter their information.

```
<form>
  <label for="email">
    Sign Up For My Newsletter
  </label>
  <input type="email" id="email" />
  <button type="submit">
    Sign Up
  </button>
</form>
```

Now I need a server _somewhere_ to collect this information and store it. 

So many third-party services have APIs you can integrate with and guess what? They probably speak JSON exclusively. But browsers don’t send user-entered data as JSON by default, so what’s one to do? You can:

1. Create a URL that accepts the structure of a default browser POST request (`<form method="post" action="/my-url">`).
2. Throw progressive enhancement out the door, expect JavaScript to work for all your users, and drop a `<script>` tag on the page somewhere that handles the logic to submit a JSON payload to whatever service will store this information for you.

While I love JAMStack and everything it has done to simplify and make more accessible many aspects of web development, this is a trade-off that cuts deep. Funnily enough, the trade-off is in the very name: JAM standing for JavaScript, APIs, and Markup. In other words, it assumes — even implicitly requires — JavaScript as a functioning dependency in the browser[^1].

Once you need to collect one simple piece of data from a user on a “static” web page — like `<input type="email" />` — you either 1) now need to control a server that accepts `application/x-www-form-urlencoded` payloads, or 2) need to require JavaScript for your page to work.

Quick plug: this is where a framework like Remix which supports progressive enhancement really shines. Remix makes it incredibly easy to support `<form>` submissions as the browser default `application/x-www-form-urlencoded` type _or_ as a JavaScript-enhanced `application/json` type. [Read the docs for more info](https://remix.run/docs/en/v1/guides/data-writes#html-form-post).

## Conclusion

In a recent article, Remy Sharp comments that [a form should be postable without JavaScript](https://remysharp.com/2022/10/13/two-javascripts) which, as noted above, means that  an associated endpoint that speaks more than just JSON is required.

> A form should be postable without JavaScript. For instance, I'm sending you my contact details - if JavaScript broke (bad connection) or is disabled (you're spamming my face with subscribe notices), then a form should post details to the server and then reload with page like "thanks for you deets". Not rocket science.
> 
> Try to implement that using Next.js…and I can't think…how. You can post to "api endpoint", but that'll return JSON…I'm sure there's a work around, but the point is that it has to be worked around, intentionally.

I think until we start building our APIs to speak in more than just JSON — or we get browsers to speak JSON without requiring JavaScript[^2] — it’s going to be difficult for progressively-enhanced web pages to gain traction over JavaScript rendered apps.

[^1]: To their credit, the folks at Netlify support [`<form>` submissions without JavaScript](https://docs.netlify.com/forms/setup/) though I would hazard a guess that feature isn’t used nearly as often as a JavaScript `e.preventDefault()` on the form submission and the sending of a JSON payload instead. Third-party JSON APIs are so often the recipients of user data entered directly in the browser. If anybody out there is using Netlify’s `<form netlify>` feature to support progressive enhancement, hit me up with the details on how you’re doing it!
[^2]: AFAIK, there’s no way (currently) to declaratively describe a form in HTML that makes a request with JSON (though [there appears to have been an effort to do so at one point](https://www.w3.org/TR/html-json-forms/)).