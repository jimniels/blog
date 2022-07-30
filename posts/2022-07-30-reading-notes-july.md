#readingNotes

# Reading Notes, July 2022

## Article: [“I Finally Reached Computing Nirvana. What Was It All For?”](https://www.wired.com/story/i-finally-reached-computing-nirvana-what-was-it-all-for/)

Paul just has a way with words.

> configuration is indistinguishable from procrastination

Also loved this note generalized to anyone who ever does anything successful:

> But the likely outcome of the [NFT] boom is that some people will cash out at the right time and become convinced that they hold the keys to the universe and will lecture us for the rest of our lives.

And the ending:

> I am very surprised that the terminal result of my efforts [to configure every aspect of my digital life] is not some sort of ecstatic communion with the internet, or even with my own computer. The function of my whole big orchestrated, tagged, integrated system was merely to rekindle old ties.

Blogging. Emailing. Tweeting. Coding. Configuring. None of these are about the practice themselves. They’re all about the friends we make along the way :)

## Article: [“No News Is Good News”](https://thomasjbevan.substack.com/p/all-news-is-bad-news)

> The news does not matter. It has little, if any real impact on your life besides what you allow it to have. Like a vampire, The news- whether mainstream, alternative, printed or screen-based- is a parasitic force that will drain you of your energy, happiness and rationality if you welcome it over your threshold and in to your life. The key is to simply never invite it in.

That’s a bold statement to an intriguing article. What’s one to do?

> If an event is actually important to your real life, you will find out about it. Such news will find you.

Feels like there are some parallels in here to “keeping up with” or “staying informed on” web dev news. Or, as the author calls it, “the illusion of staying informed”. 

> So how do you bring about change, then? Well, from my experience you ignore all of the things you cannot control and that have little bearing on your life (again, if there is some news that will actually effect your life you’ll hear about it) your focus narrows to your local environment. To yourself and your family and your street and your neighbourhood. These are things you can influence. And from here your influence ripples outwards, and rather than being trapped by impotent rage and fear and confusion, you see that the reality is that you can make things happen. And this is the only piece of news that matters

To be honest, this is part of why I like following _individuals_ over _publications_ or _companies_ in web dev. I get to see the individual behind the writing — the human whose views are evolving, changing, growing, shrinking, whatever it might be. I walk that path with them through their writing. The sensationalism is missing (from most anyway) and you get to see a rough human whose edges are being chipped away and polished as they move through the world.

## Article: [“Sharding Yourself”](https://swyx.io/sharding-yourself)

Good blogging advice:

> Usually one side of your writing will be noticeably more popular than the other, and you will feel tempted to focus to build your audience and improve your signal-to-noise.
> 
> That’s your right, but also you would be depriving the world and your future self of the multifaceted insight machine that you are.

## Article: [“The Demo → Demo Loop”](https://daverupert.com/2022/06/demo-to-demo-loop/)

> If I’m honest, “Dailies” are probably overkill, but I wouldn’t hate it. I would certainly prefer daily demos over vague, ritualistic standup-speak. 

I kinda really like the idea of doing daily demos over  “ritualistic standup-speak”, although I do wonder how long until we’d turn those into “ritualistic daily demos” and collectively accept each others subpar demos like we do our standups ha.

## Article: [“The cost of opinion”](https://glazkov.com/2022/02/23/the-cost-of-opinion/)

> Frameworks and libraries are like layers,  
> and these layers accrete.
>
> Every layer has a vector of intention,  
> pointing toward some idealized value to users,  
> determined by the author of the layer.  
>
> Opinion,  
> or the difference  
> between the vectors of intention of two adjacent layers,  
> always comes at a cost.  
>
> Opinion costs compound  
> and are, directly or indirectly,  
> shouldered by users.  

An intriguing post where the author tries to explain his intuition about whether a framework is “good”.

> Every framework and library [takes] the “what is” of the underlying platform (or layer) and [transforms] them to produce the “what should be”: it’s own APIs. For example, jQuery took the dizzying variety of ways to find a DOM element across different browsers back then (the “what is”) and produced the now-ubiquitous “$()” function (the “what should be”).

