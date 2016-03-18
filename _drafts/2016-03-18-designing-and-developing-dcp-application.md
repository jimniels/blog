---
layout: post
date: 2016-03-18
title: Designing and Developing the DCP Application
tags: designProcess
---

My most recent project had me design and develop a new web application for Time Inc. called the “DCP” or “Digital Content Production” application. Using the framework we built for the [Assignment Desk](http://jim-nielsen.com/blog/2016/designing-and-building-assignment-desk/) application, I designed and built roughly the entire view layer of this application over the course of about 2 months.

- This was about modernizing an old application as it transitionted to the new DAM platform.

## Stage 1: Conceptualization

After building the Assignment Desk application/framework, the next application

This is what I had to work with in the beginning:

- A 23-page “workflow requirements” PDF dcp-requirements-pdf.png
- Screenshots of “Aethena”, the application being replaced dcp-athena-screenshot-1.png dcp-athena-screenshot-2.png
- Rough Axure wireframes from the project lead dcp-axure-workflow.png
- Flow diagram of user roles and responsibilities
- Screenshots of other TIME applications (for aesthetic direction) dcp-time-visual-guidelines.png dcp-time-visual-guidelines-2.png

### Flow diagram

Probably the most useful piece of information I initially received was the flow diagram showing how data was supposed to flow through the system and how the application’s end users were tied to this data flow.

![Axure wireframe: user roles and workflow]({{ site.imageurl }}/2016/dcp-axure-workflow.png)

This helped me scope out user roles and responsibilities while also helping define the eventual URL structure of the application.

### Axure

I was provided some rough (let me emphasize the word *rough*) wireframes around the UI/UX for each user in the application.

![A ROUGH Axure wireframe]({{ site.imageurl }}/2016/dcp-axure-print-schedule.png "An example “wireframe” I had to work with.")

They weren’t really wireframes so much as they were half-formed thoughts around what the application’s data would look like and how it should be displayed, edited, and manipulated. For example, here was a wireframe for representing the view for an issue:

![Axure wireframe: Issue view]({{ site.imageurl }}/2016/dcp-issue-view.png "A wireframe of the issue view (which did not take into account varying user roles and responsibilities)")

Note that this wireframe, while representing what data we needed to show, did not take into account any of the nuances of user roles and responsibilities (who could see and edit what data). Contrary to the flow diagram, not all users were supposed to be able to add or edit data in form fields as seen in the screenshot above. Some of the additional roles and responsibilities for different user types were accounted for in other wireframes, but it was never totally clear how (if at all) these screens were related to one another. For example, here were three other wireframes which were supposed to represent the view of an individual issue but with varying actions depending on user role:

![Axure wireframe: outsourcer view]({{ site.imageurl }}/2016/dcp-axure-outsourcer-view.png "Issue view wireframe for the “outsourcer” user.")

![Axure wireframe: brand owner view]({{ site.imageurl }}/2016/dcp-axure-outsourcer-view.png "Issue view wireframe for the “brand owner” user.")

![Axure wireframe: qa view]({{ site.imageurl }}/2016/dcp-axure-qa-view.png "Issue view wireframe for the “QA” user.")

Contrary to what many wireframes do, these wireframes didn’t convey any sense of navigation or hierarchy. It was left completely unclear how a user would get around from one thing to another in the application while understanding the relationship between those things.






## Stage 2: Aesthetics and High-Fidelity Mocks
