#css

# Gotchas in Naming CSS View Transitions

I’m playing with making [cross-document view transitions](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document) work on this blog. 

Nothing fancy. Mostly copying how [Dave Rupert does it on his site](https://daverupert.com/2023/05/getting-started-view-transitions/) where you get a cross-fade animation on the whole page generally, and a little position animation on the page title specifically.

<img src="https://cdn.jim-nielsen.com/blog/2025/view-transitions-blog.gif" width="480" height="291" alt="Animated gif of a mouse clicking on a blog post title and it animating to the top on the next HTML page." />

To animate the page title, I need a unique ID to target the element I want to transition between pages, e.g.

```html
<!-- 1st page HTML -->
<a
  href="/2024/i-love-kitkats"
  style="view-transition-name: kitkats">
  I Love KitKats
</a>

<!-- 2nd page HTML -->
<h1 style="view-transition-name: kitkats">
  I Love KitKats
</h1>
```

The problem with the above is that, if I have page that lists all my blog posts and I have another one about KitKats, what will the ID be?

Well I already have a globally-unique ID for each post: the post’s URL path!

So, in my static site generator, I think “I’ll just use my post’s path as the transition name!” 

```html
<a
  href="/2024/i-love-kitkats"
  style="view-transition-name: /2024/i-love-kitkats">
  I Love KitKats
</a>  
```

I’m not actually sure if this will work because of the forward slashes, but I try it.

No dice.

“Maybe I need to wrap it in quotes, like a the name of a value in `font-family`?” 

So I try that:

```html
<a
  href="/2024/i-love-kitkats"
  style="view-transition-name: '/2024/i-love-kitkats'">
  I Love KitKats
</a>  
```

Nope, that doesn't work either.

Ok, fine. I’ll just strip out the slashes in the path. I don’t need the slashes for it to be a unique identifier, e.g.

```js
postPath.replace(/\//g, '')
```

Which gives me HTML like this:

```html
<a
  href="/2024/i-love-kitkats"
  style="view-transition-name: 2024i-love-kitkats">
  I Love KitKats
</a> 
```

Still no dice.

After trying to get it working without looking at the manual, I concede to looking up [view-transition-name on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/view-transition-name). The docs say I have to use “a distinct identifying name (a `<custom-ident>`)”. 

“What is a `<custom-ident>`?” I follow [that link](https://developer.mozilla.org/en-US/docs/Web/CSS/custom-ident) and read about it.

The docs throw some shade at me:

> A `<custom-ident>` must not be placed between single or double quotes as this would be identical to a `<string>`.

Whoops.

Ok, so it’s an identifier that has some special rules, like that you can’t use an already-reserved global CSS name like “inherit”, “unset”, or even list style names like “disc” or “square”.

Also you can’t use a forward slash (my bad).

And you can’t start the string with a number (my bad).

So I stick a prefix on each, e.g.

```js
'title-${postPath}'.replace(/\//g, '')
```

Giving me:

```html
<a
  href="/2024/i-love-kitkats"
  style="view-transition-name: title-2024i-love-kitkats">
  I Love KitKats
</a> 
```

Boom! It works!

So there you go. Way more than you ever wanted to know about the gotchas of a creating a unique `view-transition-name`.

And if you didn’t know about `<custom-ident>` in CSS, now you do!