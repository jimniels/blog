#netlify

# Building a Netlify Analytics Email Digest

tldr; using Netlify [Analytics](https://www.netlify.com/products/analytics/) and [Functions](https://docs.netlify.com/functions/overview/) combined with iOS shortcuts, I built a script that sends me a daily email detailing the last 24 hours of traffic on my blog.

<img src="https://cdn.jim-nielsen.com/blog/2022/analytics-email-screenshot.png" width="432" height="578" alt="Screenshot of my analytics email digest, showing a breakdown of 'Top Sources' and 'Top Pages'" /> 

The email is comprised of “Top Sources” and “Top Pages” (as defined by Netlify Analytics) which lets me keep a pulse on A) what sites are linking to my blog, and B) what posts are seeing lots of current traffic.

<img src="https://cdn.jim-nielsen.com/blog/2022/analytics-email-anatomy.png" width="778" height="575" alt="Screenshot of my analytics email digest with a breakdown of each individual piece of the design, like the analytics date range, popular domains of inbound links, the number of pageviews, and a link to Google site search." /> 

## The Problem

First, some background on why I built this thing.

Here’s a common scenario for me: I feel the whim to log in to Netlify. I glance at my analytics and see a _huge_ spike in pageviews, often from days or weeks ago (but not more than 30 days ago, as Netlify doesn’t track analytics beyond that).

<img src="https://cdn.jim-nielsen.com/blog/2022/analytics-email-netlify-dashboard-pageviews.png" width="532" height="482" alt="Screenshot of the 'Pageviews' widget on the Netlify analytics dashboard showing a huge spike in traffic." /> 

“Hot damn! What happened there?” I wonder. I scroll down to see where the traffic is coming. “Oh hey, looks like something I wrote ended up on ye olde orange website and some subreddits.”

<img src="https://cdn.jim-nielsen.com/blog/2022/analytics-email-netlify-dashboard-sources.png" width="531" height="517" alt="Screenshot of the 'Top sources' widget of Netlify Analytics showing news.ycombinator.com as a large source of inbound traffic." /> 

Now I know where the traffic is coming from. But what blog post is the culprit? A glance at Netlify’s “Top Pages” reveals a blog post whose pageviews far surpass any others.

<img src="https://cdn.jim-nielsen.com/blog/2022/analytics-email-netlify-dashboard-pages.png" width="534" height="336" alt="Screenshot of the 'Top pages' widget of Netlify Analytics showing a blog post whose pageviews far surpass any others." /> 

And with that, my detective work is done.

I’m using an extreme example here. Most of the time what I see is a minor bump in traffic—double digit referrals from some domain on the web—and I wonder, “oh hey, what’s this website that linked to my blog?” I go check it out and see somebody found my writing useful: a few nice words and a link. To be honest, reading people linking to something from their personal site is a much better way of getting reader feedback than “the comments section” of the web. It’s also a good way to discover personal blogs of people I don’t know and add them to my RSS feed.

Anyhow, the problem is: I’m not interested in logging in to Netlify’s dashboard every day to do this assessment.

So how to make this information more readily accessible?

## The Solution

As I knew from [a prior experiment](https://blog.jim-nielsen.com/2020/using-netlify-analytics-to-build-list-of-popular-posts/), Netlify has an (unofficial) API for accessing analytics data. “What if I wrote a script that runs every 24 hours, gathers the latest analytics data, and sends me a daily report?” That sounds like fun!

Some JavaScript and a Netlify Function later, I have a URL returning HTML of the last 24 hours of analytics activity from Netlify.

<img src="https://cdn.jim-nielsen.com/blog/2022/analytics-email-browser.png" width="686" height="763" alt="Screenshot of my analytics email returning HTML at a URL in the browser." /> 

Now I need to get that HTML into an automated email every 24 hours. That’s a two part problem: I need a server that 1) schedules doing something, and 2) sends emails. Then I thought: I already have a “server” with 24-hour access to the internet that can send emails—my iPhone. Could iOS shortcuts be the automation solution here?

Turns out, it can be! Using shortcuts, you can take the contents of a URL (the output of my Netlify Function) and send it to an email address (an email to myself).

<img src="https://cdn.jim-nielsen.com/blog/2022/analytics-email-ios-shortcut.png" width="375" height="435" alt="Screenshot of an iOS shortcut that takes the contents of a URL and sends it via an email." /> 

I’ve had this going for a couple months now and it’s been pretty neat to receive this little daily digest. It keeps me abreast of inbound traffic in a daily, lightweight, and ephemeral way.

<img src="https://cdn.jim-nielsen.com/blog/2022/analytics-email-hackernews.png" width="375" height="715" alt="Screenshot of my email digest showing hackernews as a very large top source." /> 

### Technical Details

After inspecting the network calls for my blog in Netlify Analytics, I was able to reformulate my own set of API calls in order to render my daily email. View the API calls and corresponding code for the Netlify Function in [this gist](https://gist.github.com/jimniels/e544b05ed72079ae008963250250432a).

You might have noticed the little search icon 🔍? That’s a quick `<a>` link to do [a Google site search using query parameters](https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters) for the source domain—a shorthand to searching the site myself and finding the link to my blog. 

Oh, and lastly: Netlify now offers the ability (in beta) to run [scheduled functions](https://www.netlify.com/blog/quirrel-joins-netlify-and-scheduled-functions-launches-in-beta). While that solves the problem of running my function every 24 hours, it wouldn’t solve my problem of sending emails. I’d have to use a service like [SendGrid](https://sendgrid.com) for that. So for now, I’ll continue with my iOS shortcut.
