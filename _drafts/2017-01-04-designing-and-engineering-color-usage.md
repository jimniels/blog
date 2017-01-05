---
title: Designing and Engineering Color Usage in Agent Portal
date: 2017-01-04
tags: designProcess insight
---

One of my tasks at Insight has been to design (i.e. first make sense of and then second improve) the visual language across the company, both in terms of brand and product design. The first step in designing is understanding the problem you’re solving. How can you design something you don’t understand? Design is about intent, so you must know the ins and outs of thing in order to design for it.

So how do you start developing and describing the elements of a visual language across an entire company and multiple apps? Well, a good place to start is “in the trenches” as they say. For me at Insight, that means bug tickets. Bugs provide concrete examples of how things fail. The, instead of merely fixing the surface problem, there’s an opportunity to dig deeper and find the root sources of failure. Only then can more holistic solutions be considered.

For example, here was my bug ticket: “the styles here are broken”. So I started investigating. Why are they broken? Oh, because of a poorly named variable. Why is the variable named poorly? Oh look, there are like forty other poorly named variables. Why are there forty poorly named variables? Because there are two themes of the application, and by looking at the code you can tell the CSS architecture was built with the assumption that there wouldn’t be a concept of themeing in the application. But there is definitely themeing now and it’s been shoehorned into the application so there’s no systematic, architectural approach to themeing. So how can we implement a system for themeing? The systematic solutions are the ones I am seeking. I *could* just rename the variable and the bug would be fixed, but the root problem would still remain.

## Getting Into the Trenches

So now I know we need a more systematic approach to themeing in the application’s styles. So what are our application colors? Which colors are configurable and which are not? Well, it turns out, the answers to those questions weren’t readily available.

The next problem I found was that there was no canoncial source for discovering what the application’s colors were. There was a `.sketch` file from a contractor which contained some mocks of the application and some color values. There were also some color values scattered across various `.sass` files. However the color values in the design assets and the color values in the code didn’t match entirely. So setting up a cohesive approach to themeing in the Sass/CSS, I needed to decide on definitive color values for the application and document them.

I began by creating a `.sketch` file that could serve as the application’s design asset source. Once application mocks were in place, color variations could easily be paired down and refined. Additionally, any new feature designs could be built on top of this file. This source file gave me the flexibility I needed to make visual design decisions while also setting up a canoncial source for design assets going forward.

![Screenshot of Agent Portal theme sketch file]({{ site.imageurl }}/2017/ap-theme-sketch-file.png)

## Desinging a Color Guide

Based on some previous contractor work, I also systematized and documented color usage for the application. Developing a guide for color usage helped provide a clear delineation between which colors were shared between application themes and which were unique on a theme-by-theme basis.

![Screenshot of shared colors guide]({{ site.imageurl }}/2017/ap-theme-color-guide-shared.png "Documentation for colors shared across application themes")

![Screenshot of a particular theme’s color guide]({{ site.imageurl }}/2017/ap-theme-color-guide-sagesure.png "Documentation for colors of one particular branded theme")

![Screenshot of another theme’s color guide]({{ site.imageurl }}/2017/ap-theme-color-guide-fednat.png "Documentation for colors of a separate branded theme")

As you can see, by systematically designing color usage for the application, *and documenting it*, these color guides helped provide language around how to identify colors. This proved incredibly useful when implementing colors in code.

## Front-end Code

As mentioned previously, I consolidated all the color usage and themeing logic into the following groupings:

- Shared colors (shared by all themes)
- Custom colors (theme-by-theme basis)

Based on the design assets I had created, I then looked at refactoring the front-end Sass code. The goals were:

- Create a more consistent naming scheme
- Draw a distinct line between which variables are shared between themes and which are not

This kind of approach should help developers (and designers) be able to reason about how themeing in the application is implemented and controlled. I removed exisiting color-specific variable names (i.e. `$dark-green`) and exclusively leveraged color-agnostic variable names (i.e. `$brand-primary`). This drastically improved the ability to comprehend how an the application was styled and themed. It provided us one master set of variables that could be configured on a theme-by-theme basis.

For example, here was the front-end code I initially encountered. Two separate `.scss` files for each theme, each file containing all colors of the app *AND* the theme colors. This meant duplicate names, variable overwrites, unneccesary color mappings, and more.

![GIF of code variables before refacotr]({{ site.imageurl }}/2017/ap-theme-variables-before.gif "Before: variables are all over the place: mismatched names, duplicates, overwrites, etc. You can’t tell which is a theme color and which is not.")

Based on the previous color defintions I had devised in the color guides, I came up with a more logical approach to themeing with variables. Notice in this screenshot how the theme files are the same for each instance, it's just the values that change:

![GIF of code variables after refactor]({{ site.imageurl }}/2017/ap-theme-variables-after.gif "After: variables are standardized across theme files; only the values change")

I devised a single partial that defined the shared application colors which each theme imported. By restructuring and renaming the application color variables, I came up with a solution that made reasoning about color usage and themeing in the application simple. This served as a solid base around color usage and themeing in application for the future.

## Conclusion

As you can probably guess, it wasn’t as simple as this post made it seem. Other refactorings had to be made along the way. For example, hard-coded values were prevelant in the app. These had to be found and either replaced or reconciled with officially-chosen colors. To give one example: the overall page background was hardcoded to `#fbfcf8` instead of using the already exisiting `$background-sage` (which was later refactored to the  color-agnostic variable name `$background-light`).

This was only the first baby step towards a more unified, coheisve design language. Having a concrete example to work on proved quite useful. I was able to bring a consistent, holistic approach to design from both a visual design assets and code background.

The only remaining task is to do the same thing for the rest of the company and its products :)
