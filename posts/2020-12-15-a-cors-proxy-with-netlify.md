#netlify

# Setup a CORS Proxy With Netlify

**Update 2021-10-27**: Turns out Netlify has deprecated the ability to do this—and this post is specifically called out in [the deprecation announcement](https://answers.netlify.com/t/recent-change-open-proxy-deprecation/39921). Oops.

_tldr_ if you’re hosting with Netlify, you can use [their rewrites and proxies](https://docs.netlify.com/routing/redirects/rewrites-proxies/) functionality to bypass CORS issues when fetching resources with client-side JavaScript. In `netlify.toml`

```toml
[[redirects]]
  from = "/cors-proxy/*"
  to = ":splat"
  status = 200
  force = true
```

Now, from the domain that you set this up on, you can have client-side JavaScript that accesses content from another domain, i.e.

```js
const url =
  "https://www.theverge.com/2020/12/13/22172610/oracle-moves-headquarters-california-texas-hewlett-packard-tesla";

fetch(`/cors-proxy/${url}`)
  .then(res => res.text())
  .then(console.log); // <!DOCTYPE html>... [from theverge.com]
```

What about local development? If you’re hoping to be able to test something like this on localhost without having to use [Netlify’s custom server](https://www.netlify.com/products/dev/), you could use a CORS proxy like [cors-anywhere](https://cors-anywhere.herokuapp.com/) for localhost and Netlify’s proxy when in production, i.e.

```js
const PROXY = window.location.hostname === "localhost"
  ? "https://cors-anywhere.herokuapp.com"
  : "/cors-proxy";
  
fetch(`${PROXY}/https://theverge.com/path/to/story...`)
  .then(...)
```

Disclaimer: CORS was designed for a reason. If you are going to circumvent it, know why you’re doing it, proceed with caution, and don’t blame me for showing you the dark side of the force.

## A Little Background

I was working on a side project where I wanted the client-side JavaScript for a site I host on `my-domain.com` to be able to fetch raw HTML and other resources from any domain on the web. As you likely already know, because of CORS this isn’t possible through client-side JavaScript only. 

A general workaround to this kind of dilemma is to have a server  running somewhere that would proxy all these requests for you. “Hey server that I own, go fetch me the HTML for the URL `https://theverge.com/...`”. Seeing as the site I was building didn’t have a server but was a “static site” hosted through Netlify, I needed another solution.

My first thought was: ”I know, I’ll create a lambda function where I pass the URL, it makes the request, then sends it back.” That would mean invoking a lambda function every time I wanted to fetch another resource on the web, but I guess that’s ok.

But then, lo and behold, I found Netlify already supports doing proxied request with their redirect/rewrites engine. From [the docs](https://docs.netlify.com/routing/redirects/rewrites-proxies/#proxy-to-another-service):

> Just like you can rewrite paths like `/*` to `/index.html`, you can also set up rules to let parts of your site proxy to external services. Let’s say you need to communicate from a single-page app with an API on `https://api.example.com` that doesn’t support CORS requests. The following rule will let you use `/api/` from your JavaScript client:
> 
> `/api/*  https://api.example.com/:splat  200`
> 
> Now all requests to `/api/...` will be proxied through to `https://api.example.com` straight from our CDN servers without an additional connection from the browser.

That’s incredibly powerful, especially if you take off the qualified domain at the front and let it proxy a request for you to _any_ domain on the web (as specified by the client):

`/cors-proxy/* :splat 200!`

No need to invoke a lambda function, just use what Netlify already gives you with their redirects engine! FWIW: I’m probably abusing the designed intention of this functionality by doing this. Speaking of abuse...

## Flying Too Close to the Sun

As if this wasn’t powerful enough, I started to think, “sure would be nice if I could have a single CORS proxy I could access for any site I deploy across the web...”

That’s essentially what CORS proxies like [cors-anywhere](https://cors-anywhere.herokuapp.com/) do for you. But what if I could own it myself?

I started to think I could use Netlify’s rewrites in combination with their headers to allow CORS requests from any domain. Something like this:

```toml
[[redirects]]
  from = "/cors-proxy/*"
  to = ":splat"
  status = 200
  force = true
  headers = {Access-Control-Allow-Origin = "*"}
```

That _seemed_ like it would work, but a cross-site request to that endpoint failed with a CORS problem. After a little more research, I realized I had misinterpreted the Netlify’s documentation. Big thanks to [lukechilds’ post in Netlify Community](https://community.netlify.com/t/cant-set-headers-on-proxied-redirect/669/5), for helping clarify that the syntax above sets a request header to the remote server (the request being proxied) and not the response header returned to the client. Because of this, the response comes back without an appropriate CORS acceptance header and the browser errors out. It sounds like [this was the intention behind the feature’s design](https://community.netlify.com/t/cant-set-headers-on-proxied-redirect/669/7):

> If we proxy to a different service, we do not add any headers EXCEPT a few administrative ones - we do not intend to let you add your own headers to what gets returned to the browser...that’s how the feature was designed.

That’s probably smart—Netlify helping prevent injury to my person. So, alas, I am left without all the power of the universe and have to set up this CORS proxy for any Netlify-related site where I need it. Nonetheless, I’ll take what I can get. This was an incredibly useful discovery for the particular side project I was working on and helped me avoid having to setup a lambda function or my own full-blown server.
