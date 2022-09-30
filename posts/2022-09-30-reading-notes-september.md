# Reading Notes, September 2022

## Article: [“Critical CSS? Not So Fast!”](https://csswizardry.com/2022/09/critical-css-not-so-fast/)

A wonderful breakdown. This about sums it up right here:

> [Critical CSS:] we tackled the wrong problem.

## Article: [“It's not an experience”](https://world.hey.com/jason/it-s-not-an-experience-d5ff9ee2)

> They ask me to rate my "experience". Thing is, I didn't have an experience. The delivery person just left the package by the mailbox and I grabbed it when I got home.

Maybe we’ve missed the mark.

> They're trying to track everything, and asking people to attribute "experience" to things that are mere, routine happenings. Most things just don't need to be rated.

I had this experience the other day when I ran to Walmart to quickly pickup some Planters nuts and upon finishing at self-checkout aisle was asked to rate my “experience”.

> I'm seeing this everywhere and I can't help but think it's generating data that's incompatible with the actual situation. Being asked to rate minutia with a 10-point scale, and ascribe depth of an experience to something that's effectively flat and one dimensional, is overshooting the goal.

## Article: [“The Demise of the Mildly Dynamic Website”](https://www.devever.net/~hl/mildlydynamic)

This one hits right on the nose. The idea of PHP’s incremental, linear dynamicity feels so lost in many of today’s technological abstractions.

> Here's the problem: mildly dynamic functionality…is too minor to be worth bringing in a web application framework, and spawning and maintaining persistent processes just to serve a website.

> What PHP offered is an increase in this effort proportional to the amount of dynamicity to be added to a website. This is something no framework can do…If you have a static website and you want to make it dynamic and you don't use PHP, pretty much all options available to you imply a massive increase in complexity that must be paid up front before you can do anything at all. You bring in a massive framework for the dynamic equivalent of “Hello World”, and then on top of that (if it's a non-PHP framework, meaning persistent processes are probably involved) the process for deploying your website radically changes and becomes far more complex.

> This in turn has led to much of the functionality which might have previously been implemented on the server side on a “mildly dynamic” website being moved to JavaScript.

Client-side JavaScript, that is. The idea of dynamicity in a website became something to be outsourced, both in technology and compute (e.g. “just embed this `<script>`”).

> PHP remains the only server-side technology really offering a linear increase in effort for a linear increase in dynamicity.

> Suppose you are writing an article about some concept and you want to put some special dynamic widget in the middle of the article, which people can play with to gain an understanding of the concept. This is just one article you're writing, one of countless others; you're not going to spin up an application server (and maintain it indefinitely) just for this throwaway toy widget. The only reasonable implementation options are JavaScript and PHP…
> 
> Or, suppose a company makes a webpage for looking up products by their model number. If this page were made in 2005, it would probably be a single PHP page. It doesn't need a framework — it's one SELECT query, that's it. If this page were made in 2022, a conundrum will be faced: the company probably chose to use a statically generated website. The total number of products isn't too large, so instead their developers stuff a gigantic JSON file of model numbers for every product made by the company on the website and add some client-side JavaScript to download and query it. This increases download sizes and makes things slower, but at least you didn't have to spin up and maintain a new application server. This example is fictitious but I believe it to be representative.

> the ability to just give a piece of code an URL in 30 seconds, without complex deployment tooling, proprietary APIs or vendor lock-in seems to me a lot more valuable for the things I do

## Article: [“There is no ‘software supply chain’”](https://iliana.fyi/blog/software-supply-chain/)

> In actual supply chains, money is changing hands

Good perspective on the “software supply chain” and the captialization of hobbyist software.

> I just want to publish software that I think is neat so that other hobbyists can use and learn from it, and I otherwise want to be left the hell alone. I should be allowed to decide if something I wrote is “done”. The focus on securing the “software supply chain” has made it even more likely that releasing software for others to use will just mean more work for me that I don’t benefit from. I reject the idea that a concept so tenuous can be secured in the first place.

## Article: [“Behind the App: Wallaroo”](https://furbo.org/2022/09/13/behind-the-app-wallaroo/)

> Ged, Anthony, Dave, and Talos immediately got to work on the first bullet, but without a backend server, there was no place to put files and metadata. So we made a Numbers spreadsheet and shared it in Dropbox along with the source images. Our Slack channel for the project was filled with “I’m going in” and “I’m out!” to avoid write conflicts. (S.W.A.T. = Software Write Avoidance Technique)

Love stories of people doing things in ways that might seem unsophisticated or clunky but it doesn’t get in the way of building something cool.

## Article: [“This is what you’re nostalgic for”](https://thehistoryoftheweb.com/postscript/this-is-what-youre-nostalgic-for/)

> I believe we aren’t nostalgic for the technology, or the aesthetic, or even the open web ethos. What we’re nostalgic for is a time when outsiders were given a chance to do something fun, off to the side and left alone, because mainstream culture had no idea what the hell to do with this thing that was right in front of it.

## Article: [“#Shorts”](https://manuelmoreale.com/thoughts/shorts)

> The entire society behaves like a drug addict. We know we have a problem collectively but we do nothing to actually help ourselves.

## Article: [“UHX”](https://manuelmoreale.com/thoughts/uhx)

> User Hostile Experience is what I call the ever growing trend of making websites as annoying as possible for the average user in order to improve some idiotic metric no one cares about. I'm talking about Twitter forcing me to register or log in in order to read tweets. I'm talking about Instagram forcing me to register or log in in order to play a video a second time. I'm talking about websites forcing me to click through endless pages to improve their page views. And the list goes on and on and on

## Article: [“Re: AI for content creation”](https://hidde.blog/re-ai-content/)

> When I want to find a recipe for pizza dough on the web, I would consider myself lucky if I could get ahold of a blog post from someone who cares passionately about the right kind of dough, who maybe ran an artisan pizza kitchen in Naples for the past 30 years or has a background in baking. ‘Dream on’, you think. Well, these people exist on the web and the web is awesome for being an open platform that anyone with a passion can write on. I don't want to find text produced just because someone saw “pizza dough” is a common search phrase and a potential for top result ad money to be extracted. The passion that drives them isn't the pizza dough—that's fine, but it makes their content less relevant to me. 