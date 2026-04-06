# I Tried Vibing an RSS Reader and My Dreams Did Not Come True

Simon Willison wrote about how [he vibe coded his dream presentation app for macOS](https://simonwillison.net/2026/Feb/25/present/).

I also took a stab at vibe coding my dream app: an RSS reader.

To clarify: [Reeder](https://reederapp.com/classic/) is my dream RSS app and it already exists, so I guess you could say my dreams have already come true?

But I’ve kind of always wanted to try an app where my RSS feed is just a list of unread articles and clicking any one opens it in the format in which it was published (e.g. the original website).

So I took a stab at it.

(Note: the backend portion of this was already solved, as I simply connected to my Feedbin account via [the API](https://github.com/feedbin/feedbin-api).)

First I tried a macOS app because I _never_ would’ve tried a macOS app before. Xcode, Swift, a Developer Account? All completely outside my wheelhouse. But AI helped be get past that hurdle of going from _nothing_ to _something_.

<img src="https://cdn.jim-nielsen.com/blog/2026/vibe-rss-mac-app.png" width="1382" height="996" alt="Screenshot of a macOS RSS reader app with a list of unread articles in the sidebar and a preview of one of the selected articles on the left available as a web page on the right." />

It was fun to browse articles and see them _in situ_. A lot of folks have really great personal websites so it’s fun to see their published articles in that format.

<img src="https://cdn.jim-nielsen.com/blog/2026/vibe-rss-mac-app-2.png" width="1382" height="996" alt="Screenshot of a macOS RSS reader app with a list of unread articles in the sidebar and a preview of one of the selected articles on the left available as a web page on the right." data-og-image />

This was pretty much pure vibes. I didn’t really look at the code at all because I knew I wouldn’t understand any of it.

I got it working the first night I sat down and tried it. It was pretty crappy but it worked. 

From there I iterated. I’d use it for a day, fix things that were off, keep using it, etc.

<video controls src="https://cdn.jim-nielsen.com/blog/2026/vibe-rss-mac-app.mp4" width="770" height="540"></video>

Eventually I got to the point where I thought:

- Ok, I could use this on my personal computer.
- I don’t know that I’ll be able to iterate on this much more because its getting more complicated and failing more and more with each ask ([I was just trying to move some stupid buttons around in the UI](https://mastodon.social/@jimniels/116267651599562927) and the AI was like, “Nah bro, I can’t.”)
- I have no idea how I’d share this with someone.
- I don’t think I’d be comfortable sharing this with someone (even though _I think_ I did things like security right by putting credentials in the built-in keychain, etc.)
- I guess this is where the road stops.

I’m picky about software, so the bar for my dreams is high. But I’m also lazy, so my patience is quite low.

The intersection of: the LLM failing over and over + my inability to troubleshoot any of it + not wanting to learn = a bad combination for persevering through debugging.

Which made me say: “Screw it, I’ll build it as a website!”

But websites don’t really work for this kind of app because of CORS. I can’t just stick an article’s URL in an `<iframe>` and preview it because certain sites have cross site headers that don’t allow it to display under another domain.

But that didn’t stop me. I tried building the idea anyway as just a list view. I could install this as a web app on my Mac and I'd get a simple list view:

<img src="https://cdn.jim-nielsen.com/blog/2026/vibe-rss-website-app.png" width="711" height="919" alt="Screenshot of an application window on macOS showing a list of article titles from an RSS feed." />

Anytime I clicked on a link, it would open in my default browser. Actually not a bad experience.

It worked pretty decent on my phone too. Once I visited my preview deploy, I could "isntall" it to my home screen and then when I opened it, I'd have my latest unread articles. Clicking on any of them would open a webview that I could easily dismiss and get back to my list.

<img src="https://cdn.jim-nielsen.com/blog/2026/vibe-rss-website-app-phone.png" width="645" height="656" alt="Screenshot of two screens from iOS side-by-side. One is a list of articles,  the other is an article preview. The list has a specific article highlighted with an arrow pointing to the preview, showing that a click results in a page load." />

Not too bad.

But not what I wanted, especially on desktop.

It seemed like the only option to 1) get exactly what I wanted, and 2) distribute it — all in a way that I could understand in case something went wrong or I had to overcome an obstacle — was to make a native app.

At this point, I was thinking: “I’m too tired to learn Apple development right now, and I’ve worked for a long time on the web, so I may as well leverage the skills that I got.”

So I vibed an Electron app because Electron will let me get around the cross site request issues of a website. 

This was my very first Electron app and, again, the LLM helped me go from _nothing_ to _something_ quite quickly (but this time I could understand my _something_ way better).

The idea was the same: unread articles on the left, a preview of any selected articles on the right. Here’s a screenshot:

<img src="https://cdn.jim-nielsen.com/blog/2026/vibe-rss-electron-app.png" width="1312" height="912" alt="Screenshot of an Electron app showing a list of feed articles in the sidebar and a preview of the selected article on the right." />

It’s fine. Not really what I want. But it’s a starting point.

Is it better than Reeder? Hell no.

Is it my wildest dreams realized? Also no.

But it’s a prototype of an idea I’ve wanted to explore.

I”m not sure I’ll go any further on it. It’s hacky enough that I can grasp a vision for what it could be. The question is: do I actually want this? Is this experience something I want in the long run?

I think it could be. But I have to figure out exactly how I want to build it as a complementary experience to my preferred way of going through my RSS feed.

Which won't be your preference.

Which is why I'm not sharing it.

So what’s my takeaway from all this? I don’t know. That’s why I’m typing this all out in a blog post.

Vibe coding is kinda cool. It lets you go from “blank slate” to “something” way faster and easier than before.

But you have to [be mindful of what you make easy](https://blog.jim-nielsen.com/2025/be-mindful-of-what-you-make-easy/). You know what else is easy? Fast food. But I don’t want that all the time.

In fact, vibe coding kinda left me with that feeling I get after indulging in social media, like “What just happened? Two hours have passed and what did I even spend my time doing? Just mindlessly chasing novelty?” It’s fun and easy to mindlessly chasing your whims. But part of me thinks the next best step for this is to sit and think about what I actually want, rather than just yeeting the next prompt out. 

[I’ve quipped before](https://mastodon.social/@jimniels/116267907171151857) that our new timelines are something like:

- Nothing -> Something? 1hr.
- Something -> Something _Good_? 1 year.

The making from nothing isn't as hard anymore. But everything after that still is. Understanding it. Making it good. Distributing it. Supporting it. Maintaining it. All that stuff. When you know absolutely nothing about those — like I did with macOS development — things are still hard.

After all this time vibing, instead of feeling closer to my dream, I actually kinda feel further from it. Like the LLM helped close the gap in understanding what it would actually take for me to realize my dreams. Which made me really appreciate the folks who have poured a lot of time and thought and effort into building RSS readers I use on a day-to-day basis. 

Thank you makers of [Feedbin](https://feedbin.com) & [Reeder](https://reederapp.com) & [others](https://netnewswire.com) through the years. I’ll gladly pay you $$$ for your thought and care.

In the meantime, I may or may not be over here slowly iterating on my own supplemental RSS experience. In fact, I might’ve just found the name: RxSSuplement.