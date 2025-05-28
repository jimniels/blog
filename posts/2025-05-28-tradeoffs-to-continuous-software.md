# Tradeoffs to Continuous Software?

I came across [this post from the tech collective crftd.](https://crftd.tech/blog/2025-02-27-continuous-disintegration/) about how software is in a process of “continuous disintegration”:

> One of the uncomfortable truths we sometimes have to break to people is that software isn't just never “done”. Worse even, it rots…
>
> The practices of **continuous integration** act as enablers for us to keep adding value and keeping development maintainable, but they cannot stop the inevitable: The system will eventually fail in unexpected ways, as is the nature of complex systems:

That all resonates with me — software is rarely “done”, it generally has shelf life and starts rotting the moment you ship it — but what really made me pause was this line:

> The practices of **continuous integration** act as enablers for us

I read “enabler” there in the negative context of the word, like in addiction when the word “enabler” refers to someone who exploits others by encouraging a pattern of self-destructive behavior.

Is CI/CD an enabler?

I’d only ever thought on moving towards CI/CD as a net positive thing. Is it possible that, like everything, CI/CD has its tradeoffs and isn’t always the Best Thing Ever™️?

What are the trade-offs of CI/CD?

The thought occurred to me that CI stands for “continuous  investment” because that’s what it requires to keep it working — a continuous investment in the both the infrastructure that delivers the software and the software itself.

Everybody complains now-a-days about how software requires a subscription. Why is that? Could it be, perhaps, because of CI/CD? If you want continuous updates to your software, you’re going to have to pay for it continuously.

We’ve made delivering software continuously easy, which means we’ve made creating software that’s “done” hard — [be careful of what you make easy](https://blog.jim-nielsen.com/2025/be-mindful-of-what-you-make-easy/).

In some sense — at least on the web — I think you could argue that we don’t know how to make software that’s done (e.g. software that ships on a CD). We’re inundated with tools and practices and norms that enable the opposite of that.

And, perhaps, we’ve trading something there?

When something comes along and enables new capabilities, it often severs others.