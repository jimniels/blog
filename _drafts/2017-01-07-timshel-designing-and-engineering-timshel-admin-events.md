---
title: "Designing and Engineering Event Management for Timshel’s “Admin” Web App"
date: 2017-08-05
tags: designProcess
---

Allow me to preface this piece of writing by saying this post has been a long time coming. It’s been almost a year since I departed [Timshel](https://timshel.com) / [The Groundwork](https://thegroundwork.com) (I miss the people there very mucho), so my recollections of around the “events” (you’ll see) of what happened might be a little fuzzy. Nevertheless, I wanted to get some words and pictures written down around the engineering and design work I did while I was there.

## The Feature

While at Timshel / The Groundwork, one of the web applications I worked on was called “Admin”. It was very aptly named because it was an administrative application for customers and the variety of data associated with their accounts.

One of the features I was tasked on designing and (in-part) engineering was the “Events” portion of the application — think event management. Our customers (or people on their behalf) would organize and host events supporting specific causes and they needed our platform’s software to help manage all facets of throwing such an event: scheduling, invitations, reminders, ticketing, messaging, etc. 

The trickiest part of this feature was that it was intended to be engineered on a world-wide basis, i.e. under the assumption that anyone in the world could be using it. Because events deal in large part with time, that put me down a rabbit hole of computing I hadn’t really explored yet in my career. In the end I learned *a lot* about dates in software (and slice of knowledge that’s proven very useful since). 

## The Design

In collaboration with [one of the best product people](https://twitter.com/nick_alesandro) I’ve had the pleasure of working with, I initially started out on this feature talking through specifications and expectations. This led to sketches and wireframes (which, unforunately, I no longer have) to help flesh out ideas and concepts we were trying to design. Once we arrived at a place that felt like we knew what we we’re doing, I began executing on high-fidelity mocks.

For context: the design (and engineering) team at The Groundwork already had a visual language established for the user interface of the Admin application, so I was able to quickly get up and running in Sketch. I did, however, have the liberty to create new UI components that I felt I needed for my feature but that weren’t available via our pattern library. We had a good iterative process internally that allowed us flexibility in designing and trying new UI components. If they proved effective, we would incorporate them back into our standardized pattern library for usage elsewhere in the application. It felt like the right balance of freedom while maintaining fleixibility and creativity.

### The Events Index Page

First I began working on the events index page. This is where users could go to see all the events associated with their account. On the first iteration, I came up with three separate lists: events occuring “today”, events occuring “in the future”, and “ended” or cancelled events. (FYI: I put those words in quotes because, as you’ll see later, those are time-based words that are relative and mean different things depending on where you are in the world).

![Screenshot of the first design iteration of the events index page]({{ site.imageurl }}/2017/gw-events-index-1.png "First iteration of the events index view")

After an initial round of feedback, I decided to simplify the UI down to a single list which would initially filter all events to just the “Upcoming” ones while any events occuring “today” would be hoisted to the top to lend them prominence. The label for the list would serve as a dropdown filter where the user could then filter by past or cancelled events.

![Screenshot of the second design iteration of the events index page]({{ site.imageurl }}/2017/gw-events-index-2.png "Another iteration of the events index view")

Eventually after more feedback and more feature clarification, I eventually arrived at a design like you see below. It functioned much like the mocks you’ve seen previously, but also took into account events that spanned multiple days.

![Screenshot of the final design iteration of the events index page]({{ site.imageurl }}/2017/gw-events-index-3.png "Final iteration of the events index voew")

One thing worth noting here: having the design of those multi-day events break the vertical alignment of date representations was, in fact, intentional. It was something I thought about a lot and decided to do purposefully. Multi-day events were, in most cases, an exception in the system. So calling them out specifically in the UI by breaking the linear flow was intentional (something [I pointed out on Dribbble](https://dribbble.com/shots/2833368-Event-list-view)). And that’s what design is all about: fulfilling purpose through intentional form. Anyway, I digress...

### The Individual Event Page

Event View

Iteration 1

Upcoming 
Today
Cancelled

Iteration 2

Upcoming
Today
Ended
Cancelled

Iteration 3

Upcoming
Today
Ended
Cancelled
3.gif (overall ux)

Iteration 4

Upcoming
Today
Ended
Cancelled
Create
Upcoming - Messages
Upcoming - Tickets
Upcoming - 

## The (Front-end) Engineering


