#remix

# Joining Remix

If you follow my blog, it’s probably no secret I’m a fan of emerging technologies like Deno and Remix that align themselves with the standards and [principles of the web](https://blog.jim-nielsen.com/2022/permeating-principles-of-the-web/) (e.g. [here](/2022/notes-from-fred-schott-on-shop-talk-show/), [here](/2022/deno-is-webby-pt-2/), [here](/2022/web-predictions-on-a-whim/), and [here](/2021/deno-is-webby/)).

So it might not come as a surprise for me to say: today is my first day as an employee at [Remix](https://remix.run). I’m excited. I’ll try to keep the Remix Sponsored Content™ over on [their blog](https://remix.run/blog) but I can’t promise I won’t be peddling some kind of Remix-themed content over here in my spare time.

I could write an exhaustive post about why I think Remix is interesting but instead allow me casually do it in a form fitting so many other posts on my blog: by citing another article on the web.

Over the weekend, I read Chris Garrett’s [“Four Eras of JavaScript Frameworks”](https://www.pzuraq.com/blog/four-eras-of-javascript-frameworks). He starts by describing the early web:

> The majority of application business logic…took place via forms and standard HTTP requests - rendering HTML on the server and serving it up to the client.

And from there he traces the nature of building for the web to our modern era, including what lessons we learned along the way:

> We noticed that it was actually really useful to have a backend and frontend paired together, so that you could do things like hide API secrets for certain requests, modify headers when a page was returned, proxy API requests. And with Node and Deno implementing more and more web standards, with the gap between server-side JS and client-side JS shrinking every year, it started to seem like it wasn’t such a crazy idea after all. Combine this with edge-computing and amazing tooling to go with it, and you have some incredible potential.
> 
> This latest generation of frameworks makes full use of that potential, melding the client and the server together seamlessly.

In some ways, it seems like we’re coming full circle. There’s a rediscovered emphasis for standards, especially in JavaScript land where Node and Deno and edge computing platforms are all standardizing towards web platform APIs making it, as [Eduardo Bouças says](https://www.netlify.com/blog/deep-dive-into-netlify-edge-functions/), so “everyone in the community — developers, web frameworks, deployment platforms — can work together on common solutions.”

But also the importance of the server/client relationship is being reborn, as it proves to be the foundational yin and yang of delivering great user experiences on the web. 

To top it all off, progressive enhancement might just be making a resurgence:

> There are really so many cool things about this model [of full-stack frameworks], one of the biggest ones being how it is revitalizing the idea of progressive enhancement, using the combined nature of the server and client to allow the client to fallback to basic HTML + HTTP in cases where the user has disable JavaScript. I had fully given up on this practice myself when I began working on SPAs, assuming that they were the future, but it is really cool that we could possibly see a world where it makes a comeback.

What sold me on Remix is [when I saw](https://twitter.com/jimniels/status/1484316461652856832?s=20&t=RpI8RK0cRpueWGHQHr_7Bg) [Ryan’s example](https://youtu.be/jd_bin5HPrw?list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6&t=1012) showing progressive enhancement baked in to how you build with Remix: start with a declarative API describing a mutation in working HTML, then layer in JavaScript _as an enhancement_. 

> [this] blew my mind. The power of being able to declaratively 1) use JS to get back JSON which transitions states in your UI while simultaneously 2) supporting use of native browser functionality to get back HTML on the same route is 🤯

(If you want to know more, Remix has a section titled [“Progressive Enhancement”](https://remix.run/docs/en/v1/pages/philosophy#progressive-enhancement) in their docs.)

Remix is what its name implies: the best of the old mixed with the lessons learned along the way to the present (and future). To paraphrase T.S. Elliot: to truly know a place is to return to it again but with a fresh perspective.

> We shall not cease from exploration  
> And the end of all our exploring  
> Will be to arrive where we started  
> And know the place for the first time.  

Here’s to knowing the web again for the first time 🥂