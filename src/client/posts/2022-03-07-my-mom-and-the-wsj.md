#progressiveEnhancement #browsers

# Family IT Support Turned Blog Post Turned Anecdote in The Wall Street Journal

I recently opened my inbox to find an email from [Nicole Nguyen](https://twitter.com/nicnguyen), a personal technology columnist at The Wall Street Journal.

She mentioned reading [my blog post](https://blog.jim-nielsen.com/2022/a-web-for-all/) about my Mom who had trouble volunteering in her local community because she couldn’t access the reservation system online (spoiler: because someone shipped the optional chaining operator in their production JavaScript and she was on an old version of Chrome).

While my post was initially authored as an illustration of what happens when you build websites that aren’t [resilient](https://resilientwebdesign.com), something else I learned in the process was how intertwined Chrome (the browser) and Chrome (the OS) are: you can’t update one without updating the other. If a piece of hardware is too old to receive updates to Chrome (the OS), then Chrome (the browser) no longer gets updates either. It stops being an evergreen browser and becomes a [dead evergreen](https://css-tricks.com/evergreen-does-not-mean-immediately-available/) browser.

Nicole told me she was working on a column investigating expiring Chrome OS updates. Many marketplaces, she told me, “continue to sell Chromebooks that are no longer supported, with no mention of the [Auto Update Expiration] date on the product page.” She asked to interview me about my Mom’s experience and I was more than happy to oblige.

Nicole’s piece landed Sunday. It’s titled [“Before You Buy a Chromebook, Check the Expiration Date”](https://www.wsj.com/amp/articles/before-you-buy-a-chromebook-check-the-expiration-date-11646538322) and I love the analogy in her opening line:

> Like food and medication, our gadgets are only good for so long. Unfortunately, in the ever-expanding universe of online retail, many devices are sold past their “best by” dates.

Until encountering my Mom’s problem, I didn’t know Chrome OS updates phased out for older hardware and therefore locked people out of updating Chrome (the browser). Nicole peeled the curtain back even further on this phenomenon, showing how consumers might be unaware they’re buying a computer that’s outdated (in terms of software updates) the moment they remove the packaging.

> Retailers often sell Chromebooks that are past their expiration dates at cheap prices, with no warning that a model is outdated. One third-party seller, listing an Acer C720 on Amazon, touted the model’s “speed, simplicity and security” and ability to “automatically stay up-to-date.” Pre-owned units of the same model are available at Best Buy and on the refurbished-electronics marketplace Back Market. None of the sites mention that the computer stopped receiving updates in mid-2019.

In my conversation with Nicole, I tried to explain the idea of “progressive enhancement” and why, I believe, the website my Mom was trying to access should’ve still been accessible. She distilled my ramblings into this paragraph (emphasis mine):

> In the Nielsens’ case, the malfunctioning website uses code that requires more-recent versions of the Chrome browser. This is a **convenience for developers**, who don’t then have to write longer code compatible with older software. **The assumption is that pretty much everyone coming to the site will have an updated browser.**

It’s an enlightening piece, and it ends with this succinct advice for consumers:

> If you take only one thing from this column, make it this: Before buying a Chromebook, check the model’s expiration date on Google’s Auto Update policy website.

And if you work on the web, I’d pass along this advice from Dave: [blog about your specific problems](https://daverupert.com/2022/02/complaining-about-web-browsers/) because “your posts will get picked up…and shared”, not only by developer advocates but columnists at renowned newspapers.