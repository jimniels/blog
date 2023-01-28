# npm Dependency Queries and the Cross-Pollination of Ideas

I found out about [npm dependency queries](https://docs.npmjs.com/cli/v9/commands/npm-query) by reading [Pawel’s post on the subject](https://pawelgrzybek.com/a-few-practical-use-cases-for-npm-dependency-queries/) (and following links to [the RFC](https://github.com/npm/rfcs/pull/564/files)). It’s an intriguing idea: discover information about your project and its dependencies by querying for it with selectors informed by CSS!

For example: want to see dependency information for react? Query for it with an ID selector.

`npm query "#react"`

Building on that, want to see dependency info for everything with “react” in its name? Use an attribute selector!

`npm query "[name*=react]"`

(Obligatory [link to my fav post ever on the topic of attribute selectors](https://css-tricks.com/attribute-selectors/).)

Ok, let’s expand the query net even further: what about finding dependencies that have the keyword “react” in their package? For that, there’s `:attr()` which can evaluate the key/value pairs in `package.json`.

`npm query "*:attr([keywords=react])"`

In some cases npm essentially copied CSS. In other cases, they borrowed from it or even invented [their own syntax](https://docs.npmjs.com/cli/v9/using-npm/dependency-selectors). For example: want to find all outdated dependencies? There’s a pseudo class for that.

`npm query ":outdated"`

Now that’s something you can’t do in CSS — and yet, it’s familiar. 

Here’s another example of a selector that’s not in CSS, is specific to the context of npm, and yet remains familiar: a semver selector. Want to find all dependencies that haven‘t yet reached a version `1.0`? 

` npm query ":semver(0.x)"`

Neat!

I love API design like this that leverages existing knowledge in a new context — especially for web-adjacent technologies.

Not just for the re-usability aspect of it, but for how it stimulates the imagination. For me, a kind of cross-pollination occurs when I find myself in a new context that leverages ideas from a familiar (or adjacent) context. I often find myself thinking: “I wish I could take the enhanced capabilities of these transplanted ideas and bring them back to the context I was already familiar with!”

For example: the idea of `:semver()` — which is so very specific to a core data type in a package manager like npm — makes me want more powerful, data-specific selectors in CSS. 

To illustrate, imagine you wanted to style some information in a `data-` attribute that’s a number. It would be neat if we had a `:number` pseudo class with which to do comparative operations, something like: 

```css
<div data-count="5">…</div>
<div data-count="12">…</div>
<div data-count="7">…</div>
<div data-count ="22">…</div>

<style>
  /* Everything’s red by default */
  [data-count] {
    background-color: red;
  }
  /* Except for items whose value is great than 10 */
  [data-count]:number(> 10) {
    background-color: green;
  }
</style>
```

I’m totally spitballing here and should take the time to think up more concrete examples, but I know I’ve wanted to do stuff like this in CSS.

`npm query ""` is the real CSS-in-JS ;)