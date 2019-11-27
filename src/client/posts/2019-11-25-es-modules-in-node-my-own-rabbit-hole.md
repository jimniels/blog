---
title: "ECMAScript Modules in Node: My Own Personal Rabbit Hole"
date: 2019-11-23
tags: engineering
---

I’ve been wanting to jump on the “run ES modules in node” train for a while. I really like the idea of writing modern JavaScript that can be easily shared between both server and client. Also, I really want to write JavaScript in one “dialect” everywhere. No transpilation. No compilation. Just plain (ES2015+) JavaScript that can be delivered and run on both the server and client without any build tooling involved. The dream!

When [the node team behind ES modules](https://github.com/nodejs/modules) first released the feature, you had to type `--experimental-modules` to try it out. So I did. Or at least I tried. I didn’t get very far. I kept running into strange issues that I didn’t fully understand and eventually gave up. “Well Jim, this is what you get when you try beta software,” I told myself. I even left my future self a ~20-line comment in the `index.js` file of my project so I could remember what’d happened in my attempt:

```js
// Conceivably, I could (one day) convert this metalsmith setup
// to ESM. Then the entire project could be ESM.
// But that day is not today.
// A couple of problematic things I ran into when trying:
```

Fast-forward to today. The modules team recently [announced core support for ECMAScript modules](https://medium.com/@nodejs/announcing-core-node-js-support-for-ecmascript-modules-c5d6dc29b663). No more `--experimental-modules` flag. “Awesome! Maybe it’s stable enough now that I try it and it’ll work!” (Is “stable software” an oxymoron? Like “jumbo shrimp”?) So I re-read my comment, brushed up on my understanding of what went wrong the last time, and dove right in to trying ES modules in node again.

After repeated attempts to translate commonJS modules to ES modules and maintain parity in the functionality of my project, I just kept hitting the same wall. Now I began realizing it wasn’t the “beta-ness” of the feature that was preventing me from getting things to work. It was my own lack of knowledge.

You know the feeling? That feeling when you are just constantly failing to get something to work, despite the fact that—at least to the best of your own knowledge—you’re doing exactly what the docs tell you to do. Then that little voice in the back of your head starts to talk: “well, I am ‘just’ a ‘lowly’ designer who doesn’t ‘really’ code so I shouldn’t expect to understand why node is not working how I expect.” 

The worst part was that I didn’t even know how to articulate the problem I was encountering other than “it works in commonJS but not with ES modules!” 

As I pondered on the problem, trying to piece together every shard of knowledge I’d gleaned from every article I’d ever read on module systems in JavaScript, I began to think the problem was stemming from the intersection of a number of things: node, how `require()` works, and the differences between commonJS and ES modules. 

Not even knowing how to articulate the problem makes Googling for an answer difficult. The words you search for are key (maybe that’s why they call them “keywords”). After lots of research, I am now writing this blog post in an attempt to explain my dilemma to somebody else (that “somebody else” being you, dear reader). Articulating the problem is the first step to solving it, right? So here we go.

## The Problem...?

I have a number of [metalsmith](https://metalsmith.io) projects. One of them is for my blog. All of the JavaScript for this project is in written in common JS, i.e. it’s full of `require()`s and `module.export`s. When I change all of those `require()` statements to `import` statements, and the `module.export` statements to `export` statements, I can actually get metalsmith working. Running a build (once) works. 

So, first of all, yay for ES modules in node!!! Big thanks to the team who worked on it. I don’t even understand it all (hence this post) but from what I’ve read, it was never going to be an easy task. So nothing but admiration for those working on solving these problems.

Ok, back to my problems.

So switching things over to ES modules works, but only if I run the build once. The problem is that when I want to enter “development” mode of my site, i.e. start a server, build the project, watch for changes, and reload things in the browser. Today, I use [metalsmith-watch](https://www.npmjs.com/package/metalsmith-watch) which does the watch files/reload changes heavy lifting for me. That’s the part that has stopped working when I move away from commonJS.

As I keyed in on where exactly the problem was coming from, what I realized is that if I changed a template file (I’m doing server-side templating via React) metalsmith appears to rebuild everything, but not based on the component template I’ve just changed. It seems to be templating with the stale file (i.e. the one loaded when metalsmith first started).

Then I began to vaguely remember some of the things I’d read about the differences between loading modules in commonJS and ECMAScript. The problem—I believe—is that when I run my metalsmith project using ES modules, all those dependencies I `import` get “statically resolved and cached” (I think those are the words). So when I run my metalsmith app and it starts watching for changes, it detects that a file has changed but node actually resolves the module to the “stale” one (i.e. the one it found when my app first started) instead of the newly-changed one. It doesn’t re-`import` modules. At least that was my theory. So I decided to test it.

What if I made my import statements dynamic and moved them into the exported function? Then node would re-`import` them each time it called the component’s function?

I tried that. No dice. “Hm...must be because, while it’s still dynamically importing that module when the function calls, node is smart enough to know ‘hey I already imported that file’ and gives me the cached version of it.” Ok, so can you get around that?

After some research, I found you could put a query string in the URL path to load the same file anew. “So I need a way to import a file uniquely each time my function runs...” Ok, so this is feeling hacky, but what if I put like a time string on there?

```js
import("path/to/file.js?time" + Date.now())
```

Hey, that worked! When I ran metalsmith and changed a template file, those changes showed up in the browser! Ok so what does that mean? I have to do this anytime I want to import a component and render it?

Ah, but then I found another problem: while that particular component would re-render appropriately as I made file changes, only the markup in that particular component’s file would re-render as expected. Any component imports at the top of that imported file were still showing the cached version.

“So if the file you dynamically import expresses any other static `import`s, then you have to add a dynamic query string to each of those too? And that means moving them into the function body as well?” My brain was hurting. This didn’t feel right. 

An illustration might help. Normally you’d write a react component something like this:

```js
import React from "react";
import Header from "./components/Header.js";

export default function Page(props) {
  return (
    <html>
	    <head>...</head>
	    <body>
	      <Header />
	      {props.children}
	    </body>
    </html>
  );
}
```

Those static imports at the top are the problem. When those were being `require()`d, things worked fine. But now that I’m trying to use ES modules, they’re apparently being cached and so as I change them and metalsmith reloads the files, its reloading not the changed file, but the one I had when I first started the server.

I started to realize that my datetime query string hack was going to result in me having to write code like this:

```js
import React from "react";

export default async function Page(props) {
  const Header = import("./components/Header.js?time=" + Date.now())
		.then(module => module.default);
  return (
    <html>
	    <head>...</head>
	    <body>
	      <Header />
	      {props.children}
	    </body>
    </html>
  );
}
```

And then I’d have to do the same thing in `<Header>` for any component imports. And the same thing in any of its children. And its children’s children. All the way down.

“Well that kinda sucks,” I thought. Why? Because then all of my react component functions would have to be `async`—at least any of the ones that depend on other components. And you don’t that when you’re `import`ing, so the safe thing would be to make _all_ my react components `async` so it’s a dependable expectation.

That just sounds totally and utterly wrong. I mean, it defeats the whole purpose of writing modules that can be used everywhere because this is totally not how you write “regular” react components for the web.

There’s probably a lot of JS devs smarter than I who would’ve very quickly arrived at this conclusion. But it took me some time to get there. So now what?

## The Solution...?

After Googling around, I found that node has a cache for `require()` which you can invalidate ([this was a particularly useful post](https://bambielli.com/til/2017-04-30-node-require-cache/) on the nature of `require()` in node). Sure enough, [metalsmith-watch appears to handle this for you](https://github.com/FWeinb/metalsmith-watch#invalidatecache-default-true).

Ok, so I think I finally found the right keywords to search for: “node how to invalidate require.cache in ES modules”. That led me to a question on StackOverflow with no answers. Hm. Ok, back to search results. Then I found [an issue on Github](https://github.com/nodejs/help/issues/1399) (by the same author as the StackOverflow question) which seemed to answer the question. 

tldr; the answer is: you can’t do this. At least not yet.

Ok, writing this post and trying to explain the problem has helped me. I think this is how I would sum it up: 

In commonJS, when you `require` a module, it gets cached by node. So the next time that same file gets `require`d, node pulls it from the cache. But—and this is an important but—you can invalidate the cache for that module so it gets `require`d anew. This is (I believe) what is happening under the hood in metalsmith-watch. When a file changes, the cache for that file (and all the files it requires) apparently gets invalidated and node re-requires them all so you get the latest changes. With ES modules, however, it appears there is no such thing as `import.cache`. The only way, it seems, you can import a file anew is to differentiate that file each time you import it by giving it a unique name (i.e. `/path/1.js?foo=bar` is a different “module” than `/path/1.js?foo=baz`). Additionally, all the children of these “dynamically imported query string modules” also need their own dynamic query strings. Nobody wants to write all of their modules with dynamic `import()`s in their function calls with query strings. So, what I’m trying to achieve appears to be impossible. At least right now, in a clean manner. As noted in that Github issue by one of the module team members:

>  you will just have to wait for us to figure out how to safely expose the behaviour for this kinda stuff.

So that’s my summary of the problem. I’ll also admit that I might be misunderstanding something here. I know a lot of [in-depth stuff](https://hackernoon.com/node-js-tc-39-and-modules-a1118aecf95e) has been written on the subject of module systems in JavaScript. So if you’re reading this post and anxious to point out where I’m wrong, [reach out](https://twitter.com/jimniels). I’d be happy to have someone help me understand this all better. 

Just writing this post has been therapeutic. Maybe I’ll hold off on ES modules in node for a little longer. At least on my metalsmith projects.

## Update: Nov 27, 2019

After writing this article and posting about it in the [metalsmith slack channel](https://metalsmith-slack.herokuapp.com/), I found this wonderful suggestion from [@AndrewGoodricke](https://twitter.com/AndrewGoodricke) (a.k.a. “Woody”):

> Don't use `metalsmith-watch`, it caused issues with various plugins. It is also good to separate the build process from watching (and triggering a re-build), the build shouldn't know anything except for what it is building...use `browser-sync` and `nodemon`. 

I had actually always wanted to do something like this, but I’d tried various combinations of file watchers and web servers available on npm and had never been able to get anything to work. But now I had a concerete suggestion of how to proceed forward.

So I followed Woody’s suggestions and things worked like a charm! Granted, it wasn’t technically a resolution to the problem I described above. `nodemon` is watching for changes and then reloading/rerunning metalsmith altogether, which means I don’t have a module cache problem because my `import` statements are “fresh” each time the app runs.

Technically, this solution is a bit slower. `metalsmith-watch` was insanely fast because it was only processing changes (vs. rerunning the entire metalsmith build). This was nice because, well, it was insanely fast. But it actually had some cognitive overhead into how you build and structure your metalsmith project. For example, any custom plugins have to take into consideration that they might be processing all expected files *or* just files that changed (which actually can get really tricky). So while the nodemon approach suggested here is a bit slower in terms of dev feedback loop, it’s a much cleaner separation of concerns, which helps you side-step thorny issues like “is this plugin processing things the first time around, or the 2nd, 3rd, 4th, etc?”

I’ve included a screenshot of Woody’s notes here, since you’d otherwise have to have a slack account to find them.

<img src="https://cdn.jim-nielsen.com/blog/2019/node-rabbit-hole-nodemon-suggestion.png" alt="Screenshot of documentation on how to ditch metalsmith-watch and use nodemon + browsersync instead." width="1136" height="1419">
