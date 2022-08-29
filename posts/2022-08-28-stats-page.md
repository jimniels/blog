#myBlog

# Stats Page

I came across Brian Baking’s [“Cool Things People Do With Their Blogs”](https://brainbaking.com/post/2022/04/cool-things-people-do-with-their-blogs/) which led me to [Luke Harris’ stats page](https://www.lkhrs.com/stats/) which motivated me to finally make something similar of my own.

I’ve written previously about enumerating the [external](https://blog.jim-nielsen.com/2020/indexing-my-blogs-links/) and [internal](https://blog.jim-nielsen.com/2022/visualizing-my-blogs-links/) links on my blog. I’ve also written previously about [graphing my blogging goals](https://blog.jim-nielsen.com/2021/graphing-blog-post-goals/). All of these are different forms of representing stats about my blog, so really this was an exercise in making all these disparate statistical representations accessible in one central place: [my `/about` page](https://blog.jim-nielsen.com/about/).

First, I created a general overview of stats surrounding my blogging over time. At the time of authoring this post, I have 11 years of blogging which has yielded 385 posts consisting of 364,601 words. A build-time generated chart from quickchart.io breaks down these stats over time.

<img src="https://cdn.jim-nielsen.com/blog/2022/stats-writing.png" width="821" height="592" alt="A bar and line chart showing an increase in posts per year and words written per year from 2012 to 2022." />

I’m not sure these numbers means anything to me — they’re just numbers. However, the 11 years of blogging is pretty cool I think. 

Next comes the prevalence of tags on my site.

<img src="https://cdn.jim-nielsen.com/blog/2022/stats-tags.png" width="821" height="592" alt="A bar chart showing the most common tags by occurence." />

When I first generated this chart from the data, I discovered the generic (and useless) tag `#thoughts` was the most used, which I promptly pruned from all my posts. This is one of the reasons I like this “dashboard” of stats: it helps keep me responsible for tagging things in a way that’s useful.

Next comes my charts around internal and external links. At the time of this writing, I have 1,961 external links that go from my blog to some other site on the web with the top three spots occupied by: 1) `twitter.com`, 2) `github.com`, and 3) `adactio.com`. Not much of a surprise there, but it’s interesting to see the top 10 tags on a chart showing their proportions to each other.

<img src="https://cdn.jim-nielsen.com/blog/2022/stats-external-links.png" width="821" height="592" alt="A bar chart showing the highest recurring external links." />

As mentioned earlier, these charts are generated at build time using the [quickchart.io](https://quickchart.io) API. I get back an SVG which I embed in the page — [with a few slight tweaks](https://blog.jim-nielsen.com/2022/multiple-inline-svgs/). Using SVGs allows me to style the charts for light and dark mode:

<img src="https://cdn.jim-nielsen.com/blog/2022/stats-line-charts-light-dark.png" width="1500" height="660" alt="Two identical bar charts side by side, one in dark mode the other in light mode." />

As well as themed versions that can dynamically re-paint to match my blog’s active theme color:

<img src="https://cdn.jim-nielsen.com/blog/2022/stats-themed-light.png" width="1447" height="525" alt="Two identical bar charts side by side in light mode, one colored blue the other red." />

<img src="https://cdn.jim-nielsen.com/blog/2022/stats-themed-dark.png" width="1447" height="525" alt="Two identical bar charts side by side in dark mode, one colored yellow the other green." />

I’ll probably do more with this page in the future, but for now I’m satisfied. You can check it out [here](https://blog.jim-nielsen.com/about/).