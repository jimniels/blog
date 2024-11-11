#webPlatform

# Navigations on the Web

When trying to define the difference between a link (`<a>`) and a button (`<button>`), a general rule of thumb is: links are for navigation, buttons are not.

That can take you pretty far. However, like most things, there’s nuance and that mental model can fall apart under certain scenarios.

Why? Because buttons _can be_ for navigation too.

Where? Buttons in forms trigger navigations by default (without JS).

Maybe I’m showing my naivety when I say this, but it took me a while to fully grok this idea. But doing so helped me change how I think about the basic grain of building for the web.

When it comes to browser APIs, I love to ask myself: How does this thing work, at its most basic level, without JavaScript?

And a `<button type=submit>` inside a `<form>` is, by default, a navigation.

For example, if you click “GO” here:

```html
<form action="https://google.com">
  <button type="submit">GO</button>
</form>
```

The browser will _navigate_ you to the same page as if you click “GO” here:

```html
<a href="https://google.com">GO</a>
```

Both of those are what I would call “navigations”. Without JS, they trigger a round-trip request to the server for a new document and navigate the user to this new location.

To reiterate: a button inside a form, like a link, triggers a round-trip request to the server for a new document — a navigation.

So links aren’t the only mechanism for navigations, buttons are too! Or, perhaps more accurately, forms are a mechanism for navigations and buttons inside of them are navigation triggers.

As another illustration, imaging making a multiple-choice quiz. Each question is its own HTML page. You can mark that up in two different ways.

Option 1: a form + a button.

```html
<form action='/questions/1/'>
  <label><input type=radio name=answer value=a /> A</label>
  <label><input type=radio name=answer value=b /> B</label>
  <label><input type=radio name=answer value=c /> C</label>
  <label><input type=radio name=answer value=d /> D</label>
  <button type=submit>Submit</button>
</form>
```

Given the attributes of this form, when the user clicks the “Submit” button, the browser will _navigate_ them to a new page such as:

`/questions/1/?answer=a`

You can achieve this exact same functionality with links:

```html
<ul>
  <li><a href="/questions/1?answer=a">A</a></li>
  <li><a href="/questions/1?answer=b">B</a></li>
  <li><a href="/questions/1?answer=c">C</a></li>
  <li><a href="/questions/1?answer=d">D</a></li>
</ul>
```

In both cases, a “navigation” happens by default.

I write this because understanding form submissions (triggered by buttons) as _navigations_ became an empowering idea for me in building for the web.

Maybe it will for you too.