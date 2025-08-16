# Backwards Compatibility in the Web, but Not Its Tools

After [reading an article](https://notes.jim-nielsen.com/#2025-04-22T1310), I ended up on HackerNews and stumbled on [this comment](https://news.ycombinator.com/item?id=43422368):

> The most frustrating thing about dipping in to the FE is that it seems like literally everything is deprecated.

Lol, so true. From the same comment, here’s a description of a day in the life of a front-end person:

> Oh, you used the apollo CLI in 2022? Bam, deprecated, go learn how to use graphql-client or whatever, which has a totally different configuration and doesn’t support all the same options. Okay, so we just keep the old one and disable the node engine check in pnpm that makes it complain. Want to do a patch upgrade to some dependency? Hope you weren’t relying on any of its type signatures! Pin that as well, with a todo in the codebase hoping someone will update the signatures.
> 
> Finally get things running, watch the stream of hundreds of deprecation warnings fly by during the install. Eventually it builds, and I get the hell out of there.

Apt.

It’s ironic that the web platform itself has an ethos of zero breaking changes.

But the tooling for building stuff on the web platform? The complete opposite. Breaking changes are a way of life.

Is there some mystical correlation here, like the tools remain in such flux because the platform is so stable — stability taken for granted breeds instability?

Either way, as Morpheus says in _The Matrix_: Fate, it seems, is not without a sense of irony.