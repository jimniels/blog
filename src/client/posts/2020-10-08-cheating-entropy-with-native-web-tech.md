---
tags: thoughts
---

# Cheating Entropy with Native Web Technologies

> 90% of my computer usage is updating computers. – Paul Ford, [Postlight Podcast](https://postlight.com/podcast)

I have a number of old side projects which I occasionally have to revisit. The structure of these projects broadly falls under two categories:

1. Ones I built with a mindset of having my starting point be the most basic, native web technology available. From that foundation, I enhanced functionality through layering on more sophisticated and experimental techniques, APIs, etc., where supported. All code was authored in vanilla HTML, CSS, and JavaScript. 
2. Ones I built with a mindset of having my starting point be abstractions of native web technology (frameworks, tooling, language sub/supersets).

When I open an old project like number two (described above), I find entropy staring me back in the face: library updates, breaking API changes, refactored mental models, and possible downright obsolescence. An incredible amount of effort will be required to make a simple change, test it, and get it live.

Conversely when I open an old project like number one (described above), I find myself relieved. A project authored in native web technologies, enhanced with an eye towards the future, with little or no tooling, leaves me facing few obstacles. Remove a couple shims that are no longer needed and that’s about it. Imagine that: you can remove code to update a project?

The contrast between these two approaches has been on my mind as of late and spurred me to write down my thoughts.

> Any time you’re doing a side project, the first few days is really just fighting build tools, like “Okay, I wanted Sass, but now I’m stuck.” – Dave Rupert, [Shop Talk Show #432](https://shoptalkshow.com/432/):

HTML 4 and HTML 5, CSS 2 and CSS 3, those numbers aren’t about semver and communicating breaking change. HTML 4 and HTML 5 is very different than Angular 1 and Angular 2. The promise of the web is that there are no breaking changes. HTML, CSS, and JS are, in a semver sense, still at version `1.x`. Whatever you wrote in 2018 or 2008 will still work. On the other hand, a project built on abstractions from native web technologies—frameworks, tooling, language sub/supersets—will contain innumerable dependencies with countless major version changes over time. Updating a single dependency often requires updating _everything_. Building on top of base web technologies, where possible, is a way to cheat the entropy and churn of modern web technology abstractions.

This is why, over years of building for the web, I have learned  that I can significantly cut down on the entropy my future self will have to face by authoring web projects in vanilla HTML, CSS, and JS. I like to ask myself questions like:

- Could this be done with native ES modules instead of using a bundler?
- Could I do this with DOM scripting instead of using a JS framework?
- Could I author this in CSS instead of choosing a preprocessor? 

The more I author code _as it will be run by the browser_ the easier it will be to maintain that code over time, despite its perceived inferior developer ergonomics (remember, developer experience encompasses both the present _and the future_, i.e. “how simple are the ergonomics to build this now _and maintain it into the future_?) I don’t mind typing some extra characters _now_ if it means I don’t have to learn/relearn, setup, configure, integrate, update, maintain, and inevitably troubleshoot a build tool or framework _later_.

In my experience, authoring vanilla CSS using selectors that largely repeat is easier than more tersely authoring nested selectors but having to maintain Sass over time. 

Similarly, authoring vanilla JS without language transpilation, bundling, etc., is easier than building and maintaining something like Babel + Webpack over time.

Take a moment and think about this super power: if you write vanilla HTML, CSS, and JS, all you have to do is put that code in a web browser and it runs. Edit a file, refresh the page, you’ve got a feedback cycle. As soon as you introduce tooling, as soon as you introduce an abstraction not native to the browser, you may have to invent the universe for a feedback cycle. No longer writing CSS and instead writing Sass? Now you need a development server with a build process to watch your files and compile your changes _just to develop and test your project_. You’ve just added a giant, blocking dependency for your project to work. And if you can’t get that dependency working, your project is dead in the water until you can—both now and in the future. 