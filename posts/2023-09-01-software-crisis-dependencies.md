#bookNotesSoftwareCrisis

# “Out of the Software Crisis”: Dependencies

_The following is an extension of [my notes from Baldur’s book “Out of the Software Crisis”](https://blog.jim-nielsen.com/2023/book-notes-out-of-the-software-crisis/) including quotes from the author._

Software is a lot like life — probably because it models our lives — in that it’s constantly changing.

> The biggest threat to the economic value of code is that everything is always in flux.

But it’s not just the software we’re building that’s in constant flux. _The software in our software_ is constantly changing too, i.e. our dependencies.

> each dependency is like a loan. It gives your software development system Stock right at the beginning when you need it, but the repayments can destroy you.

There is an incredible amount of variability in software stemming from dependencies. Baldur illustrates this with the idea of creating one app across multiple operating systems, but I think it also applies to trying to build one app across multiple dependencies.

> [In software] risks are compounded. Supporting three operating systems means your code gets devalued through platform changes three times as often and if the implementations share any code, those changes will interact, causing more errors and bugs. 

Think of the compounding risk happening inside the `node_modules` directory. So many MAJOR, MINOR, and PATCH changes occurring across a variety of dependencies, none of which share any holistic or unified direction. Each package is maintained by independent authors so some dependencies get more complicated, others less, all of them diverging and converging in changes. And sometimes dependencies come to rely on the “unimproved state” of their peers.

It reminds me of [that xkcd comic about dependencies](https://xkcd.com/2347/):

<img src="https://imgs.xkcd.com/comics/dependency_2x.png" width="385" height="499" alt="XKCD comic about modern digital infrastructure and dependencies depecting a variety of blocks of different sizes all precariously stacked on top of each other.">

To Baldur’s point, imagine each of those blocks constantly changing — in size, in density, in material — with no unifying vision or direction. That thing would be constantly wobbling, teetering to and fro, and you are in charge of keeping it standing. 

That’s a tough job. And it’s full of risk.

At that point, you’re no longer building an app that people use to do something. You're building an app _that generates another app_ that people use to do something.

Hence the value of “use the platform”: it drastically reduces the variability in your code which is advantageous because it allows you to focus on the problems you’re trying to solve rather than maintaining the non-uniform, colliding updates of dependencies that underly your software program.

As Baldur notes, “Low variability opens up its own possibilities.” Dependencies are a definite point of variability, so lowering your dependence on other software opens up its own possibilities, e.g. less risk and more stability. It’s kind of interesting to think about how adding dependencies can give you more velocity, but taking them away can too. It’s [trade-offs](https://tech.sagesure.com/blog/2021-11-30-design-systems-and-trade-offs/) all the way down.

