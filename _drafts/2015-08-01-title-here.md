---
title: Approaching a Style Guide
date: 2017-01-04
tags: designProcess
---

One of my tasks at Insight has been to make sense out of, and then improve, the visual language across the company, both in terms of brand and product design. As I’ve come to learn, the first step in design in to understand. How can you design something you don’t understand? Design is about intent, so you must know the ins and outs of thing in order to design for it.

So how do you start developing and describing the elements of a visual language across an entire company and multiple apps? Well, a good place to start is “in the trenches” as they say, and that means bug tickets. Bugs provide you concrete examples of how things fail and thus the solutions can be thought of more holistically. “The styles here are broken” the ticket says. Why are they broken? Oh, because of a poorly named variable. Why is the variable named poorly? Oh look, there are like 40 poorly named variables. Why are there 40 poorly named variables? Because there are two application themes. And by looking at the code, you can tell the CSS architecture was built with the assumption that there wouldn’t be a concept of themeing in the application. But there is themeing now, and you can tell from the code it’s been duct-taped on. There’s no systematic, architectural approach to themeing. So how can we implement a system for themeing? See how these questions begin to spiral? The systematic solutions are the ones I am in charge of handling. I could just rename the variable, but the real problem behind the bug would still remain.

## Design Assets

One of the big problems around themeing and styling was that there was no canoncial source for determining what the theme colors were. There was a `.sketch` file from a contractor which contained some mocks of the application and thus contained some color values. There were also some color values scattered across various `.sass` files. However the color values in the design assets and the color values in the code didn’t match exactly. That meant I would need to decide upon definitive color values for each theme and create some kind of canoncical source for them.

I began by creating `.sketch` files that could serve as the source files for changing theme colors and seeing how each particular color looked in context. This gave me the flexibility I needed to tweak colors and decide upon definitive theme colors for the application.

![Screenshot of Agent Portal theme sketch file]({{ site.imageurl }}/2017/ap-theme-sketch-file.png)

## Front-end Code

Due to conversations I had seen happening around themeing in Agent Portal (and due to my own need for guidance from a perspective of design assets) I consolidated all the themeing logic into the following groupings:

- Shared styles (shared by all themes)
- Custom styles (theme-by-theme basis)
    - SageSure theme styles
    - FedNat theme styles

In this PR I've taken a stab at refactoring Sass variables in order to:

- Create a more consistent naming scheme
- Draw a distinct line between which variables are shared between themes and which are not

This should help us in being able to reason about how we theme the application. By removing color-specific variable names (i.e. $dark-green) and exclusively leveraging color-agnostic variable names (i.e. $brand-primary) we should be able to make the theming process more comprehensible.

Now we can have one master set of variables that can be configured on a theme-by-theme basis. Notice in this screenshot how the theme files are the same for each instance, it's just the values that change:

vars

We should try to maintain this going forward. Unless absolutely, positively necessary, we should try not to create one-off variables for theming that don't apply to all themes. These get very hard to keep track of.

Design Assets

The style guides have likewise been updated to reflect both the change in color values as well as the change in color variable naming.

To-Dos

The following items remain to be done:


- Find & replace any hard-coded values - There were a few color values that were hard-coded which I had to change to use the appropriate variable. For example, the overall page background was hardcoded to #fbfcf8 instead of using $background-sage (which was changed to the more general $background-light). We should make sure we've abstracted all relevant color values throughout the application to use the theme variables.
- Ensure theme looks good - Again, I wasn't able to test locally, so just make sure the color choices seem appropriate. I styled the app in Sketch and chose the values, so it should look something like these (ignore the change in logos in these mocks, just make sure the colors seem right):
