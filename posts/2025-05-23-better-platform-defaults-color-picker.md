#uiPaceLayers

# Webkit’s New Color Picker as an Example of Good Platform Defaults

I’ve written about how [I don’t love the idea of overriding basic computing controls](https://blog.jim-nielsen.com/2025/overriding-basic-ui-controls/). Instead, I generally favor opting to respect user choice and provide the controls their platform does.

Of course, this means platforms need to [surface better primitives](https://blog.jim-nielsen.com/2025/thoughts-on-working-draft-to-override-form-controls/) rather than supplying basic ones with an ability to opt out.

What am I even talking about? Let me give an example.

The Webkit team just shipped a new API for `<input type=color>` which provides users the ability to pick colors with [wide gamut P3 and alpha transparency](https://webkit.org/blog/16900/p3-and-alpha-color-picker). The entire API is just [a little bit of declarative HTML](https://codepen.io/jimniels/pen/vEEPyaQ):

```html
<label>
  Select a color:
  <input type="color" colorspace="display-p3" alpha>
</label>
```

From that simple markup (on iOS) you get this beautiful, robust color picker.

<img src="https://cdn.jim-nielsen.com/blog/2025/color-picker.jpg" width="885" height="639" alt="Screenshot of the native color picker in Safari on iOS" />

That’s a _great_ color picker, and if you’re choosing colors a lot on iOS respectively and encountering this particular UI a lot, that’s even better — like, “Oh hey, I know how to use this thing!”

With a picker like that, how many folks really want additional APIs to override that interface and style it themselves?

This is the kind of _better platform defaults_ I’m talking about. A little bit of HTML markup, and boom, a great interface to a common computing task that’s tailored to my device and uniform in appearance and functionality across the websites and applications I use. What more could _I_ want? _You_ might want more, like shoving your brand down my throat, but I really don’t need to see BigFinanceCorp Green™️ as a themed element in my color or date picker.

If I could give HTML an aspirational slogan, it would be something along the lines of Mastercard’s old one: There are a few use cases platform defaults can’t solve, for everything else there’s HTML.