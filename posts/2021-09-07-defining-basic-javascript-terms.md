# Defining Basic JavaScript Terms: map, filter, and reduce

I’m not a [real programmer](http://catb.org/jargon/html/R/Real-Programmer.html), so making myself define and explain basic programming terms is a helpful exercise.

Imagine, for a moment, someone who doesn’t know much about a scripting language like JavaScript. Words like `map`, `filter`, and `reduce` would likely seem alien.

`filter` is probably the only one whose use in JavaScript corresponds to its common use in English, i.e. “I’m going to filter this coffee”.

But `map`? What does that do? Like Google Maps?

And `reduce`? Does that means you're making something smaller, like reducing it’s size?

When I learned JavaScript and how to manipulate data, I learned the APIs for `map`, `filter`, and `reduce` before I really understood the meaning behind their names. I knew what I could _do_ with `.map()` but I didn’t necessarily understand what it meant to  `.map()` something other than what I could infer from my own experience using that API.

So I wrote this post as an attempt to define these three basic terms.

Then I put it in my drafts and never published it.

Then I rediscovered it and figured I’d publish it.

## Map

When I first encountered it, the use of the word “map” in programming seemed so disconnected from its familiar use in English. A map is something you use to navigate. If you “mapped” something, well that probably means you created a map of some geographic space.

But “map” has a very specific meaning in [the mathematical sense of the word](https://www.thefreedictionary.com/map):

> The correspondence of elements in one set to elements in the same set or another set.

Given that math and computer science go hand in hand, `map` takes on this connotation of [a correspondence between elements](https://softwareengineering.stackexchange.com/questions/307639/what-does-mapping-mean-in-programming).

> In the most general sense, "mapping" in programming means taking several things and then somehow associating each of them with another thing.

As an (imprecise) example, in day-to-day UI work, you frequently map UI events to handler functions. In doing so, you are establishing a correlation between two sets of elements.

- `<button>` : `handleButtonClick`
- `<form>` : `handleFormSubmit`
- `<html>` : `handleOnScroll`

Therefore, if you take a set of things and make an association to another set of things, you've created a mapping.

- 2 : 4
- 3 : 6
- 4 : 8
- 5 : 10
- 6 : 12

Can you figure out the correspondence of this mapping? The association is a multiplication of two. The mapping is a function. You are associating a group of things to another group of things according to some formula or model.

If you think about it, that’s what a geographic map does. It’s a translation—a mapping—of the spacial relationships between  landmarks on the earth into a different format or representation, like drawings on paper.

Maybe the API `.map()` is a lot closer to the idea of a geographic map than I first thought.

## Filter

[@zachleat on twitter](https://twitter.com/zachleat/status/1194699345901375489?s=20):

> if you `return false` in Array `filter` it means filter it  
> if you `return true` in Array `filter` it means don’t filter it
> seems backwards to me but ok

[I feel that](https://twitter.com/jimniels/status/1194701252879376384?s=20):

> I’ve used .filter() countless times and still find myself in situations where doubt will creep into as to whether i'm supposed to return true or false and then i have to look it up.

When you "filter" something, what are you interested in? The thing that passes through the filter, or the thing that gets blocked by the filter?

- With a coffee or water filter, you’re likely interested in what is passing through.
- With an internet content filter, you’re likely interested in what is being blocked (i.e. malware, porn, etc.)

Regardless, `filter` is probably the easiest term to port from its ordinary use of English, i.e. “I want to pare something down”. The confusing part is merely trying to remember which binary condition “filters” your data.

## Reduce

In layman English, if somebody told me they were going to “reduce” something, I would interpret that as bringing down its size or quantity, i.e. “I’m going to reduce your standing in the world” or “I’m going to reduce the amount of milk I buy each week”.

In a sense, that is how what the `.reduce()` API is doing too: it changes a piece of data to a simpler form. [From one website](https://www.educative.io/edpresso/what-is-reduce-in-javascript):

> The reduce method is applied to arrays in Javascript. This method does what its name says; it takes the values in an array, from the first till the last element, and applies functionality such that it changes the array into one singular value. Hence, it reduces the array.

As an illustration, consider simplifying fractions. Which is easier to look at?

98/588 or 1/6?

290/435 or 2/3?

This is a reduction. You’re taking a complex value and reducing it to a simpler form. Reducing fractions is done through division. Reducing an equation, through combining like terms:

`4x + 7y + 6y - 5z=4x - 4z` reduces to `13y = z`.

The `.reduce()` API helps you do similar: take some data and reduce it to a singular value.

```js
// Take an array of numbers and sum them to a single value
[1,2,3,4].reduce(
  (accumulator, value) => accumulator + value,
  0
);
```

## Conclusion

There’s always [the cute emoji examples](https://twitter.com/ramswdev/status/1417975847588347907?s=21) which illustrate the difference between map, filter, and reduce.

<img src="https://cdn.jim-nielsen.com/blog/2021/programming-terms.jpeg" width="440" height="179" alt="Code examples which use animal and food emojis to illustrate how map, filter, and reduce functions work." /> 

Understanding what APIs _do_ in a language is one way to understand code.

Understanding why APIs are named the way they are in a language is another plane of understanding code. It enhances your understanding in a way that experiential knowledge alone cannot.

I think of it as the difference between knowing what a “map“ is in English and how to use one, vs. understanding [the etymology](https://www.thefreedictionary.com/maps+on#:~:text=modified%20American%20plan.-,map,%2C%20%22napkin%2C%20tablecloth.%22) which tells you it came from medieval Latin “mappa mundi” meaning literally “sheet of the world”. I find both helpful.