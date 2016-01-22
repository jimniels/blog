---
layout: post
title: Designing and Building the Assignment Desk Application
date: 2016-01-21
tags: designProcess
---

A recent project brought me in touch with Time Inc., the parent company of many iconic magazines like TIME, Sports Illustrated, People, and [more](http://www.timeinc.com/brands/). In conjunction with one of [my favorite front-end developers (damassi)](http://damassi.github.io), we were brought in and tasked with building an application on an extremely tight deadline. A lot of the infrastructure and services as far as a back-end platform were already in place. Our task would be building a front-end service on their new platform. A lot of the decisions around the technology and stack for the app were already made: the app was to be built on React.js using the Bootstrap UI framework with a custom theme that had already been purchased specifically for this project. At the outset, I was given a flowchart documenting the business process we would be basing the application on, as well as a few rough mocks done by the project lead.

![User flow diagram]({{site.imageurl}}/2016/assignment-desk-workflow-screenshot.png "The process flowchart")

So with this base, I began my design process by studying and understanding the mocks and the  flowchart. This helped me grasp the problems we were trying to solve and purpose of the application. After a few conversations with the project lead around timelines, expectations, and other constraints, I realized that first iteration of this thing would essentially be a glorified database viewer — a simple UI experience around getting things out of and putting things into Time’s new platform for digital assets (all of this supporting the business process and needs of employees).

![Rough mocks of the app done by project lead]({{site.imageurl}}/2016/assignment-desk-axure-screenshots.png "My reference point for the vision of the app: a few rough mocks done by project lead")


## Architecting

In our first few days, we had a lot of information being dumped on us about the project as well as ideas around its past, present, and future. This description of the project’s history and scope, in conjunction with the tight deadline, began to make the endeavor feel a little overwhelming.

Because so many of the expectations around this application were not actually specified anywhere in writing but were mostly shared conceptual ideas amongst different people, I decided the best way to start would be to begin writing it all down and get everyone involved to agree on it. And a great place to start on outlining an application is in its URL structure. This always helps define your app from both a technical and design perspective because you begin to fully see the entities that will exist in the application as well as their relationships and how you navigate from one to the next. It also helps you see what parts in the application are similar and can thus share design and functionality and which parts of the application will require their own unique solutions.

So I started with a simple `.md` file with notes around URL structure, shared design patterns, and questions I had along the way. Here’s an example excerpt of that:

```
# Unique Views

/ [login] - [home page -> assignments]


## Shared Views

/assignments              List view
/assignments/:id          Item view
/assignments/:id/edit     Create/Edit view
/assignments/create       Create/Edit view

/vendors                  List view
/vendors/:id              Item view
/vendors/:id/edit         Create/Edit view
/vendors/create           Create/Edit view

/contracts                List view
/contracts/:id            Item view (serve a PDF)
/contracts/:id/edit       ? Can you edit an existing contract
/contracts/create         Create/Edit view


## List View Component Specs

/assignments
  - Table
    - Name (link) / description
    - ID
    - Status
    - Due date
  - Search
    - Name
  - Filter
    - ???

/vendors
  - Table
    - Name (link)
    - Agency
    - Type (multiple?)
    - City
    - Email
  - Search
    - Name
  - Filter
    - ???

/contracts
  - ID
  - Name (link)
  - Contract (link)
  - Status
  - Brand
  - Effective Date
```

Writing these specifications down really helped me get a grasp on the design components I would need to come up with: list views, individual item views, “outside the app” pages (`/login`, `/logout`, etc), system error pages, and the like. Having it all written down somewhere was also very beneficial because I was able to go bring it back to the project lead and get sign-off while also gaining any further clarity from his perspective (as well as anything else that may have been missed).


## Drawing, Wireframing, and Sketch(-ing)

Based on the specifications I had in writing, I began drawing sketches to communicate to help better visually explain the navigation of the app, each entity’s relationship to one another, and the overall architecture (technically as well as from a componential design perspective). These drawings and wireframes helped produce buy-in and approval from stakeholders and allowed me to begin working on more high-fidelity mocks. It also gave our front-end developer enough information to begin working on a project scaffolding in terms of the codebase. So my work helped get all the wheels churning asynchronously.

As I discovered many of the views could share patterns designs components, I didn’t spend a lot of time in Sketch designing perfect mocks for each view. Instead I worked on a few simple views like `/login`, entity list views, and individual entity views to get a general idea of layout, typography, colors, etc. For example, here’s the `/login` page:

![Screenshot of login screen]({{site.imageurl}}/2016/assignment-desk-login.png)

And here’s an example of an individual entity‘s view:

![Screenshot of assignment page view]({{site.imageurl}}/2016/assignment-desk-assignment-view.png)

And here’s an example of that single design pattern shared across three different entity views (contracts, assignments, and vendors):

![Screenshot of contract, assignment, and vendor views]({{site.imageurl}}/2016/assignment-desk-item-views.png)

Another pattern that was discovered which easily lent itself to sharing design and code was the list view: a table list of entities with controls like sort, search, and filter. I designed these views in such a way to easily share visual designs which not only helped reinforce a feeling of familiarity and consistent expectations for the end-user, but also helped cut down implementation time when writing React components. Here’s an example of the three completed list views (`/contracts`, `/assignments`, and `/vendors`) as navigated in the browser. Notice how their componential design easily shares UI patterns as well as code (the same type of pattern and code shared was done for the “Create” and “Edit” views for each entity):

![Animation of navigation between three list views]({{site.imageurl}}/2016/assignment-desk-list-views.gif)

Once I had static mocks in a nearly completed state, it was an asynchronous process of implementing them in tandem with the front-end developer. I was writing CSS and React components to bring each of these mocks alive, while the fron-end developer was wiring the flow of data from the back-end to the client .

At times I would dive back into sketch to figure out the designs for individual components on a page. For example, one of the required widgets we had to build specified that the user would need to be able to select different brands and view content in the application based on the currently selected brand. For this, I designed a button in the application bar with the current brand’s logo which provided brand context to the page’s content, but clicking it provided a modal where the user could change their brand context:

![Screenshot of brand switch modal]({{site.imageurl}}/2016/assignment-desk-brand-switcher.png)

There were also other views that I jumped into sketch to design before implementing in the browser. This included views like the system error and 404 pages, where I spent a little time refining an “Error” graphic:

![Screenshot of system error page]({{site.imageurl}}/2016/assignment-desk-system-error.png)

![Screenshot of 404 page]({{site.imageurl}}/2016/assignment-desk-404.png)

As you can see, this project demanded a kind of a “as you go” process. A lot of the visual style was developed up front in Sketch (in accordance with preset visual brand guidelines from the client) based on a few basic views, and then each succeeding view or component was built upon that visual groundwork as new requirements and features came in from the project lead. As such, **my sketch files weren’t necessarily the “set in stone” visuals of the app, but more of a sandbox for discovering and refining  component designs.** These mocks would serve me as guides for implementing each component or view in the browser. Additionally, they would also serve as visuals to convey the direction of the product to stakeholders.

## Style Guide(-ing)

Because this project had the additional scope of serving as a boilerplate of sorts for future applications that would communicate with the client’s back-end platform, I also developed a kind of style guide (well, at the time of publishing this post it’s still a work in process) which would serve as a benchmark for keeping visuals consistent across this and any other applications that might be built in the future.

![Screenshot of basic application style guide]({{site.imageurl}}/2016/assignment-desk-style-guide.png)

## Conclusion(ing)

It was really neat to see how quickly we could build this app. Granted it wasn’t a beast in terms of complexity, but that was partly because we made it that way. Up front we had to cut anything that was unnecessary and unify any patterns we could in order to ship something as fast as we did. From this point forward, the application has now taken a more product-centric approach of getting user feedback and incorporating it back into the application while simultaneously figuring out ways to improve and enhance the basic design and functionality the app was built on.
