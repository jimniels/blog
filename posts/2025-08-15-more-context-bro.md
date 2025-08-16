# Just a Little More Context Bro, I Promise, and It’ll Fix Everything

Conrad Irwin has an article on the Zed blog [“Why LLMs Can't Really Build Software”](https://zed.dev/blog/why-llms-cant-build-software). He says it boils down to:

> the distinguishing factor of effective engineers is their ability to build and maintain clear mental models

We do this by:

- Building a mental model of what _you want_ to do
- Building a mental model of what the _code does_
- Reducing the difference between the two

It’s kind of an interesting observation about how we (as humans)  problem solve vs. how we use LLMs to problem solve:

- With LLMs, you stuff more and more information into context until it (hopefully) has enough to generate a solution.
- With your brain, you tweak, revise, or simplify your mental model more and more until the solution presents itself.

One adds information — complexity you might even say — to solve a problem. The other eliminates it.

You know what that sort of makes me think of? NPM driven development.

Solving problems with LLMs is like solving front-end problems with NPM: the “solution” comes through installing more and more things — adding more and more context, i.e. more and more packages.

- LLM: Problem? Add more context. 
- NPM: Problem? There’s a package for that.

Contrast that with a solution that comes through simplification. You don’t add more context. You simplify your mental model so you need less to solve a problem — if you solve it at all, perhaps you eliminate the problem entirely!

Rather than install another package to fix what ails you, you simplify your mental model which often eliminates the problem you had in the first place; thus eliminating the need to solve any problem at all, or to add any additional context or complexity (or dependency).

As I’m typing this, I’m thinking of that image of the evolution of the Raptor engine, where it evolved in simplicity:

<img src="https://cdn.jim-nielsen.com/blog/2025/more-context-bro-rocket-1.jpg" width="540" height="339" alt="Photograph of three versions of the raptor engine, each one getting progressively simplified in mechanical parts." />

This stands in contrast to my working with LLMs, which often wants more and more context from me to get to a generative solution:

<img src="https://cdn.jim-nielsen.com/blog/2025/more-context-bro-rocket-2.jpg" width="540" height="339" alt="Photograph of three versions of the raptor engine, but the image is reversed showing the engine get progressively complicated in mechanical parts over time. Each engine represents an LLM prompt." />

I know, I know. There’s probably a false equivalence here. This entire post started as [a note](https://notes.jim-nielsen.com) and I just kept going. This post itself needs further thought and simplification. But that’ll have to come in a subsequent post, otherwise this never gets published lol.