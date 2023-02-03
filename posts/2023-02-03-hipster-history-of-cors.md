# CORS, CORB, CORP, COOP, COEP, C…

You’ve probably heard of CORS, but did you know about [CORB](https://chromium.googlesource.com/chromium/src/+/master/services/network/cross_origin_read_blocking_explainer.md), [CORP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy), [COOP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy), or [COEP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy)?

I recently watched [“A Hipster History of CORS”](https://www.youtube.com/watch?v=0YJ-yhoJh2I), a talk from Strange Loop 2022 by Devdatta Akhawe, Head of Security at Figma. Devdatta does a great job of taking a complex, even boring, subject like CORS and weaves it into a funny, interesting narrative history. He connected many previously disparate dots in my head, making me go “Ah-ha! That’s why things are the way they are on the web.”

For example, when working on my Readlists project, I ran into an issue where I couldn’t use JavaScript to read the contents of an image fetched from a third-party website. I couldn’t understand why there was a limitation there. “I fetch images all the time with `<img src="...">` but I guess JavaScript’s not gonna let me?”

After Devdatta’s talk and an introduction to cross origin read blocking (CORB) I now understand better.

> [attacker.com can ask for mail.google.com] as an image. The browser doesn’t know that's not an image. For the browser, everything is a URI. So the browser [fill fetch it] and say “here’s mail.google.com (and everything in the body)” and the attacker.com process can just read everything in it.

It’s a great story condensed into a thirty minute talk. Thank you Devdatta!