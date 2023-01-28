#deno

# Notes from Ryan Dahl on Shop Talk Show

As you may know, I’m a fan of Deno and its pioneering ethos to [align its technological choices with the grain of the web platform](https://blog.jim-nielsen.com/2022/permeating-principles-of-the-web/).

So I was excited to see Ryan Dahl, creator of Deno, appear on [episode 546 of the Show Talk Show](https://shoptalkshow.com/546/).

A few points that stood out:

- JavaScript is pervasively everywhere, and it’s always changing and evolving to the needs of the people worldwide who use it. As Ryan says, “JavaScript is the English of programming languages”.
- Deno is trying to alleviate the problem of choice in today’s JavaScript. With features like a standard library, a native test runner, and built-in typescript support, Deno is trying to combat the problem of too much unnecessary choice that runs rampant in the world of Node.
- V8 is an incredibly robust, battle-tested piece of software and it’s being used to power web experiences everywhere. [JavaScript container-like abstractions are the future](https://tinyclouds.org/javascript_containers) — as Ryan says, “You can think of Node and deno and cloudflare workers as distributions of v8, kind of like there are distributions of the Linux kernel.”
- Javascript is one of the most security-conscious languages that exists — thanks to its origins in the browser whose unique challenges and ties to the web platform’s ethos shape the language — and yet, **ironically**, npm has made server-side JavaScript prone to some of the biggest supply chain vulnerabilities.
	- In a browser, you have to be able to visit a website you don’t trust. An incredible amount of energy has been exerted to make that true, including effort in JavaScript. Deno asks: why not leverage all that hard work elsewhere, like in your server side programming language?

And finally, Dave got to talking about bundlers and front-end practices and I just loved this line: “we do the sharding and the bundling and splitting and the shaking — and then we pray it works”.