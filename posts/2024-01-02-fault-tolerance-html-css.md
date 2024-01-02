# A Subtle Nicety of Fault Tolerance in HTML & CSS

HTML and CSS are designed to be [fault tolerant](https://en.wikipedia.org/wiki/Fault_tolerance).

Rather than failing completely when encountering syntax they don’t understand — looking at you JS/`SyntaxError` — browsers will continue parsing HTML and CSS as best they can when you introduce incorrect syntax.

For someone who is full of faults, like myself, I appreciate this design feature. (I mean, who doesn’t need a little extra leniency and forgiveness in their life? But that’s another blog post.)

When it comes to CSS, browsers will [ignore syntax they don’t understand](https://www.w3.org/TR/2009/CR-CSS2-20090908/syndata.html#parsing-errors).

This is a _feature_ of the language I use quite often when prototyping.

For example, let’s say I’m writing some CSS. Or event better, some CSS in HTML (since they’re both forgiving). It looks like this:

```html
<li style="
  color: red;
  font-weight: bold;
  display: inline;
">
	My content here
</li>
```

And as I’m toggling back and forth between my editor and the browser applying styles — e.g. designing in the browser — I think, “Hmm, maybe I don’t want that thing to be inline…maybe I want a different layout…I’m not sure.”

I can delete the `display: inline` line, save, refresh, and then better decide.

But often I’m still not sure. It’s a decision I may want to revisit. Or I may want to stay undecided. I’m prototyping quickly here. There are a million reasons I’m juggling in my head when I think, “I’m not sure yet if I want this as the default `block` or `inline`…” And I want to leave open the possibility to quickly toggle between these options with a low cost.

After all, that’s what prototyping and designing is all about: being able to quickly and easily try and contrast different things until you find what’s juuuuuust riiiiiight.

Anyhow, because of the way CSS works — ignoring rules it doesn’t understand then continuing — I don’t have to remove the whole line, save, and refresh.

```html
<li style="
  color: red;
  font-weight: bold;
">
	My content here
</li>
```

Instead, I can do something silly but quick, like adding a `z` in front of the rule.

```html
<li style="
  color: red;
  font-weight: bold;
  
  zdisplay: inline;
">
	My content here
</li>
```

That will “remove” the application of that style without me having to completely remove the rule itself. It’s a single keystroke change that keeps the rule around as a reminder that I’m not yet done with this part and I can easily delete that single character to go back and toggle.

It’s a little thing. A very little thing.

But I like it and I use it a lot. And it’s the little things, ya know?

Sometimes you just have to notice and celebrate the little things.

Hence this blog post.

The end.