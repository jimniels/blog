# Gratitude For a Web That Tries Not to  Break

[Chris wrote a response](https://chriscoyier.net/2023/05/02/do-logical-properties-make-css-easier-to-learn/) to my wondering-out-loud [remarks](https://blog.jim-nielsen.com/2023/logical-properties-and-ease/) about whether logical properties make CSS easier to learn.

His response is great. And his tabular comparison of properties is short and concise and punchy in the way only Chris Coyier can reason about CSS.

His post actually got me thinking about something different than logical properties, so now I’m gonna do some more thinking-as-I-type. From his post:

> because the logical properties don’t replace the non-logical versions and that there are still reasons to use the non-logical versions, thus only expanding the language…well, I can cede that makes CSS as a whole perhaps a smidge harder to learn. 😬

This made me wonder: how long will we really keep ever feature of CSS?

I love the web’s guiding principle around compatibility: [“don’t break the web”](https://github.com/tc39/how-we-work/blob/main/terminology.md#web-compatibilitydont-break-the-web).

> Even if a change would be convenient for developers, it's not worth it if we hurt lots of users in the process!

In a world awash with software whose shelf life approximates that of my grocery store milk, I love that [there is no semver to worry about on the web](https://blog.jim-nielsen.com/2021/canistilluse.com/) — HTML5, CSS3, ES6, these are not major breaking changes.

For CSS in particular, I’ve seen many _welcome_ new features that supersede their predecessors: float-based layouts over table layouts, then flex over floats, then the introduction of grid. So many great ways to layout a website!

However, as Chris points out, all of those features are a accretion to the language. “Don’t break the web” means we don’t have to worry about reading CSS release notes like, “🚨 Breaking changes: `float` has been replaced by `flex`. You must upgrade to newest version.”

But how long can we reasonably go without _removing_ the old? How viable is this approach over time? 100 years from now, will people still be able to write `float` in their CSS?

I don’t know how the web will evolve over time to deal with what — I assume? — will inevitably become a problem of incomprehensible complexity resulting from decades of language accretion (like [stalagmites](https://en.wikipedia.org/wiki/Stalagmite) in a cave).

What this makes me realize is: I’m lucky. I don’t know what things will look like 100 years from now — I’m sure we’ll adapt — but I am grateful to have lived my entire life in an era where people strive to (and make it feasible to) not break the web.

