# Be Mindful of What You Make Easy

Carson Gross has [a post about vendoring](https://htmx.org/essays/vendoring/) which brought back memories of how I used to build websites in ye olden days, back in the dark times before npm.

“Vendoring” is where you copy dependency source files directly into your project (usually in a folder called `/vendor`) and then link to them — all of this being a _manual_ process. For example:

- Find `jquery.js` or `reset.css` _somewhere_ on the web (usually from the project’s respective website, in my case I always pulled jQuery from the big download button on [jQuery.com](https://jquery.com) and my CSS reset from [Eric Meyer’s website](http://meyerweb.com/eric/tools/css/reset/ )).
- Copy that file into `/vendor`, e.g. `/vendor/jquery@1.2.3.js`
- Pull it in where you need it, e.g. `<script src="/vendor/jquery@1.2.3.js">`

And don’t get me started on copying your _transitive dependencies_ (the dependencies of your dependencies). That gets complicated when you’re vendoring by hand!

Now-a-days package managers and bundlers automate all of this away: `npm i` what you want, `import x from 'pkg'`, and you’re on your way! It’s so easy ([easy to get all that complexity](https://notes.jim-nielsen.com/#2016-11-18T1230)).

But, as the HTMX article points out, a strength can also be a weakness. It’s not all net gain (emphasis mine):

> Because dealing with large numbers of dependencies is difficult, vendoring encourages a culture of independence.
> 
> **You get more of what you make easy, and if you make dependencies easy, you get more of them.**

I like that — you get more of what you make easy. Therefore: **be mindful of what you make easy!**

As Carson points out, dependency management tools foster a culture of dependence — imagine that!

I know I keep lamenting [Deno’s move away from HTTP imports by default](https://blog.jim-nielsen.com/2024/deno-de-emphasizes-http-imports/), but I think this puts a finger on _why_ I’m sad: it perpetuates the status quo, whereas a stance on aligning imports with how the browser works would not perpetuate this dependence on dependency resolution tooling. There’s no package manager or dependency resolution algorithm for the browser.

I was thinking about all of this the other day when I then came across this [thread of thoughts from Dave Rupert on Mastodon](https://mastodon.social/@davatron5000/114178512245323292). Dave says:
 
 > I prefer to use and make simpler, less complex solutions that intentionally do less. But everyone just wants the thing they have now but faster and crammed with more features (which are juxtaposed)

He continues with this lesson from his startup [Luro](https://luroapp.com):

> One of my biggest takeaways from Luro is that it’s hard-to-impossible to sell a process change. People will bolt stuff onto their existing workflow (ecosystem) all day long, but it takes a religious conversion to change process.

Which really helped me [put words to my feelings regarding HTTP imports in Deno](https://mastodon.social/@jimniels/114178827913627054):

> i'm less sad about the technical nature of the feature, and more about what it represented as a potential “religious revival” in the area of dependency management in JS. package.json & dep management has become such an ecosystem unto itself that it seems only a Great Reawakening™️ will change it.

I don’t have a punchy point to end this article. It’s just me working through my feelings.