# Ductility in Software

I learned a new word: [ductile](https://dictionary.cambridge.org/us/dictionary/english/ductile). Do you know it?

I’m particularly interested in its usage in a physics/engineering setting when talking about materials.

Here’s an answer on Quora to: [“What is ductile?”](https://www.quora.com/What-is-ductile)

> Ductility is the ability of a material to be permanently deformed without cracking.
>
> In engineering we talk about elastic deformation as deformation which is reversed once the load is removed for example a spring, conversely plastic deformation isn’t reversed.
>
> Ductility is the amount (usually expressed as a ratio) of plastic deformation that a material can undergo before it cracks or tears.

I read that and started thinking about the “ductility” of languages like HTML, CSS, and JS. Specifically: how much deformation can they undergo before breaking?

HTML, for example, is famously forgiving. It can be stretched, drawn out, or deformed in a variety of ways without breaking.

Take this short snippet of HTML:

```html
<!doctype html>
<title>My site</title>
<p>Hello world!
<p>Nice to meet you
```

That is valid HTML. But it can also be “drawn out” for readability without losing any of its meaning. It’ll still render the same in the browser:

```html
<!doctype html>
<html>
  <head>
    <title>My site</title>
  </head>
  <body>
    <p>Hello world!</p>
    <p>Nice to meet you.</p>
  </body>
</html>
```

This capacity for the language to undergo a change in form without breaking is its “ductility”.

HTML has some pull before it breaks.

JS, on the other hand, doesn’t have the same kind of ductility. Forget a quotation mark and boom! Stretch it a little and it breaks.

```js
console.log('works!');
// -> works!

console.log('works!);
// Uncaught SyntaxError: Invalid or unexpected token
```

I suppose some would say “this isn’t ductility, this is merely forgiving error-parsing”. Ok, sure.

Nevertheless, I’m writing here because I learned this new word that has very practical meaning in another discipline to talk about the ability of materials to be stretched and deformed without breaking.

I think we need more of that in software. More resiliency. More malleability. More ductility — prioritized in our materials (tools, languages, paradigms) so we can talk more about avoiding sudden failure.