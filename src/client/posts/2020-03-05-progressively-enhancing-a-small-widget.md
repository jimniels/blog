---
tags: engineering
---

# Progressively Enhancing a Small Widget

I recently wrote about [my goal to write 50 blog posts in 2020](https://blog.jim-nielsen.com/2020/50-blog-posts-in-2020/). In that post, I wrote about how I designed a little status widget for my blog’s home screen that automatically keeps track of my progress towards the goal. This post is about my approach to building that widget. It could’ve been built in a myriad of ways, but this is my story of why I did it the way I did.

## The Design

I designed my status widget to represent two different states I could be in towards my goal: 1) on pace towards, and 2) falling behind.

Here’s what “on pace” looked like:

<img src="https://cdn.jim-nielsen.com/blog/2020/progressively-enhancing-on-pace.png" alt="Screenshot of my blog posts status message when I’m on pace." width="629" height="111" />

And here’s “falling behind”:

<img src="https://cdn.jim-nielsen.com/blog/2020/progressively-enhancing-falling-behind.png" alt="Screenshot of my blog posts status message when I’m on pace." width="628" height="111" />

As I faced actually building the widget in code for my blog, I realized I wouldn’t be able to merely render the markup for the widget at build time and be done because the widget requires one important piece of state: the current time.

## Breaking Down the Different States

Let’s break down the two states that can exist in my status message widget and their corresponding messages:

- “On pace: 21 blog posts in 20 weeks.”
- “Falling behind: 18 blog posts in 20 weeks.”

There are three core pieces of information in those statements:

1. Number of blog posts in the year.
2. Number of weeks that’ve passed in the year.
3. Value judgement (“On pace” vs. “Falling behind”). This is an equation based on the first two pieces of information: is the current number of blog posts equal to or more than the number of weeks that’ve passed thus far in the year.

<img src="https://cdn.jim-nielsen.com/blog/2020/progressively-enhanced-sentence-structure.png" alt="Visual breakdown of the component pieces of my status message sentence structure." width="693" height="392" />

My blog is not served dynamically, meaning that at the point in time somebody requests `blog.jim-nielsen.com` an `index.html` file is not _dynamically generated_ and returned by a server somewhere to the user.

Rather, my blog is served statically, meaning that at the point in time somebody requests `blog.jim-nielsen.com` a static `index.html` file that was _generated at some point in time in the past_ is returned to the user. When was that point in time? Who knows. It could’ve been a day ago, a week ago, a month ago, or more (the time at request being the point of reference).

Note the difference between these two: how, and more precisely _when_, an HTML page is generated has a lot to do with how you build the page. In this case, I use the word “dynamic” to mean the page is generated when the user requests it; “static” meaning the page is generated when the site is built.

Why is this relevant? Because those three pieces of information listed above (number of blog posts, number of weeks passed in the year, if blog posts >= weeks passed) are critical to what this status widget looks like. If I was serving this page dynamically, then I could take these pieces of information into account _at request time_. Every time a request came in for  `blog.jim-nielsen.com` the server could ask itself: “what time is it?” Then, based on that answer, it could derive how many weeks have passed, how many blog posts have been written thus far, whether that means “on pace” or “falling behind”, and generate an `index.html` file with the appropriate markup for my status widget _at that point in time_.

But my blog isn’t “dynamic” like this. It’s static. Every time a request comes in for `blog.jim-nielsen.com` a server looks for an _already generated_ `index.html` file. Which means when I’m generating the markup for my status widget, I can’t take into account the number of weeks that’ve passed in the year. If I did, the status message could quickly fall out of date. If I generated my `index.html` file twelve weeks into the year, then somebody asked for it twenty weeks into the year, it would still say we’re only twelve weeks into the year. It would be out of date because my blog only rebuilds when there’s new content. So if I don’t post new content frequently, that widget’s HTML would become out of date.

What does that mean? It means one of two things. First, I could figure out how to automate things so my site re-builds and deploys once a week, even if no content has changed. Then the HTML I send over the network would always be update to date—at least for this widget. Or, I could figure out how to progressively enhance my site so that there’s nuance and interplay between what information gets put in my page at _build time_ and what information enhances the page _at runtime_.

I opt-ed for progressively enhancing the page.

## Progressively Enhancing

So what does it mean to “progressively enhance” the page? 

I opted to make the display of information on my page dynamic _at runtime_ instead of _at request time_. To make things dynamic at runtime I will need JavaScript. But not everyone viewing my page will have JavaScript. Or maybe the user’s browser failed to fetch my JavaScript file. Or maybe the user’s browser blocked the request of my JavaScript file. Or maybe—well, the list goes on and on as to why I can’t guarantee JavaScript will run on my page. So that constraint is precisely what I have to take into account when building this widget: if my JavaScript doesn’t load, what will it look like? 

