# Building Software Together as a Type of Translation

Eric has a great piece called [“Visit for a surprise”](https://ericwbailey.website/published/visit-for-a-surprise/). In it, he sets the scene by acknowledging the wisdom of providing clear names for your links — e.g. the text “learn more about elephants” for a link is more effective than “click here.”

He extends that idea to “providing instructive names for your interactive controls”, e.g. a button represented solely as an icon needs a good, accessible label.

Then he asks: what about a situation where you deliberately want to be cryptic? For example, “a small icon that Rickrolls the curious participant by linking them to Rick Astley’s iconic music video.” How should such a link announce itself while remaining true to the spirit of accessibility guidelines?

Eric suggests preserving an equivalence of experience — a great term — regardless of how people are accessing the content.

> This is all about maintaining an equivalent experience by not over-describing something for only a certain subset of people. Here, the goal is to preserve the author’s intentional act of creating a sense of curiosity, regardless of the way someone interacts with technology.

He notes how this requires a kind of mindfulness, given that accessibility-related work habitually involves creating more clarity, not less.

> This is an area where an auditor reflexively seeking to be as literal as possible may err. I say this because in an accessibility auditing context we are usually so focused on creating clarity where there is none that we don’t get to dabble much in the areas of whimsy and nuance.

This is one reason I find accessibility work so fascinating: it trails being conquered by automation — this in contrast to much of modern front-end which, IMO, too often keys pivotally on automated scores that steamroll nuance which humans are better suited to evaluate. Eric describes this well in his Rick Roll link assessment:

> Automated accessibility scans can detect a link without an accessible name, but they can’t determine if the link’s name is meaningful. That’s where us humans come in.
> 
> Moreover, automation can’t operate with the level of nuance needed to determine if the author’s intent is being carried through in the link’s accessible name.

I find Eric’s description of this work acute. Accessibility work like this is a form of translation. It’s an art form. You must take liberties in translating the intent of the original experience — a linked icon, intentionally cryptic to produce the effect of surprise and humor — into another form that doesn’t afford equivalent materials (i.e. give it a textual label).

To create an equivalent, accessible experience, you have to give words to something that was originally created without words.

Linguists deal with this kind of subtlety all the time. Words can be translated literally (word for word) but can easily lose their meaning when compared to a semantic translation that looks to balance the literal and figurative meanings of what’s being communicated. (Not to mention the fact that many words simply do not exist when translating across languages; you often hear people say, “There’s no word for that in English”.)

This metaphor for building software as a form of translation really strikes a cord with me. It feels relevant to the world of design and front-end engineering — an idea I want to explore a bit more in this post.

## Design & Front-end Engineering as Translation

Design is a creative act, full of intention born out of research, synthesis, and problem solving. Without thoughtful, disciplined communication, the insights from design work can be “lost in translation” as a project progresses to the proverbial “hand-off” between disciplines, e.g. the transition from visual design to implementation.

Unfortunately, we often conflate “good communication” in the hand-off phase with the use of commercial software tools meant to facilitate this phase of the work. “Oh, my Figma file has everything you’ll need. Just look at ‘Inspect’ tab for anything you think is missing.” The entire context, and therefore intent, can easily get lost for people downstream of visual design — code and prose being perceived as artifacts that can merely be “plugged in” later in the process.

Each discipline — design, front-end, copywriting, etc. — is part of the creative act of building software. Without good communication, the original intent — which is likely full discipline-centric insight and research — is too easily lost along the way.

I suppose some might say this is where Product (with a capital “P”) comes in. They are the ones responsible for defining, communicating, and vetting the intent of any solution through the process of making software across a multitude of disciplines. In practice, however, I’m not so convinced it plays out this way.

Better, in my opinion, to follow the idea of small, iterative demos which can propel a team of people to accumulate positive, iterative change _together_ over time with a continually-renewing, shared understanding of context and intent. Ken Kocienda, who worked on the original iPhone team, [described it well](https://blog.jim-nielsen.com/2019/the-power-of-prototypes-in-the-creative-process/):

> When we got an idea, we cobbled together a first cut on the algorithms and heuristics we would need to illustrate it. Then we pulled together the supporting resources—code, graphics, animations, sounds, icons, and more—to produce a demo. After we showed the demo and shared some feedback with each other, we made decisions about changes that might be an improvement. Many times this came down to tuning some heuristic, or modifying how an algorithm and heuristic combined. Whatever it was, the concrete and specific modifications we chose to make led to the actions items that justified making the next demo. Repeat, then repeat again. Doing this over and over again set our projects on the slow path to accumulating positive change. This is how we started with an idea and finished with software for a product.

It’s easy for meaning to be lost when translating from one language to another. The original author’s intent is invariably interpreted by the person doing the translation. They cannot know the author’s original intent or thoughts and therefore the translation is always an interpretation of the original work, not a copy merely expressed in a different language.

Similarly, in software work, design intent — whether in visuals or code or words — can easily be lost through the chain of hand-offs. The more software production looks like an assembly line, where people from individual disciplines are given a pre-fabricated widget and expected to merely plug-in their part, the more intent (again, informed by research and discipline knowledge) is lost.

This is the value I see in interdisciplinary roles like design engineering, where individuals can span traditionally disparate disciplines and help reduce the seams where intent can be lost.

This metaphor of translation, and the possibility for losing something in translation while trying to preserve an “equivalence of experience”, feels like a deep well I’m going to draw from to understand and explain the process of designing and building software. Thank you Eric.