#readingNotes

# Reading Notes, May 2018

## Article: [“A modest guide to productivity”](https://www.frankchimero.com/blog/2018/productivity-guide/) by Frank Chimero

I just really liked this comment in particular and wanted to make note of it:

> A person is not a brain driving a meat robot; it all runs together. If work is stymied, ask: are you eating clean? Getting enough sleep? Did your heart pump more than a sloth today? Start with your body, not your work methods. Trust me.

## Article: [“Bitcoin Is Ridiculous. Blockchain Is Dangerous”](https://www.bloomberg.com/news/features/2018-03-09/bitcoin-is-ridiculous-blockchain-is-dangerous-paul-ford) by Paul Ford via Bloomberg

An entertaining opinion on the state of Bitcoin and its parallels to the early days of the web.

This particular quote I enjoyed as it points out what I like to think of as the Jurassic Park / Ian Malcom problem: we go so fast questioning “can we do this?” that we often don’t stop to think “should we do this?” until way after we’ve already encountered the ramifications:

> the frameworks are coming to build such tools and make them anonymous and decentralized, so that they might endure, and, as with all internet things, they’ll arrive well ahead of the ethics we need to make sense of them.

## Article: [“I, for one.”](https://ethanmarcotte.com/wrote/i-for-one/) by Ethan Marcotte

