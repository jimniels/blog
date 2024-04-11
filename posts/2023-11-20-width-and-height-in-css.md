#css

# Width and Height in CSS

In his video [“Secret Mechanisms of CSS”](https://www.youtube.com/watch?v=Xt1Cw4qM3Ec), Josh explains (among other things) how `width` and `height` work in CSS. I loved his explanation so much, I am going to re-write it here for my own benefit. Hopefully the next time I have to explain it — to someone else, or to myself in my head — I’ll be able to do it as clearly as Josh.

The secret is in this summation: to determine `width` you look up the tree, to determine `height` you look down the tree.

For example, take this code:

```
<html>
  <body>
    <div>My content</div>
    <style>
      div {
        width: 100%;
        height: 100%;
      }
    </style>
  </body>
</html>

```

`width` looks up the tree and fills the space made available by its parent. In this case it will look all the way up to the `<body>` tag which looks to the `<html>` tag which, by default, has the width of the document. So the `<div>` does too.

Conversely, `height` looks at its children. It asks, “How big are all the elements inside of me?” and then automatically fills that height.

- `width`: how wide are the things I am inside of?
- `height`: how tall are the things inside of me?

The key insight here is: `height: 100%` means “as tall as all the things inside of me”, not “as tall as all the things I am inside of”.

That is why `width: 100%` does what a lot of people naturally expect: it goes the full width of the screen. Whereas `height: 100%` doesn’t do what people often expect and go the full height of the screen.

Again, `width` looks outward while `height` looks inward.

To be honest, I struggled with this idea for many years. Even when I knew `width: 100%` would give me what I wanted and `height: 100%` wouldn’t, I never _fully_ understood why. Josh’s explanation is a great way to think about it. As he notes in his talk:

> That's the funny thing about CSS. You can have a mental model that is 95% correct and go through your career with this slight gap [in understanding] that you never notice until one day it doesn’t line up and then there goes your afternoon.

So true.
