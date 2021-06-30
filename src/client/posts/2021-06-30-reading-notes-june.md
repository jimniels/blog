---
tags: readingNotes
---

# Reading Notes, June 2021

## Article: [“Are you still there?”](http://www.roughtype.com/?p=8888) by Nicholas Carr

> In a few years, all new TVs will have operational cameras. All new TVs will watch the watcher. This will be pitched as an attractive new feature. We’ll be told that, thanks to the embedded cameras and their facial-recognition capabilities, televisions will henceforth be able to tailor content to individual viewers automatically. TVs will know who’s on the couch without having to ask. More than that, televisions will be able to detect medical and criminal events in the home and alert the appropriate authorities. Televisions will begin to save lives, just as watches and phones and doorbells already do. It will feel comforting to know that our TVs are watching over us. What good is a TV that can’t see?
>
> We’ll be the show then. We’ll be the show that watches the show. We’ll be the show that watches the show that watches the show. 

Nicholas Carr—always on point.

>  the operators of the machines that gather our signals. We’re the sites out of which industrial inputs are extracted, little seams in the universal data mine. But unlike mineral deposits, we continuously replenish our supply. The more we’re tapped, the more we produce.
>  
>  The game continues. My smart TV tells me the precise velocity and trajectory of every pitch [in baseball]. To know is to measure, to measure is to know. As the system incorporates me into its workings, it also seeks to impose on me its point of view. It wants me to see the game — to see the world, to see myself — as a stream of discrete, machine-readable signals.

I sometimes despise that, on the web, we’ve come to accept this premise—to know is to measure, to measure is to know. As if what cannot be measured does not exist. Pic or it didn’t happen. Tree witnessed or it didn’t fall. Feedback or flatline. 

## Article: [“Looping over Arrays: for vs. for-in vs. .forEach() vs. for-of”](https://2ality.com/2021/01/looping-over-arrays.html)

I’ve always wondered about `for` and `for-in` and `foreach` and `for-of`. Through my own trial and error, my perception has become: 

- `for` is old school, what I learned in computer science 101
- `forEach` is what I’ll use most of the time, except when doing async stuff because `await` doesn’t work inside it
- `for-in` I use for async—or wait, should that be `for-of`? Meh, I’ll just use `await Promise.all`.

The lazy person in me finally gets to understand all the fors. Now we’ll just see if I can remember it.

## Article: [“#162: Minimum Viable Self”](https://kneelingbus.substack.com/p/162-minimum-viable-self)

> The personal brand, that groan-inducing pillar of digital existence

“Groan-inducing”—just love that description of the personal brand.

> Offline we exist by default; online we have to post our way into selfhood. Reality, as Philip K. Dick said, is that which doesn’t go away when you stop believing in it, and while the digital and physical worlds may be converging as a hybridized domain of lived experience and outward perception, our own sustained presence as individuals is the quality that distinguishes the two.

## Article: [“Link to download”](https://mefody.dev/chunks/download-link/)

- `Content-Disposition` header
- `download` attribute
- `blob:` and `data:`

A concise summary of how to get the browser to download things. I've used the `blob:` one before. It’s a rather neat trick for downloading files.

## Artile: [“Doing the right thing for the wrong reasons”](https://adactio.com/journal/18199)

> It’s one thing for a department to over-ride UX concerns, but I bet they’d think twice about jeopardising the site’s ranking with Google.

This resonates in my bones.

## Article: [“Don’t Feed the Thought Leaders”](https://earthly.dev/blog/thought-leaders/)

> Create an extended product roadmap and put those items at least a year off into the future “and as long as they don’t seem relevant, you can just keep pushing them into the future.” Perversely this plan made everyone happy – everyone’s feedback is on the roadmap, and now it’s all just a question of priorities.

Seemingly perverse, yes. Useful? Also yes.

Roadmaps have use beyond 6-week priorities. Sometimes you have to bring people along for the ride, giving acknowledgement to their voice even though you never plan to act on it. 

> The problem with all the bad advice was that it was unrelated to the problem we were trying to solve…
> 
> The solution to every problem can’t be the same

Boom! 

The solution to every problem can’t be the same? Try telling that to a framework. 

> Uncontingent advice is what I think of when I hear the term thought-leader - someone has a single solution that seems to fit every problem. Whatever problem you face, the answer is test-driven development or stream architectures or being-really-truly-agile.
> 
> I get frustrated by advice like that but is it wrong? Unit testing, streaming architectures, agile are all good things.

It’s a good point. It’s usually good advice. But it’s not always pertinent advice given constraints like resourcing, time, ambitions, goals, etc.

> One way to think about advice is as a prediction. Advocating for TDD can be viewed as a prediction that if you don’t write tests before you write code, your project will be less well-designed and harder to maintain.

Good observation. Advice is prediction. Do `x` and you’ll get `y`. It’s risk mitigation. 

> Software development is full of confident forecasters. We are a pretty new field, and yet everyone seems so sure that they have the best solution to whatever problem is at hand.

The proverbial “silver bullet”.

> A great tool is not a universal tool it’s a tool well suited to a specific problem.

So what’s the takeaway? 

> The more universal a solution someone claims to have to whatever software engineering problem exists, and the more confident they are that it is a fully generalized solution, the more you should question them. The more specific and contingent the advice - the more someone says ‘it depends’… the more likely they are to be leading you in the right direction. At least that’s what I have found.
