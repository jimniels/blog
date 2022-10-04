#remix

# Remix, React, and State

I was reading Josh Comeau’s article [“Why React Re-Renders”](https://www.joshwcomeau.com/react/why-react-re-renders/) and this sentence got me thinking:

> React's “main job” is to keep the application UI in sync with the React state. The point of a re-render is to figure out what needs to change.

In React, a simple component tree might look like this (borrowed from Josh’s incrementing counter example):

```jsx
<App>
  <Counter>
    <BigCountNumber />
  </Counter>
</App>
```

Whenever a piece of state changes, React reconciles the old state with the new state and figures out where in the component tree it needs to re-render UI elements.

What that means — and what might not always be immediately obvious — is that if you don’t store and modify your application’s state in React, then React won’t be of much use to you. _React needs state to be useful._

React state, however, is ephemeral: it lives and dies with the browser tab unless you persist it _somewhere_. That means it’s up to you to keep React state in sync with your application’s data, i.e. the source of truth.

To reframe Josh’s statement: React’s main job is to keep its state in sync with your application’s _user interface_ but not your application itself. That’s up to you.

React makes it easy to fetch data, store it as state, and render UI from it. _But_ as soon as you need to pull that state back out of React, persist it to a database somewhere, and then synchronize/validate it back into your application — well, you’re on your own.

<img src="https://cdn.jim-nielsen.com/blog/2022/react-remix-state-1.png" width="574" height="340" alt="" />

Enter Remix: [Remix handles the full state lifecycle for you](https://remix.run/blog/remix-data-flow) while React is an implementation detail to reconcile state with the DOM.

Whereas React’s job is to keep its own ephemeral state in sync with the UI (on the client), Remix’s job is to keep your application’s state — server logic, database data, etc. — in sync with the UI _across the network_ (on both the client and server).

<img src="https://cdn.jim-nielsen.com/blog/2022/react-remix-state-2.png" width="562" height="356" alt="" />

For illustration purposes, it’s almost like you can think of Remix’s component structure as a tree where your client-side components (which are implemented in Remix today with React) get wrapped in `<Server>` and `<Network>` components. When needed, and through the use of Remix conventions, state changes in nested components (i.e. nested routes) propagate all the way up through your client-side application, across the network, and to the server, where the state change is handled and then reconciled back through the entirety of your application — from database to server to client and back again, all across the network.

```jsx
<Server>
  <Network>
    <App>
      <Counter>
        <BigCountNumber />
      </Counter>
    </App>
  </Network>
</Server>
```

A change to state in `<BigCountNumber>` can propagate all the way back up to the server for persistence, then be validated back down into itself through the use of Remix’s data conventions (e.g. loaders and actions). You don’t have to think of your React app as a separate and distinct entity that must be kept in sync with something else.

Because Remix handles state changes like this end-to-end, React becomes an implementation detail for reconciling state changes in the DOM at the level of the browser. In theory, any other “view layer” framework can take over this job (and [probably will in the future](https://twitter.com/ryanflorence/status/1529438363341639680)).

In this way, using React state in a Remix app becomes reserved for ephemeral state that can die with the browser tab, e.g. state needed to produce effects in the UI.