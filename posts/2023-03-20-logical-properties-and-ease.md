# Logical Properties and Ease

I’ll admit, I’m late to the [logical properties](https://adactio.com/journal/19457) [party](https://www.miriamsuzanne.com/2022/09/16/tpac-logical/).

The purist in me loves the idea because it makes CSS more internally consistent with its design to be a language-agnostic framework for uni-directional layout. Chris gets at this in his recent post, [“Why aren’t logical properties taking over everything?”](https://chriscoyier.net/2023/03/13/why-arent-logical-properties-taking-over-everything/)

> [Logical properties] make CSS into a more coherent and interrelated system that is easier to learn and reason about.

I wonder about that last bit: do logical properties really make CSS “easier to learn and reason about”?

I am gonna wonder out loud for a moment.

I think there’s a lot of value in meeting people where they are in a simple, but powerful, declarative language like CSS. 

Allow me a story.

The very first computer programming class I ever took was a C++ class at my local junior college. I remember being so confused trying work with numbers. Having to declare variables and differentiate between “floats” and “integers” was so strange. “They’re all just numbers,” I thought, “Why can’t I work with them that way? A number is a number, whether it’s 12.627 or 5.”

In hindsight, knowing what I know now about computers, it sounds kind of silly. But at the time it was such a foreign abstraction to me. I gave up on programming after that class.

A few years later, I re-enrolled in the entry-level programming class determined to wrap my head around this “programming” thing. By then they were teaching Python instead of C++ (plus I had a little JavaScript, i.e. jQuery, exposure) and working with numbers in a scripting language felt so much more intuitive: just do the math then format the number how you like.

What’s my point?

It can be difficult to learn abstractions that have little relevance to our direct, lived experience.

I always loved that CSS was so beginner friendly (CSS and HTML were my gateway drugs to coding — C++ was, if anything, the hard stuff that almost made me give it up forever). When I was beginning with CSS, I think an abstraction like language-agnostic layout through logical properties probably would’ve been hard concept to wrap my head around, especially since all I wanted to do was put a little website on the internet.

It’s a “milk before meat” kind of a thing — that’s what I mean by meeting people where they are. `top`, `left`, `right`, `bottom`, those directional properties are tied to my everyday experience of physical reality so they are easy to understand. They’re intuitive.

As a poor analogy, nobody is advocating we frown upon words like “up” or “down” even though the physics of relativity show us those are imprecise words, purely subjective to your frame of reference. Relativity can be so contradictory to your lived experience that, unless you’re a physicist and thinking about these kinds of things a lot, that kind of precision gets in the way of getting stuff done.

Or, perhaps as one more poor analogy, it’s like the transmission in a vehicle. Manual transmission is more true in exposing the driver to the mechanics of what’s happening under the hood, while automatic transmission abstracts that away so the person doesn’t have to think about it. They just hit the gas or breaks. Which do you think is more friendly to beginners?

This is a really long-winded way of saying: I like logical properties. I want to use them more. But I’m not convinced it makes CSS “easier to learn”.

But that’s my two cents. I also realize, as Einstein said, it’s all relative — `position: relative` that is.