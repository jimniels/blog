# Language-Level Toll Roads

I’m trying to put my finger on something, but I can’t quite figure out what it is — hence this post. Maybe by the end of writing, I’ll have figured it out.

Deno recently launched their KV storage. Being [a fan of deno](https://blog.jim-nielsen.com/tags#deno), I looked at it with interest. Here’s a sample:

```js
const kv = await Deno.openKv();
const res = await kv.get(["users", "alice"]);
```

My initial impression was a bit of confusion. What I thought would be an “add-on” feature looked an awful lot like a core feature baked right into the language.

I spent time trying to figure out how it worked under the hood. [Simon’s notes](https://til.simonwillison.net/deno/deno-kv) were super helpful:

> [Deno KV is] an interesting variant on a key/value store that's backed by SQLite locally, and will run against a neat FoundationDB global distributed database when you deploy scripts to the Deno Deploy cloud

Simon summarizes:

> they're baking a core feature into their framework which their SaaS platform is uniquely positioned to offer as a global-scale upgrade.

That makes sense — but it still _feels_ a bit strange. I’m trying to put my finger on why. I think it’s because of how integrated this _proprietary_ feature is at the language level of an _open_ source project. It’s like a language-level toll road.

I was trying to think of corollaries to this. For example, imagine Node building a cloud offering that runs instances of Node and promising that `fs` on their servers adds some kind of proprietary performance benefit you only get through them.

```js
import fs from "node:fs";

// If you’re using Node's hosting platform, this `fs` promises 
// faster, better performance in prod with a simple fallback
// in development.
const file = fs.readFileSync("./thing");
```

Node could control this because they control the language. Contrast that with, say, a Vercel implementation of the same thing in Node:

```js
// A theoretical drop in replacement for "node:fs"
// that promises better _something_ in production usage
// with a simple fallback in development
import fs from "@vercel/fs";

const file = fs.readFileSync("./thing");
```

If those two had to compete, I imagine Vercel being at a disadvantage because they don’t control the language they’re building on top of.

Speaking of Vercel, it also makes me think of their [`next/image` component](https://nextjs.org/docs/pages/api-reference/components/image). It’s kind of similar, in that it encourages you to eschew writing the regular ole’ `<img>` tag and instead use their proprietary solution for images (which eventually compiles down to HTML’s `<img>` tag).

I think maybe what I’m trying to put my finger on is this contrast between open source foundations with proprietary features _on top_, vs. open source foundations with proprietary features _built-in_ — and the tension and competition that will take place between the two.

Is this a future for open projects, frameworks, and libraries?

It’s a tricky game to play. In order to receive the financial backing necessary to continue building and improving complex and sophisticated open source projects, authors will be required to figure out paths to monetization. 

Often, the whole reason a framework exists is to smooth over the complicated, complex ways of doing things “natively” in the present. Abstractions on top of current realities.

One approach to building abstractions is with the aim to make yourself obsolete: have an opinion, say “this is the way we should do it”, and prove out the feasibility in your framework with the hope that, one day, your opinion will become “part of the platform” — the “native” way to do things (think jQuery or Sass). This approach makes your framework obsolete over time which is not good for business.

You know what is good for business? Making yourself a proprietary, critical dependency. It’s a shift from “build on top of our foundation with _solutions by others_” to “build on top of our foundation with more _solutions by us_”.

Lock-in is a powerful source of friction to moving between competing solutions. But so too is an integrated “DX” — you see this more and more with cloud hosting providers like Vercel: 

- Don’t write `<img>` in your JSX or integrate another image service, just use ours.
- Don’t waste time integrating an off-the-shelf analytics solution, just use ours.
- Don’t bother setting up your own server and DB solutions, just use ours.

Is this the future? I guess we’ll see. I’m still not even sure what I’m trying to say. Deno’s KV implementation was a bit of a surprise and I’m trying to articulate why (it does look intriguing though).