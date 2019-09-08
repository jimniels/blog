---
title: Reading Notes, May 2019
tags: readingNotes
---

## Article: [”Preload, prefect and other <link> tags”](https://3perf.com/blog/link-rels/)

I’ve actually never really taken the time to try and understand exactly the difference between preload, prefetch, preconnect, prerender, etc. This articular sums it up nicely. In fact, I’m going to sum it based on my understanding of how they summed it up. Is that enough summing for you?

- `<link rel="preload">` – use it when you want to “preload” a resource after initial page load.
- `<link rel="prefetch">` – use it when you want to “prefetch” a resource you think you’ll need on a subsequent page.
- `<link rel="preconnect">` – use it when you want to “preconnect” to a domain for resource(s) you know you’ll need soon.
- `<link rel="dns-prefetch">` – similar to “preconnect”, but less featured. However it does support older browsers that “preconnect” does not.
- `<link rel="prerender">` – use it when you want to load and render a page in the background that you anticipate the user will soon navigate to.

There’s a lot more useful and nuanced information in the article beyond what I’ve summarized here. Check it out if you don’t already know the differences.

## Article: [“Slashed URI”](https://remysharp.com/2019/03/25/slashed-uri)

I actually always wondered why the file scheme had three slashes in it. Now I know—and it makes perfect sense.

> a file scheme has 3 slashes (compared to the two used after http) because the scheme for URLs is <proto>://<host>/<path> and since file (in most cases) has no host (it's your machine), it becomes file:///<path> (ref).

## Article: [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)

Really, I just loved this line. I wish more articles I read started with this premise:

> There won’t be much to learn. In fact, we’ll spend most of our time unlearning.

## Tweet: [Key Traits of Great Design](https://twitter.com/cameronmoll/status/1119276324651012096?s=20) by @cameronmoll

> Great design can’t ship without great relationships. Be pleasant to work with! Design is the minimum bar, relationships are the highest bar.

> Visual hierarchy is...the underpinning of all visual communication. Without it design has no value. “I don’t paint things. I only paint the difference between things.” – Henri Matisse

> Problem definition becomes clearer as we begin solving the problem, refine the problem further, solve the problem further, repeat. The process is circular, not linear.

Some good points in there.

## Article: [“The Back-end for Front-end Pattern (BFF)”](http://philcalcado.com/2015/09/18/the_back_end_for_front_end_pattern_bff.html)

An interesting article detailing the evolution of different application architectures over the years. Though this is specific to SoundCloud’s evolving architecture, it does seem to follow the path trodden by the industry at large.

I found the BFF pattern proposed in the article quite interesting, as it was not a pattern I’d seen before. It does make a lot of sense though. As services became more generic over the years in order to please their consumers, we ended up with clients that had to make possibly hundreds of API calls just to draw a single UI. The idea of having each client maintain its own “server” which reaches out to various services for its own specific needs is really interesting. Granted, GraphQL can do this for you in a sense, but trying to create a GraphQL endpoint that can appease the needs of a variety of clients can end you up in the same dilemma. However, if you spun up multiple “BFF” GraphQL servers, each one specific to its clients needs, then things get interesting!

> On a more technical problem, our public APIs almost by definition are very generic. To empower third-party developers to build interesting integrations, you need to design an API that makes no assumptions about how the data is going to be used. This results in very fine-grained endpoints, which then require a large number of HTTP requests to multiple different endpoints to render even the simplest experiences...The idea was that having the team working on the client own the API would allow for them to move much quicker as it required no coordination between parts

## Article: [“Learn in Public”](https://swyx.io/writing/learn-in-public)

I’ve known Shawn for a little while online, but just recently met him in person. We got to talking about a variety of things and he told me about this short little piece of writing he’d done sometime past. So I looked it up and read it. It’s good. I like the metaphor that comes to mind of “creating learning exhaust”. I think that makes writing feel more feasible and accessible. What you produce doesn’t have to be Hemingway; rather it’s often just going to be the byproduct of your learning.

