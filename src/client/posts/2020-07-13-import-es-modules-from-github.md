---
tags: engineering
---

# Import ES Modules from Github

I recently read [“Publishing Your Deno Modules using GitHub”](https://blog.bitsrc.io/publishing-your-deno-modules-using-github-f2bd86173392). What’s neat about the approach outlined in that article—combined with deno’s approach to modules—is your ability to serve modules directly from Github, cutting out the intermediate step of publishing to npm. Granted, I’m sure this approach is only useful in some but not all scenarios.

What struck me about the approach was: what if you took the same idea, but instead of pulling in modules for running deno scripts, you used it for importing JavaScript modules in browser code?

For example, I’ve got a particularly small function that I’ve found myself using very frequently across a variety of personal projects. It’s a function that helps you achieve [JSX-like syntax in tagged template literals](https://blog.jim-nielsen.com/2019/jsx-like-syntax-for-tagged-template-literals/).  Until recently, when I found myself needing this utility I just copy/paste’d the code into some part of my project. After doing this a number of times, I thought “I really should abstract this into some code I can easily use across projects through a simple `import`”. The problem is that I’ve never setup an account to publish to npm. And I’m too lazy to take the effort to do it (at least the “right”, automated way with CI/CD doing it all for me).

But the article above made me think, “Ah, I could just dump this code into Github, use git tags to version it, then `import` it directly from `raw.githubusercontent.com`”. 

It was _almost_ that easy.

After getting the repo setup with the code, I tagged the first commit of the code as `0.1.0`, then did an `import` from its raw URL: [raw.githubusercontent.com/jimniels/html/0.1.0/html.js](https://raw.githubusercontent.com/jimniels/html/0.1.0/html.js). No dice. 

```
Failed to load module script: The server responded with a 
non-JavaScript MIME type of "text/plain". Strict MIME type
checking is enforced for module scripts per HTML spec.
```

“Must be a server configuration for serving files,” I thought. Probably because the server is responding with `content-Type: text/plain` instead of `content-type: application/javascript`?

After some research, I solved my problem like a real computer programmer by finding [a StackOverflow post](https://stackoverflow.com/questions/17341122/link-and-execute-external-javascript-file-hosted-on-github/18049842#18049842) detailing a workaround. The recommended answer suggests using a service called [jsdelivr](https://www.jsdelivr.com) that allows you to tweak your raw Github URL just slightly and (I assume) it grabs the plain text file and serves it with the appropriate headers so you can import it in the browser.

So why does deno properly `import` the `raw.githubusercontent.com` URL but the browser does not? [From what](https://stackoverflow.com/a/53062522) [I gather](https://stackoverflow.com/a/18049842/1339693), Github started using the `X-Content-Type-Options: nosniff` header, which tells modern browser to strictly enforce MIME type checking. This means when the browser fetches the file, it looks for that header and, if present, it will only interpret the resource as outlined in the `content-type` header.  Deno, on the other hand, is presumably “MIME-sniffing” and ignoring the `no sniff` header. So it pulls the file and, even though the `content-type` is `plain/text`, it guesses that it’s a JavaScript file and parses it accordingly.

Anyhow, you can see how this all works in [the codepen I made](https://codepen.io/jimniels/pen/BajVWay). For small utilities like this, I like this approach. I can publish code to GitHub (be it JS or CSS), then pull it directly into my web projects. Not ideal or relevant in all scenarios, but extremely useful in some. 

At least, that’s my opinion (I should end every blog post with this line).