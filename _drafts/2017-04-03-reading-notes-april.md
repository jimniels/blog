---
title: Reading Notes, April 2017
date: 2017-04-03
tags: notes
---

## “[The end of the black turtleneck](http://zurb.com/article/1448/the-end-of-the-black-turtleneck)”

Interesting look at how, over time, the curtain has been pulled back on Apple’s magic. Some of this article is meh, but there are a few good pieces in here. 

On how we took the wrong things away from Apple and Steve’s methods: 

> Designer’s took all the wrong ideas away from his presentations. Big reveals were marketing techniques, not methods to surprise our internal product teams. Sexy interfaces were inspirational, not things we blindly copy without consideration for users. Going against the grain was a way to inspire people, not an excuse to shun the ideas of our coworkers . Secrecy was a business technique, not a reason for us to hide and design solo in our computers. Spurring focus groups encouraged risk taking, not give us a reason to avoid learning from our customers.

But now the curtain has been pulled back. We know the truth. We’ve known it the whole time from our own experiences. We just didn’t want to admit it. It’s like when you see celebrity news and realize “oh, they put their pants on one leg at a time like the rest of us”. It’s time to reshape our own thinking and processes:

> It’s time for designers to embrace what really drives amazing products and innovation, connection with other people. The impactful design leader is not a lone genius that locks themselves away only to come back with magic that even they themselves don't fully understand. That’s myth, storytelling. No, the impactful design leader is a facilitator. They bring people together from all parts of their organization, rally them around ideas, and extract the best thinking into small gains that lead to big wins. They are found with people, soliciting feedback from designer and non designer alike. They realize failure is both an inevitable and necessary part of the process. They understand it takes constant iteration and a volume of ideas to get to the right answers. And they don’t have to wear a black turtleneck.

## “[How to Use npm Scripts as Your Build Tool](https://egghead.io/courses/how-to-use-npm-scripts-as-your-build-tool)”

An egghead.io course with lots of useful little tidbits I hadn’t become familiar with yet:

- npm will now load your PATH with your local `node_modules` folder, so you don’t have to specifically reference local modules anymore via the `.bin` folder
	- No more having to do:
		- `"my-script" : "./node_modules/.bin/node-sass input.scss output.css"`
	- Just reference it normally and it'll look in your local `node_modules` first
		- `"my-script" : "node-sass input.scss output.css"`
- You can pass arguments to a script using `--`
	- Compile your CSS
		- `"css" : "node-sass src/styles.scss dist/styles.scss"`
	- If you wanted to watch your CSS, you might do:
		- `"css:watch" : "node-sass src/styles.scss dist/styles.scss" --watch`
	- But then you have to sync changes between the two scripts. Instead you could just do:
		- `"css:watch" : "npm run css -- --watch`
