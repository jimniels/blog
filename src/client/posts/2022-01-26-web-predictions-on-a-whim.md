# The Web in 2036: Predictions on a Whim

I just finished reading Jeremy’s article [“Today, the distant future”](https://adactio.com/journal/18743). It’s fascinating to read predictions about HTML and the web from fourteen years ago. Jeremy ends by asking:

> So who else is looking forward to seeing what the World Wide Web is like in 2036?

🙋‍♂️ I am.

Given that I have little confidence in my ability to make predictions, I’m timeboxing myself in writing this post—hence the title.

So where do I see the web in another fourteen years?

I agree with Jonny Axelsson (who Jeremy quotes in his article) and his prediction from fourteen years ago:

> The Web in 2022 will not be dramatically different from the Web in 2009. It will be less hot and it will be less cool. The Web is a project, and as it succeeds it will fade out of our attention and into the background.

I think that trend will continue such that the web in 2036 will not be that different from the web in 2022 or even the web in 2009—it will still be HTML, CSS, JS, URLs, browsers, etc. 

Here’s my perception of how the web changed from 2008 to 2022:

- Less vanilla, more framework
- Less server-side, more client-side
- Less HTML, more JavaScript
- Less CSS, more JavaScript
- Less JavaScript, more something that compiles to JavaScript

In fact, Jeremy quotes Scott Gilbertson fourteen years ago as saying:

> will HTML still be the dominant language of web?

Is JavaScript the most dominant language of the web? Perhaps the most vogue. In 2022 [it’s not uncommon](https://blog.jim-nielsen.com/2020/agency-website-design-inspiration-and-other-observations/) to see a tiny bit of HTML like `<div id="root"></div>` and then megabytes of JavaScript to do everything else.

And you know what? It’s possible the behemoth that is JavaScript in 2022 continues to metastasize as we move towards 2036, especially with technologies like WASM. I wouldn’t rule out the lordship of JavaScript as a possibility of the future.

However, I also think it’s possible—and dare I predict—to say we are peaking in our _divergence_ and are now facing a _convergence_ back towards building with the grain of the web and its native primitives. 

Why do I say that? In our quest for progress, we explored so far beyond the standards-based platform that we came to appreciate the modesty of the approach “use the platform”.

For example, the pendulum of React is swinging. Significant architectural improvements for improved [server-side rendering](https://github.com/reactwg/react-18/discussions/37) have been in the works for a long time, meaning less client-side JavaScript for everything and more server-side rendered HTML. Also of note, the framework appears to be warming up to the idea of web components, opening the possibility to use less JavaScript and more HTML, less framework and more standards-based platform (who knows, maybe by 2036 we’ll have HTML imports and [Dave will find peace](https://twitter.com/davatron5000/status/900023379780149248?s=20)).

In a similar vein, I find the ethos of [Deno](https://deno.land/) interesting because of its bet on being [“webby”](https://blog.jim-nielsen.com/2021/deno-is-webby/). Rather than create its own conventions and APIs that deviate from web standards, it is converging towards the idea of a single web platform with a unified set of APIs, no matter the environment or runtime. For example, eschew the variety of different APIs for doing async HTTP requests and instead standardized around the `fetch` API everywhere. Fetch is fetch, whether [on the client](https://developer.mozilla.org/en-US/docs/Web/API/fetch), [on the server](https://deno.land/manual/examples/fetch_data), [on the edge](https://developers.cloudflare.com/workers/runtime-apis/fetch), or anywhere else. ~~Visa~~ `fetch`: it’s everywhere you want to be.

I think new tools [like this](https://remix.run) could be directionally indicative of where the web is headed (or headed back to).

Ultimately, I don’t think HTML is going anywhere. As [Yehuda says](https://twitter.com/wycats/status/1376963953054547970?s=20):

> HTML (especially when enhanced with ARIA) is humanity's best effort to create a single set of portable semantics for the interaction patterns in computing.

HTML has been around a long time and weathered many contenders. I don’t see its status being overtaken in a “mere” fourteen years. On the contrary, I am venturing to guess we double down on HTML and its uses over the next fourteen years.

Ok, I should stop there because I could be very wrong about all the above. But before I stop, there is one last prediction I would like to make.

This is a prediction that comes with more confidence than the above: **this blog post will still be accessible via its originally published URL in 2036**. That means however wrong I am about the web in 2036, this blog post will still be accessible and subject to ridicule with the perspective of hindsight. And you know what? If that’s the only thing I’m right about, I’ll be satisfied with my predictions.
