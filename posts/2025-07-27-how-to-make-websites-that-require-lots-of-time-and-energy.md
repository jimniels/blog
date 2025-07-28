# How to Make Websites That Require Will Requires Lots of Your Time and Energy

Some lessons I’ve learned from experience.

## 1. Install Stuff Indiscriminately From npm

Become totally [dependent on others](https://blog.jim-nielsen.com/2025/be-mindful-of-what-you-make-easy/), that’s why they call them “dependencies” after all! Lean in to it.

Once your dependencies break — and they will, time breaks all things — then you can spend lots of time and energy (which was your goal from the beginning) ripping out those dependencies and replacing them with new dependencies that will break later. 

Why rip them out? Because you can’t fix them. You don’t even know how they work, that’s why you introduced them in the first place!

Repeat ad nauseam (that is, until you decide you don’t want to make websites that require lots of your time and energy, but that’s not your goal if you’re reading this article).

## 2. Pick a Framework Before You Know You Need One

Once you hitch your wagon to a framework (a dependency, see above) then any updates to your site via the framework require that you first understand what changed in the framework.

More of your time and energy expended, mission accomplished!

## 3. Always, Always Require a Compilation Step

Put a critical dependency between working on your website and  using it in the browser. You know, some mechanism that is required to function before you can even see your website — like a complication step or build process. The bigger and more complex, the better.

This is a great way to spend lots of time and energy working on your website.

(Well, technically it’s not really working on your website. It’s working on the thing that spits out your website. So you’ll excuse me for recommending something that requires your time and energy that isn’t your website — since that’s not the stated goal — but trust me, this apparent diversion will directly affect the overall amount of time and energy you spend making a website. So, ultimately, it will still help you reach our stated goal.)

Requiring that the code you write be transpiled, compiled, parsed, and evaluated before it can be used in your website is a great way to spend extra time and energy making a website (as opposed to, say, [writing code as it will be run](https://blog.jim-nielsen.com/2020/cheating-entropy-with-native-web-tech/) which would save you time and energy and is not our goal here).

## More?

Do you have more advice on building a website that will require a lot of your time and energy? Share your recommendations with others, in case they’re looking for such advice.