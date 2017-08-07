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

![Screenshot of the final design iteration of the events index page]({{ site.imageurl }}/2017/gw-events-index-3.png "Final iteration of the events index view")

One thing worth noting here: having the design of those multi-day events break the vertical alignment of date representations was, in fact, intentional. It was something I thought about a lot and decided to do purposefully. Multi-day events were, in most cases, an exception in the system. So calling them out specifically in the UI by breaking the linear flow was intentional (something [I pointed out on Dribbble](https://dribbble.com/shots/2833368-Event-list-view)). And that’s what design is all about: fulfilling purpose through intentional form. Anyway, I digress...

### The Individual Event View

Another event management view I tackeled was the individual view of an event. This is where users could see meta information around their event, like date and time, location, and description. This view also served as the central location for viewing additional information associated with the event, like the number of tickets for the event and time-based information around the ticketing. For example, if it was an upcoming event, they could see how many tickets had been sold and the contact information associated with each ticket. Whereas if it were an event in the past, they could see who actually came and redeemed their tickets. If it were an event ocurring today, they would see a UI for checking-in individual guests and redeeming tickets. As you can see, a lot of the user interface was date-based and would change based on the date of the event, as users’ needs changed based on the date.

#### The First Iteration

Designing the first iteration gave me a better sense of the overall relationships between different pieces of information. In hindsight, I over-designed the UI on the first pass in trying to communicate everything (like RSVP state through individual icons) when not everything needed to be communicated. This became apparent when I tried showing the designs to other designers and trying to communicate *everything* that was going on in the UI. It was just too much, but that was a good exercise in making me go back to the drawing board and really define what pieces of information were most pertinent.

![Screenshot of the first iteration of the individual event view for an upcoming event]({{ site.imageurl }}/2017/gw-event-1-upcoming.png "First iteration design of an “upcoming” event")

![Screenshot of the first iteration of the individual event view for an event occuring today]({{ site.imageurl }}/2017/gw-event-1-today.png "First iteration design of an event occuring “today” which features revealed functionality based on the date of the event, like the ability to check-in people to the event.")

![Screenshot of the first iteration of the individual event view for a cancelled event]({{ site.imageurl }}/2017/gw-event-1-cancelled.png "First iteration design of a cancelled event, which features a prominent UI alert denoting this event has been cancelled.")

#### The Second Iteration

The second iteration moved some of the pieces of information around to more relevant locations, but in hindsight I still didn’t go far enough in fully removing unnecessary complexity. Most of the individual pieces of the UI stayed the same but a better hierarchy and inter-relationship between parts was achieved.

![Screenshot of the second iteration of the individual event view for an upcoming event]({{ site.imageurl }}/2017/gw-event-2-upcoming.png "Second iteration design of an “upcoming” event which moved RSVP status below under the “People” tab.")

![Screenshot of the second iteration of the individual event view for an event occuring today]({{ site.imageurl }}/2017/gw-event-2-today.png "Second iteration design of an event occuring “today” which fleshed out user input for checking in people to the event.")

![Screenshot of the second iteration of the individual event view for a cancelled event]({{ site.imageurl }}/2017/gw-event-2-cancelled.png "Second iteration design of a cancelled event.")

#### The Third Iteration

The third iteration was where I feel like I did a much better job of simplifying the usage of icons down to just the important possibilities: ticketed and checked-in. The more fine-grained details of a person’s status related to the event is communicated via text. Narrowing down this usage of icons so they communicate only the most important status vs. all the statuses was a big help in making the page more digestable.

You’ll also notice the more graphical representation of the event’s date. This felt like a solid enhancement that really helped better visually anchor the design of the page and communicate the timeliness of what the user was looking at. 

![Screenshot of the third iteration of the individual event view for an upcoming event]({{ site.imageurl }}/2017/gw-event-3-upcoming.png "Third iteration design of an “upcoming” event which narrowed and simplified the usage of icons to communicate meaning.")

![Screenshot of the third iteration of the individual event view for an event occuring today]({{ site.imageurl }}/2017/gw-event-3-today.png "Third iteration design of an event occuring “today”. Note the enhanced graphical representation of the event’s date.")

![Screenshot of the third iteration of the individual event view for an event that has ended]({{ site.imageurl }}/2017/gw-event-3-ended.png "Third iteration design of an event that has ended.")

![Screenshot of the third iteration of the individual event view for a cancelled event]({{ site.imageurl }}/2017/gw-event-3-cancelled.png "Third iteration design of a cancelled event.")

#### The Fourth (and Relatively-Final) Iteration

This fourth and final iteration got us to a place where we felt we could start building an MVP. It explored a few variations in minor UI sections for dealing with edge cases (which you might notice, like multi-day events) but overall gave us a good sense of how everything was going to fit together as a whole.

![Screenshot of the fourth iteration of the individual event view for an upcoming event]({{ site.imageurl }}/2017/gw-event-4-upcoming.png "Fourth iteration design of an “upcoming” event. Note the alternate design of the calendar for a multi-day event.")

![Screenshot of the fourth iteration of the individual event view for an event occuring today]({{ site.imageurl }}/2017/gw-event-4-today.png "Fourth iteration design of an event occuring “today”.")

![Screenshot of the fourth iteration of the individual event view for a cancelled event]({{ site.imageurl }}/2017/gw-event-4-cancelled.png "Fourth iteration design of a cancelled event which explored using a more text-based approach to communicating the cancelled state.")

### The Create/Edit Event View

There’s always the need for users to create events. This UI covered that, in addition to editing events which was the same UI just populated with data.

![Screenshot of the create event view]({{ site.imageurl }}/2017/gw-event-create.png "View when creating a new event.")

### The Messages Tab on the Event View

One of the tabs on the events view was the “Messages” tab, which allowed users to manage all messaging associated with an event. For example, if the administrator of an event wanted to send out a message to invited guests (or a subset of invited guests, like only guests who have RSVP’d) they could use this UI in the context of the event to send out an email blast.

The messages UI was a list by default that you could expand/collapse for more detail. At the top of the list was the ability to create a new message which provided a stepped UI process for creating and sending messages to people associated with the event.

![Screenshot of the default messages view on the event view]({{ site.imageurl }}/2017/gw-event-messages.png "Default messages view was an index of all  messages for the event, sorted by date.")

![Screenshot of the expanded default messages view on the event view]({{ site.imageurl }}/2017/gw-event-messages-expanded.png "Clicking on any message set would reveal additional meta information about the message.")

![Screenshot of the one step in the create message process on the event view]({{ site.imageurl }}/2017/gw-event-messages-create.png "Step 2 of the “Create Message” process where users could specify custom recipients manually or via a .csv upload.")

The “Create Message” process was somewhat sophisticated in what it allowed users to do, which is why I broke it up into a stepped process. Many of the different steps were dependent on choices made in prior steps, so the UI would change based on your decisions when creating a message. For example, you could  detai the recipients of your message manually, either by specifying them one-by-one or by uploading a `.csv` file. Additionally, there was a case where you would be provided a “smart set” recipients for common actions like sending a reminder message to all invitees who had not yet responded to your invitation. You can see an example of how this all played out in this animated .gif of the “Create Message” process:

![Animated gif of stepped process to create a message on the event view]({{ site.imageurl }}/2017/gw-event-messages-create.gif "Example UX flow when creating a new message.")

### Stitching it All Together

Once I had these different views and variations based on event timeliness, I stitched them together into an Invision mock so that stakeholders could click through the different UIs and get a better sense of the overall UX, which looked something like this (excuse the not-so-great visual fidelity of the .gif):

![Animated gif of the event UX]({{ site.imageurl }}/2017/gw-events-ux-flow.gif "An example of navigating the events user interface.")

## The (Front-end) Engineering

Timezone debaucle (tests failing every day about 7pm my time which i learned was when it hit midnight UTC. Those have got to be correlated.)

I wrote the view layer while [damassi](http://damassi.github.io) worked on a lot of the plumbing and architecture (like wiring up API calls).

DO A SPELL CHECK DUMMY!

