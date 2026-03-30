#generalNotes

# Continuous, Continuous, Continuous

[Jason Gorman writes about the word “continuous” and its place in making software.](https://codemanship.wordpress.com/2025/01/23/the-a-z-of-code-craft-c-is-for-continuous/) We think of making software in stages (and we often assign roles to ourselves and other people based on these stages):

> the design phase, the coding phase, the testing phase, the integration phase, the release phase, and so on.

However this approach to building and distributing software isn’t necessarily well-suited to an age where everything moves at breakneck speed and changes constantly. 

> The moment we start writing code, we see how the design needs to change. The moment we start testing, we see how the code needs to change. The moment we integrate our changes, we see how ours or other people’s code needs to change. The moment we release working software into the world, we learn how the software needs to change.

Making software is a continuous cycle of these interconnected stages: designing, coding, testing, integrating, releasing. But the lines between these stages are very blurry, and therefore the responsibilities of people on our teams will be too.

The question is: are our cycles for these stages — and the collaborative work of the people involved in them — measured in hours or weeks? Do we complete each of these stages multiple times a day, or once every few weeks?

> if we work backwards from the goal of having working software that can be shipped at any time, we inevitably arrive at the need for continuous integration, and that doesn’t work without continuous testing, and that doesn’t work if we try to design and write all the code before we do any testing. Instead, we work in micro feedback loops, progressing one small step at a time, gathering feedback throughout so we can iterate towards a good result.

Feedback on the process through the process must be evolutionary. You can’t save it all up for a post-mortem or a 1-on-1. It has to happen at the moment, evolving our understanding one piece of feedback at a time (see: [Gall’s law](https://en.wikipedia.org/wiki/John_Gall_(author)#Gall's_law), a complex system evolves from a simpler one).

> if code craft could be crystallised in one word, that word would be “continuous”.

[Your advantage in software](https://blog.jim-nielsen.com/2022/software-over-time/) will be your ability to evolve and change as your customers expectations evolve and change (because the world evolves and changes), which means you must be prepared to respond to, address, and deliver on changes in expectations at any given moment in time.