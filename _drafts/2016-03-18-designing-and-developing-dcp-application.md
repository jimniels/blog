---
layout: post
date: 2016-03-18
title: Designing and Developing the DCP Application
tags: designProcess
---

My most recent project had me design and develop a new web application for Time Inc. called the “DCP” or “Digital Content Production” application. Using the framework we built for the [Assignment Desk](http://jim-nielsen.com/blog/2016/designing-and-building-assignment-desk/) application, I designed and built roughly the entire view layer of this application over in less than two months.

The main goal of this project was to transition from a very old internal application at Time Inc. called “Athena”, to the new D.A.M. (Digital Asset Management) platform. I had already helped build the [Assignment Desk](http://jim-nielsen.com/blog/2016/designing-and-building-assignment-desk/) application which served as a framework for building other application’s that would interface with the backend D.A.M. layer, so the initial work around application architecture and tooling was largely in place. We had a boilerplate framework built on Node.js + React.js that could create, revise, edit, and delete information from the D.A.M. So a lot of the initial work would be around translating the existing application’s functionality into a web-based application.


## Stage 1: Conceptualization

From the outset of this project, I was given a few resources to help me design and build this application:

- A 23-page PDF titled “Workflow Requirements”
- Screenshots of the existing application we would be replacing (named “Athena”)
- Rough Axure wireframes from the project lead
- Flow diagram of user roles and responsibilities
- Screenshots of other TIME applications (for aesthetic direction)


### Athena Screenshots

Time Inc. had an existing application named “Athena” that was being used internally for all digital content production related tasks. I suppose one would call this a “legacy application”, though I can assure you that name does not accurately describe the age of this application. Take a look for yourself:

![Screenshot of the Athena]({{ site.imageurl }}/2016/dcp-athena-screenshot-1.png "The “old” application’s UI for settings article rights restrictions.")

![Screenshot of the Athena]({{ site.imageurl }}/2016/dcp-athena-screenshot-2.png "The “old” application’s UI for looking at the summary of an issue.")

Having screenshots of the existing application was actually quite useful in clarifying any vagueness in how to represent data, user actions, and the like. In being given these screenshots, I was explicitly mandated to not “borrow any of the application’s UI or aesthetics”. I can assure you, I did not have to be told that twice (actually I didn’t need to be told that once).

### Workflow Requirements PDF

Because there was already an application in place with specified functionality, we were given a 23-page PDF that specified, sometimes in a rather convoluted way, the minimum required functionality of the new application. In some ways, this made my task easier because I would not have to go through the old application and write down how the application worked, what data was presented, which buttons completed what actions, and so-forth. For example, rather than having to discover by myself that “Issues” in the system had nine different states and how those states affected the progression of issues through the system, this information was (mostly) documented in the PDF.

![Screenshot of the requirements PDF]({{ site.imageurl }}/2016/dcp-requirements-pdf.png "An excerpt from the 23-page PDF which documented the functionality of the existing application being replaced.")

This PDF served as more of a starting point for conversations and wireframes than it did as a concrete blueprint of what we would be building. A lot of these specifications would change over time. As I designed and developed the application’s UI/UX, we would bring those materials back to the stakeholders to ensure we were on the right track. Those conversations would give rise to existing pain points for end users of the application, which allowed us to revised and edit the requirements PDF to help provide a better application end product.


### Flow Diagram

Probably the most useful piece of information I initially received was the flow diagram showing how data was supposed to flow through the system and how the application’s end users were tied to this data flow.

![Axure wireframe: user roles and workflow]({{ site.imageurl }}/2016/dcp-axure-workflow.png)

This helped me scope out user roles and responsibilities while also helping define the eventual URL structure of the application.


### Axure Wireframes

I was provided some rough (let me emphasize the word *rough*) wireframes around the UI/UX for each user in the application.

![A ROUGH Axure wireframe]({{ site.imageurl }}/2016/dcp-axure-print-schedule.png "An example “wireframe” I had to work with.")

They weren’t really wireframes so much as they were half-formed thoughts around what the application’s data would look like and how it should be displayed, edited, and manipulated. For example, here was a wireframe for representing the view for an issue:

![Axure wireframe: Issue view]({{ site.imageurl }}/2016/dcp-axure-issue-view.png "A wireframe of the issue view (which did not take into account varying user roles and responsibilities)")

Note that this wireframe, while representing what data we needed to show, did not take into account any of the nuances of user roles and responsibilities (who could see and edit what data). Contrary to the flow diagram, not all users were supposed to be able to add or edit data in form fields as seen in the screenshot above. Some of the additional roles and responsibilities for different user types were accounted for in other wireframes, but it was never totally clear how (if at all) these screens were related to one another. For example, here were three other wireframes which were supposed to represent the view of an individual issue but with varying actions depending on user role:

![Axure wireframe: outsourcer view]({{ site.imageurl }}/2016/dcp-axure-outsourcer-view.png "Issue view wireframe for the “outsourcer” user.")

![Axure wireframe: brand owner view]({{ site.imageurl }}/2016/dcp-axure-outsourcer-view.png "Issue view wireframe for the “brand owner” user.")

![Axure wireframe: qa view]({{ site.imageurl }}/2016/dcp-axure-qa-view.png "Issue view wireframe for the “QA” user.")

Contrary to what many wireframes do, these wireframes didn’t convey any sense of navigation or hierarchy. It was left completely unclear how a user would get around from one thing to another in the application while understanding the relationship between those things.


### Screenshots of Other Time Inc. Applications

One of the only points of direction I was given in regards to the aesthetic direction of this new application is that I try to align it with the aesthetic direction of other applications being developed at Time Inc. (for obvious reasons like internal brand consistency, end user application experience continuity, etc.). Although there wasn’t much for me to go off, I was given a few mocks around a publishing tool being developed within Time Inc. along with verbal direction that it be “clean and minimalistic”.

![Screenshot of another application within Time Inc.]({{ site.imageurl }}/2016/dcp-time-visual-guidelines.png "Screenshot of another internal application whose “minimal/clean” aesthetic Time Inc. wanted to imitate for DCP.")


## Stage 2: Sketches and UX

## Stage 3: Aesthetics and Visual Mocks

## Stage 4: Building in React
