# RSC, Localfirst, and Coordination Between Multiple Computers

Dan Abramov gave a talk at ReactConf called [“React for two computers”](https://www.youtube.com/live/T8TZQ6k4SLE) (starts at ~5:14:00) which gives the conceptual background around how the team came up with the idea for React Server Components (RSC)[^1].

I found the talk intriguing. It’s like watching someone take something apart and put it back together, explaining along the way how and why each piece works the way it does. This helps you see each piece in the larger context of its function and design, causing you to see something that was previously familiar with fresh, new perspective. I love talks and speakers who can do this.

But I digress. Let me get back to my bulleted notes from the talk:
 
- Server/client is really just a single program that spans two computers.
- `fetch` is the communication channel between them.
- Server is a computer with a runtime of your choosing (php, rust, node, etc.). Client is a computer whose runtime you have no choice in (browser).
- The server emits a program that can run on the client (HTML is a programming language).

So in essence, web apps are a single program distributed across time, space, and computers whose runtimes vary (server/client). `fetch` is used to pass messages in this program across the network, coordinating the proper manipulation of data based on specified rules of logic.

Ok, nothing new there. We all know this, right?

What stood out to me, when I view the current state of webdev in this light, is how much complexity is tied up in the problem of coordination between computers.

Dan talks about this idea of looking at your problem regardless of framework and asking yourself: What am I really solving here? What boundaries can be removed that are inessential to the problem at hand?

For example, so many apps deal with the lifecycle of data and coordinating the rules for its manipulation between two computers. Loading -> Success -> Failure -> Revalidation. Over and over and over in a codebase.

So much application complexity is tied up, not in our problem domain, but in the more generic problem domain of coordinating  the execution of a single program across multiple computers.

If we simplified _that_, we could simplify a lot about _all_ our applications.

Hence [the allure of localfirst and sync engines](https://blog.jim-nielsen.com/2024/allure-of-sync-engines/): it disentangles the problem of logic, data, and execution of a program from the problem of coordination between two computers. 

What do I mean by this?

In essence, it splits today’s applications into two parts:

1. The execution of the application, which requires only one computer.
2. The syncing and sharing of an application’s data, which requires at least two computers.

By creating this split, localfirst eliminates an entire class of coordination problems by getting rid of the second computer. 

With localfirst, all logic and data lives on one computer: yours (the client). The second computer (the server) is an optional enhancement to the application that provides data backup as well as sharing functionality. Sync engines tackle the complex problem of coordination across two computers. However, this class of problems is not imperative for the program to work (on a single computer).[^2]

When you think about it, this is kind of an elegant way to approach the problem: rather than requiring execution and coordination to work in conjunction across space and time, you split up the execution and coordination into different problems solved by separate solutions. Coordination builds on top of execution, but is not necessarily a required dependency.

Anyhow, these are some thoughts that came to mind during this talk.

[^1]: If you follow Dan’s writing on his blog overreacted, this talk probably isn’t a surprise. [He’s written on this topic before](https://overreacted.io/the-two-reacts/). It’s a great blog, I wish he posted more.
[^2]: [I noted on Mastodon](https://mastodon.social/@jimniels/112471324655118976) the contrast between localfirst where all logic+data lives on your computer with an (optional) sync layer for backup+sharing, and traditional SasS where logic+data lives on somebody else’s computer and you can access it so long as you have 1) internet, and 2) a paid account.