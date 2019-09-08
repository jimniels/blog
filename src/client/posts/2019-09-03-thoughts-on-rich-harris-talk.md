---
title: Thoughts on Rich Harris’ “Metaphysics and JavaScript”
tags: thoughts
---

[Rich Harris](https://twitter.com/Rich_Harris), creator of [Svelte](https://svelte.dev/), [shared](https://twitter.com/Rich_Harris/status/1168896800268464129) [his slides from a recent talk titled “Metaphysics and JavaScript”](https://docs.google.com/presentation/d/1PUvpXMBEDS45rd0wHu6tF3j_8wmGC6cOLtOw2hzU-mw) where he critiques aspects of the React programming model. I found the talk extremely cogent and applicable to my experience using React.

I want to regurgitate some of his points in this post in order to help further elucidate and articulate my own feelings around programming in React, which as of late have mapped quite directly to Rich’s points.

**A Note Before We Begin**: I love React and use it everyday. The following changes none of that. 

## UI is a Function of State...?

Rich starts off his talk by clearing stating that he plans to critique the “most sacred of sacred cows”: that your UI is a function of your application’s state.

> UI = F(STATE)
>
> This formulation is the very heart of the React programming model...I’m not going to claim that it’s wrong. I’m going to claim that it’s incomplete — that it’s more of an ideological statement than a description of what is actually happening when you build a React app. And I’m going to claim that it represents a mode of thinking that obscures a deeper truth about how we think about our code.

Gut punch.

Ok, so how is the formulation `UI=F(STATE)` wrong? Ah, but he didn’t say it was “wrong” he said it was “incomplete”. He says “UI is a function of state” is not an accurate description of precisely what is happening when you build a React app.

I’m putting words in Rich’s mouth, but what I heard him saying is that the belief that your UI is a function of your application’s state is an  abstraction that—while it works well and can make you very efficient—is still just that: an abstraction. And while abstractions are useful, they’re still a layer on top of your raw materials—a layer that can become quite troublesome when you discover where it fails to pave cleanly over the underlying materials. If you can’t find a coherent tactic for navigating flaws in the abstraction, you end up with continual friction until a fire starts and you burn up in frustration.

It reminds me of something Julio Biason said in his post [“Things I learnt the Hard Way (in 30 Years of Software Development)”](https://blog.juliobiason.net/thoughts/things-i-learnt-the-hard-way/). He states that design patterns should be used to describe solutions, not find them. 

> (Again, personal opinion) Most of the time I saw design patterns being applied, they were applied as a way to find a solution, so you end up twisting a solution -- and, sometimes, the problem itself -- to fit the pattern...I saw this happens a lot: We have this problem; a design pattern gets close to the proper solution; let's use the design pattern; now we need to add a lot of things around the proper solution to make it fit the pattern.

While he’s talking specifically about “design patterns” it does seem to apply quite aptly to Rich’s points around the ideology of UI being a function of state. In other words, we find the idea of UI being a function of state extremely useful. It helps us move fast through complexity. However, it is nonetheless an ideological abstraction on top of the raw materials of how we have to actually build web applications in the real world: in the DOM. Rich takes time to elaborate on this:

> I think [UI = F(STATE)] is an ideological statement, and what I mean by that is that like any other ideology, like capitalist ideology or communist ideology, it is a collection of normative beliefs and values that an individual or group holds for other than purely epistemic reasons, which roughly translates as ‘it describes the world people want to imagine, rather than the world people actually inhabit.’
>
> I’m using the word ‘ideology’ as a descriptive label, not a dismissive one.
>
> But ideologies can be dangerous because when they start to chafe against reality, which they always do, the ideologue’s impulse is always to reshape reality rather than modify the theory.

So what we end up with when we say “UI is a function of state” is an idealogy that approximates a proper solution to building complex web applications, and we leverage that idealogy through the React programming model. But now we have to add a lot of things around the ideological solution to make it fit the raw materials with which we’re actually building (DOM) and it inevitably has flaws—or rather, perhaps I should say it inevitably makes tradeoffs—that create friction when we rub against mismatches in the ideology and the reality in which we live.

What I really appreciate are Rich’s attempts at addressing the ideology behind the framework and its mismatches with the reality of building web applications. It’s great stuff. This is the kind of stuff I’d like to hear when we talk about things like React vs. Vue (instead of merely “well React uses JSX while Vue has HTML templates”).

I digress. Let’s continue where Rich left off. 

> So what would happen if we took a very naive approach to functional UI? Maybe it would look something like this: we create a function that generates some UI from some state, including an event listener that calls the function again when that state changes.

![Animated gif from Rich’s talk depicting a simple example of UI as a function of state]({{site.imageurl}}/2019/ideology-of-react-simple.gif)

Do you see what’s happening here? We’re trying to create a very simple interactive experience illustrating the idea of “UI as a function of state”. We have some text that says “Hello *blank*” where *blank* gets filled in by whatever value is in the `<input>`. The JavaScript code is merely listening for a change on the input, and anytime it changes, it reaches into the DOM, erases everything in `<body>`, and re-renders the UI based on the new stateful value of the input.

This is a great illustration of the belief that your UI is a function of your application state. So what’s the problem here? Why does this not work? Well, there’s more state in the UI than just the application state of `name`. Rich:

> We can see it doesn’t work, because the old input has the focus, and the new one doesn’t.

Every time that code runs, it’s reaching into the DOM, and replacing everything in `<body>` with some new HTML. But what we perhaps didn’t realize is that the DOM already has some state within it: the focus of the input. When we delete everything in `<body>` to re-render with our new state, we loose the implicit state already contained in the DOM that a particular input has focus. React takes tare of this for you with controlled inputs, but perhaps you didn’t even know that? I didn’t fully grasp it until I tried building a simple example along the lines of what Rich showed and realized “crap, there’s some state I hadn’t accounted for which the browser handles for me by default”. So it seems UI is not always a function of your application state. 

Rich goes on to show that you could try to fix this by lifting the implicit DOM state into your application code. What happens? You end up running into another problem of the same type, and then another, and another, especially as your app and its interactions increase in complexity.

So it turns out that the DOM is stateful. But I thought that’s what we were trying to *get away from* with frameworks like React? And there’s the mismatch Rich is pointing out: the framework has an ideological bent that doesn’t always match up to reality. That’s how we often end up trying to re-shape reality to match our idealogy, rather than re-shaping our ideology to match reality.

As Rich goes on to point out, implicit DOM state—things like the focus of an input, the time an element has been mounted— is a critical factor in determining what the user will see on screen at any point in time. And a lot of this implicit state can’t be easily moved into our application. 

> our desire to express UI using pure functions is in direct conflict with the very nature of the DOM. It’s a great way to describe a state => pixels transformation — perfect for game rendering or generative art — but when we’re building apps on the web, the idea chafes against the reality of a stateful medium.

At some level, you probably knew React was taking care of a lot of this for you. I know I did. But when I tried to build an app that took the foundational idea of “UI=F(STATE)” and build it in JavaScript (like the example Rich gave), only then did I begin to see _how much_ React is doing for me.

And that leads us to what I saw as the apex of Rich’s argument (emphasis mine):

> Now of course we know how React handles [the conflict of implicit state in the DOM]: it takes the new nodes in your virtual DOM tree...and maps them onto existing nodes in the DOM. **In other words React is a functional abstraction over a decidedly non-functional substrate.**
>
> To me this is a warning sign, because in my experience, the bigger the gap between an abstraction and the thing it abstracts, the more likely you are to suffer what programmers like to call ‘impedance mismatches’, and I think we do experience that in React.

In other words, at the most fundamental level, what we have is a mismatch between the React programming model and the imperative APIs of the web. The [web has a grain](https://frankchimero.com/writing/the-webs-grain/) and I think Rich does a good job of illustrating how the idea of “UI is a function of state” goes against it. 

So where do we go from here? I don’t know. But writing this out has helped me better understand the friction I quite often feel. And it’s the perfect tee-up for a talk that says “Here’s Why Svelte Exists”. 
