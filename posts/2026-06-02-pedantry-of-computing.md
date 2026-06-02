# An Ode to the Exacting Pedantry of Computers

The very first computer programming class I ever took introduced me to the idea of there being different kinds of numbers, like integers, floats, and doubles (it was a C++ course).

“You mean, when I assign a variable, I have to say up front what kind of number this is?”

It was such an odd concept to me. A number is a number. Why do I have to say it’s _this_ kind of number or _that_ kind of number?

I dropped out of that class.

A few years later, I decided I wanted to try programming again. So I took another intro class. This time they were teaching with Python instead of C++, so you can imagine my excitement to learn that I didn’t have to think of numbers in this way anymore! It felt like the computer was meeting me partway.

Over time, I came to learn how pedantic computers are. They require a kind of exacting precision in saying what you want them to do. And they’ll only ever do _exactly_ what you tell them to do, nothing more, nothing less.

If there was a bug in your program, that wasn’t because the computer was doing something you told it not to. The computer was only ever doing _exactly_ what you told it to do. A “bug” was very likely a flaw in your conception of how the program should execute, not the actual execution. It was a failure on your part to be more precise, to imagine a scenario where something happened that you didn’t anticipate — and therefore didn’t tell the program how to handle.

“Do what I mean, not what I say!”

But now, with LLMs, that kind of exacting precision in language and thought is disappearing. You can have a thought, ask the LLM to build it, and it will fill in all the details you didn’t specify or anticipate.

All those pesky details which previously would’ve made you reflect, “Oh, I didn’t think of that. Maybe I should design this differently…” Or, “Oh, well now that I have to think about this some more, I can see that it might not actually be a very good idea…”

The pedantic friction, which seemed like such a nuisance, was actually acting as a kind of tool for sharpening and improving your thinking and output. The exacting nature of the computer required you to think more.

LLMs, however, have significantly lessened that friction. You can think less and move faster.

And yet, that feels like our job as software makers: to think, to anticipate, to explicitly articulate intent.

As a software user, I’d rather folks spend more time _thinking_ so that I, in turn, have better experience. This is preferable to giving me more stuff faster that’s only partly conceived.

As an industry it feels like we’re headed in a direction where we think it’s better to ship more faster and fix the effects of half-conceived intent later, than to spend more time upfront discovering, sculpting, and specifying intent. 

That’s one thing writing code by hand has taught me: intent — what you want to build and how you want it to work — is shaped through the act of articulating it.

That hard work is not required of us anymore. The LLM will fill in the details. The exacting pedantry of the computer is going away, and in its place are assumptions about intent — many of which we don’t even know about until our users run into their effects.