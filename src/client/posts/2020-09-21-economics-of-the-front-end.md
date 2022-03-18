#thoughts #javascript

# The Economics of the Front-End

> We’re asking our users to pay entirely too much, both in time and in money, to access the sites we build with these frameworks. — [Ethan Marcotte](https://ethanmarcotte.com/wrote/gardened/)

Choosing to ship your app as a client-side application is, at least in some regards, a choice of economics. If you move a large portion of the computing required to run your application to the clients, think of all the money you’ll save in server costs!

Imagine, for a moment, the computation required now-a-days to render a view in a single page application (SPA) on a given client:

- Run routing logic to determine which view to show.
- Call `n` number of APIs to get data for the requested view.
- Run any related business logic.
- Stitch data and templates together to render a UI view.
- Handle failure scenarios in any of the above (and render appropriate UI).

That’s a lot of code that has to be run _for each user_. Now multiply that by thousands, or hundreds of thousands, or millions of users. That’s a lot of computation.

**[Server]** Ok, who’s first?  
**[Client 1]** Hey, Mr. Server, what does `mydomoain.com/path` look like?  
**[Server]** Sure. Given what I know about you, let me figure out what `/path` should be...ok, I need to get some data from various APIs...ok, now let me run some logic...ok now let me render some data into some templates...ok, I’m all done, here’s the HTML for `/path` just for you.  
**[Server]** Ok, who’s next in line?  
**[Client 2 (of 1,000,000)]** ...  

What if you could offload the cost of all that computing power to the client devices of your app? Like a potluck dinner. “We, your gracious hosts, don’t have the time, energy, money, skills, etc., to provide food for everyone coming to this party. So instead, dinner will be provided by you, our dear guests.” Outsource the work of dinner to each individual guest by asking them to bring food. Everyone gets fed and the hosts focus on coordination, event space, etc. (granted my metaphor is weak, but you get the idea).

Think about Facebook. _Billions_ of users. Think of all the computing required for _billions_ of users. Think about all that has to happen when you go to `facebook.com` on a desktop browser: data must be fetched, logic run, templates rendered, etc. The client could make one request and then sit idly, waiting for the server to do all that computation (mind you, the server might also be handling a millions of other requests at the moment). Or, Facebook could deliver a ton of code to the client and ask _it_ to do all the work of fetching data, running logic, rendering templates, etc. Surely somebody must ask the question: “why pay for all this computation ourselves when we can offload a lot of it to the clients for free?” In other words, all that data fetching, all that logic, all that rendering, that is all computing power (and therefore cost) which you can move to the client—at least clients that can run your JavaScript.

**[Server]** Ok, who’s first?  
**[Client 1]** Hey, Mr. Server, what does `mydomoain.com/path` look like?  
**[Server]** Here’s some code, run it and figure it out yourself.  
**[Server]** Ok, who’s next in line?  
**[Client 2 (of 1,000,000)]** ...

Granted, this is a simplification of what’s happening, but you get the idea. And I know, economics isn’t the _sole_ reason why companies choose to build websites out of pure client-side JavaScript. There are [a myriad of reasons why people make various architectural decisions](https://daverupert.com/2020/06/tradeoffs-and-shifting-complexity/). But I do think large tech companies employ JavaScript frameworks because, amongst other things, it saves them money at their scale. And what Big Tech does trickles down in the form of default choices for many others (“they’re doing it and are insanely successful, so mimicking them can’t be a bad idea”). However, the scale at which smaller projects operate doesn’t necessarily translate to the same kind of cost savings. So perhaps, as Ethan states, how we’ve come to build for a lot the web is a result of “bad defaults, deployed at a terrible scale.”

From small scale to big, there is an economics to the front-end that shapes decision making. You can argue all day long about the proper client/server relationship in delivering HTML, CSS, and JavaScript, but to paraphrase Upton Sinclair: it is difficult to get someone to understand a certain way of thinking when their bottom line depends upon them not understanding it.