- `npm-run-all` is a useful little package that’ll let you run all your npm scripts more succinctly
	- Say you have three scripts you want to run for linting using different tools
		- `"lint:css" : "csslint --option path/to/file"`
		- `"lint:js" : "eslint --option path/to/file"`
		- `"lint:html" : "linter --option path/to/file"`
	- Instead of doing:
		- `"lint" : "npm run lint:css && npm run lint:js && npm run lint:html"`
	- You can do fancy things like use globbing:
		- `"lint" : "npm-run-all lint:*`
	- For more info on all the neat little things it can do, [checkout npm-run-all](https://www.npmjs.com/package/npm-run-all)
- Use variables in your `package.json` by prefixing the variable name with `$`
	- `"version" : "2.1.0"` in `package.json` can be accessed in your scripts by doing `$npm_package_version`
	- To see variables available to you, do `npm run env`
	- This only works on Mac/linux. You'd have to install something like `cross-var` in order to have it work cross-platform.


## “[Resilient Web Design](https://resilientwebdesign.com)” by Jeremy Keith

> You won’t find any code in here to help you build better websites. But you will find ideas and approaches. Ideas are more resilient than code. I’ve tried to combine the most resilient ideas from the history of web design into an approach for building the websites of the future.

Interesting tidbits on why things are the way they are today:

> That same interface might use the image of a 3½ inch floppy disk to represent the concept of saving data. The reason why floppy disks wound up being 3½ inches in size is because the disk was designed to fit into a shirt pocket. The icons in our software interfaces are whispering stories to us from the history of clothing and fashion.

Embracing the uncertainty of the web:

> While it’s true that when designing with Dreamweaver, what you see is what you get, on the web there is no guarantee that what you see is what everyone else will get. Once again, web designers were encouraged to embrace the illusion of control rather than face the inherent uncertainty of their medium.

History of JavaScript. Love that last line:

> The language went through a few name changes. First it was called Mocha. Then it was officially launched as LiveScript. Then the marketing department swept in and renamed it JavaScript, hoping that the name would ride the wave of hype associated with the then‐new Java language. In truth, the languages have little in common. Java is to JavaScript as ham is to hamster.

Imperative and declarative:

> That’s a pattern that repeats again and again: a solution is created in an imperative language and if it’s popular enough, it migrates to a declarative language over time. When a feature is available in a declarative language, not only is it easier to write, it’s also more robust

Savage:

> Despite JavaScript’s fragile error‐handling model, web designers became more reliant on JavaScript over time. In 2015, NASA relaunched its website as a web app. If you wanted to read the latest news of the agency’s space exploration efforts, you first had to download and execute three megabytes of JavaScript. This content—text and images—could have been delivered in the HTML, but the developers decided to use Ajax to retrieve this data instead. Until all that JavaScript was loaded, parsed, and executed, visitors to the site were left staring at a black background. **Perhaps this was intended as a demonstration of the vast lonely emptiness of space.** (*emphasis added*)

The rise of deploying web apps via traditional software tooling (packaged entirely as a js app):

> It’s tempting to apply the knowledge and learnings from another medium to the web. But it is more structurally honest to uncover the web’s own unique strengths and weaknesses.

He continues:

> On the face of it, the term “web platform” seems harmless. Describing the web as a platform puts it on par with other software environments. Flash was a platform. Android is a platform. iOS is a platform. But the web is not a platform. The whole point of the web is that it is cross‐platform...The web isn’t a platform. It’s a continuum.

## Video: [“How to Design a Good API and Why it Matters”](https://www.youtube.com/watch?v=aAb7hSCtvGw) by Joshua Block, Principal Software Engineer at Google

In my search for stuff to listen to, I Google’d “the best programming talks” and this was one I stumbled on in a comment thread somewhere out there on the internet. 

As I’m not a *real* computer programmer (but as Pinocchio said, maybe someday) I like to find talks that take a broader perspective and explore principles applicative to any discipline, be it programming, design, or maybe just woodworking. This talk had some of that, thought it was also quite technical at times. Anyhow, I wanted to just make some notes on the tidbits I liked (the slides from the talk can be found [here](http://static.googleusercontent.com/media/research.google.com/en//pubs/archive/32713.pdf)).

### Implementation Should Not Impact API

> Don’t let implementation details “leak” into API

I think this stood out to me most because it’s something I’ve seen happening a lot at my current job: the technical details of a particular service or API has leaked into a user-facing product and become a mental model for both internal employees and external customers. The problem with this, as the speaker points out, is that it inhibits the freedom to change the implementation in the future because people depend on it.

### Names Matter

Around minute 31 he talks about how your API is a little language unto itself. You should be consistent and regular where terminology is largely self-explanatory. **If you succeed in naming things consistently and simply your code can end up reading like prose**, which is generally an indicator of a well-designed API, i.e.

```js
if (car.speed() > 2 * SPEED_LIGHT) {
  speaker.generateAlert('Watch out for cops!');
}
```

### Using Conventions

Around minute 39 he started talking on how you should borrow conventions from existing languages and platforms. Some of his points included:

> - Obey standard naming conventions
> - Mimic patterns in core APIs and language
> - **Don’t transliterate APIs**

His point, which I think can be generalized to any profession, is that if you build with concepts people are already familiar with, it can lend simplicity to your product. If somebody knows how to use a native convention in a programming language or ecosystem, they’ll know how to use yours. But don't transliterate he says. If you’re building for C, don’t learn everything about C’s way of doing X and mirror that to your tool. Plus what was correct in C may not be correct for your particular implementation. It’s good to step back and ask “what is this trying to do?”.