There are costs to the opinions in frameworks.

> The cost is proportional to the degree of opinion. For example, if I decided to build a Javascript framework that completely reimagined UI rendering as graphs or three-dimensional octagonal lattices rather than trees, I would quickly find myself having to reinvent the universe. The resulting artifact will weigh some megabytes and consume some kilowatts, with DOM trees still impishly leaking out of my pristine abstractions here and there, necessitating tooling and various other aids to ensure successful launches of user experiences, built using my awesome framework.
>
> What’s even more alarming is that opinion costs have a tendency to compound. Should developers find my framework appealing, I will see more high-profile sites adopting it, causing more developers to use it, extend on top of it, and so on. The outcome of this compounding loop is that users will find more of their computing resources drawn to chew on my opinions.

Frameworks abstractions should aim to trickle down to the platform. If they don’t, they become more expensive. And that cost compounds the more popular the library diverges from the underlying web platform.

> Design of the platform primitives matters, because it establishes the opinion cost structure for the entire developer ecosystem.

This is where so much friction exists, I think, between “components” and “web components”.

> The opinion often comes across as treating the underlying platform as hostile, using as little of it as possible — which unfortunately, is sometimes necessary to make something that actually works.

## Article: [“Stakeholders of styling”](https://adactio.com/journal/18454)

> But as Eric once said, every line of you CSS you write is a suggestion to the browser. That’s not how we think about CSS though. We think of CSS like a series of instructions rather than suggestions. Never mind respecting the user’s preferences; one of the first things we do is reset all the user agent’s styles.

“User agent stylesheets” are a fascinating thing to me. It does seem like, as an industry, we don’t think about them as the default styles _for_ the user. Rather, we see them as the absolute bare minimum which we feel obliged to completely disregard and overwrite without any forethought.

## Article: [“The Ultimate Guide to Writing Online”](https://perell.com/essay/the-ultimate-guide-to-writing-online/)

Overall this piece is bit of a “growth hack” mindset in terms of writing, but there are some nuggets in there. 

> Day and night, your content searches the world for people and opportunities.

> When you create content, people can access your knowledge without taking your time. You no longer need to sell knowledge by the hour. Your ideas are the most valuable currency in a knowledge-driven economy. Just as an investment account allows your money to grow day and night without your involvement, content does the same with your ideas.

I guess this makes me a rookie:

> Trying to build an online audience without an email list is a rookie mistake.

This is part of why making my [readingNotes](/tags#readingNotes), a list of links from my online readings each month, is useful:

> If you publish something every week for a year, you’ll gain tremendous insights into what you should be creating.

Also this:

> My best ideas don’t come from flashes of insight. Instead, they emerge from conversations, tweets, observations, feedback, and other forms of low cost, high-speed trial and error.

And this: you’re already doing the work, might as well synthesize it and make it available to others by writing about it.

> You’re already processing a large volume of ideas through your everyday experience: with the social media updates you post, the books and articles you read, the emails you send, the conversations you have, and the meetings you attend. By consuming, digesting, and sharing these ideas with peers and colleagues, you’re already building expertise.

## Article: [“The future needs files”](https://jenson.org/files/)

> If I’m planning a wedding, it’s very helpful to have all wedding things together. This is data first vs app first organization.

I need a t-shirt that says, “I ❤️ files”.

> I want files to liberate my data from my own apps and create an ML explosion of activity! Files are at some level a hack, I get that, there are limits but they are an extremely useful and flexible hack. Like the QWERTY keyboard, they are “good enough” for most tasks. Files encapsulate a ‘chunk’ of your work and allow that chunk to be seen, moved, acted on, and accessed by multiple people and more importantly external 3rd party processes.

## Video: [“A History of Clojure”](https://www.pldi21.org/prerecorded_hopl.11.html)

> people were no longer pointed at the complexity of the problems they were trying to solve but the tools they were trying to use