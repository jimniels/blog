# Software Over Time

I was listening to [JS Party Ep. 215](https://changelog.com/jsparty/215) and Kent C. Dodds made this observation about our obsessive emphasis on getting a project setup _quickly_:

> Who cares if it takes five minutes or an entire day to get off the ground running if you plan on maintaining this app for the next ten years? […] What I think is way more important is: how maintainable and changeable and adaptable is your app over the long term?

I kind of agree. A fast setup time feels like an agency-centric view of the world: each client gets a cookie-cutter solution, the more projects you can churn through the more money you make (maybe too cynical of a take).

But if you’re setting up something you’re going to maintain for years to come, then you should really scrutinize how easily the project can adapt and change over time. Too bad we can’t have measurements for that! Rather than, “Get set up in under 1 minute,” we might have, “Only requires 1 hour of maintenance per year!” Or, “Supports at least 10 new features without a refactor!”

It only takes 9 month to _setup_ a human but a lifetime to _maintain_ one.

I remember hearing Rich Hickey say something once about how your ability to adapt, change, and evolve software over time _is_ your strategic advantage. I couldn’t find the quote, but I did find [this](https://github.com/matthiasn/talk-transcripts/blob/master/Hickey_Rich/SimpleMadeEasy.md):

> But no matter what technology you use…the complexity will eventually kill you. It will kill you in a way that will make every sprint accomplish less. Most sprints are about completely redoing things you've already done. And the net effect is you're not moving forward in any significant way.

Your ability to respond to change (not just technologically but organizationally) will be one of your primary competitive advantages. How fast can you synthesize customer feedback and incorporate changes back into your software? If setting up a project quickly is part of that — due to prototyping changes or the like — then fine, setup time is important. But don’t lose sight of _why_ it’s important.

Responding to change in year one of the business as quickly as in year ten of the business would be a phenomenal feat. All companies accumulate complexity over time, which is a weight you drag with you. This seems unavoidable. The complexity and the nuance of the real world will always map itself back into your software systems as bugs, edge cases, etc. Software must be able to flex and bend—without breaking—in response to these effects. Otherwise, to Rich’s point, you eventually hit the point where you’re spending all your time and energy just keeping the old thing running.