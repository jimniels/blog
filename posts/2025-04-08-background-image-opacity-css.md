#css

# Background Image Opacity in CSS

The other day I was working on something where I needed to use CSS to apply [multiple background images](https://css-tricks.com/css-basics-using-multiple-backgrounds/) to an element, e.g.

```html
<div>
  My content with background images.
</div>
<style>
  div {
    background-image: 
      url(image-one.jpg),
      url(image-two.jpg);
    background-position:
      top right,
      bottom left;
      /* etc. */
  }
</style>
```

As I was tweaking the appearance of these images, I found myself wanting to control the opacity of each one. 

A voice in my head from circa 2012 chimed in, “Um, remember Jim, there is no `background-opacity` rule. Can’t be done.” Then that  voice started rattling off the alternatives:

- You’ll have to use `opacity` but that will apply to the _entire_ element, which you have text in, so that won’t work.
- You’ll have to create a new empty element, apply the background images there, then use `opacity`. Or:
- You can use pseudo elements (`:before` & `:after`), apply the background images to those, then use `opacity`.

Then modern me interrupted this old guy. “I haven’t reached for `background-opacity` in a long time. Surely there’s a way to do this with more modern CSS?”

So I started searching and found [this StackOverflow answer](https://stackoverflow.com/a/40366996/1339693) which says you can use `background-color` in combination with [`background-blend-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode) to achieve a similar effect, e.g.

```
div {
  /* Use some images */
  background-image: 
      url(image-one.jpg),
      url(image-two.jpg);

  /* Turn down their 'opacity' by blending them into
     the background color */
  background-color: rgba(255,255,255,0.6);
  background-blend-mode: lighten;
}
```

Worked like a charm! It probably won’t work in every scenario like a dedicated `background-image-opacity` might, but for my particular use case at that moment in time it was perfect!

I love little moments like this where I reach to do something in CSS that was impossible back when I really cut my teeth on the language, and now there’s a one- or two-line modern solution!

[Sits back and gets existential for a moment.]

We all face moments like this where we have to balance leveraging hard-won expertise with seeking new knowledge and greater understanding, which requires giving up the lessons of previous experience in order to make room for incorporating new lessons of experiences.

It’s hard to give up the old, but it’s the only way to make room for the new — death of the old is birth of the new.