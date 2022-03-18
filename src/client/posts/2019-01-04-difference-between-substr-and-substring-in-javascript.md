#engineering

# The Difference Between substring and substr in JavaScript

![substring vs. substr](https://cdn.jim-nielsen.com/blog/2019/substring-vs-substr.png)

I’m always having to lookup stuff like this. Often times I know like 90% of the answer, but that remaining 10% of ambiguity requires I look it up. In this case, Google led me to [a stack overflow answer](https://stackoverflow.com/questions/3745515/what-is-the-difference-between-substr-and-substring) stating:

> The difference is in the second argument. The second argument to `substring` is the index to stop at (but not include), but the second argument to `substr` is the maximum length to return.

It also had links to Mozilla’s docs on [`substr`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/substr) and [`substring`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/substring), which helped clarify the answer for me.

Additionally (and almost equally important) I learned that – according to Mozilla’s docs – `substr` is considered legacy and you should therefore opt to use `substring` whenever possible.

Being the visual person that I am, I decided to create a visual answer to this question. In part because I thought this particular answer was well suited to being expressed visually; but also because creating the graphic would require me to internalize the answer more concretely (which will make it easier to remember – and explain to others – in the future).
