---
title: Breaking Up Redux Actions into Individual Files
date: 2017-11-27
tags: engineering insight
---

Background


The `actions/index.js` file is getting pretty long so I've been thinking about how to break it up. PAC isn't a huge project, so I don't think we would lose a lot of value by just sticking all our actions in separate files. However, here's my thought process:

## Possible Solutions

## Solution Option 1: Grouped by Action Types and Action Creators

One convention for structure is to have one for action types and action creators, i.e.

```
actions/
  actionTypes.js
  actionTypes.test.js
  actionCreators.js
  actionCreators.test.js
```

However, I like the idea of having my similar action types and action creators together. Additionally, my action creators are what take up most of the space, so that still won't really solve my problem of restructuring to make files smaller and more comprehensible.

Imports would look something like:

```
import { myAction , resetStore } from "../actions/actionCreatores";
import { MY_ACTION, MY_ACTION_DONE } from "../actions/actionTypes";
```

## Solution Option 2: No Groupings at All

Just stick every single action creator/type in its own file and name it as such. For example, for the action `RESET_STORE` my file would be something like:

```
export const RESET_STORE = 'RESET_STORE';
export function resetStore() {
  return {
    type: RESET_STORE,
  }
}
```

Whereas my thunks would have a few more things in it:

```
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

```
import { resetStore } from "../actions/resetStore";
import { myAction, MY_ACTION, MY_ACTION_DONE } from "../actions/myAction";
```

## Solution Option 3: Grouped by Action Kind

PAC's set of actions boil down to two kinds: sync and async. Sync actions are the ones that I call and they get processed in a synchronous fashion. Async actions (or thunks) are the ones I call where I call the thunk and the thunk will call it's related REQUEST, DONE, or FAIL action types/creators when needed. The value in making this distinction seems to come when I'm importing from other files I more explicitly know what kind of action I'm calling (a sync one or an async one, i.e. thunk). In other words, the structure would take a similar pattern as Option 2, but each action would be divided into it's respective folder, i.e.

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

```
import { myAction, MY_ACTION, MY_ACTION_DONE } from "../actions/async/myAction";
import { resetStore } from "../actions/sync/resetStore";
```

---

In some of the above cases, it might be useful to have `index.js` files in the roots that import and export the stuff from their respective folders so that we can import anything directly from the root of actions, i.e. for exports:

```
// actions/index.js
export * from './resetStore';
export * from './myAction';
// ...more

// Some file where I need these
import { myAction, MY_ACTION, MY_ACTION_DONE, resetStore } from "../actions";
```

To retain the benefits of option 3 (clarity of importing a sync vs async action) you'd have to have separate `index.js` files in each folder, i.e.

```
// actions/sync/index.js
export * from './resetStore';

// actions/async/index.js
export * from './myAction';

// some file
import { myAction, MY_ACTION } from "../../actions/async";
import { resetStore } from "../../actions/sync/";
```

**FWIW: I think I'm leaning towards Option 3 because I like knowing if the action I'm importing is async (a thunk) or just a regular sync redux action and I get that with paths.** But if that doesn't seem clear to somebody outside the project, I like Option 2.

To see an example of how option 2 would be implemented, see #150. We would just have to tweak this PR slightly in order to achieve option 3.

## My Decision