# The Case for Design Engineers

If I had to put myself into one of the buckets that constitute job titles, [“Design Engineer”](https://adactio.com/journal/17838) might be closest to my own sense of self-identification. That or just plain old “Web Designer”—there’s just [so many jobs](https://chriscoyier.net/2022/05/25/thats-a-lot-of-jobs/) when it comes to building software.

Anyhow, I recently read [“Traditional Web Design Process is Fundamentally Broken”](https://cloudfour.com/thinks/traditional-web-design-process-is-fundamentally-broken/) by  Jason Grigsby and it resonated with me _so much_!

For responsive design, there are Too. Many. Artifacts. You’ve got sketches and wireframes and mockups and prototypes. And for each of those you need at least three variations: “desktop”, “tablet” and “mobile” (whatever those mean). As the article suggests, you could be looking at up to 60 artifacts _per design iteration_. It’s ludicrous. 

> Worse, the designs are misleading. There is no one size for mobile, tablet, or desktop. Current generation iOS devices account for thirteen breakpoints on their own. These static wireframes and mockups leave to the imagination any screen sizes other than the three specified.
> 
> This is the worst of all worlds—a waterfall process creating dozens of artifacts, none of which accurately capture how the design will look and behave in the browser.

This article absolutely nails it.

I don’t know what the solution is to this problem, but two thoughts come immediately to mind: 1) the value of design engineers, and 2) something about declarative design.

First, the value of design engineers.

The problem of innumerable artifacts helps show why design engineers are worth their weight in gold. They can bridge the chasm of design to browser engineering, skipping the need for 60+ artifacts. How? They have an understanding of the constraints of the medium, so from sketches to wireframe to high fidelity mocks, they only have to produce one or two artifacts while simultaneously keeping a picture in their head of how the elements of those designs flex and flow and change across different sizes. They can imagine how it works, so they don’t have to articulate it for every iteration. There’s no need to explicitly design and document all possible states for whoever is downstream of the designs because _they are the ones downstream of the designs_.

Second, the value of declarative design.

In an earlier post thinking about the problem of media queries, [I asked](https://blog.jim-nielsen.com/2022/exerting-control-with-media-queries/):

>  At what quantity does a set of declarative rules begin to look like imperative instructions?

This feels akin to the problem described by Jason above—this idea of “declarative” feature design (a couple mocks, a few rules, and a design engineer) vs. “imperative” feature design (innumerable mocks and rules along with a strict, waterfall process between designers and developers). At what quantity of artifacts does your design process start to look imperative vs. declarative?

I don’t know. Maybe that’s not quite the right framing. But the idea of [declarative design](https://adactio.com/journal/18982) feels applicable here in some form or fashion and I’m not sure how you achieve that without a role like “design engineer”.