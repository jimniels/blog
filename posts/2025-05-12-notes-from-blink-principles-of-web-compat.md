#generalNotes

# Notes from the Chrome Team’s “Blink principles of web compatibility”

Following up on [a previous article I wrote about backwards compatibility](https://blog.jim-nielsen.com/2025/backwards-compat-in-web-but-not-its-tools/), [I came across](https://bsky.app/profile/rbyers.net/post/3lny4p62k3c24) this document from Rick Byers of the Chrome team titled [“Blink principles of web compatibility”](https://docs.google.com/document/d/1RC-pBBvsazYfCNNUSkPqAVpSpNJ96U8trhNkfV0v9fk/edit?tab=t.0) which outlines how they navigate introducing breaking changes.

“Hold up,” you might say. “Breaking changes? But there’s no breaking changes on the web!?”

Well, as outlined in their Google Doc, “don’t break anyone ever” is a bit unrealistic. Here’s their rationale:

> The Chromium project aims to reduce the pain of breaking changes on web developers. But Chromium’s mission is to advance the web, and in some cases it’s realistically unavoidable to make a breaking change in order to do that. Since the web is expected to continue to evolve incrementally indefinitely, it’s essential to its survival that we have some mechanism for shedding some of the mistakes of the past.

Fair enough. We all need ways of shedding mistakes from the past. But let’s not get too personal. That’s a different post.

So when it comes to the web, how do you know when to break something and when to not? The Chrome team looks at the data collected via Chrome's anonymous usage statistics (you can [take a peak at that data yourself](https://chromestatus.com/metrics/feature/popularity)) to understand how often “mistake” APIs are still being used. This helps them categorize breaking changes as low-risk or high-risk. What’s wild is that, given Chrome’s ubiquity as a browser, a number like 0.1% is classified as “high-risk”!

> As a general rule of thumb, 0.1% of PageVisits (1 in 1000) is large, while 0.001% is considered small but non-trivial.  Anything below about 0.00001% (1 in 10 million) is generally considered trivial.  There are around 771 billion web pages viewed in Chrome every month (not counting other Chromium-based browsers). So seriously breaking even 0.0001% still results in someone being frustrated every 3 seconds, and so not to be taken lightly!

But the usage stats are merely a guide — a partially blind one at that. The Chrome team openly acknowledges their dataset doesn’t tell the whole story (e.g. Enterprise clients have metrics recording is disabled, China has Google’s metric servers are disabled, and Chromium derivatives don’t record metrics at all).

And Chrome itself is only part of the story. They acknowledge that a change that would break Chrome but align it with other browsers _is a good thing_ because it’s advancing the _whole_ web while perhaps costing Chrome specifically in the short term — community > corporation??

> Breaking changes which align Chromium’s behavior with other engines are much less risky than those which cause it to deviate…In general if a change will break only sites coding specifically for Chromium (eg. via UA sniffing), then it’s likely to be net-positive towards Chromium’s mission of advancing the whole web.

Yay for advancing the web! And the web is open, which is why they also state they’ll opt for open formats where possible over closed, proprietary, “patent-encumbered” ones.

> The chromium project is committed to a free and open web, enabling innovation and competition by anyone in any size organization or of any financial means or legal risk tolerance.  In general the chromium project will accept an increased level of compatibility risk in order to reduce dependence in the web ecosystem on technologies which cannot be implemented on a royalty-free basis.

One example we saw of breaking change that excluded proprietary in favor of open was Flash. One way of dealing with a breaking change like that is to provide opt-out. In the case of Flash, users were given the ability to “opt-out” of Flash being deprecated via site settings (in other words, opt-in to using flash on a page-by-page basis). That was an important step in phasing out that behavior completely over time. But not all changes get that kind of heads-up.

> there is a substantial portion of the web which is unmaintained and will effectively never be updated…It may be useful to look at how long chromium has had the behavior in question to get some idea of the risk that a lot of unmaintained code will depend on it…In general we believe in the principle that the vast majority of websites should continue to function forever.

There’s a lot going on with Chrome right now, but you gotta love seeing the people who work on it making public statements like that — “we believe…that the vast majority of websites should continue to function forever.”

There’s some good stuff in this document that gives you hope that people really do care and work incredibly hard to not break the web! ([It’s an ecosystem after all.](https://blog.jim-nielsen.com/2025/ecosystems-vs-artifacts/))

> It’s important for [us] browser engineers to resist the temptation to treat breaking changes in a paternalistic fashion. It’s common to think we know better than web developers, only to find out that we were wrong and didn’t know as much about the real world as we thought we did. Providing at least a temporary developer opt-out is an act of humility and respect for developers which acknowledges that we’ll only succeed in really improving the web for users long-term via healthy collaborations between browser engineers and web developers.

More 👏 acts 👏 of 👏 humility 👏 in tech 👏 please!
