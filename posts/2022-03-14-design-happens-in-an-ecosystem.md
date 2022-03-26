#design

# Design Happens in an Ecosystem

I was having a conversation with a co-worker recently about a new feature we wanted to release.

In our current app, we had actions A and B. We wanted to create a new feature for a similar action, let’s call it action C.

He advocated we drop in the button for this new feature and leave everything else alone.

I advocated that we combine actions A, B, and C into a single action, with this new feature being exposed as part of that collection of actions.

His argument was that we wanted to get data about whether this action would be valuable to our users and the best way to do that was to leave everything as-is except for this new thing, that way our data would be more conclusive — i.e. “we isolated what changed on the page to this single, new action and people are clicking it, therefore it must be useful to them as nothing else changed.”

I can understand the sentiment to isolate your changes to better try and prove causation in your data—“we only changed this one thing, the data went up, therefore we have shown a cause and effect which proves value add”—and yet, the designer in me couldn’t help but feel that the introduction of this new feature necessitated a re-thinking of the actions on the page. 

I advocated for a synthesis between what existed and what we wanted to add, rather than a crude accretion of our new thing which takes no thought for its fit within the whole.

I tried to explain myself:

> I don’t think…[you can tweak one thing] in a silo. One has an effect on the other. I’m more worried that if we don’t make it clear what the distinction is between [actions A/B/C], then fewer people will use [new action C] because it’s not clear how to use it and they’ll just opt for what they were always doing (actions A/B). The data won’t necessarily tell you that. It’ll tell you _what_ (people weren’t clicking [new action C]) but not why (people weren’t clicking [new action C] because it was too confusing with the [exisiting actions A and B right next to it] which are [very similar]). The idea of trying to change as little as possible so you can better understand the data you get back because you’ve isolated what’s changed, that makes total sense to me. But it just feels like, in this case, the notion of [actions A/B] are so interconnected with the notion of [new action C] that you can’t just design the one without thinking about and accounting for the other.

But I feel like I did a poor job of making my case. So I took note to come back to this thought and try to explain it in a blog post.

So here’s that blog post.

The thrust of my thinking here is based around the idea that “the whole is greater than the sum of its parts”. You can’t always do a thing in isolation. The introduction of any one thing into a system will have an effect on the things which relate to it. Design happens within an ecosystem. [As Matisse (roughly) said](https://blog.jim-nielsen.com/2021/designing-between-the-lines/): “I don’t paint things. I paint the relationships between things.”

But there’s also this belief that we can pinpoint causality. I mentioned this in [my notes from the “Measuring Design” episode of the Clearleft podcast](https://blog.jim-nielsen.com/2021/notes-from-measuring-design/):

> Chris makes the point that users live in a very complex, interconnected world and it’s impossible to pinpoint causality with any degree of certainty for a single change, i.e. “we changed this button color and that made people click it more”. But that’s how a lot of AB testing is practiced.

I was paraphrasing Chris How, Head of Experience Design at Clearleft, who said this:

> I think we live in a much more nuanced, complicated and interesting world where the sum of the parts of a website or an app all contribute to the results that you will get from the AB testing.

Imagine for a moment this scenario (however contrived): what if you wanted to see if people preferred an electric car over a gas one?

But your approach was, “Let’s take one of our gas cars and _only_ swap out the engine, that way everything else is the same and we’ll know if people prefer a gas or an electric means of transportation.”

(Contrived, I know, but bear with me…)

If you swap out the engine, now all of the sudden the parts connected to the engine—the things which exist in relationship to that engine—have to change because (at least part of) the essence of what they are is described by that relationship. For example: the gas tank. What is a gas tank with no engine that runs on gas? I’m sure there’s many more questions too:

- With the combustion engine gone, the engine bay just got bigger. So what to do with that extra space? Leave it empty? 
- What happens to the aerodynamics of the car (especially if you leave a giant space in the engine bay)?
- What about the frame of the car, now that there’s less weight? Is the car less efficient because it’s carrying superfluous weight in the frame? 

So. Many. Questions. From that one decision. (I’m not a car designer, forgive any ignorance there.)

If your data shows people hate the car, is it because they prefer gas over electric? Or is it because you didn’t design for the electric vehicle as a whole?

The summation of all the interconnected parts _and their relationships with each other_ are what make up the end experience which, from the standpoint of design, strives to be a unified and cohesive whole.

This is what I mean when I say “design happens in an ecosystem”. Like an ecologist, designers seek to reveal the interconnectedness of the world and then to present a vision for a unified whole—“E pluribus unum”, out of the many, one. 

You can’t take something out of its environment (or put it into an environment) and expect a neutral effect by default. The essence of a thing is defined, at least in part, by its relationship to the things around it. A chair in a room in a building in a city in a culture.

I’m not sure that my argument is any more persuasive, but trying to articulate what I was arguing for is a helpful exercise. Perhaps next time I’ll be better at representing my thoughts and rationale for design decisions.