#html

# Giving Style to Select Option Values

**tldr;** `<select>` inputs and their corresponding `<option>` elements exclusively allow text. Emoji is text. Therefore, in some cases, you can use emoji to style select inputs without reinventing the wheel of dropdown inputs. But it would be cool if browsers and OS makers allowed more in the future.

---

I have a small project where I want the user to be able to choose from an enumerated set of colors.

Right now I have a `<select>` menu with `<option>` elements to represent each color choice:

```html
<select>
  <option value="blue">Blue</option>
  <option value="red">Red</option>
  <option value="orange">Orange</option>
  ...
</select>
```

While [I could use `<input type="color">` with a predefined list of values](https://stackoverflow.com/questions/50908151/how-to-add-predefined-colors-to-input-type-color), those ultimately remain _suggestions_ for input while _any color_ can still be chosen.

<img src="https://cdn.jim-nielsen.com/blog/2021/select-input-color.png" width="704" height="260" alt="Screenshot of the input[type='color'] on macOS." />

For my case, the `<select>` makes sense because its a limited set of options.

However, it would be nice if I could make the options more visual. For example: prefix every color’s textual value with a visual representation of the corresponding color, like what you see in the macOS settings for “Highlight color”:

<img src="https://cdn.jim-nielsen.com/blog/2021/select-highlight-color.png" width="382" height="346" alt="Screenshot of the “Highlight color” setting in macOS system preferences, which is a dropdown of color values prefixed with a visual representation of the color itself." />

Wouldn’t it be nice if the `<select>` option in HTML allowed this kind of flexibility? Say, the ability to provide an image or icon? 

Of course, you have to remember that the native `<select>` dropdown is not a “dropdown” in all scenarios. Different devices and operating systems handle this input differently. On macOS, for example, you see a dropdown when triggering a `<select>`. However, on iOS, you don’t see a dropdown appear on screen below the `<select>` but rather a kind of virtual keyboard tailored  for handling this type of input:

<img src="https://cdn.jim-nielsen.com/blog/2021/select-variability.png" width="430" height="230" alt="Screenshot of a select menu’s interaction paradigms on iOS (a keyboard replacement) vs. macOS (a dropdown)." />

Granted, you can re-engineer the `<select>` menu as a customizable on-screen dropdown across all devices and inputs by using a third-party JavaScript implementation like [react-select](https://react-select.com/). This would allow the kind of flexibility one might be looking for in a “select dropdown”.

<img src="https://cdn.jim-nielsen.com/blog/2021/select-react-color.png" width="595" height="383" alt="Screenshot of a custom-styled dropdown input from the react-select JavaScript library." />

It’s worth remembering, however, that these implementations aren’t equivalent, one merely being more customizable than the other. And once you opt to “roll your own” HTML element, you lose all hard-won considerations learned over decades that’ve been baked into HTML to deal with accessibility, usability, resiliency, etc.

So, back to my original problem. Is there an easy win where I can A) leverage existing HTML semantics and native input controls, while B) still getting an enhanced visual cue of some sort, without C) using a library or rebuilding a `<select>` input from scratch?

The biggest constraint is how limited the `<option>` element is. Text is the only valid content. `<option><span>text</span></option>` is technically invalid. Even `option::before` is invalid. It’s characters only.

While searching for how to add some flare to the `<option>` elements, I stumbled on [this Stack Overflow](https://stackoverflow.com/questions/54002590/how-to-display-icon-in-select-options-tag) which points out the ability to leverage code points in combination with custom fonts to get custom glyphs. 

And that’s when the light bulb went on in my head: emojis are characters! Why not use emojis as my color cues? For my particular case, surely there must be emojis of the basic color enumerations I’m working with?

A quick [search on emojipedia](https://emojipedia.org/search/?q=circle) reveals there’s an emoji for each color I need. If I put all these ingredients together, I get a native `<select>` with color values as options and small visual representations of each color in tandem with the text.

<img src="https://cdn.jim-nielsen.com/blog/2021/select-light.png" width="138" height="236" alt="Screenshot of a select dropdown menu with emojis as color prefixes." />

At first, since the emojis were intended to be purely stylistic, I thought I’d implement them with CSS. For example:

```html
<style>
  option[value="red"]::before {
    content: "🔴";
  }
</style>

<select>
  <option value="red">Red</option>
</select>
```

The problem, as I mentioned earlier, is that this isn’t considered valid and doesn’t actually work. The only way to see the emojis is to put them directly into the markup:


```html
<select>
  <option value="blue">🔵 Blue</option>
  <option value="white">⚪ White</option>
  <option value="black">⚫ Black</option>
  <option value="purple">🟣 Purple</option>
  <option value="orange">🟠 Orange</option>
  <option value="red">🔴 Red</option>
  <option value="green">🟢 Green</option>
  <option value="yellow">🟡 Yellow</option>
  <option value="brown">🟤 Brown</option>
</select>
```

Because of [how emojis work](https://tonsky.me/blog/emoji/) across different systems and applications, the code sample above might render different than what you see in the `<select>` screenshots I posted earlier. It also might look different than what you see in VSCode:

<img src="https://cdn.jim-nielsen.com/blog/2021/select-html-screenshot.png" width="459" height="315" alt="Screenshot of some HTML in VSCode that shows emojis embedded as text." />

Anyway, this solution works decent, although putting the emoji  first sort of breaks quick keyboard navigation, i.e. hitting “Y” on the keyboard when the dropdown menu is open doesn’t jump you down to “Yellow” as the selected option because the first character of that `<option>` isn’t “Y”. It’s the yellow emoji. If you wanted to support that functionality, you’d have to put the emojis last.

<img src="https://cdn.jim-nielsen.com/blog/2021/select-color-last.png" width="138" height="236" alt="Screenshot of the select dropdown with the emojis being the last characters in the option values." />

It’s a shame I couldn’t get the pseudo element solution to work in CSS! That would’ve been the best of both worlds.

Anyhow, now I’ve got some nice `<select>` inputs with color-coded emojis as visual cues for the textual values. Even works in dark mode!

<img src="https://cdn.jim-nielsen.com/blog/2021/select-light-and-dark.png" width="450" height="280" alt="Screenshot of a select dropdown menu with emojis as color prefixes in both light and dark mode." />

What would be neat is if browsers and OS makers could extend the HTML `<select>` element so that web developers could take advantage of the same kind of UI controls native OS users have:

<img src="https://cdn.jim-nielsen.com/blog/2021/select-native-examples.png" width="580" height="427" alt="Screenshot of different dropdowns from macOS where the select input has text and icons." />
