#talkNotes

# Notes from Andreas Fredriksson’s “Context is Everything”

I quite enjoyed [this talk](https://vimeo.com/644068002). Some of the technical details went over my head (I don’t know what “split 16-bit mask into two 8-bit LTUs” means) but I could still follow the underlying point.

First off, Andreas has a great story at the beginning about how he has a friend with a browser bookmarklet that replaces every occurrence of the word “dependency” with the word “liability”. Can you imagine npm working that way? Inside `package.json`:

```json
{
  "liabilities": {
    "react": "^19.0.0",
    "typescript": "^5.0.0"
  },
  "devLiabilities": {...}
}
```

But I digress, back to Andreas.

He points out that the context of _your problems_ and the context of _someone else’s problems_ do not overlap as often as we might think.

> It’s so unlikely that someone else tried to solve exactly our same problem with exactly our same constraints that [their solution or abstraction] will be the most economical or the best choice for us. It might be ok, but it won’t be the best thing.

So while we immediately jump to tools built by others, the reality is that _their_ tools were built for _their_ problems and therefore won’t overlap with our problems as much or as often as we’re led to believe.

<img src="https://cdn.jim-nielsen.com/blog/2025/venn-diagram-react.png" width="593" height="630" alt="Venn diagram with three circles. The first says 'My problems', the second 'Your problems' and the third 'Facebook’s problems' and they barely have any overlap and where they do it’s labeled “React”." />

In Andreas’ example, rather than using a third-party library to parse JSON and turn it into something, he writes his own bespoke parser for the problem at hand. His parser ignores a whole swath of abstractions a more generalized parser solves for, and guess what? His is an order of magnitude faster!

> Solving problems in the wrong domain and then glueing things together is always much, much worse [in terms of performance] than solving for what you actually need to solve.

It’s fun watching him step through the performance gains as he goes from a generalized solution to one more tailored to his own specific context.

What really resonates in his step-by-step process is how, as problems present themselves, you see how much easier it is to deal with performance issues for stuff you wrote vs. stuff others wrote. Not only that, but you can debug way faster!

(Just think of the last time you tried to debug a file 1) you wrote, vs. 2) one you [vendored](https://blog.jim-nielsen.com/2025/be-mindful-of-what-you-make-easy/index.html) vs. 3) one you installed deep down in `node_modules` somewhere.)

Andreas goes from 41MB/s throughput to 1.25GB/s throughput without changing the behavior of the program. He merely removed a bunch of generalized abstractions he wasn’t using and didn’t need.

**Surprise, surprise: not doing unnecessary things is faster!**

You should always consider the unique context of your situation and weigh trade-offs. A “generic” solution means a solution “not tuned for your use case”.