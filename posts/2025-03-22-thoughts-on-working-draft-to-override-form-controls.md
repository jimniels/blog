#uiPaceLayers

# A Few Thoughts on Customizable Form Controls

Web developers have been waiting years for traction in styling HTML form controls. Is it possible the day has come? Here’s [Jen Simmons on Mastodon](https://front-end.social/@jensimmons/114111059845196160):

> My team is working on a solution — you’ll apply `appearance: base` and switch to a new interoperable, consistent controls with easy to override default CSS. They inherit much more of what you already have going on. And then you can override (even more of) those styles using new pseudo-elements. 

If you want the details, check out [the working draft](https://drafts.csswg.org/css-forms/). It’s pretty cool what they’ve come up with, especially in the face of what is undoubtedly a Herculean task to balance developer desire against user preference while preserving accessibility standards. I applaud all involved 👏

That said, I have thoughts. Not new ones. [I’ve voiced them before](https://blog.jim-nielsen.com/2025/overriding-basic-ui-controls/). And I’ll do it again.

As developers, we’ve long been clamoring for this functionality:

“We want to override defaults, give us more control!”

But I wish there was equal voice for:

“We want better defaults, not more control!”

More control means you have to do more work. I don’t want to do more work, especially for basic computing controls. There are too many edge cases to think about across the plethora of devices, etc. that exist in the _world wide_ web — it’s overwhelming if you stop to think about them all, let alone [write them down](https://daverupert.com/2024/02/ui-states/).

I want to respect user choice (which includes respecting what hardware and OS they’ve chosen to use) and [build web user interfaces on top of stable OS primitives](https://blog.jim-nielsen.com/2025/ui-pace-layers/).

**Give me better APIs for leveraging OS primitives rather than, or I should say _in addition to_, APIs to opt out of them completely.**

That’s me, the developer talking. But there’s a user-centric point to be made here too: when you re-invent the look, appearance, and functionality of basic form inputs for every website you’re in charge of, that means every user is forced to encounter inconsistent form controls across the plethora of websites they visit.

I’m not saying don’t do this. The web is a big place. There’s  undoubtedly a need for it. But not all websites need it, and I’m afraid it’ll be the default posture for handling form controls. I don’t need different radio controls for every healthcare form, shopping cart, and bank account website I use.

As a user, I’d prefer a familiar, consistent experience based on the technology choices (hardware, OS, etc.) I’ve made.

As a developer, I don’t want to consistently “re-invent the wheel” of basic form controls.

Sure, sometimes I may need the ability to opt-out of browser defaults. But increasingly I instead want to opt-in to better browser (and OS) defaults. Less UI primitive resets and more UI primitive customizations. I want to build on top of stable [UI pace layers](https://blog.jim-nielsen.com/2025/ui-pace-layers/).