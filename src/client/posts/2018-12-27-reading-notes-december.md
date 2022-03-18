#readingNotes

# Reading Notes, December 2018

## Article: [“React v16.7: No, This Is Not The One With Hooks”](https://reactjs.org/blog/2018/12/19/react-v-16-7.html) via reactjs.org

I like how transparent and intentional the react team is with what they do. When there are significant or strategic changes, they don’t just say “here’s a new release” and plop something onto npm. Their corresponding release blog posts explain _what_ they did and _why_ they did it.

This particular post is a great example of their thoroughness. They explain their theoretical position on semver and why they intentionally release the way they do. I love it.

> Patches are the most important type of release because they sometimes contain critical bug fixes. That means patch releases have a higher bar for reliability. It’s unacceptable for a patch to introduce additional bugs, because if people come to distrust patches, it compromises our ability to fix critical bugs when they arise — for example, to fix a security vulnerability

They also touched on their regret for how they versioned their recent releases: they conflated their software release version (“semver”) with their marketing release version (“hooks”) (and it came back to bite them in the butt). This is something we’d all do well to remember:

> At React Conf, we said that 16.7 would be the first release to include Hooks. This was a mistake. We shouldn’t have attached a specific version number to an unreleased feature. We’ll avoid this in the future.

Good principles to remember.

## Article: [“Optimized for Change”](https://overreacted.io/optimized-for-change/) by Dan Abramov

What’s a crucial aspect of designing APIs?

> The best API designers I know don’t stop at the “first order” aspects like readability. They dedicate just as much, if not more, effort to what I call the “second order” API design: how code using this API would evolve over time.
>
> A slight change in requirements can make the most elegant code fall apart...[great APIs] are optimized for change.

## Article: [“JIRA is an Antipattern”](https://techcrunch.com/2018/12/09/jira-is-an-antipattern/) via techcrunch

> One thing that writing elegant software has in common with art: its crafters should remain cognizant of the overall macro vision of the project, at the same time they are working on its smallest micro details. JIRA, alas, implicitly teaches everyone to ignore the larger vision while focusing on details. There is no whole...JIRA encourages the disintegration of the macro vision.

A scathing assessment of how Jira is commonly used. Personally, I like the author’s conclusion: Jira can be great for issue tracking, but for anything larger it works against you. I also like the suggestion of prose as a description of the project. If we all had to write out – in natural language – what we were doing in software, I think we’d discover a lot more holes in our thinking which we’d then be forced to patch up. Jira makes it easy for you to bypass all of that and just write simple, vague depictions of what you’re trying to do.

## Article: [“Why Doctors Hate Their Computers”](https://www.newyorker.com/magazine/2018/11/12/why-doctors-hate-their-computers) by Atul Gawande via The New Yorker

A fascinating look at technology’s influence on doctors (based on years of experience by a well-renowned doctor).

First, there’s the realization that some of the constraints prior to digitalization were actually beneficial:

> piecing together what’s important about the patient’s history is at times actually harder than when [we] had to leaf through a sheaf of paper records. Doctors’ handwritten notes were brief and to the point. With computers, however, the shortcut is to paste in whole blocks of information—an entire two-page imaging report, say—rather than selecting the relevant details. The next doctor must hunt through several pages to find what really matters.

That’s when you start to realize that technology has its benefits, but you likely traded one set of problems for another. For doctors, apparently technology is becoming so overbearing that we’re hiring for jobs which didn’t exist to handle the computerization of everything:

> We replaced paper with computers because paper was inefficient. Now computers have become inefficient, so we’re hiring more humans [to complete computer-related tasks].

Which results in us humans acting like robots in order to fulfill the requirements of the systems we built:

> Many fear that the advance of technology will replace us all with robots. Yet in fields like health care the more imminent prospect is that it will make us all behave like robots”

The author’s solution?

> We can retune and streamline our systems, but we won’t find a magical sweet spot between competing imperatives. We can only insure that people always have the ability to turn away from their screens and see each other, colleague to colleague, clinician to patient, face to face.

## Tool: [htm](https://github.com/developit/htm/blob/master/README.md)

> JSX-like syntax in plain JavaScript - no transpiler necessary.

A tool that essentially lets you do JSX but in the browser (no transpiling). This is really awesome when you want to leverage native es modules for react in the browser and not transpile.

## Article: [“Prototypes and Production”](https://adactio.com/journal/14562) by Jeremy Keith

Was just doing something similar and feel the same way. When building a prototype, you throw so many best practices to the wind:

> Whereas I would think long and hard about the performance impacts of third-party libraries and frameworks on a public project, I won’t give it a second thought when it comes to a prototype. Throw all the JavaScript frameworks and CSS libraries you want at it (although I would argue that in-browser technologies like CSS Grid have made CSS libraries like Bootstrap less necessary, even for prototyping).

Remember, however, that prototypes quite often gain their utility through their ability to be like a piece of paper: you sketch out your ideas quickly with low friction, you learn what you _don’t_ want, then you throw it away.

> Build prototypes to test ideas, designs, interactions, and interfaces…and then throw the code away. The value of a prototype is in answering questions and testing hypotheses. Don’t fall for the sunk cost fallacy when it’s time to switch over into production mode.

## Video: [“The Transformative Power of Classical Music”](https://www.youtube.com/watch?v=r9LCwI5iErE), a TED Talk by Benjamin Zander

Not a talk about software, but has some good insights into what makes a great leader:

> The conductor of an orchestra doesn’t make a sound. He depends for his power on the ability to make other people powerful...I realized my job is to awaken possibility in other people...

He says the way you can tell if you’re awakening possibility in other people is by looking into their eyes. And if someone’s eyes aren’t reflecting that awakened possibility, then you have to ask:

> Who am I being that my player’s eyes are not shining?

And that can extend to anyone in your sphere of influence: “who am I being that my [children’s / employees’ / friends’] eyes are not shining?”
