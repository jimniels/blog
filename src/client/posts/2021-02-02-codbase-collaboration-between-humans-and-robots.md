---
tags: thoughts
---

# Codebase Collaboration Between Humans and Robots

Back in 2017, [I tweeted](https://twitter.com/jimniels/status/889921238809837568?s=20):

> JS will soon read like it's written for machines
> ```
> // prettier-ignore  
> /* eslint-disable */  
> import(/* webpackChunkName: "lodash" */ 'lodash')
> ```

It’s a bit of a silly statement. Of course JavaScript is written for machines. It’s a programming language. It’s instructions for a machine. But, JavaScript is also written for humans. As Knuth’s statement goes, “Programs are meant to be read by humans and only incidentally for computers to execute.”

If I remember correctly, my tweet came from a place of frustration and exhaustion with eslint. I was trying to find the right eslint instructions so the husky prebuild hook (which was linting my changes) would stop yelling at me for sloppy code in a prototype/throw-away branch I just wanted to commit and push so that the CI/CD would kick-in and get me a preview build—that’s a mouthful. I couldn’t remember at the time what I needed. Was it `es-lint-disable` or `es-lint-disable-next-line`? Or maybe `es-lint-disable-line`? Oh that’s right, `eslint-disable` is the one I have to re-enable with `eslint-enable`, but this project’s linting configuration doesn’t actually allow the nuclear `eslint-disable` without explicitly stating which rules to disable. 

Eventually I found the right incantation to break the spell of a failing build:  

```js
// eslint-disable-next-line no-alert, no-console, please-and-thank-you
```

This made me start to notice how frequently I read or even wrote code comments as tooling instructions (i.e. telling prettier to stop or webpack where to code split). Code comments for machines were more prevalent than code comments for humans. My code contained instructions for two masters: 1) the one that would parse, build, transpile, compile, deploy, or whatever else it, and 2) the one that would eventually execute it (the client).

In my exhaustion, I did what many others do as an outlet: I complained on twitter—that “firehouse of human anguish”. Then I moved on. But I never forgot.

## Collaborating: Robots vs. Humans

Fast-forward to 2020 and I saw [this tweet from @davatron5000](https://twitter.com/davatron5000/status/1327292373244792832):

> Staring at 12 config files in my project root like they're my mortal enemies and not my supportive robot buddies.

That resonated. Tooling configs remain one of the most perplexing aspects of any project for me. To express my sympathy (but also to point out that I thought twelve configs was on the low-end) I found a popular project on Github, took a screenshot of the project root, highlighted all the tooling configurations, and reply’d to the tweet. What strikes me about this image is the contrast between the amount of instructions in the codebase around collaboration and conduct for machines vs. humans.

<img src="https://cdn.jim-nielsen.com/blog/2021/code-for-machines-screenshot-1.jpeg" alt="" width="895" height="1226" />

For this blog post, I went out and grabbed a few more examples:

<img src="https://cdn.jim-nielsen.com/blog/2021/code-for-machines-repos.png" alt="Screenshot of multiple repos on Github highlighting code specific to robots vs. humans." width="1426" height="1578" />

Take a moment to let this all soak in. Can you imagine having to setup, configure, update, and maintain all of these? Thank goodness somebody knows how. Every single one of those configs has `n` number of settings. Think of the incredible amount of work that would be required to read the docs for each config and understand A) what it’s doing, and B) what else is possible that isn’t yet configured.

Side note: I’ll grant that these screenshots aren’t meant to be a perfectly accurate representation of managing robot collaborators vs. human ones. I’m sure I missed configs/tooling in some places and wrongly highlted them in others. Additionally, there’s no real science behind what constitutes being for machines or not (`.gitattributes` seems rationale and part of local file development, while `.circleci` is clearly for CI/CD). All that said, there’s a lot of commit messages in these repos relating to robot care and maintenance. Just look at these examples commit messages from a single repo:

- “Upgrade to prettier 2”
- “upgrade examples to webpack-cli major 4”
- “improve prettier and lint config and performance”
- “generate runtime code with special-lint-fix”
- “improve linting performance”
- “fix newly found eslint problems”

## Robot Coworkers

Now I get it. These tools are helpful in their own way, especially as projects scale in size (both in contributors and lines of code). You need a way to provide structure and consistency through the codebase, to compile the code, and to deploy it. Doing that at the scale of many of today’s projects would be difficult, maybe nigh impossible, for a human. It’s the perfect job for an automated robot collaborator. But damn if employing those robot collaborators and keeping them in line isn’t overwhelming at times.

Thinking on prior experience, when I try to make a meaningful contribution to a project it feels like my merge request is quite often rejected. Why? One of two reasons: 1) something is wrong with the code I wrote, or 2) some configuration of the myriad of automated tools that work together on the project is broken and the build won’t pass. Based on experience, it feels like it’s a 50/50 chance of being either. Like Dave, trust for my “robot buddies” can be low. 

Imagine if you had a human on your team who acted like these robots, just completely irregular on blocking your productivity. How long do you think they’d continue to have a place on the team? But because this is a little robot buddy contributor, we’re much more forgiving. Can’t merge your PR? “Oh yeah, sorry, that was the tooling’s fault. We’ll fix it.” But then shortly after the human fixes it, the robot is back on its bullshit without any repercussions or serious consideration of whether it should remain on the team. “Ah it’s the build again. We’ll fix it.”

## Robots & Complexity

It makes me think of a line by John Ousterhout from his book _A Philosophy of Software Design_:

> Each piece of design infrastructure added to a system...adds complexity, since developers must learn about this element. In order for an element to provide a net gain against complexity, it must eliminate some complexity that would be present in the absence of the design element. 

As much as we talk about avoiding complexity _in_ our programs, we seem to love the complexity of the tooling _around_ our programs. As Ousterhout notes, every time you add a tool or configuration to a project, you’re adding an element that developers must learn, be aware of, or at minimum be exposed to. So while we think we’re lowering the bar of contributing and collaborating on a project — which may be true for _some_ people — it’s possible we’re actually excluding people from contribution and collaboration because of the overwhelming complexity of our team of robots. “Hey, don’t worry about getting a PR declined because of some minor cosmetic aspect of the code, our new linter and code formatter will take care of all that for you! You _just_ have to...” And I think many of us have experienced the pain and difficulty that can arise from the “you just have to...” in that sentence.

Now I recognize that not every project intends to accept contributions from beginners. Nor does every person who contributes to a project need to understand all the tooling configurations. If they are not in a position where they have visibility or control over aspects of the software lifecycle, like cutting releases or publishing artifacts, can’t they simply ignore all those configurations? I suppose that’s possible. But it sure would be a lot easier if they weren’t right in your face in the root of the project. For simplicity’s sake, imagine a standardized `.machines/` folder where you could stick all the robot stuff. At least then it would be obscured in a purposeful way. That’s a tangent though.

## Conclusion

I didn’t mean to make this a rant. I wish I had answers to these kinds of problems, but I don’t. I find a lot of value in many of these tools. I merely want to raise my voice and say, “this stuff is confusing as hell for me” and I’d bet I’m not the only one.

All of this did get me thinking: imagine if we put the same amount of effort into supporting the humans who help build our projects as we do for the robots who help us? Maybe a few more of the cultural/social problems associated with programming would “magically” disappear.

