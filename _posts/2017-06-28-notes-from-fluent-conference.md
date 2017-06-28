---
title: Notes from Fluent Conference
date: 2017-06-28
---

I recently attended [Fluent Conference 2017](https://conferences.oreilly.com/fluent/fl-ca) in San Jose. Like a good student, I took notes during the sessions and am posting them here.

## “Build a JavaScript development environment” by Cory House ([@hoursecor](https://twitter.com/housecor))

- [Slides from the talk](https://www.dropbox.com/s/jdiz9av83495bsu/Build%20a%20JS%20Dev%20Env%20-%203%20hr%20-%20Fluent%202017.pptx?dl=0)
- One solution to javascript fatigue? Use a comprehensive framework (like Ember) that is opinionated and makes decisions for you.
	- This is why prettier is a good idea. It’s opinionated (and embraced by the open community). **It makes you not have to continually return to decisions** about formatting.
- **Not making a decision is making a decision**
	- If you don’t know how to do automate testing you end up not incorporating it. That’s making a decision to not do testing.
	- In other words if you don’t do something because you don’t know how, that’s a decision and it will affect you.
- Another solution to javascript fatigue? Get a javascript starter kit
	- Keeps consistency between projects, which allows people to flex between teams because things are the consistently the same.
	- Makes doing the right thing the easy thing.
	- When you get fatigued, continue enhancing the starter kit. When you go to a code review and see something again and again, write something into your starter kit that fixes it.
	-  You can abstract things like React behind your company starter kit. Then when things like React upgrade, the people on your team don’t have to have the headache of upgrading React across multiple projects. You upgrade it in one place, then everybody else upgrades. Think of it like a `react-scripts` but for your company.
- Making checklists
	- This can be useful for ourselves because inevitably we are human and forget stuff.
	- Whenever you find yourself failing, add the thing you failed at to your checklist.
- When somebody joins your team, how long does it take them to become productive?
	- The new standard in front-end is: `npm start` -> `npm run build` -> `npm deploy`
- Tip: you can use `babel-node` package in npm scripts, which will let you run ES6 / import scripts in node from CLI.
	- Instead of `node ./myscript.js` you can do `babel-node ./myscript.js`
	- Welcome to the wonderful world of writing ES6 on the server!
- Tip: Add the word `debugger` where you want a breakpoint and you can inspect variables, etc. 
- Tidbit: how we’ve evolved in javascript with code encapsulation
  - Global: `window.$`
  - IIFE: `(function(){})()`
  - AMD: `define(['jquery'], function($){})`
  - commonjs: `var $ = require('jquery')`
  - ES6 modules: `import $ from 'jquery'`

## “Locking it down: A security primer for web developers” by Michael North

- [Slides from the talk](https://cdn.oreillystatic.com/en/assets/1/event/259/Locking%20it%20down_%20A%20security%20primer%20for%20web%20developers%20Presentation.pdf)
- Your WiFi networks are essentially remembered forever. Your computer is constantly broadcasting the names of previous networks you’ve joined in order to try and connect to something.
- “We’re all one bad chrome plugin away from losing out entire bank account”

## “Async in JavaScript and readability in Redux” by Nicole Chung

- [Slides from talk](https://cdn.oreillystatic.com/en/assets/1/event/259/Async%20in%20JavaScript%20and%20readability%20in%20Redux%20Presentation%201.pdf)
- Tools in javascript for doing async code:
	- Callbacks
	- Promises
	- Async/Await (promises under the hood)
	- Generators
		- You can actually have infinite loops in generators because execution is paused on the `yield` keyword
		- Allows you to cancel async actions (the above don’t)
		- Generators are harder to write by hand. Usually you’ll have to use libs.
- Speaker suggests mocking API requests in redux-thunk can be tedious.
	- However, advantage of redux-thunk is that a thunk is just a function returning a function with the state and dispatch. So your developers don’t have to learn a whole new API (like they would with, say, `redux-saga` or `redux-observables`) to be productive.
- Dan (creator of `redux-thunk`) thinks `redux-saga` might be a better option than `redux-thunk`

## “Tame the frontend with Elm” by Jeremy Fairbank

**Note:** this was the most interesting talk I attended at Fluent. Just throwing that out there.

- [Slides from talk](https://cdn.oreillystatic.com/en/assets/1/event/259/Tame%20the%20frontend%20with%20Elm%20Presentation.pdf)
- Elm is a functionally, static typed language that compiles to javascript
- There are no run-time exceptions in practice. Errors occur at compile time
	- This is all possible because of Elm’s strong types
- One framework: the Elm architecture 
- Everything is a single expression in JS
- Functions are curried automatically, so the first argument always returns a function, where you can thereupon build
	- Elm is supposed to be readable and terse, so you can use piping to avoid long lisp-style nested parenthesis
	- Similar to chaining in JS
	- Type annotations say `add : Int -> (Int -> Int)`
- Records are a way of annotating the shape of your objects and creating your own types
- Immutable. Instead of changing values, you create new ones via `|`, which is similar to `Object.assign`

## “NPM Scripts as your build tool” by Elijah Manor

I took [some notes](http://jim-nielsen.com/blog/2017/reading-notes-april/) back in April on this subject via an [egghead.io course](https://egghead.io/courses/how-to-use-npm-scripts-as-your-build-tool) which was created by the speaker himself. So this talk was a refresher, but nonetheless still very interesting. 

- [Slides from talk](http://bit.ly/npm-scripts)
- `npm-run-all` to run multiple scripts
	- Sounds like it’s “on the way” to being cross platform compatible?
- `--` is something being passed in, i.e. `npm run build:css -- --watch`
- `npm completion` to tab complete stuff in terminal
- `exec()` from [shelljs](https://github.com/shelljs/shelljs) which is a cross platform way of running CLI stuff
	- Hadn’t seen `shelljs` until this talk. Looks very interesting! A way of writing cross-platform tasks to run in the command line.

## “Handling authentication secrets in the browser” by Miguel Grinberg

- The Web is stateless
	- HTTP servers cannot “remember” clients from one request to the next
	- Clients must provide some form of identification
	- The idea of “logging in” and “logging out” and navigating “inside” an app is just an abstraction on top of HTTP
- Client gets user/pass in form of credentials; if the server accepts, server sends back a form of authentication
	- Client gets a token then includes in all subsequent requests
	- The token represents a session
- Passwords vs tokens (passwords are dangerous, tokens less so)
	- Passwords
		- Created by humans
		- Give full access to user’s account
		- Don’t expire (usually)
	- Tokens
		- Generated by server
		- Can have a scope
		- Generally expire
	- Cookies
		- Storage mechanism
		- Convenient for auth because browser sends them (whereas you token you must send in header)
		- An authentication cookie normally stores a token
- User sessions
	- Server remembers clients by creating “user session”
	- Server-side user session are stored in a db (or disk file)
	- Client-side user session are returned to client in a token or cookie
		- Contents of the session are crypto signed to prevent tampering. If a hacker gets a hold and changes, the signature will change and the server will know it’s been compromised
- Use HTTPS
	- Encrypts all traffic with a key only known to client and server
	- User credentials cannot be intercepted while in transit as long as all authentication cookies have the `secure` flag
		- This prevents the browser from sending the cookie on non-https connections
- Cross-Site Scripting (XSS)
	- Problem
		- Hacker injects javascript code into your site via comments or posts
		- When users view the affected page, that javascript executes on their page
		- Rogue script can upload cookies, local storage, DOM contents, etc. to an attacker controlled server
	- Solution
		- Sanitze all input from clients
		- Use auth cookies with the `httpOnly` flag so they are not accessible via JavaScript (browser will get it for you)
		- Use tokens with a short expiration
- Cross-Site Request Forgery (CSRF)
	- Only relevant when you use cookies

## “Schema-first development with GraphQL” by Danielle Man

- [Slides from talk](https://cdn.oreillystatic.com/en/assets/1/event/259/Schema-first%20development%20with%20GraphQL%20Presentation.pdf)
- REST pitfalls
	- One endpoint per view
	- One endpoint per resource
	- You have to start passing parameters that say “give me more” or “give me less”
	- You don’t spend time on the business logic of your app, which is why your company exists
- GraphQL
	- It’s a specification not an implementation
	- The schema is the heart of the API. It’s the contract between the backend and the frontend.
	- Has strong-types in its schema
	- Clients can specify their own queries rather than REST that announces what you can ask for
- [Launchpad](https://launchpad.graphql.com/new) looks like an interesting tool where you can play with GraphQL
- You can measure how things are being resolved, i.e. which data is being pulled and prune old stuff. It lets you ask a lot of questions about your API that you could’t do with REST

## “Creating a scalable, secure, offline-first, dynamic (static) website with React and server less architecture” by David Wells

- Better to deliver experience to your users than developers
	- We seem to be building tools around tools to make our tools work better
- We seem to have the best of world in our apps but old school stuff on our marketing sites
- Ultra fast
	- Deliver content from CDN
		- `npm run build` -> react server side rendering will build the site once -> distribute
	- Content on site is cached by service worker (works offline)
	- After first page load, React bootstraps on client for SPA experience

## “Source maps demystified” by Ben Vinegar

- You can specify the location of your sourcemap on something like a private VPN network, that way the browser will only load it and make available your original source code if somebody on the VPN is troubleshooting