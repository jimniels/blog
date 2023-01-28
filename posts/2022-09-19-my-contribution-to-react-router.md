#remix

# My Contribution to Launching React Router 6.4

[React Router 6.4 recently launched](https://twitter.com/remix_run/status/1569783085000171521) which includes a number of ideas brought over from Remix as well as a new docs site.

I’m not going to cover what’s in the release (you can visit [the blog post](https://remix.run/blog/react-router-v6.4) for that). Instead, I want to document a my involement in the new site design for [reactrouter.com](https://reactrouter.com).

## A Quick Note on Site Architecture

[Ryan](https://twitter.com/ryanflorence) looped me in on the work for designing the site anew. He came with the ideas for how to structure the site, e.g. how it will be hosted, how it will scale in response to an increase in requests, how it will refresh with new/modified content, etc.

I’m not going to cover the details here, but suffice it to say the new site takes the idea of JAMStack and shifts it back up the stack a nudge. Instead of the classic static site generator approach which pre-compiles every page at build time and puts it on a CDN for request by users, this approach uses a long-running server as an incremental static site generator which compiles each page at request time (if it’s not already in a CDN or [LRU](https://www.npmjs.com/package/lru-cache) cache).

It’s an intriguing model I was enthralled to learn about. Hopefully Ryan writes about it sometime, at which point I’ll link to it.

## The Design

MVP for the new design was pretty standard website stuff:

- Layout: global nav on top, page navigation left, content on the right.
- Typography: system typefaces (fast) with a scale of sizes for structured hierarchy.
- Color: neutral grays with a brand highlight, structured semantically for use in a light and dark scheme.

There were also, as you might guess, components — elements re-used enough to merit an abstraction, like popovers.

<img src="https://cdn.jim-nielsen.com/blog/2022/rr-popovers.png" width="540" height="432" alt="A screenshot of two different popover element designs from the new reactrotuer.com site design: one is a theme switcher, the other is a branch picker." />

Docs callouts:

<img src="https://cdn.jim-nielsen.com/blog/2022/rr-callouts.png" width="1042" height="264" alt="Screenshot of callout components used in doc pages to call attention to specific details." />

And code samples:

<img src="https://cdn.jim-nielsen.com/blog/2022/rr-code-sample.png" width="819" height="537" alt="Screenshot of code blocks in various states, like being prefixed with a file name, being labeled as “Bad code”, or having individual lines highlighted as bad code." />

The summation of these individual details and elements resulted in the new reactrouter.com.

<img src="https://cdn.jim-nielsen.com/blog/2022/rr-new-page-dark.png" width="1292" height="957" alt="Screenshot of the new design for reactrouter.com in dark mode." />

<img src="https://cdn.jim-nielsen.com/blog/2022/rr-new-page-light.png" width="1292" height="957" alt="Screenshot of the  new design for reactrouter.com in light mode." />

For the home page, the idea was to have it function as a kind of “switchboard” for people arriving to the site, e.g. “Welcome to React Router, what would you like to do?” 

It was particularly fun to create and code the supporting imagery of each option. The little blobs were meant to encapsulate the textually-communicated idea in a graphic, abstract form while also providing visual weight and interesting-ness.

<img src="https://cdn.jim-nielsen.com/blog/2022/rr-blobs.png" width="829" height="538" alt="Screenshot of four callouts, each with a heading, descriptive text, and an abstract collection of shapes which communicate the shorthand idea behind each callout." />

The little blobs were drawn with the pen tool in Figma then implemented as SVGs in the code, drawing on dynamic colors which allowed them to support light/dark mode variations as well as simple hover effects to help communicate interactivity.

<img src="https://cdn.jim-nielsen.com/blog/2022/rr-hover-effect.gif" width="412" height="256" alt="Animated gif of one of the callouts being hovered by a cursor and showing the callout border and SVG background changed color interactively." />

### Brand Assets

I also created a “brand” page so folks can easily grab the React Router logo for use in educational materials and otherwise (PR is not yet merged — coming soon to a web near you).

<img src="https://cdn.jim-nielsen.com/blog/2022/rr-new-page-brand.png" width="1487" height="2048" alt="A full-page screenshot of the brand page for React Router, shown side-by-side in light and dark mode." />

### The Docs Demo App

v6.4 of the router comes with a [tutorial](https://reactrouter.com/en/main/start/tutorial) to showcase the new APIs for data loading, mutations, etc.

Ryan created the tutorial and, in the process, created a “Contacts” demo app to illustrate how to build a simple app with the new APIs. 

He asked me for an afternoon to style the thing. So I jumped into the code with my templating/styling nunchucks and shortly had something looking a bit more refined.

<img src="https://cdn.jim-nielsen.com/blog/2022/rr-demo-app-profile.png" width="1083" height="752" alt="Screenshot of the profile page in the “Contacts” demo app for React Router." />

<img src="https://cdn.jim-nielsen.com/blog/2022/rr-demo-app-new.png" width="1083" height="752" alt="Screenshot of the new contact page in the “Contacts” demo app for React Router." />


## The Code

The styling was done with Tailwind. This was my first time  really using Tailwind which helped me understand the hype. The experience helped me see where (in comparison to stylesheets) Tailwind excels but also where it breaks down. (Fortunately for me, I didn’t have the hurdle of setting it all up — Ryan handled making sure all the tooling was in place so when I hit “Save” everything recompiled and reloaded in the browser.)

As part of the home page design, I also carved out some space for designing a bit of social validation in the form of project statistics like GitHub stars and npm downloads.

After shifting around different layouts and configuration of numbers, I eventually landed on a design in Figma that looked like this:

<img src="https://cdn.jim-nielsen.com/blog/2022/rr-statistics.png" width="752" height="350" alt="Screenshot of a design for the “Stats” section on the React Router home page, showing stats for npm downloads and GitHub stars, contributors, and dependents." />

That felt good enough to jump into the browser. But then came the big question: how and where to pull those statistics?

I looked around the internet and found ways to pull live numbers for each statistic, then wrote a function for each stat which would fallback to a hard-coded number I retrieved myself from each service’s respective online UI.

- npm downloads: get it from [npm’s public downloads API](https://github.com/npm/registry/blob/master/docs/download-counts.md)
- GitHub contributors: pull it from [a GitHub API header](https://stackoverflow.com/questions/44347339/github-api-how-efficiently-get-the-total-contributors-amount-per-repository/60458265)
- GitHub stars: the octokit library, which we were already using server-side, [returns stars with a repo’s info](https://docs.github.com/en/rest/repos/repos)
- GitHub dependents: never figured out a way to get this, so I pulled it from [the UI](https://github.com/remix-run/react-router/network/dependents?package_id=UGFja2FnZS00OTM0MDEzMDg%3D)

The code for each stat looked something like this:

```js
/**
 * Fetch a number for ___ from service ___
 * @returns {number}
 */
async function fetchStatFromService() {
  try {
    const res = await fetch(/* service URL */);
    /* massage the data and get what you want */
    return liveNumber;
  } catch (e) {
    console.log("Failed to fetch stat for ___", e);
    /* number retrieved manually on 2022-09-13 from ____ */
    return hardCodedNumber;
  }
}
```

To be honest, I was pretty [surprised](https://twitter.com/jimniels/status/1569800776771600384) by some of the numbers. React Router’s npm downloads is approaching _1 billion_! And that’s only since npm started keeping track. At the time of this writing, [it’s tracking around 8 million downloads per week](https://npmtrends.com/react-router).

## Conclusion

That’s a quick overview of my involvement on the new [reactrouter.com](https://reactrouter.com). Of course, while shipping a v1 design for something is always exciting, seeing what it morphs into after the initial MVP is just as exciting. We’ll see how it evolves going forward. (Here’s to hoping Ryan will publicly document the site’s architecture _elbow, elbow_.)

I really enjoy this kind of work — doing conceptual/visual design and evolving it through implementation with working code. I even got a nice compliment from [Jacob](https://jacobebey.com) in our Discord while posting about some of my design/code work on the project:

> Jim, you’re a special type of designer. IDK if people appreciate it enough so wanted to say it! I mean what other designer is going to write a regex?????

Thanks, Jacob. Always nice to get a compliment. Though I have to admit, whenever I reach for a regex, I usually take that as a sign I need to step away from the computer and consider whether there’s a simpler, more straightforward approach 😂.