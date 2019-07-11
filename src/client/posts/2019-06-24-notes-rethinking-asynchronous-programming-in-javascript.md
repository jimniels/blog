---
title: Notes on “Rethinking Asynchronous Programming in JavaScript” by Kyle Simpson
date: 2019-06-24
tags: generalNotes
---

I first watched these videos in October of 2017 and took a bunch of notes. Somehow they got lost and I just recently rediscovered and reread them. There’s some good stuff in here. So I’m putting these up on my blog as notes I can reference later as needed.

---

> We are drunk on pretty APIs. — Kyle Simpson

Kyle’s main goal in this series is to help you understand promises and generators in JavaScript as additional tools to use in your codebase to manage asynchronicity. As he says:

> The new baseline for competency in asynchronous programming is understanding what promises are, what generators are, and why the two need to be mixed together to solve the issues of callback hell.

- Video I watched: [Safari Books Online Video](https://www.safaribooksonline.com/library/view/rethinking-asynchronous-programming/9781491967515/)
- Related: “[Async & Performance](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20&%20performance/README.md#you-dont-know-js-async--performance)” from the “[You Don’t Know JS](https://github.com/getify/You-Dont-Know-JS)” book series

## Parallel vs Async

When you’re trying to keep up on JavaScript land, it’s easy to end up hearing all these new terms and technologies that are being introduced into JavaScript, like “promises” and “generators”. Most of the time you’ll hear about how to implement these things, but it’s not always clear what these things are or why they are needed. Kyle covers that well in the `Parallel vs Async’ section. This helps give you, as a developer, a better understanding about _what_ your tools are and _why_ you use them instead of just the basic understanding of _how_ to use them.

- Everything in JavaScript is happening on a single thread: your JS, your styles, your garbage collection, etc. This is why you get jitters in the UI. When your UI is trying to repaint at 60fps and something else requires computation, you get a momentary jitter.
- Things happen concurrently in JavaScript to avoid unnecessary stalls in computer/user interaction. It’d be weird if you made a synchronous Ajax call which made the page freeze up until the request was completely done. Instead, Ajax calls happen concurrently with other tasks (like your UI repainting), even though at any given instant only one of those tasks can be executing on the tread (i.e. event loop).
- “Asynchronous programming” in JavaScript is better patterns for concurrency management, i.e. patterns on top of the existing pattern we have for concurrency (callbacks) like generators and promises.

As Kyle summarizes, the new baseline of competency as a JavaScript developer is to have a more sophisticated, strategic, and tactical approach to concurrency management in your applications. Features like promises and generators can provided that.

## Callbacks

### Callbacks as “Continuations”

Callbacks are also called “continuations” because they are code continuations in the sense that you are executing code now and then later. That “later” could be any time, for example when a network call is finished. But the idea is that you want some code to run now and you want some code to run later. And when that “later” code runs, you essentially want to pick up where you left off from before. This is why callbacks are often called “continuations”.

### “Callback Hell”

Callback hell has nothing to do with the indentation of your code, it’s deeper than syntax.

Callback hell has to do with an inversion of control, which means there’s a part of my code I’m responsible for executing (the “do it now” stuff) and there’s part of my code that I’m not in charge of executing (the “do it later” stuff, i.e. got a response from server? Now do something). So in other words, when I give somebody a callback I’m saying “here you go, now you are in control of when this thing executes”. You are trusting that the callback will be called:

- Not too early
- Not too late
- Not too many times
- Not too few times
- No lost context
- No swallowed errors
- ...and more!

In other words, every callback you’ve ever written has an existing bug of trust (even if you haven’t been bitten by it yet)

### Writing Asynchronous Programs in a Sequential Manner

Kyle’s theory: the point at which our brains and our natural methods of cognition diverge from the way the javascript engine works, that’s the point at which bugs occur

That’s what a lot of these ES6/7 features do, they provide you tools to program in a way that more naturally suits the way your brain works so that there are fewer bugs

But is it possible to write asynchronous programs in a sequential manner? Doesn’t that seem paradoxical? It’s not.

Example of how we think about code vs how it really works:

```js
console.log("First thing happens");
setTimeout(() => {
  console.log("Second thing happens");
}, 1000);
```

That code is essentially expressing in our brains something that works like this:

```js
console.log("First thing happens");
block(1000);
console.log("Second thing happens");
```

But to the javascript engine, this is what it’s doing:

```js
console.log("First thing happens");
// Do a bunch of other stuff that needs to be done while we wait
console.log("Second thing happens");
```

## Thunks

Kyle says hear this if nothing else from this lecture: “managing time is the most complex state in your program."

- Thunks are an interesting pattern to take time out the equation when trying to access a value.
- First time you set them up, they do they work, but they don’t give you the value until you pass in the callback
- These are the conceptual underpinnings of a Promise.
- “Thunks are a very lightweight way of solving asynchronous sequencing issues without having to invoke some huge library”
- “I don’t need a library. I just need to better understand how to use my currently available tools”
- Thunks are about using closure to maintain state
- If we can use this tool, a thunk, as a wrapper around a time-based value of state, we can then compose values together without having to worry about the ordering. Time becomes a non-issue.

Example thunk code. `getFile()` is the plumbing, where as the nested `thunk1(() => thunk2())` etc. calls are the async code we’re writing over and over again in our programs.

```js
function getFile(filename) {
  // Leverage closures
	var fileContents, fn;

  // If `fn` exists, that means the `return` statement already
  // fired (which sets the callback). So we call that func
  // Otherwise, we'll save the Ajax response
  myAjaxCall(filename, (response) => {
    if (fn) {
	    fn(response);
	  } else {
      fileContents = response;
    }
  });

  // If `fileContents` exists, the Ajax call already finished.
  // So we'll call our callback with the response
  // Otherwise we'll save our callback as a function for use
  // when the Ajax call finishes.
  return (cb) {
    if (fileContents) {
      cb(fileContents);
    } else {
      fn = cb;
    }
  };
}

// Kick off the async requests for each (these return thunks
// i.e. they are a function that returns a function)
var thunk1 = getFile('file1.txt');
var thunk2 = getFile('file2.txt');
var thunk3 = getFile('file3.txt');

// Print the output sequentially
thunk1(file1Contents => {
	console.log(file1Contents);
	thunk2(file2Contents => {
		console.log(file2Contents);
		thunk3(file3Contents => {
			console.log(file3Contents);
			console.log('Complete!');
			// You just printed these sequentially without caring
			// about the sequence in which they finished.
			// i.e. you just took time out of the equation
		});
	});
});
```

## Promises

> There is a promises hell, I promise you.

It’s important to understand the concepts behind promises and what they are before you learn the API. This is the reverse of the way things are typically taught. Remember that promises aren’t perfect. When you run into a gotcha, you need to understand the _why_. There is very much “promises hell”.

Promises allow you to reason about something on the promise of the thing before you have the actual thing itself. They are a codification of the idea that we need a placeholder to eliminate time as a concern wrapped around a value (a future value). They allow you to reason about and write code around a future value, all within the same space, whereas with callbacks you have to make jumps around “this happened here, now in this other file is what happens when you get the value” etc.

Promises are like event listeners. You call the thing and then listen for the outcome. Except in a promise, the listener action is the `then()` action.

```js
// listener
var listener = orderCheeseburger(purchaseInfo);
listener.on(‘complete’, function(){})
listener.on(‘error’, function(){})
// promise
var myPromise = orderCheeseburger(purchaseInfo); // returns a promise
promise.then(function complete(){}, function error(){});
```

The fundamental design principles of promise are:

- they only resolved once
- they result in either a success OR an error
- messages are passed / kept
- exceptions become errors
- they are immutable once resolved (you can send it anywhere, even outside your system, and you know it won’t be changed from under you)

### `.catch()`

Conceptually, it is worth pointing out that `.catch()` is the same as another `.then()` with the first argument (the resolver) as `null`

```js
// this
.then()
.catch(err => { /* my error here */ })

// is the same as this
.then()
.then(null, (err) ={ /* my error here */ })
```

You can see how this would allow you to recover from an error in a chain with some kind of default:

```js
.then()
.then(() => {
	return fetch().then(res => res.json())
})
.catch(err => {
	return 'somedefaultvalue';
})
.then(myVar) // would be 'somedefaultvalue'
```
