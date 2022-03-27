#engineering #netlify #myBlog

# Using Netlify Analytics to Build a List of Popular Posts

The other day, the wind blew and I decided to realign the design of my blog just a bit. One of the things I wanted to change was the content on my home page. Previously, my home page was a giant index of all the posts I’d ever made, sorted and grouped by year.

<img src="https://cdn.jim-nielsen.com/blog/2020/netlify-analytics-old-blog-index.png" alt="Old screenshot of blog.jim-nielsen.com when it was an index of posts by year." width="1274" height="1139" />

Nothing necessarily wrong with that. But part of me wanted to have something a bit more...editorialized. I didn’t want to get rid of what my home page was—a chronological list of all the posts I’d ever written—because it made sense and was useful. So I made an [archive page](https://blog.jim-nielsen.com/archive/) to represent the same thing. But what to put on the home page?

“Latest Posts” seemed appropriate. I think timeliness is always a relevant factor when considering how to represent content on a blog. And it was easy to do: sort all my blog posts by year and display the latest ten. 

“Personal Favorites” seemed like another possible approach. Browse all my blog posts and choose my top ten personal favorites. This would be easy enough to do in code: a static array of unique IDs. Good thing I already have an unique ID for each post via its URL amirite?

“Let’s see, what else could I (easily) do?” I thought. “Most Popular” posts would be cool. But how would I know which posts on my blog are the most popular? My analytics! I use [Netlify Analytics](https://www.netlify.com/products/analytics/) on my blog. Occasionally I log in to see which of my posts are the most popular, which is an exercise I always find interesting. Usually my reaction to seeing the blog posts on that list is: “srsly? that old thing?!”

<img src="https://cdn.jim-nielsen.com/blog/2020/netlify-analytics-top-pages.png" alt="Screenshot of the “Top Pages” section in Netlify Analytics" width="966" height="778" />

So the thought hit me: wouldn’t it be cool if the “Top Pages” from Netlify Analytics could drive a “Most Popular” list of posts on my home page?

Spoiler: I did it.

<img src="https://cdn.jim-nielsen.com/blog/2020/netlify-analytics-popular-list.png" alt="Screenshot of my blog’s “Popular This Month” list of posts powered by Netlify Analytics" width="1035" height="830" />

Questions you might ask:

“Why ‘Popular This Month’?” Because Netlify only keeps track analytics data like this for the last 30 days. Don’t @ me about how the phrase “Popular This Month” is technically incorrect.

“Why ten of each?” Because I felt like it in the moment. Honestly, I could probably cut it down to five. Maybe even three. I mean, is anyone really coming to my blog and read ten posts from each section? I doubt it. Less is more, right? If there were only, say, nine blog posts in total on my home page, would random people who stumbled on it be more convinced to actually read something? When you’re confronted with thirty posts, it can seem overwhelming. If instead it was “here’s the three latest, my three favorites, and the internet’s three favorites” that might feel less overwhelming, like “thank you for not overwhelming me with options and just giving me a narrow set of choices. Maybe I’ll actually choose one.” It’s not a bad idea. Maybe I’ll try that...maybe.

## Powering the Popular Posts List

My first thought when looking at Netlify’s analytics was: “Netlify is getting that data from _somewhere_...and they have an API for developers...so I can probably access the same data too...”

First I looked to [Netlify’s API docs](https://open-api.netlify.com/) but found nothing around accessing analytics data.

So, when you can’t find any official documentation available, you look at the unofficial documentation by monitoring network traffic. I logged in to my account, opened up the network tab, and started analyzing the page. It was relatively easy to deduce what endpoints were being called and the resulting data coming back.

<img src="https://cdn.jim-nielsen.com/blog/2020/netlify-analytics-top-pages-network-tab.png" width="1067" height="915" alt="Screenshot of the network tab in the developer tools Netlify Analytics" />

This got me thinking, “there’s gotta be a way for me to access this sweet, sweet data...” So I went to Netlify’s forums for answers. And guess what? There just so happens to be a community post precisely on the topic of [“when (if at all) will we get API access to analytics data?”](https://community.netlify.com/t/status-of-access-to-analytics/6341) 

Apparently, while there is no official, well-documented support for API access to analytics data in Netlify, you can still access it yourself. Netlify’s Director of Support [mentioned](https://community.netlify.com/t/status-of-access-to-analytics/6341/8) that you can use their undocumented API which [Raymond Camden has a blog post about](https://www.raymondcamden.com/2019/10/05/building-a-netlify-stats-viewer-in-vuejs). Raymond’s post confirmed what I had suspected during my Sherlock-ing of the browser’s network tab: just look and see what calls Netlify’s app makes and make them yourself.

> Currently the Netlify Analytics API is not documented, but if you use devtools while on their site you can clearly see the calls being made. Each endpoint had a pretty simple API where you could pass a max count where it made sense and use date values (as times since epoch) for filtering.

So I went back to my browser’s dev tools to do some more inspecting. Within a few minutes, I had pinpointed the API call I needed to make in order to get the “Top Pages” data for my site from Netlify.

<img src="https://cdn.jim-nielsen.com/blog/2020/netlify-analytics-top-pages-network-tab.png" width="1067" height="915" alt="Screenshot of the network tab in the developer tools Netlify Analytics" />

Having worked with Netlify’s API in the past, I already had [a token](https://docs.netlify.com/api/get-started/#authentication) I could use to make calls. Using Chrome’s DevTools, I found the network call I wanted to make, used the “Copy as fetch” functionality, plugged in my token, and in no time had Netlify returning that sweet, sweet data I craved.

<img src="https://cdn.jim-nielsen.com/blog/2020/netlify-analytics-copy-fetch.png" width="425" height="378" alt="Screenshot of the “Copy as fetch” feature in Chrome’s DevTools" />

Now I just had to figure out how to turn the raw data from Netlify into data that could power my list of popular posts.

My blog is pretty simple. Besides posts it only has about four static pages. So the “Top Pages” reported by Netlify are essentially the most viewed posts on my blog (this likely won’t be the same for everyone). Because all of my blog posts follow an identical pattern for their permalinks—`/:year/:title`—when Netlify returns its list of “Top Pages” I can look through each entry and see if its URL matches the pattern of my post permalinks. If it does, I know it’s a blog post and I can add it to an array that powers my list of popular posts; otherwise, I just ignore the entry (for example, usually one of the “Top Pages” is my home page—`/`—which doesn’t match the regex I wrote for my permalink pattern, so it’s smart enough to just ignore that entry when building my list of popular posts).

## That’s It Folks

In summary, I now have a popular posts section on my blog index that works like this: whenever I run a build, my static site generator reaches out to Netlify’s analytics API, gets a list of the “Top Pages”, filters out any entry that isn’t a blog post, cuts down the list to ten, passes the data to my templates, and results in an HTML list of blog post entries. 

As long as I’m running my builds on a regular basis, the list stays relatively fresh. And my builds should be fresh because [I should be writing at least once a week](https://blog.jim-nielsen.com/2020/50-blog-posts-in-2020/).
