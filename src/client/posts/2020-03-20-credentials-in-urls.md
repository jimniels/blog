---
tags: theMoreYouKnow
---

# Credentials in URLs

I recently finished reading [“The History of the URL”](https://blog.cloudflare.com/the-history-of-the-url/) over on Cloudflare’s blog. It was a good read, full of interesting details—some that I understood, some that I did not.

One of the things that stood out to me was this little nugget:

> As you may know, you can include a username and password in URLs:
> 
> `http://zack:shhhhhh@zack.is`

Oh hey, I knew that. I haven’t consciously _used_ that functionality in a long time. The last time I remember putting username and password in the URL itself was maybe in high school when I first started learning about web sites. It’s one of those things I knew you could do, but have never really done purposefully. Cloudflare continues:

> The browser then encodes this authentication data into Base64, and sends it as a header:
>
> `Authentication: Basic emFjazpzaGhoaGho`

Wait, what? I didn’t know that’s how it works. Wait, so does that mean I could write a `fetch` request and, instead of setting the `Authorization` header, I could conceivably put the username and password directly into the URL and the browser would set the header for me?

```js
fetch(`https://user:pass@jsonplaceholder.typicode.com/todos/1`)
```

Turns out, no. `fetch` doesn’t even support passing credentials via the URL. It [sounds like](https://github.com/elastic/kibana/issues/34847#issuecomment-486126329) it was specifically designed not to support that case. If you try to do it, the browser will throw an error.

<img src="https://cdn.jim-nielsen.com/blog/2020/url-creds-error.png" alt="Screenshot of Chrome’s DevTools showing a console error when trying to include  username and password in a url for fetch." width="600" height="60" />

This got me thinking, I wonder if it works with the old `XMLHttpRequest`? Apparently, as of this writing in Chrome and Safari on Mac, it does. Kind of. What I mean is, it will still make the network call, unlike `fetch`.

```js
const req = new XMLHttpRequest();
req.open(
  "GET",
  "https://user:pass@jsonplaceholder.typicode.com/todos/1"
);
req.onload = res => {
  console.log(req.response);
};
req.send();
```

That request gets made but the browser doesn’t pass along the credentials as an `Authorization` header. The credentials just get lost. You can check out [my codepen for sending credentials in the URL](https://codepen.io/jimniels/pen/rNVvvKB) for a complete example of this in the browser.

<img src="https://cdn.jim-nielsen.com/blog/2020/credentials-in-url-network-tab.png" alt="Screenshot of network dev tools showing that an XMLHttpRequest with credentials in URL doesn’t set an Authorization header." width="1048" height="476" />

So what exactly is going on here? `fetch` fails if you try to include creds in the URL while `XMLHttpRequest` still makes the request but won’t translate the creds in the URL to the appropriate `Authorization` header. 

Neil Madden has an aptly-named blog post titled [“Can you ever (safely) include credentials in a URL?”](https://neilmadden.blog/2019/01/16/can-you-ever-safely-include-credentials-in-a-url/) where he enumerates all the reasons putting credentials in the URL was not and is not the best idea. (like, for example, when people realized a valid URL like [http://www.google.com:search@example.com](http://www.google.com:search@example.com) was actually perfect for phishing attacks). He summarizes:

> this specific form of URL was deprecated back in 2005, and now support within browsers is patchy: Safari for instance will just silently ignore any username:password component when following such a link. Other browsers will tolerate them in some cases, but this varies considerably by browser and often by version to version. Some versions of Chrome refuse to follow such links and instead display a large red phishing warning page.

Now I’m beginning to more fully understand why it’s been so long since I tried to encode credentials into a URL in any useful way.

While we’re on the topic of encoding credentials into a URL, there was another part from the Cloudflare blog post that stood out to me:

> The only reason for the Base64 encoding is to allow characters which might not be valid in a header, it provides no obscurity to the username and password values.

Again, I’ve worked on the web for a long time, and I never knew this. I always sort of assumed we used base64 to add at least some kind of obfuscation to the plain text `username:password`. In my mind I imagined the creators behind the standard to have had a conversation where they figured “ok, well this is going to be over HTTP and to prevent reading the username/password at a glance, let’s provide some kind of ‘security through obscurity’ and base64 encode the thing.” Wrong. Apparently it’s to provide encoding of potentially invalid characters. From Wikipedia’s entry on [Basic access authentication](http://en.wikipedia.org/wiki/Basic_access_authentication):

> While encoding the user name and password with the Base64 algorithm typically makes them unreadable by the naked eye, they are as easily decoded as they are encoded. Security is not the intent of the encoding step. Rather, the intent of the encoding is to encode non-HTTP-compatible characters that may be in the user name or password into those that are HTTP-compatible.

Well look at that: you learn something new every day huh? 
I’m going to start a new tag on my blog to document things like this—things that I probably should’ve learned a long time ago and am embarrassed to admit that I’ve only learned just now. I’ll call it: #[theMoreYouKnow](https://blog.jim-nielsen.com/tags/#theMoreYouKnow).