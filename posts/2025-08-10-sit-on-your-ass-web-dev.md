# Sit On Your Ass Web Development

I’ve been ~~reading~~ listening to [_Poor Charlie’s Almanack_](https://press.stripe.com/poor-charlies-almanack) which is a compilation of talks by Charlie Munger, legendary vice-chairman at Berkshire Hathaway.

One thing Charlie talks about is what he calls “sit on your ass investing” which is the opposite of day trading. Rather than being in the market every day (chasing trends, reacting to fluctuations, and trying to time transactions) Charlie advocates spending most of your time “sitting on your ass”. That doesn’t mean you’re doing nothing. It means that instead of constantly trading you’re spending your time in research and preparation for trading.

Eventually, a top-tier opportunity will come along and your preparation will make you capable of recognizing it and betting big. _That’s when you trade._ After that, you’re back to “sitting on your ass”. Trust your research. Trust your choices. Don’t tinker. Don’t micromanage. Don’t panic. Just let the compounding effects of a good choice work in your favor.

## Day Trading, Day Developing

As a day trader your job is to trade daily (it’s right there in the job title). If you’re not trading every day — following trends, reacting to fluctuations, timing trades — then what are you even doing? Not your job, apparently.

I think it’s easy to view “development” this. You’re a developer. Your job is to develop programs — to write code. If you’re not doing that every single day, then what are you even doing?

From this perspective, it becomes easy to think that writing endless code for ever-changing software paradigms is just one develops websites.

But it doesn’t have to be that way. Granted, [there’s cold-blooded and warm-blooded software.](https://dubroy.com/blog/cold-blooded-software/) Sometimes you can’t avoid that.

But I also think there’s a valuable lesson in Charlie’s insight.   You don’t have to chase “the market” of every new framework or API, writing endless glue code for features that already exist or that will soon exist in browsers. Instead, you can make a few select, large bets on the web platform and then “sit on your ass” until the payoff comes later!

## An Example: Polyfills

I think polyfills are a great example of an approach to “sit on your ass” web development. Your job as a developer is to know enough to make a bet on a particular polyfill that aligns with the future of the web platform. Once implemented, all you have to do is sit on your ass while other really smart people who are building browsers do their part to ship the polyfilled feature in the platform. Once shipped, you “sell” your investment by stripping out the polyfill and reap the reward of having your application get lighter and faster with zero additional effort.

A big part of the payoff is in the waiting — in the “sitting on your ass”. You make a smart bet, then you sit patiently while others run around endlessly writing and rewriting more code (meanwhile the only thing left for you will be to delete code).

Charlie’s business partner Warren Buffett once said that it’s “better to buy a wonderful company at a fair price, than a fair company at a wonderful price”. Similarly, I’d say it’s better to build on a polyfill aligned with the future of the platform than to build on a framework re-inventing a feature of the platform.

## Get Out Of Your Own Way

Want to do “Day Trading Development”?

-	Jump tools and frameworks constantly — “The next one will solve all our problems!”
-	Build complex, custom solutions that duplicate work the web  platform is already moving towards solving.
-	Commit code that churns with time, rather than compounds with it.

Want to do “Sit on Your Ass Development”?

- Do the minimum necessary to bridge the gap until browsers catch up.
- Build on forward-facing standards, then sit back and leverage the compounding effects of browser makers and standards bodies that iteratively improve year over year (none of whom you have to pay).
- As [Alex Russel recommends](https://notes.jim-nielsen.com/#2025-07-18T0946), spend as little time as possible in your own code and instead focus on glueing together “the big C++/Rust subsystems” of the browser.

In short: spend less time glueing together tools and frameworks _on top of_ the browser, and more time bridging tools and APIs _inside of the browser_. Then get out of your own way and go sit on your ass. You might find yourself more productive than ever!