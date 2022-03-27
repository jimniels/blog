#thoughts

# Once Again, It’s About Putting the User First

Drew Crawford recently wrote a lengthy, in-depth article titled “[Why mobile web apps are slow](http://sealedabstract.com/rants/why-mobile-web-apps-are-slow/)”. A lot of it was over my head; nevertheless, I enjoyed his exhaustive, heavily-cited exposition on managed languages and their performance (especially on mobile) vs. compiled languages.

## Change the whole way you think about mobile software development
Towards the latter half of the article, Crawford asserts, “What you are about to read should change the whole way you think about mobile software development.” That’s a pretty big assertion. Even though I couldn’t completely grasp everything he had written up to that point, I had to continue reading.

Crawford explains how, in 2012, Apple pulled garbage collection from OSX. If you come from writing Ruby, Python, Javascript, Java, or really any language since 1990 this should seem odd because, after all, garbage collection has been proven…right? Well, what makes this even more strange is that when Apple announced Automatic Reference Counting (or ARC) as their approach to memory management and deprecated Garbage Collection (GC) in OSX, the audience broke out into applause! “Okay … this is really freaking weird,” Crawford states, “You mean to tell me that there’s a room full of developers applauding the return to the pre-garbage collection chaos?” Why?

The answer to that question is the reason I am writing this article. Here’s what Apple had to say about ARC vs. GC:

> At the top of your wish list of things we could do for you is bringing garbage collection to iOS. And that is exactly what we are not going to do… Unfortunately garbage collection has a suboptimal impact on performance. Garbage can build up in your applications and increase the high water mark of your memory usage. And the collector tends to kick in at undeterministic times which can lead to very high CPU usage and stutters in the user experience. And that’s why GC has not been acceptable to us on our mobile platforms. In comparison, manual memory management with retain/release is harder to learn, and quite frankly it’s a bit of a pain in the ass. But it produces better and more predictable performance, and that’s why we have chosen it as the basis of our memory management strategy. **Because out there in the real world, high performance and stutter-free user experiences are what matters to our users.** ~Session 300, Developer Tools Kickoff, 2011, 00:47:49

Did you catch that? Apple asserts that garbage collection kicks in at unexpected times leading to high CPU usage which will hamper the user experience. In comparison, ARC “produces better and more predictable performance” which will not hamper the user experience at unexpected times. Apple chose manual memory management not for themselves (after all, it’s a “pain in the ass”) but for their users.  They chose the hard way, the long-way round, because “out there in the real world, stutter-free user experiences are what matters to users.”

Apple chose to put users first rather than developers, marketers, pundits, and many others. Judging by their success, would you say it has paid off?
