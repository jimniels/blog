#readingNotes

# Reading Notes, June 2020

## Article: [“Deno is a Browser for Code”](https://kitsonkelly.com/posts/deno-is-a-browser-for-code/)

I haven’t really played with Deno yet, but conceptually I love a number of its founding premises:

> In order to publish a website, we don’t login to a central Google server, and upload our website to the registry. Then if someone wants to view our website, they use a command line tool, which adds an entry to our browser.json file on our local machine and goes and fetches the whole website, plus any other websites that the one website links to to our local websites directory before we then fire up our browser to actually look at the website. That would be insane, right? So why accept that model for running code?
>
> The Deno CLI works like a browser, but for code. You import a URL in the code and Deno will go and fetch that code and cache it locally, just like a browser. Also, like a browser, your code runs in a sandbox, which has zero trust of the code you are running, irrespective of the source. You, the person invoking the code, get to tell that code what it can and can’t do, externally. Also, like a browser, code can ask you permission to do things, which you can choose to grant or deny.

With Deno, there is no package manager. You only need HTTP.

> The HTTP protocol provides everything that is needed to provide information about the code, and Deno tries to fully leverage that protocol, without having to create a new protocol.

Also this bit:

> This leads us to the Deno model, which I like to call Deps-in-JS, since all the cool kids are doing *-in-JS things. 

This is a really interesting conceptual look at what Deno is doing and how it’s different. I like it. It feels very “webby”.

## Article: [“RFC 1925 - The Twelve Networking Truths”](https://tools.ietf.org/html/rfc1925)

Found this via [Dave’s blog](http://daverupert.com/2020/06/rfc-1925-the-twelve-networking-truths/) and the source article is a wonderful read that starts like this:

> This memo documents the fundamental truths of networking for the Internet community. This memo does not specify a standard, except in the sense that all standards must implicitly follow the fundamental truths.

What follows is a number of half truths, half jokes, informed by years of experience. Like this one:

> (3) With sufficient thrust, pigs fly just fine. However, this is not necessarily a good idea.

A number of these truths, rules, whatever they are, I encountered just this week. In fact, I see many of them _every_ week:

> (5) It is always possible to aglutenate multiple separate problems into a single complex interdependent solution. In most cases this is a bad idea.

And

> (8)  It is more complicated than you think.

A great read.

## Article: [“Tradeoffs and Shifting Complexity”](https://daverupert.com/2020/06/tradeoffs-and-shifting-complexity/)

Oh hey, another article from Dave. But it just resonated with me so much!

> We don’t really make software architecture decisions based on some rigorous cost/benefit analysis. Decisions are often more informed on existing biases, past experiences, and the tradeoffs people find most comfortable. Decisions also get slipped in under the cover of self-imposed sprint deadlines...sometimes, it seems, the act of making a decision or the need to “unblock” something gets elevated over the impact of the decision.
> 
> I think this is where the second implication of Tesler’s Law comes into play: “Who will inherit the complexity?” Is it a value or a cost that gets passed on to the user? It’s a simple question, but the answer dictates so much. 

This really resonates—so much decision making gets made around how the teams building the software organize themselves, communicate, and basically work. And the outworking of those environments, those processes, is what often frames our decision making.
