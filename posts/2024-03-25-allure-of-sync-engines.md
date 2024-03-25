#localFirst

# The Allure of Local-First Sync Engines

[On the localfirst.fm podcast episode with Kyle Matthews](https://www.localfirst.fm/5) they drew a parallel: jQuery was to React what REST APIs are to local-first sync engines. 

jQuery was manual DOM manipulation. You were in charge of writing the instructions to create, read, update, and delete DOM nodes.

Then React came along with virtual DOM and said no more writing imperative instructions for DOM manipulation. Just declare what you want and, as state changes, we’ll figure out the imperative instructions for reconciling changes on your behalf.

This move from imperative to declarative was a tall, refreshing glass of koolaid (though admittedly not without [its trade-offs](https://blog.jim-nielsen.com/2019/thoughts-on-rich-harris-talk/)).

Similar to jQuery, REST APIs represent manual manipulation — but of data not the DOM. You are in charge of writing the instructions to create, read, update, and delete the data that models your application.

But sync engines (in the context of local-first software) aim to do for data what React did for the DOM.

Sync engines say no more writing imperative instructions for data manipulation. Just declare what you want and, as state changes, the sync engine will figure out how to reconcile your changes across the network.

This move from imperative to declarative is compelling, especially when you factor in reactivity within an application: changes to data are reactive and reflected instantly in your application, then synced from node to node across the network _without any imperative instructions written by you_.

Now that is tall, refreshing glass of koolaid I’ll drink.

Speaking of koolaid, allow me to expand on this idea with notes from [a talk from Martin Kleppman at a Local-First meetup](https://youtu.be/6Q0yb_ROUBQ?t=688).

In traditional web development, you have different applications and each one needs its own bespoke API with imperative instructions for how to create, read, update, and delete data specific to that application.

<img src="https://cdn.jim-nielsen.com/blog/2024/sync-engines-slide-1.png" width="667" height="502" alt="Hand drawn slide showing different kinds of applications (like a spradsheet, a graphics app, a task manager) all with their own bespoke clouds for syncing data from one client to another." />

With a local-first approach, all the interesting, domain-specific logic lives with the application on the client which means all that’s left for the sync engine is to shuffle bytes from one location to another. This enables the ability to have generic syncing services: one backend shared by many different applications.

<img src="https://cdn.jim-nielsen.com/blog/2024/sync-engines-slide-2.png" width="669" height="502" alt="Hand drawn slide showing different kinds of applications (like a spradsheet, a graphics app, a task manager) sharing one cloud for syncing data from one client to another." />

Generic sync engines means the protocols for these engines can be built on open standards and be application-agnostic. This becomes very valuable because now you can have many “sync engines” — e.g. imagine “AWS Sync Engine”, “Azure Sync Engine” etc. — and when one becomes too expensive, or you stop liking it, or they change their terms of service, you can simply switch from one syncing service to another.

<img src="https://cdn.jim-nielsen.com/blog/2024/sync-engines-slide-3.png" width="663" height="501" alt="Hand drawn slide showing different kinds of applications (like a spradsheet, a graphics app, a task manager) using many differeng vendor clods for syncing data from one client to another." />

Excuse me while I go get some ice for all this koolaid I’m been drinking.