Going along with another [great post from Jeremy Keith](https://adactio.com/journal/13498), Ethan comments on the on-going controversy around Google’s continuing attempts to promote proprietary technologies (over open ones) with the AMP project. He draws an interesting parallel with the political climate today in America:

> [the] trend of corporations-as-activists is the result of an ongoing politicization of the public sphere, which is itself the result of a government that’s unable (or unwilling) to serve its citizens

Then concludes:

> the creation of AMP isn’t just Google’s failure, but our failure...of governance of our little industry. Absent a shared, collective vision for what we want the web to be—and with decent regulatory mechanisms to defend that vision—it’s unsurprising that corporate actors would step into that vacuum, and address the issues they find.
> 
> And once they do, the solutions they design will inevitably benefit the corporation first, and the rest of us second. If at all.

## Article: [“Domo Arigato, Mr. Roboto, Tell us Your Secret”](https://ia.net/topics/domo-arigato-mr-roboto-tell-us-your-secret/) via Information Architects

I thought the author’s comment here on Twitter’s response to banning spam bots (whereas Facebook turned to tuning their algorithms so as to not “censor”) was interesting, i.e. “you have the power to shape your own destiny”:

> Here is a heavy dose of practical philosophy for you: You know who decides? Those who take responsibility. And those who decide and take responsibility shape their destiny. For those who wait and see other people will decide. This is a moment where Twitter can make precious ground over a seemingly invincible Facebook.

The article is an interesting look at UI design in an automated age. It argues we should clearly differentiate humans and bots in user interfaces, a line which, right now, is mentally taxing at the least and impossible at the most:

> Programming an army of bots in a system without checks and balances is economically interesting. It happens because it is cheap.

The UI mockups are interesting. Personally, I would love something like this.

## Podcast: [“Spotlight: Frank Chimero”](https://responsivewebdesign.com/podcast/frank-chimero/) via Responsive Web Design

I really like Frank’s insights into the web as a medium. This podcast is no different. Around minute mark 18 though, it gets *really* interesting.

Ethan asks him the following question:

> in some ways you’re sort of trying to frame what a web native aesthetic might be in general for web design...I’d love to hear a little bit more about that, Frank, and just generally how you think about what the web needs as a design medium

I’ve just pulled the entire transcript at that point, because I think everything Frank says is worth pondering (emphasis mine):

> One of the reasons that I think so much about what websites should look like, not just in specific terms like, “Oh, I have this client. What should their website look like?” but just in general, what should the experience of going from website to website feel like, it’s mostly grounded in the fact that I sort of see web designers repeating things that we’ve labeled as mistakes before. **We did a lot of work...trying to iterate to people the importance of semantics and accessibility on websites, and the benefit to users of having consistent experiences across those website and having those experiences be driven by the interactivity of the browser**, right? That’s why Flash websites weren’t so great, because every time you hit a Flash website, you didn’t know how to use it. I see us sort of repeating that at this point. There are sort of **these marquee websites that are obviously for marketing but there’s a lot of whizzbangery around it because they’re meant to draw attention**. But they have some of those fundamental usability problems that I think those early Flash websites had, and it’s really hard for me to look at them and not see them as cumbersome and bloated—and cool, but **I find myself looking at them more than actually using them. Maybe that’s the intent**, I’m not really sure.
> 
> So, that’s kind of one of the reasons why I was like is there an oughtness?...**Is there a way towards making websites that feel like they’re websites? I have a pretty good feeling about what that is and it doesn’t necessarily overlap too much with the whizzbangery that gets a lot of attention.** So, wanting to really drill down and say, well, okay, **what’s the web’s grain?** Well, the web kind of wants you to stack things vertically on top of each other and have quite a bit of text. It wants to be fluid, it wants to scroll vertically, and it wants to probably use flat colors or simple gradients because that’s what’s easy to specify inside of CSS, and also you can take those aesthetic rules and stretch them out to boxes of indeterminate shape or boxes that might change shape based on how somebody’s accessing the website or how much content is sitting inside of that box. So, it’s like **what is the aesthetics of fluidity?** That’s really what the main question is, and a lot of it is dictated by what the tools make easy for you to do.
> 
> So, I think that you can make a perfectly great and serviceable website probably with just, I don’t know, 100 to 150 lines of CSS. It doesn’t take really that much. It doesn’t take a lot of JavaScript or anything like that. **The old websites from the 90’s, they still work, their fonts just need to be a little bit bigger and they need to set a max width on their paragraph so it has a nice measure.** Other than that, you go back and look at a bunch of the essays by Tim Berners-Lee and you’re like, “Actually, this still holds up. I’m not a big fan that it’s in Times New Roman, but that’s what they had to work with.”
> 
> So, that’s what’s interesting to me. **It’s taking sort of a principled stance as a starting point, honoring the materials that you’re working with and believing that the web has a grain** like how a piece of wood has a grain. You can work against that grain, and that creates interesting work that requires a lot of craftsmanship, but for the most part, **if you’re building something, you’re going to want to go with the grain because it’s going to be sturdier**, it’s going to be easier for you to work with and typically, hopefully, in the process it will be a little bit more beautiful, too.
> 
> We had a conversation about web fonts mostly in that, from a kilobyte perspective, they’re pretty pricey, and there’s all of these logistics to worry about if you want a performant website, about how they load and if you want the flash of unstyled text or using JavaScript to put conditional classes on bodies to change the body font after the fonts load and those sorts of things. My question was just sort of like, well, that’s really easy for other people, but every additional step that they need to take is an extra point of fragility, right? So, I’m just sort of wondering is it worth the effort.
> 
> Right now, my website is using two typefaces, one is called Fakt and the other one is called Arnhem, and the fallback immediately after that is San Francisco and Georgia. If I take out the web fonts, I like it nearly as much as if I had the web fonts in there. The vibe of the site changes a little bit, but for the most part most of the typefaces are of the same size, so it isn’t like a world of difference changing the typeface to these fallbacks. So it’s like, well, do I actually need those typefaces in there, or would it just be easier and more stable to have those system fonts being used? I kind of waffle on it, I go back and forth probably every single day, and I decided to leave them in because I was like, well, I bought them, let’s use them. But it is sort of like this interesting question whether these additional assets, what the trade-off for each one of these is. Because **every additional element you add to a web page, it costs something, you know? It benefits in some way, but it also costs something, and eventually you’ve got to justify the cost**, because we can’t communicate the size of web pages before they’re loaded.


## Article: [“What Does Code Readability Mean”](http://typicalprogrammer.com/what-does-code-readability-mean)

My takeaway: can I be a little more humane in how I talk about code? Rather than “this code sucks”, how about “I can’t understand this code – yet.” The inference being: the problem of the code problem lies with me, the reader, not the original writer.

In a similar vein, at the end of the day humans (i.e. developers) are the real resource of your business not the code. This is because all code rots because business requirements change. When I rewrite code, it’s a sign of adding value to the business, not a sign of failure on part of the previous programmer(s).

What follows is mostly just a brain dump of contents from this article that stuck out to me.

> By analogy, plenty of people find reading Homer, Shakespeare, or Nabokov difficult and challenging, but we don’t say “Macbeth is unreadable.” We understand that the problem lies with the reader. We may not have sufficient experience with the language and idioms. We may not have enough historical and cultural context (similar to lacking domain expertise when looking at software). We may not have the patience or desire to invest time learning how to read a challenging book. Wikipedia articles and Cliff’s Notes exist to give tl;dr versions of books to people who can’t or don’t want to read the original. When we observe this tendency in other (non-programming) contexts we may interpret it as laziness or short attention span. When we react this way to code we blame the code and the original programmer.

> Programmers usually think that they should focus on writing code. Reading code, especially someone else’s code, seems like grunt work, a necessary evil, often relegated to junior programmers in maintenance roles. 

> I have personally witnessed (more than a few times) professional programmers dismiss working, production code as “unreadable” and “unmaintainable” after looking at it for just a few minutes.

> “Good code is simple” doesn’t actually say anything. My many years of programming experience and business domain expertise gives me a very different idea of “simple” than someone with less experience and no domain expertise looking at some code for a few minutes. What we call “simple” depends on our experience, skills, interest, patience, and curiosity. Programmers should say something when they don’t understand code, but rather than saying “this code sucks” they should say “I can’t understand this code – yet.” That puts the focus on the person who struggles to understand rather than on the code. I agree that code reviews improve code quality and team cohesion, but whether that translates to “simple” code depends on the programmers. Programming teams usually converge on common idioms and style, and that make programming together easier, but that convergence doesn’t mean the code will look readable to an outsider looking at it six months later.

> When I understand the code I may think that I know a simpler or more clear way to express it, or I may think that the code only presented a challenge to me because I didn’t have the skills or knowledge or right frame of mind. In my experience figuring code out takes significant time and effort, but when I get through that I don’t usually think the code has fatal readability flaws, or that the original programmer didn’t know what she was doing.

> Public code reviews create a kind of programmer performance art, when programmers write code to impress other programmers, or to avoid withering criticism from self-appointed experts.

> Better programming comes through practice, study (from books and other code), and mentoring. It doesn’t come from trying to blindly adhere to rules and dogma and cargo cults you don’t understand or can’t relate to actual code.

> All code baffles and frustrates and offends a significant subset of programmers.

> How do you learn to write readable code? Like learning to write readable English, you have to read a lot. 

I don’t generally read hackernews (nor its comments), but for some reason while traveling down the black hole of internet browsing, I ended up in the hackernews comments for this article. I thought these were interesting observations. 

[One comment](https://news.ycombinator.com/item?id=16096588)

> I like Rich Hickey's stance on this: "simple" is objective (antonym: "complex"), whereas "easy" is subjective (antonym: "hard"). Easy depends on skills, interest, patience, curiosity - but simple does not. Simple is about lack of intertwining of concerns. About writing code that can be understood without "bringing in" the entire codebase into your mind. Like, you can understand a pure function just by looking at it (it's simple). If it modifies or uses a global variable, now you have to look at all the places that "touch" that global variable, in order to understand what your function does; the code is thus much more complex.

[Another](https://news.ycombinator.com/item?id=16096795) (emphasis mine)

> Reading code is about 10x as hard as writing it. It takes more concentration, it's less fun, it's harder, and it doesn't impress anyone. You have to know the language better than the person who wrote it, because not only do you have to understand why the code does what they intended it to, but you also have to understand why the code does other things they didn't intend (a.k.a. bugs). But **in my experience, you save your team a lot more time and energy in the long run by preferring to read and understand existing code.**

[Another](https://news.ycombinator.com/item?id=16096933) (emphasis mine)

> There is a lot the context you’ve built up in writing that code that could never fit in the comments (even if thoughts could easily be expressed in words, they would dwarf the code and not directly correspond to it; actually comments can actually make code reading harder in this way). **It really isn’t about the language either...but how the problem was defined and understood in the first place, how this understanding was encoded in the software.**

[Another](https://news.ycombinator.com/item?id=16097104)

> I sometimes describe programming as a one-way hash operation on requirements. A lot of information and context gets lost when writing software, and I haven't seen a workable solution to that problem yet.
