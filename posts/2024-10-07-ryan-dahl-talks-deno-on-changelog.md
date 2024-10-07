#podcastNotes #deno

# Ryan Dahl Talks Deno on The Changelog

[Ryan Dahl was on The Changelog](https://changelog.com/podcast/610) to talk about Deno 2 specifically and his work on JavaScript more broadly. What follows are a few things that stood out to me.

## His Regrets From Node Are Now in Deno

I think it’s interesting that Ryan’s famous talk [_10 Things I Regret About Node.js_](https://www.youtube.com/watch?v=M3BM9TB-8yA) served as the manifesto and launching point for Deno. And yet, he’s now re-introduced some of those regrets into Deno — out of practicality, a point he openly admits in the interview.

For example, here are some of his stated regrets from Node.js:

**Regret: package.json**

> It's unfortunate that there is centralized (privately controlled even) repository for modules.

And now Deno has spawned a registry: JSR.

> If only relative files and URLs were used when importing, the path defines the version. There is no need to list dependencies.

I loved this about the original version of Deno. No need for a `package.json` because package version info was in the module URL. But [they’ve been moving away from this](https://blog.jim-nielsen.com/2024/deno-de-emphasizes-http-imports/). Which leads me to:

**Regret: require("module") without the extension ".js"**

> Needlessly less explicit.

Adjacent to his point about `package.json`, if you use relative paths or full URLs, all the info you need is in the string: package name, version, extension, etc.

But alas, it seems like these purist principles weren’t enough to sway folks, though I’m not sure if that’s simply because of the legacy convention and baggage of Node itself. Out of practicality, many of Ryan’s “regrets” about Node.js have made it into Deno and I appreciate his honesty in conceding the point (and his ability to articulate a rationale).

## Play to Your Strengths

Jerod asks Ryan a great question: instead of building something new and different with Deno, why not concentrate your efforts in making Node.js better? Ryan’s response:

> I’m not willing to sit in committee for 13 years trying to make [what we built into Deno by default] happen

He’s referring to all the base infrastructure around Deno, such as:

- Rust codebase 
- Secure by default capabilities 
- Typescript built-in
- Web API compatibilities
- LSP 
- Code formatting 
- Linting
- etc.

Ryan believes JavaScript continues to merit modern enhancements because, give its ubiquity, its such a core part of humanity:

> JavaScript is not like other programming languages. It is the default programming language because so much human infrastructure is built on the web. And because JavaScript is like HTTP or CSS or HTML, it is one of the protocols of the web. It has a future unlike that of Swift. Lots of people use Swift. A lot of infrastructure is built on Swift. But it’s not like JavaScript. JavaScript will be here in 5 years, if not 10, if not 20, if not forever. It is deeply embedded in humanity at this point. And I think it is worth the effort to strive to make it simple.

It’s an intriguing thought that pokes at the tension between the idea of being a revolutionary vs. trying to change a system from within. We all only have so much time and we have to ask ourselves where that time is best spent based on our own faculties, strengths, and weaknesses.

Maybe you have strong political sensibilities and could make sweeping changes inside an established organization. Or maybe that’s your weakness and you’d be better off in the wilderness developing your ideas, which perhaps never fully develop into their own, self-sustaining platform or organization, but they may spread and infiltrate into the existing systems of your time and find root there. 

Everybody has to find their own path. I can appreciate Ryan articulating the rationale for his (and Deno’s) — even though I’m still kinda sad about the module stuff tbh.

## Last, But Not Least: Free JavaScript

You can sense Ryan’s passion for JavaScript which overflows when he talks about his initiative [“Free JavaScript”](https://javascript.tm).

Did you know Oracle owns the name JavaScript as a trademark? So, for example, nobody can have a conference called “JavaScript Conf”.

It seems kind of ridiculous when you think about it. Can you imagine some corporate entity owning the name of a core web technology? Like if Apple owned "HTTP”, or Google owned “HTML", or Microsoft owned "CSS”? That’d be absurd.

I already signed the petition.