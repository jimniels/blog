---
title: Designing Login Screens and Cross-Application Patterns
date: 2017-03-04
tags: designProcess insight
---

One of the tasks I’m tackling at Insight is bringing coherence and consistency to the plethora of user-facing applications that the company offers to its customers. Over the last few months, a few of my colleagues have been dedicatedly working on defining what exactly our offerings are as a company and how they relate to each another. Now that those definitions are beginning to take form, we’re able to start playing with the visual aspect of those relationships and how they’ll play out in our products. It’s easier to communicate to company stakeholders the importance and value of internal product consistency with visuals than it is with words; truly an image is worth a thousand words.

One of my overarching design goals at Insight has been to unify all  applications under one consistent visual aesthetic, making the company’s software offerings look like a consistent, cohesive set of tools. So, taking into account the new aesthetic and visual direction of the company, we decided to try laying down a design direction for a variety of our product login screens. Why login screens? Login screens seemed like a good place to start formulating a design system of patterns and brand hierarchy that could be back-ported into existing products as well as carried forward into future products, i.e. if we created a new web application, we would already have a template for its structure and layout.

At the outset, we knew we had a few different “brands” that would need to be represented in each application, this included:

- The product brand itself
- The product’s parent brand
- The customer’s brand

The product login screens provided a great workspace to explore the relationship between these brands as well as defining common login features and functionality across our internal application.

## v1: Playing with Brand Hierarchy

Designing the login screens dictated that I spend time thinking about how Insights applications would be branded, both to internal and external users. Product name, product family name, and partner/customer brand all had to be taken into account and represeted in the applications somehow.

![Sketch around initial logins]({{ site.imageurl }}/2017/logins-sketch.jpg)

After sketching through some ideas, I took a stab at mocking the login screen for one of our exisiting applications whose aesthetic already aligned (for the most part) with my vision for the overarching visual design direction at Insight. I represented the product brand up top and the customer brand below the login box (as well as in the footer, which would be a persistent UI component, whether you were logged in or not). I additionally accounted for the customer brand by introducing the concept of a theme in the application.

![Version 1 screenshot of AP themed login]({{ site.imageurl }}/2017/logins-v1-ap-sagesure.png "One application offering, themed for a specific customer")

![Version 1 screenshot of AP themed login]({{ site.imageurl }}/2017/logins-v1-ap-fednat.png "Another application offering, themed for a different customer")

Doing these design exercises helped me confront and raise questions about brand hierarchy and business relationships that hadn’t really been broached within the organization. This helped us, as a team, further refine and define our products and business relationships as well as a future direction for design, UX, and engineering efforts.

## v2: Nailing Down Brand Hierarchy and Content

After discussions, feedback, and relevant business context from the CEO, we did another round of iterations on the login screens. This time we had more clear direction around the relationships between Insight’s applications, its customers, and the respective end users. This allowed us to more clearly define visual hierarchy because we gained a better understanding of how our applications related to each other and how they should be perceived by customers as part of a larger business offering. These relationships were reflected in the hierarchy of the new login screen mocks (as well as in the designs for customizable content modules that would be configurable on a per-application/per-customer basis).

![Version 2 screenshot of AP themed login]({{ site.imageurl }}/2017/logins-v2-ap-sagesure.png)

![Version 2 screenshot of AP themed login]({{ site.imageurl }}/2017/logins-v2-ap-fednat.png)

These screens were designed in a modular fashion where their component parts could be extended to work for exisiting internal applications as well as future applications the company might offer. This got us one step closer to a coherent, consistent UI/UX for our product offerings.

![Screenshot of IPCM login]({{ site.imageurl }}/2017/logins-v2-ipcm.png)

![Screenshot of Risk login]({{ site.imageurl }}/2017/logins-v2-risk.png)

This round really helped nail down the relationships between our company’s products, their respective product families, and our customers who buy these tools (both visually in the mocks but also organizationally as a company). The customer brand, in addition to being portrayed in the application’s theme, is represented by being married with the product brand graphically. The login logo is read graphically from left-to-right as two component brand pieces: “{customer-brand} {product-brand}”. It reads in the mind’s eye as: “Company X’s Agent Portal”. Additionally, the product’s family is represented in the footer as a “powered by” or “part of” tag line. In practice, this graphic links to our company’s marketing site where customers can find similar products within that family of software.

## v3: Refining Aesthetics

By this point, we felt we had figured out and correctly defined the relationship between our products, their product families, and our customer/partner brands. However, we got some internal feedback about the aesthetic direction that contradicted the result we had formulated. So, we went back to the aesthetic drawing board. Because we already knew the hierarchical relationships of elements on the page, changing the aesthetic was the easy “design” part. After some thought, I came up with the following screens:

![v3 screenshot of AP theme login]({{ site.imageurl }}/2017/logins-v3-ap-sagesure.png)

![v3 screenshot of AP theme login]({{ site.imageurl }}/2017/logins-v3-ap-fednat.png)

![v3 screenshot of IPCM login]({{ site.imageurl }}/2017/logins-v3-ipcm.png)

![v3 screenshot of Risk login]({{ site.imageurl }}/2017/logins-v3-risk.png)

These screens achieved full buy-in from all stakeholders. They more fully represented and accentuated the product, product family, and customer/partner brands in a hierarchy which reflected our business goals. From our CEO’s perspective, the designs also better represented an aesthetic based on our business’s market position and customer relationships.

Not only did these logins provide more concrete visual direction for our products, but they drove internal discussions about the company and it’s relationships to with its internal employees, its external partners, and its customers and partners. It’s been exciting to see the design work for a set of software products be more than just static mocks to be implemented by a developer in a future sprint. These mocks were part of the driving force behind discovering and concretely defining an identity for the business, its goals, its products, and its relatiohnships with customers, partners, and end users.
