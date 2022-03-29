#readingNotes

# Reading Notes, October 2016

## Article: “[Typography Is Impossible](https://medium.engineering/typography-is-impossible-5872b0c7f891)” by Marcin Wichary via Medium

This was an interesting post on digital typography and, although a lot of it presented quirks and peculiarities I am already familiar with, I wanted to document a few notes I found novel.

### Type and Boxes

Digital type lives in boxes. That’s how the software works. But the box is really just a suggestion. Not everything will fit all the time. On the web you don’t have to worry about this unless you start using `overflow: hidden`:

> by default, browsers allow stuff to stick out, unless the container or one of its parents use `overflow: hidden` instead of `overflow: visible`. If for whatever reason it’s necessary to apply that restriction, it is important to add horizontal and vertical padding so that text is not clipped.

So how much space do you need to allot a box of type being cut off by `overflow: hidden`?

> A rough suggestion would be to add horizontal padding that’s ⅓ of the font size.

### Type and Sizing

Type sizing is different. Sure, you say `font-size: 50px`, but you’ve probably noticed that a defined font size in one typefaces can take up a significantly different amount of space than the same size font of another typeface.

I’ve seen the results of this problem many times on the web. For example, you’ve got a big `H1` on your website where you use a third-party web font service to display that big headline in a traditionally unavailable system font. When it loads, it looks like this:

```
Innovation Is Our
Middle Name
```

But if that particular font doesn’t load correctly (or perhaps for a split second while the font is actually downloading to the client) you see it displayed in a fallback system font. It’s quiet possible it now takes up a different amount of space and the word wrapping is different:

```
Innovation Is Our Middle
Name
```

This could end up being a problem because often you intentionally design your type to fit a certain way, like when wrapping words around a certain part of an image or deliberately putting words on separate lines to add a punch. Differences in type sizing between font families can so easily break your design.

Font sizes are different. Some quite drastically from one another. That’s because font size is a measure of the type’s containing box, not the type itself:

> It turns out that when you choose font size, you actually only choose the size of the box the font lives within. What happens within that box is up to the type designer

This can result in even more problems than the ones just outlined above. For example, not all fonts sit on the same baseline, which can cause alignment issues if you use a fallback. It’s definitely something to be cognizant of when designing for the web where your font choices, though we would like to believe otherwise, are never truly bulletproof.

Type simply doesn’t abide by the rules of static, pixel images:

> When you spread two images apart, you can rest assured 20 pixels will mean exactly 20 pixels. When it comes to text, those 20 pixels will be accompanied by extra vertical padding at the bottom and top of each text box — and the text will feel like it’s further apart.

This means that often you have to **feel** your way through type layout and spacing (while being aware of possible font fallbacks). You won’t find a purely mathematical, bullet-proof approach to beautiful typography. As the author goes on to state:

> Type is aligned when it feels aligned, not when it actually is aligned.

And this goes deeper in typography. Superscripts aren’t just the same glyphs shrunk down. Bold characters aren’t just the same letters with a stroke or two on them. Italic words aren’t just the normal versions slanted ten degrees. Type designers optimize these variations with subtle differences. They are all new shapes, redrawn from the “regular” ones so that they feel and appear optically correct.

At the end of the day, lots of these typographic guidelines are here because that’s what we’ve grown used to. And because we’ve grown used to it, it’s best to follow those norms because it sets up expectations between you and the reader.

>  A lot of [this] might seem arbitrary, but that’s typography for you, too: some of it is not things that are objectively better, just things we’re gotten used to over the last few centuries.

If you’re going to break those norms, do it for a reason. Design intentionally.

## Article: “[Extensible Web Components](https://adactio.com/journal/11052)” by Jeremy Keith via Adactio

As always, insightful progressive enhancement thoughts around service workers vs. web components:

> The next question we usually ask when we’re evaluating a technology is “how well does it work?” Personally, I think it’s just as important to ask “how well does it fail?”

> Service workers work well and fail well. If a browser supports service workers, the user gets all the benefits. If a browser doesn’t support service workers, the user get the same experience they would have always had. Web components (will) work well, but fail badly. If a browser supports web components, the user gets the experience that the developer has crafted using these new technologies. If a browser doesn’t support web components, the user gets…probably nothing. It depends on how the web components have been designed.

> It’s so much easier to get excited about implementing service workers. You’ve literally got nothing to lose and everything to gain.

## Article: “[The Future of the Web](http://alistapart.com/article/the-future-of-the-web)” by Matt Griffin via A List Apart

Why it’s ok to be failing while trying to find your way:

> To get where we need to go, we have to do it wrong first...If we can continue to work together and consciously balance these dual impulses—pushing the boundaries of the web while keeping it open and accessible to everyone—we’ll know we’re on the right track, even if it’s sometimes a circuitous or befuddling one. Even if sometimes it’s kind of bad. Because that’s the only way I know to get to good.

Love that last bit: the only way to get good is to be bad.

## Article: [Why we use progressive enhancement to build GOV.UK](https://gdstechnology.blog.gov.uk/2016/09/19/why-we-use-progressive-enhancement-to-build-gov-uk/) by Robin Whittleton via GOV.UK

This article is more interesting views on progressive enhancement, though there’s not a lot of novelty here. Progressive enhancement, though arguably not for everyone, seems ideal for a government website.

The more time I spend developing for the web the more I like the concept of progressive enhancement, if nothing else than for its 1) reach and 2) longevity. Pure javascript single-page-apps these days can be so brittle and tenuous in terms of longevity.

> “progressive enhancement is about resilience as much as it is about inclusiveness.” ... Building in resilience is also known as defensive design: a system shouldn’t break wholly if a single part of it fails or isn’t supported.

> We have a mandate to provide digital services to everyone in the UK and many beyond. Many users access services in different ways to the configuration tested by developers. If a person visits GOV.UK we want them to be able to complete their service or access the information they need, regardless of whether we’ve tested their configuration or not.  
