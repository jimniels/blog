---
title: Writing as a Process for Iterative Problem Solving (and Thoughts on  Structuring a Small Redux Project)
date: 2018-03-23
tags: engineering insight
---

One of the things I like to do when I write code is document and explain my choices. It’s easy to sit in a code base and think “oh, I can change this and  refactor that” because while you’re in “the flow”, the code all makes sense up in your head. But after actually changing code, I like to try and explain the *why* in my pull request because writing the *why* usually helps me discover holes in my thinking. When you have to explain what you did to somebody else, you very quickly discover your own faulty logic or reasoning. Quite frequently I’ll write code, push it, open a PR and think “well this is probably ready to merge”. At that point, I try to stop myself from pinging a co-worker and saying “hey can you take a look at this?” Instead, I try to write in the PR description *what* was done and *why* it was done. Most of the time, in the process of writing that out, I’ll discover holes in my thinking that will likely require me to go back into the code and patch up holes from my own incomplete thinking or oversight. To be honest, it’s like my own QA process and it works *really* well for me. And not only does it help me complete work that is more fully thought out, but it helps my co-workers review my PRs much more easily in addition to leaving a detailed historical account about what changes happened in the codebase and why.

To be honest, a big part of my own effort in developing this self practice stems from having worked with other people who wrote really thoughtful pull requests. For example, [one guy](https://tylergaw.com) I worked with always had the most detailed PRs. They were never a burden to review because you didn’t have to try to decipher from the code what was going on. Every PR was prefaced with context on what the problem was, how the code solved it, and why that particular approach was taken (and what bugs/edge cases to keep an eye on). Reviewing those PRs inspired me to want to write the same way and in the process I discovered what a wonderful boon it was to my own personal craft.

As a simple illustration, about six months ago I was running into a problem where a small project I had been working on was growing larger and revealing cracks, so to speak, in the existing project structure. I knew I wanted to move some stuff around in order to make the codebase more comprehensible and sensible, but I wasn’t sure how yet. So I opened up a PR with no code changes and a giant description of the problem and possible paths forward. Here’s an excerpt from that PR:

---

The `actions/index.js` file is getting pretty long so I’ve been thinking about how to break it up. PAC isn’t a huge project, so I don’t think we would lose a lot of value by just sticking all our actions in separate files. However, here’s my thought process:

## Possible Solutions

### Solution Option 1: Grouped by Action Types and Action Creators

One convention for redux-related file structure is to have a file for action types and a file for action creators, i.e.

```
actions/
  actionTypes.js
  actionTypes.test.js
  actionCreators.js
  actionCreators.test.js
```

However, I like the idea of keeping related action types and action creators together. Additionally, action creators are what take up most of the space, so this approach won't really solve my problem of restructuring files to make them smaller and more digestible/comprehensible at a glance. So I don’t have a lot of faith in this as a viable resolution to my problem. Nonetheless, this is what the imports would look like:

```js
import { myAction , resetStore } from "../actions/actionCreatores";
import { MY_ACTION, MY_ACTION_DONE } from "../actions/actionTypes";
```

### Solution Option 2: No Groupings at All

Just stick every single action creator/type in its own file and name it as such. For example, for the action `RESET_STORE` my file would be something like:

```js
export const RESET_STORE = 'RESET_STORE';
export function resetStore() {
  return {
    type: RESET_STORE,
  }
}
```

Whereas my thunks would have a few more things in it:

```js
export const MY_ACTION = 'MY_ACTION';
export const MY_ACTION_REQUEST = 'MY_ACTION_REQUEST';
export const MY_ACTION_FAIL = 'MY_ACTION_FAIL';
export const MY_ACTION_DONE = 'MY_ACTION_DONE';
export function myAction() {...}; // this is the async thunk
function myActionRequest(){...}; // sync action creator
function myActionFail(){...}; // sync action creator
function myActionDone(){...}; // sync action creator
```

So for my project structure I would just have an `actions/` folder with a file for every action (along with it's own test files):

```
actions/
  resetStore.js
  resetStore.test.js
  myAction.js
  myAction.test.js
```

Imports would look something like:

```js
import { resetStore } from "../actions/resetStore";
import { myAction, MY_ACTION, MY_ACTION_DONE } from "../actions/myAction";
```

### Solution Option 3: Grouped by Action Kind

PAC’s actions boil down to two kinds: sync and async. Sync actions are the ones that I call and they get processed in a synchronous fashion. Async actions (or thunks) are the ones where I call the thunk and the thunk will call it’s related REQUEST, DONE, or FAIL action types/creators when needed. The value in making this distinction seems to come when I import from other files, as I would more explicitly know what kind of action I’m calling (a sync one or an async one). In other words, the structure would take a similar pattern as Option 2, but each action would be divided into it’s respective folder, i.e.

```
actions/
  sync/
    resetStore.js
    resetStore.test.js
    ...
  async/
    myAction.js
    myAction.test.js
    ...
```

Imports would look something like:

```js
import { myAction, MY_ACTION, MY_ACTION_DONE } from "../actions/async/myAction";
import { resetStore } from "../actions/sync/resetStore";
```

## Misc. Notes

In some of the above cases, it might be useful to have `index.js` files in the roots that import and export the stuff from their respective folders so that we can import anything directly from the root of actions, i.e. for exports:

```js
// actions/index.js
export * from './resetStore';
export * from './myAction';
// ...more

// Some file where I need these
import { myAction, MY_ACTION, MY_ACTION_DONE, resetStore } from "../actions";
```

To retain the benefits of option 3 (clarity of importing a sync vs async action) you'd have to have separate `index.js` files in each folder, i.e.

```js
// actions/sync/index.js
export * from './resetStore';

// actions/async/index.js
export * from './myAction';

// some file
import { myAction, MY_ACTION } from "../../actions/async";
import { resetStore } from "../../actions/sync/";
```

To see an example of how option 2 would be implemented, see #150. We would just have to tweak this PR slightly in order to achieve option 3.

---

Trying to describe my problem in writing and make it comprehensible for soliciting feedback from my coworkers helped a lot. It allowed me to see options I hadn’t considered while also providing insight into the problem and how it relates to the codebase at large on a more holistic level. (In case you’re wondering, I went with option 2, but that’s not the point of this exercise.)

Sometimes you think you know what your problem is and how to solve it. But you don’t really know anything, problem or solution, until you can concisely and accurately describe your problem to another person in a comprehensible way. In fact, that’s basically the whole reason I write on this blog. Lucky for you, you get to be the audience for my ramblings :)