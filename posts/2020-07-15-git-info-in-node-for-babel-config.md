#stories #engineering

# Git Info in Node for a Babel Config

I was recently working on a little project that depends on Babel solely for JSX transformations. I had a simple Babel configuration to make it all work. “Simple Babel configuration” sounds like an oxymoron, but trust me, it was _lean_. Then along came a need to make it a bit more sophisticated. I wanted to have the build inject information about the current commit (sha) and version info (tag) on the project. That way, whenever I looked at production, I could see this info (i.e. `1.0.3@49ea56`) and rest assured my latest changes were live.

I found a straightforward [babel plugin](https://github.com/jean-smaug/babel-plugin-search-and-replace) that does find/replace. It allowed me specify strings to find/replace in my code, i.e. “find all occurrences of `__VERSION__` and replace them with the latest tag/commit info”. Babel allows you to write a configuration file in JavaScript, so all I needed was a way to have node surface two pieces of info from git:

1. The current commit sha
2. The latest tag

I should’ve learned by now that saying phrases like “all I need is...” is the quickest, surest way to make something complicated. 

## Try 1: Third-party Tool

I’ve used [git-rev-sync](https://www.npmjs.com/package/git-rev-sync) a few times and it’s always worked great. I didn’t want to add another (dev)dependency, but I figured Babel was installed, what’s one more? (I know, I know, that’s a slippery slope to death by a thousand `node_modules`.)

But I couldn’t get the module to work because my node configuration was setup to use ES modules (not commonJS) and [git-rev-sync has traces CJS-specific syntax in it](https://github.com/kurttheviking/git-rev-sync-js/blob/master/index.js#L37). I could've fiddled with refactoring the file to commonJS, but the purist in me dictated “no, ES modules in the entire codebase or bust.” Plus the thought of achieving what I wanted without a third-party dependency was alluring, so I discarded those changes.

## Try 2: Callbacks

After some searching online, I found [this answer on StackOverflow](https://stackoverflow.com/a/34518749) which told me I could get the git info I wanted by using code with callbacks. Something like this:

```js
import { exec } from "child_process";

let config = {
  sha: "",
  version: ""
};

exec('git rev-parse HEAD', function(err, stdout) {
  config.sha = stdout.trim().slice(0,7); // 4aef910
});
exec('git describe --tags --abbrev=0', function(err, stdout) {
  config.version = stdout.trim();
});

return config;
```

Hm...but callbacks aren’t doing me much good in a Babel config. I need to await for things to resolve before I could return the config values.

“Await for things to resolve? Jim, it sounds like you need async functions and promises.” Hey, that’s what I thought too.

## Try 3: Callbacks in a Promise

I figured, why not put the callbacks in a promise that resolves to the value I want? Starting to get lots of callback nesting here, but you know what? This is fine.

```js
import { exec } from "child_process";

let config = {
  sha: "",
  version: ""
};

return new Promise((resolve) => {
  exec('git rev-parse HEAD', (err, stdout) => {
    config.sha = stdout.trim().slice(0,7); // 4aef910
    exec('git describe --tags --abbrev=0', (err, stdout) => {
      config.version = stdout.trim();
      resolve(config);
    });
  });
});
```

I could’ve used node’s `promisfy` util to make this a bit cleaner, but this works fine. Right? “Nope,” says Babel.

```
Error: You appear to be using an async configuration, which your 
current version of Babel does not support...if you're on the
most recent version of @babel/core and still seeing this error, 
then you'll need to synchronously return your config.
```

Ah, so no returning promises? Ok, now what?

## Try 4: Synchronous Execution

Babel configs won’t take a promise as a return value, so how do I turn those callbacks/promises into synchronous code? 

If only I’d read [the _second_ answer to the original StackOverflow post](https://stackoverflow.com/a/35778030) I’d found. But alas, I did not. Instead I sojourned through keyword search land until I found an article titled [“Node.js: Getting current git commit information on an app”](https://medium.com/@masnun/node-js-getting-current-git-commit-information-on-an-app-753a1835c57c). This article revealed something I should’ve a few tries ago: node has a synchronous API for my callback attempt.

```js
import { execSync } from "child_process";

let config = {
  sha: execSync("git rev-parse HEAD")
    .toString()
    .trim()
    .slice(0, 7), // 4aef910
  version: execSync('git describe --tags --abbrev=0').trim()
};

return config;
```

In hindsight, this was an obvious answer. Node gives you a bunch of utils that have synchronous equivalents. I had just never used this one and didn’t stop in my keyword searching to pause and think about the problem for just one moment. But hey, this is how you learn. As you can see, I like to learn through continuous failure—exhaust all possible solutions until you arrive at the last one which works. 

I hope you have enjoyed this glimpse into how my brain steps through getting code to run.
