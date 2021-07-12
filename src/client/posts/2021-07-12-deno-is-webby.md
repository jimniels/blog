# Deno is Webby

> Deno is trying not to be an API. It is trying to be the Web API.

That is Ryan Dahl, creator of Node.js, talking about [Deno](https://deno.land) on [an episode of The Changelog](https://changelog.com/podcast/443).

One thing that resonates with me about the philosophy behind Deno is how “webby” it is. As Ryan points out, they are striving to eschew creating their own APIs and instead imitate standard web APIs. For example `fetch` is native to Deno whereas Node.js requires a third-party dependency like `node-fetch`.

But standard browser APIs aren’t the only web feature Deno is planning to imitate. Browser UX patterns for things like permissions are also on their radar. For example, in browsers you get that little pop up “this website would like to use your location”.

<img src="https://cdn.jim-nielsen.com/blog/2021/deno-web-permissions.png" width="332" height="311" alt="Safari on macOS prompt asking for permission to use your current location." /> 

According to Ryan, Deno aims to follow the same pattern in asking for permissions. In contrast to Node.js, where a script gets limitless access to your computer when you execute it, Deno requires you pass in [command line flags](https://deno.land/manual@v1.11.5/getting_started/permissions), like `--allow-read` and `--allow-write`, in order to specify what scripts can and cannot do.

While today you have to pass in command line flags every single time you run a script, Ryan hints at an upcoming feature of Deno where it’ll execute a script as normal up until it requires a special permission like disk or network access. Then, like a web browser, it will prompt you for the permissions it needs.

In addition to JavaScript APIs and UX patterns, Deno is also very “webby” in the way it handles dependences. Every dependency is a URL, which is merely a string and can have semver built in. No magic resolution algorithm. No centralized package manager. No special syntax. Rather, the Deno convention is a standard, browser-compliant JavaScript file (`deps.js`) centrally locating and importing all relevant dependencies.

IMO Deno is being smart: always bet on the web.