# Design Systems and Airplanes

> All our invention and progress seem to result in endowing material forces with intellectual life, and stultifying human life into a material force. – Karl Marx

> The trouble with automation is that it often gives us what we don't need at the cost of what we do. — Nicholas Carr

There’s been some buzz lately around design systems. I’m not going to summarize all the interesting points of conversation, as [Jeremy has provided a great roundup](https://adactio.com/journal/16400).

However I do want to jot down a few thoughts that come to mind as I’ve been following the discussion. The comments I’ve been reading about design systems seem to allude to the long-standing discussion around automation. There’s a depth of good conversation on this topic that I think designers in the industry could benefit from because we’re not the only discipline to struggle with questions of automation.

## Pilots and Automation

Proponents of automation are often quick to attribute self-interest to people who fear automation—“they’re only grumbling about this streamlined automation because they’re anxious about losing their jobs.” Nicholas Carr, in his book _The Glass Cage: Automation and Us_ dives deeper into these accusations to prove that, while the proponents are automation are often right, they are nonetheless only partially right. Carr draws on the experience of airline pilots to illustrate his point. 

> Pilot’s self-interest, when it comes to matters of automation, goes deeper than employment security or pay. Every technological advance alters the work they do and the role they play, and that in turn changes how they view themselves and how others see them. Their social status and even their sense of self are in play. So when pilots talk about automation, they’re speaking not just technically but autobiographically. Am I the master of the machine, or its servant? Am I an actor in the world, or an observer? Am I an agent, or an object? “At heart,” MIT technology historian David Mindell writes in his book _Digital Apollo_, “debates about control and automation in aircraft are berates about the relative importance of human and machine.” In aviation, as in any field where people work with tools, “technical change and social change are intertwined.” (60)

Jeremy touches on this in his piece [“Architects, gardeners, and design systems”](https://adactio.com/journal/16369) where he points out that the most commonly cited reasons for creating a design system are efficiency and consistency. Worthy goals I think. But how does your design system _arrive_ at efficiency and consistency? Through enforcement? Empowerment? I think design is grappling with these questions. As Mindell states, technical change is intertwined with social change. As design systems become easier to justify, build, and deploy through the industry, social change built upon the assumptions of those systems will inevitably follow. As Jeremy says, design systems are neither good nor bad—but they’re also not neutral.

Nicholas Carr continues in his book explaining how pilots have grappled with the developing interplay between automation and craft:

> Pilots have always defined themselves by their relationship to their craft. Wilbur Wright, in a 1900 letter to Octave Chanute, another aviation pioneer, said of the pilot’s role, “What is chiefly needed is skill rather than machinery.” He was not just voicing a platitude. He was referring to what, at the very dawn of human flight, had already become a crucial tension between the capability of the plane and the capability of the pilot. As the first planes were being built, designers debated how inherently stable an aircraft should be—how strong of a tendency it should have to fly straight and level in all conditions. It might seem that more stability would always be better in a flying machine, but that's not so. There’s a trade-off between stability and maneuverability. The grater a plane’s stability, the harder it becomes for the pilot to exert control over it. As Mindell explains, “The more stable an aircraft is, the more effort will be required to move it off its point of equilibrium. Hence it will be less controllable. The opposite is also true—the more controllable, or maneuverable, an aircraft, the less stable it will be.” The author of a 1910 book on aeronautics reported that the question of equilibrium had become “a controversy dividing aviators into two schools.” On one side were those who argued that equilibrium should “be made automatic to a very large degree”—that it should be built into the plane. On the other side were those who held that equilibrium should be “a matter of skill for the aviator.”

This feels like the discussion we’re having around design as a discipline within software. On one side are those who argue design should “be made automatic to a large degree”: efficiency and consistency through a prescriptive system. The equilibrium of control shifted away from human and instilled into the system. On the other side of the argument are those who hold that the equilibrium should be “a matter of skill” for the designer—and any ”system” should support that position, not supplant it. 

This is all very similar to the discussion people in aeronautics have had in the past. So what did they decide?

> Wilbur and Orville Wright...believed that a plane should be fundamentally unstable, like a bicycle...That way, the pilot would have as much autonomy and freedom as possible. The brothers incorporated their philosophy into the planes they built, which gave precedence to maneuverability over stability. What the Wrights invented at the start of the twentieth century was, Mindell argues, “not simply an airplane that could fly, but also the _very idea_ of an airplane as a dynamic machine under the control of a human pilot.” Before the engineering decision came an ethical choice: to make the apparatus subservient to the person operating it, an instrument of human talent and volition. 

That’s an important line: “the brothers incorporated their philosophy into their planes.” The tools you use, the frameworks you build, the systems you design, they are all have an underlying philosophy built into them that exudes into the things they influence. Are we cognizant of the ideologies behind the tools we build and use?

There’s another important line: “before the engineering decision came an ethical choice: to make the apparatus subservient to the person operating it.” Is the thing we’re making prescriptive or descriptive? Is your design system a tool in service of “human talent and volition” or a decree to circumscribe them?

Carr continues:

> The Wright brothers would lose the equilibrium debate. As planes came to carry passengers and other valuable cargo over long distances, the freedom and virtuosity of the pilot became secondary concerns. Of primary importance were safety and efficiency, and to increase those, it quickly became clear, the pilot’s scope of action had to be constrained and the machine itself invested with more authority. The shift in control was gradual, but every time technology assumed a little more power, pilots felt a little more of themselves slip away. 

But the technology of the computer and how it influenced the plane was only the beginning of the influence of automation.

> The computer not only changed the character of flight; it changed the character of automation. It circumscribed the pilot’s role to the point where the very idea of “manual control” began to seem anachronistic. If the essence of a pilot’s job consists in sending digital inputs to computers and monitoring computers’ digital outputs—while the computers govern the plane’s moving parts and choose its course—where exactly is the manual control? Even when pilots in computerize planes are pulling yokes or pushing sticks, what they’re often really involved in is a simulation of manual flight. Every action is mediated, filtered through microprocessors.

It’s an interesting question: in a [fly-by-wire](https://en.wikipedia.org/wiki/Fly-by-wire) aircraft, what does “manual control” really mean? Similarly, with design systems becoming more and more pervasive, it begs the question: what does it mean to “design”, to _be_ a designer? Are the “real” designers the ones who create the systems, everyone else is just an “implementer”? 

So how does all of this relate to design systems? I’ll let you draw your own conclusions, but I think Jeremy is on to something:

> A design system need not be a constraining straitjacket—a means of enforcing consistency by keeping creators from colouring outside the lines. Used well, a design system can be a tool to give creators more freedom...if the reason you create a design system is to empower people to be more creative, then say that loud and proud! I know that creativity, autonomy and empowerment is a tougher package to sell than consistency and efficiency, but I think it’s a battle worth fighting.

## How Do You View The World?

[Dave Rupert wrote about the effects of design systems](https://daverupert.com/2020/01/the-web-is-industrialized-and-i-helped-industrialize-it/), drawing parallels to Taylorism. Carr touches on a similar topics in his book, which I think are worth calling out.

Taylorism believed that too much initiative and leeway was being granted to individuals. Optimum efficiency could only ever be achieved through some kind of standardization of work, enforced by rules and built into the design of the machine itself. Worker and machine were designed to be merged into a tightly controlled, productive unit. From the perspective of the machine designers, it was a triumph of design, engineering, and efficiency. From the perspective of the worker, it was a sacrifice of skill and independence. “The loss of autonomy was more than economic. It was existential” says Carr. Technology was moving from tools that increased an individuals’ autonomy and scope—“a bicycle for the mind”—to complex machines that constrained them. Hannah Arendt, author of the book _The Human Condition_, would conclude: 

> Unlike the tools of workmanship, which at every given moment in the work process remain the servants of the hand, the machines demand that the laborer serve them, that he adjust the natural rhythm of his body to their mechanical movement.

The product of the human-machine labor may be superior when judged on the merits of efficiency but the agency of the human involved is inevitably curtailed. As George Dyson, technology historian, asks: “What if the cost of machines that think is people who don’t?”

Is your “design system” an enforcer or an emancipator? Is it a technology-centered system or human-centered system? Donald Norman, as cited by Nicholas Carr in _The Glass Cage_, gets at the heart of it:

> Society has unwittingly fallen into a machine-centered orientation to life, one that emphasizes the needs of technology over those of people, thereby forcing people into a supporting role, one for which we are most unsuited. Worse, the machine-centered viewpoint compares people to machines and finds us wanting, incapable of precise, repetitive, accurate actions...It emphasizes tasks and activities that we should not be performing and ignores our primary skills and attributes—activities that are done poorly, if at all, by machines. When we take the machine-centered point of view, we judge things on artificial, mechanical merits.

If we’ve taken a machine-centered view of the world, of course (prescriptive) design systems are great! They’re efficient. They’re consistent. They do what humans can’t. But there’s more than one way to view the world.
