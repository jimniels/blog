#tilawpur

# Form Data and Structured JSON

> …I guess it's true that you learn web standards by learning remix — [@ovstoica](https://twitter.com/ovstoica/status/1521776397588520960)

I’m working on rebuilding a side project in Remix. Right now it’s pure client-side, meaning no JavaScript = no functionality. Why did I build it that way? Honestly, because it’s the only way I knew how. But now with Remix I feel empowered to build it with progressive-enhancement in mind: it works _before_ JavaScript loads, then when (or _if_) the JS loads, the page gets enhanced.

So far, [it’s going really well](https://twitter.com/jimniels/status/1530059286826582016). I’m learning a lot along the way—often [more about the web platform than about Remix the framework](https://twitter.com/jimniels/status/1532929935370817538).

I figure I’ll start blogging about what I learn. A series of posts, perhaps, which I’ll tag something like `#TILAWPUR`: Things I Learned About the Web Platform Using Remix.

First up: parsing form data into structured JSON.

In Remix, data mutations are described declaratively as `<form>` requests in HTML (as opposed to `fetch()` instructions in JavaScript — [read the Remix docs for more info](https://remix.run/docs/en/v1/guides/data-writes)).

Data from the `<form>` submission is sent by the browser to the server where I handle the data in my own custom JSON structure: a `readlist` object. Here’s an example for simplicity’s sake.

```json
{
  title: "The Title of My Readlist",
  articles: [
    {
      title: "Foo",
      url: "https://example.com/foo"
    },
    {
      title: "Bar",
      url: "https://example.com/bar"    
    }
  ]
}
```

In my template file I have this same data structure to work with, so I render a `<form>` which describes the data that can be changed and submitted by the user.

But how do you render an array of data from JSON into an HTML `<form>`, then parse it back into the same structure later? Do you give a unique `name` to each repeating piece of data? For example:

```html
<label>
  Article 1: Title
</label>
<input
  type="text"
  name="article-1-title"
  value="Foo"
/>

<label>
  Article 2: Title
</label>
<input
  type="text"
  name="article-2-title"
  value="Bar"
/>
```

Nope, that’s not it. 

Turns out, the Remix docs have [a note about using structured data in a `<form>`](https://remix.run/docs/en/v1/pages/faq#how-can-i-have-structured-data-in-a-form):

> `FormData` is a bit different than JSON.
> 
> - It can't have nested data, it's just "key value".
> - It can have multiple entries on one key, unlike JSON.
> 
> If you're wanting to send structured data simply to post arrays, you can use the same key on multiple inputs:

That means you have HTML like this, where multiple inputs can have the same `name` (which is the key you use on the server to identify the data):

```html
<label>
  Article 1: Title
</label>
<input
  type="text"
  name="article-title"
  value="Foo"
/>

<label>
  Article 2: Title
</label>
<input
  type="text"
  name="article-title"
  value="Bar"
/>
```

You might be thinking, as I was, “How do I pull individual values when I have multiple entries with the same key?” [Matt](https://twitter.com/brophdawg11) showed me that the browser maintains the “[tree order](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#constructing-the-form-data-set)” when submitting the data. So whatever order your elements take in the DOM, that’s the order you’ll get when retrieving them using [`formData.getAll()`](https://developer.mozilla.org/en-US/docs/Web/API/FormData/getAll).

In my example using Remix, on the server I can read the data from my `form` like this:

```js
export async function action({ request }) {
  const formData = await request.formData();
  const articleTitles = formData.getAll("article-title");
  // ["Foo", "Bar"]
}
```

For a more illustrative example of parsing all the data:

```js
// Given HTML like this:
// <input name="readlist-title" value="...">
// <input name="article-title" value="Foo">
// <input name="article-url" value="https://example.com/foo">
// <input name="article-title" value="Bar">
// <input name="article-url" value="https://example.com/bar">

// I turn it into a structured `readlist` object
let readlist = {
  title: formData.get("readlist-title"),
  articles: []
}

const articleTitles = formData.getAll("article-title");
// ["Foo", "Bar"]

const articleUrls = formData.getAll("article-url");
// ["https://example.com/foo", "https://example.com/bar"]

articleTitles.forEach((_, i) => {
  readlist.articles[i] = {
    title: articleTitles[i],
    url: articleUrls[i]
  };
})
```

Granted, you’ll likely want some dynamism here. A `.map` or `.reduce` operation with a list of keys will come in handy to transform `formData` into an array of objects. But the idea is illustrated here.

Personally, I like to give my inputs a `name` that maps to my JSON structure as it helps me better visualize the structure of the JSON data when described in an HTML form. So, rather than `readlist-title` and `article-title`, I name them `readlist.title` and `readlist.articles[].title`. Here’s an example of my JSX template.

```jsx
<form method="post">
  <label>Title</label>
  <input
    type="text"
    name="readlist.title"
    value={readlist.title}
  />
  {readlist.articles.map((article, i) => 
    <div key={i}>
      <h4>Article {i+1}</h4>
      
      <label>Title</label>
      <input
        type="text"
        name="readlist.article[].title"
        defaultValue={article.title}
      />
      
      <label>URL</label>
      <input
        type="url"
        name="readlist.article[].url"
        defaultValue={article.url}
      />
    </div>
  )}
  <button type="submit">Submit</button>
</form>
```

Again, that naming convention helps me better visualize my data structure as it crosses back and forth between client (HTML form) and server (JSON data).

Phew. That is a long-winded way of explaining what the [Remix docs](https://remix.run/docs/en/v1/guides/data-writes) already recommend. Most of my experience doing mutations on the web stems from doing it in client-side JavaScript:

```js
handleFormSubmit(e) {
  e.preventDefault();
  
  // Do some data stuff here, and then call some API
  // that wouldn’t even work with a normal <form> request.
  // (And assume the JavaScript here works for everyone)
}
```

I’m learning a lot more about how forms work in browsers. No more `e.preventDefault()` as the first line of code for every network transaction.

It’s a side of the web that’s been around since before I ever started making websites. I’m only now really learning it—but it’s fun! And the best part is, it’s [transferrable knowledge](https://remix.run/blog/not-another-framework).
