# The Cost of Avoiding Annoyance

**tl;dr** Living with annoying technological constraints might be less costly than maintaining the sophisticated workarounds we create to avoid them.

I really enjoyed this [well-reasoned article](https://htmx.org/essays/no-build-step/) explaining why htmx, the open-source hypermedia JS framework, does not have a build step.

I liked that the premise – “we don’t have a build step” — is not presented as a universal truth for its readers — “therefore _you_ shouldn’t have a build step”.

Instead, the author outlines the benefits _and tradeoffs_ of their approach. The article is not, “This is what everyone should do”, but rather, “This is what _we_ do for _this project_ for _these reasons_ and with _these trade-offs_, which fits our context. Perhaps you might be in a similar situation.”

> The htmx DX is very simple—your browser loads a single file, which in every environment is the exact same file you wrote. The tradeoffs required to maintain that experience are real, but they’re tradeoffs that make sense for this project.

Granted, [the power to cheat entropy](https://blog.jim-nielsen.com/2020/cheating-entropy-with-native-web-tech/) by writing code as it will be run comes with a cost — and that cost is often paid by _you_ the programmer. Perhaps that is why we have so much “innovation” in the DX space: to make _our_ lives easier (but not necessarily our websites better).

In fact, it almost makes you wonder if all the innovation in DX and web tech has a parallel to those startups which solve trivial problems that only address the superficial annoyances of our lives, like being able to order _any_ food at _any_ hour and have it delivered directly into your lap. Or [a machine to squeeze juice out of a bag](https://www.theguardian.com/technology/2017/sep/01/juicero-silicon-valley-shutting-down). Living without those is annoying to my laziness, but in lived experience it’s not that big of a deal.  

> every line of htmx has to be written in IE11-compatible JavaScript, which means no ES6...While this is incredibly annoying, in practice it is not a huge impediment.

I love the pragmatism here. “While not being able to use _shiny new thing_ is incredibly annoying, in practice it’s not that big of a deal.”

And I haven’t even got to the “no build step” part yet!

Ok so why is writing code _as it will be run_ so amazing? Well, for one, vanilla JavaScript lasts forever:

> The best reason to write [anything] in plain JavaScript is that it lasts forever. This is arguably JavaScript’s single most underrated feature…JavaScript from 1999 that ran in Netscape Navigator will run unaltered, alongside modern code, in Google Chrome downloaded yesterday

Contrast that with JavaScript (or CSS) that requires a compilation/transpilation step. Those often have the shelf-life of a dairy product.

> most people’s experience with JavaScript is that it ages like milk. Reopen a node repository after 3 months and you’ll find that your project is mired in a flurry of security warnings, backwards-incompatible library “upgrades,” and a frontend framework whose cultural peak was the exact moment you started the project and is now widely considered tech debt

There’s a cost to writing code that must be transformed before it can be run, and ([as Rich said](https://notes.jim-nielsen.com/#2023-09-18T2029)) I think people are in denial about the costs toolchains impose on them — or maybe even unaware of them.

> Maintenance is a cost paid for with labor, and open-source codebases are the projects that can least afford to pay it

As the author notes, a big reason we’re (willingly or unknowingly) blind to the costs of our toolchains is because we hold this unspoken belief in technology that change, _any change_, constitutes progress.

> the tendency of software engineers to view progress as a teleology of capability rather than choices with tradeoffs sometimes blinds them 

But that blinds us to so many of our own ailments — “Doctor it hurts when I touch here / then don’t touch there!” For example, sometimes we are so willing to pickup and use the gateway building blocks to complexity in order to avoid the slightest bit of annoyance.

> Modules are really useful.
>
> Sometimes, however, you want to solve simple problems, or at least relatively simple problems. In those cases, it can be helpful not to use the building blocks of more complex software, lest you emulate their complexity without creating commensurate value. 

Perhaps a little constraint could go a long way. As [Devine said](https://blog.jim-nielsen.com/2023/precarious-modern-computing/), “I don't think we've even begun to scratch the surface with what can be done with little.” Especially at the cost of a little annoyance to ourselves.