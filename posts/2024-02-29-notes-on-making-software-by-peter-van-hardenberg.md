#generalNotes

# Notes from “Why Can’t We Make Simple Software?” By Peter van Hardenberg

I’m a fan of what [Ink & Switch](https://www.inkandswitch.com) is doing in regards to [local-first web development](https://localfirstweb.dev). I’ve got a few harebrained ideas myself I want to build. And I’ve written [notes from a talk by Peter](https://blog.jim-nielsen.com/2023/offline-is-online-with-extreme-latency/) before.

Which is all a preface for this set of notes from another talk by Peter. [Here’s the talk on Vimeo](https://vimeo.com/780013486) and here are my notes (and opinions) from the talk.

## Be Scale Appropriate

> Increasing scale changes everything about a system.

Tools that work for one magnitude of scale break down at other magnitudes of scale — in both directions!

Peter’s advice? Plan to rebuild systems, with new tools, as you hit new orders of magnitude. There is no way around this.

## Complexity

Independent dimensions multiply problems. For example: building a web application entails accounting for (at minimum):

- Browsers: Chrome, Safari, Firefox
- Platforms: macOS, Windows, Android, iOS
- Screen sizes: desktop, tablet, mobile
- Network speeds: Wifi, 5g, 4g, 3g

The variability in each and across these factors multiply against each other:

  3 browsers  
× 4 latest versions of each  
× 4 platforms    
× 4 latest versions of each  
× 3 screen sizes  
× 4 network speeds  
= 2,304 combinations

And that’s if after drastically oversimplify these factors (for example, there’s way more than just “desktop”, “tablet” and “mobile” for screen sizes.

Peter notes that this is why Electron apps are a popular choice for building across platforms: they allow you to make an insanely unmanageable task just plain unmanageable.

> This is why you see ostensibly lazy electron apps from big companies because even worse than having to support [multiple native apps] is having to coordinate all the different people and teams to build features...if you have an iOS and and Android team, how do you get them to ship the same feature in the same quarter?

It’s kind of funny when you think about it: what’s worse than _the technical problem_ of building and maintaining multiple native applications? _The people problem_ of building and maintaining multiple native applications.

To belabor the point, I am reminded of [Dave’s post about states](https://daverupert.com/2024/02/ui-states/). He enumerates a large (but not comprehensive) list of the many of the dimensions that affect the your application. I’m not good at math, but to Peter’s point about how these compound, imagine the math on Dave’s list of states. That’s got to be a very, very large number.

How can you know that you have correctly functioning code?

This is what kills you with trying to control complexity. All the small variances play off of each other to create an unknowably complicated environment.

Sometimes, you have to learn to [let go of control](https://blog.jim-nielsen.com/2022/html-email-rant/).

## Rebound Effect

There’s this phenomenon people talk about where everything around computing has gotten insanely faster and yet things are still slow.

For example: CPUs have increased in speed dramatically (remember those ~600GHz beige towers?) and yet computers are still slow. Also: bandwidth has increased dramatically (remember dial up internet?) and yet websites are still slow. 

Here’s Peter on this phenomenon (which is also called [the rebound effect](https://en.wikipedia.org/wiki/Rebound_effect_(conservation))):

> The degree of complexity of a system is tied to who we are and what we’re doing over time. When we buy back some complexity by using better tools or picking a simpler environment we’re going to spend that out again eventually. 

It’s a funny conundrum.

Why do we refactor? Because the code got too complicated. So we simplify it. And why do we simplify it? So we can add more to it over time and make it more complex again. 

Make it simpler, so we can make it more complicated.

It’s an inevitable journey. Systems grow to meet growing needs. 

Refactors and rewrites are merely a way to reset the clock on the complexity that forever encroaches on your codebase and product. 

Peter’s final advice:

> We can’t beat complexity, but we can be beat by it. 
