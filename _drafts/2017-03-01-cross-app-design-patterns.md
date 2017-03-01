---
title: Designing Login Screens and Cross-Application Patterns
date: 2017-02-28
tags: designProcess insight
---

One of the tasks I’m tackling at Insight is bringing coherence and consistency to the plethora of user-facing applications the company offers to the customers. Over the last six months or so, a few of my colleagues have been dedicatedly working on defining what exactly our offerings are as a company and how they relate to each another. Now that those definitions are beginning to take form, we’re able to start playing with the visual aspect of those relationships and how they’ll play out in our applications. It’s easier to communicate to company stakeholders the importance and value of internal product consistency with visuals than it is with words. As they say: an image says a thousand words.

One of my big design goals at Insight has been unify all our applications under one consistent visual aesthetic which would make our company’s software offerings looked like a cohesive set of tools. Taking into account the new aesthetic and visual direction we would be taking, we decided to try laying down a design direction for a variety of our product login screens. Why login screens? Login screens seemed like a good place to start formulating a design system of patterns and brand hierarchy that could be back-ported into existing products as well as carried forward into future products, i.e. if we created a new web application product, we would already have a template for its structure and layout.

At the outset, we knew we had a few different “brands” that would need to be represented in each application, this included:

- The product brand itself
- The product’s parent brand
- The customer’s brand

The product login screens provided a great workspace to explore the relationship between these brands as well as defining common login features and functionality across our internal application.

## v1: Playing with Brand Hierarchy

Initially We had to  think about how these portals and applications would be branded, as the product name, product family, and customer name all needed to be represented somehow.

![Sketch around initial logins]({{ site.imageurl }}/2017/logins-sketch.jpg)

After sketching through some ideas, I took a stab at redesigning the login screens for one of our existing applications and making its aesthetic align with our visual design direction. I represented the product brand up top and the customer brand below the login box (as well as in the footer, which would be a persistent UI component, whether you were logged in or not). I additionally accounted for the customer brand by introducing the concept of a theme in the application.

![Version 1 screenshot of AP themed login]({{ site.imageurl }}/2017/logins-v1-ap-sagesure.png "One application offering, themed for a specific customer")

![Version 1 screenshot of AP themed login]({{ site.imageurl }}/2017/logins-v1-ap-fednat.png "Another application offering, themed for a different customer")

Doing these design exercises helped me confront and raise questions about brand hierarchy and business relationships that hadn’t really been broached within the organization. This helped us, as a team, further refine and define our products and business relationships as well as a future direction for design, UX, and engineering efforts.

## v2: Nailing Down Brand Hierarchy and Content

After discussions, feedback, and relevant business context from the CEO, we did another round of iterations on the login screens. This time we had more clear direction around the relationships between applications, customers, and products. We could more clearly define what direction we want to take our existing products, how they relate to each other, and how they should be perceived by customers as part of a larger business offering. These relationships were reflected in the new login screen mocks, as well as designs for customizable content modules that would be configurable on a per-application/per-customer basis.

![Version 2 screenshot of AP themed login]({{ site.imageurl }}/2017/logins-v2-ap-sagesure.png)

![Version 2 screenshot of AP themed login]({{ site.imageurl }}/2017/logins-v2-ap-fednat.png)

These login screens were designed in modular way where their component parts could be extended to work for other internal applications as well as any future applications the company may offer as customer-facing products. This got us one step closer to a coherent, consistent UI/UX for our product offerings, as well as a more defined hierarchical definition about how our applications/products relate to one another and how they relate to the brands of customers who use them.

![Screenshot of IPCM login]({{ site.imageurl }}/2017/logins-v2-ipcm.png)

![Screenshot of Risk login]({{ site.imageurl }}/2017/logins-v2-risk.png)

This round really helped us nail down the relationships (both visually in the mocks, but also organizationally as a company) between our company’s products, their respective product families, and our customers who buy these tools. The customer’s brand is represented next to our branded product graphically as well as being portrayed in the application’s theme. For our product “Agent Portal”, a customer would have an application instance themed to their brand colors and the product logo could graphically be read left-to-right as “{company-glyph} AgentPortal”. Converting graphics to more natural language, it would read in the mind’s eye as: “Company X’s Agent Portal”. In addition, the product’s family, as it relates to our company, would be represented in the footer, almost as a “powered by” or “part of” tag line that would link to our company’s marketing site where customers could find similar products within that suite of software.

## v3: Refining Aesthetics

By this point, we felt we had figured out and correctly defined the relationship between our products, their product families, and our customer’s brand. However, we got some internal feedback about the aesthetic direction that contradicted the result we had formulated. So, we went back to the aesthetic drawing board. Because we already knew the hierarchical relationships of elements on the page, changing the aesthetic was the easy part. After some thought, I came up with the following screens:

![v3 screenshot of AP theme login]({{ site.imageurl }}/2017/logins-v3-ap-sagesure.png)

![v3 screenshot of AP theme login]({{ site.imageurl }}/2017/logins-v3-ap-fednat.png)

![v3 screenshot of IPCM login]({{ site.imageurl }}/2017/logins-v3-ipcm.png)

![v3 screenshot of Risk login]({{ site.imageurl }}/2017/logins-v3-risk.png)

These screens achieved full buy-in from all stakeholders. They more fully represented and accentuated the product/product family/customer brands in the hierarchy we wanted. From our CEO’s perspective, they also better represented an aesthetic based on our business’s market position and customer relationships.

## Further Work

More work has gone in to these designs prior to the actual implementation. We’ve further outlined all the features we need across all application login screens, things like: login, password reset, account activation, etc. Now we are at the point of laying out an front-end implementation plan for sharing code, styles, etc., across all of our applications based on these designs as guides.