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

## Update: 2024-01-02

[Thomas noted](https://fosstodon.org/@thomasapowell/111688980900687155) that he does something very similar, but prefixes rules with a hyphen for legibility. I kind of like that idea:

```html
<li style="
  color: red;
  font-weight: bold;
  -display: inline;
">
	My content here
</li>
```

But [CM Harrigton](https://mastodon.online/@octothorpe/111688938713175704) asks why I don’t just comment out the line?

Short answer: laziness. But typing any character anywhere has its downsides. 

Commenting isn’t that hard. `CMD` + `/` in VSCode will comment out a line — or if you have a multi-line selection, it will comment out the selection. I use this technique when I’m trying different stylistic approaches and want to be able to easily toggle between two different design choices and weigh their merits in the context of their environment. 

For example, here’s where I might be trying out different stylistic treatments for an “eyebrow” element. Maybe I want it to be colored and in all caps — or maybe I want it to be more like a “badge” with inverted text color on a solid background.

```html
<p style="
  color: red;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  /* display: inline;
  background: red;
  color: white;
  text-transform: none;
  letter-spacing: 0px; */
">
	Technology
</p>
```

In this way, I can select multiple lines and `CMD` + `Z` to quickly toggle between two stylistic approaches.

I should probably just stick to commenting for consistency’s sake, even if it’s a single line. It’s not that hard to be more disciplined about it. 

Actually “being more disciplined” always takes more effort. We’ll see…