If I don’t have any JavaScript at runtime it means I can’t possibly know how many weeks have passed in the year. From the HTML’s perspective, that is a dynamic piece of information knowable only at request time on the server or at runtime on the client. In my case, I don’t have a server generating pages at request time. And I may not have JavaScript at runtime, so I have to come up with a plan.

Remember those three core pieces of information I need for my status widget?

<img src="https://cdn.jim-nielsen.com/blog/2020/progressively-enhanced-sentence-structure.png" alt="Visual breakdown of the component pieces of my status message sentence structure." width="693" height="392" />

“Number of blog posts” is simple enough to get. My blog is generated with [metalsmith](https://metalsmith.io). At build time I have a collection of all my blog’s posts, so getting a count of all my posts from the year is pretty straightforward. I can bake that into my widget and, because my site is always rebuilt when I write a new post, that guarantees that number will never be out of date.

“Number of weeks passed in the year” however, is a stateful piece of information based on a point in time for the end user. I can’t bake it into my widget’s markup at build time or it could fall out of sync with the point in time at which the end user accesses the document. And the “value judgement” piece of information is derived from number of blog posts and weeks passed, so I can’t bake that into my markup either. So in this case, progressively enhancing this widget means building the initial HTML for my widget such that it only displays one out of the three core pieces of information: number of blog posts. 

When the initial HTML gets delivered over the network to the browser at request time, this is what would look like without any JavaScript running:

<img src="https://cdn.jim-nielsen.com/blog/2020/progressively-enhanced-no-javascript.png" alt="Screenshot of the status widget without JavaScript present (it only shows the number of blog posts)." width="578" height="109" />

If a user then has JavaScript enabled (and nothing gets in the way of that JavaScript running), I have a script that reaches into the DOM and enhances the information to represent not only how many blog posts have been written, but how many weeks along we are in 2020 and whether I have more blog posts than weeks past. 

## The Code

You can find the code for this widget on [Github](https://github.com/jimniels/blog/blob/master/src/server/BlogPostsStatus.js) but I’ll explain the essence of it here.

This is my widget’s template. My static site generator goes through this template and fills it with data from my site (like `postCount`) and sticks this output in my root `index.html` file. 

```html
<style>
  .blog-posts--good:before {
    content: "👍";
  }
  .blog-posts--bad:before {
    content: "👎";
  }
  /* Other styles for to this widget... */
</style>

<div class="blog-posts">
  <strong data-blog-posts="${postCount}">
    ${postCount} blog posts.
  </strong>
  <!-- Other static text for this widget... -->
</div>

<script>
  // Get the bolded text which has our blog post count
  const $el = document.querySelector("[data-blog-posts]");
  // Get the count of blog posts
  const blogPosts = Number($el.dataset.blogPosts);
  // Get the current week number of the year
  const weekNumber = getWeekNumber();
  // Determine whether we're on pace or not
  const onPace = blogPosts >= weekNumber;

  // Overwrite the bolded text in the widget to include
  // information about how far along in the year we are
  // and whether we're on pace or not.
  $el.innerHTML =
      (onPace ? "On pace: " : "Falling behind: ") +
      blogPosts +
      " posts in " +
      weekNumber +
      " weeks.";

  // Add a class to the widget which will style it according 
  // to whether we're on pace or falling behind.
  document
    .querySelector(".blog-posts")
    .classList.add(onPace
      ? "blog-posts--good"
      : "blog-posts--bad");
</script>
```

Based on the current time in the world when the user views the page, JavaScript can appropriately enhance the data in this widget to communicate whether the number of blog posts that have been written is on pace or not.

<img src="https://cdn.jim-nielsen.com/blog/2020/progressively-enhancing-what-javascript-does.png" alt="Screenshot showing where in the status widget JavaScript updates information based on data at runtime." width="629" height="442" />

FWIW: I didn’t include the code for `getWeekNumber()` in the example. I didn’t write it myself. A quick google search led me to a Stack Overflow answer on [how to get the current week number in JavaScript](https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php). 

## The End

I could have done this quite a few different ways. I could’ve tried to solve this on the server through automated builds. I could’ve rendered nothing on the server and had JavaScript inject the entirety of the status message. But I feel like I struck just the right balance to qualify this as “progressive enhancement”. I rendered all information I could on the server. Then enhanced that information on the client with JavaScript. All in a way that wouldn’t appear broken in either scenario. I like how it turned out. It feels [resilient](https://resilientwebdesign.com).

