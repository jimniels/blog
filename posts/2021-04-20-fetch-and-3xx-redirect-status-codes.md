# Fetch and 3xx Redirect Status Codes

Documenting this here, in case anybody out there on the internet faces a similar problem, inputs the right keywords into a search engine, and ends up here learning my lesson.

I have a problem.

[I’m using Netlify’s proxy service to get around CORS issues](https://blog.jim-nielsen.com/2020/a-cors-proxy-with-netlify/) for a static site.

And yet, I still have CORS issues.

[I detail the problem over in the Netlify community forums](https://answers.netlify.com/t/proxying-to-another-service-fails-with-cors-issue-and-a-302-response/34923) but the short version is: I’m proxying a `fetch` request across domains using Netlify’s engine and the destination server is responding with [a 302 status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302) which Netlify proxies back to me.

In that scenario, I was expecting the code to play out something like this:

```js
fetch("/cors-proxy/https://domain.com/302/response.png")
  .then(res => {
    if (!res.ok) {
      // If you don’t get a 200 response of some kind, throw
      throw new Error("Custom message");
    }
  })
```

Instead of seeing my "Custom message" throw, I was getting a CORS error.

Turns out, this is because I didn’t fully understand how the browser natively handles response status codes in the 300 range.

If the browser gets one of the 3xx responses defined in HTTP/1.1 as redirects, [it expects](https://en.wikipedia.org/wiki/URL_redirection) to look for a `location` header with a URL representing where the asset can currently be found.

For example, let’s say I have an image in my source HTML whose  `src` points to an image that’s been moved temporarily:

```html
<img src="https://me.com/302-moved-temporarily.png">
```

The server should respond accordingly with a 302 status and a location denoting where the image can currently be found:

```
HTTP/1.1 302 Found
Location: https://me.com/302-moved-temporarily-to-here.png
```

In that scenario, the browser will handle that response by automatically following the `location` header value and downloading the image for you from that new location.

Because HTML is declarative, this all happens automatically for you and you’re really none the wiser (unless you’re watching the requests fly in and out of the network panel).

But what happens if you're doing a `fetch` in JavaScript for an asset that returns a 302 response?

Turns out, the browser also tries to handle that for you automatically by retrieving the `location` header and following it. [There’s no mechanism](https://www.sean-lan.com/2017/08/15/fetch-meets-302/) for your `fetch` call to capture a 3xx redirect response and try to handle it yourself. As far as I can tell, [you can tell fetch how to handle 300 responses codes](https://javascript.info/fetch-api#redirect), but you can’t actually intercept them.

In other words, code like this wouldn’t work:

```js
const res = await fetch("/cors-proxy/https://me.com/302.png");
// Code fails before you ever get here and check res.status
if (res.status === 302) {
  const newLocation = res.headers.get("location");
  const newUrl = await fetch(`/cors-proxy/${newLocation}`);
}
```

In the above example, the call fails before you ever get to `res.status`. The server responds with a 302 and a new `location` which the browser tries to follow automatically (with the default `fetch` options). In my case, this new `location` URL isn’t being proxied across domains like my first request _and that’s why I get a CORS error_. 

As far as I can tell, there’s no way (on the client) for me to proxy that second request to the `location` URL. For that, I would have to have control over the proxy engine and be able to tell it what to do before responding back to the client—something I can’t do on Netlify.

Anyhow, the [mechanisms at play here](https://stackoverflow.com/a/45691209) were all new to me. If you’re reading this, they might’ve been to you too.

You learn something new every day.