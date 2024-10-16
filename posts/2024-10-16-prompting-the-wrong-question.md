# Prompting the Wrong Question

So there I am, working on a bug exclusive to Safari (we’ve all been there). I can’t figure it out so I ask AI, “Hey, this piece of code is not working in Safari, what’s wrong?”

> The issue might be related to how Safari handles keyboard events, especially for certain keys…

It gives me some advice:

- Ensure the listener is setup correctly
- Check for the meta key being pressed

I’ve been staring at this problem for a minute, so I’m 99% sure none of those suggestions are of any help. I double check my work, but still the bug persists.

So I tell AI those suggestions don’t work. It responds by saying I may need to go to a “lower level”. It recommends:

- Use a global event listener, instead of one scoped to a specific DOM element

I’m skeptical — but I’ve been wrong enough to doubt my skepticism. So I try that, but no dice.

I continue my conversation with AI. It recommends:

- Use a different shortcut for Safari specifically

I don’t want to do this. What I’m trying to achieve I’ve seen done by a million and one other websites. They don’t do something special just for Safari, I shouldn’t have to either.

So now I’m getting a little testy in my prompts: “Do you have any other suggestions? You keep recommending the same ones over and over. It has to be something else.”

> I apologize for the repetition. Let’s try a different approach…

Ok, I like the sound of that.

It begins telling me to register different events in a `useEffect` hook.

“Hm…that’s a little crazy town” I think to myself. But again, I’ve been wrong before. Plus who really knows how `useEffect` works anyway, maybe it’ll work? Plus this thing has the context of the entire internet, right? (Actually not sure if that’s a good or bad thing…)

No dice with `useEffect`.

I continue conversing with AI but it keeps spitting back the same suggestions wrapped in different language. Over and over:

> I apologize for the repetition. Let’s try a different approach…

Eventually I give up.

I turn to humans for help. I ask a co-worker to take a look. He tries a few things, but still nothing. But then another co-woker says one of our fixes is working for him!

That starts us down the path of: what OS are you on? macOS Sonoma? Hey, me too. What version of Safari? Hmm…we’re on different minor versions of Safari. Shouldn’t be enough to warrant this big of a discrepancy? Then I turn inward, “It must be something about me, something specific to my browser…”

I stare blankly at my version of Safari. I’ve been here before — works fine for everyone else, but not for me? That can mean only a handful of things, one of which is…EXTENSIONS!

I only have a few installed, but I turn them all. Boom! Bug gone.

So the problem all along was an extension?! [insert sad trombone sound here]

AI kept taking me down this narrow hole of rewriting event listeners. Never once did it suggest, “Have you considered that perhaps the issue lies with you specifically, dear human?”

Surely there’s enough internet context for it to think: have you tried disabling extensions in the browser you’re testing?

I am not an expert in AI/LLMs. I would venture to guess the problem here is one of context. I set the context of the problem for the computer, and it stayed within the confines of the problem I gave it.

“Why doesn’t this code work in Safari?” I asked.

It never responded with, “Perhaps you are asking the wrong question.”

It’s a tricky thing — even for humans like myself — to pause, take a step back, and challenge the very premise of the questions we’re asking. 

I felt so silly when the whole thing was resolved. If I had a nickel for every time I’ve been asked, “Have you tried disabling extensions?” I wouldn’t be here writing this blog post about fixing bugs during my day job because I wouldn’t have one.

But the lesson here (for me) remains: don’t forget to challenge the very premise of the questions you’re asking.