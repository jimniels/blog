#localfirst

# A Local-first Codebase Opens the Door to More Collaborators

I thought this was interesting: [Dax Raad on the local-first podcast](https://www.localfirst.fm/9) observes how a local-first model drastically simplifies the experience of building an app, both as an individual and as a team.

He talks about how his wife is not an engineer but she learned to be more hands on in the codebase of the project they work on together. 

For them, one of the things that’s been “crazy helpful” about a local-first approach is that all the data for the app is “just there” locally. For Dax’s wife, as a beginning coder, it’s such a simple model to work with. She’s not trying to figure out how to round trip to the server and keep data in sync. Dax handles all that upfront. The result?

> There's not all this weird like, loading states, or like fetching it, or like just a whole bunch of complexity around getting data back and forth. It's solved in one part of your app, and then you never have to think about it anywhere else.
> 
> So from a team productivity point of view, she can build any feature she wants, even if I didn't explicitly think about it from the backend point of view, because she has all the data locally.
> 
> She's like, “I want to create a view that searches through this set of data.” She can just go do that. All the data is there. [It’s] very, very straightforward.
> 
> And it's actually wild how much of a productivity boost that has on your team, because…with every new feature you’re not rebuilding [yet] another way to sync that data back and forth. 

When every single feature you build has to scaffold the lifecycle around fetching, updating, and revalidating the data that’s being changed, you alienate people who could otherwise collaborate on the front-end because they don’t know how to build the show spinner -> fetch -> render -> update -> show spinner -> revalidate loop (we spend a lot of time and effort on the [coordination problem](https://blog.jim-nielsen.com/2024/rsc-localfirst-and-coordination-between-computers/)).

I’ve been in this position. As someone who started writing mostly HTML & CSS, then later moved to writing view logic with languages like JSX, I could only take my design work so far. Then I’d have to leave it for someone else to “wire things up”, which often resulted in them having to re-write a lot of what I did because it didn’t take into account the architecture of the network layer.

But that problem — how do I get (and update) the data required to build and style a functioning UI as a [front-of-the-front-end engineer](https://bradfrost.com/blog/post/front-of-the-front-end-and-back-of-the-front-end-web-development/) — can be solved up-front by a local-first architecture, allowing more people to collaborate on building UIs.