# Doing Well

Steven King in his book _On Writing_. 

> [William Stunk said] “It is an old observation that the best writers sometimes disregard the rule of rhetoric.” Yet he goes on to add this thought, which I urge you to consider: “Unless he is certain of doing well, [the writer] will probably do best to follow the rules.”
> 
> The telling clause here is _Unless he is certain of doing well_. If you don’t have a rudimentary grasp of how the parts of speech translate into coherent sentences, how can you be certain that you _are_ doing well? How will you know if you’re doing ill, for that matter? The answer, of course, is that you can’t, you won’t.

As with so many pieces I read, I can’t help but think of the web. But rather than “the rules of rhetoric” for writing, I’m thinking about the rules of composition for websites. 

It’s one thing to write. It’s another to write _well_. There’s an art and a science to writing effectively and for that you have to understand a myriad of concepts, such as human cognition. Based on those concepts (and constraints), you codify a set of rules which, if followed, will help your write _well_. 

Writing code for the web, i.e. making websites, is similar. There are rules based on how the web works in layers. (Image courtesy of [Jeremy’s talk: “The Layers of the Web”](https://speaking.adactio.com/ZCJ61M#stjS2Wh).)

<img src="https://cdn.jim-nielsen.com/blog/2022/web-basics.png" width="844" height="546" alt="Illustration of the layers that make up the web, with TCIP/IP on the bottom, then HTTP, then URLs, then HTML, then CSS, with JS on top." />

Unless you are certain you are doing well, it is likely best to stick to the rules of writing atop these layers. 

But how can you be certain you’re “doing well” if you don’t have a rudimentary understanding of these base layers of the web and how they translate to usable experiences? Or, for that matter, how can you know if you’re doing poorly? If you don’t understand how the underlying technologies of the web function you can’t anticipate how website experiences will degrade or fail and you therefore cannot build experiences that are resilient to those underlying layers.

The good news is there's a beautiful, almost comforting, simplicity to making a website using the base layers of the web. All you _need_ to start is HTTP, URLs, and HTML.

This is a website.

```html
<!doctype html>
	<h1>My Website</h1>
</html>
```

And this is a website that navigates to another website (HTML + URL).

```html
<!doctype html>
	<a href="https://example.com">Your Website</a>
<html>
```

And this is a website that navigates to another website _while sending data_ (HTML + URL + HTTP).

```
<!doctype html>
  <form action="https://example.com" method="post">
    <label>Search</label>
    <input type="text" name="q">
    <input type="submit">
  </form>
</html>
```

There you go, the core constructs of how you get a website up and walking. Once walking, you can begin to think about running with CSS and JS. Everything can be enhanced.

Unless you are certain you are doing well, start with these basic rules of building for the web. If you turn away from the basics without knowing you’re doing well, how will you know whether you _are_ doing well? Or ill, for that matter?