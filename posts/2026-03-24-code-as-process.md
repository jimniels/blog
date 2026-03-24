# Code as a Tool of Process

[Steve Krouse wrote a piece](https://stevekrouse.com/precision) that has me nodding along:

> Programming, like writing, is an activity, where one iteratively sharpens what they're doing as they do it. (You wouldn't believe how many drafts I've written of this essay.)

There’s an incredible amount of learning and improvement, i.e. _sharpening_, to be had through the process of iteratively building something.

As you bring each aspect of a feature into reality, it consistently confronts you with questions like, “But how will _this here_ work?” And “Did you think of _that there_?”

If you jump over the process of iteratively building each part and just ask AI to generate a solution, you miss the opportunity of understanding the intricacies of each part which amounts to the summation of the whole.

I think there are a lot of details that never bubble to the surface when you generate code from English as [it’s simply not precise enough for computers](https://blog.jim-nielsen.com/2025/making-software-is-translating-intent/).

Writing code is a process that confronts you with questions about the details.

If you gloss over the details, things are going to work unexpectedly and users will discover the ambiguity in your thinking rather than you (see also: “bugs”).

Writing code is a tool of process. As you go, it sharpens your thinking and helps you discover and then formulate the correctness of your program.

If you stop writing code and start generating it, you lose a process which helped sharpen and refine your thinking.

That’s why code generation can seem so fast: it allows you to skip over the slow, painful process of sharpening without making it obvious what you’re losing along the way.

You can’t understand the trade-offs you’re making, if you’re not explicitly confronted with making them.

## A Metaphor

To help me try to explain my thinking (and understand it myself), allow me a metaphor.

Imagine mining for gold.

There are gold nuggets in the hills.

And we used to discover them by using pick axes and shovels.

Then dynamite came along. Now we just blow the hillside away. Nuggets are fragmented into smaller pieces.

Quite frankly, we didn’t even know if there were big nuggets or small flecks in the hillside because we just blasted everything before we found anything.

After blasting, we take the dirt and process it until all we have left is a bunch of gold — most likely in the form of dust.

So we turn to people, our users, and say “Here’s your gold dust!”

But what if they don’t want dust? What if they want nuggets? Our tools and their processes don’t allow us to find and discover that anymore. 

Dynamite is the wrong tool for that kind of work. It’s great in other contexts. If you just want a bunch of dust and you’re gonna melt it all down, maybe that works fine. But for finding intact, golden nuggets? Probably not.

It’s not just the _tool_ that helps you, it’s the _process_ the tool requires. Picks and shovels facilitate a certain kind of process. Dynamite another.

Code generation is an incredible tool, but it comes with a process too. Does that process help or hurt you achieve your goals?

It’s important to be cognizant of the trade-offs we make as we choose tools and their corresponding processes for working because [it’s trade-offs all the way down.](https://blog.jim-nielsen.com/2026/food-software-and-trade-offs/)