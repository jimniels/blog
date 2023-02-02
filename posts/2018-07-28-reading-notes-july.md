#readingNotes

# Reading Notes, July 2018

## Article: [“Removing Babel's Stage Presets”](https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets.html) via babeljs.io

Stage presets are being removed in Babel v7 and Henry Zhu makes the case as to why.

Personally, I’m all for it. Stage presets always confused me. Making developers opt-in explicitly to varying levels of language experimentation will be beneficial to everyone because it will force us as a community talk more specifically about the (often quite disparate) evolutionary changes in the language.

> Removing the presets would be considered a "feature" since it means someone would have to make an explicit decision to use each proposal, which is reasonable for any proposal since they all have varying levels of instability, usefulness, and complexity.

I like this. You can still get proposals grouped together if you want, but not from the “official” project. It makes developers put too much trust in grouped presets. Leave that up to third parties, which should encourage developers to better vet their sources for grouped proposals. I think this is the right choice because Babel should be low level. Other higher level frameworks or tools can make (and obfuscate) the choices of grouped proposals for people (like `create-react-app`).

> people will have to opt-in and know what kinds of proposals are being used instead of assuming what people should use, especially given the unstable nature of some of these proposals. If you use another preset or a toolchain, (e.g. create-react-app) it's possible this change doesn't affect you directly.

Remember too that it’s not only Babel that has to update with stage presets, but everything down river from that. That’s too much churn to support for something like Babel IMO. Unsustainable. So this again was a good choice

> Once new syntax is proposed, many things need updating: parsers (`babylon`), syntax highlighting (`language-babel`), linters (`babel-eslint`), test frameworks (`jest/ava`), formatters (`prettier`), code coverage (`istanbul`), minifiers (`babel-minify`), and more.

The maintainers seems to recognize that’s too much for Babel to be biting off. They’d be better off if their skin wasn’t in that game.

> In many ways, it's surprising we even attempt to handle [stages] in Babel itself given the constant updates and churn.

## Podcast: [“Async React with Andrew Clark”](https://itunes.apple.com/us/podcast/react-podcast/id1341969432?mt=2&i=1000408580046) via The React Podcast

The podcast itself had some interesting tidbits in it, but what I really liked was this little snippet from Andrew: 

> Code is temporary. Ideas persist. 

Side note: this is a good question to ask yourself when coming into or architecting a project — what are the *ideas* underlying this code? Code can be refactored, but only within the framework of the ideas which support it (otherwise you’re looking at a significant rewrite).

## Article: [“React - Basic Theoretical Concepts”](https://github.com/reactjs/react-basic) by Sebastian Markbåge

I never known about this repo until hearing about it on “The React Podcast”. It’s an interesting conceptual approach to the underpinnings of react. In other words, its an expression of the ideas in React irregardless of the code that implements it.

> The actual implementation of React.js is full of pragmatic solutions, incremental steps, algorithmic optimizations, legacy code, debug tooling and things you need to make it actually useful. Those things are more fleeting, can change over time if it is valuable enough and have high enough priority. The actual implementation is much more difficult to reason about.

## Tweet: [Icons aren’t logos](https://twitter.com/Mantia/status/1013508524830121984) by @Mantia

Iconic iconist Louie Mantia on twitter:

> Icons: they’re not logos.
>
> Use elements of your brand like color, shape, weight, and style, but resist the urge to just use your logo.

