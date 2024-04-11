# Two Quick Tips When Building With React Router

I’ve been working with the latest [Remix-ification of React Router](https://remix.run/blog/remixing-react-router) and there are two things I wish I had known when I started. 

So I’m writing them down in case anyone else is about to start a React Router app.

## 1. Flat Action Data When Using JSON

If you’re submitting JSON, e.g.

```js
submit(
  { key: "value" },
  { method: "post", encType: "application/json" }
);
```

It’s good to keep your data flat because it gives you the easy and flexibility to submit the same data as a native `<form>` submission later (without JavaScript).

For example: let’s say you have some data for an action in your application. You can submit this as JSON with a structure where you separate the intent of the action from the payload itself, e.g.

```json
{
  "intent": "update-person"
  "payload": {
	  "name": "Jim Nielsen",
	  "email": "jim@example.com"
  }
}
```

However, once you have a structure like this, it becomes more convoluted to submit and parse that same data using a native `<form>` element.

But if you use a flat structure, like this:

```json
{
  "intent": "update-person",
  "name": "Jim Nielsen",
  "email": "jim@example.com"
}
```

Then it’s simpler to represent that same action as a form in HTML which doesn’t require JavaScript to submit:

```html
<form>
  <input type="hidden" name="intent" value="update-board" />
  <input type="text" name="name" value="..." />
  <input type="text" name="email" value="..." />
</form>
```

And getting/parsing that data from [formData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) to a JavaScript object becomes simpler and more straightforward.

So keep your data as flat as possible because it gives you the flexibility to write your mutations declaratively in HTML or imperatively in JavaScript, depending on the context and needs of each use case (trust me, you’ll thank yourself one day if ever migrate to Remix and introduce a server).

## 2. Be Specific Naming URL Params

It’s ok to type a little more, I promise.

When coming up with your URL params, you could have patterns like this:

```
/files/:id
/teams/:id
```

Which you can access in nested routes using hooks:

```js
// At the route: `/files/1234`
const { id } = useParams();
// id = 1234
```

But you can easily outgrow those generic param names as your features become more rich and the entities in your system develop more relationships which themselves also have IDs. 

Then you end up with param conflicts:

```
/files/:id/users/:id
/teams/:id/users/:id
```

One solution to this might be to name your IDs for the kind of ID that they are. For example, maybe one of my IDs is a UUID (e.g. `550e8400-e29b-41d4-a716-446655440000`) whereas the other ID is just an int (e.g. `351`).

```
/files/:uuid/users/:id
/teams/:uuid/users/:id
```

But you can end up in the same place if, later on, you need to switch from one identifier to another (or you get another entity in your system that necessitates using the same kind of identifier).

```
/files/:uuid/users/:id
/files/:uuid/invites/:uuid
/teams/:uuid/users/:id
```

So, given my experience, I would say: be specific in naming your params. Then the risk of namespace collisions in your params is decreased drastically and you won’t have to refactor your code as you add new entities. Plus the code is — IMO — just flat out clearer.

```
/files/:fileUuid/users/:userId
/files/:fileUuid/invites/:inviteUuid
/teams/:teamUuid/users/:userId
```

Accessing those params is now super easy anywhere in the code. In addition, _finding_ those named params anywhere in your codebase is much easier too (vs. the generic `id`).

```js
// At route: `/teams/0001923-02930-123/users/1234`
const { teamUuid, userId } = useParams();

// teamUuid = 0001923-02930-123..., userId = 1234
```