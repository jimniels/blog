# The Birth of “Disable JavaScript”

Did you know: “Disable JavaScript” as a browser feature was born out of an exasperation with plugging security holes?

I didn’t. But then [I watched “A Hipster History of CORS”](https://blog.jim-nielsen.com/2023/hipster-history-of-cors/) and the speaker, Devdatta Akhawe, references the history of the feature as outlined in the book  _JavaScript: The Definitive Guide_. 

Security in JavaScript in those early days was WDD: whack-a-mole driven development. Find a mole (security hole) and whack it (plug it). [From the book](https://docstore.mik.ua/orelly/web/jscript/ch20_02.html):

> The approach to JavaScript security in Navigator 2.0 and 3.0 has been to first identify security holes through which private information could be exported, and then to plug those holes…The problem with an identify-and-patch approach is that it can be difficult to identify security holes, and that there is no way of knowing when you've found all possible holes

A conundrum indeed. If you patch security holes as you find them, how will you ever know if you’ve plugged all the holes?

Well that’s easy, my friend. Just get rid of what’s causing the holes.

<img src="https://cdn.jim-nielsen.com/blog/2023/7a0cqa.jpg" width="702" height="395" alt="Roll safe meme guy with the words, “you can't have a security hole in javascript if there is no javasript”" />

These security fixes were known as “hobbles” and Netscape came up with the “ultimate hobble”: disable JavaScript.

If you read that chapter, some of the early documented security holes are pretty wild, like this one:

> [people used] the file:/// URL to discover the contents of the root directory of the client's system, and could recursively proceed to determine the client's entire directory structure 

Of course, if you use node, this particular exploit is still feasible by merely running `npm i` and having a malicious package somewhere deep in your dependencies — but I digress.

Turning off JavaScript is nice and all, but having JavaScript on is also nice. So “Disable JavaScript” as a feature wasn’t a permanent solution.

Eventually they came up with an idea that would hobble an entire class of security holes: cross-origin restrictions on JavaScript window APIs.

> Because of the continuing problem with security holes, and because of the resulting bad press, Netscape soon released Navigator 2.0.2, which fixed all known security-related bugs and implemented a very general hobble that would, hopefully, spell an end to security holes. With this hobble implemented, a JavaScript program is not allowed to read the properties of any window (or frame) or the properties of any objects within a window if the contents of that window were loaded from a different web server than the JavaScript program itself.

This hobble birthed the idea of cross-origin restrictions and eventually made it into `XmlHTTPRequest` and later everything CORS.

It’s all a fascinating history. Go [listen to the talk](https://www.youtube.com/watch?v=0YJ-yhoJh2I) if this sounds like your cup of tea.