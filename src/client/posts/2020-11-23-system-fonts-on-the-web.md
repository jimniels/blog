---
tags: css
---

# Leveraging System Fonts on the Web

> Blog post draft: the reason they called it `font-family` in CSS was because its like many families—dysfunctional. ([@jimniels](https://twitter.com/jimniels/status/1323108913278029831?s=20))

I don’t even remember why, but the other day I was thinking about [Apple’s “New York” font](https://developer.apple.com/fonts/) and wondering how you could tell browsers (on Apple devices) to render text with that font. I know all about [using the system font stack](https://css-tricks.com/snippets/css/system-font-stack/), but in the case of macOS the system font would be Apple’s sans-serif “San Francisco”. What if I wanted to use this alternative serif font (“New York” is Apple’s serif font that they initially showcased with the new Apple Books app)? Can you do that in CSS?

A quick search with the right keywords led me to [this same question on StackOverflow](https://stackoverflow.com/questions/58019423/how-can-i-use-the-new-york-font-in-web-content-on-ios-13), which led me to [the CSS fonts spec](https://www.w3.org/TR/css-fonts-4/#ui-serif-def), which later led me to [Chris Coyier’s system fonts snafu post](https://css-tricks.com/chrome-system-fonts-snafu/). All interesting reading. And to top it all off, while I was writing this blog post, I happened to watch [Apple’s WWDC20 video detailing what’s new in Webkit](https://developer.apple.com/wwdc20/10663), which introduces all the stuff I’m about to write about.

<img src="https://cdn.jim-nielsen.com/blog/2020/font-family-new-webkit.png" alt="Screenshot from Apple’s WWDC20 video for web developers showing the new generic family names available for referencing system fonts." width="607" height="382" />

All of this reading got me thinking, and all of that thinking got me writing, and all of that writing got me publishing, and all that publishing got you, dear reader, here reading this post.

**tldr:** the CSS fonts spec has a couple (new to me) generic font families, like `ui-serif` and `ui-sans-serif`, aimed at providing finer-grained controls for specifying OS-level fonts. This allows developers the power to integrate their UIs with the look and feel of the underlying operating system. To suggest Apple user agents render text on screen with the “New York” serif font, developers can specify: `font-family: ui-serif`.

## Diving Deeper

First, I was a bit confused just like Chris was:

> When I first heard of using system font stacks, there was `-apple-system` and `BlinkMacSystemFont`...Then came along `-system-ui` [which was] obviously less Mac-specific. But there is also `system-ui` (no starting dash), and that seems to do the same thing and I’m not sure which is correct. Now it looks like the plan is `ui-sans-serif` and friends...I like the idea, but I’d love to hear clarity from browser vendors on what the recommended use is.

He then asks if, given the history behind specifying system fonts, we’re in a place like this for leveraging system fonts:

```css
body {
  font-family: 
    ui-sans-serif, 
    system-ui, 
    -system-ui, 
    -apple-system,
    BlinkMacSystemFont,
    Roboto, Helvetica, Arial, 
    sans-serif, 
    "Apple Color Emoji";
}
```

If Chris over at CSS-Tricks doesn’t know the answer, then I suppose we’re all a bit lost. 

The question in my head was: why yet another way to specify a generic font family? My mental model for fonts in CSS has always been: specify a couple specific fonts, then provide fallbacks to generic fonts. So if you wanted the system to use its sans-serif font, why not have _that_ be your font declaration, i.e. `sans-serif`? 

In other words, what’s the difference between this:

```css
body {
  font-family: sans-serif;
}
```

And this?

```
body {
  font-family: ui-sans-serif, sans-serif;
}
```

In order to answer that question, I had to read [the CSS fonts spec for font-family](https://drafts.csswg.org/css-fonts-4/#font-family-prop) to correct my mental model. 

## Specific and Generic Families

In CSS, you have the `font-family` property and then a value, which according to the spec can be a `<family-name>` or a `<generic-name>`. A family name would be something like `Helvetica` while a generic name would be something like `sans-serif`. Once you have one or more family family/generic names declared, the browser tries to map every character of text to one of the fonts specified:

> A user agent iterates through the list of family names until it matches an available font that contains a glyph for the character to be rendered. This allows for differences in available fonts across platforms and for differences in the range of characters supported by individual fonts.

The idea here is actually quite a powerful one. Rather than having binary error handling (“display this text in Helvetica or don’t display any text at all”) CSS provides developers broad expressiveness in handling errors related to the absence of fonts. The main idea is that, with CSS, you can express stylistic suggestions for font usage on a continuum from specific to generic. It’s a rather robust way to preserve the spirit of design choices across the multitude of platforms that access the web. 

That’s great and all, but it still doesn’t answer my question: why can’t you say `sans-serif` and the operating system will leverage it’s sans-serif system font (like San Francisco on macOS)?

## Different Types of Generic Families

There are different types of `<generic-name>` families that can be used in CSS. Here’s an enumerated list according to the spec:

- `serif` *
- `sans-serif` *
- `monospace` *
- `system-ui`
- `cursive`
- `fantasy`
- `emoji`
- `math`
- `fangsong`
- `ui-serif` †
- `ui-sans-serif` †
- `ui-monospace` †
- `ui-rounded` †

The family names with a `*` are caveated with this note in the spec:

> Note: [these] must always map to at least one matched font face. However, no guarantee is placed on the character coverage of that font face. Therefore, the font [these are] mapped to may not end up being used for all content.

While the family names with a `†` are caveated thus:

> Note: [these are] not expected to map to any font on platforms without an appropriate system font.

As you can see, some generic families must map to a particular font on the user agent (like `sans-serif`) but others don’t necessarily have to (like `ui-sans-serif`). This is a crucial difference between the types of generic font families you can specify in CSS.

> A generic font family is a font family which has a standard name (as defined by CSS), but which is an alias for an existing installed font family present on the system...Different generic font families may map to the same used font.

Note that last sentence: “different generic font families may map to the same used font.” That is precisely what is happening in Chris’ example:

```css
body {
  font-family: ui-sans-serif, system-ui, sans-serif;
}
```

All three of those _may_ map to the same font, but they also _may not_. It depends on a combination of configurations across both the operating system, the browser, and the user’s preferences at both levels. That is but a taste of the kind of robust expressiveness CSS gives developers when dealing with font choices.

Ok so, now we’re getting closer to the answering my question: why can’t I say `sans-serif` to use the system’s sans-serif font? Given the above context, you can see that if `ui-sans-serif` and `system-ui` are not valid, recognized generic names on the user agent, the system will fallback to `sans-serif` which, according to the spec, _must_ map to _some_ font on the user’s system. But which font? If there’s no “system” font, what font does the system use? 

## User Preferences and Generic Families

As noted, generic families exist on a kind of continuum, from families that _may_ map to a particular font to families that _must_ map to a particular font. These vary from one user agent to the next.

> Generic font families are intended to be widely implemented on many platforms, unlike arbitrary `<family-name>`s which are usually platform-specific names. [Generic families] are expected to map to different fonts on different platforms.

When you specify a `<generic-name>` that must map to particular font, like `sans-serif`, you’re telling the system “find something that roughly fits the typographic style of a sans-serif font”. Which font gets used in that scenario is, however,  ultimately left up to the browser and not the developer. 

> User agents should provide reasonable default choices for the generic font families, that express the characteristics of each family as well as possible, within the limits allowed by the underlying technology. User agents are encouraged to allow users to select alternative faces for the generic font families.

That last part is worth noting: browsers can, in fact they are “encouraged”, to allow users to set their own preferences for generic families. The browser can set a default by mapping `sans-serif` to, say, “Arial” (it could, I suppose, even try to map `sans-serif` maps to “San Francisco” but does not AFAIK). This default choice is left up to the browser.

However, as the spec says, the user should have the ability to override what `sans-serif` maps to. This means, as a developer, when you specify `sans-serif`, that might result in “Arial” on one user's computer (depending on the browser’s default preferences for `sans-serif`) but it could also result in, say, “Helvetica” on somebody else’s computer (assuming they changed their browser’s default preferences). Here’s an example screenshot of a user’s font settings in Google Chrome:

<img src="https://cdn.jim-nielsen.com/blog/2020/font-family-google-chrome-settings.png" alt="Screenshot of the “Customize Fonts” setting in Google Chrome." width="1394" height="1137" />

From this we see that generic families which _must_ map to a particular font are configurable by the end user.

So, going back once again to my own question: why can’t I say `sans-serif` and have that map to the system font (San Francisco on Apple devices)? The answer is: `ui-sans-serif` gives CSS authors extra specificity in declaring what fonts the browser should use. If, as a developer, you want to express “use the operating system’s sans-serif font _over_ the user’s specified preference of a sans-serif font” then you need more fine-grained `<generic-name>` families than just `sans-serif`. Example:

```css
/* This means use the browser's default sans-serif, which
   might be configured by the user */
body {
  font-family: sans-serif;
}

/* This means _first_ use the system sans-serif, then if that
   doesn’t map to anything (or isn’t supported), use the 
   browser’s default sans-serif, which may be user configured */
body {
  font-family: ui-sans-serif, sans-serif;
}
```

## A Cascade of Generic Families

Let’s dive even deeper. Let's look at `system-ui` for a moment:

> This generic font family lets text render with the default user interface font on the platform on which the UA is running. A cross-platform UA should use different fonts on its different supported platforms. The purpose of ‘system-ui’ is to allow web content to integrate with the look and feel of the native OS.

Ok that makes sense. If I want to San Francisco to render on Apple devices, I can say `system-ui` because San Francisco is the system font in those cases. It just so happens that San Francisco is a sans-serif font. It is very much possible that another operating system out there might have serif font as the base system font. Heck, it’s even possible `system-font` could map to Comic Sans. It all depends on the operating system. This is where `ui-sans-serif` and `ui-serif` come into play and provide CSS authors more control. They allow you to differentiate between “use the system’s font” (which could be a serif font, a sans-serif font, a monospace font, etc.) and “use the system’s serif font”.

In that light, the difference between `system-ui` and `ui-sans-serif` is completely dependent on the user agent. On some UAs they might map to the same font. On others they might not. In the case of Apple UAs and Safari (at the time of this writing), `system-ui` and `ui-sans-serif` map to the same font: San Francisco. But `system-ui` and `ui-serif` are not the same because the “system font” is not a serif font on Apple UAs. In that case, `ui-serif` is what allows you to specify the “New York” serif font.

Again, if I revisit my original question: what's the difference between `ui-sans-serif` and `sans-serif`? It’s a matter of specifying intent. `sans-serif` means “I suggest you, computer, use a sans-serif font family. You choose what’s best (or leverage the user’s choice in settings).” `ui-sans-serif` is saying “I suggest you, computer, use the system’s sans-serif font, which is a very specific thing in and shouldn’t take into account a user’s browser settings.”

Ok, so given everything discussed in this post, let’s play this out in the example Chris gave:

```css
/* Specifying a font, by level of priority: */
body {
  font-family: 
    /* use the sans-serif font that the operating system 
       classifies as a sans-serif font for native apps */
    ui-sans-serif,
    /* use the font the operating system uses for native
       applications, may be serif, may be sans-serif, may be 
       something else (there are, as you can see, a couple 
       different ways to specify this) */
    system-ui, 
    -system-ui, 
    -apple-system,
    BlinkMacSystemFont,
    /* use one of these specific font families if present */
    Roboto, Helvetica, Arial, 
    /* use a sans-serif family as determined by the browser
       which may or may not be a configurable option for
       the user to override */
    sans-serif, 
    /* use emojis */
    "Apple Color Emoji";
}
```

I believe that’s roughly how this would all shake out.

## Final Thoughts

So how does one know what something like `system-ui` means on each platform? I suppose that would just take research. Research that I cannot do because I do not have the device inventory to do so (or, honestly, the time or desire). But it would be nice if there was a dictionary of this somewhere, i.e. 

- macOS, iOS iPadOS, etc.
    - `ui-sans-serif`: San Francisco
    - `system-ui`: San Francisco
    - `ui-serif`: New York
    - `ui-monospace`: SF Mono
- windows
    - ???
- android
    - ???

All of this does make me wonder: does leveraging the system font give you free OS-level optimizations in font display? For example, the San Francisco family has “SF Pro Display” and “SF Pro Text”, both of which were designed with optimizations in mind based on font sizing. Supposedly, if you’re doing native app development right on an Apple device, [the OS takes care of using the right font based on your font size](https://blog.jim-nielsen.com/2019/design-principles-applied-to-sf-fonts/). Does this happen for browsers rendering text too? For example, if I say `ui-sans-serif` does that map to “SF Pro Display” or “SF Pro Text”? Or is it dependent on the size at which the font is displayed? I don’t know the answer to that question. And obviously it’s very Apple-device specific. But presumably if you were accessing the web on any other device, it presumably could have all kinds of optimizations like this built in that you don’t know about.

Ok, phew. That was a lot of words. I hope A) you found something useful in here and B) it’s actually correct. Writing this blog post help me clarify my thoughts and reshape my mental model for font families in CSS. All of that said, this was an exercise in me reading the spec and attempting to articulate how the mechanics of the spec’s declarations play out—particularly on Apple devices. 

Really, this is all a kind of “peering under the hood” at the complexity that lays between the operating system, the browser running on that operating system, and the generic-to-specific continuum of controls the browser tries to provide to CSS authors in spite of the almost infinite lack of surety about anything involving the environment in which someone might be viewing your web page.

## Update 2020-12-03

From [webplatform.news](https://webplatform.news/bonus-content) I found a link to [this post from Chris Siebenmann](https://utcc.utoronto.ca/~cks/space/blog/web/FirefoxUnixLittleFontBit) which talks about how Firefox clues you in a little bit more about how it handles defaults:

> Firefox is...telling you what font [a family name] actually maps to. If you go into "Advanced..." and have not customized your font choices, you can see what all three of the magic names map to.

I looked at this myself and its pretty neat. The settings pane clear lays out how Firefox is communicating its defaults and what those actually map to:

<img src="https://cdn.jim-nielsen.com/blog/2020/font-family-firefox-settings.png" alt="Screenshot of the advanced font settings pane in Firefox showing what font families the default settings map to." width="698" height="511" />

What’s cool is to see how the font family default mappings change as you change the language:

<img src="https://cdn.jim-nielsen.com/blog/2020/font-family-firefox-settings-languages.png" alt="Three screenshots of the advanced font settings pane in Firefox showing how default font mappings change with the language chosen." width="1060" height="523" />

Now what would be really neat is if it had a couple more settings panes (these ones non-configurable because you can’t change the system font, as noted in this article) that showed you what the system font mapped to. If you’re on a Mac, it’s probably well known what those settings would be. But if you were on some flavor of linux, who knows what it would be!

<img src="https://cdn.jim-nielsen.com/blog/2020/font-family-firefox-settings-new.png" alt="Three screenshots of the advanced font settings pane in Firefox showing how default font mappings change with the language chosen." width="722" height="543" />

