#talkNotes

# “Getting off the Modernization Treadmill”

My notes from [this talk by Alexander Petros at Big Sky DevCon 2026](https://www.youtube.com/watch?v=vRJVw8Di-4s).

Alex starts by noting how “modernize” used to mean something along the lines of “update this thing that was made before I was born”. But now “modernize” means something more like “update this thing from 5-10 years ago” (hence the framing of the talk, the “modernization treadmill”).

Using a real-world example of an incredibly _slow_ website that was required to access state-sponsored programs for welfare, Alex points out the disparity in conditions between those of us who make software and those who have to use them:

> The people who develop these websites are usually doing so on high-powered internet connections and high-powered devices, but they're not using them in the conditions that the people who most need those benefits are going to be.

Then he shows a Reddit thread where somebody essentially posted, “I’m having problems with this website. I’ve been waiting for months for my application to go through. Any suggestions?” And one Reddit user responded, “The best thing you can do is go into the physical office, get a case worker, and your problems will be solved within the hour.”

The irony.

I guess we've come full circle now. It used to be:

“Don’t talk to anybody. It’s faster and more convenient to use the website!”

But now it’s:

“Don’t use the website. It’s faster and more convenient to talk to somebody!”

Have [we failed](https://blog.jim-nielsen.com/2026/embarrassed-by-tech/) at making websites?

And is our failure, at least in part, rooted in the fact that we don’t leverage the basic tools for making websites: HTML, CSS, and (in a distant third) JavaScript?

Alex goes on to argue that the technologies of the web have an ideological bent and, if used as designed, can solve so many of the performance, accessibility, and usability issues that plague so many websites.

The grain of the web’s technologies are rooted in these values:

- User-friendly
- Backwards- and forwards-compatibility
- Long-term viability
- Universal accessibility

Which means if you use them as intended, they are optimized to deliver outcomes rooted in those same values.

So if you like those values and you want those outcomes, use the platform.

Take HTML, for example. Here’s Alex:

> HTML does [performance improvements] for you for free. If you've coded your website in a proper, semantical, structure HTML style, it will just get better over time at zero cost to the people who built that website

HTML is your friend. HTML won’t [give you up or let you down](https://www.youtube.com/watch?v=dQw4w9WgXcQ). HTML will make it difficult for you to make a bad website.

> Write it in to the requirements of the project you’re doing that it work without JavaScript. Not necessarily that it doesn’t have any JavaScript, but just that the core functionality of the website can happen without JavaScript. If you do this […] you will find that it’s very hard to deliver a bad web page because the structure that HTML requires is one that fundamentally is good for the user, performant, and cost effective.

Technologies are imbued with culture, which influences what you do and how you do it. If you can align your ideological beliefs with your technological choices, you might end up with an outcome that aligns with your values — who would’ve thought, eh?

> A lot of modern software developers come from websites like Facebook, they come from big tech companies [who] fundamentally have a different set of priorities. Their job is to keep you on the website as long as possible so that you consume more ads. But that’s the opposite set of requirements and priorities that the government needs to be doing, which is to build something that is clean, quick, efficient, and gets you in and out as fast as possible. So [I tell people] that the technology they use comes from [an] ideological place. But there are different ideological places that produce different technological results and if we start from those through lines then we can produce services that help people who need them.

The ideological principles of the web are [well established](https://www.w3.org/TR/design-principles/): users over  everything else.

If you use HTML as much as possible, you’ll make something that’s as user-friendly as possible on the web.