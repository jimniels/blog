---
title: Improving Server-Side Rendering with React
tags: engineering
---

tldr: if you’re using `react-dom/server` to render a large number of static files and you’re seeing a significant degradation in performance, setting `NODE_ENV` to `production` could significantly improve your situation (this was true at the time of this writing—React 16.8.3).

---

I recently made a “under-the-hood” change for my [icon](https://www.iosicongallery.com/) [gallery](https://macosicongallery.com) [sites](https://www.watchosicongallery.com): I switched from using EJS  templates to JSX (React) templates (the details behind this really deserve their own post...I’ll have to do that later). 

Switching to JSX is something I’ve been wanting to do for a while. I wanted to leverage JSX when I first setup [metalsmith](https://metalsmith.io) as my static site generator, but using JSX for templating didn’t seem to have a lot of buzz in the metalsmith community and I couldn’t piece together enough disparate pieces of information to get it working. EJS, meanwhile, was mentioned in the metalsmith docs as a viable templating language and had lots of Google-able docs and troubleshooting information, so I went with that because I could get it working. I love the expressiveness of JSX when doing templating because I can “just write JavaScript”, but EJS let me write JavaScript too, so I was happy with it. At least at that moment.

As I got more familiar with how metalsmith worked, my brain began to understand how I could put the pieces together to leverage JSX for templating. So I took the plunge. Once I had it all configured, I found myself running into a strange performance issue.

You see, at first, I didn’t notice the templating system being slow. As I was translating EJS to JSX, I was running my builds on my local development server with a limited number of posts. My static site, [iosicongallery](https://www.iosicongallery.com), has over 1,300 icons (posts) in it and I didn’t need to be generating every single one of those as I fleshed out my templates. So I’d limit the total number of posts being rendered to like 60. This made the iterative feedback loop _really_ fast: make changes, build runs, browser refreshes with latest updates to the templates. Once I got all my templates up and running, I ran my full site build a couple times, just to make sure things were working, and everything worked just fine. In fact, I ran the build in my new JSX branch, then ran it in the old EJS branch, and the build leveraging JSX for templating was ~25% faster than the build leveraging EJS. Cool! So everything’s fine and dandy right?

Not quite. As mentioned, when I was doing local development, I usually set a limit on the number of posts the site was building, just because I didn’t need to build the entire site to make sure my templates were working.

`npm start -- --limit=80` 

To run a production build of my site, I was doing this:

`npm run build`

This was setting `NODE_ENV` to `production` and rendering the _entire_ site, which consisted of over 1,300 individual icon pages. When doing a production build, it wasn’t slow. But I discovered that if I ran my local development server without a posts limit, things got _really_ slow. How slow? At first, it felt like my entire build was just stalling. I would type `npm start` and a minute later, my local development server still wasn’t up and running.

So I started troubleshooting. My build log gave me a rough idea where the bottleneck was happening, so I was quickly able to diagnose the issue as the spot where I was calling `ReactDOMServer.renderToStaticMarkup()` to render the individual page views for each icon. 

![Screenshot of CLI with drawings illustrating the differences in timing](/images/2019/react-dom-server-build-timing-screenshot.png)

You can see how, as I increased the number of individual icon pages being rendered, the build got slower and slower. The strange thing was, this wasn’t happening with the production build. It was nice and quick. So why was my development version running slow? The npm `start` and `build` commands were running the same underlying build command, just with a few environmental configurations, i.e.

- Production build command (fast)
  - `NODE_ENV=production node index.js`
- Local development build command (slow)
  - `node index.js`

So I Google’d keywords around “react dom server rendering NODE_ENV production”. [Turns](https://medium.com/react-university/4-practical-tips-for-drastically-improved-server-side-rendering-in-react-2df98555a26b) [out](https://malloc.fi/performance-cost-of-server-side-rendered-react-node-js), setting `NODE_ENV=production` has drastic speed implications when running react-dom server and rendering to a string.

> By setting `NODE_ENV=production`, there is a 400% performance improvement

Why?

> Because React does a lot of error checking in development mode...In development mode, React spends 75% of its time just checking for error warnings.

I’ve been using React for years and I didn’t know this was a thing. It’s likely there are other people out there like me, hence this blog post.

So how much faster was it to set `NODE_ENV` to `production`? Well, these were my results:

![Chart comparing the build times when NODE_ENV was "production" and when it was not "production"](/images/2019/react-dom-server-build-timing-comparison-chart.png)

- `NODE_ENV !== "production"`
  - 250 icons, 4 seconds
  - 500 icons, 14 seconds
  - 750 icons, 34 seconds
  - 1000 icons, 57 seconds
- `NODE_ENV === "production"`
  - 250 icons, 318 milliseconds
  - 500 icons, 699 milliseconds
  - 750 icons, 1 second
  - 1000 icons, 2 seconds

Moral of the story: if you’re rendering JSX on the server and seeing performance issues, your problems could very well be solved setting `NODE_ENV` to `production`. Granted running in development mode has its benefits. React can possibly catch a lot of errors for you. Just know that if it seems incredibly slow, I guess that’s a known thing and it’s not your fault.
