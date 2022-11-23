# Natural Language Inputs

I read Adam Silver’s recent piece [“Designing a time input”](https://adamsilver.io/blog/designing-a-time-input/) where he talks about the complexity of building UI widgets that circumscribe time entry through bespoke interfaces.

<img src="https://cdn.jim-nielsen.com/blog/2022/language-inputs-time-examples.png" width="1034" height="615" alt="Screenshot of various time inputs, including a dropdowns and a radial clock input." />

He goes on to recommend time entry be accomplished through simple text inputs.

> It works well. It’s consistent across all browsers and devices. Users just type what they like.
> 
> My research shows that using a single input works very well as long as you accept a wide range of formats.

The argument against this approach is likely: it’s difficult to accept and parse user input. But you know what else is hard? Building user inputs that are sophisticated, usable, accessible, progressively-enhanced, and format-specific, not to mention needing them to work across varying inputs and device types.

A simple text input, on the other hand, works across all device and input types, not to mention it allows users to enter information in their own idiom. (Image courtesy of [Adam Silver](https://adamsilver.io/blog/designing-a-time-input/).)

<img src="https://adamsilver.io/assets/images/designing-a-time-input/single-input.png" width="452" height="240" alt="Screenshot of a UI asking for a Time input with the suggestion users can enter a time in formats like “9am” or “2:30pm”." />

I don’t mean to discount the difficulty of parsing human language and deriving meaning. I’m sure that’s very hard. But it’s being solved, no?

Google has been collapsing sophisticated   filtering into their search inputs as keywords (rather than UI widgets) for a while. For example, as you search you get filter suggestions.

<img src="https://cdn.jim-nielsen.com/blog/2022/language-input-google.png" width="684" height="650" alt="Screenshot of Google’s autosuggestions input." />

AI-generated artwork is also going down this path. If AI can take my words and paint a van Gogh variation with astounding accuracy, surely we can figure out a way it can take “Jan 2, 2022” as an input and translate it to `2022-01-02` for the database.

So much of the complexity around gathering correct user input is being solutioned on the front-end in the form of uber-sophisticated UI components with specialized design, validation, and formatting based on data type. Why not move all this complex work out of the hands of front-end people (and users) and move it to a server that supports parsing natural language?

In other words: what if _every_ input was a text input that accepts natural language?

Granted, there’s a lot of design and engineering work that would have to be done to facilitate a friendly human-computer interaction. For example, as the feedback loops on generative AI artwork become near realtime, you can imagine how simple it will become to iteratively type words until you get the result you want. This is the kind of design and engineering work that, I think, could be worth doing on the web. Rather than everyone building their own bespoke UI widgets for every kind of data format that might exist in the world, everything becomes a text input and computers get _really_ good at knowing what you mean when they ask for a time and you say “2pm” or "1400h” (with live feedback based on input constraints).

## A Quick Example

As a purely illustrative example, imagine Airbnb’s booking interface which asks for geographic input, (fuzzy) date ranges, and guest counts. Here’s a snapshot of its different states:

<img src="https://cdn.jim-nielsen.com/blog/2022/language-inputs-airbnb-today.png" width="534" height="959" alt="Screenshot of the various widgets for Airbnb’s booking interface, including a country picker, a date range picker, and a number of people input." />

Without doubt, _a lot_ of effort went into this interface. I admit that I, in no way, am pretending to understand all the constraints and complexities that feed into the design of this UI.

But, imagine if you could redesign these various, discrete inputs and collapse them into a single, natural language text input. These would be some interesting design problems to solve! Encourage users to type what they want and provide live feedback until you get what you want. For example:

<img src="https://cdn.jim-nielsen.com/blog/2022/language-inputs-airbnb-tomorrow.png" width="848" height="887" alt="Three separate screenshots of an imagined Airbnb interface with a big text input that accepts natural language. The first screenshot shows an empty text input with three UI widgets that serve as signposts to show whether the questions “Where?”, “When?” and “Who?” have been answered. The second screenshot shows a text input with the words “southern california” entered and the “Where?” signpost checked off. The last screenshot shows all three signposts checked off and the search button enabled with the words “southern california january 27th - february 2nd 2adults 3 kids” in the text input." />

I can imagine accompanying help text that becomes contextually available as users ask for or need it — something that would hint at how to answer each question.

- **Where?** Try continents (“Europe”, “America”) countries (“Mexico”, ”England”) geographic areas (“southern California”, “the Caribbean“) cities (“London”, “Shanghai”) or more.
- **When?** Try specific date ranges (“Jan 7-11”), general date ranges (“end of September” or “later half of 2022”), or leave it open-ended  (“anytime”).
- **Who?** Try people (“6 adults”), include ages for anyone under 12 (“2 adults, 3 kids ages 7, 5, 3”), and include animals (“1 pet: dog”).

This so naturally maps to how I think about vacations in my brain and talk to my spouse and kids about them. “I wonder if we could find something for about a week near the end of November in southern California by the beach.” I just want to type that into a text input and get some quick results.

Similarly, when the computer wants a time, I just want to type “12pm” instead of choosing “12” from a dropdown then “00” from a dropdown and “pm” from another dropdown.

I’m sure there are sliding scales of complexity here, some requiring AI models some not. Are there any services/startups working on APIs to solve this problem? If you know of any, hit me up. I’d be interested to learn more about how they work.