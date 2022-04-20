#css 

# Ordering CSS Declarations

I was reading [Eric’s recommendation to organize your CSS declarations alphabetically](https://ericwbailey.design/writing/organize-your-css-declarations-alphabetically/):

> I recommend alphabetical order because it imposes a baseline sense of structure across a team…
> 
> Alphabetical is easy enough to pick up and have an organization repeat as a convention without having to invest too much time on upskilling an entire team on CSS theory.

What experience leads Eric to make this recommendation?

> The most common CSS declaration organization technique I come across is none whatsoever…
> 
> I’ve seen CSS ordered by adding to the bottom of the selector. I’ve seen CSS ordered by arbitrarily adding properties everywhere until it looks right in the browser. I’ve seen CSS ordered by a teetering pile of irrelevant and non-functioning copy/paste code from StackOverflow. I’ve seen CSS ordering by way of generations of vestigial framework overrides. I’ve even seen multiple approaches smashing into each other by way of generations of employee work, revealed only after spending time teasing the story out of commit messages.
>
> The problem is that CSS is still misunderstood, undervalued, and dismissed as a trivial concern.

Ok I’m sold.

In my personal projects, I’ve never imposed any order on my CSS declarations. Or rather: I’ve ordered my declarations, just not mindfully. To Eric’s point, it’s mostly been: “arbitrarily adding properties everywhere until it looks right in the browser.” That’s me.

After reading Eric’s article, I’m feeling convinced to go alphabetical.

My first thought was: “Won’t Prettier do this for me?” Turns out, [VSCode will](https://twitter.com/chriscoyier/status/1481286845820461056?s=20) but Prettier won’t.

Why?

## The Nuances of Ordering CSS Properties

In CSS, [the order of properties matters](https://stackoverflow.com/questions/13080220/how-important-is-css-property-order#13080221). Apparently, it’s why [they haven’t built alphabetical ordering into Prettier](https://github.com/prettier/prettier/issues/1963#issuecomment-306070896). At least not yet.

There are interesting and tricky edge cases to consider when having a computer automatically order CSS declarations for you. I think it’s worth being mindful of these nuances because it can help you, a human authoring CSS, better understand (or at least remember) the inner workings of the language. 

### Sass

Automatic ordering gets tricky when you [extend the idea to  Sass files](https://github.com/prettier/prettier/issues/1963#issuecomment-307147922).

```scss
@mixin fancy-text {
  color: red;
  font-weight: bold;
}

.foo {
  color: black;
  @include fancy-text;
  font-weight: normal;
}
```

If a computer is sorting these properties, how should it do it? Will the output result in what you, the author, expect to see on screen?

In this particular case, if you want a normal font weight without having to refactor the `fancy-text` mixin, a human’s deliberate, non-alphabetical ordering of properties is important. `font-weight: normal` will take prescedence over the `font-weight: bold` mixin.

Granted, this syntax is not native to CSS, but it’s illustrative of the nuances in this article.

### Vendor Prefixes

When ordering CSS properties that have vendor prefixes, [you want the “real” property to come last](https://css-tricks.com/ordering-css3-properties/). The hyphen prefix would accomplish that in a world of alphabetical ordering.

However, multiple vendor-prefixed properties on the same selector could lead to illogical groupings. 

```css
/* Purely alphabetical */
.sample {
  -moz-border-radius: 10px;
  -moz-transition: all 1s linear;
  -ms-transition: all 1s linear;
  -o-transition: all 1s linear;
  -webkit-border-radius: 10px;
  -webkit-transition: all 1s linear;
  border-radius: 10px;
  transition: all 1s linear;
}

/* Alphabetical, but vendor prefixes are grouped by property
   And add some chunking to aid legibility */
.sample {
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  
  -moz-transition: all 1s linear;
  -ms-transition: all 1s linear;
  -o-transition: all 1s linear;
  -webkit-transition: all 1s linear;
  transition: all 1s linear;
}
```

This isn’t a huge deal and won’t affect what renders in the browser. However, I could argue this kind of deviation from “pure alphabetical” ordering aids the legibility of the code. 

Granted, I would imagine a heuristic like this could be built into a tool trying to automatically order properties for you. But again, you can see where alphabetical can break down a little.

### Duplicate Declarations

If you declare multiple properties on the same selector, which one should be ordered first? (Granted, this is more of a code smell, but if you’re writing tooling for this, it’s definitely something you’ll encounter.)

```css
.selector {
  top: 12px;
  background-color: #000;
  position: absolute;
  left: 15px;
  top: 20px;
  border-radius: 12px;
}
```

In this example, `top` is declared twice. Under these circumstances, the second declaration of `top` is what the browser paints (`20px`).

Presumably, alphabetical sorting might actually help you catch these kinds of duplicate declarations since they’ll appear adjacent to each other after reordering.

```css
background-color: #000;
border-radius: 12px;
left: 15px;
position: absolute;
top: 12px;
top: 20px
```

Ultimately, any tool doing this order would have to make _some_ kind of decision on how to sort properties when keys match, i.e. “if keys match, sort by value alphabetically”.

### Shorthand Declarations

Similar to duplicate declarations, the use of shorthand declarations poses an interesting challenge. Suppose you write this:

```css
.selector {
  background: url(/path/to/image.jpg) no-repeat 0 50%;
  background-color: red;
}
```

The background color of this element will be red. However, if the selector’s properties are ordered alphabetically, `background-color` (any `background-x`) would come first.

```css
.selector {
  background-color: red;
  background: url(/path/to/image.jpg) no-repeat 0 50%;
}
```

Do you know the background color of this element in this context? It’s not red, it’s transparent! The `background` shorthand expects a color value and, if it doesn’t get one, the default will apply (transparent). So even though you are not explicitly overriding the `background-color` with the presence of a color value in the shorthand declaration, you’re still overriding the value of the preceding `background-color` declaration.

The difference between these sort orders matters, as they result it two different renderings of a UI.

## Remember: Property Order Matters

Granted, a lot of these examples aren’t particularly thorny problems to solve. Duplicate properties? That might result in misapplied styles, but alphabetical ordering could help surface the source of the problem. Vendor prefixes? Maybe you should use an automated tool for adding those (if even need them at all).

The point is: not ordering rules in CSS doesn’t mean they are “unordered” or that there is “no order”. **In CSS, property declarations are always ordered – however implicitly – and that ordering carries meaning**. It might be a mindless order that means nothing to you as the author, but it means something to the browser.

It’s kind of like the data structure of an array. An array, like `["A","B","C"]`, isn’t just a set of values. It’s a set of values _and_ an ordering, however implicit. So when you do something with that array, like render a list of things, you’re going to get a list in that order: A first, B second, C third.

Property declaration order in CSS is similar. You’re not exclusively dealing with a set of properties for drawing things on screen. You’re dealing with a set of properties _and an ordering_. That ordering, however implicit, is an input that informs precedence for how the browser will render elements on screen. Order has meaning.

All that said, I like the thrust of Eric’s argument: we too often think we can chuck whatever rules we want into a selector and get the outcome we want. That mindset reinforces Eric’s suggestion that CSS is “misunderstood, undervalued, and dismissed as a trivial concern”. I like the suggestion that CSS deserves care and thought, and coming to a consensus on how to order properties as a team helps reinforce that point: this is a language worth caring about when you write it. 

If you came into a codebase where all the declarations were sorted alphabetically, you’d assume meaning and intent in that choice. And if you then came across a set of declarations that weren’t ordered alphabetically, you’d likely assume one of two things about the code: 1) a careless mistake was made, or 2) there’s some good underlying reason for the pattern-breaking order.

When you find CSS written with care, it reinforces that CSS is worthy of writing with care. And care matters in CSS because, as we’ve seen, property delcaration order matters. 