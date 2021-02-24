---
tags: netlify
---

# Wisdom From the Forums: “The Gap Between Expectations and Reality”

A while back, I created [a thread in the Netilfy community forums about support for deno](https://community.netlify.com/t/support-for-deno-on-netlify/14172).

I’ve been monitoring activity on the thread from my inbox. The conversation has gone back and forth on feasibility and possible support. Ideas for a workaround have surfaced, but I’m keen on official support only (I’m trying to limit “workarounds” in my digital life).

Recently, [this message from Chris McCraw](https://community.netlify.com/t/support-for-deno-on-netlify/14172/17), Director of Support at Netlify, came into my inbox:

> No reason we couldn’t [support deno], but we haven’t...
>
> Our already-pretty flexible CI env of “do whatever you want in the unix shell” is already a pretty huge thing to provide tech support on (leads to around 2/5 of our Support contacts, almost all about things that the customer has misconfigured rather than bugs in our system), and allowing people to bring their own docker image complicates things further. I suppose we could implement a “0 tech support” policy on custom containers to ease the operational cost, but while we can say anything we want - people can and do set their own expectations and expect more than that, judging from a decade in the industry, and in the gap between expectations and reality lies much sadness.

First, it’s fascinating to see Chris cite a number like that on the fly—“2/5 of our Support contacts”. These folks are clearly being intentional about measuring interdependent aspects of their business in order to understand cause and effect. The fact that he knows that number enough to recite it off-the-cuff in a forum post signals a lot to me about how Netlify builds product.

However, that’s not what impressed me the most about Chris’ comment. What impressed me was this insight, which I quote again:

> I suppose we could implement a “0 tech support” policy on custom containers to ease the operational cost, but while we can say anything we want - people can and do set their own expectations and expect more than that...and in the gap between expectations and reality lies much sadness.

Giving people what they want sounds like a good idea, especially if the cost to you is negligible under your specified terms—”yeah we don’t really want to support that, but it wouldn’t cost us that much to just give it to you under the condition that you don’t ask us for help.”

However, Chris’ quote resonates from experience. The reality is you can say what you want, but people’s expectations are out of your hands. Once you put something into the world, it no longer belongs solely to you. You can’t say, “sure, here it is, but I’m not responsible for it.” Once it’s out, it takes on a life of its own and you no longer control its narrative or perception. Perception becomes reality and you may easily end up supporting something you explicitly stated you would not—often to preserve image, change perception, and/or improve customer satisfaction.

In summary: choose what you provide wisely because if you provide it with the caveat that you won’t support it, you may soon find yourself supporting it.