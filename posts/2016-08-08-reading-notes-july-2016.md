#readingNotes

# Reading Notes, July 2016

## Article [The Law of Leaky Abstractions](http://www.joelonsoftware.com/articles/LeakyAbstractions.html)

> The law of leaky abstractions means that whenever somebody comes up with a wizzy new code-generation tool that is supposed to make us all ever-so-efficient, you hear a lot of people saying “learn how to do it manually first, then use the wizzy tool to save time.” Code generation tools which pretend to abstract out something, like all abstractions, leak, and the only way to deal with the leaks competently is to learn about how the abstractions work and what they are abstracting. So the abstractions save us time working, but they don't save us time learning.

This is the problem computers present to us in general, not just in coding. They abstract tasks for us. Even something as simple as a spell checker. If you grow up never really learning to spell but always relying on a spell checker (or autocorrect), you'll never be able to write without the assistance of a computer. The computer has become a crutch.  As the author stated, abstractions and automation can help you save time doing but they cannot help you save time learning.

## Article [Holistic Management](http://blog.capwatkins.com/holistic-management)

An interesting insight into the idea of “holistic management”, where you look at how decision made for and in-behalf of your team will ripple through and affect your larger organization:

> Just like we ask designers, engineers and PMs to consider the entire system when designing and building their slice of it, we should also ask the same of ourselves as managers.

## Article [Mixins Better for Performance](http://csswizardry.com/2016/02/mixins-better-for-performance/)

Interesting look at performance difference between `mixin` and `extend` in sass. I found this particular point refreshing:

> Y’see, when people talk about the performance of mixins, they’re usually thinking about filesize on the filesystem. But because we have gzip enabled (you do have gzip enabled, right?), we should be thinking about filesize over the network.

I often forget this fact. As the Harry Roberts, the author, goes on to show in the article: filesize on the filesystem is one thing and filesize gzipped can often be something else entirely. In his example, File1 was 150% larger than File2 upon compilation, but after gzipping, File1 as 33% smaller than File2.

## Article [The Year In Design](http://www.zeldman.com/2015/12/24/the-year-in-design/) by Zeldman

> 90 percent of design is typography. And the other 90 percent is whitespace.
> Style is the servant of brand and content. Style without purpose is noise.

Rediscovering this with the renewed interest in speed, basic page structure semantics, JavaScript fatigue, etc.

> One illustration or original photo beats 100 stock images.

With the ubiquity of people being online, they see everything across the Internet (especially the younger generation) so if you’re not unique, they’ll notice. If you’re bland, they’ll notice

> Nobody waits. Speed is to today’s design what ornament was to yesterday’s.

This is an interesting observation. I feel like it puts into words this nagging feeling I’ve had the last few months: speed is design. On the web, speed is just as much a part of the design as the grid or typography. In many cases, I think some people would prefer the speed and simplicity of vanilla HTML markup over giant JavaScript apps when all they need to see or read is a few dozen lines of text.