> You already know that you will never be done learning. But most people "learn in private", and lurk. They consume content without creating any themselves…What you do here is to have a habit of creating learning exhaust. Write blogs and tutorials and cheatsheets. Speak at meetups and conferences. Ask and answer things on Stackoverflow or Reddit. (Avoid the walled gardens like Slack and Discourse, they're not public). Make Youtube videos or Twitch streams. Start a newsletter. Draw cartoons (people loooove cartoons!). Whatever your thing is, make the thing you wish you had found when you were learning…just talk to yourself from 3 months ago.

## Article: [“In defence of boring UX”](https://ux.shopify.com/in-defence-of-boring-ux-ad32acd4d437)

An interesting and fresh perspective on digital design. No matter what aesthetics you put into your app, that’s never what people talk about. They don’t talk about what it looks like, that’s what designers talk about. They talk about what they can do with it.

I’ve been feeling this more and more. Quite often I’d honestly [prefer system-native controls](https://blog.jim-nielsen.com/2019/your-product-doesnt-have-to-look-the-same-on-every-platform/) instead of custom styled or custom designed up controls. They’re boring, but they’re familiar and usable and dependable. And boring.

> But big or small, I beg you, stay boring. Because true delight will always live outside your product. As Chris Kiess notes, “I’ve spent a lot of time in the field on various projects and it is rare I find a user who comments on some aspect of a feature I had discussed ad nauseam with my team.”
>
> Endless debates about indentations, rounded corners, and colour choices are UX’s version of the sunk cost fallacy. Nothing digital design can offer compares to the experiential joy of an Airbnb host in Dublin recommending the perfect nearby bar. Or a Chicago Lyft driver giving you a dozen amazing food and drink suggestions. Or cycling confidently through Portland at 11pm thanks to turn-by-turn instructions on a Pebble watch.

## Article: [Plain Text vs. HTML Emails: Which Is Better?](https://blog.hubspot.com/marketing/plain-text-vs-html-emails-data)

I can’t believe I’m linking to HubSpot, but let truth come from whence it may.

I’ve long been a fan of plain text emails (really plain text anything). And now I have some serious data to back up my gut feeling.

> Aside from proper list segmentation, nothing boosts opens and clicks as well as an old school, plain-text email.

What’s really interesting about this data is that people say they prefer HTML emails and visuals, but the data shows the opposite of what people say:

> In a 2014 survey, we asked over a thousand professionals whether they preferred HTML-based or text-based emails, and whether they preferred emails that consisted of mostly text or mostly images. Nearly 2/3 of the respondents said they preferred HTML and image-based emails...[However] In every single A/B test...The emails with fewer HTML elements won with statistical significance.

The authors of the article I think get to the root of what I’ve always felt about email: it’s a 1-to-1 interaction:

> For example, shouldn't an email with an image of the ebook being promoted do better than an email with no visualization of the offer? Wouldn't just a plain email be boring, and not help explain the offer? Aren't humans wired to be attracted to beautiful design?
>
> Unfortunately, this principle doesn't apply to email.
>
> And the reason is simple: **Email, unlike other marketing channels, is perceived as a 1-to-1 interaction.**
>
> Think about how you email colleagues and friends: Do you usually add images or use well-designed templates? Probably not, and neither does your audience. They're used to using email to communicate in a personal way, so emails from companies that look more personal will resonate more.

Again the data backing these claims up is quite significant:

> For the click rate, we dove into data from over half a billion marketing emails sent from HubSpot customers. These customers vary in type of business, and have different segments, list sizes, and list compositions.
>
> What we found was that even a single image reduced the click rate

That plain text performs better than HTML emails is no small claim, especially from a marketing company like HubSpot. The cynical part of me doubts that much will come of it, though. As the author of the article states:

> Ultimately, in email, less is more.
>
> This can be a tough pill for marketers to swallow (myself included)...But data repeatedly shows plain-text email wins, so it's up to us to decide whether or not we want to make the switch.

At least now I’ve got some good data to backup my gut.

## Article: [“The inception bar: a new phishing method”](https://jameshfisher.com/2019/04/27/the-inception-bar-a-new-phishing-method/)

An interesting look at a new phishing method:

> There seems to be a trade-off, between maximizing screen space on one hand, and retaining trusted screen space on the other. One compromise could be to retain a small amount of screen space to signal that “the URL bar is currently hidden”, instead of giving up literally all screen space to the web page.

Safari on mobile has an interesting approach in that the url bar shrinks on scroll but the domain always stays visible in the UI. I like that.

Some browser makers seems to be more and more trying to get rid of the URL, both from and engineering and a UI/UX perspective. Personally I think we should be doing the opposite. We should double down on the URL of a website and make sure it’s treated as a cornerstone of browser UI.
