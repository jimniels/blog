#glitch #javascript #apis #server

# Having Fun Writing APIs With Glitch

I’ve been having a lot of fun lately writing server-side request/response code with [Glitch](https://glitch.com). [Me on Twitter](https://twitter.com/jimniels/status/1360427857693007872) a little while ago:

> API design is a helluva drug
> 
> Way over my head ATM designing an API for myself like I know what I’m doing and it’s too much fun. Think I’m gonna hang up the “designer” label and trade in sketch/figma for a REST client.

With the Jamstack I rarely do this because the paradigm is:

`request → file on disk`

You need a server to do:

`request → handler → response`

With Netlify I get (lambda) functions, but to be honest they’ve never quite worked as expected, require additional setup, break randomly, have special limitations (looking at you 10 seconds), etc.

So here I am, writing simple APIs for myself with Glitch: request, handler, response.

I’m not running a platform here. This doesn’t need to scale. This is merely for scripting my own little corner of the web. Stuff for me, not others. With Glitch I don’t even need git: I can live edit server code, refresh, and watch it work. It’s cowboy coding, like live editing files on the FTP server. It’s living life on the edge. It’s kind of thrilling — and fun.

For example, building [an email digest endpoint](https://blog.jim-nielsen.com/2022/netlify-analytics-email-digest/): hit the endpoint, the server has secrets to fetch the necessary data and mix it with a template, and then respond with the info I need. I can `GET` the digest or I can `POST` to it with an email and have the server fire off an email. Whatever I want. It’s not an application at scale. It’s a helper script on a server.

Or another example I was prototyping with recently: my own CORS proxy. I can’t `fetch` any page on the internet from client-side code because of CORS. And open CORS proxies have their downsides. But what if I made my own little secret endpoint out there on the internet – no CORS restrictions – that I can hit for convenience? With Glitch, I can do this in a fabulously simple way: setup a project, specify an endpoint, write the code, return a response. Example:

```js
// An express server running in glitch...

// Any request to my endpoint with a `url` query param will
// go get that resource and return it, i.e.
//   `mydomain.glitch.me/html?url=https://google.com`
app.get("/html", (request, response) => {
  try {
    fetch(request.query.url)
      .then(res => res.text())
      .then(text => {
        response.send(text);
      });
  } catch(e) {
    response.status(400).json(
	    { message: "Something went wrong." + e}
	  );
  }
});
```

That’s it. That’s all I need for a little server doing little asks for me. Quick, painless, and somewhat ephemeral. There’s  no git to initialize and commit to, no local dev environment to setup and configure, none of that. Just a server with a URL I can send requests to — a little someone always listening to me.

It’s fun. Fun like this is what I love about the web. 