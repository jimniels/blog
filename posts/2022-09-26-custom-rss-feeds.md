#rss #iconGalleries

# Creating Custom RSS Feeds For Following Others

Part of the work curating my icon gallery sites is staying abreast of new icon designs. This means following individual icon designers in order to keep tabs on when they post new work, people like [Michael Flarup](https://flarup.co/), [Gavin Nelson](https://nelson.co/), [Matthew Skiles](https://www.matthewskiles.com/), and [Yannick Lung](https://yannicklung.com/).

But how do you keep up with the creative work of individuals without missing something?

I follow these designers on Twitter, but it’s too easy to miss any self-promotional tweets amongst all the noise in my timelines.

I also follow them on Dribble, but like Twitter it’s too easy to miss their new shots amongst all the other people I follow.

Plus, I honestly don’t browse Dribbble. I only go there when I need to, and I don’t want to visit Dribble every single day to check for new work. However, _I do_ want to stay abreast when certain people post new work.

What’s one to do?

My first thought was: “It’s too bad these people don’t have personal websites where they post new work. Then I could just subscribe to their RSS feed.”

And I get it. Not everyone can do that.

“Maybe Dribbble provides RSS feeds for individual users?” I thought. Kind of [like YouTube or GitHub does](https://gist.github.com/thefranke/63853a6f8c499dc97bc17838f6cedcc2). Unfortunately, they do not.

“Dribbble does have an API,” I thought. “Maybe I can hook into that?” Unfortunately, [the API](https://developer.dribbble.com/v2/) is for getting shots from your own account, not the account of others.

“Well, each user does have their own profile which returns HTML, maybe I can use that…”

If you visit a user’s page on Dribbble — e.g. `dribbble.com/USER`, like [dribbble.com/jimniels](https://dribbble.com/jimniels) — you get some HTML that includes their most recent shots _even if you aren’t an authenticated user_.

That’s the content I need, I just want it funneled into my RSS reader. 

So I wrote a little script on ~~Glitch~~ Deno that takes a Dribbble username, fetches that user’s profile page in HTML, parses it, and transforms it to an individualized feed I can subscribe to.

~~Glitch~~ Deno makes this super easy because you use their GUI to write a little JavaScript (Node.js) code, make it available at a public URL, and use their servers to run it.

In my case, if I want to follow someone on Dribbble in my RSS reader, I take their username and subscribe via my ~~Glitch~~ Deno script endpoint: 

[`jimniels-dribbble.deno.dev/?user=matthewskiles`](https://jimniels-dribbble.deno.dev/?user=matthewskiles)

That returns an individualized [JSON feed](https://www.jsonfeed.org/) for each user. You can see the functioning code in [the Deno Dev playground](https://dash.deno.com/playground/jimniels-dribbble).

Granted this is hard-coded to work in conjunction with Dribbble’s HTML responses, so there are no guarantees against breakage, but I’ve been using it for a couple months and nothing has broken (knock on wood).

It’s pretty neat that I understand enough of the web to be able to empower myself to follow individuals in this way. Otherwise I don’t know what I’d do – probably write down these people’s names and manually go check their profiles once a month and see if there’s anything new based on my memory.

But this way, I never miss a beat. Their new shots come right into my RSS reader for consumption by me at my time of choosing.

If you got a problem, yo RSS will solve it.

## Update 2022-09-28

[Pawel did this same thing, but for Bandcamp](https://pawelgrzybek.com/generate-rss-feed-for-bandcamp-artists-using-deno-deploy/), and he did it on Deno Deploy which is pretty neat.

I originally wrote my version using Glitch, but always wanted to use Deno Deploy. I’ve since updated the post with the Deno Deploy links.
