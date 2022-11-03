# Remix and the Alternate Timeline of Web Development

There’s [a scene](https://www.youtube.com/watch?v=W3LwlSlo5cw) in “Back to the Future” where Doc Brown tries to describe the idea of time travel and the possibility of an alternative timeline of events.

> Prior to this point in time, somewhere in the past, the timeline skewed into this tangent creating an alternate 1985. Alternate to you and me but reality for everyone else.

<img src="https://cdn.jim-nielsen.com/blog/2022/web-dev-alternate-timeline.jpg" width="800" height="533" alt="" />

A related analogy struck me in trying to illustrate the conceptual goals of Remix. To understand Remix, you must first understand how we got to where we are in web development because I think Remix and its founders are a bit like Doc Brown: trying to convince us that, at a point in the past, the timeline for web development skewed into the tangent we are in today — our reality — but it doesn’t have to be that way.

<img src="https://cdn.jim-nielsen.com/blog/2022/web-dev-doc-brown.png" width="843" height="621" alt="" />

Now I do not claim to be a historian and this is by no means a comprehensive view of web development history, but for simplicity’s sake allow me to summarize how it makes sense in my brain:

- In the beginning was the server that rendered all the things.
- Then came client-side JavaScript + XHR which could enhance the experience on the client.
    - e.g. use `e.preventDefault()` to bypass the default, built-in behavior of browsers — such as link navigation, form submission and serialization, and network call cancellation — and ~~re-invent the wheel~~ handle _all_ these things yourself with client-side JavaScript.
- Now you had duplicate logic for templating and data retrieval so it could live and execute on _either_ the client or the server.
- It was way too hard to duplicate all that stuff and maintain a progressively-enhanced experience, so all that code was re-unified and moved exclusively to the client (hence the SPA).
- A loss of progressive enhancement ensued, browser features were re-invented with client-side JS, and the user experienced suffered due to megabytes of JS and a cascading network waterfall.
	- <img src="https://cdn.jim-nielsen.com/blog/2022/web-dev-history-spinners.jpg" width="444" height="250" alt="Buzz Lightyear meme: “spinners, spinners everywhere" />
- The Next Big Thing™️ — ISR, DPR, RSC, lambdas, etc. — attempted to solve the problems created by this history.

What’s interesting about this history is how each step asked: how do we fix what’s inadequate with our current situation?

Remix, however, came along and asked: what if, rather than fixing where we are now, we went back a few steps to the point in time where we began to disregard the role of the browser in web development and imagined a different future that leans into the strengths of the browser (and the client/server model) rather than trying to bypass or reinvent them?

Allow me to give some context on one of the most compelling ideas I found when first introduced to Remix: dual responses — HTML or JSON — for a single route (i.e. component) allowing for a seamless, progressively-enhanced user experience. But first, a look at our current timeline.

## Progressive Enhancement: Write Your App Twice?

In the early days, if you had a static page that allowed you to link to more information, you’d use a link: `<a href>`. 

Then along came JavaScript and XHR, which allowed you to prevent loading an entirely new page just to pull in the new information. For example, got a “Notifications” link on your website? Instead of linking to an entirely new page and necessitating a full page reload, JavaScript + XHR would let you pull that information into the existing page.

But wait, previously your server would render that “Notifications” HTML page by fetching JSON data from an API or DB. If you’re going to `e.preventDefault()` on a link in the client, the client will now have to do that same work, i.e. fetch JSON and render HTML based on logic.

So now, to support a a progressively-enhanced experience, you need to duplicate all the logic on your server and put it on the client.

That’s hard. Not just duplicating all the server logic, but keeping it in sync, as well as keeping sensitive auth info secret whilst exposing it over the wire (not to mention all the browser defaults you lose when you `e.preventDefault()` something like a `<form>`).

This was one of the big points of friction against supporting a progressively-enhanced experience, as it felt like you had to write your app twice: once on the client, once on the server.

So, to address that issue and only have to write apps once, we just accepted having all that logic in only one place — and that became the client, making experiences sans-JavaScript impossible.

## Progressive Enhancement + Remix: Writing Your App Once!

What’s incredible about Remix is how it enables you to leverage client-side JavaScript to enhance a webpage’s experience _without_ the need to write your app twice (once on the client, once on the server).

How?

Remix has routes (including nested ones). Each route corresponds to an HTTP request by the user. This means the logic for data retrieval, templating, and mutations all happen in a single file (this is [how data flows through Remix](https://remix.run/blog/remix-data-flow)). 

When a user first requests a page, like `/foo/1234`, the server will return the HTML constituting a typical web page (header, some content, and a footer). When the user clicks a link in the header to access “Notifications”, say `<a href="/notifications">`, Remix can magically handle this for you in one of two ways:

1. A full page reload: with JavaScript disabled, the default mechanics of the browser take over and a new page is requested. The Remix server will return a new HTML document with the header, content (notifications), and footer.
2. An in-page transition: with JavaScript enabled, Remix can  intercept that link and request _the data_ for `/notifications`. The server will return this data as JSON to the client and the client will use React to reconcile that data into the view — enabling a SPA-like experience.

All of this happens with a request to the same resource, e.g. `/notifications`!

How does it work?

Through the magic of the Remix compiler, route files can be split up so the code necessary for the client to do its own rendering and create SPA-like experiences can be sent down the wire and hydrated into the client. The real beauty is: you get to decide when, where, and how this happens, on a route-by-route basis!

For example: by default, route requests respond with HTML, e.g. a request to `/notifications` will return an HTML representation of that entire view (header, content, and footer). However, under the hood, Remix knows it can make a request to `/notifications?_data=routes/notifications` and that will return _the JSON data your server component uses to render the full-page, HTML representation of `/notifications`_.

That means, for a page with JavaScript that uses `<Link to="/notifications">` to navigate, under the hood Remix will:

- `e.preventDefault()` on the link
- `fetch` request to `/notifications?_data=routes/notifications` 
- Server returns the data for that route to the client and React reconciles that data into that part of the page.

<img src="https://cdn.jim-nielsen.com/blog/2022/web-dev-route-diffs.png" width="1200" height="930" alt="" />

In this way, you can write apps once with progressive enhancement: HTML that works before JavaScript and then, where JS is present, Remix handles sending down the data necessary to enhance (i.e. hydrate) the HTML experience for whatever compelling, SPA-like, best-in-class user experience you can dream up.

## An Incredible Pattern

As someone who never knew exactly how to do progressive enhancement in a way that allowed the server to provide different responses depending on the capabilities of the client, [I was blown away](https://twitter.com/jimniels/status/1484316461652856832) when I first saw it [explained](https://www.youtube.com/watch?v=jd_bin5HPrw):

> [This] blew my mind. The power of being able to declaratively 1) use JS to get back JSON which transitions states in your UI _while simultaneously_ 2) supporting use of native browser functionality to get back HTML _on the same route_ is 🤯

It’s worth noting again how Remix solves this thorny problem around progressive enhancement which sometimes needs HTML and sometimes needs data+templates. You don’t have to write your app twice!

- User’s first visit? Route component renders on the server and the initial page request is returned as HTML. If JS is present, Remix then hydrates the page for client-side navigations.
- Subsequent client-side navigation? Links can be intercepted by Remix, route data fetched as JSON, and hydrated back into the page.
- Components, tied to routes, are the magic. You write one component and either:
	- The server fetches the data, passes it to the component, and renders it returning HTML, or
	- The client fetches the data from server (as JSON), passes it to the component, and React reconciles it into the DOM.

Sidenote: this is impossible with SSG (although I suppose you can shoehorn anything) because SSG is, by its very nature, a 1:1 paradigm for routing. Every request corresponds to a file on disk. You can’t do query params to modify the request without a special redirect to point that query-parameterized request to a different file on disk. Anything beyond this (lambdas, etc.) is an escape hatch from the fundamental pattern (and value-add) of SSG: predictable file hosting based on a “route-to-file” paradigm.

(For an even more technical explanation of how Remix works under the hood, you can [read more in the Remix docs](https://remix.run/docs/en/v1/pages/technical-explanation).)

This pattern that supports progressive enhancement by default is one of the reasons why I see, like Doc Brown, an alternate timeline. Remix takes me back to the fork in the road where progressive enhancement was a good idea before it became seemingly impossible because of the “code duplication” problem. It shows us a different future that could’ve been and can still be!