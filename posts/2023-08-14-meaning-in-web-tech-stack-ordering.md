# There’s Meaning in the Ordering of the Web’s Tech Stack 

I was watching Zach’s presentation at JSHeroes 2023, [“The Good, The Bad, and The Web Components”](https://www.youtube.com/watch?v=R4Ri4ft7bXY), and a subtle point stuck out to me at the ending of his talk.

<img src="https://cdn.jim-nielsen.com/blog/2023/zach-talk.png" width="1229" height="687" alt="Screenshot of the recording from Zach Leatherman’s talk at JSHeroes 2023 showing Zach pointing at his slides with the big words “1. HTML, 2. CSS, 3. JavaScript on it.”" />

> When you run into performance problems, it's [because you tried] to reorder these things or combine them in weird ways.

We often see the web’s stack of technologies written together: “HTML, CSS, and JS”. What was reinforced to me from Zach’s presentation is that the ordering of this list of technologies has meaning.

As I noodled with my words on this subject, trying to re-state what Zach had said so clearly, I ended up expressing his point anew in HTML (which was kind of fun).

This is the web’s tech stack, expressed as HTML:

```html
<ol>
  <li>HTML<li>
  <li>CSS</li>
  <li>JavaScript</li>
</ol>
```

While some might gloss over the semantics of that markup, there’s meaning in there. The ordering is important, that’s why it’s expressed as `<ol>`. From Zach:

> When you’re thinking about web performance, if you can do it in HTML you should do it in HTML. If you can do it in CSS, you should do it in CSS. As a last resort, if you can do it in JavaScript, do it in JavaScript.

As Zach goes on to point out, when you run into performance issues on the web it’s often because you’ve glossed over this idea that the ordering of web technologies is important because it’s the fundamental principle behind the design of the web and how browsers work.

One subtle change to that markup — an `<ol>` to a `<ul>` — would change our entire understanding of how to use these technologies:

```html
<ul>
  <li>HTML<li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
```

Now there’s no guidance as to how to use these technologies. There’s simply three, ordering isn’t important, so use them however you see fit.

Or, again to Zach’s point, what often happens is these elements get combined in ways that change the original idea behind their design:

```html
<ol>
  <li>HTML</li>
  <li>JavaScript, CSS</li>
</ol>
```

Or, to mark it up as is common practice today:

```html
<ol>
  <li>
    JavaScript
    <ul>
      <li>CSS</li>
      <li>HTML</li>
    </ul>
  </li>
</ol>
```

My point being, there’s value, performance, and accessibility to be gained from following the subtle meaning conveyed in the _ordered_ list of the web’s technologies: 1) HTML, 2) CSS, 3) JavaScript.