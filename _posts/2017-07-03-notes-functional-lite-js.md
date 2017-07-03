---
title: Notes on “Functional Lite Javascript” by Kyle Simpson
date: 2017-07-03
tags: generalNotes
---

I recently watched the course “Functional Lite Javascript” by Kyle Simpson (author of the excellent [“You don’t know JS” book series](https://github.com/getify/You-Dont-Know-JS)). If you have a paid subscription (which I dont’t but my employer does) you can watch the video series on [Safari Books Online](https://www.safaribooksonline.com/library/view/functional-lite-javascript/9781491967508/). If you don’t have the dough for an O’Reilly subscription, Kyle also made [a book available on Github](https://github.com/getify/Functional-Light-JS) that, at least to my cursory glance, seems to cover the same subjects from the video series.

In the video series, Keyl teaches fundamental functional concepts in an applicative method. He doesn’t teach “functional programming” from an academic / theoretical perspective, which means you don’t hear a lot of esoteric words like “currying”, “memoization”, and “monads” (though he does introduce them). The general structure of the course covers these fundamental list operations in Javascript:

- Transformation via `.map()`
- Inclusion via `.filter()`
- Composition via `.reduce()`
- Iteration via `.forEach()` (frowned upon in purely functional world because it has side effects)

The following points piqued my interest so I wrote them down.

## Decrease side effects

- The #1 goal of functional programming
- Some languages are designed from the ground up to prevent you from doing this (i.e. [haskell](https://www.haskell.org/))
- Interesting to note that closures, a functional programming concept, are essentially side effects of functions, i.e. you call it and it gives you a different result each time.
	
## Composition

- Way of reducing side effects.
- Instead of calling one function and then calling another function and composing with state, call one function, take its output, and put it directly into another function as its input
	- `add(substract(5, 1), 6)` instead of `var myVal = 5 - 1; myVal = myVal + 6`

## Immutability

### `const` 

- Doesn’t make a value immutable, it only makes a variable’s reference to that value immutable
  - `const x = 3` means that the value of variable `x` is held as a reference to the value `3` (a primitive) and that reference can never change
    - Reference is immutable due to `const`
    - Value is immutable because it’s a primitive
  - `const foo = [1,2,3]` means you cannot point the variable `foo` at any other reference but you *can* change the value of that reference, 
    - Reference is immutable due to `const`
    - Value is not immutable (i.e. `foo.push(4)` works)
- In functional programming, `const` is all about an immutable reference not an immutable value.
  - When you need a new variable, you assign its value (by reference) not to another variable’s reference but to the return of that variable.
  - `const foo = [1,2,3]`, then if you need another variable based off that, run an expression that returns a new value, i.e. `const bar = foo.concat(4,5,6)`
  - **This is the point of functional programming in javascript: it’s discipline. You choose not to change or mutate values in place.**

```js
const x = 3;
const x = 7; // reference error

const y = [1,2,3];
const y = [4,5,6]; // reference error

// Not so functional
const a = ['foo'];
z.push('bar'); // ['foo','bar']
z[2] = 'baz'; // ['foo','bar','baz']

// Functional
const b = ['foo'];
c = b.concat('foo', 'bar'); // ['foo','bar','baz']
```

### `let`

- The opposite of the explanation above around `const`, i.e. you *can* reassign a variable’s reference (and thus value in all instances)
- It’s a way of communicating to other developers “be careful, this variable’s reference could change at any time!”

## Recursion

- Before ES6, recursive functions had the ability to crash a javascript engine due to arbitrary stack reference limitations by browser makers (in IE8 this limit was 13).
- Now in ES6, tail call optimization is actually listed as a requirement in the spec. This gives you, the developer, practicality for using recursion in your applications
	- You can go `n` calls deep because recursive function calls won’t grow the stack
	- Optimization only occurs when your function’s `return` is the last statement and is calling another (or the same) function
	- [Read more about tail call optimization in ES6](http://2ality.com/2015/06/tail-call-optimization.html)
- In order to properly do a recursive call you need three things: 
	- A base case
	- A way to stop the recursion 
	- The recursive call

## Composition (via `.reduce()`)

- Compose value(s) across a list, i.e. value `a`, `b`, and `c`, smashed together, is value `d`. 
	- It’s taking the values of the list and composing them into a single value (that’s why you have to have an initial value, because the first item needs something to compose with)
- Unique’ing (partial reduction) is particularly useful with reduce
	- Loop through everything and, before you stick it in the accumulator, make sure it’s not already there