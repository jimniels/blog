---
title: Designing Integrations for Admin at Timshel
date: 2017-04-17
tags: designProcess
---

One of the tasks I had while working at [Timshel](https://timshel.com/) (a.k.a [The Groudwork](https://thegroundwork.com/)) was to design the flow for setting up integrations in our customer-facing application named “[Admin](http://jim-nielsen.com/blog/2016/redesigning-and-engineering-timshel-admin/)”. The very first integration we decided to build was for Stripe but the idea was to generally design a process that would account for setting up integrations with other services in the future.

To begin, I got a walkthrough of the initial work a coworker had completed up to that point. I took that information, along with a list of feature requirements, and internalized them. Once I had a mental model for how the feature was going to work, I began sketching through ideas. These sketches helped me work through visual aesthetics as well as UI functionality and flow. Though some sketches were unique to the specific Stripe implementation I was building, I made sure to generalize any designs so they could be utilized by other service integrations that were planned for future releases.

I sketched various interactions for the individual integration view, i.e. `/org/:orgid/integrations/:id`:

![Photo of individual integration UI sketch]({{ site.imageurl }}/2017/gw-integrations-sketch-1.jpg)

I sketched individual component pieces and their associated functionality, like a input fields and its component states:

![Photo of individual component pieces sketch]({{ site.imageurl }}/2017/gw-integrations-sketch-2.jpg)

I sketched the framework for an “n-number”-stepped linear flow process which would create each integration:

![Photo of integration creation flow sketch]({{ site.imageurl }}/2017/gw-integrations-sketch-3.jpg)

And I sketched some ideas around a “splash screen” for the user when viewing an individual integration that hadn’t been set up yet:

![Photo of integration splash screen sketch]({{ site.imageurl }}/2017/gw-integrations-sketch-4.jpg)

Once I had created rough sketches that depcited all the views and interactions that were needed by the feature, I began creating more high fidelity mocks in Sketch app. Once I had all those worked out, I linked them all together in Invision to get a feel for UI interactions.

I don’t have the individual mocks to show here, but I do have a big animated `.gif` that’ll show what the screens looked like when a user setup the Stripe integration. Enjoy!

![Animated gif for the integrations flow]({{ site.imageurl }}/2017/gw-integrations-flow.gif)