[This first photo](https://pbs.twimg.com/media/DhC0oEBU8AASuEV.jpg) was illustrative of his point, but he followed up with [another tweet](https://twitter.com/Mantia/status/1013855859007340544) illustrating how different brands could use the same metaphor of a TV in designing their icon without losing brand “equity” ([see the photo](https://pbs.twimg.com/media/DhHwhstVMAAK8iK.jpg)).

I, for one, like it. I’d love to see more icon design like this in the wild.

## Tweet: [Thread between @thekitze and @danabramov](https://twitter.com/thekitze/status/1012392146186489858)

I’ve always enjoyed following Dan, he brings a dose of reality and empathy to a tech world often awash with exaggerated claims.

@thekitze

> If we would start webdev from scratch and had to choose between:
>
> - CSS vs css-in-js
> - REST vs GraphQL
> - Templates vs JSX
> 
> No sane person would choose the first options

@dan_abramov

> There are three things wrong with this tweet:
> 
> - Calling people insane for technical choices is an asshole move
> - This paints React community as obnoxious know-it-alls
> - Tech on the right is both overkill for smaller sites (majority of the web) and still far from being “done”

@thekitze

> Dan, this has nothing to do with React or frameworks. 
> 
> What I'm trying to say is: just imagine if these weren't technical choices and we had to *invent* ways of styling, passing data & writing components. 
> 
> I don't know if people are trying too hard to misunderstand the tweet.

@dan_abramov

> It has to do with React because you are prominent in the React community. Whether you want it or not, people from other communities reading this will think “React developers agree with this person that I’m insane for liking e.g. CSS”.

@thekitze

> Sane might have been a wrong word. Maybe "experienced".
> 
> Still, people are misunderstanding the "invent" part of the tweet. If we had to *invent* styling most experienced developers would choose tight coupling of styles to elements (otherwise Sass/Less/BEM/Modules wouldn't exist)

And then [this](https://twitter.com/dan_abramov/status/1012663626723987457) — IMO an incredibly insightful, reasoned response in a technological discussion.

@dan_abramov

> Again, you’re implying that the other side of the tradeoff only appeals to inexperienced people. This is super patronizing. Have you considered that maybe you lack the experience to appreciate simpler options that match the problem domain more closely?

I love that phrase: “Have you considered that maybe you lack the experience to appreciate simpler options that match the problem domain more closely?”

I love when someone conjoins just the right words in just the right order. Thanks Dan.

## Article: [“The Cult of the Complex”](https://alistapart.com/article/cult-of-the-complex) by Jeffery Zeldman

> toolchains have replaced know-how...we must rid ourselves of the cult of the complex. Admitting the problem is the first step in solving it.

That’s how Zeldman has begun his latest tirade. Granted, the delivery is  classic Zeldman, but if you wade through some of the ranting and listen for his points, I think he makes some valid ones.

> Alas, many new designers and developers (and even many experienced ones) feel like they can’t launch a new project without dragging in packages from NPM...with no sure idea what the code therein is doing...For them, it’s a matter of job security and viability. There’s almost a fear that if you haven’t mastered a dozen new frameworks and tools each year (and by mastered, I mean used), you’re slipping behind into irrelevancy. HR folks who write job descriptions listing the ten thousand tool sets you’re supposed to know backwards and forwards to qualify for a junior front-end position don’t help the situation.

## Article: [“The Majestic Monolith”](https://signalvnoise.com/the-majestic-monolith-29166d022228) via 37Signals Blog

37Signals, makers of Basecamp and ever the buckers-of-trends, wrote this piece about why a monolith architecture (vs. the trendy micro service) is the right technological solution for them. At a more general level, they make this important observation:

> The patterns that make sense for organizations orders of magnitude larger than yours, are often the exact opposite ones that’ll make sense for you. It’s the essence of cargo culting. If I dance like these behemoths, surely I too will grow into one. I’m sorry, but that’s just not how the tango goes.
>
> This is true of not just technical patterns, but general organizational approaches too. But that you shouldn’t run HR like a 50,000-person company when you have 50 seems obvious to most though (with some exceptions)

## Article: [“Designed in China, Assembled in California”](https://ia.net/topics/designed-in-china-assembled-in-california) via iA

A fourth of July soliloquy:

> As China starts outdoing us economically, technically and strategically, we are turning Chinese, slowly losing the spiritual, cultural and political texture that made us different....Silicon Valley spies on us like the Chinese Government—and in many ways they see China as their role model. They admire entrepreneurs that don’t sleep, don’t see their children, don’t care about such touch-me-feel-me nonsense like the truth, justice, beauty or how others feel.

So what makes the West unique? The author suggests the following 16 items:

> 1. That all men are by nature equally free and independent
> 2. That all power is vested in the people
> 3. That government is instituted for the common benefit
> 4. That no man is entitled to exclusive privileges
> 5. That legislative executive should be separate and distinct from the judicative;
> 6. That elections ought to be free
> 7. That all power without consent of the representatives of the people is injurious
> 8. That in prosecutions a man hath a right to demand the cause and nature of his accusation
> 9. That excessive bail ought not to be required, nor excessive fines imposed nor cruel and unusual punishments inflicted
> 10. That general warrants are grievous and oppressive
> 11. That the ancient trial by jury is preferable to any other
> 12. That the freedom of the press is one of the greatest bulwarks of liberty
> 13. That a well regulated militia is the proper defense of a free state; that standing armies, in time of peace, should be avoided as dangerous to liberty
> 14. That the people have a right to uniform government
> 15. That no free government can be preserved to any people but by a firm adherence to justice, moderation, temperance, frugality, and virtue
> 16. That religion can be directed by reason and conviction, not by force or violence

And what's so special about these? They are ideas whose impact cannot be directly measured, which is why perhaps in our day they go undervalued:

> The West has 16 things to lose [which cannot] be touched, bought or expressed in numbers. It’s not the GDP, it’s not the number of STEM graduates, it’s not the top positions in the charts of the biggest banks. What we can hope is that the bureaucrats and technocrats continue to undervalue how powerful the unmeasurable is. These 16 ideas have survived Napoleon, ended First World War and won against the Nazis. They have survived the Khmer and they have survived Stalinism. Happy fourth of July.
